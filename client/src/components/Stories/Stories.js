import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "./Stories.css";
import ShimmerStory from "../ShimmerUI/StoryShimmer";
import axios from "axios";

const Stories = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);

  const getStories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/story/getStories",
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setStories(response.data);
    } catch (err) {
      console.error("Error fetching Stories: " + err.message);
    }
  };

  useEffect(() => {
    getStories();
  }, []);

  const handleStoryView = (id) => {
    navigate(`/storyView/${id}`);
  };

  const uniqueUserStories = Object.values(
    stories.reduce((acc, story) => {
      const userId = story.userId._id;
      if (!acc[userId]) acc[userId] = story;
      return acc;
    }, {})
  );

  return (
    <div style={{ width: "36rem", height: "12rem" }}>
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
        {stories.length === 0
          ? Array.from({ length: 6 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ShimmerStory />
              </SwiperSlide>
            ))
          : uniqueUserStories.map((story) => (
              <SwiperSlide key={story._id}>
                <div className="stories">
                  <div
                    className="story"
                    onClick={() => handleStoryView(story.userId._id)}
                    style={{
                      background: `url('${story.image}') no-repeat center center/cover`,
                    }}
                  >
                    <div className="profile-pic">
                      <img
                        src={story.userId.profilePicture}
                        alt={story.userId.username}
                      />
                    </div>
                    <p className="name">{story.userId.username}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default Stories;
