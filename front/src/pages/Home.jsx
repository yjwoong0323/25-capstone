import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  // 📌 공연 ID를 받아 booking 페이지로 이동
  const goBooking = (id) => {
    navigate(`/booking/${id}`);
  };

  return (
    <div className="home-container">
      {/* ✅ 메인 포스터 */}
      <div className="poster-wrapper">
        <img
          src="/poster.jpg"
          alt="뮤지컬 포스터"
          className="poster-image"
          onClick={() => goBooking(1)}   // 고유 ID 1번 공연
        />
      </div>

      {/* ✅ 학부별 콘텐츠 섹션 */}
      <section className="content-section">
        <h2 className="section-title">학부별 콘텐츠</h2>

        {/* 🎭 문화예술학부 */}
        <div className="department">
          <h3 className="dept-title">문화예술학부</h3>
          <div className="poster-grid">

            <img
              src="/poster1.jpg"
              alt="빛, 나잖아"
              className="dept-poster"
              onClick={() => goBooking(101)} // 공연 ID 예시
            />

            <img
              src="/poster2.jpg"
              alt="To The Light"
              className="dept-poster"
              onClick={() => goBooking(102)}
            />

            <img
              src="/poster3.jpg"
              alt="도시"
              className="dept-poster"
              onClick={() => goBooking(103)}
            />

          </div>
        </div>

        {/* 🎨 디자인영상학부 */}
        <div className="department">
          <h3 className="dept-title">디자인영상학부</h3>
          <div className="poster-grid">
            <div className="poster-placeholder" onClick={() => goBooking(201)}></div>
            <div className="poster-placeholder" onClick={() => goBooking(202)}></div>
            <div className="poster-placeholder" onClick={() => goBooking(203)}></div>
          </div>
        </div>

        {/* 🏃‍♀️ 스포츠과학부 */}
        <div className="department">
          <h3 className="dept-title">스포츠과학부</h3>
          <div className="poster-grid">
            <div className="poster-placeholder" onClick={() => goBooking(301)}></div>
            <div className="poster-placeholder" onClick={() => goBooking(302)}></div>
            <div className="poster-placeholder" onClick={() => goBooking(303)}></div>
          </div>
        </div>

      </section>
    </div>
  );
}
