import { useState } from 'react';
import GlassCard from './GlassCard';
import { Link } from 'react-router-dom';

export default function Login({ authenticate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = { username, password };
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const parseRes = await res.json();
      localStorage.setItem('token', parseRes.token);
      setError(false);
      authenticate(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient2 bg-cover">
      <form className="w-1/3" onSubmit={handleLogin}>
        <GlassCard className="flex-col items-center justify-center px-16 py-12 gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue leading-tight">
              Login
            </div>
            <div className="text-charcoal text-center">
              Welcome back! You’re just one step away from accomplishing your goals.
            </div>
          </div>
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
          <input
            type="password"
            placeholder="Password"
            className={`focus:outline-none focus:ring-2 transition text-charcoal w-full px-6 py-4 rounded-lg ${error && 'ring-2 ring-red-300'}`}
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 w-fit py-2.5 px-6 bg-babyPink rounded-lg text-md hover:scale-105 transition ease-in-out duration-300 hover:bg-darkPink
            text-charcoal"
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
    </div>
  );
}
