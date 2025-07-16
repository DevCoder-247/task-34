import React, { useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL

function App() {
  const [form, setForm] = useState({ name: '', email: '', number: '' });
  const [response, setResponse] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(API + "/submit", form);
      setResponse(res.data.message);
      setForm({ name: '', email: '', number: '' });
    } catch (err) {
      setResponse('Error submitting form.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Submit Your Info</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="number" placeholder="Phone Number" value={form.number} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      {response && <p style={{ marginTop: '1rem' }}>{response}</p>}
    </div>
  );
}

export default App;
