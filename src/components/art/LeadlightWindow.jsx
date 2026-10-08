import { useId } from 'react';

// Matches the Atelier's arched mosaic construction and Cathedral palette.
const ARCH = [[160,16],[201,37],[233,67],[255,108],[264,153],[264,314],[56,314],[56,153],[65,108],[87,67],[119,37]];
const COLORS = ['#3D8D82','#91BEB0','#E8B96F','#CE765C','#698E9D','#D8D7AA'];
export default function LeadlightWindow({ size = 380, label, seed = 42 }) {
  const id = useId().replace(/:/g, '');
  const cx = 145 + seed % 31, cy = 156 + seed % 23;
  const tiles = ARCH.flatMap((a,i) => {
    const b=ARCH[(i+1)%ARCH.length],f=.40+((i*2)%3)*.05;
    const inner=p=>[cx+(p[0]-cx)*f,cy+(p[1]-cy)*f];
    return [[[cx,cy],inner(a),inner(b)],[inner(a),a,b,inner(b)]];
  });
  return <svg viewBox="0 0 320 338" style={{height:size,width:'auto',maxWidth:'100%'}} role={label === '' ? undefined : 'img'} aria-hidden={label === '' ? true : undefined} aria-label={label || 'An arched stained-glass mosaic in teal, coral and gold.'}>
    <defs>{COLORS.map((color,i)=><linearGradient key={color+i} id={`${id}-${i}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={color}/><stop offset="1" stopColor={color} stopOpacity=".66"/></linearGradient>)}<clipPath id={`${id}-clip`}><polygon points={ARCH.map(p=>p.join(',')).join(' ')}/></clipPath></defs>
    <circle cx="160" cy="167" r="156" fill="none" stroke="#B9C8BA" strokeWidth=".6"/>
    <circle cx="160" cy="167" r="144" fill="none" stroke="#B9C8BA" strokeWidth=".6"/>
    <polygon points={ARCH.map(([x,y])=>`${x+5},${y+8}`).join(' ')} fill="#D8D5C8"/>
    {tiles.map((p,i)=><polygon key={i} points={p.map(v=>v.join(',')).join(' ')} fill={`url(#${id}-${(Math.floor(i/2)+seed%6)%6})`} stroke="#183B38" strokeWidth="2.4" strokeLinejoin="round"/>)}
    <g clipPath={`url(#${id}-clip)`} fill="white"><path d="M40 140L214 -20H232L40 177Z" opacity=".23"/><path d="M45 210L275 5L285 30L45 240Z" opacity=".1"/></g>
    <polygon points={ARCH.map(p=>p.join(',')).join(' ')} fill="none" stroke="#183B38" strokeWidth="5" strokeLinejoin="round"/>
    <circle cx={cx} cy={cy} r="8" fill="#B78A45"/><circle cx={cx-2} cy={cy-2} r="3" fill="#FAE3B4"/>
  </svg>;
}
