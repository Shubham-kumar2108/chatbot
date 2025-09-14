import React, { useState, useEffect } from 'react';

export default function FAQForm({ initial, onSave, onCancel }) {
  const [question, setQuestion] = useState(initial?.question || '');
  const [answer, setAnswer] = useState(initial?.answer || '');
  const [tags, setTags] = useState((initial?.tags || []).join(', '));

  useEffect(() => {
    setQuestion(initial?.question || '');
    setAnswer(initial?.answer || '');
    setTags((initial?.tags || []).join(', '));
  }, [initial]);

  function submit(e) {
    e.preventDefault();
    const payload = {
      question: question.trim(),
      answer: answer.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean)
    };
    if (!payload.question || !payload.answer) return;
    onSave?.(payload);
  }

  return (
    <form onSubmit={submit}>
      <div style={{display:'grid', gap:'.6rem'}}>
        <input className="input" placeholder="Question" value={question} onChange={e=>setQuestion(e.target.value)} />
        <textarea className="textarea" placeholder="Answer" value={answer} onChange={e=>setAnswer(e.target.value)} />
        <input className="input" placeholder="Tags (comma separated)" value={tags} onChange={e=>setTags(e.target.value)} />
      </div>
      <div className="row" style={{marginTop:'.6rem'}}>
        <button className="button" type="submit">Save</button>
        <button className="button secondary" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}