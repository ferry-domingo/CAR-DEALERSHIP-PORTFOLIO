import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import MobileInquiryCTA from '../components/MobileInquiryCTA.jsx';
import { ProfileProvider } from '../context/ProfileContext.jsx';
export default function PublicLayout(){ return <ProfileProvider><div className="min-h-screen bg-white"><Navbar/><main><Outlet/></main><Footer/><MobileInquiryCTA/></div></ProfileProvider>; }
