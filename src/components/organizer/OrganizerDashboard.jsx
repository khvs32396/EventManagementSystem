import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function OrganizerDashboard() {
  return (
    <Container className="mt-4">
      <h2>Organizer Dashboard</h2>
      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>My Events</Card.Title>
              <Card.Text>
                Manage all your events
              </Card.Text>
              <Button as={Link} to="/organizer/events" variant="primary">
                Manage Events
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Create Event</Card.Title>
              <Card.Text>
                Create a new event
              </Card.Text>
              <Button as={Link} to="/organizer/events/new" variant="primary">
                Create Event
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Reports</Card.Title>
              <Card.Text>
                View event reports
              </Card.Text>
              <Button variant="primary" disabled>
                View Reports
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrganizerDashboard;