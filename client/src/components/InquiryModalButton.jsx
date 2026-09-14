import { useState } from 'react';
import { Send } from 'lucide-react';
import Button from './Button.jsx';
import Modal from './Modal.jsx';
import QuoteForm from './QuoteForm.jsx';

export default function InquiryModalButton({ label = 'Send an Inquiry', variant = 'red', defaultVehicle = '', className = '' }) {
  const [open, setOpen] = useState(false);
  const handleSuccess = () => setTimeout(() => setOpen(false), 1200);
  return <>
    <Button type="button" variant={variant} className={className} onClick={() => setOpen(true)}>{label} <Send className="h-4 w-4"/></Button>
    {open && <Modal open onClose={() => setOpen(false)} title={label}><QuoteForm compact defaultVehicle={defaultVehicle} onSuccess={handleSuccess}/></Modal>}
  </>;
}
