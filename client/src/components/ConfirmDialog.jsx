import Modal from './Modal.jsx';
import Button from './Button.jsx';
export default function ConfirmDialog({ open, onClose, onConfirm, title = 'Delete record?', message = 'This action cannot be undone.', busy = false }) {
  return <Modal open={open} onClose={onClose} title={title}><p className="text-zinc-600">{message}</p><div className="mt-6 flex justify-end gap-3"><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant="red" onClick={onConfirm} disabled={busy}>{busy ? 'Deleting...' : 'Delete'}</Button></div></Modal>;
}
