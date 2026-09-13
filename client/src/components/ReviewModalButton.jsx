import { useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import Button from './Button.jsx';
import Modal from './Modal.jsx';
import TestimonialSubmissionForm from './TestimonialSubmissionForm.jsx';

export default function ReviewModalButton({ label = 'Add Testimonial / Review', variant = 'red' }) {
  const [open, setOpen] = useState(false);
  return <>
    <Button type="button" variant={variant} onClick={() => setOpen(true)}><MessageSquarePlus className="h-4 w-4"/> {label}</Button>
    <Modal open={open} onClose={() => setOpen(false)} title="Share Your Experience"><TestimonialSubmissionForm/></Modal>
  </>;
}
