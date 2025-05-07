import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';

function HomeFeed() {
    const [posts, setPosts] = useState([]);
    const userId = 1; // hardcoded for testing
    const [likedPosts, setLikedPosts] = useState([]);
    const [commentsMap, setCommentsMap] = useState({});
    const [newComments, setNewComments] = useState({});

    useEffect(() => {
        fetchPosts();
        fetchLikedPosts();
    }, []);

    const fetchPosts = () => {
        axios.get('/posts')
            .then(res => {
                setPosts(res.data);
                const commentPromises = res.data.map(post =>
                    axios.get(`/comments/post/${post.id}`)
                        .then(res => ({ postId: post.id, comments: res.data }))
                );
                Promise.all(commentPromises).then(results => {
                    const map = {};
                    results.forEach(entry => {
                        map[entry.postId] = entry.comments;
                    });
                    setCommentsMap(map);
                });
            })
            .catch(err => console.error(err));
    };

    const fetchLikedPosts = () => {
        axios.get(`/likes/post`).catch(() => setLikedPosts([]));
    };

    const handleToggleLike = (postId, hasLiked) => {
        const url = `/likes/user/${userId}/post/${postId}`;
        if (hasLiked) {
            axios.delete(url).then(fetchPosts).catch(err => console.error(err));
        } else {
            axios.post(url).then(fetchPosts).catch(err => console.error(err));
        }
    };

    const isLiked = (post) => {
        return post.likeCount > 0;
    };

    const handleAddComment = (postId) => {
        const content = newComments[postId];
        if (!content || content.trim() === '') return;

        axios.post(`/comments/user/${userId}/post/${postId}`, { content })
            .then(() => {
                setNewComments({ ...newComments, [postId]: '' });
                fetchPosts();
            })
            .catch(err => console.error(err));
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Home Feed</h2>
            <a href="/create" style={{ display: 'block', textAlign: 'center', margin: '20px 0' }}>
                ➕ Create New Post
            </a>

            {posts.map(post => (
                <div key={post.id} style={styles.card}>
                    <div style={styles.userInfo}>
                        <strong>{post.user.username}</strong>
                        <a href={`/profile/${post.user.id}`} style={{ fontSize: '14px' }}>
                            View profile
                        </a>
                    </div>
                    <img src={post.imageUrl} alt="post" style={styles.image} />
                    
                    <div style={styles.actions}>
                        <button onClick={() => handleToggleLike(post.id, isLiked(post))} style={styles.iconBtn}>
                            {isLiked(post) ? <FavoriteIcon style={{ color: '#ed4956' }} /> : <FavoriteBorderIcon />}
                        </button>
                        <button style={styles.iconBtn}>
                            <ChatBubbleOutlineIcon />
                        </button>
                        <button style={styles.iconBtn}>
                            <SendIcon />
                        </button>
                    </div>

                    <p style={styles.likes}>{post.likeCount} likes</p>
                    <p style={styles.caption}>{post.caption}</p>

                    <div style={styles.commentsSection}>
                        <strong>Comments:</strong>
                        {(commentsMap[post.id] || []).map(comment => (
                            <div key={comment.id} style={styles.comment}>
                                <span style={styles.commentUser}>{comment.user.username}</span>: {comment.content}
                            </div>
                        ))}
                    </div>

                    <div style={styles.commentInputContainer}>
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={newComments[post.id] || ''}
                            onChange={(e) =>
                                setNewComments({ ...newComments, [post.id]: e.target.value })
                            }
                            style={styles.commentInput}
                        />
                        <button
                            onClick={() => handleAddComment(post.id)}
                            style={styles.commentBtn}
                        >
                            Comment
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px 16px',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        background: '#e8926d',
        minHeight: '100vh',
    },
    header: {
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '700',
        marginBottom: '24px',
        color: '#fff',
        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '18px',
        marginBottom: '30px',
        boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
        overflow: 'hidden',
    },
    userInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 16px',
        fontSize: '15px',
        color: '#262626',
        fontWeight: '500',
        borderBottom: '1px solid #eee',
    },
    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
    },
    actions: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        padding: '10px 16px 0',
    },
    iconBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    likes: {
        padding: '6px 16px 0',
        fontWeight: '600',
        color: '#262626',
        fontSize: '14px',
    },
    caption: {
        padding: '4px 16px 0',
        fontSize: '15px',
        color: '#262626',
    },
    commentsSection: {
        padding: '10px 16px',
        fontSize: '14px',
        color: '#262626',
        backgroundColor: '#fafafa',
    },
    comment: {
        marginTop: '4px',
        lineHeight: '1.4',
    },
    commentUser: {
        fontWeight: 'bold',
        marginRight: '4px',
    },
    commentInputContainer: {
        display: 'flex',
        padding: '10px 16px 16px',
        gap: '8px',
        backgroundColor: '#fff',
        borderTop: '1px solid #eee',
    },
    commentInput: {
        flex: 1,
        padding: '10px 14px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        fontSize: '14px',
        outline: 'none',
    },
    commentBtn: {
        backgroundColor: '#3897f0',
        color: 'white',
        border: 'none',
        padding: '8px 14px',
        borderRadius: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '14px',
    },
};

export default HomeFeed;
