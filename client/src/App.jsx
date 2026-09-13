import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const VehiclesPage = lazy(() => import('./pages/VehiclesPage.jsx'));
const VehicleDetailsPage = lazy(() => import('./pages/VehicleDetailsPage.jsx'));
const DeliveriesPage = lazy(() => import('./pages/DeliveriesPage.jsx'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage.jsx'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage.jsx'));
const AdminVehiclesPage = lazy(() => import('./pages/admin/AdminVehiclesPage.jsx'));
const AdminDeliveriesPage = lazy(() => import('./pages/admin/AdminDeliveriesPage.jsx'));
const AdminTestimonialsPage = lazy(() => import('./pages/admin/AdminTestimonialsPage.jsx'));
const AdminInquiriesPage = lazy(() => import('./pages/admin/AdminInquiriesPage.jsx'));
const AdminProfilePage = lazy(() => import('./pages/admin/AdminProfilePage.jsx'));

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading page..." />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:slug" element={<VehicleDetailsPage />} />
          <Route path="/deliveries" element={<DeliveriesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="vehicles" element={<AdminVehiclesPage />} />
          <Route path="deliveries" element={<AdminDeliveriesPage />} />
          <Route path="testimonials" element={<AdminTestimonialsPage />} />
          <Route path="inquiries" element={<AdminInquiriesPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
