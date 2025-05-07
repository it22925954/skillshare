import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    eventDate: ''
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          title: data.title,
          description: data.description,
          location: data.location,
          eventDate: data.eventDate?.slice(0, 16) // for datetime-local input
        });
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (image) data.append('image', image);

    fetch(`http://localhost:8080/api/events/${id}`, {
      method: 'PUT',
      body: data
    })
      .then(res => res.json())
      .then(() => navigate(`/events/${id}`))
      .catch(err => console.error(err));
  };

  return (
    <div style={styles.container}>
      <h2>Update Event</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={formData.title}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          value={formData.location}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="datetime-local"
          name="eventDate"
          required
          value={formData.eventDate}
          onChange={handleChange}
          style={styles.input}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} style={styles.input} />
        <button type="submit" style={styles.button}>Update</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px'
  },
  textarea: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    height: '100px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default UpdateEvent;
