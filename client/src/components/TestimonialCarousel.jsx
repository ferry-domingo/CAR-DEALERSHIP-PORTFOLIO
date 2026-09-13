import TestimonialCard from './TestimonialCard.jsx';
import EmptyState from './EmptyState.jsx';

export default function TestimonialCarousel({items=[]}) {
  if(!items.length)return <EmptyState title="No approved testimonials yet"/>;
  const group=(suffix)=><div className="flex items-stretch gap-4 pr-4" aria-hidden={suffix==='copy'}>{items.map(item=><div key={`${item._id}-${suffix}`} className="flex w-[86vw] shrink-0 sm:w-[calc(50vw-2rem)] lg:w-[calc(33.333vw-2rem)] xl:w-[394px]"><TestimonialCard item={item}/></div>)}</div>;
  return <div className="testimonial-marquee overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
    <div className="testimonial-marquee-track">
      {group('original')}
      {group('copy')}
    </div>
  </div>;
}
