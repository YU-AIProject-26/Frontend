import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
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
import NotFoundPage from './pages/NotFoundPage';
import MyPage from './pages/MyPage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import MeetingCreatePage from './pages/MeetingCreatePage';
import TodoPage from './pages/TodoPage';
import AdminPage from './pages/AdminPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminMeetingsPage from './pages/AdminMeetingsPage';
import AdminInquiriesPage from './pages/AdminInquiriesPage';
import AdminNoticesPage from './pages/AdminNoticesPage';
import { useAuth } from './contexts/useAuth';

export default function App() {
  const { isAuthenticated, hasCompletedOnboarding, user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          path = "/"
          element = {
            <Navigate
              to = {
                !isAuthenticated
                  ? '/landing'
                  : hasCompletedOnboarding
                  ? '/dashboard'
                  : '/onboarding'
              }
              replace
            />
          }
        />

        <Route
          path = "/landing"
          element = {
            isAuthenticated && hasCompletedOnboarding ? (
              <Navigate to = "/dashboard" replace />
            ) : (
              <LandingPage />
            )
          }
        />

        <Route
          path = "/onboarding"
          element = {
            !isAuthenticated ? (
              <Navigate to = "/landing" replace />
            ) : hasCompletedOnboarding ? (
              <Navigate to = "/dashboard" replace />
            ) : (
              <OnboardingPage />
            )
          }
        />

        <Route element = {<AuthLayout />}>
          <Route
            path = "/auth/login"
            element = {
              isAuthenticated && hasCompletedOnboarding ? (
                <Navigate to = "/dashboard" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path = "/auth/signup"
            element = {
              isAuthenticated && hasCompletedOnboarding ? (
                <Navigate to = "/dashboard" replace />
              ) : (
                <SignupPage />
              )
            }
          />
          <Route
            path = "/auth/reset-password"
            element = {<PasswordResetPage />}
          />
        </Route>

        <Route path = "/service" element = {<ServicePage />} />
        <Route path = "/contact" element = {<ContactPage />} />
        <Route path = "/privacy" element = {<PrivacyPage />} />
        <Route path = "/terms" element = {<TermsPage />} />

        <Route
          element = {
            !isAuthenticated ? (
              <Navigate to = "/landing" replace />
            ) : !hasCompletedOnboarding ? (
              <Navigate to = "/onboarding" replace />
            ) : (
              <DashboardLayout />
            )
          }
        >
          <Route path = "/dashboard" element = {<DashboardPage />} />
          <Route path = "/notifications" element = {<NotificationsPage />} />
          <Route path = "/my" element = {<MyPage />} />
          <Route path = "/settings" element = {<SettingsPage />} />
          <Route path = "/meetings/create" element = {<MeetingCreatePage />} />
          <Route path = "/todo" element = {<TodoPage />} />

          <Route
            path = "/admin"
            element = {
              isAdmin ? <AdminPage /> : <Navigate to = "/not-found" replace />
            }
          />
          <Route
            path = "/admin/users"
            element = {
              isAdmin ? <AdminUsersPage /> : <Navigate to = "/not-found" replace />
            }
          />
          <Route
            path = "/admin/meetings"
            element = {
              isAdmin ? <AdminMeetingsPage /> : <Navigate to = "/not-found" replace />
            }
          />
          <Route
            path = "/admin/inquiries"
            element = {
              isAdmin ? <AdminInquiriesPage /> : <Navigate to = "/not-found" replace />
            }
          />
          <Route
            path = "/admin/notices"
            element = {
              isAdmin ? <AdminNoticesPage /> : <Navigate to = "/not-found" replace />
            }
          />
        </Route>

        <Route path = "/not-found" element = {<NotFoundPage />} />
        <Route path = "*" element = {<Navigate to = "/not-found" replace />} />
      </Routes>

      <ThemeToggle />
    </>
  );
}