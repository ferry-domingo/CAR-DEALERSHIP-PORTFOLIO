export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg">{subtitle}</p>}
    </div>
  );
}
