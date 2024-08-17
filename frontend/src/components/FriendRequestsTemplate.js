import React from "react";
import { assets } from "./images/assets";
import FriendRequests from "./FriendRequests";

const FriendRequestsTemplate = () => {
  return (
    <div>
        <FriendRequests name="Gayu" profilePhoto={assets.profile1} />
    </div>
  );
};

export default FriendRequestsTemplate;
