export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pen-llm.vercel.app';
  const lastModified = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
      images: [
        `${baseUrl}/hero-pendrive.png`,
        `${baseUrl}/logo.png`,
      ],
    },
  ];
}
