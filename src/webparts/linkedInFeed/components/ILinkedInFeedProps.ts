export interface ILinkedInFeedProps {
  accessToken: string;

}

export interface LinkedInPost {
  specificContent: {
      "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
              text: string;
          };
      };
  };
}

export interface ILinkedInFeedProps1 {
  accessToken: string;
}