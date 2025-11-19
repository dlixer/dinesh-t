import React, { useState } from 'react';
// FIX: Rewriting import to fix potential tooling issues.
import { Link, useNavigate } from 'react-router-dom';
import MailIcon from '../icons/MailIcon';
import LockIcon from '../icons/LockIcon';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate successful login and redirect to the dashboard
        setTimeout(() => {
            navigate('/dashboard');
        }, 500);
    };

  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            Welcome Back!
        </h2>
        <p className="text-gray-600 mt-1">Log in to continue to InstagrowaX.</p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <div className="relative">
          <label htmlFor="email" className="sr-only">Email address</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MailIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            placeholder="Login Email"
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="sr-only">Password</label>
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            placeholder="Password"
          />
        </div>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white btn-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <div className="text-sm">
          <Link to="/reset-password" className="font-medium text-purple-600 hover:text-purple-500">
            Forgot password?
          </Link>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;