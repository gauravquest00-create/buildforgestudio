import { useEffect, useRef } from 'react';

export const useScrollReveal = (options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [options]);

  return elementRef;
};
