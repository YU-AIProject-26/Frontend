import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PasswordResetPage from './pages/PasswordResetPage';
import ThemeToggle from './components/ThemeToggle';
import AuthLayout from './components/AuthLayout';

export default function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element = {<Navigate to = "/landing" replace />} />
        <Route path = "/landing" element = {<LandingPage />} />

        <Route element = {<AuthLayout />}>
          <Route path = "/auth/login" element = {<LoginPage />} />
          <Route path = "/auth/signup" element = {<SignupPage />} />
          <Route path = "/auth/reset-password" element = {<PasswordResetPage />} />
        </Route>

        <Route path = "*" element = {<Navigate to = "/landing" replace />} />
      </Routes>

      <ThemeToggle />
    </>
  );
}