import { useEffect } from 'react';

/* The prerenderer writes these tags into the static HTML for each route; this
   keeps them right after a client-side navigation, which the prerenderer cannot
   see. Same source of truth either way — src/meta.js. */
function set(sel, attr, value) {
  if (!value) return;
  let el = document.head.querySelector(sel);
  if (!el) return;
  el.setAttribute(attr, value);
}

export default function useMeta({ title, description, themeColor, favicon }) {
  useEffect(() => {
    if (title) document.title = title;
    set('meta[name="description"]', 'content', description);
    set('meta[property="og:title"]', 'content', title);
    set('meta[property="og:description"]', 'content', description);
    set('meta[name="theme-color"]', 'content', themeColor);
    if (favicon) set('link[rel="icon"]', 'href', favicon);
  }, [title, description, themeColor, favicon]);
}
