import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // In a real app, you'd call your backend API
      // const response = await axios.post('/api/auth/login', { email, password });
      
      // Simulate API call
      setTimeout(() => {
        // Mock response
        const mockResponse = {
          data: {
            token: 'mock-jwt-token',
            user: {
              id: 1,
              email,
              role: 'user' // Change to 'admin' or 'organizer' to test different dashboards
            }
          }
        };

        localStorage.setItem('token', mockResponse.data.token);
        localStorage.setItem('role', mockResponse.data.user.role);
        
        // Show notification
        window.dispatchEvent(new CustomEvent('notification', {
          detail: { message: 'Login successful!' }
        }));

        // Redirect based on role
        if (mockResponse.data.user.role === 'admin') {
          navigate('/admin');
        } else if (mockResponse.data.user.role === 'organizer') {
          navigate('/organizer');
        } else {
          navigate('/user');
        }
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '500px' }}>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
      <div className="mt-3 text-center">
        Don't have an account? <Link to="/register">Register here</Link>
      </div>
    </Container>
  );
}

export default Login;