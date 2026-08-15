export default function manifest() {
  return {
    name: 'PEN-LLM — Offline AI on Your Pendrive',
    short_name: 'PEN-LLM',
    description: 'Plug-and-play offline Large Language Model configured to run directly from your USB pendrive with zero internet and zero telemetry.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070913',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
