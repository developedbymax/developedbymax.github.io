import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* React Router keeps the scroll position across a client navigation, which is
   right for a back button and wrong for a link. Restore the top on a push, and
   honour a #hash when there is one. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);

  return null;
}
