import { useState } from 'react';

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
    <form className="flex flex-col justify-center" onSubmit={handleLogin}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Log In</button>
    </form>
  );
}
