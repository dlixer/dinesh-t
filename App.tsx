import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import AuthLayout from './components/layouts/AuthLayout';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ConnectInstagramPage from './components/pages/ConnectInstagramPage';
import ConnectSuccessPage from './components/pages/ConnectSuccessPage';
import PaymentPlanPage from './components/pages/PaymentPlanPage';

import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardPage from './components/pages/DashboardPage';
import AutomationsPage from './components/pages/AutomationsPage';
import CreateAutomationPage from './components/pages/CreateAutomationPage';
import AutomationBuilderPage from './components/pages/AutomationBuilderPage';
import ContactsPage from './components/pages/ContactsPage';
import ReferralPage from './components/pages/ReferralPage';
import SettingsPage from './components/pages/SettingsPage';

const AuthRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

const DashboardRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ForgotPasswordPage />} />
          <Route path="/connect/ig" element={<ConnectInstagramPage />} />
          <Route path="/connect/success" element={<ConnectSuccessPage />} />
          <Route path="/paymentplan" element={<PaymentPlanPage />} />
        </Route>

        <Route element={<DashboardRoutes />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/automations" element={<AutomationsPage />} />
            <Route path="/automations/create" element={<CreateAutomationPage />} />
            <Route path="/automations/new" element={<AutomationBuilderPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/referral" element={<ReferralPage />} />
            <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;