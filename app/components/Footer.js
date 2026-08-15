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

          {/* Column 1: Navigation */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <div className={styles.colLinks}>
              <a href="#hero" className={styles.link}>Overview</a>
              <a href="#features" className={styles.link}>Core Features</a>
              <a href="#install" className={styles.link}>Installation Guide</a>
              <a href="#faq" className={styles.link}>FAQ &amp; Troubleshooting</a>
              <a href="#download" className={styles.link}>Download Files</a>
            </div>
          </div>

          {/* Column 2: Open Source Ecosystem */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Ecosystem &amp; Tech</h4>
            <div className={styles.colLinks}>
              <a href="https://github.com/ggerganov/llama.cpp" target="_blank" rel="noopener noreferrer" className={styles.link}>
                llama.cpp Engine ↗
              </a>
              <a href="https://huggingface.co/models?search=gguf" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Hugging Face GGUF ↗
              </a>
              <a href="https://github.com/Anmol-Malviya/Local-LM" target="_blank" rel="noopener noreferrer" className={styles.link}>
                GitHub Project ↗
              </a>
              <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Local UI (Port 8080)
              </a>
            </div>
          </div>

          {/* Column 3: Resources */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Resources &amp; Data</h4>
            <div className={styles.colLinks}>
              <a href="/sitemap.xml" className={styles.link} target="_blank" rel="noopener noreferrer">XML Sitemap</a>
              <a href="/robots.txt" className={styles.link} target="_blank" rel="noopener noreferrer">Robots Directives</a>
              <a href="/llms.txt" className={styles.link} target="_blank" rel="noopener noreferrer">AI Crawler Doc (llms.txt)</a>
              <a href="https://drive.google.com/drive/folders/1N_r7mJ-cgrx-1TRVa-RjPcUWhJTb2x8T?usp=sharing" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Google Drive Storage ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
