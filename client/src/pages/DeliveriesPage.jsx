import { useEffect, useState } from 'react';
import SectionHeading from '../components/SectionHeading.jsx';
import DeliveryGrid from '../components/DeliveryGrid.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorState from '../components/ErrorState.jsx';
import { getDeliveries } from '../services/deliveryService.js';
export default function DeliveriesPage(){ const [items,setItems]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(''); useEffect(()=>{getDeliveries().then(setItems).catch(e=>setError(e.response?.data?.message||'Unable to load deliveries.')).finally(()=>setLoading(false));},[]); return <section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="Customer deliveries" title="Delivery Moments" subtitle="Sample/demo customer delivery content for portfolio presentation only."/><div className="mt-10">{loading?<LoadingSpinner/>:error?<ErrorState message={error}/>:<DeliveryGrid items={items}/>}</div></div></section>; }
