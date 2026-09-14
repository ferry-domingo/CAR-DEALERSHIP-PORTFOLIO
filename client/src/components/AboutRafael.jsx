import { useState } from 'react';
import { Expand, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import InquiryModalButton from './InquiryModalButton.jsx';
import Modal from './Modal.jsx';
import ZoomableImage from './ZoomableImage.jsx';
import { useProfile } from '../context/ProfileContext.jsx';
import { assetUrl } from '../utils/image.js';

export default function AboutRafael({ compact = false }) {
  const profile = useProfile();
  const [photoOpen, setPhotoOpen] = useState(false);
  const photo = assetUrl(profile.profile_photo);
  const contactItems = [
    [Phone, profile.phone, profile.phone ? `tel:${profile.phone}` : ''],
    [Mail, profile.email, profile.email ? `mailto:${profile.email}` : ''],
    [Facebook, profile.facebook_url ? 'Facebook' : '', profile.facebook_url],
    [MapPin, profile.address, profile.map_url],
  ].filter(([, value]) => value);

  return <section className={compact ? '' : 'section-pad'}>
    <div className="container-shell grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
      <button type="button" onClick={()=>setPhotoOpen(true)} aria-label={`View a larger photo of ${profile.name}`} className="group relative overflow-hidden rounded-[2rem] bg-zinc-100 text-left focus:outline-none focus:ring-4 focus:ring-red-500/30">
        <img src={photo} alt={profile.name} className="aspect-[4/4.6] w-full object-cover transition duration-500 group-hover:scale-[1.02]" loading="lazy"/>
        <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs font-bold text-white backdrop-blur-sm"><Expand className="h-4 w-4"/> View photo</span>
      </button>
      <div>
        <SectionHeading eyebrow="Personal guidance" title={`Meet ${profile.name}`} subtitle={profile.title}/>
        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600">{profile.bio}</p>
        {contactItems.length > 0 && <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {contactItems.map(([Icon, value, href]) => {
            const content = <><Icon className="h-4 w-4 shrink-0 text-red-500"/><span className="min-w-0 break-words">{value}</span></>;
            return href
              ? <a key={value} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-100">{content}</a>
              : <div key={value} className="flex items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-700">{content}</div>;
          })}
        </div>}
        <div className="mt-8 flex flex-wrap gap-3">
          <InquiryModalButton label={`Send an Inquiry to ${profile.name.split(' ')[0]}`}/>
        </div>
      </div>
    </div>
    <Modal open={photoOpen} onClose={()=>setPhotoOpen(false)} title={profile.name}>
      <ZoomableImage src={photo} alt={profile.name}/>
    </Modal>
  </section>;
}
