import { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function OrganizerManagement() {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentOrganizer, setCurrentOrganizer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'active'
  });

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const fetchOrganizers = async () => {
    try {
      // In a real app, you'd call your backend API
      // const response = await axios.get('/api/admin/organizers');
      
      // Mock data
      setTimeout(() => {
        setOrganizers([
          { id: 1, name: 'Event Pro', email: 'eventpro@example.com', status: 'active' },
          { id: 2, name: 'Party Planners', email: 'party@example.com', status: 'pending' },
          { id: 3, name: 'Conference Masters', email: 'conf@example.com', status: 'suspended' }
        ]);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to fetch organizers');
      setLoading(false);
    }
  };

  const handleEdit = (organizer) => {
    setCurrentOrganizer(organizer);
    setFormData({
      name: organizer.name,
      email: organizer.email,
      status: organizer.status
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
      // await axios.put(`/api/admin/organizers/${currentOrganizer.id}`, formData);
      
      // Mock update
      setTimeout(() => {
        setOrganizers(prev => prev.map(org => 
          org.id === currentOrganizer.id ? { ...org, ...formData } : org
        ));
        setShowModal(false);
        window.dispatchEvent(new CustomEvent('notification', {
          detail: { message: 'Organizer updated successfully!' }
        }));
      }, 500);
    } catch (err) {
      setError('Failed to update organizer');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this organizer?')) return;
    
    try {
      // In a real app, you'd call your backend API
      // await axios.delete(`/api/admin/organizers/${id}`);
      
      // Mock delete
      setTimeout(() => {
        setOrganizers(prev => prev.filter(org => org.id !== id));
        window.dispatchEvent(new CustomEvent('notification', {
          detail: { message: 'Organizer deleted successfully!' }
        }));
      }, 500);
    } catch (err) {
      setError('Failed to delete organizer');
    }
  };

  if (loading) return <Container className="mt-4">Loading...</Container>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h2>Manage Organizers</h2>
      
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {organizers.map(organizer => (
            <tr key={organizer.id}>
              <td>{organizer.name}</td>
              <td>{organizer.email}</td>
              <td>
                <span className={`badge bg-${
                  organizer.status === 'active' ? 'success' : 
                  organizer.status === 'pending' ? 'warning' : 'danger'
                }`}>
                  {organizer.status}
                </span>
              </td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEdit(organizer)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(organizer.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Organizer</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </Form.Select>
            </Form.Group>
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

export default OrganizerManagement;