import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar.jsx';
import AdminHeader from '../components/admin/AdminHeader.jsx';
import { useAuthStore } from '../store/authStore.js';
export default function AdminLayout(){ const token=useAuthStore(s=>s.token); if(!token)return <Navigate to="/admin/login" replace/>; return <div className="min-h-screen bg-zinc-50"><div className="flex min-h-screen"><AdminSidebar/><div className="min-w-0 flex-1"><AdminHeader/><main className="p-4 sm:p-6 lg:p-8"><Outlet/></main></div></div></div>; }
