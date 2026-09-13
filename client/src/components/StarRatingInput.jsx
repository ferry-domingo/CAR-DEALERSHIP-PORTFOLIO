import { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRatingInput({value,onChange,label='Rating'}) {
  const [hovered,setHovered]=useState(0);
  const selected=Number(value)||0,preview=hovered||selected;
  return <fieldset><legend className="label">{label}</legend><div className="flex items-center gap-1" onMouseLeave={()=>setHovered(0)}>{[1,2,3,4,5].map(star=><button key={star} type="button" onMouseEnter={()=>setHovered(star)} onFocus={()=>setHovered(star)} onBlur={()=>setHovered(0)} onClick={()=>onChange(star)} aria-label={`${star} star${star>1?'s':''}`} aria-pressed={selected===star} className="rounded-lg p-1.5 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400"><Star className={`h-7 w-7 transition ${star<=preview?'fill-amber-400 text-amber-400':'text-zinc-300'}`}/></button>)}<span className="ml-2 text-xs font-bold text-zinc-500">{selected} of 5</span></div></fieldset>;
}
