// src/pages/FollowersList.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

function FollowersList() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axios.get(`/follows/followers/${userId}`)
      .then(res => setFollowers(res.data))
      .catch(err => console.error('Failed to fetch followers', err));
  }, [userId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👥 Followers</h2>
      {followers.length > 0 ? (
        followers.map(f => (
          <div
            key={f.follower.id}
            style={styles.card}
            onClick={() => navigate(`/profile/${f.follower.id}`)}
            className="card-hover"
          >
            <img src={f.follower.profilePicture} alt="pic" style={styles.avatar} />
            <div style={styles.info}>
              <p style={styles.username}>{f.follower.username}</p>
              <p style={styles.bio}>{f.follower.bio}</p>
            </div>
          </div>
        ))
      ) : (
        <p style={styles.noFollowers}>No followers yet!</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#fff7f3',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '32px',
    color: '#ff7043',
    marginBottom: '20px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    textAlign: 'center',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff7f3',
    padding: '8px',
    borderRadius: '18px',
    marginBottom: '15px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
    width: '90%',
    maxWidth: '500px',
    alignSelf: 'center',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f4f4f4',
  },
  avatar: {
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    marginRight: '20px',
    objectFit: 'cover',
    border: '3px solid #ff7043',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  username: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '5px',
  },
  bio: {
    fontSize: '14px',
    color: '#777',
    lineHeight: '1.4',
    marginTop: '5px',
  },
  noFollowers: {
    color: '#ff7043',
    fontSize: '18px',
    fontStyle: 'italic',
    marginTop: '40px',
  },
};

export default FollowersList;