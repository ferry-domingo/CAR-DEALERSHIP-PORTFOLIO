import VehicleCard from './VehicleCard.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import EmptyState from './EmptyState.jsx';
import ErrorState from './ErrorState.jsx';
export default function VehicleGrid({vehicles,loading,error,onRetry}){ if(loading)return <LoadingSpinner label="Loading vehicles..."/>; if(error)return <ErrorState message={error} onRetry={onRetry}/>; if(!vehicles?.length)return <EmptyState title="No vehicles found" message="Try another filter or add vehicle records from the admin dashboard."/>; return <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{vehicles.map(v=><VehicleCard key={v._id} vehicle={v}/>)}</div>; }
