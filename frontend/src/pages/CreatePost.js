import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function CreatePost() {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const userId = 1;
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption || !imageFile) {
      alert('All fields required');
      return;
    }

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', imageFile);

    try {
      const res = await axios.post(`/posts/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const createdPost = res.data;
      alert('Post created!');
      navigate(`/posts/${createdPost.id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to create post');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Create New Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.input}
        />
        {previewUrl && (
          <img src={previewUrl} alt="Preview" style={styles.preview} />
        )}
        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Share</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px 16px',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: '600',
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    marginBottom: '24px',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: '18px',
    padding: '20px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  textarea: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '14px',
    resize: 'none',
    minHeight: '80px',
  },
  preview: {
    width: '100%',
    borderRadius: '12px',
    objectFit: 'cover',
  },
  button: {
    backgroundColor: '#3897f0',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default CreatePost;
