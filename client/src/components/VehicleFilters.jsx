const filters=['All','EV','Hybrid','Sedan','SUV'];
export default function VehicleFilters({ value, onChange }){ return <div className="flex flex-wrap gap-2">{filters.map(x=><button key={x} onClick={()=>onChange(x)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${value===x?'bg-zinc-950 text-white':'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}>{x}</button>)}</div>; }
