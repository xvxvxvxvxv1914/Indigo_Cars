'use client';

import { useEffect, useRef } from 'react';

type ScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  stagger?: number;
  onReveal?: () => void;
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const optsRef = useRef(options);
  optsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { threshold = 0.05, rootMargin, stagger = 80, onReveal } = optsRef.current;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      el.querySelectorAll('.animate-on-scroll').forEach((node, i) => {
        setTimeout(() => node.classList.add('visible'), i * stagger);
      });
      onReveal?.();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal();
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
