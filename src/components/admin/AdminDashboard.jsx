import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <Container className="mt-4">
      <h2>Admin Dashboard</h2>
      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Organizers</Card.Title>
              <Card.Text>
                Manage all organizers on the platform
              </Card.Text>
              <Button as={Link} to="/admin/organizers" variant="primary">
                Manage Organizers
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Events</Card.Title>
              <Card.Text>
                View and manage all events
              </Card.Text>
              <Button as={Link} to="/events" variant="primary">
                View All Events
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Reports</Card.Title>
              <Card.Text>
                Generate platform reports
              </Card.Text>
              <Button variant="primary" disabled>
                Generate Reports
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;