// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './LinkedInFeed.module.scss';
// //import { ILinkedInFeedProps } from './ILinkedInFeedProps';



// const LinkedInFeed: React.FC = () => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const accessToken = 'AQVDAmxCIUpi7o357sBINMns80XNhjc8rbGLPKUPmzoziWWs82EasJpg8Qy1ailLvFGDsqpOWJ-jsXDlfKtfwULMud6LpWREubvJERGEvHF5VqQuoAcUO9sc5QdpN92GUeY_1XOHTZtz-48FfgMMeMsKAk1KTfEkZYDmhXOuGgslfxnrwUfhpLwIw5OJc9kdpEmM_HqOfm6aPtZpq-93VtrIXUehtoiG6Dizg4QmSaTdQtswmE5UJ7vWl42lwuxI8f6znkSs2og7xjYoU1F7MANA5aq-JV8zV2qpAhAFHiwC-GgC0u9TafQ7KBwHtZhm84yoTdAzfCPOCFjN8KWDgOi6fuy0gQ';
//   useEffect(() => {
//     if (!accessToken) {
//       setError('Please provide a LinkedIn access token in the web part settings.');
//       return;
//     }

//     const fetchPosts = async () => {
//       try {
//         const response = await axios.post(
//           'https://prod-72.southeastasia.logic.azure.com:443/workflows/cad0eac2148c459da2917c0eda6ab383/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=coHcqrlld3nH2rKsAOU0ED1aSI2J4cuzdM8MaNFwjIo',
//           {
            
//           }
//         );
//         setPosts(response.data.elements);
//       } catch (err) {
//         setError('Failed to fetch LinkedIn posts. Check your token or network.');
//         console.error(err);
//       }
//     };

//     fetchPosts();
//   }, [accessToken]);

//   if (error) {
//     return <div className={styles.error}>{error}</div>;
//   }

//   return (
//     <div className={styles.linkedInFeed}>
//       <h2>LinkedIn Feed</h2>
//       {posts.length === 0 ? (
//         <p>Loading posts...</p>
//       ) : (
//         <ul>
//           {posts.map((post) => (
//             <li key={post.id} className={styles.post}>
//               <p>{post.commentary || 'No text available'}</p>
//               {post.content?.media && (
//     <p><em>(Includes media: {post.content.media.id})</em></p>
//   )}
//               <small>Posted: {new Date(post.createdAt).toLocaleDateString()}</small>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LinkedInFeed;


import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './LinkedInFeed.module.scss';
import { Stack, Text, List } from '@fluentui/react';

interface IPost {
    id: string;
    text: string;
    createdAt: string;
    commentary:string;
    mediaType?: 'image' | 'video';
    mediaUrl: string;
      content?: {
    media?: {
      id: string;
      url?: string;
    };
  };
  }
