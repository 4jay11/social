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
import {useSelector} from "react-redux";

export default function StoryView() {
  const user = useSelector((state) => state.auth.user);
  const [stories, setStories] = useState([]);
  const [groupedPosts, setGroupedPosts] = useState({});
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams(); // id is userId from route params

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
                {groupedPosts[userId].map((story) => {
                  

                    // isLiked
                  let isLiked = story?.likes?.includes(user._id);
                  return(
                  <SwiperSlide key={story._id}>
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
                      {userId == user._id && (
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
                        {isLiked ? <FaHeart size={20} color="red" /> :<FaRegHeart size={20} color="black" />}
                      </button>
                    </div>
                  </SwiperSlide>)
                })}
              </Swiper>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
