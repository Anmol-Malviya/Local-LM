import styles from './Features.module.css';

const features = [
  {
    id: 'feat-offline',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: 'blue',
    title: 'Truly Offline',
    desc: 'Works without any internet connection. Perfect for secure environments, remote areas, or privacy-conscious use.',
  },
  {
    id: 'feat-portable',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="7" y="2" width="10" height="6" rx="1"/>
        <rect x="5" y="8" width="14" height="14" rx="2"/>
        <line x1="9" y1="4" x2="9.01" y2="4"/>
        <line x1="15" y1="4" x2="15.01" y2="4"/>
      </svg>
    ),
    color: 'purple',
    title: 'Pendrive Portable',
    desc: 'Carry your entire AI in your pocket. Plug into any Windows PC and run instantly — no installation needed on the host machine.',
  },
  {
    id: 'feat-private',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    color: 'pink',
    title: 'Total Privacy',
    desc: 'Your conversations never leave your device. No logging, no telemetry, no cloud — complete data sovereignty.',
  },
  {
    id: 'feat-ui',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    color: 'cyan',
    title: 'Beautiful Chat UI',
    desc: 'Powered by llama.cpp\'s web UI at localhost:8080 — a clean, fast chat interface right in your browser.',
  },
  {
    id: 'feat-easy',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-1.5 5-1.5"/>
        <path d="M15 6v5s3.03-.55 4.5-2c1.63-1.62 1.5-5 1.5-5"/>
      </svg>
    ),
    color: 'violet',
    title: 'One-Click Launch',
    desc: 'Just double-click run.bat and the model starts. No Python, no dependencies, no headache.',
  },
  {
    id: 'feat-free',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 12 20 22 4 22 4 12"/>
        <rect x="2" y="7" width="20" height="5"/>
        <line x1="12" y1="22" x2="12" y2="7"/>
        <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
        <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
      </svg>
    ),
    color: 'amber',
    title: 'Completely Free',
    desc: 'Open source foundation. No subscriptions, no API keys, no hidden costs. Download once, use forever.',
  },
];

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>WHY PEN-LLM?</span>
          <h2 className={styles.title}>AI Without Boundaries</h2>
          <p className={styles.sub}>Everything you need, nothing you don&apos;t. Run powerful AI anywhere.</p>
        </div>

        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.id} id={f.id} className={styles.card}>
              <div className={`${styles.iconWrap} ${styles[f.color]}`}>
                {f.icon}
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
