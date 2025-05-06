import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);

  return (
    <Router>
      <Routes>
        {!user ? (
          <Route path="*" element={<LoginPage setUser={setUser} />} />
        ) : (
          <>
            
            <Route path="/profile/:userId" element={<ProfilePage user={user} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
