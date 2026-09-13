import { useRef,useState } from 'react';
import { handleImageError } from '../utils/image.js';

export default function ZoomableImage({src,alt,className=''}) {
  const [zoomed,setZoomed]=useState(false),[origin,setOrigin]=useState('center center'),[position,setPosition]=useState({x:0,y:0}),[dragging,setDragging]=useState(false);
  const imageRef=useRef(null),dragRef=useRef(null),movedRef=useRef(false);
  const click=event=>{
    if(movedRef.current){movedRef.current=false;return}
    if(zoomed){setZoomed(false);setPosition({x:0,y:0});return}
    const rect=imageRef.current.getBoundingClientRect();
    const x=Math.max(0,Math.min(100,((event.clientX-rect.left)/rect.width)*100));
    const y=Math.max(0,Math.min(100,((event.clientY-rect.top)/rect.height)*100));
    setOrigin(`${x}% ${y}%`);setPosition({x:0,y:0});setZoomed(true);
  };
  const start=event=>{if(!zoomed)return;event.currentTarget.setPointerCapture(event.pointerId);dragRef.current={startX:event.clientX,startY:event.clientY,x:position.x,y:position.y};movedRef.current=false;setDragging(true)};
  const move=event=>{if(!dragging||!dragRef.current)return;const dx=event.clientX-dragRef.current.startX,dy=event.clientY-dragRef.current.startY;if(Math.abs(dx)>3||Math.abs(dy)>3)movedRef.current=true;setPosition({x:dragRef.current.x+dx,y:dragRef.current.y+dy})};
  const stop=()=>{setDragging(false);dragRef.current=null};
  return <button type="button" onClick={click} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} aria-label={zoomed?'Drag image or click to zoom out':'Click a point to zoom in'} className={`relative grid min-h-64 w-full touch-none select-none place-items-center overflow-hidden rounded-2xl bg-zinc-950 focus:outline-none focus:ring-4 focus:ring-red-500/30 ${zoomed?(dragging?'cursor-grabbing':'cursor-grab'):'cursor-zoom-in'} ${className}`}>
    <img ref={imageRef} draggable="false" src={src} onError={handleImageError} alt={alt} style={{transformOrigin:origin,transform:`translate(${position.x}px, ${position.y}px) scale(${zoomed?1.75:1})`}} className="pointer-events-none max-h-[68vh] w-full object-contain transition-transform duration-200"/>
    <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/65 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur">{zoomed?'Drag to move · Click to zoom out':'Click where you want to zoom'}</span>
  </button>;
}
