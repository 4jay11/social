import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./StoryView.css";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { assets } from "../images/assets";
import axios from "axios";
export default function StoryView() {
  const [stories, setStories] = useState([]);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const storiesData = [
    { id: 1, name: "Your Story", image: assets.profile8, bg: assets.story1 },
    { id: 2, name: "Friend 1", image: assets.profile8, bg: assets.story2 },
    { id: 3, name: "Friend 2", image: assets.profile8, bg: assets.story3 },
    { id: 4, name: "Friend 3", image: assets.profile8, bg: assets.story4 },
    { id: 5, name: "Friend 4", image: assets.profile8, bg: assets.story5 },
    { id: 6, name: "Friend 5", image: assets.profile8, bg: assets.story6 },
  ];

  const initialIndex = stories.findIndex((story) => story._id === id);

  const getStories = async () => {
    try {
      const getStories = await axios.get(
        "http://localhost:8000/story/getStories",
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setStories(getStories.data);
      console.log(getStories.data);
    } catch (err) {
      console.error("Error fetching Stories" + err.message);
    }
  };
  useEffect(() => {
    getStories();
  }, []);

  useEffect(() => {
    if (swiperRef.current && initialIndex >= 0) {
      swiperRef.current.slideTo(initialIndex, 0);
    }

    // Add popstate listener for browser back button
    const handlePopState = () => {
      navigate("/feed", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    // Push current state so back button works
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [id, initialIndex, navigate]);

  const handleSlideClick = (index) => {
    const newStoryId = stories[index]?._id;

    if (newStoryId) {
      navigate(`/storyView/${newStoryId}`);
      if (swiperRef.current) {
        swiperRef.current.slideTo(index);
      }
    }
  };

  return (
    <div className="story-view">
      <div className="story-container">
        {/* Back to Feed Button (Top-Left) */}
        <button
          onClick={() => navigate("/feed")}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            cursor: "pointer",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          ×
        </button>

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={false}
          slidesPerView={3}
          initialSlide={initialIndex !== -1 ? initialIndex : 0}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="mySwiper"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            const newIndex = swiper.activeIndex;
            if (newIndex >= 0 && newIndex < stories.length) {
              const newStoryId = stories[newIndex]?._id;
              navigate(`/storyView/${newStoryId}`);
            }
          }}
        >
          {stories.map((story, index) => (
            <SwiperSlide
              key={story._id}
              onClick={() => handleSlideClick(index)}
            >
              <div
                style={{
                  background: `url('${story.image}') no-repeat center center/cover`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  width: "80%",
                  height: "100%",
                  borderRadius: "32px",
                }}
              >
                {/* Three Dots */}
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

                {/* Profile Image */}
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
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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

                {/* Profile Name */}
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
                    width: "max-content",
                  }}
                >
                  {story.userId.username}
                </p>

                {/* Quotes (Bottom-Center) */}
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
                  }}
                >
                  {story.content}
                </p>

                {/* Like Button */}
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
                  <FaHeart size={20} />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
