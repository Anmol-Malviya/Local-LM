'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/track';

export default function Tracker() {
  useEffect(() => {
    // 1. Track initial page view
    trackEvent({
      eventType: 'page_view',
      buttonLabel: 'Website Visit',
    });

    // 2. Global click delegator for tracked elements
    const handleClick = (e) => {
      const target = e.target.closest('a, button');
      if (!target) return;

      const id = target.id || '';
      const href = target.getAttribute('href') || '';
      const text = target.innerText?.trim() || '';

      // Check for download buttons
      if (
        id === 'hero-download-btn' ||
        id === 'nav-download-btn' ||
        id === 'main-download-btn' ||
        id === 'step1-drive-link' ||
        href.includes('drive.google.com')
      ) {
        let label = 'Download Button';
        if (id === 'hero-download-btn') label = 'Hero Section Download';
        else if (id === 'nav-download-btn') label = 'Navbar Download';
        else if (id === 'main-download-btn') label = 'Bottom Banner Download';
        else if (id === 'step1-drive-link') label = 'Step 1 Guide Download';
        else if (text) label = text;

        trackEvent({
          eventType: 'download_click',
          buttonId: id || 'drive-link',
          buttonLabel: label,
        });
      } else if (id === 'hero-install-btn' || href === '#install') {
        trackEvent({
          eventType: 'install_click',
          buttonId: id || 'install-link',
          buttonLabel: 'How to Install Guide',
        });
      } else if (id === 'localhost-link' || href.includes('localhost:8080')) {
        trackEvent({
          eventType: 'localhost_click',
          buttonId: id || 'localhost-link',
          buttonLabel: 'Open Llama UI (localhost:8080)',
        });
      }
    };

    window.addEventListener('click', handleClick, { passive: true });
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return null;
}
