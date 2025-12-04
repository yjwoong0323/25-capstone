import React, { useState } from "react";
import "../assets/styles/write.css";

export default function WriteParty() {
  const [count, setCount] = useState(1);

  const handleIncrease = () => setCount(count + 1);
  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className="write-container">
      <h2 className="board-title">팟 구하기</h2>
      <p className="board-sub">오늘의 관람메이트를 찾아보세요</p>

      <div className="party-write-box">
        <div className="party-write-row">
          <label className="party-label">공연 선택</label>
          <input
            type="text"
            className="party-input"
            placeholder="공연명을 입력하세요"
          />
        </div>

        <div className="party-write-row">
          <label className="party-label">날짜</label>
          <input type="date" className="party-input" />
        </div>

        <div className="party-write-row">
          <label className="party-label">모집 인원</label>
          <div className="party-count-box">
            <button onClick={handleDecrease} className="count-btn">
              -
            </button>
            <input type="text" value={count} readOnly className="count-display" />
            <button onClick={handleIncrease} className="count-btn">
              +
            </button>
          </div>
        </div>

        <div className="party-write-row">
          <label className="party-label">기타 사항</label>
          <textarea
            className="party-textarea"
            placeholder="간단한 소개나 메모를 입력하세요"
          />
        </div>
      </div>

      <button className="submit-btn">등록하기</button>
    </div>
  );
}
