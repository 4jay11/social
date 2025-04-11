import { useState } from "react";
import "./MessagePage.css";

const initialChats = [
  {
    id: 1,
    username: "alex_john",
    image: "https://i.pravatar.cc/40?img=1",
    isFollowing: true,
    lastMessage: "Hey there!",
  },
  {
    id: 2,
    username: "not_following_guy",
    image: "https://i.pravatar.cc/40?img=2",
    isFollowing: false,
    lastMessage: "Request to message",
  },
];

export const MessagePage = () => {
  const [activeTab, setActiveTab] = useState("Messages");
  const [selectedChat, setSelectedChat] = useState(initialChats[0]);
  const [chatList, setChatList] = useState(initialChats);
  const [messages, setMessages] = useState([
    { id: 1, from: "me", text: "Hello!", chatId: 1 },
    { id: 2, from: "other", text: "Hey, how are you?", chatId: 1 },
    { id: 3, from: "me", text: "Great, thanks!", chatId: 1 },
    { id: 4, from: "other", text: "Awesome!", chatId: 1 },
    { id: 1, from: "me", text: "Hello!", chatId: 1 },
    { id: 2, from: "other", text: "Hey, how are you?", chatId: 1 },
    { id: 3, from: "me", text: "Great, thanks!", chatId: 1 },
    { id: 4, from: "other", text: "Awesome!", chatId: 1 },
    { id: 1, from: "me", text: "Hello!", chatId: 1 },
    { id: 2, from: "other", text: "Hey, how are you?", chatId: 1 },
    { id: 3, from: "me", text: "Great, thanks!", chatId: 1 },
    { id: 4, from: "other", text: "Awesome!", chatId: 1 },
    { id: 1, from: "me", text: "Hello!", chatId: 1 },
    { id: 2, from: "other", text: "Hey, how are you?", chatId: 1 },
    { id: 3, from: "me", text: "Great, thanks!", chatId: 1 },
    { id: 4, from: "other", text: "Awesome!", chatId: 1 },
  ]);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chatList
    .filter((chat) =>
      activeTab === "Messages" ? chat.isFollowing : !chat.isFollowing
    )
    .filter((chat) =>
      chat.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const selectedMessages = messages.filter(
    (msg) => msg.chatId === selectedChat.id
  );

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      from: "me",
      text: inputText,
      chatId: selectedChat.id,
    };

    setMessages((prev) => [...prev, newMessage]);

    setChatList((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id ? { ...chat, lastMessage: inputText } : chat
      )
    );

    setInputText("");
  };

  return (
    <div className="message-page">
      {/* Left Panel */}
      <div className="chat-list">
        <div className="chat-tabs">
          {["Messages", "Requests"].map((tab) => (
            <button
              key={tab}
              className={`chat-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <input
          type="text"
          className="chat-search"
          placeholder="Search people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="chat-users">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-user ${
                selectedChat.id === chat.id ? "active-chat" : ""
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <img src={chat.image} alt="avatar" className="chat-avatar" />
              <div>
                <div className="chat-username">{chat.username}</div>
                <div className="chat-last-message">{chat.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="chat-window">
        <div className="chat-header">
          <img
            src={selectedChat?.image}
            alt="avatar"
            className="chat-header-avatar"
          />
          <h2 className="chat-header-name">{selectedChat?.username}</h2>
        </div>

        <div className="chat-messages">
          {[...selectedMessages].reverse().map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.from === "me" ? "right" : "left"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="chat-send" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
