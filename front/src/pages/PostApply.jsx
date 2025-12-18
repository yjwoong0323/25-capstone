import React, { useState } from "react";
import "../assets/styles/post-apply.css";

export default function PostApply() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState(null);
  const [period, setPeriod] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [host, setHost] = useState("");
  const [contact, setContact] = useState("");

  // 포스터 업로드
  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageURL = URL.createObjectURL(file);
    setPoster(imageURL);
  };

  // 신청하기
  const handleSubmit = () => {
    if (!poster || !title || !period || !place) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    alert("포스팅 신청이 접수되었습니다. 관리자 검토 후 반영됩니다.");
  };

  return (
    <div className="post-apply-container">

      <h2 className="apply-title">포스팅 신청</h2>

      <div className="apply-box">

        {/* 포스터 업로드 */}
        <label className="apply-poster-upload">
          {poster ? (
            <img src={poster} alt="poster" className="poster-preview" />
          ) : (
            <span>공연 포스터 업로드</span>
          )}
          <input type="file" accept="image/*" onChange={handlePosterUpload} />
        </label>

        {/* 입력 폼 */}
        <div className="apply-input-group">
          <label>공연 제목 *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="apply-input"
            placeholder="예) 2025 정기공연 '백석대학교'"
          />
        </div>

        <div className="apply-input-group">
          <label>공연 기간 *</label>
          <input
            type="text"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="apply-input"
            placeholder="예) 2025.03.01 ~ 2025.03.05"
          />
        </div>

        <div className="apply-input-group">
          <label>공연 장소 *</label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="apply-input"
            placeholder="예) 백석 아트홀"
          />
        </div>

        <div className="apply-input-group">
          <label>공연 소개</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="apply-textarea"
            placeholder="공연에 대한 간단한 설명을 적어주세요."
          ></textarea>
        </div>

        <div className="apply-input-group">
          <label>주최자명</label>
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="apply-input"
            placeholder="예) 백석대학교 ○○전공"
          />
        </div>

        <div className="apply-input-group">
          <label>연락처</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="apply-input"
            placeholder="예) 010-1234-5678"
          />
        </div>

        <button className="apply-submit-btn" onClick={handleSubmit}>
          신청하기
        </button>

      </div>
    </div>
  );
}
