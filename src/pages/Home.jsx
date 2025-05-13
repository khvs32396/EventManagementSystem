import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container className="mt-4">
      <Card className="text-center p-4">
        <h1>Welcome to Eventzz</h1>
        <p className="lead">
          Your one-stop solution for event management and booking.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button as={Link} to="/events" variant="primary" size="lg">
            Browse Events
          </Button>
          <Button as={Link} to="/register" variant="outline-primary" size="lg">
            Get Started
          </Button>
        </div>
      </Card>

      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <Card>
            <Card.Body>
              <Card.Title>For Users</Card.Title>
              <Card.Text>
                Discover and book exciting events in your area.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card>
            <Card.Body>
              <Card.Title>For Organizers</Card.Title>
              <Card.Text>
                Create and manage your events with our powerful tools.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card>
            <Card.Body>
              <Card.Title>For Admins</Card.Title>
              <Card.Text>
                Manage the platform and oversee all activities.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default Home;