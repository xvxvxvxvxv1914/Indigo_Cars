import { useRef } from 'react';

/**
 * Returns onMouseMove / onMouseLeave handlers that make a button subtly
 * translate toward the cursor (magnetic effect, max ~8px).
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    const clamped = (v: number) => Math.max(-8, Math.min(8, v));
    el.style.transform = `translate(${clamped(dx)}px, ${clamped(dy)}px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = '';
    }
  };

  return { ref, onMouseMove, onMouseLeave };
}
