'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // 1. Check if user already has an active session cookie
  const checkAuth = useCallback(async () => {
    try {
      setAuthChecking(true);
      const res = await fetch('/api/admin/auth');
      const json = await res.json();
      if (json.authenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setAuthChecking(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 2. Fetch stats once authenticated
  const fetchStats = useCallback(async (selectedRange = range) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/stats?range=${selectedRange}`, { cache: 'no-store' });
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats(range);
    }
  }, [isAuthenticated, range, fetchStats]);

  // Auto-refresh every 8s if enabled
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) return;
    const interval = setInterval(() => {
      fetchStats(range);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh, range, fetchStats]);

  // Handle Login Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setLoginError('Please enter the admin password');
      return;
    }

    try {
      setLoginLoading(true);
      setLoginError('');

      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const json = await res.json();
      if (json.success) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setLoginError(json.error || 'Invalid password. Access denied.');
      }
    } catch (err) {
      setLoginError('Authentication failed: ' + err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
      setData(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleClearData = async () => {
    if (!window.confirm('Are you sure you want to clear all analytics tracking events in MongoDB?')) return;
    try {
      setClearing(true);
      const res = await fetch('/api/admin/clear', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        alert(`Successfully deleted ${json.deletedCount} events.`);
        fetchStats(range);
      }
    } catch (err) {
      alert('Failed to clear data: ' + err.message);
    } finally {
      setClearing(false);
    }
  };

  const handleExportCSV = () => {
    if (!data?.recentEvents?.length) return alert('No event logs to export.');
    const headers = ['Event Type', 'Button Label', 'Button ID', 'OS', 'Browser', 'IP', 'Visitor ID', 'Timestamp'];
    const rows = data.recentEvents.map(e => [
      `"${e.eventType || ''}"`,
      `"${e.buttonLabel || ''}"`,
      `"${e.buttonId || ''}"`,
      `"${e.os || ''}"`,
      `"${e.browser || ''}"`,
      `"${e.ip || ''}"`,
      `"${e.visitorId || ''}"`,
      `"${new Date(e.timestamp).toISOString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pen_llm_analytics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTimeAgo = (dateStr) => {
    const d = new Date(dateStr);
    const diffSec = Math.floor((new Date() - d) / 1000);
    if (diffSec < 10) return 'Just now';
    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // ─── Render 1: Loading Initial Auth Check ───
  if (authChecking) {
    return (
      <div className={styles.authLoadingScreen}>
        <div className={styles.authSpinner} />
        <p className={styles.authLoadingText}>Verifying Admin Terminal Credentials...</p>
      </div>
    );
  }

  // ─── Render 2: Admin Login Gate ───
  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />

        <div className={styles.loginCard}>
          {/* Card Glow */}
          <div className={styles.loginGlow} />

          {/* Brand Logo & Title */}
          <div className={styles.loginHeader}>
            <div className={styles.loginLogoWrap}>
              <img src="/logo.png" alt="PEN-LLM Logo" className={styles.logoImg} />
            </div>
            <h1 className={styles.loginTitle}>Admin Console</h1>
            <p className={styles.loginSub}>
              Protected Analytics Terminal · Enter admin password to proceed
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Admin Access Key</label>
              <div className={styles.inputWrap}>
                <svg
                  className={styles.lockIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={styles.passwordInput}
                  placeholder="Enter admin password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <div className={styles.errorBanner}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className={styles.loginBtn}
              disabled={loginLoading}
            >
              {loginLoading ? (
                <>
                  <div className={styles.btnSpinner} />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Unlock Dashboard</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Back to site */}
          <div className={styles.loginFooter}>
            <Link href="/" className={styles.backLink}>
              ← Return to PEN-LLM Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── Render 3: Authenticated Admin Dashboard ───
  const summary = data?.summary || {};

  return (
    <div className={styles.dashboard}>
      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      {/* Top Navbar */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.brand}>
            <div className={styles.logoWrap}>
              <img src="/logo.png" alt="PEN-LLM Logo" className={styles.logoImg} />
            </div>
            <div className={styles.brandTitles}>
              <span className={styles.brandName}>PEN-LLM</span>
              <span className={styles.brandConsole}>Analytics Console</span>
            </div>
          </Link>
          <div className={styles.dbStatusBadge}>
            <span className={styles.liveDot} />
            <span>MongoDB: pen_llm_analytics</span>
          </div>
        </div>

        <div className={styles.headerRight}>
          {/* Time Range Selector */}
          <div className={styles.rangeSelector}>
            {['today', '7d', '30d', 'all'].map((r) => (
              <button
                key={r}
                className={`${styles.rangeBtn} ${range === r ? styles.rangeActive : ''}`}
                onClick={() => setRange(r)}
              >
                {r === 'today' ? 'Today' : r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : 'All Time'}
              </button>
            ))}
          </div>

          {/* Auto refresh toggle */}
          <button
            className={`${styles.autoBtn} ${autoRefresh ? styles.autoOn : ''}`}
            onClick={() => setAutoRefresh(!autoRefresh)}
            title="Toggle 8s auto-refresh"
          >
            <span className={styles.autoDot} />
            <span>{autoRefresh ? 'Live Poll (8s)' : 'Paused'}</span>
          </button>

          {/* Refresh Button */}
          <button
            className={styles.refreshBtn}
            onClick={() => fetchStats(range)}
            disabled={loading}
            title="Refresh now"
          >
            <svg
              className={`${styles.refreshIcon} ${loading ? styles.spin : ''}`}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
            </svg>
            <span>Refresh</span>
          </button>

          <Link href="/" className={styles.viewSiteBtn}>
            <span>View Site</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </Link>

          {/* Logout Button */}
          <button onClick={handleLogout} className={styles.logoutBtn} title="Lock and logout">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className={styles.main}>
        {/* KPI Metrics Row */}
        <section className={styles.kpiGrid}>
          {/* Card 1: Total Page Views */}
          <div className={`${styles.kpiCard} ${styles.kpiBlue}`}>
            <div className={styles.kpiTop}>
              <span className={styles.kpiTitle}>Total Page Views</span>
              <div className={styles.kpiIconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
            </div>
            <div className={styles.kpiValue}>{summary.pageViews ?? 0}</div>
            <div className={styles.kpiSub}>
              <span className={styles.badgeGreen}>+{summary.todayViews ?? 0} today</span>
              <span>Website Visits</span>
            </div>
          </div>

          {/* Card 2: Unique Visitors */}
          <div className={`${styles.kpiCard} ${styles.kpiPurple}`}>
            <div className={styles.kpiTop}>
              <span className={styles.kpiTitle}>Unique Visitors</span>
              <div className={styles.kpiIconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
            </div>
            <div className={styles.kpiValue}>{summary.uniqueVisitors ?? 0}</div>
            <div className={styles.kpiSub}>
              <span className={styles.badgePurple}>+{summary.todayVisitors ?? 0} today</span>
              <span>Unique Devices</span>
            </div>
          </div>

          {/* Card 3: Total Download Clicks */}
          <div className={`${styles.kpiCard} ${styles.kpiGreen}`}>
            <div className={styles.kpiTop}>
              <span className={styles.kpiTitle}>Download Clicks</span>
              <div className={styles.kpiIconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
            </div>
            <div className={styles.kpiValue}>{summary.downloadClicks ?? 0}</div>
            <div className={styles.kpiSub}>
              <span className={styles.badgeCyan}>+{summary.todayDownloads ?? 0} today</span>
              <span>Google Drive Initiations</span>
            </div>
          </div>

          {/* Card 4: Download Conversion Rate */}
          <div className={`${styles.kpiCard} ${styles.kpiAmber}`}>
            <div className={styles.kpiTop}>
              <span className={styles.kpiTitle}>Conversion Rate</span>
              <div className={styles.kpiIconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
            </div>
            <div className={styles.kpiValue}>{summary.conversionRate ?? '0.0'}%</div>
            <div className={styles.kpiSub}>
              <span className={styles.subMuted}>Downloads per Visitor</span>
            </div>
          </div>
        </section>

        {/* Middle Section: Download Sources & Daily Trend */}
        <div className={styles.twoColGrid}>
          {/* Download Button Attribution Breakdown */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitleWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20v-6M6 20V10M18 20V4"/>
                </svg>
                <h3 className={styles.panelTitle}>Download Button Attribution</h3>
              </div>
              <span className={styles.panelBadge}>{summary.downloadClicks ?? 0} Total Clicks</span>
            </div>

            <div className={styles.breakdownList}>
              {data?.downloadBreakdown && data.downloadBreakdown.length > 0 ? (
                data.downloadBreakdown.map((item, idx) => {
                  const total = summary.downloadClicks || 1;
                  const pct = Math.round((item.count / total) * 100);
                  return (
                    <div key={idx} className={styles.breakdownItem}>
                      <div className={styles.breakdownLabelRow}>
                        <div className={styles.breakdownName}>
                          <span className={styles.btnTag}>#{idx + 1}</span>
                          <span>{item._id || item.buttonId || 'Direct Link'}</span>
                        </div>
                        <div className={styles.breakdownCounts}>
                          <strong>{item.count} clicks</strong>
                          <span className={styles.pctBadge}>{pct}%</span>
                        </div>
                      </div>
                      <div className={styles.progressBarBg}>
                        <div
                          className={styles.progressBarFill}
                          style={{
                            width: `${pct}%`,
                            background: idx === 0 ? 'linear-gradient(90deg, #6366f1, #38bdf8)' : idx === 1 ? 'linear-gradient(90deg, #a855f7, #ec4899)' : '#0ea5e9'
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.emptyState}>
                  <p>No download click data recorded yet.</p>
                  <span>Click download buttons on the site to see live attribution.</span>
                </div>
              )}
            </div>
          </div>

          {/* Daily 14-Day Timeline Trend */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitleWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <h3 className={styles.panelTitle}>14-Day Traffic &amp; Downloads Trend</h3>
              </div>
              <div className={styles.legend}>
                <span className={styles.legendViews}><span className={styles.legDotViews} /> Views</span>
                <span className={styles.legendDl}><span className={styles.legDotDl} /> Downloads</span>
              </div>
            </div>

            <div className={styles.chartContainer}>
              {data?.dailyTrend?.length > 0 ? (
                <div className={styles.barChart}>
                  {data.dailyTrend.map((day, i) => {
                    const maxVal = Math.max(...data.dailyTrend.map(d => Math.max(d.views, d.downloads, 1)), 10);
                    const viewHeight = Math.max(4, Math.round((day.views / maxVal) * 120));
                    const dlHeight = Math.max(4, Math.round((day.downloads / maxVal) * 120));
                    const dateShort = day.date.slice(5); // "MM-DD"
                    return (
                      <div key={i} className={styles.barCol}>
                        <div className={styles.barPair}>
                          <div
                            className={styles.barView}
                            style={{ height: `${viewHeight}px` }}
                            title={`${day.date}: ${day.views} views`}
                          />
                          <div
                            className={styles.barDl}
                            style={{ height: `${dlHeight}px` }}
                            title={`${day.date}: ${day.downloads} downloads`}
                          />
                        </div>
                        <span className={styles.barDate}>{dateShort}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.emptyState}>No timeline data available.</div>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Grid: OS, Browser, Secondary Actions */}
        <div className={styles.threeColGrid}>
          {/* OS Breakdown */}
          <div className={styles.smallPanel}>
            <h4 className={styles.smallPanelTitle}>Operating Systems</h4>
            <div className={styles.deviceList}>
              {data?.osBreakdown?.length > 0 ? (
                data.osBreakdown.map((item, idx) => (
                  <div key={idx} className={styles.deviceRow}>
                    <span className={styles.deviceIcon}>💻</span>
                    <span className={styles.deviceName}>{item._id || 'Unknown'}</span>
                    <span className={styles.deviceCount}>{item.count}</span>
                  </div>
                ))
              ) : (
                <p className={styles.mutedText}>No OS data</p>
              )}
            </div>
          </div>

          {/* Browser Breakdown */}
          <div className={styles.smallPanel}>
            <h4 className={styles.smallPanelTitle}>Browsers</h4>
            <div className={styles.deviceList}>
              {data?.browserBreakdown?.length > 0 ? (
                data.browserBreakdown.map((item, idx) => (
                  <div key={idx} className={styles.deviceRow}>
                    <span className={styles.deviceIcon}>🌐</span>
                    <span className={styles.deviceName}>{item._id || 'Unknown'}</span>
                    <span className={styles.deviceCount}>{item.count}</span>
                  </div>
                ))
              ) : (
                <p className={styles.mutedText}>No browser data</p>
              )}
            </div>
          </div>

          {/* Secondary Actions */}
          <div className={styles.smallPanel}>
            <h4 className={styles.smallPanelTitle}>Interaction Actions</h4>
            <div className={styles.deviceList}>
              <div className={styles.deviceRow}>
                <span className={styles.deviceIcon}>📖</span>
                <span className={styles.deviceName}>Install Guide Clicks</span>
                <span className={styles.deviceCount}>{summary.installClicks ?? 0}</span>
              </div>
              <div className={styles.deviceRow}>
                <span className={styles.deviceIcon}>🚀</span>
                <span className={styles.deviceName}>Localhost 8080 Clicks</span>
                <span className={styles.deviceCount}>{summary.localhostClicks ?? 0}</span>
              </div>
              <div className={styles.deviceRow}>
                <span className={styles.deviceIcon}>⚡</span>
                <span className={styles.deviceName}>Total Recorded Events</span>
                <span className={styles.deviceCount}>{summary.totalEvents ?? 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Real-time Activity Stream Feed */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitleWrap}>
              <span className={styles.pulsingFeedDot} />
              <h3 className={styles.panelTitle}>Live Real-time Activity Stream</h3>
            </div>
            <div className={styles.feedActions}>
              <button onClick={handleExportCSV} className={styles.exportBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Export CSV
              </button>
              <button
                onClick={handleClearData}
                disabled={clearing}
                className={styles.clearBtn}
              >
                Clear Data
              </button>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Button / Target</th>
                  <th>Device / OS</th>
                  <th>Browser</th>
                  <th>IP Address</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data?.recentEvents && data.recentEvents.length > 0 ? (
                  data.recentEvents.map((ev, idx) => {
                    const isDownload = ev.eventType === 'download_click';
                    const isPageView = ev.eventType === 'page_view';
                    const isInstall = ev.eventType === 'install_click';
                    const isLocal = ev.eventType === 'localhost_click';

                    return (
                      <tr key={idx} className={styles.tableRow}>
                        <td>
                          <span
                            className={`${styles.eventBadge} ${
                              isDownload
                                ? styles.evDownload
                                : isPageView
                                ? styles.evPage
                                : isInstall
                                ? styles.evInstall
                                : isLocal
                                ? styles.evLocal
                                : styles.evOther
                            }`}
                          >
                            {isDownload
                              ? '⚡ DOWNLOAD'
                              : isPageView
                              ? '👁 VIEW'
                              : isInstall
                              ? '📖 GUIDE'
                              : isLocal
                              ? '🌐 LOCALHOST'
                              : ev.eventType}
                          </span>
                        </td>
                        <td className={styles.targetCell}>
                          <strong>{ev.buttonLabel || ev.buttonId || ev.page || '/'}</strong>
                        </td>
                        <td>
                          <span className={styles.dimText}>{ev.os || 'Windows'}</span>
                        </td>
                        <td>
                          <span className={styles.dimText}>{ev.browser || 'Chrome'}</span>
                        </td>
                        <td>
                          <code className={styles.ipCode}>{ev.ip || '127.0.0.1'}</code>
                        </td>
                        <td className={styles.timeCell}>
                          <span title={new Date(ev.timestamp).toLocaleString()}>
                            {formatTimeAgo(ev.timestamp)}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.noDataCell}>
                      No real-time events logged yet. Visit the homepage or click download buttons to see events stream here in real time.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className={styles.footer}>
        <span>PEN-LLM Analytics · Protected Admin Console · Connected to MongoDB Atlas (`pen_llm_analytics`)</span>
        {lastUpdated && (
          <span className={styles.updateTime}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </footer>
    </div>
  );
}
