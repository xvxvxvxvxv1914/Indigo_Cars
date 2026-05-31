import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -600, y: -600 });
  const target = useRef({ x: -600, y: -600 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);
    let raf: number;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.1;
      pos.current.y += (target.current.y - pos.current.y) * 0.1;
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x - 250}px, ${pos.current.y - 250}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
      style={{ zIndex: 0, background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)', filter: 'blur(30px)' }}
    />
  );
}
import { LangProvider } from './context/LangContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import HotOffers from './components/HotOffers';
import WhyUs from './components/WhyUs';
import RouteMap from './components/RouteMap';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <HotOffers />
        <WhyUs />
        <RouteMap />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <CursorGlow />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  );
}
