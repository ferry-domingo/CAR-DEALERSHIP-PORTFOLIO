import { useEffect, useMemo, useState } from 'react';
import { Send } from 'lucide-react';
import Button from './Button.jsx';
import Toast from './Toast.jsx';
import { createInquiry } from '../services/inquiryService.js';
import { getVehicles } from '../services/vehicleService.js';

const initial = { full_name:'', contact_number:'', email:'', preferred_vehicle:'', inquiry_type:'Request a Quote', message:'' };
export default function QuoteForm({ defaultVehicle = '', compact = false, onSuccess }) {
  const [form, setForm] = useState({ ...initial, preferred_vehicle: defaultVehicle });
  const [vehicles, setVehicles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState({ type:'', message:'' });
  const [errors, setErrors] = useState({});
  useEffect(()=>{ setForm((f)=>({...f, preferred_vehicle: defaultVehicle || f.preferred_vehicle})); },[defaultVehicle]);
  useEffect(()=>{ getVehicles().then(setVehicles).catch(()=>{}); },[]);
  const valid = useMemo(()=>form.full_name.trim().length>=2 && form.contact_number.trim().length>=7 && /\S+@\S+\.\S+/.test(form.email) && form.message.trim().length>=5,[form]);
  const change = (e)=>setForm({...form,[e.target.name]:e.target.value});
  const submit = async (e)=>{ e.preventDefault(); setNotice({}); const next={}; if(form.full_name.trim().length<2) next.full_name='Enter your full name.'; if(form.contact_number.trim().length<7) next.contact_number='Enter a valid contact number.'; if(!/\S+@\S+\.\S+/.test(form.email)) next.email='Enter a valid email.'; if(form.message.trim().length<5) next.message='Tell us briefly what you need.'; setErrors(next); if(Object.keys(next).length) return; setBusy(true); try { const data=await createInquiry(form); setNotice({type:'success',message:data.message}); setForm({...initial, preferred_vehicle:defaultVehicle}); onSuccess?.(data); } catch(err){ const apiErrors=err.response?.data?.errors || []; const mapped=Object.fromEntries(apiErrors.map(x=>[x.field,x.message])); setErrors(mapped); setNotice({type:'error',message:err.response?.data?.message || 'Unable to send inquiry right now.'}); } finally { setBusy(false); } };
  return <form onSubmit={submit} className={compact ? '' : 'card p-5 sm:p-8'}><div className="grid gap-5 sm:grid-cols-2"><Field label="Full Name" name="full_name" value={form.full_name} onChange={change} error={errors.full_name}/><Field label="Contact Number" name="contact_number" value={form.contact_number} onChange={change} error={errors.contact_number}/><Field label="Email" type="email" name="email" value={form.email} onChange={change} error={errors.email}/><div><label className="label">Preferred BYD Model</label><select className="input" name="preferred_vehicle" value={form.preferred_vehicle} onChange={change}><option value="">Not sure yet</option>{vehicles.map(v=><option key={v._id} value={v.name}>{v.name}</option>)}</select></div><div className="sm:col-span-2"><label className="label">Inquiry Type</label><select className="input" name="inquiry_type" value={form.inquiry_type} onChange={change}>{['Vehicle Inquiry','Request a Quote','Test Drive','Financing Inquiry','General Inquiry'].map(x=><option key={x}>{x}</option>)}</select></div><div className="sm:col-span-2"><label className="label">Message</label><textarea className="input min-h-32 resize-y" name="message" value={form.message} onChange={change} placeholder="Tell Rafael what model, schedule, or financing question you have."/><FieldError text={errors.message}/></div></div><div className="mt-5"><Toast type={notice.type} message={notice.message}/></div><div className="mt-6"><Button type="submit" variant="red" disabled={busy || !valid} className="w-full sm:w-auto">{busy?'Sending...':'Send Inquiry'} <Send className="h-4 w-4"/></Button></div></form>;
}
function Field({label,error,...props}){ return <div><label className="label">{label}</label><input className="input" {...props}/><FieldError text={error}/></div>; }
function FieldError({text}){ return text?<p className="mt-1 text-xs font-medium text-red-600">{text}</p>:null; }
