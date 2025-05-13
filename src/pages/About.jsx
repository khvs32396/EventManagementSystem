import { Container, Card } from 'react-bootstrap';

function About() {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>About EventHub</Card.Title>
          <Card.Text>
            EventHub is a comprehensive event management platform designed to connect event organizers 
            with attendees. Our mission is to simplify event planning and booking for everyone.
          </Card.Text>
          <Card.Text>
            This platform was developed as part of a hackathon project with the goal of creating
            a seamless experience for all users.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default About;