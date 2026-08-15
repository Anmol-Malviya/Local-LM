'use client';
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const canvasRef = useRef(null);

  /* Particle canvas background */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;

    const particles = [];
    const COUNT = 50;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        alpha: Math.random() * 0.35 + 0.1,
        color: Math.random() > 0.5 ? '#a78bfa' : '#67e8f9',
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Ambient Glow Orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Right-side Blended Background Visual */}
      <div className={styles.rightBgVisualWrapper}>
        <div className={styles.rightBgVisualGlow} />
        <img
          src="/hero-pendrive.png"
          alt="PEN-LLM Hardware Background"
          className={styles.rightBgImg}
        />
        <div className={styles.rightBgFadeOverlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Status Badge */}
          <div className={styles.badge} id="offline-badge">
            <span className={styles.badgeDot} />
            <span>100% Offline • Zero Internet Required</span>
          </div>

          <h1 className={styles.title}>
            AI That Lives
            <br />
            In <span className={styles.gradient}>Your Pocket</span>
          </h1>

          <p className={styles.subtitle}>
            PEN-LLM is a plug-and-play offline Large Language Model configured
            to run directly from your high-speed USB drive. Zero cloud dependencies,
            zero data leakage, unlimited local intelligence on any PC.
          </p>

          <div className={styles.cta}>
            <a
              href="https://drive.google.com/drive/folders/1N_r7mJ-cgrx-1TRVa-RjPcUWhJTb2x8T?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
              id="hero-download-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PEN-LLM
            </a>

            <a href="#install" className={styles.btnGhost} id="hero-install-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
              </svg>
              How to Install
            </a>
          </div>

          {/* Stats Row */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statIconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className={styles.statText}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Offline Mode</span>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div className={styles.statText}>
                <span className={styles.statNum}>0 KB</span>
                <span className={styles.statLabel}>Data Telemetry</span>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                  <line x1="6" y1="6" x2="6.01" y2="6"/>
                  <line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
              </div>
              <div className={styles.statText}>
                <span className={styles.statNum}>USB 3.2</span>
                <span className={styles.statLabel}>Instant Plug &amp; Run</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
