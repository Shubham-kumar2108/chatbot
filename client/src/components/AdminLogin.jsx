import React, { useState } from 'react';
import api, { setAuthToken } from '../api';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('admin@college.edu');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      setAuthToken(data.token);
      onLogin?.();
    } catch (e) {
      setError(e?.response?.data?.message || 'Login failed');
    }
  }

  return (
    <form onSubmit={submit}>
      <h3>Admin Login</h3>
      <div style={{marginTop:'.6rem'}}>
        <label>Email</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
      </div>
      <div style={{marginTop:'.6rem'}}>
        <label>Password</label>
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      </div>
      {error && <div className="small" style={{color:'#fca5a5', marginTop:'.4rem'}}>{error}</div>}
      <div style={{marginTop:'.8rem'}}>
        <button className="button" type="submit">Login</button>
      </div>
      <hr className="sep" />
      
    </form>
  );
}