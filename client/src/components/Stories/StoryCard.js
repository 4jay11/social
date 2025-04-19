import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

export default function StoryCard({
  story,
  currentUser,
  userId,
  handleStoryLike,
}) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(story?.likes?.includes(currentUser._id));
  }, [story?.likes, currentUser._id]);

  return (
    <div
      style={{
        background: `url('${story.image}') no-repeat center center/cover`,
        height: "100%",
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userId === currentUser._id && (
        <button
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BsThreeDots size={20} />
        </button>
      )}

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid white",
        }}
      >
        <img
          src={story.userId.profilePicture}
          alt={story.userId.username}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <p
        style={{
          position: "absolute",
          top: "30px",
          left: "80px",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
          background: "rgba(0, 0, 0, 0.5)",
          padding: "5px 10px",
          borderRadius: "5px",
        }}
      >
        {story.userId.username}
      </p>

      <p
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
          background: "rgba(0, 0, 0, 0.5)",
          padding: "5px 10px",
          borderRadius: "5px",
          maxWidth: "80%",
          textAlign: "center",
        }}
      >
        {story.content}
      </p>

      <button
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          background: "rgba(255, 255, 255, 0.9)",
          color: "red",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        {isLiked ? (
          <FaHeart
            size={20}
            color="red"
            onClick={() => {
              handleStoryLike(story?._id);
              setIsLiked(!isLiked);
              //console.log(story?._id);
            }}
          />
        ) : (
          <FaRegHeart
            onClick={() => {
              handleStoryLike(story?._id);
              setIsLiked(!isLiked);
              //console.log(story?._id);
            }}
            size={20}
            color="black"
          />
        )}
      </button>
    </div>
  );
}
