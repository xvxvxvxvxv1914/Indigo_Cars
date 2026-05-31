import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
