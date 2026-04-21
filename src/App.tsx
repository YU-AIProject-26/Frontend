import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PasswordResetPage from './pages/PasswordResetPage';
import ServicePage from './pages/ServicePage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ThemeToggle from './components/ThemeToggle';
import AuthLayout from './components/AuthLayout';
import ScrollToTop from './components/ScrollToTop';
import OnboardingPage from './pages/OnboardingPage';

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path = "/" element = {<Navigate to = "/landing" replace />} />
        <Route path = "/landing" element = {<LandingPage />} />
        <Route path = "/onboarding" element = {<OnboardingPage />} />

        <Route element = {<AuthLayout />}>
          <Route path = "/auth/login" element = {<LoginPage />} />
          <Route path = "/auth/signup" element = {<SignupPage />} />
          <Route path = "/auth/reset-password" element = {<PasswordResetPage />} />
        </Route>

        <Route path = "/service" element = {<ServicePage />} />
        <Route path = "/contact" element = {<ContactPage />} />
        <Route path = "/privacy" element = {<PrivacyPage />} />
        <Route path = "/terms" element = {<TermsPage />} />

        <Route path = "*" element = {<Navigate to = "/landing" replace />} />
      </Routes>

      <ThemeToggle />
    </>
  );
}