import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomeFeed from './pages/HomeFeed';
import CreatePost from './pages/CreatePost';
import ProfilePage from './pages/ProfilePage';

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
          <Route path="/create" element={<CreatePost user={user} />} />
        ) : (
          <>
            <Route path="/" element={<HomeFeed user={user} />} />
            
            <Route path="/profile/:userId" element={<ProfilePage user={user} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
