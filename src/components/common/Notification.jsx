import { Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function Notification() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success');

  useEffect(() => {
    // In a real app, you'd subscribe to a notification service
    const handleNotification = (e) => {
      setMessage(e.detail.message);
      setVariant(e.detail.variant || 'success');
      setShow(true);
      setTimeout(() => setShow(false), 5000);
    };

    window.addEventListener('notification', handleNotification);
    return () => window.removeEventListener('notification', handleNotification);
  }, []);

  if (!show) return null;

  return (
    <Alert 
      variant={variant} 
      onClose={() => setShow(false)} 
      dismissible
      className="position-fixed top-0 end-0 m-3"
      style={{ zIndex: 9999 }}
    >
      {message}
    </Alert>
  );
}

export default Notification;