import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/events/${eventId}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(err => console.error(err));
  }, [eventId]);

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this event?');
    if (!confirmed) return;
  
    fetch(`http://localhost:8080/api/events/${eventId}`, {
      method: 'DELETE'
    })
      .then(() => navigate('/events'))
      .catch(err => console.error(err));
  };  

  if (!event) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2>{event.title}</h2>
      {event.imagePath && (
        <img
          src={`http://localhost:8080/${event.imagePath}`}
          alt="Event"
          style={styles.image}
        />
      )}
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleString()}</p>
      <div style={styles.actions}>
        <button style={styles.button} onClick={() => navigate(`/events/edit/${event.id}`)}>Edit</button>
        <button style={styles.deleteButton} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '8px'
  },
  image: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    marginBottom: '20px'
  },
  actions: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default EventDetails;
