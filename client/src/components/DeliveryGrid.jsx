import DeliveryCard from './DeliveryCard.jsx';
import EmptyState from './EmptyState.jsx';
export default function DeliveryGrid({items=[]}){ if(!items.length)return <EmptyState title="No deliveries yet"/>; return <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{items.map(x=><DeliveryCard key={x._id} delivery={x}/>)}</div>; }
