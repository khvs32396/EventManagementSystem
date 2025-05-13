import { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal, Form, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'concert',
    status: 'active'
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // In a real app, you'd call your backend API
      // const response = await axios.get('/api/organizer/events');
      
      // Mock data
      setTimeout(() => {
        setEvents([
          { 
            id: 1, 
            title: 'Music Festival', 
            description: 'Annual music festival with top artists', 
            date: '2023-12-15', 
            location: 'Central Park', 
            category: 'concert', 
            status: 'active',
            bookings: 150
          },
          { 
            id: 2, 
            title: 'Tech Conference', 
            description: 'Latest in tech innovations', 
            date: '2023-11-20', 
            location: 'Convention Center', 
            category: 'conference', 
            status: 'active',
            bookings: 75
          },
          { 
            id: 3, 
            title: 'Food Expo', 
            description: 'International food exhibition', 
            date: '2024-01-10', 
            location: 'Exhibition Hall', 
            category: 'food', 
            status: 'draft',
            bookings: 0
          }
        ]);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to fetch events');
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      category: event.category,
      status: event.status
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, you'd call your backend API
      // await axios.put(`/api/organizer/events/${currentEvent.id}`, formData);
      
      // Mock update
      setTimeout(() => {
        setEvents(prev => prev.map(ev => 
          ev.id === currentEvent.id ? { ...ev, ...formData } : ev
        ));
        setShowModal(false);
        window.dispatchEvent(new CustomEvent('notification', {
          detail: { message: 'Event updated successfully!' }
        }));
      }, 500);
    } catch (err) {
      setError('Failed to update event');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      // In a real app, you'd call your backend API
      // await axios.delete(`/api/organizer/events/${id}`);
      
      // Mock delete
      setTimeout(() => {
        setEvents(prev => prev.filter(ev => ev.id !== id));
        window.dispatchEvent(new CustomEvent('notification', {
          detail: { message: 'Event deleted successfully!' }
        }));
      }, 500);
    } catch (err) {
      setError('Failed to delete event');
    }
  };

  if (loading) return <Container className="mt-4">Loading...</Container>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Events</h2>
        <Button as={Link} to="/organizer/events/new" variant="primary">
          Create New Event
        </Button>
      </div>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
            <th>Category</th>
            <th>Status</th>
            <th>Bookings</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>
                <Badge bg="info" className="text-capitalize">
                  {event.category}
                </Badge>
              </td>
              <td>
                <Badge bg={
                  event.status === 'active' ? 'success' : 
                  event.status === 'draft' ? 'secondary' : 'warning'
                } className="text-capitalize">
                  {event.status}
                </Badge>
              </td>
              <td>{event.bookings}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEdit(event)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(event.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="concert">Concert</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="food">Food</option>
                    <option value="sports">Sports</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default EventManagement;