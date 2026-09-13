export const Arrow = (p) => (
  <svg className="arw" width="16" height="16" viewBox="0 0 16 16" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true" {...p}>
    <path d="M3 8h9.5M8.5 4l4 4-4 4" />
  </svg>
);

export const Back = (p) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true" {...p}>
    <path d="M13 8H3.5M7.5 4l-4 4 4 4" />
  </svg>
);

const ico = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round',
  strokeLinejoin: 'round', 'aria-hidden': 'true' };


export const Shield = (p) => (<svg {...ico} {...p}><path d="M12 2.8 20 6v5.4c0 4.6-3.2 8.2-8 9.8-4.8-1.6-8-5.2-8-9.8V6z"/><path d="m9 12 2 2 4-4"/></svg>);
export const Spark  = (p) => (<svg {...ico} {...p}><path d="M12 2.8 14 9l6.2 2-6.2 2-2 6.2-2-6.2L3.8 11 10 9z"/></svg>);
export const Plug   = (p) => (<svg {...ico} {...p}><path d="M9 2.8v5M15 2.8v5M6 8h12v3.2a6 6 0 0 1-6 6 6 6 0 0 1-6-6z"/><path d="M12 17.2v4"/></svg>);
export const Mail   = (p) => (<svg {...ico} {...p}><rect x="2.8" y="5" width="18.4" height="14" rx="3"/><path d="m3.5 7.5 8.5 6 8.5-6"/></svg>);
export const Github = (p) => (<svg {...ico} {...p}><path d="M9 19.5c-4.5 1.4-4.5-2.3-6.3-2.8m12.6 5.3v-3.5c0-1 .1-1.4-.5-2 2.6-.3 5.2-1.3 5.2-5.7a4.4 4.4 0 0 0-1.2-3.1 4.1 4.1 0 0 0-.1-3.1s-1-.3-3.3 1.2a11.3 11.3 0 0 0-6 0C7.1 4.3 6.1 4.6 6.1 4.6a4.1 4.1 0 0 0-.1 3.1 4.4 4.4 0 0 0-1.2 3.2c0 4.3 2.6 5.3 5.2 5.6-.6.6-.6 1.2-.5 2v3.6"/></svg>);
