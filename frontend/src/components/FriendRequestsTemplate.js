import React from "react";
import { assets } from "./images/assets";
import FriendRequests from "./FriendRequests";
import { users } from "../jsonData/data";

const FriendRequestsTemplate = ({currentUser}) => {
  const user = currentUser; // Access the first user's data
  const { followRequest, following } = user;

  return (
    <div className="friend-requests">
      <h4>Requests</h4>
      {followRequest.map((requestId, index) => {
        // Find the user who sent the follow request
        const requestUser = users.find(u => u.user_id === requestId);

        // Calculate mutual connections
        const mutualConnections = requestUser.following.filter(followingId => 
          following.includes(followingId)
        ).length;

        return (
          <FriendRequests
            key={index}
            name={requestUser.name} // Actual user name
            profilePhoto={requestUser.profile_image} // Actual profile photo
            mutual={mutualConnections} // Mutual connections count
          />
        );
      })}
    </div>
  );
};

export default FriendRequestsTemplate;
