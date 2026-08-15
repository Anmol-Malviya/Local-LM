# PEN-LLM — Offline AI on Your Pendrive 🚀

[![Live Website](https://img.shields.io/badge/Website-pen--llm.vercel.app-6366f1?style=for-the-badge&logo=vercel)](https://pen-llm.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Powered by llama.cpp](https://img.shields.io/badge/Engine-llama.cpp-yellow?style=for-the-badge&logo=c%2B%2B)](https://github.com/ggerganov/llama.cpp)
[![Offline AI](https://img.shields.io/badge/Offline%20AI-100%25%20Air--Gapped-green?style=for-the-badge)](https://pen-llm.vercel.app/#features)

> **[PEN-LLM (https://pen-llm.vercel.app)](https://pen-llm.vercel.app)** is a plug-and-play offline Large Language Model system configured to run directly from standard USB flash drives on Windows PCs without requiring internet connectivity, cloud accounts, or telemetry.

---

## 🌐 Official Website & Resources
- **Live Website**: [https://pen-llm.vercel.app](https://pen-llm.vercel.app)
- **Direct Download**: [Google Drive Download Folder](https://drive.google.com/drive/folders/1N_r7mJ-cgrx-1TRVa-RjPcUWhJTb2x8T?usp=sharing)
- **Setup Guide**: [https://pen-llm.vercel.app/#install](https://pen-llm.vercel.app/#install)
- **FAQ**: [https://pen-llm.vercel.app/#faq](https://pen-llm.vercel.app/#faq)

---

## ✨ Key Features
- **100% Offline**: Works in remote locations, air-gapped secure labs, airplanes, and offline computers.
- **Zero Telemetry**: Complete data privacy. Prompts and outputs never touch external cloud servers.
- **Portable Intelligence**: Store models, server binaries, and configuration on a USB 3.0/3.2 flash drive.
- **Built-in Web Chat UI**: Powered by `llama.cpp`'s high-speed local web server at `http://localhost:8080`.
- **One-Click Launch**: Double-click `run.bat` and begin chatting immediately.

---

## 🛠️ Quick Installation

1. **Download files** from the [official storage repository](https://drive.google.com/drive/folders/1N_r7mJ-cgrx-1TRVa-RjPcUWhJTb2x8T?usp=sharing).
2. **Format your pendrive** to NTFS or FAT32 (32GB+ USB 3.0 recommended).
3. **Copy files** (`models/`, `llama-server/`, and `run.bat`) into the root directory of your USB pendrive.
4. **Double click `run.bat`** on your drive and open [http://localhost:8080](http://localhost:8080) in your web browser.

---

## 💻 Tech Stack & Architecture
- **Inference Runtime**: [llama.cpp](https://github.com/ggerganov/llama.cpp)
- **Web App**: [Next.js 16 (App Router)](https://nextjs.org), React 19, Vanilla CSS
- **Analytics & Tracking**: MongoDB Atlas
- **SEO & AEO Engine**: Full Schema.org JSON-LD structured data, dynamic XML sitemaps, and `llms.txt` crawler specs.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
