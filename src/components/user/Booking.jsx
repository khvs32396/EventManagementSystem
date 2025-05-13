import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

function Booking() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    tickets: 1,
    paymentMethod: 'credit_card'
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      // In a real app, you'd call your backend API
      // const response = await axios.get(`/api/events/${eventId}`);
      
      // Mock data
      setTimeout(() => {
        const mockEvent = {
          id: eventId,
          title: 'Music Festival',
          description: 'Annual music festival with top artists',
          date: '2023-12-15',
          location: 'Central Park',
          category: 'concert',
          price: 50,
          availableTickets: 150,
          organizer: 'Event Pro'
        };
        setEvent(mockEvent);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to fetch event details');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // In a real app, you'd call your backend API
      // await axios.post('/api/bookings', { ...bookingData, eventId });
      
      // Mock booking
      setTimeout(() => {
        setSubmitting(false);
        window.dispatchEvent(new CustomEvent('notification', {
          detail: { 
            message: 'Booking successful! You will receive a confirmation email shortly.',
            variant: 'success'
          }
        }));
        navigate('/user');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) return (
    <Container className="mt-4 text-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!event) return <Alert variant="warning">Event not found</Alert>;

  return (
    <Container className="mt-4">
      <h2>Book Event: {event.title}</h2>
      
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Event Details</h5>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Price per ticket:</strong> ${event.price}</p>
              <p><strong>Available tickets:</strong> {event.availableTickets}</p>
              <p><strong>Organizer:</strong> {event.organizer}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Booking Information</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={bookingData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Number of Tickets</Form.Label>
                  <Form.Control
                    type="number"
                    name="tickets"
                    min="1"
                    max={event.availableTickets}
                    value={bookingData.tickets}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    name="paymentMethod"
                    value={bookingData.paymentMethod}
                    onChange={handleChange}
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="paypal">PayPal</option>
                  </Form.Select>
                </Form.Group>
                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="ms-2">Processing...</span>
                      </>
                    ) : (
                      `Pay $${event.price * bookingData.tickets}`
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Booking;