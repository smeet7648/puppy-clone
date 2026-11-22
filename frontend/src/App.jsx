import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnnouncementStrip } from './components/common/AnnouncementStrip';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingWhatsAppWidget } from './components/common/FloatingWhatsAppWidget';
import { MobileStickyBar } from './components/common/MobileStickyBar';
import { RandomDogPopups } from './components/common/RandomDogPopups';
import { ScrollToTop } from './components/common/ScrollToTop';
import { PawCursor } from './components/common/PawCursor';
import { useLenis } from './hooks/useLenis';

// Public Pages
import { HomePage } from './pages/HomePage';
import { PuppiesPage } from './pages/PuppiesPage';
import { PuppyDetailPage } from './pages/PuppyDetailPage';
import { GoneHomePage } from './pages/GoneHomePage';
import { HappyFamiliesPage } from './pages/HappyFamiliesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminPuppies } from './pages/admin/AdminPuppies';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminHappyFamilies } from './pages/admin/AdminHappyFamilies';
import { AdminFAQs } from './pages/admin/AdminFAQs';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminSettings } from './pages/admin/AdminSettings';
import { useAuth } from './context/AuthContext';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf8f2]">
        <div className="w-10 h-10 border-4 border-honey border-t-toffee rounded-full animate-spin" />
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Public Layout Wrapper with Cartoon Page Transitions & Random Dog Popups
const PublicLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-milk text-cocoa relative overflow-x-hidden">
      <AnnouncementStrip />
      <Header />
      
      {/* Cartoon Page Transition: Appears from Left to Right */}
      <main id="main-content" className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: -70, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 70, scale: 0.98 }}
            transition={{
              type: 'spring',
              stiffness: 170,
              damping: 18,
              mass: 0.8
            }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingWhatsAppWidget />
      <MobileStickyBar />

      {/* Random Cartoon Dog Popups on ALL pages (gone in 2 sec) */}
      <RandomDogPopups />
    </div>
  );
};

export const App = () => {
  // Activate luxury smooth momentum scrolling
  useLenis();

  return (
    <>
      {/* Scroll-to-top handler on every link click & route navigation */}
      <ScrollToTop />

      {/* Interactive custom dog paw cursor & click stamps */}
      <PawCursor />

      <Routes>
      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/puppies" replace />} />
        <Route path="puppies" element={<AdminPuppies />} />
        <Route path="enquiries" element={<AdminEnquiries />} />
        <Route path="happy-families" element={<AdminHappyFamilies />} />
        <Route path="faqs" element={<AdminFAQs />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Public Pages */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <HomePage />
          </PublicLayout>
        }
      />
      <Route
        path="/puppies"
        element={
          <PublicLayout>
            <PuppiesPage />
          </PublicLayout>
        }
      />
      <Route
        path="/puppies/:slug"
        element={
          <PublicLayout>
            <PuppyDetailPage />
          </PublicLayout>
        }
      />
      <Route
        path="/gone-home"
        element={
          <PublicLayout>
            <GoneHomePage />
          </PublicLayout>
        }
      />
      <Route
        path="/happy-families"
        element={
          <PublicLayout>
            <HappyFamiliesPage />
          </PublicLayout>
        }
      />
      <Route
        path="/how-it-works"
        element={
          <PublicLayout>
            <HowItWorksPage />
          </PublicLayout>
        }
      />
      <Route
        path="/faq"
        element={
          <PublicLayout>
            <FAQPage />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <ContactPage />
          </PublicLayout>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);
};

export default App;
