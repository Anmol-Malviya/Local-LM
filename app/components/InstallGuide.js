import styles from './InstallGuide.module.css';

const DRIVE_URL =
  'https://drive.google.com/drive/folders/1N_r7mJ-cgrx-1TRVa-RjPcUWhJTb2x8T?usp=sharing';

const steps = [
  {
    id: 'step-1',
    num: '01',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    title: 'Download the Files',
    desc: 'Click the button below to open the Google Drive folder. Download all files to your computer.',
    extra: (
      <a
        href={DRIVE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.driveLink}
        id="step1-drive-link"
      >
        <span>Open Google Drive Folder</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </a>
    ),
  },
  {
    id: 'step-2',
    num: '02',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="7" y="2" width="10" height="6" rx="1"/>
        <rect x="5" y="8" width="14" height="14" rx="2"/>
        <line x1="9" y1="4" x2="9.01" y2="4"/>
        <line x1="15" y1="4" x2="15.01" y2="4"/>
      </svg>
    ),
    title: 'Format Your Pendrive',
    desc: 'Connect your USB pendrive. Right-click the drive in File Explorer → Format. Choose FAT32 or NTFS and click Start.',
    extra: (
      <div className={styles.warnBox}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>Formatting erases all data on the pendrive.</span>
      </div>
    ),
  },
  {
    id: 'step-3',
    num: '03',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
      </svg>
    ),
    title: 'Copy Files to Pendrive',
    desc: 'Select all downloaded files and folders. Paste them directly into the root of your formatted pendrive — not inside a subfolder.',
    extra: (
      <div className={styles.fileTree}>
        <div className={styles.ftRoot}>Pendrive (Root)</div>
        <div className={styles.ftItem}>├── models/</div>
        <div className={styles.ftItem}>├── llama-server/</div>
        <div className={`${styles.ftItem} ${styles.ftHighlight}`}>├── run.bat</div>
        <div className={styles.ftItem}>└── other files</div>
      </div>
    ),
  },
  {
    id: 'step-4',
    num: '04',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
    title: 'Launch & Chat!',
    desc: 'Double-click run.bat on your pendrive. A terminal window opens and starts the AI server. Then open your browser and go to:',
    extra: (
      <a
        href="http://localhost:8080"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.localhostBtn}
        id="localhost-link"
      >
        <div className={styles.localhostInner}>
          <span>http://localhost:8080</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </div>
        <span className={styles.localhostLabel}>Click to open Llama UI →</span>
      </a>
    ),
  },
];

export default function InstallGuide() {
  return (
    <section className={styles.section} id="install">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>SETUP GUIDE</span>
          <h2 className={styles.title}>Install in 4 Simple Steps</h2>
          <p className={styles.sub}>From download to running AI — takes less than 10 minutes.</p>
        </div>

        <div className={styles.stepGrid}>
          {steps.map((step, idx) => (
            <div key={step.id} id={step.id} className={styles.stepColumn}>
              {/* Top Node with Connector Line */}
              <div className={styles.nodeHeader}>
                <div className={styles.circleWrap}>
                  <div className={styles.stepCircle}>
                    {step.icon}
                  </div>
                  <span className={styles.stepBadge}>{step.num}</span>
                </div>
                {idx < steps.length - 1 && <div className={styles.dashedConnector} />}
              </div>

              {/* Step Content Card */}
              <div className={styles.stepCardBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
                <div className={styles.extraWrap}>{step.extra}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
