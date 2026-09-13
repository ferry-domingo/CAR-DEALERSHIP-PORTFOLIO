import { Link } from 'react-router-dom';

const styles = {
  primary: 'bg-zinc-950 text-white hover:bg-zinc-800 focus:ring-zinc-950/20',
  red: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/20',
  secondary: 'border border-zinc-300 bg-white text-zinc-950 hover:bg-zinc-50 focus:ring-zinc-950/10',
  ghost: 'bg-transparent text-zinc-700 hover:bg-zinc-100',
};

export default function Button({ to, href, variant = 'primary', className = '', children, ...props }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...props}>{children}</a>;
  return <button className={cls} {...props}>{children}</button>;
}
