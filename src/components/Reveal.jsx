import { useEffect, useRef, useState } from 'react';

/* Fades a block in the first time it reaches the viewport.

   It starts in the revealed state and only hides itself once the effect runs,
   which matters because every page here is prerendered to static HTML: a
   visitor with JavaScript disabled, or one who arrives before hydration, gets
   the finished page rather than a column of invisible sections. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = [armed ? 'reveal' : '', shown ? 'in' : '', className].filter(Boolean).join(' ');
  return (
    <Tag ref={ref} className={cls} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}
