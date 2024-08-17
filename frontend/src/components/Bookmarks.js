import React from "react";

import "./Bookmarks.css";
import BookmarksTemplate from "./BookmarksTemplate";
import { assets } from "./images/assets";

const Bookmarks = () => {
  return (
    <div className="book">     
        <h1 className="bookmarks">Bookmarks</h1>
        <div className="bookmark">
        <BookmarksTemplate bookmarkPhoto={assets.feed1}/>
        <BookmarksTemplate bookmarkPhoto={assets.feed1}/>
        <BookmarksTemplate bookmarkPhoto={assets.feed1}/>
        <BookmarksTemplate bookmarkPhoto={assets.feed1}/>
        
        </div>
      </div>
    
  );
};

export default Bookmarks;
