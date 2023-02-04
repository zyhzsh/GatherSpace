import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { useAuth0 } from '@auth0/auth0-react';
import Memories from './pages/Memories';
import Profile from './pages/Profile';
import Events from './pages/Events';
import Favorite from './pages/Favorite';
import CreateEventModal from './components/CreateEventModal';
import { useEffect } from 'react';
import { useUserStore } from './store';
function App() {
  const { user } = useAuth0();
  const login = useUserStore((state) => state.login);
  useEffect(() => {
    if (user) {
      login(user);
    }
  }, [user]);
  if (user) {
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
  } else if (!user) {
    return <Login />;
  }
  return <>Loading...</>;
}

export default App;
``;
