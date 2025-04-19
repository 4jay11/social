import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import StoryCard from "./StoryCard";

export default function UserCard({
  userId,
  stories,
  currentUser,
  navigate,
  handleStoryLike,
}) {
  return (
    <div
      onClick={() => navigate(`/storyView/${userId}`)}
      className="story-card"
      style={{
        borderRadius: "32px",
        overflow: "hidden",
        boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
        height: "100%",
        width: "100%",
        backgroundColor: "#000",
        cursor: "pointer",
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop
        navigation
        modules={[Navigation]}
        style={{ width: "100%", height: "100%" }}
      >
        {stories.map((story) => (
          <SwiperSlide key={story._id}>
            <StoryCard
              story={story}
              currentUser={currentUser}
              userId={userId}
              handleStoryLike={handleStoryLike}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
