'use client';

import { useEffect, useRef } from 'react';

type ScrollRevealOptions = {
  /** IntersectionObserver threshold (default 0.05) */
  threshold?: number;
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
  /** Per-element stagger delay in ms (default 80) */
  stagger?: number;
  /** Called once when the section first enters the viewport */
  onReveal?: () => void;
};

/**
 * Reveals `.animate-on-scroll` descendants of the returned ref element with a
 * staggered delay once the element scrolls into view. Replaces the
 * copy-pasted IntersectionObserver effect that lived in each section.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  // Keep latest options without re-running the mount-only effect.
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

    // Fallback: if the section is already within the viewport on mount
    // (deep-link / anchor jump / short page), reveal immediately so the
    // content never stays invisible waiting for a scroll that won't come.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal();
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
