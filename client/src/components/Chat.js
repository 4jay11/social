import { useEffect, useState, useRef } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Chat.css";
import Message from "./Message";
import StickySidebar from "./Sidebar/StickySidebar";
import { useNavigate, useParams } from "react-router-dom";
const Chat = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  const navigate = useNavigate();
  const { targetUserId } = useParams();
  console.log("Chat user id:", targetUserId);

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
  const [showMenu, setShowMenu] = useState(false);

  const handleClearChat = () => {
    console.log("Chat cleared!");
    setShowMenu(false);
  };

  //  console.log(activeFriend);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handledelete = async (id) => {
    const deleteForEveryone = selectedLeft.length === 0;

    try {
      const response = await axios.delete(`${BASE_URL}/deleteChats/${id}`, {
        withCredentials: true,
        data: {
          messageIds: [...selectedLeft, ...selectedRight],
          deleteForEveryone,
        },
      });

      console.log("Delete response:", response.data);

      // Just remove from local state without re-fetching all messages
      setMessages((prevMessages) =>
        prevMessages.filter(
          (msg) => ![...selectedLeft, ...selectedRight].includes(msg.id)
        )
      );

      setSelectedLeft([]);
      setSelectedRight([]);
    } catch (error) {
      console.error("Error deleting chats:", error);
    }
  };

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
      const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chat = res.data;

      const chatMessages = chat?.messages.map((msg) => ({
        id: msg._id,
        side: msg.senderId?._id === userId ? "msg-right" : "msg-left",
        text: msg.text,
        timestamp: msg.createdAt,
        username: msg.senderId?.username,
      }));

      setMessages(chatMessages);

      return chat;
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages([]);
      return null;
    }
  };

  useEffect(() => {
    fetchChatMembers();
  }, [reloadChatMembers]);

  useEffect(() => {
    const handleChat = async () => {
      if (targetUserId && chatMembers.length >= 0) {
        const friend = chatMembers.find(
          (member) => member._id === targetUserId
        );

        if (friend) {
          setActiveFriend(friend);
          fetchChatMessages(friend._id);
        } else {
          const chat = await fetchChatMessages(targetUserId);

          // Extract the participant
          const otherUser = chat?.participants?.find(
            (user) => user._id !== userId
          );

          if (otherUser) {
            setChatMembers((prev) => [...prev, otherUser]);
            setActiveFriend(otherUser);
          }
        }
      }
    };

    handleChat();
  }, [targetUserId, chatMembers]);

  useEffect(() => {
    if (!userId || !activeFriend?._id) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      username: user.username,
      userId,
      targetUserId: activeFriend._id,
    });

    socket.on("messageReceived", ({ _id, username, text, timestamp }) => {
      const side = username === user.username ? "msg-right" : "msg-left";
      setMessages((prev) => [
        ...prev,
        { id: _id, side, text, timestamp, username },
      ]);
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
      socket.disconnect(); // ✅ Clean up on unmount or re-run
    };
  }, [userId, activeFriend?._id]);

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

  const filteredFriends = chatMembers.filter(
    (f) =>
      f &&
      f.username &&
      f.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="chat-wrapper">
        <div
          className="-sidebar"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            padding: "1rem 0.5rem",
            width: "100px",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 10,
            backgroundColor: "hsl(252, 30%, 95%)",
          }}
        >
          <div className="bookmark">
            <div className="left">
              <StickySidebar />
            </div>
          </div>
        </div>
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
                targetUserId === friend._id ? "active" : ""
              }`}
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

        <div className="chat-main">
          <div className="chat-header">
            <p> {activeFriend?.username || "Select a friend"}</p>
            {checkboxVisible && (
              <button onClick={() => handledelete(activeFriend._id)}>
                Delete
              </button>
            )}
            <FaCheckCircle />
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <BsThreeDotsVertical
                onClick={() => setShowMenu((prev) => !prev)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "10px",
                  cursor: "pointer",
                  color: "#555",
                  fontSize: "20px",
                }}
              />
              {showMenu && (
                <div
                  style={{
                    position: "absolute",
                    width: "125px",
                    top: "35px",
                    right: "10px",
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
                    zIndex: 10,
                  }}
                >
                  <div
                    onClick={handleClearChat}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      color: "#e63946",
                      whiteSpace: "nowrap",
                    }}
                  >
                    
                      Clear Chat
                
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="chat-messages">
            <div className="messages-wrapper">
              {messages.map((msg) => (
                <Message
                  key={msg.id}
                  id={msg.id}
                  side={msg.side}
                  text={msg.text}
                  msgusername={msg.username}
                  username={user.username}
                  timestamp={msg.timestamp}
                  isSelected={
                    msg.side === "msg-left"
                      ? selectedLeft.includes(msg.id)
                      : selectedRight.includes(msg.id)
                  }
                  checkboxVisible={checkboxVisible}
                  onSelectToggle={handleSelectToggle}
                />
              ))}
              {isFriendTyping && (
                <div className="typing-indicator">
                  {activeFriend?.username} is typing...
                </div>
              )}
            </div>
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
    </>
  );
};

export default Chat;