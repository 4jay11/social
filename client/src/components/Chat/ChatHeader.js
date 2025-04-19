import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatHeader = ({
  activeFriend,
  checkboxVisible,
  handledelete,
  showMenu,
  setShowMenu,
  handleClearChat,
}) => (
  <div
    className="chat-header"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 16px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#f9f9f9",
    }}
  >
    {/* Left - Name + Verified Icon */}
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <p style={{ margin: 0, fontWeight: 600 }}>
        {activeFriend?.username || "Select a friend"}
      </p>
      <FaCheckCircle style={{ color: "#4caf50", fontSize: "16px" }} />
    </div>

    {/* Right - Delete Button + Three Dots + Dropdown */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        position: "relative",
      }}
    >
      {checkboxVisible && (
        <button
          onClick={() => handledelete(activeFriend._id)}
          style={{
            padding: "4px 10px",
            backgroundColor: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      )}

      <BsThreeDotsVertical
        onClick={() => setShowMenu((prev) => !prev)}
        style={{
          cursor: "pointer",
          color: "#555",
          fontSize: "20px",
        }}
      />

      {showMenu && (
        <div
          style={{
            position: "absolute",
            top: "30px",
            right: 0,
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
);

export default ChatHeader;
