import styles from './Download.module.css';

const DRIVE_URL =
  'https://drive.google.com/drive/folders/1N_r7mJ-cgrx-1TRVa-RjPcUWhJTb2x8T?usp=sharing';

export default function Download() {
  return (
    <section className={styles.section} id="download">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.glow} />

          <div className={styles.left}>
            <div className={styles.iconWrap}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={styles.boltIcon}>
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div>
              <h2 className={styles.title}>Ready to experience offline AI freedom?</h2>
              <p className={styles.sub}>Download PEN-LLM and run powerful AI directly from your pendrive.</p>
              <div className={styles.tags}>
                <span className={styles.tag}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Windows Compatible
                </span>
                <span className={styles.tag}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  No Install Needed
                </span>
                <span className={styles.tag}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                  </svg>
                  Fully Offline
                </span>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <a
              href={DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.dlBtn}
              id="main-download-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Download from Google Drive</span>
            </a>
            <p className={styles.note}>Open in Google Drive – Free to download</p>
          </div>
        </div>
      </div>
    </section>
  );
}