const LinkedInFeed: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  //const accessToken = 'AQVDAmxCIUpi7o357sBINMns80XNhjc8rbGLPKUPmzoziWWs82EasJpg8Qy1ailLvFGDsqpOWJ-jsXDlfKtfwULMud6LpWREubvJERGEvHF5VqQuoAcUO9sc5QdpN92GUeY_1XOHTZtz-48FfgMMeMsKAk1KTfEkZYDmhXOuGgslfxnrwUfhpLwIw5OJc9kdpEmM_HqOfm6aPtZpq-93VtrIXUehtoiG6Dizg4QmSaTdQtswmE5UJ7vWl42lwuxI8f6znkSs2og7xjYoU1F7MANA5aq-JV8zV2qpAhAFHiwC-GgC0u9TafQ7KBwHtZhm84yoTdAzfCPOCFjN8KWDgOi6fuy0gQ';

  // Function to parse commentary and convert hashtags to clickable links
  const parseCommentary = (commentary: string): JSX.Element[] => {
    if (!commentary) return [<span key="no-commentary">No commentary available</span>];

    const hashtagRegex = /{hashtag\|\\#\|([^}]+)}/g;
    const parts: JSX.Element[] = [];
    let lastIndex = 0;
    let match;

    while ((match = hashtagRegex.exec(commentary)) !== null) {
      // Add text before the hashtag
      if (match.index > lastIndex) {
        parts.push(<span key={lastIndex}>{commentary.slice(lastIndex, match.index)}</span>);
      }

      // Extract hashtag and create a clickable link
      const hashtagText = match[1]; // e.g., "WomensDay"
      const hashtagLink = `https://www.linkedin.com/search/results/all/?keywords=%23${hashtagText.toLowerCase()}&origin=HASH_TAG_FROM_FEED`;
      parts.push(
        <a
          key={match.index}
          href={hashtagLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.hashtag}
        >
          #{hashtagText}
        </a>
      );

      lastIndex = hashtagRegex.lastIndex;
    }

    // Add remaining text after the last hashtag
    if (lastIndex < commentary.length) {
      parts.push(<span key={lastIndex}>{commentary.slice(lastIndex)}</span>);
    }

    return parts;
  };
  const fetchImageUrl = async (mediaId: string) => {
    try {
      const response = await axios.post(
        `https://prod-64.southeastasia.logic.azure.com:443/workflows/4fe80691f8a84c02956f886596bd6eac/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=p_UIhe5vjSOpPGip1aLb0ZCTUM7SwJY4h-A687nn8Xs`
        , {
          Id: mediaId
        }
      );
      if( response.data){
        var URL=response.data.downloadUrl
        return URL;
      }else{
      return response.data.downloadUrl;
      }
    } catch (err) {
      console.log(`Failed to fetch image: ${mediaId}`, err);
      return null;
    }
  };
  const fetchPosts = async () => {
    try {
      const response = await axios.post(
        'https://prod-72.southeastasia.logic.azure.com:443/workflows/cad0eac2148c459da2917c0eda6ab383/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=coHcqrlld3nH2rKsAOU0ED1aSI2J4cuzdM8MaNFwjIo',
        {
          // Assuming the Logic App expects the token in the body; adjust if needed
          
        }
      );
      
      const posts = response.data.elements.map((post: IPost) => ({
        ...post,
        mediaType: post?.content?.media?.id.indexOf('urn:li:image:')==0
          ? 'image'
          : post?.content?.media?.id.indexOf('urn:li:video:')==0
          ? 'video'
          : undefined,
      }));


      const posts1 = await Promise.all(
        posts.map(async (post: IPost) => {
         
          let mediaUrl: any;
  
  
  
          if (post.mediaType=="image") {
           
           
             
              mediaUrl = await fetchImageUrl(post.content?.media?.id as string);
            
          } else if (post.mediaType=="video") {
           
            // Fetch video URL
          
         
              mediaUrl = await fetchVideoUrl(post.content?.media?.id as string);
            
          }
  
          return {
            ...post,
            mediaUrl,
          };
        })
      );
       // Debug the response
      setPosts(posts1 || []);
      console.log('Raw response:', posts1);
      // if(posts.length>0){
      //   {posts.map((post) => (
      //     post.content?.media && (post.content.media.id.indexOf('urn:li:image:')
            
      //     )
      //   ))}
      // }
    } catch (err) {
      setError('Failed to fetch LinkedIn posts. Check your token or network.');
      //fetchMedia("");
      console.error(err);
    }
  };
 
  const fetchVideoUrl = async (mediaId: string) => {
    
    try {
      const response = await axios.post(
        `https://prod-39.southeastasia.logic.azure.com:443/workflows/b6de957ff4bb46808a7d9afd80f4a5d7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fRRtEUYjA4s3sHZmc1fKqX94Dy9j_TZ9eBh7V5EsbNY`,
        {
          Id: mediaId
        }
      );

      if( response.data){
        var URL1=response.data.downloadUrl
       return URL1
      }else{
      return response.data.downloadUrl;
      }
    } catch (err) {
      console.log(`Failed to fetch video: ${mediaId}`, err);
      return null;
    }
  };
  useEffect(() => {
   
    fetchPosts();

  },[]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (

    <Stack tokens={{ childrenGap: 10 }}>
      <Text variant="large">LinkedIn Posts</Text>
      {posts.length === 0 ? (
        <Text>Loading...</Text>
      ) : ( 
        
        <List
          items={posts}
          onRenderCell={(item?: IPost) => (
            
            <Stack tokens={{ childrenGap: 5 }} className={styles.postContainer}>
              <Text>{parseCommentary(item?.commentary||'')}</Text>
                       {/* {item?.content?.media && (
    <p><em>(Includes media: {item?.content.media.id})</em></p>
   )} */}
             {item?.mediaType == 'image' && item.mediaUrl && (
          <img
            src={item.mediaUrl}
            alt="Post Image"
            className={styles.media}
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
        )}

        {/* Render Video */}
        {item?.mediaType == 'video' && item.mediaUrl && (
          <video
            controls
            className={styles.media}
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          >
            <source src={item.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
              <Text variant="small">{new Date(parseInt(item?.createdAt || '0')).toLocaleDateString()}</Text>
            </Stack>
          )}
        />
      )}
    </Stack>
    // <div className={styles.linkedInFeed}>
    //   <h2>LinkedIn Feed</h2>
    //   {posts.length === 0 ? (
    //     <p>Loading posts...</p>
    //   ) : (
    //     <ul>
    //       {posts.map((post) => (
    //         <li key={post.id} className={styles.post}>
    //           <p>{parseCommentary(post.commentary)}</p>
    //           {post.content?.media && (
    //             <p><em>(Includes media: {post.content.media.id})</em></p>
    //           )}
    //           <small>Posted: {new Date(post.createdAt).toLocaleDateString()}</small>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
  );
};

export default LinkedInFeed;




// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './LinkedInFeed.module.scss';
// import { Stack, Text, List, IconButton } from '@fluentui/react';

// interface IPost {
//   id: string;
//   text: string;
//   createdAt: string;
//   commentary: string;
//   content?: {
//     media?: {
//       id: string;
//       url?: string;
//     };
//   };
//   likes?: number;
//   comments?: { id: string; text: string }[];
// }

// const LinkedInFeed: React.FC = () => {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   // Function to parse commentary and convert hashtags to clickable links
//   const parseCommentary = (commentary: string): JSX.Element[] => {
//     if (!commentary) return [<span key="no-commentary">No commentary available</span>];

//     const hashtagRegex = /{hashtag\|\\#\|([^}]+)}/g;
//     const parts: JSX.Element[] = [];
//     let lastIndex = 0;
//     let match;

//     while ((match = hashtagRegex.exec(commentary)) !== null) {
//       if (match.index > lastIndex) {
//         parts.push(<span key={lastIndex}>{commentary.slice(lastIndex, match.index)}</span>);
//       }

//       const hashtagText = match[1];
//       const hashtagLink = `https://www.linkedin.com/search/results/all/?keywords=%23${hashtagText.toLowerCase()}&origin=HASH_TAG_FROM_FEED`;
//       parts.push(
//         <a
//           key={match.index}
//           href={hashtagLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className={styles.hashtag}
//         >
//           #{hashtagText}
//         </a>
//       );

//       lastIndex = hashtagRegex.lastIndex;
//     }

//     if (lastIndex < commentary.length) {
//       parts.push(<span key={lastIndex}>{commentary.slice(lastIndex)}</span>);
//     }

//     return parts;
//   };

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.post(
//           'https://prod-72.southeastasia.logic.azure.com:443/workflows/cad0eac2148c459da2917c0eda6ab383/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=coHcqrlld3nH2rKsAOU0ED1aSI2J4cuzdM8MaNFwjIo',
//           {}
//         );
//         // Initialize likes and comments for each post if not present
//         const initializedPosts = response.data.elements.map((post: IPost) => ({
//           ...post,
//           likes: post.likes || 0,
//           comments: post.comments || []
//         }));
//         setPosts(initializedPosts || []);
//       } catch (err) {
//         setError('Failed to fetch LinkedIn posts. Check your token or network.');
//         console.error(err);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Like handler
//   const handleLike = (postId: string) => {
//     setPosts(posts.map(post => 
//       post.id === postId 
//         ? { ...post, likes: (post.likes || 0) + 1 }
//         : post
//     ));
//   };

//   // Comment handler
//   const handleAddComment = (postId: string, commentText: string) => {
//     if (!commentText.trim()) return;

//     setPosts(posts.map(post => 
//       post.id === postId 
//         ? { 
//             ...post, 
//             comments: [
//               ...(post.comments || []),
//               { 
//                 id: `${Date.now()}`, 
//                 text: commentText 
//               }
//             ]
//           }
//         : post
//     ));
//   };

//   if (error) {
//     return <div className={styles.error}>{error}</div>;
//   }

//   return (
//     <Stack tokens={{ childrenGap: 10 }}>
//       <Text variant="large">LinkedIn Posts</Text>
//       {posts.length === 0 ? (
//         <Text>Loading...</Text>
//       ) : (
//         <List
//           items={posts}
//           onRenderCell={(item?: IPost) => {
//             const [commentText, setCommentText] = useState('');
            
//             return (
//               <Stack tokens={{ childrenGap: 5 }} className={styles.postContainer}>
//                 {/* Commentary */}
//                 <Text>{parseCommentary(item?.commentary || '')}</Text>
                
//                 {/* Media */}
//                 {item?.content?.media?.url && (
//                   <img 
//                     src={item.content.media.url} 
//                     alt="Post media" 
//                     className={styles.postMedia}
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).style.display = 'none';
//                     }}
//                   />
//                 )}
                
//                 {/* Date */}
//                 <Text variant="small">
//                   {new Date(parseInt(item?.createdAt || '0')).toLocaleDateString()}
//                 </Text>

//                 {/* Like Section */}
//                 <Stack horizontal tokens={{ childrenGap: 10 }} className={styles.interactionBar}>
//                   <IconButton 
//                     iconProps={{ iconName: 'Like' }}
//                     onClick={() => handleLike(item?.id || '')}
//                     className={styles.actionButton}
//                   />
//                   <Text>{item?.likes || 0} Likes</Text>
//                 </Stack>

//                 {/* Comments Section */}
//                 <Stack className={styles.commentsSection}>
//                   {item?.comments?.map(comment => (
//                     <Text key={comment.id} variant="small" className={styles.comment}>
//                       {comment.text}
//                     </Text>
//                   ))}
                  
//                   {/* Comment Input */}
//                   <Stack horizontal tokens={{ childrenGap: 5 }}>
//                     <input
//                       type="text"
//                       value={commentText}
//                       onChange={(e) => setCommentText(e.target.value)}
//                       placeholder="Add a comment..."
//                       className={styles.commentInput}
//                     />
//                     <IconButton
//                       iconProps={{ iconName: 'Send' }}
//                       onClick={() => {
//                         handleAddComment(item?.id || '', commentText);
//                         setCommentText('');
//                       }}
//                       disabled={!commentText.trim()}
//                       className={styles.actionButton}
//                     />
//                   </Stack>
//                 </Stack>
//               </Stack>
//             );
//           }}
//         />
//       )}
//     </Stack>
//   );
// };

// export default LinkedInFeed;