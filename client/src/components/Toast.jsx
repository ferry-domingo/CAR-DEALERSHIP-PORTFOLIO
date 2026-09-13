import { CheckCircle2, XCircle } from 'lucide-react';
export default function Toast({ type = 'success', message }) {
  if (!message) return null;
  const success = type === 'success';
  return <div className={`rounded-2xl border p-4 text-sm ${success ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}>{success ? <CheckCircle2 className="mr-2 inline h-4 w-4" /> : <XCircle className="mr-2 inline h-4 w-4" />}{message}</div>;
}
