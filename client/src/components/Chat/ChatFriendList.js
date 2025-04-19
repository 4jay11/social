import React from "react";
import { useNavigate } from "react-router-dom";

const ChatFriendsList = ({
  filteredFriends,
  targetUserId,
  setActiveFriend,
  setMessages,
  setSelectedLeft,
  setSelectedRight,
  setCheckboxVisible,
  setSearchQuery,
}) => {
  const navigate = useNavigate();

  return (
    <div className="chat-sidebar">
      <input
        type="text"
        placeholder="Search friends..."
        className="chat-search"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredFriends.map((friend) => (
        <div
          key={friend._id}
          className={`friend ${targetUserId === friend._id ? "active" : ""}`}
          onClick={() => {
            setActiveFriend(friend);
            setMessages([]);
            setSelectedLeft([]);
            setSelectedRight([]);
            setCheckboxVisible(false);
            navigate(`/chat/${friend._id}`);
          }}
        >
          {friend.username}
        </div>
      ))}
    </div>
  );
};

export default ChatFriendsList;
