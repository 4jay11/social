import React, { useEffect, useState } from "react";
import axios from "axios";
import FriendRequests from "./FriendRequests";
import "./FriendRequest.css";
const FriendRequestsTemplate = ({ currentUser }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser?._id) return;

    const fetchFriendRequests = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/connection/all-requests/",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        setFriendRequests(data || []);
      } catch (err) {
        console.error("Error fetching friend requests:", err);
        setError(
          err.response?.data?.error || "Failed to load friend requests."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFriendRequests();
  }, [friendRequests]);

  // Function to remove request from state after action
  const handleRequestAction = (id) => {
    setFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request.senderId._id !== id)
    );
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="friend-requests">
      <h4>Requests</h4>
      {friendRequests.length === 0 ? (
        <p>No friend requests</p>
      ) : (
        friendRequests.map((request) => {
          if (!request.senderId) return null;

          const mutualConnections =
            request.senderId.following?.filter((id) =>
              currentUser.following.includes(id)
            ).length || 0;

          return (
            <FriendRequests
              key={request._id}
              requestid={request._id}
              userid = { request.senderId._id}
              username={request.senderId.username}
              profilePhoto={request.senderId.profilePicture}
              mutual={mutualConnections}
              onRequestHandled={handleRequestAction} // Pass handler function
            />
          );
        })
      )}
    </div>
  );
};

export default FriendRequestsTemplate;
