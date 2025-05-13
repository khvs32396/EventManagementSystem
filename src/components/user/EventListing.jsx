import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Form, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EventListing() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    date: '',
    search: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // In a real app, you'd call your backend API
      // const response = await axios.get('/api/events');
      
      // Mock data with image paths from public folder
      setTimeout(() => {
        setEvents([
          { 
            id: 1, 
            title: 'Music Festival', 
            description: 'Annual music festival with top artists', 
            date: '2023-12-15', 
            location: 'Central Park', 
            category: 'concert', 
            price: 50,
            availableTickets: 150,
            organizer: 'Event Pro',
            image: '/public/music.jpg' // Image path relative to the public folder
          },
          { 
            id: 2, 
            title: 'Tech Conference', 
            description: 'Latest in tech innovations', 
            date: '2023-11-20', 
            location: 'Convention Center', 
            category: 'conference', 
            price: 100,
            availableTickets: 75,
            organizer: 'Tech Events Inc',
            image: '/public/card.jpg' // Image path relative to the public folder
          },
          { 
            id: 3, 
            title: 'Food Expo', 
            description: 'International food exhibition', 
            date: '2024-01-10', 
            location: 'Exhibition Hall', 
            category: 'food', 
            price: 20,
            availableTickets: 200,
            organizer: 'Food Lovers',
            image: '/public/food.jpg' // Image path relative to the public folder
          }
        ]);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to fetch events');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredEvents = events.filter(event => {
    return (
      (filters.category === '' || event.category === filters.category) &&
      (filters.date === '' || event.date === filters.date) &&
      (filters.search === '' || 
       event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
       event.description.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  if (loading) return <Container className="mt-4">Loading...</Container>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h2>Upcoming Events</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Categories</option>
                    <option value="concert">Concert</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="food">Food</option>
                    <option value="sports">Sports</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="text"
                    name="search"
                    placeholder="Search events..."
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Row>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <Col key={event.id} md={4} className="mb-4">
              <Card>
                <Card.Img 
                  variant="top" 
                  src={event.image} 
                  alt={event.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Badge bg="info" className="mb-2 text-capitalize">
                    {event.category}
                  </Badge>
                  <Card.Text className="text-muted">
                    {new Date(event.date).toLocaleDateString()} | {event.location}
                  </Card.Text>
                  <Card.Text>
                    {event.description.substring(0, 100)}...
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">${event.price}</span>
                    <Button as={Link} to={`/book/${event.id}`} variant="primary" size="sm">
                      Book Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No events found matching your criteria.</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default EventListing;
