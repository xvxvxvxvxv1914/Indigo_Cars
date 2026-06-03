'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';

// Below-the-fold sections are code-split and hydrated after the critical
// above-the-fold content (Navbar + Hero + HowItWorks). This shrinks the
// initial hydration work, lowering TBT and letting the LCP element paint
// sooner on throttled mobile CPUs. SSR is kept (no ssr:false) so the HTML
// and content remain present for SEO and no-JS.
const HotOffers = dynamic(() => import('../components/HotOffers'));
const Partners = dynamic(() => import('../components/Partners'));
const WhyUs = dynamic(() => import('../components/WhyUs'));
const Testimonials = dynamic(() => import('../components/Testimonials'));
const FAQ = dynamic(() => import('../components/FAQ'));
const Calculator = dynamic(() => import('../components/Calculator'));
const Contact = dynamic(() => import('../components/Contact'));
const Footer = dynamic(() => import('../components/Footer'));
const BottomNav = dynamic(() => import('../components/BottomNav'));

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
