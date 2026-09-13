import { useState } from 'react';
import { CalendarDays, Expand } from 'lucide-react';
import Modal from './Modal.jsx';
import ZoomableImage from './ZoomableImage.jsx';
import { formatDate } from '../utils/format.js';
import { handleImageError } from '../utils/image.js';

export default function DeliveryCard({delivery}) {
  const [open,setOpen]=useState(false);
  const image=delivery.image||'/images/delivery-placeholder.svg';
  const show=()=>setOpen(true);
  return <>
    <article role="button" tabIndex={0} onClick={show} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show()}}} aria-label={`View delivery for ${delivery.customer_name}`} className="group cursor-pointer overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-premium focus:outline-none focus:ring-4 focus:ring-red-500/20">
      <div className="relative"><img src={image} onError={handleImageError} alt={`${delivery.vehicle} delivery`} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy"/><span className="absolute bottom-3 right-3 rounded-full bg-black/70 p-2 text-white"><Expand className="h-4 w-4"/></span>{delivery.is_demo&&<span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-[10px] font-black uppercase tracking-[.16em] text-white">Sample / Demo</span>}</div>
      <div className="p-6"><p className="text-xs font-bold uppercase tracking-[.14em] text-red-500">{delivery.vehicle}</p><h3 className="mt-2 text-xl font-black">{delivery.customer_name}</h3><p className="mt-3 flex items-center gap-1 text-xs font-medium text-zinc-500"><CalendarDays className="h-3.5 w-3.5"/>{formatDate(delivery.delivery_date)}</p>{delivery.story&&<p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-600">{delivery.story}</p>}</div>
    </article>
    <Modal open={open} onClose={()=>setOpen(false)} title="Delivery Spotlight">
      <div className="relative"><ZoomableImage src={image} alt={`${delivery.vehicle} delivery`}/>{delivery.is_demo&&<span className="pointer-events-none absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">Sample / Demo</span>}</div>
      <div className="relative -mt-8 mx-3 rounded-2xl border border-zinc-100 bg-white p-5 shadow-xl"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[.14em] text-red-500">{delivery.vehicle}</p><h3 className="mt-1 text-2xl font-black">{delivery.customer_name}</h3></div><span className="flex w-fit items-center gap-2 rounded-full bg-zinc-100 px-3 py-2 text-xs font-bold text-zinc-600"><CalendarDays className="h-3.5 w-3.5 text-red-500"/>{formatDate(delivery.delivery_date)}</span></div>{delivery.story&&<div className="mt-4 border-l-2 border-red-500 pl-4"><p className="text-sm italic leading-6 text-zinc-600">“{delivery.story}”</p></div>}</div>
    </Modal>
  </>;
}
