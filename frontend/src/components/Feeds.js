import React from 'react';
import { assets } from './images/assets';
import FeedTemplate from './FeedTemplate';

const Feeds = () => {
  return (
    <div className="feeds">
      <FeedTemplate
        profilePhoto={assets.profile8}
        username="Lana Rose"
        location="Dubai"
        timeAgo="15 minutes ago"
        feedPhoto={assets.feed1}
        likedBy={[
          assets.profile6 ,
          assets.profile7 ,
          assets.profile8 ,
        ]}
        likesCount={411}
        caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel semper justo neque non ligula."
        commentsCount={244}
      />
      <FeedTemplate
        profilePhoto={assets.profile6}
        username="Nick Jonas"
        location="India"
        timeAgo="20 minutes ago"
        feedPhoto={assets.feed1}
        likedBy={[
          assets.profile6 ,
          assets.profile7 ,
          assets.profile8 ,
        ]}
        likesCount={411}
        caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel semper justo neque non ligula."
        commentsCount={244}
      />
    </div>
  );
};

export default Feeds;
