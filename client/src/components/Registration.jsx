import { useState } from 'react';
import GlassCard from './GlassCard';
import { Link } from 'react-router-dom';
import { API_URL } from '../api/api';

export default function Registration({ authenticate }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', username: '', password: '', general: '' });

  const validateForm = () => {
    const newErrors = { email: '', username: '', password: '', general: '' };
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      newErrors.email = 'Invalid email';
      isValid = false;
    }

    // Username validation
    if (!username) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Must be at least 3 characters';
      isValid = false;
    } else if (username.length > 20) {
      newErrors.username = 'Must be 20 characters or less';
      isValid = false;
    } else if (!/^[a-zA-Z0-9_.\-]+$/.test(username)) {
      newErrors.username = 'Only letters, numbers, _ . - allowed';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Must be at least 8 characters';
      isValid = false;
    } else if (!/[a-zA-Z]/.test(password)) {
      newErrors.password = 'Must contain at least one letter';
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Must contain at least one number';
      isValid = false;
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      newErrors.password = 'Must contain at least one special character';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const body = { username, email, password };
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const parseRes = await res.json();

      if (!res.ok) {
        const errorMsg = parseRes.error || 'Registration failed';
        // Map server errors to specific fields
        if (errorMsg.toLowerCase().includes('email')) {
          setErrors(prev => ({ ...prev, email: errorMsg }));
        } else if (errorMsg.toLowerCase().includes('username')) {
          setErrors(prev => ({ ...prev, username: errorMsg }));
        } else if (errorMsg.toLowerCase().includes('password')) {
          setErrors(prev => ({ ...prev, password: errorMsg }));
        } else {
          setErrors(prev => ({ ...prev, general: errorMsg }));
        }
        return;
      }

      localStorage.setItem('token', parseRes.token);
      authenticate(true);
    } catch (error) {
      console.error(error.message);
      setErrors(prev => ({ ...prev, general: 'Something went wrong. Please try again.' }));
    }
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient2 bg-cover">
      <form className="w-1/3" onSubmit={handleRegister}>
        <GlassCard className="flex-col items-center justify-center px-16 py-12 gap-6 rounded-lg">
          <div className="flex flex-col items-center gap-4">
            <div className="font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue leading-tight">
              Sign Up
            </div>
            <div className="text-charcoal text-center">
              Welcome! You’re just one step away from accomplishing your goals.
            </div>
          </div>
          {errors.general && (
            <div className="w-full text-red-500 text-sm text-center bg-red-50 py-2 px-4 rounded-lg">
              {errors.general}
            </div>
          )}
          <div className="w-full">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`focus:outline-none focus:ring-2 transition text-charcoal w-full px-6 py-4 rounded-lg ${errors.email && 'ring-2 ring-red-300'}`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div className="w-full">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={`focus:outline-none focus:ring-2 transition text-charcoal w-full px-6 py-4 rounded-lg ${errors.username && 'ring-2 ring-red-300'}`}
              value={username}
              onChange={(e) => { setUsername(e.target.value); setErrors(prev => ({ ...prev, username: '' })); }}
            />
            {errors.username ? (
              <p className="text-xs text-red-500 mt-1">{errors.username}</p>
            ) : (
              <p className="text-xs text-gray-400 mt-1">3-20 characters, letters, numbers, _ . - allowed</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              className={`focus:outline-none focus:ring-2 transition text-charcoal w-full px-6 py-4 rounded-lg ${errors.password && 'ring-2 ring-red-300'}`}
              name="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })); }}
            />
            {errors.password ? (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            ) : (
              <p className="text-xs text-gray-400 mt-1">Min 8 chars, 1 letter, 1 number, 1 special character</p>
            )}
          </div>
          <button
            className="mt-2 w-fit py-2.5 px-6 bg-[#E3CBFF] hover:bg-babyPurple rounded-lg text-lg hover:scale-105 transition ease-in-out duration-300
            text-charcoal"
          >
            Register
          </button>
          <div className=" text-sm text-gray-400">
            Already have an account?
            <Link to="/login">
              <button className="ml-2 text-charcoal hover:text-[#f399a5] transition duration-300 hover:scale-105">
                Log in
              </button>
            </Link>
          </div>
        </GlassCard>
      </form>
    </div>
  );
}
