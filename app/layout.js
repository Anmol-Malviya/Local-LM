import { Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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

export const metadata = {
  title: 'PEN-LLM — Offline AI on Your Pendrive',
  description:
    'PEN-LLM lets you run a powerful offline Large Language Model directly from your USB pendrive. No internet, no cloud, total privacy. Plug & play AI.',
  keywords: 'offline AI, pendrive LLM, llama.cpp, offline chatbot, portable AI',
  openGraph: {
    title: 'PEN-LLM — Offline AI on Your Pendrive',
    description: 'Carry your AI in your pocket. 100% offline, zero cloud.',
    type: 'website',
  },
};

import Tracker from './components/Tracker';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Tracker />
        {children}
      </body>
    </html>
  );
}
