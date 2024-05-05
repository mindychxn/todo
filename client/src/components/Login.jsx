import { useState } from 'react';
import './login.css';
import GlassCard from './GlassCard';
import { Link } from 'react-router-dom';

export default function Login({ authenticate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = { username, password };
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const parseRes = await res.json();
    localStorage.setItem('token', parseRes.token);
    authenticate(true);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen login-page">
      <form className="w-1/3" onSubmit={handleLogin}>
        <GlassCard className="flex-col px-16 py-12 gap-6">
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
            className="focus:outline-none focus:ring-2 transition text-charcoal w-full px-6 py-4 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="focus:outline-none focus:ring-2 transition text-charcoal w-full px-6 py-4 rounded-lg"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 w-fit py-2.5 px-6 bg-babyPink rounded-lg text-lg hover:scale-105 transition ease-in-out duration-300 hover:bg-darkPink
            text-charcoal"
          >
            Get Started
          </button>
          <div className=" text-sm text-[#C2C2C2]">
            Dont have an account?
            <Link to="/register">
              <button className="ml-2 text-babyPurple hover:text-[#ae85e3] transition duration-300 hover:scale-105">
                Sign Up
              </button>
            </Link>
          </div>
        </GlassCard>
      </form>
    </div>
  );
}
