import { useState } from 'react';
import { ArrowRight, Expand, Gauge } from 'lucide-react';
import Button from './Button.jsx';
import Modal from './Modal.jsx';
import ZoomableImage from './ZoomableImage.jsx';
import { formatCurrency } from '../utils/format.js';
import { handleImageError } from '../utils/image.js';

export default function VehicleCard({ vehicle }) {
  const [open,setOpen]=useState(false);
  const image=vehicle.images?.[0]||'/images/hero-ev.svg';
  return <>
    <article className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-premium">
      <button type="button" onClick={()=>setOpen(true)} className="relative block w-full overflow-hidden bg-zinc-100 text-left focus:outline-none focus:ring-4 focus:ring-inset focus:ring-red-500/30" aria-label={`Open and zoom ${vehicle.name} image`}>
        <img src={image} onError={handleImageError} alt={vehicle.name} className="aspect-[4/2.8] w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy"/>
        <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-black/75 px-3 py-2 text-xs font-bold text-white backdrop-blur"><Expand className="h-4 w-4"/> View Image</span>
      </button>
      <div className="p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-red-500">{vehicle.type}</p><h3 className="mt-2 text-2xl font-black tracking-tight">{vehicle.name}</h3></div><Gauge className="h-5 w-5 text-zinc-400"/></div>{vehicle.description&&<p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">{vehicle.description}</p>}<div className="mt-5 flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-zinc-400">Starting price</p><p className="mt-1 font-black">{formatCurrency(vehicle.price)}</p></div><Button to={`/vehicles/${vehicle.slug}`} variant="secondary" className="px-4 py-2.5">View Details <ArrowRight className="h-4 w-4"/></Button></div></div>
    </article>
    <Modal open={open} onClose={()=>setOpen(false)} title={`${vehicle.name} Image`}>
      <ZoomableImage src={image} alt={vehicle.name}/>
      <p className="mt-3 text-center text-xs text-zinc-500">Click the image to zoom in or out.</p>
    </Modal>
  </>;
}
