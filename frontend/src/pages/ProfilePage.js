import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';

function ProfilePage() {
    const { userId } = useParams(); // from route like /profile/1
    const currentUserId = 1; // logged-in user
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowToggle = () => {
        const url = `/follows/follower/${currentUserId}/following/${userId}`;

        if (isFollowing) {
            axios.delete(url)
                .then(() => {
                    setIsFollowing(false);
                    setFollowerCount(followerCount - 1);
                });
        } else {
            axios.post(url)
                .then(() => {
                    setIsFollowing(true);
                    setFollowerCount(followerCount + 1);
                });
        }
    };


    useEffect(() => {
        axios.get(`/users/${userId}`).then(res => setUser(res.data));
        axios.get(`/posts/user/${userId}`).then(res => setPosts(res.data));
        axios.get(`/follows/count/followers/${userId}`).then(res => setFollowerCount(res.data.followers));
        axios.get(`/follows/count/following/${userId}`).then(res => setFollowingCount(res.data.following));
        axios.get(`/follows/following/${currentUserId}`)
            .then(res => {
                const following = res.data.map(f => f.following.id);
                setIsFollowing(following.includes(parseInt(userId)));
            });

    }, [userId]);

    if (!user) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.profileHeader}>
                <img src={user.profilePicture} alt="profile" style={styles.profilePic} />
                <div>
                    <h2>{user.username}</h2>
                    <p>{user.bio}</p>
                    <p>👥 {followerCount} followers | 🔁 {followingCount} following</p>

                </div>
                {currentUserId !== parseInt(userId) && (
                    <button onClick={handleFollowToggle} style={isFollowing ? styles.unfollowBtn : styles.followBtn}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                )}
            </div>

            <h3 style={styles.sectionTitle}>Posts</h3>
            <div style={styles.postsGrid}>
                {posts.map(post => (
                    <div key={post.id} style={styles.postCard}>
                        <img src={post.imageUrl} alt="post" style={styles.postImg} />
                        <p>{post.caption}</p>
                        <p style={styles.likes}>❤️ {post.likeCount} likes</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial'
    },
    profileHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '30px'
    },
    profilePic: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    sectionTitle: {
        marginBottom: '10px'
    },
    postsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
    },
    postCard: {
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '8px'
    },
    postImg: {
        width: '100%',
        borderRadius: '6px'
    },
    likes: {
        color: 'crimson',
        fontSize: '14px',
        marginTop: '4px'
    },
    followBtn: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '10px'
    },
    unfollowBtn: {
        backgroundColor: '#aaa',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '10px'
    }

};

export default ProfilePage;
