import React from "react";
import MessageTemplate from "./MessageTemplate";
import { assets } from "../images/assets";
import './Message.css'
const Messages = ({ profilePhoto, name, messageText, isActive }) => {
  return (
    <div className="messages">
      <div className="heading">
        <h4>
          Messages <i className="uil uil-edit"></i>
        </h4>
      </div>
      {/* Search Bar */}
      <div className="search-bar">
        <i className="uil uil-search"></i>
        <input
          type="search"
          placeholder="Search Messages"
          id="message-search"
        />
      </div>
      {/* Messages categories */}
      <div className="category">
        <h6 className="active">Primary</h6>
        <h6>General</h6>
        <h6 className="message-requests">Request(7)</h6>
      </div>
      {/* Add message items */}
      <MessageTemplate
        profilePhoto={assets.profile6}
        name="Bradley Hunter"
        messageText="Happy to see you"
        isActive={true}
      />
      <MessageTemplate
        profilePhoto={assets.profile6}
        name="Bradley Hunter"
        messageText="Happy to see you"
        isActive={true}
      />
      </div>
   
  );
};

export default Messages;
