export default function EmptyState({ title = 'Nothing here yet', message = 'Content will appear here when available.' }) {
  return <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center"><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm text-zinc-500">{message}</p></div>;
}
