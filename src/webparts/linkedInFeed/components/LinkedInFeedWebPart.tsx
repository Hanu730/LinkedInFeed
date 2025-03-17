import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
interface LinkedInPost {
    id: string;
    text: {
      text: string;
    };
    created: {
      time: number;
    };
  }
  
const LinkedInFeedWebPart1 = () => {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);

  const accessToken = 'AQVDAmxCIUpi7o357sBINMns80XNhjc8rbGLPKUPmzoziWWs82EasJpg8Qy1ailLvFGDsqpOWJ-jsXDlfKtfwULMud6LpWREubvJERGEvHF5VqQuoAcUO9sc5QdpN92GUeY_1XOHTZtz-48FfgMMeMsKAk1KTfEkZYDmhXOuGgslfxnrwUfhpLwIw5OJc9kdpEmM_HqOfm6aPtZpq-93VtrIXUehtoiG6Dizg4QmSaTdQtswmE5UJ7vWl42lwuxI8f6znkSs2og7xjYoU1F7MANA5aq-JV8zV2qpAhAFHiwC-GgC0u9TafQ7KBwHtZhm84yoTdAzfCPOCFjN8KWDgOi6fuy0gQ'; // Use the token from Postman
  const organizationId = '108904';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:organization:${organizationId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        setPosts(response.data.elements);
      } catch (error) {
        console.log('Error fetching LinkedIn feed:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>LinkedIn Feed</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <p>{post.text.text}</p>
            <small>
              {new Date(post.created.time).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkedInFeedWebPart1;
