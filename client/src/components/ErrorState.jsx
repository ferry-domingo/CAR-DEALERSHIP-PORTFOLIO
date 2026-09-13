export default function ErrorState({ message = 'Unable to load this content.', onRetry }) {
  return <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700"><p>{message}</p>{onRetry && <button onClick={onRetry} className="mt-3 font-bold underline">Try again</button>}</div>;
}
