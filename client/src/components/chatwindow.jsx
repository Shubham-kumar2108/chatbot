import React, { useState } from 'react';
import api from '../api';

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! Ask me anything about your college (timings, syllabus, ID card, HOD, etc.).' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    const q = input.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setLoading(true);
    try {
      const { data } = await api.post('/api/chat', { question: q });
      let reply = data.answer;
      if (data.matchedQuestion) {
        reply = `**${data.matchedQuestion}**\n\n${data.answer}`;
      }
      const sug = (data.suggestions || []).map(s => `• ${s.question}`).join('\n');
      reply += sug ? `\n\n_Suggestions:_\n${sug}` : '';
      setMessages((m) => [...m, { role: 'bot', text: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      <div className="chat card" style={{height:'60vh'}}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role === 'user' ? 'user' : 'bot'}`}>
            <div style={{whiteSpace:'pre-wrap'}}>{m.text}</div>
          </div>
        ))}
        {loading && <div className="msg bot">Thinking…</div>}
      </div>
      <div className="inputRow">
        <textarea
          className="textarea"
          placeholder="Type your question…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button className="button" onClick={send}>Send</button>
      </div>
    </>
  );
}