import { Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Tracker from './components/Tracker';
import { FAQ_DATA } from '../lib/faqData';


const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pen-llm.vercel.app';
const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  'l7UHVfX0v0ptKBOr9NX-xxPeF_af8ii22F3CP0OQz-c';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'PEN-LLM — Offline AI on Your Pendrive | Portable Private LLM',
    template: '%s | PEN-LLM',
  },
  description:
    'PEN-LLM lets you run powerful offline Large Language Models directly from a USB pendrive. 100% offline, 0 KB telemetry, zero cloud dependencies. Plug and play local AI for Windows.',
  keywords: [
    'offline AI',
    'pendrive LLM',
    'portable AI',
    'USB LLM',
    'llama.cpp offline',
    'local AI Windows',
    'offline chatbot',
    'private AI',
    'run LLM on flash drive',
    'air-gapped AI',
    'local LLM without internet',
    'portable llama.cpp server',
  ],
  authors: [{ name: 'Anmol Malviya', url: 'https://github.com/Anmol-Malviya' }],
  creator: 'Anmol Malviya',
  publisher: 'PEN-LLM',
  applicationName: 'PEN-LLM',
  category: 'Technology & Artificial Intelligence',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PEN-LLM — Offline AI on Your Pendrive',
    description:
      'Carry your AI in your pocket. 100% offline, zero cloud, zero telemetry. Plug into any Windows PC and start chatting.',
    url: siteUrl,
    siteName: 'PEN-LLM',
    images: [
      {
        url: '/hero-pendrive.png',
        width: 1200,
        height: 630,
        alt: 'PEN-LLM Offline AI Pendrive Hardware and Chat Interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PEN-LLM — Offline AI on Your Pendrive',
    description:
      'Plug-and-play offline Large Language Model configured to run directly from your USB drive with zero internet.',
    images: ['/hero-pendrive.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: googleVerification || undefined,
  },
};

export default function RootLayout({ children }) {
  // Structured Data (JSON-LD) for SEO, Google Rich Results, & AEO (Perplexity/ChatGPT/Gemini)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'PEN-LLM',
        description: 'Offline AI and Large Language Model on your USB pendrive',
        publisher: {
          '@type': 'Person',
          name: 'Anmol Malviya',
          url: 'https://github.com/Anmol-Malviya',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl}/#software`,
        name: 'PEN-LLM',
        operatingSystem: 'Windows 10, Windows 11 (64-bit)',
        applicationCategory: 'UtilitiesApplication, DeveloperApplication, AIApplication',
        description:
          'Plug-and-play offline Large Language Model configured to run directly from a USB pendrive without internet or telemetry.',
        softwareVersion: '1.0',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        downloadUrl:
          'https://drive.google.com/drive/folders/1N_r7mJ-cgrx-1TRVa-RjPcUWhJTb2x8T?usp=sharing',
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: FAQ_DATA.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'HowTo',
        '@id': `${siteUrl}/#howto`,
        name: 'How to Install and Run PEN-LLM on a USB Pendrive',
        description:
          'Step-by-step guide to setting up and running an offline Large Language Model from a USB pendrive on Windows.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Download the Files',
            text: 'Download the complete PEN-LLM files from Google Drive.',
            url: `${siteUrl}/#install`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Format Your Pendrive',
            text: 'Connect your USB pendrive and format it as NTFS or FAT32.',
            url: `${siteUrl}/#install`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Copy Files to Pendrive Root',
            text: 'Copy the models/, llama-server/, and run.bat files directly into the root of the USB drive.',
            url: `${siteUrl}/#install`,
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Launch & Chat',
            text: 'Double-click run.bat and open http://localhost:8080 in your browser to start chatting.',
            url: `${siteUrl}/#install`,
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="google-site-verification" content={googleVerification} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Tracker />
        {children}
      </body>
    </html>
  );
}


