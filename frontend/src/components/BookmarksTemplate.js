import React from "react";
import "./Bookmarks.css";

const BookmarksTemplate = ({ bookmarkPhoto }) => {
  return (
    <div className="book-list">
      <div className="photo">
        <img src={process.env.REACT_APP_CLOUDINARY_LINK + bookmarkPhoto} alt="Bookmark" />
      </div>
    </div>
  );
};

export default BookmarksTemplate;
