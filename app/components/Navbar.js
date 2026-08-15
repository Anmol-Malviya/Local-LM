'use client';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>
          <div className={styles.logoWrap}>
            <img src="/logo.png" alt="PEN-LLM Logo" className={styles.logoImg} />
          </div>
          <span className={styles.logoText}>
            PEN<span className={styles.accent}>-LLM</span>
          </span>
        </a>

        <div className={styles.links}>
          <a href="#features" className={styles.link}>Features</a>
          <a href="#install"  className={styles.link}>Install Guide</a>
          <a href="#download" className={styles.link}>Download</a>
          <a href="#install"  className={styles.link}>FAQ</a>
        </div>

        <a
          href="https://drive.google.com/drive/folders/1N_r7mJ-cgrx-1TRVa-RjPcUWhJTb2x8T?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
          id="nav-download-btn"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>Download PEN-LLM</span>
        </a>
      </div>
    </nav>
  );
}
