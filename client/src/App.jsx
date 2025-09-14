import React, { useState } from 'react';
import ChatWindow from './components/chatwindow.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import AdminPanel from './components/AdminPanel.jsx';

export default function App() {
  const [tab, setTab] = useState('chat'); // 'chat' | 'admin'
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'));

  return (
    <div className="container">
      <div className="header">
        <div className="title">🎓 College Chatbot </div>
        <div className="row" style={{alignItems:'center'}}>
          <button className={`button ${tab==='chat' ? '' : 'secondary'}`} onClick={() => setTab('chat')}>Chat</button>
          <button className={`button ${tab==='admin' ? '' : 'secondary'}`} onClick={() => setTab('admin')}>Admin</button>
        </div>
      </div>

      {tab === 'chat' && (
        <div className="card">
          <ChatWindow />
        </div>
      )}

      {tab === 'admin' && (
        <div className="card">
          {!authed ? (
            <AdminLogin onLogin={() => setAuthed(true)} />
          ) : (
            <AdminPanel onLogout={() => { localStorage.removeItem('token'); setAuthed(false); }} />
          )}
        </div>
      )}
    </div>
  );
}