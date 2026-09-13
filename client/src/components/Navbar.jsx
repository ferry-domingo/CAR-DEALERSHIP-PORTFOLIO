import { useState } from 'react';
import { Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import InquiryModalButton from './InquiryModalButton.jsx';
import MobileMenu from './MobileMenu.jsx';
import { useProfile } from '../context/ProfileContext.jsx';

const links=[['/','Home'],['/about','About'],['/vehicles','Vehicles'],['/deliveries','Deliveries'],['/testimonials','Testimonials'],['/contact','Contact']];

export default function Navbar(){
  const[open,setOpen]=useState(false),profile=useProfile();
  return <>
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <NavLink to="/" className="flex min-w-0 items-center gap-4 leading-none">
          <img src="/images/BYD-Logo.png" alt="BYD" className="h-auto w-12 shrink-0 object-contain sm:w-14"/>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black tracking-tight sm:text-base">{profile.name.toUpperCase()}</span>
            <span className="mt-1 hidden truncate text-[9px] font-bold tracking-[.18em] text-zinc-500 sm:block">{profile.title.toUpperCase()}</span>
          </span>
        </NavLink>
        <nav className="hidden items-center gap-7 lg:flex">{links.map(([to,label])=><NavLink key={to} to={to} className={({isActive})=>`text-sm font-semibold transition ${isActive?'text-red-500':'text-zinc-600 hover:text-zinc-950'}`}>{label}</NavLink>)}</nav>
        <div className="flex shrink-0 items-center gap-3"><span className="hidden sm:inline-flex"><InquiryModalButton label="INQUIRE NOW"/></span><button onClick={()=>setOpen(true)} className="rounded-xl border border-zinc-200 p-2.5 lg:hidden" aria-label="Open menu"><Menu/></button></div>
      </div>
    </header>
    <MobileMenu open={open} onClose={()=>setOpen(false)} profile={profile}/>
  </>;
}
