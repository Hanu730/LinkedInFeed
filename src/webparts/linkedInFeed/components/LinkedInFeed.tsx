// import * as React from 'react';
// import styles from './LinkedInFeed.module.scss';
// import type { ILinkedInFeedProps } from './ILinkedInFeedProps';
// //import LinkedInFeed1 from './ComponentFeed'
// import { escape } from '@microsoft/sp-lodash-subset';

// export default class LinkedInFeed extends React.Component<ILinkedInFeedProps> {
//   public render(): React.ReactElement<ILinkedInFeedProps> {
//     const {
//       description,
//       isDarkTheme,
//       environmentMessage,
//       hasTeamsContext,
//       userDisplayName
//     } = this.props;

//     return (
//       <section className={`${styles.linkedInFeed} ${hasTeamsContext ? styles.teams : ''}`}>
//         <div className={styles.welcome}>
//           <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
//           <h2>Well done, {escape(userDisplayName)}!</h2>
//           <div>{environmentMessage}</div>
//           <div>Web part property value: <strong>{escape(description)}</strong></div>
//         </div>
          
//       </section>
//     );
//   }
// }
