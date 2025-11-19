import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const MetaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-6 h-6 text-blue-600">
      <path fill="currentColor" d="M224 200a8 8 0 0 1-8 8h-16a8 8 0 0 1 0-16h16a8 8 0 0 1 8 8ZM90.2 110.16a75.43 75.43 0 0 0-35.31 35.31c-3.1 8.27 1.14 17.65 9.41 20.75a134.1 134.1 0 0 1 27.4 5.2a8 8 0 0 0 6.6-14.86a118.15 118.15 0 0 0-24.1-4.57a60.67 60.67 0 0 1 28.17-28.17a118.15 118.15 0 0 0 4.57 24.1a8 8 0 0 0 14.86-6.6a134.1 134.1 0 0 1-5.2-27.4c-3.1-8.27-12.48-12.51-20.75-9.41ZM128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"></path>
    </svg>
);

const SignupPage: React.FC = () => {
    const navigate = useNavigate();
    const { signUp } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const { error } = await signUp(
            formData.email,
            formData.password,
            formData.firstName,
            formData.lastName,
            formData.phone
        );

        if (error) {
            setError(error.message || 'Failed to create account');
            setIsLoading(false);
        } else {
            navigate('/connect/ig');
        }
    };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create Your InstagrowaX Account</h2>
        <p className="text-gray-600 mt-1">Start your journey to viral growth.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSignup}>
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"/>
          <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"/>
        </div>
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" />
        <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"/>
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"/>
        
        <div className="p-4 border border-gray-200 rounded-lg bg-slate-50 text-left">
            <div className="flex items-center gap-2">
                <MetaIcon />
                <h3 className="font-bold text-gray-800">We're a Meta-verified business</h3>
            </div>
            <p className="text-xs text-gray-600 mt-2">
                We only use official Instagram APIs and processes. Your Instagram account is secure, and you stay in full control.
            </p>
        </div>
        
        <p className="text-xs text-center text-gray-500">
          By signing up you agree to the <a href="#" className="text-purple-600">Terms</a> and <a href="#" className="text-purple-600">Privacy Policy</a>
        </p>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white btn-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50">
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">Login</Link>
      </div>
    </>
  );
};

export default SignupPage;