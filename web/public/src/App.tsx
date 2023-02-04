//import reactLogo from './assets/react.svg';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { useAuth0 } from '@auth0/auth0-react';
import Memories from './pages/Memories';
import Profile from './pages/Profile';
import Events from './pages/Events';
import Favorite from './pages/Favorite';
import CreateEventModal from './components/CreateEventModal';
function App() {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <Router>
        <Header />
        <CreateEventModal />
        <Routes>
          {/* Memories */}
          <Route path="/" element={<Memories />} />
          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
          {/* Events */}
          <Route path="/events" element={<Events />} />
          <Route path="/event/detail" element={<>ED</>} />
          {/* Favorite */}
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
      </Router>
    );
  } else if (!isAuthenticated) {
    return <Login />;
  }
  return <>Loading...</>;
}

export default App;
