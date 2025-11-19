import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ForgotPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message || 'Failed to send reset link');
      setIsLoading(false);
    } else {
      setMessage('If an account exists for this email, a reset link has been sent.');
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
        <p className="text-gray-600 mt-2">Enter your email and we'll send you a link to reset your password.</p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {!message && (
          <>
            <div>
              <label htmlFor="email" className="sr-only">Registered Email Id</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Registered Email Id"
              />
            </div>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white btn-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </>
        )}
         {message && <p className="text-sm text-green-600 text-center bg-green-50 p-4 rounded-lg">{message}</p>}
      </form>
      <div className="mt-6 text-center">
        <Link to="/login" className="font-medium text-sm text-purple-600 hover:text-purple-500">
          &lt; back to login
        </Link>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
