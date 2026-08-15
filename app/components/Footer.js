import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <div className={styles.logoWrap}>
                <img src="/logo.png" alt="PEN-LLM Logo" className={styles.logoImg} />
              </div>
              <span className={styles.logoText}>
                PEN<span className={styles.accent}>-LLM</span>
              </span>
            </div>
            <p className={styles.tagline}>Offline AI - Portable Intelligence - Total Privacy</p>
            <p className={styles.copy}>Built with ❤️ for offline AI freedom.</p>
          </div>

          {/* Column 1: Quick Links */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <div className={styles.colLinks}>
              <a href="#features" className={styles.link}>Features</a>
              <a href="#install" className={styles.link}>Install Guide</a>
            </div>
          </div>

          {/* Column 2: Download */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Download</h4>
            <div className={styles.colLinks}>
              <a href="#download" className={styles.link}>Download</a>
              <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Open Llama UI
              </a>
            </div>
          </div>

          {/* Column 3: Legal & Help */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Support & Info</h4>
            <div className={styles.colLinks}>
              <a href="#faq" className={styles.link}>FAQ</a>
              <a href="https://github.com/Anmol-Malviya/Local-LM" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub Repository</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
