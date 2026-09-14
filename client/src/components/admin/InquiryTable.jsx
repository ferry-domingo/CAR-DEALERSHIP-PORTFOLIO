import { useState } from 'react';
import DataTable from './DataTable.jsx';
import Modal from '../Modal.jsx';
import { formatDate } from '../../utils/format.js';

const statuses = ['New', 'Contacted', 'Closed'];

export default function InquiryTable({ items, onStatusChange }) {
  const [selected, setSelected] = useState(null);
  const changeStatus = (event, row) => {
    event.stopPropagation();
    const status = event.target.value;
    onStatusChange(row._id, status);
    setSelected(current => current?._id === row._id ? { ...current, status } : current);
  };
  const columns = [
    { key:'full_name', label:'Customer' },
    { key:'preferred_vehicle', label:'Vehicle', render:value=>value||'—' },
    { key:'inquiry_type', label:'Inquiry Type' },
    { key:'createdAt', label:'Date', render:value=>formatDate(value) },
    { key:'status', label:'Status', render:(value,row)=><select aria-label={`Status for ${row.full_name}`} className="rounded-lg border border-zinc-200 px-2 py-1 text-xs font-bold" value={value} onClick={event=>event.stopPropagation()} onChange={event=>changeStatus(event,row)}>{statuses.map(status=><option key={status}>{status}</option>)}</select> },
  ];
  return <>
    <DataTable columns={columns} rows={items} onRowClick={setSelected}/>
    <Modal open={Boolean(selected)} onClose={()=>setSelected(null)} title="Inquiry details">
      {selected&&<div className="grid gap-5 sm:grid-cols-2">
        <Detail label="Full name" value={selected.full_name}/>
        <Detail label="Status"><select className="input" value={selected.status} onChange={event=>changeStatus(event,selected)}>{statuses.map(status=><option key={status}>{status}</option>)}</select></Detail>
        <Detail label="Contact number"><a className="font-semibold text-red-600 hover:underline" href={`tel:${selected.contact_number}`}>{selected.contact_number}</a></Detail>
        <Detail label="Email"><a className="break-all font-semibold text-red-600 hover:underline" href={`mailto:${selected.email}`}>{selected.email}</a></Detail>
        <Detail label="Preferred vehicle" value={selected.preferred_vehicle||'Not specified'}/>
        <Detail label="Inquiry type" value={selected.inquiry_type}/>
        <div className="sm:col-span-2"><Detail label="Message" value={selected.message}/></div>
        <Detail label="Received" value={formatDateTime(selected.createdAt)}/>
        <Detail label="Last updated" value={formatDateTime(selected.updatedAt)}/>
        <div className="sm:col-span-2"><Detail label="Inquiry ID" value={selected._id}/></div>
      </div>}
    </Modal>
  </>;
}

function Detail({ label, value, children }) { return <div><p className="text-xs font-bold uppercase tracking-[.12em] text-zinc-400">{label}</p><div className="mt-1 whitespace-pre-wrap break-words text-sm text-zinc-800">{children||value||'—'}</div></div>; }
function formatDateTime(value) { return value ? new Intl.DateTimeFormat('en-PH',{ dateStyle:'medium', timeStyle:'short' }).format(new Date(value)) : '—'; }
