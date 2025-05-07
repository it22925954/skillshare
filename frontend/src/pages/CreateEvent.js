import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EventFeed = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <h2>Upcoming Events</h2>
      <Link to="/event/create" style={styles.createButton}>Create Event</Link>
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        events.map(event => (
          <div key={event.id} style={styles.card}>
            {event.imagePath && (
              <img
                src={`http://localhost:8080/${event.imagePath}`}
                alt="Event"
                style={styles.image}
              />
            )}
            <div style={styles.content}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleString()}</p>
              <Link to={`/events/${event.id}`} style={styles.link}>View Details</Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto'
  },
  createButton: {
    display: 'inline-block',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    textDecoration: 'none',
    borderRadius: '5px',
    marginBottom: '20px',
    fontSize: '16px',
    textAlign: 'center',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'cover'
  },
  content: {
    padding: '15px'
  },
  link: {
    marginTop: '10px',
    display: 'inline-block',
    color: '#007bff',
    textDecoration: 'none'
  }
};

export default EventFeed;
