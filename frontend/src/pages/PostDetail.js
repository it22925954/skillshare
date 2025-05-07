/*  import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => alert('Post not found'));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{post.caption}</h2>
      <img src={post.imageUrl} alt="Post" style={{ maxWidth: '100%', borderRadius: 12 }} />
      <p><strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}</p>
    </div>
  );
}

export default PostDetail;*/
