'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import HotOffers from '../components/HotOffers';
import Partners from '../components/Partners';
import WhyUs from '../components/WhyUs';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Calculator from '../components/Calculator';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

const RouteMap = dynamic(() => import('../components/RouteMap'), {
  ssr: false,
  loading: () => <div className="py-12" />,
});


export default function HomePage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="pb-16 md:pb-0">
        <Hero />
        <HowItWorks />
        <HotOffers />
        <Partners />
        <WhyUs />
        <RouteMap />
        <Testimonials />
        <FAQ />
        <Calculator />
        <Contact />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
