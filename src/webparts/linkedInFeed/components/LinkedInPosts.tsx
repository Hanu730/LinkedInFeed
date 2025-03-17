import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './LinkedInFeed.module.scss';

interface LinkedInPost {
  id: string;
  text: string;
  created: string;
}

const LinkedInPosts = () => {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  //const COMPANY_ID = '108904'; // Your LinkedIn company ID

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Use proxy URL to bypass CORS
        const response = await axios.get(
          `'http://localhost:5000/linkedin'`
        );
        
        console.log('LinkedIn API Response:', response.data);

        const items = response.data.elements.map((item: any) => ({
          id: item.id,
          text: item.specificContent?.com.linkedin.ugc.ShareContent?.shareCommentary?.text || 'No text available',
          created: item.firstPublishedAt
            ? new Date(item.firstPublishedAt).toLocaleString()
            : 'Unknown Date',
        }));

        setPosts(items);
      } catch (error) {
        console.log('Error fetching LinkedIn posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Latest LinkedIn Posts</h2>
      <div className={styles.postsGrid}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <p className={styles.postText}>{post.text}</p>
              <p className={styles.postDate}>{post.created}</p>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default LinkedInPosts;
