import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper/modules";
import axios from "axios";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

export default function StoryView() {
  const user = useSelector((state) => state.auth.user);
  const [stories, setStories] = useState([]);
  const [groupedPosts, setGroupedPosts] = useState({});
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleStoryLike = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/story/like/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      
    } catch (err) {
      console.log(err.message);
    }
  };
  
  const handleStoryViewed = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/story/view/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Story Viewed Successfully");
      
    } catch (err) {
      console.log(err.message);
    }
  };

  const groupPostsByUserId = (posts) => {
    return posts.reduce((acc, post) => {
      const userId = post.userId._id;
      if (!acc[userId]) acc[userId] = [];
      acc[userId].push(post);
      return acc;
    }, {});
  };

  useEffect(() => {
    const getStories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/story/getStories", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setStories(res.data);
      } catch (err) {
        console.error("Error fetching Stories: " + err.message);
      }
    };
    getStories();
  }, []);

  useEffect(() => {
    if (stories.length > 0) {
      const grouped = groupPostsByUserId(stories);
      setGroupedPosts(grouped);
    }
  }, [stories]);

  useEffect(() => {
    if (swiperRef.current && id) {
      const userIds = Object.keys(groupedPosts);
      const index = userIds.indexOf(id);
      if (index !== -1) {
        swiperRef.current.slideTo(index, 0);
      }
    }
  }, [groupedPosts, id]);

  return (
    <div
      className="story-view-container"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
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
        }}
      >
        ×
      </button>

      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        loop={false}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        navigation
        modules={[EffectCoverflow, Navigation]}
        className="outer-swiper"
        style={{ width: "80%", height: "90%" }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          const userIds = Object.keys(groupedPosts);
          const initialIndex = userIds.indexOf(id);
          if (initialIndex !== -1) swiper.slideTo(initialIndex, 0);
        }}
        onSlideChange={(swiper) => {
          const userIds = Object.keys(groupedPosts);
          const newUserId = userIds[swiper.activeIndex];
          if (newUserId) {
            navigate(`/storyView/${newUserId}`);
          }
        }}
      >
        {Object.keys(groupedPosts).map((userId) => (
          <SwiperSlide key={userId}>
            <UserCard
              userId={userId}
              stories={groupedPosts[userId]}
              currentUser={user}
              navigate={navigate}
              handleStoryLike={handleStoryLike}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
