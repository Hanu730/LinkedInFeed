import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
interface LinkedInPost {
    specificContent: {
        "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
                text: string;
            };
        };
    };
}
const LinkedInFeed1 = () => {
    const [posts, setPosts] = useState<LinkedInPost[]>([]);

    useEffect(() => {
        const fetchLinkedInFeed = async () => {
            try {
                const response = await axios.get(
                    "https://api.linkedin.com/v2/ugcPosts?q=authors&authors=urn:li:organization:108904",
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.REACT_APP_LINKEDIN_ACCESS_TOKEN}`,
                            "X-Restli-Protocol-Version": "2.0.0"
                        },
                    }
                );
                setPosts(response.data.elements);
            } catch (error) {
                console.error("Error fetching LinkedIn posts", error);
            }
        };

        fetchLinkedInFeed();
    }, []);

    return (
        <div>
            <h2>LinkedIn Feed</h2>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>{post.specificContent["com.linkedin.ugc.ShareContent"].shareCommentary.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default LinkedInFeed1;
