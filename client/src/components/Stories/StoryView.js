import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./StoryView.css";

// Import required modules from Swiper v9+
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { assets } from "../images/assets";

export default function StoryView() {
  const swiperRef = useRef(null); // Reference to Swiper instance
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

  // Get initial index from URL params
  const initialIndex = storiesData.findIndex(
    (story) => story.id === Number(id)
  );

  useEffect(() => {
    if (swiperRef.current && initialIndex >= 0) {
      swiperRef.current.slideTo(initialIndex, 0);
    }
  }, [id, initialIndex]);

  // Function to handle clicking on an image
  const handleSlideClick = (index) => {
    const newStoryId = storiesData[index]?.id;
    if (newStoryId) {
      navigate(`/storyView/${newStoryId}`); // Update route on slide click
      if (swiperRef.current) {
        swiperRef.current.slideTo(index); // Move clicked image to center
      }
    }
  };

  return (
    <div className="story-view">
      <div className="story-container">
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
            if (newIndex < storiesData.length) {
              const newStoryId = storiesData[newIndex]?.id;
              navigate(`/storyView/${newStoryId}`); // Update URL on slide change
            }
          }}
        >
          {storiesData.map((story, index) => (
            <SwiperSlide key={story.id} onClick={() => handleSlideClick(index)}>
              <div
                style={{
                  background: `url('${story.bg}') no-repeat center center/cover`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  width: "80%",
                  height: "100%",
                  borderRadius: "32px",
                }}
              >
                {/* More Options (Three Dots) Button (Top-Right) */}
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
                    transition: "0.2s ease-in-out",
                  }}
                >
                  <BsThreeDots size={20} />
                </button>

                {/* Profile Photo (Top-Left) */}
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
                    src={story.image}
                    alt={story.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Profile Name (Right Side of Profile Photo) */}
                <p
                  style={{
                    position: "absolute",
                    top: "30px", // Align with profile image
                    left: "80px", // Positioned right next to the profile image
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "bold",
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    width: "max-content", // Prevent unnecessary stretching
                  }}
                >
                  {story.name}
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
                  {story.name}
                </p>

                {/* Like Button (Bottom-Right) */}
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
                    transition: "0.2s ease-in-out",
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
