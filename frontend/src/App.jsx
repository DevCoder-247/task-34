import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Create this file for styles

const API = import.meta.env.VITE_API_URL;

function App() {
  const [form, setForm] = useState({ name: '', email: '', number: '' });
  const [response, setResponse] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(API + "/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(API + "/submit", form);
      setResponse(res.data.message);
      setForm({ name: '', email: '', number: '' });
      // Refresh users list after submission
      const updatedUsers = await axios.get(API + "/users");
      setUsers(updatedUsers.data);
    } catch (err) {
      setResponse('Error submitting form.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2 className="form-title">Submit Your Information</h2>
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Phone Number</label>
            <input
              name="number"
              placeholder="+1 (123) 456-7890"
              value={form.number}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Register'}
          </button>
        </form>
        
        {response && (
          <p className={`response-message ${response.includes('Error') ? 'error' : 'success'}`}>
            {response}
          </p>
        )}
      </div>

      <div className="users-container">
        <h3>Registered Users ({users.length})</h3>
        {users.length > 0 ? (
          <div className="users-grid">
            {users.map((user, index) => (
              <div key={index} className="user-card">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <p>{user.number}</p>
                <small>Registered on: {new Date(user.createdAt).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-users">No users registered yet</p>
        )}
      </div>
    </div>
  );
}

export default App;