import { useEffect, useState, useRef } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FaCheckCircle } from "react-icons/fa";
import "./Chat.css";

import Messages from "./Messages";
const Chat = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [isFriendTyping, setIsFriendTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFriend, setActiveFriend] = useState(null);
  const [chatMembers, setChatMembers] = useState([]);
  const [reloadChatMembers, setReloadChatMembers] = useState(false);
  const [selectedLeft, setSelectedLeft] = useState([]);
  const [selectedRight, setSelectedRight] = useState([]);
  const [checkboxVisible, setCheckboxVisible] = useState(false);

  const handleSelectToggle = (id, side) => {
    setCheckboxVisible(true);
    const updater = side === "msg-left" ? setSelectedLeft : setSelectedRight;
    const selectedArray = side === "msg-left" ? selectedLeft : selectedRight;
    const updated = selectedArray.includes(id)
      ? selectedArray.filter((item) => item !== id)
      : [...selectedArray, id];
    updater(updated);
  };

  useEffect(() => {
    if (selectedLeft.length === 0 && selectedRight.length === 0) {
      setCheckboxVisible(false);
    }
  }, [selectedLeft, selectedRight]);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const fetchChatMembers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/chat/members`, {
        withCredentials: true,
      });
      setChatMembers(response.data);
    } catch (error) {
      console.error("Failed to fetch chat members:", error);
      setChatMembers([]);
    }
  };

  const fetchChatMessages = async (targetUserId) => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      const chatMessages = chat?.data?.messages.map((msg) => ({
        username: msg.senderId?.username,
        text: msg.text,
        timestamp: msg.createdAt,
      }));
      setMessages(chatMessages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchChatMembers();
  }, [reloadChatMembers]);

  useEffect(() => {
    if (activeFriend?._id) {
      fetchChatMessages(activeFriend._id);
    }
  }, [activeFriend]);

  useEffect(() => {
    if (!userId || !activeFriend?._id) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      username: user.username,
      userId,
      targetUserId: activeFriend._id,
    });

    socket.on("messageReceived", ({ username, text, timestamp }) => {
      setMessages((prev) => [...prev, { username, text, timestamp }]);
    });

    socket.on("typing", () => {
      setIsFriendTyping(true);
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(
        () => setIsFriendTyping(false),
        2000
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, activeFriend]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const timestamp = new Date().toISOString();

    socketRef.current?.emit("sendMessage", {
      username: user.username,
      userId,
      targetUserId: activeFriend._id,
      text: newMessage,
      timestamp,
    });

    setNewMessage("");
    setTyping(false);
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      socketRef.current?.emit("typing", {
        userId,
        targetUserId: activeFriend._id,
      });
    }
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setTyping(false), 1000);
  };

  const filteredFriends = chatMembers.filter((f) =>
    f.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-wrapper">
      <div className="chat-sidebar">
        <input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="chat-search"
        />
        {filteredFriends.map((friend) => (
          <div
            key={friend._id}
            className={`friend ${
              activeFriend?._id === friend._id ? "active" : ""
            }`}
            onClick={() => setActiveFriend(friend)}
          >
            {friend.username}
          </div>
        ))}
      </div>

      <div className="chat-main">
        <div className="chat-header">
          {activeFriend?.username || "Select a friend"}
        </div>
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div style={{ color: "#888" }}>No messages yet</div>
          ) : (
              messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${
                  msg.username === user?.username ? "chat-right" : "chat-left"
                }`}
              >
                {msg.username !== user.username && (
                  <div className="sender-name">{msg.username}</div>
                )}
                <div>{msg.text}</div>
                <div className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))
          )}
          {isFriendTyping && (
            <div className="typing-indicator">
              {activeFriend?.username} is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-area">
          <input
            value={newMessage}
            onChange={handleTyping}
            className="chat-input"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="chat-send-btn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};


