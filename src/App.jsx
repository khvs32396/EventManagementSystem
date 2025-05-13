import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/admin/AdminDashboard';
import OrganizerDashboard from './components/organizer/OrganizerDashboard';
import UserDashboard from './components/user/UserDashboard'; // Only once!
import EventListing from './components/user/EventListing';
import Booking from './components/user/Booking';
import OrganizerManagement from './components/admin/OrganizerManagement';
import EventManagement from './components/organizer/EventManagement';
import Notification from './components/common/Notification';
import About from './pages/About'; // or correct path
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Notification />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/organizers" element={<OrganizerManagement />} />
            <Route path="/organizer" element={<OrganizerDashboard />} />
            <Route path="/organizer/events" element={<EventManagement />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/events" element={<EventListing />} />
            <Route path="/book/:eventId" element={<Booking />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;