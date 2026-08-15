export const FAQ_DATA = [
  {
    question: 'What is PEN-LLM and how does it work?',
    answer:
      'PEN-LLM is a portable, completely offline AI system. It bundles a high-performance llama.cpp inference server and pre-configured AI models directly on your USB pendrive. When you plug it into any Windows computer and run the launch script, it serves a fast, responsive chat interface right in your local browser (http://localhost:8080) without installing anything on the host computer.',
  },
  {
    question: 'Does PEN-LLM require an active internet connection?',
    answer:
      'No! Once the initial files are downloaded onto your pendrive, PEN-LLM operates 100% offline. You can use it in remote locations, air-gapped secure facilities, airplanes, or anywhere without Wi-Fi or cellular network.',
  },
  {
    question: 'What are the minimum hardware and pendrive requirements?',
    answer:
      'You need a 64-bit Windows 10 or 11 PC with at least 8 GB of RAM (16 GB is recommended for optimal speed). For the USB drive, a USB 3.0, 3.1, or 3.2 flash drive with at least 32 GB or 64 GB storage formatted to NTFS or FAT32 is recommended for fast read and write speeds.',
  },
  {
    question: 'Is my data and chat history completely private?',
    answer:
      'Yes, 100%. Traditional AI services send your prompts and proprietary data to third-party cloud servers. With PEN-LLM, all computation occurs directly on your local CPU/RAM. There are zero cloud calls, zero telemetry, and zero remote logging.',
  },
  {
    question: 'Can I use PEN-LLM on multiple different computers?',
    answer:
      'Absolutely. That is the core advantage of PEN-LLM: your entire AI environment is portable. Unplug the drive from your desktop, plug it into a laptop or office PC, double-click run.bat, and your AI assistant is immediately ready to chat.',
  },
  {
    question: 'Is PEN-LLM free to download and use?',
    answer:
      'Yes, PEN-LLM is built upon open-source foundations. There are no subscriptions, no recurring license fees, and no API credits required.',
  },
];
