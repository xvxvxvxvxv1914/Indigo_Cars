'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Partners from '../components/Partners';
import BottomNav from '../components/BottomNav';

const placeholder = (h: string) => () => <div style={{ minHeight: h }} />;

const HotOffers   = dynamic(() => import('../components/HotOffers'),   { loading: placeholder('400px') });
const WhyUs       = dynamic(() => import('../components/WhyUs'),       { loading: placeholder('500px') });
const RouteMap    = dynamic(() => import('../components/RouteMap'),    { ssr: false, loading: placeholder('480px') });
const Testimonials= dynamic(() => import('../components/Testimonials'),{ loading: placeholder('400px') });
const FAQ         = dynamic(() => import('../components/FAQ'),         { loading: placeholder('400px') });
const Calculator  = dynamic(() => import('../components/Calculator'),  { loading: placeholder('500px') });
const Contact     = dynamic(() => import('../components/Contact'),     { loading: placeholder('500px') });
const Footer      = dynamic(() => import('../components/Footer'),      { loading: placeholder('200px') });

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
