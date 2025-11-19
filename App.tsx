import React from 'react';
// FIX: Using HashRouter for compatibility with the preview environment.
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

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

const AuthRoutes = () => (
  <AuthLayout>
    <Outlet />
  </AuthLayout>
);

const DashboardRoutes = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Authentication Routes */}
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ForgotPasswordPage />} />
          <Route path="/connect/ig" element={<ConnectInstagramPage />} />
          <Route path="/connect/success" element={<ConnectSuccessPage />} />
          <Route path="/paymentplan" element={<PaymentPlanPage />} />
        </Route>

        {/* Dashboard Routes */}
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

export default App;