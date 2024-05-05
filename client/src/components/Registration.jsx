import { useState } from 'react';
import './registration.css';
import GlassCard from './GlassCard';
import { Link } from 'react-router-dom';

export default function Registration({ authenticate }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const body = { username, email, password };
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const parseRes = await res.json();

      localStorage.setItem('token', parseRes.token);

      authenticate(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen register-page">
      <form className="w-1/3" onSubmit={handleRegister}>
        <GlassCard className="flex-col px-16 py-12 gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue leading-tight">
              Sign Up
            </div>
            <div className="text-charcoal text-center">
              Welcome! You’re just one step away from accomplishing your goals.
            </div>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="focus:outline-none focus:ring-2 transition text-charcoal w-full px-6 py-4 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
            className="mt-2 w-fit py-2.5 px-6 bg-[#E3CBFF] hover:bg-babyPurple rounded-lg text-lg hover:scale-105 transition ease-in-out duration-300
            text-charcoal"
          >
            Register
          </button>
          <div className=" text-sm text-[#C2C2C2]">
            Already have an account?
            <Link to="/login">
              <button className="ml-2 text-darkPink hover:text-[#f399a5] transition duration-300 hover:scale-105">
                Log In
              </button>
            </Link>
          </div>
        </GlassCard>
      </form>
    </div>
  );
}
