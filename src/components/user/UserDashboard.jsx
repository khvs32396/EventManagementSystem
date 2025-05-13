import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserDashboard() {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    bookings: 3,
    upcomingEvents: 2
  };

  return (
    <Container className="mt-4">
      <h2>Welcome, {user.name}</h2>
      
      <Row className="mt-4">
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {user.email}<br />
                <strong>Total Bookings:</strong> {user.bookings}<br />
                <strong>Upcoming Events:</strong> {user.upcomingEvents}
              </Card.Text>
              <Button variant="primary">Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Quick Actions</Card.Title>
              <div className="d-grid gap-2">
                <Button as={Link} to="/events" variant="outline-primary">
                  Browse Events
                </Button>
                <Button as={Link} to="/user/bookings" variant="outline-success">
                  View My Bookings
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserDashboard;