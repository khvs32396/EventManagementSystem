import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // Default to user
    organization: '',
    adminCode: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('user');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setFormData(prev => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation checks
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.role === 'organizer' && !formData.organization.trim()) {
      setError('Organization name is required for organizers');
      return;
    }

    if (formData.role === 'admin' && formData.adminCode !== 'ADMIN123') {
      setError('Invalid admin access code');
      return;
    }

    setLoading(true);

    try {
      // In a real app, you'd call your backend API
      // const response = await axios.post('/api/auth/register', formData);
      
      // Simulate API call
      setTimeout(() => {
        // Mock response
        const mockResponse = {
          data: {
            message: 'Registration successful!',
            user: {
              id: Math.floor(Math.random() * 1000),
              name: formData.name,
              email: formData.email,
              role: formData.role,
              organization: formData.organization || null
            },
            token: 'mock-jwt-token'
          }
        };

        // Store user data in localStorage (simulating auth)
        localStorage.setItem('user', JSON.stringify(mockResponse.data.user));
        localStorage.setItem('token', mockResponse.data.token);

        // Show notification
        window.dispatchEvent(new CustomEvent('notification', {
          detail: { 
            message: mockResponse.data.message,
            type: 'success'
          }
        }));

        // Redirect based on role
        switch(formData.role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'organizer':
            navigate('/organizer/dashboard');
            break;
          default:
            navigate('/user/dashboard');
        }
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4">Create Your Account</h2>
      <p className="text-muted text-center">Select your account type to get started</p>
      
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Role Selection Cards */}
      <div className="d-flex justify-content-center mb-4">
        <Card 
          className={`mx-2 role-card ${selectedRole === 'user' ? 'selected' : ''}`}
          onClick={() => handleRoleChange('user')}
        >
          <Card.Body className="text-center">
            <i className="bi bi-person fs-1"></i>
            <Card.Title>Event Attendee</Card.Title>
            <Card.Text>Join and participate in events</Card.Text>
          </Card.Body>
        </Card>

        <Card 
          className={`mx-2 role-card ${selectedRole === 'organizer' ? 'selected' : ''}`}
          onClick={() => handleRoleChange('organizer')}
        >
          <Card.Body className="text-center">
            <i className="bi bi-calendar-event fs-1"></i>
            <Card.Title>Event Organizer</Card.Title>
            <Card.Text>Create and manage events</Card.Text>
          </Card.Body>
        </Card>

        <Card 
          className={`mx-2 role-card ${selectedRole === 'admin' ? 'selected' : ''}`}
          onClick={() => handleRoleChange('admin')}
        >
          <Card.Body className="text-center">
            <i className="bi bi-shield-lock fs-1"></i>
            <Card.Title>Administrator</Card.Title>
            <Card.Text>Manage platform settings</Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password (min 8 characters)"
            value={formData.password}
            onChange={handleChange}
            minLength="8"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {selectedRole === 'organizer' && (
          <Form.Group className="mb-3">
            <Form.Label>Organization Name</Form.Label>
            <Form.Control
              type="text"
              name="organization"
              placeholder="Your organization name"
              value={formData.organization}
              onChange={handleChange}
              required={selectedRole === 'organizer'}
            />
          </Form.Group>
        )}

        {selectedRole === 'admin' && (
          <Form.Group className="mb-3">
            <Form.Label>Admin Access Code</Form.Label>
            <Form.Control
              type="password"
              name="adminCode"
              placeholder="Enter admin access code"
              value={formData.adminCode}
              onChange={handleChange}
              required={selectedRole === 'admin'}
            />
          </Form.Group>
        )}

        <input type="hidden" name="role" value={selectedRole} />

        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? 'Registering...' : `Register as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
        </Button>
      </Form>
      
      <div className="mt-3 text-center">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </Container>
  );
}

export default Register;