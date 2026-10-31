import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative flex flex-col min-h-screen w-full bg-[#07060e] text-slate-100 overflow-x-hidden font-sans">
        {/* Background ambient neon glow spheres */}
        <div className="fixed top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl pointer-events-none" />

        {/* Global Navigation Header */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main className="flex-1 flex flex-col w-full relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Footer with All 5 Links & Domain */}
        <Footer />

        {/* Cookie & Advertising Consent Notice */}
        <CookieConsent />
      </div>
    </BrowserRouter>
  );
}
