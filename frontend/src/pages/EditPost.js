/*import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

function EditPost() {
  const { id } = useParams();
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then((res) => {
        setCaption(res.data.caption);
        setPreviewUrl(res.data.imageUrl);
      })
      .catch(err => {
        console.error(err);
        alert('Failed to load post');
      });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption || (!imageFile && !previewUrl)) {
      alert('All fields required');
      return;
    }

    const updatedPost = {
      caption,
      imageUrl: imageFile ? previewUrl : previewUrl,
    };

    try {
      await axios.put(`/posts/${id}`, updatedPost);
      alert('Post updated!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to update post');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Edit Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="file" accept="image/*" onChange={handleImageChange} style={styles.input} />
        {previewUrl && <img src={previewUrl} alt="Preview" style={styles.preview} />}
        <textarea
          placeholder="Update your caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Update</button>
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

export default EditPost;*/
