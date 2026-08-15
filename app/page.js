import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import InstallGuide from './components/InstallGuide';
import FAQ from './components/FAQ';
import Download from './components/Download';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <InstallGuide />
        <FAQ />
        <Download />
      </main>
      <Footer />
    </>
  );
}

