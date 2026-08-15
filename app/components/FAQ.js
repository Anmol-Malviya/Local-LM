'use client';
import { useState } from 'react';
import styles from './FAQ.module.css';
import { FAQ_DATA } from '../../lib/faqData';


export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className={styles.section} id="faq">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>COMMON QUESTIONS</span>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.sub}>
            Everything you need to know about running offline AI directly from a USB drive.
          </p>
        </div>

        <div className={styles.faqList}>
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`${styles.faqCard} ${isOpen ? styles.open : ''}`}
              >
                <button
                  type="button"
                  className={styles.questionBtn}
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  id={`faq-btn-${idx}`}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <div className={styles.chevronWrap}>
                    <svg
                      className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className={styles.answerWrapper}>
                    <p className={styles.answerText}>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
