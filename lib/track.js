'use client';

function getVisitorId() {
  if (typeof window === 'undefined') return 'server';
  let vid = localStorage.getItem('pen_llm_vid');
  if (!vid) {
    vid = 'v_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now();
    localStorage.setItem('pen_llm_vid', vid);
  }
  return vid;
}

function getSessionId() {
  if (typeof window === 'undefined') return 'server';
  let sid = sessionStorage.getItem('pen_llm_sid');
  if (!sid) {
    sid = 's_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
    sessionStorage.setItem('pen_llm_sid', sid);
  }
  return sid;
}

export function trackEvent({ eventType, buttonId, buttonLabel }) {
  if (typeof window === 'undefined') return;

  const payload = {
    eventType,
    buttonId: buttonId || null,
    buttonLabel: buttonLabel || null,
    page: window.location.pathname,
    referrer: document.referrer || '',
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    screen: `${window.innerWidth}x${window.innerHeight}`,
  };

  try {
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', blob);
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    }
  } catch (err) {
    console.warn('Track event error:', err);
  }
}
