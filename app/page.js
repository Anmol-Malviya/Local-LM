import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import InstallGuide from './components/InstallGuide';
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
        <Download />
      </main>
      <Footer />
    </>
  );
}
