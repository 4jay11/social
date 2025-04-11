import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Stories.css";
import { assets } from "../images/assets"; // Ensure correct image import

const storiesData = [
    { id: 1, name: "Your Story", image: assets.profile8, bg: assets.story1 },
    { id: 2, name: "Friend 1", image: assets.profile8, bg: assets.story2 },
    { id: 3, name: "Friend 2", image: assets.profile8, bg: assets.story3 },
    { id: 4, name: "Friend 3", image: assets.profile8, bg: assets.story4 },
    { id: 5, name: "Friend 4", image: assets.profile8, bg: assets.story5 },
    { id: 6, name: "Friend 5", image: assets.profile8, bg: assets.story6 },
  ];

const Stories = () => {
  const navigate = useNavigate();

  const handleStoryView = (id) => {
    navigate(`/storyView/${id}`); // Navigate to StoryView with clicked story ID
  };

  return (
    <div className="stories">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        breakpoints={{
          620: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {storiesData.map((story) => (
          <SwiperSlide key={story.id}>
            <div
              className="story"
              onClick={() => handleStoryView(story.id)}
              style={{
                background: `url('${story.bg}') no-repeat center center/cover`,
              }}
            >
              <div className="profile-photo">
                <img src={story.image} alt={story.name} />
              </div>
              <p className="name">{story.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Stories;
