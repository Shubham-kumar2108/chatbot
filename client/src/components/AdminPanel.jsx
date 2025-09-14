import React, { useEffect, useState } from 'react';
import api from '../api';
import FAQForm from './FAQForm.jsx';

export default function AdminPanel({ onLogout }) {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/api/faqs');
      setFaqs(data);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function createFAQ(payload) {
    try {
      const { data } = await api.post('/api/faqs', payload);
      setFaqs([data, ...faqs]);
      setCreating(false);
    } catch (e) {
      alert(e?.response?.data?.message || 'Create failed');
    }
  }

  async function updateFAQ(id, payload) {
    try {
      const { data } = await api.put(`/api/faqs/${id}`, payload);
      setFaqs(faqs.map(f => f._id === id ? data : f));
      setEditing(null);
    } catch (e) {
      alert(e?.response?.data?.message || 'Update failed');
    }
  }

  async function deleteFAQ(id) {
    if (!confirm('Delete this FAQ?')) return;
    try {
      await api.delete(`/api/faqs/${id}`);
      setFaqs(faqs.filter(f => f._id !== id));
    } catch (e) {
      alert(e?.response?.data?.message || 'Delete failed');
    }
  }

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3>Admin Dashboard</h3>
        <button className="button secondary" onClick={onLogout}>Logout</button>
      </div>

      {error && <div className="small" style={{color:'#fca5a5'}}>{error}</div>}
      {loading && <div>Loading FAQs…</div>}

      {!loading && (
        <>
          <div style={{margin:'0.8rem 0'}}>
            {!creating ? (
              <button className="button" onClick={() => setCreating(true)}>+ New FAQ</button>
            ) : (
              <div className="card" style={{marginTop:'.8rem'}}>
                <h4>Create FAQ</h4>
                <FAQForm
                  onSave={createFAQ}
                  onCancel={() => setCreating(false)}
                />
              </div>
            )}
          </div>

          <div className="list">
            {faqs.map(f => (
              <div key={f._id} className="item">
                <div style={{flex:1}}>
                  <div style={{fontWeight:700}}>{f.question}</div>
                  <div className="small" style={{whiteSpace:'pre-wrap', marginTop:'.2rem'}}>{f.answer}</div>
                  <div className="row" style={{marginTop:'.4rem'}}>
                    {(f.tags || []).map((t, i) => <span className="badge" key={i}>{t}</span>)}
                  </div>
                </div>
                <div className="actions">
                  <button className="button secondary" onClick={() => setEditing(f)}>Edit</button>
                  <button className="button" onClick={() => deleteFAQ(f._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          {editing && (
            <div className="card" style={{marginTop:'1rem'}}>
              <h4>Edit FAQ</h4>
              <FAQForm
                initial={editing}
                onSave={(payload) => updateFAQ(editing._id, payload)}
                onCancel={() => setEditing(null)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}