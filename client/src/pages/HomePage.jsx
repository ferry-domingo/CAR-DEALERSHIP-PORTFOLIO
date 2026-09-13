import { useEffect, useState } from 'react';
import AboutRafael from '../components/AboutRafael.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import DeliveryGrid from '../components/DeliveryGrid.jsx';
import TestimonialCarousel from '../components/TestimonialCarousel.jsx';
import VehicleGrid from '../components/VehicleGrid.jsx';
import Button from '../components/Button.jsx';
import ReviewModalButton from '../components/ReviewModalButton.jsx';
import { getDeliveries } from '../services/deliveryService.js';
import { getTestimonials } from '../services/testimonialService.js';
import { getVehicles } from '../services/vehicleService.js';

export default function HomePage(){
  const [deliveries,setDeliveries]=useState([]); const [testimonials,setTestimonials]=useState([]); const [vehicles,setVehicles]=useState([]);
  const [loading,setLoading]=useState(true); const [error,setError]=useState('');
  useEffect(()=>{ let active=true; Promise.all([getDeliveries(),getTestimonials(),getVehicles({featured:true})]).then(([d,t,v])=>{if(active){setDeliveries(d.slice(0,3));setTestimonials(t.slice(0,3));setVehicles(v.slice(0,3));}}).catch(e=>active&&setError(e.response?.data?.message||'Some live demo content could not be loaded. Start the API and seed MongoDB to see all data.')).finally(()=>active&&setLoading(false)); return()=>{active=false}; },[]);
  return <>
    <AboutRafael/>
    <section className="section-pad"><div className="container-shell"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow="Customer moments" title="Another BYD Delivered. Another Happy Customer." subtitle="Sample delivery stories for this portfolio demo."/><Button to="/deliveries" variant="secondary">View All Deliveries</Button></div><div className="mt-10"><DeliveryGrid items={deliveries}/></div></div></section>
    <section className="section-pad bg-zinc-50"><div className="container-shell"><div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow="Trust" title="What Our Customers Say" subtitle="Approved experiences shared by customers."/><ReviewModalButton/></div><div className="mt-10"><TestimonialCarousel items={testimonials}/></div></div></section>
    <section className="section-pad"><div className="container-shell"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow="Vehicle discovery" title="Find the BYD That Fits You" subtitle="Browse demo vehicle listings and open a model page to start an inquiry."/><Button to="/vehicles" variant="secondary">Explore All Vehicles</Button></div><div className="mt-10"><VehicleGrid vehicles={vehicles} loading={loading} error={error}/></div></div></section>
  </>;
}
