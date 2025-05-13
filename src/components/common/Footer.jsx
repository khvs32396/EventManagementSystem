import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-4">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3">
            <h5>EventHub</h5>
            <p>Connecting people through unforgettable events.</p>
          </Col>

          <Col md={4} className="mb-3">
            <h6>Contact Us</h6>
            <p><FaEnvelope className="me-2" /> support@eventzz.com</p>
            <p><FaPhoneAlt className="me-2" /> +91 987654321</p>
          </Col>

          <Col md={4} className="mb-3">
            <h6>Follow Us</h6>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white me-3">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white me-3">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/trust_in_112/" target="_blank" rel="noreferrer" className="text-white">
              <FaInstagram />
            </a>
          </Col>
        </Row>

        <hr className="bg-light" />
        <p className="text-center mb-0">© 2023 EventHub - All Rights Reserved | Hackathon Project</p>
      </Container>
    </footer>
  );
}

export default Footer;
