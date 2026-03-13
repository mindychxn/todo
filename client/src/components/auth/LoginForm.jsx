import { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { Link } from 'react-router-dom';
import { API_URL } from '../../api/api';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const body = { username, password };
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      const parseRes = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', parseRes.token);
        onSuccess();
      } else {
        setError(parseRes.error || 'Invalid username or password');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form className="w-full max-w-md" onSubmit={handleLogin}>
      <GlassCard className="flex-col items-center justify-center px-16 py-12 gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue leading-tight">
            Login
          </div>
          <div className="text-charcoal text-center">
            Welcome back! You're just one step away from accomplishing your goals.
          </div>
        </div>
        {error && (
          <div className="w-full text-red-500 text-sm text-center bg-red-50 py-2 px-4 rounded-lg">
            {error}
          </div>
        )}
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="off"
          autoFocus
          required
          className={`focus:outline-none focus:ring-2 transition text-charcoal w-full px-6 py-4 rounded-lg ${error && 'ring-2 ring-red-300'}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={`focus:outline-none focus:ring-2 transition text-charcoal w-full px-6 py-4 pr-12 rounded-lg ${error && 'ring-2 ring-red-300'}`}
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>
        <button
          type="submit"
          className="mt-2 w-fit py-2.5 px-6 bg-babyPink rounded-lg text-md hover:scale-105 transition ease-in-out duration-300 hover:bg-darkPink text-charcoal"
        >
          Log in
        </button>
        <div className="min-w-fit whitespace-nowrap text-sm text-gray-400">
          Dont have an account?
          <Link to="/register">
            <button className="ml-2 text-charcoal hover:text-[#ae85e3] transition duration-300 hover:scale-105">
              Sign Up
            </button>
          </Link>
        </div>
      </GlassCard>
    </form>
  );
}
