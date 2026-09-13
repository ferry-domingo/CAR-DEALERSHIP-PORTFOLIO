import { useCallback, useState } from 'react';
export function useAsync(fn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const run = useCallback(async (...args) => {
    setLoading(true); setError('');
    try { return await fn(...args); }
    catch (e) { setError(e.response?.data?.message || e.message || 'Something went wrong.'); throw e; }
    finally { setLoading(false); }
  }, [fn]);
  return { run, loading, error, setError };
}
