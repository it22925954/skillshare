// src/pages/FollowingList.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

function FollowingList() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    axios.get(`/follows/following/${userId}`)
      .then(res => setFollowing(res.data))
      .catch(err => console.error('Failed to fetch following', err));
  }, [userId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔁 Following</h2>
      {following.length > 0 ? (
        following.map(f => (
          <div
            key={f.following.id}
            style={styles.card}
            onClick={() => navigate(`/profile/${f.following.id}`)}
            className="card-hover"
          >
            <img src={f.following.profilePicture} alt="pic" style={styles.avatar} />
            <div style={styles.info}>
              <p style={styles.username}>{f.following.username}</p>
              <p style={styles.bio}>{f.following.bio}</p>
            </div>
          </div>
        ))
      ) : (
        <p style={styles.noFollowers}>You are not following anyone yet!</p>
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
    backgroundColor: '#f4f4f4', // subtle background color change on hover
  },
  avatar: {
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    marginRight: '20px',
    objectFit: 'cover',
    border: '3px solid #ff7043', // Add border around avatar for better prominence
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

export default FollowingList;