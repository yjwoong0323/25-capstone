import React from "react";
import "../assets/styles/party.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function PartyBoard() {
  const navigate = useNavigate();
  const { user, sendNotification } = useUser(); 
  // ⭐ addNotification → sendNotification(userId, msg) 로 변경됨

  const sampleParties = [
    {
      id: 1,
      writerId: "user123",
      title: "같이 보실 분",
      date: "2025-11-15 (토) 19:00",
      members: "2 / 4",
      tags: "간단소개, 정보, 자유문구",
    },
    {
      id: 2,
      writerId: "user999",
      title: "볼새럼",
      date: "2025-11-18 (화) 18:30",
      members: "1 / 3",
      tags: "자유문구",
    },
    {
      id: 3,
      writerId: "user888",
      title: "같이 보실",
      date: "2025-11-20 (목) 20:00",
      members: "3 / 5",
      tags: "간단소개",
    },
  ];

  const handleJoin = (party) => {
    if (party.writerId === user.id) return; // 내가 쓴 글이면 무시

    const message = `📌 "${party.title}" 팟에 참여 요청이 들어왔습니다.`;
    sendNotification(party.writerId, message); // 🔥 글 작성자에게 알림 전송

    alert("참여 요청을 보냈습니다!");
  };

  return (
    <div className="board-container">
      <h2 className="board-title">팟 구하기</h2>
      <p className="board-sub">오늘의 관람메이트를 찾아보세요</p>

      <div className="board-top">
        <button className="write-btn" onClick={() => navigate("/party/write")}>
          작성하기
        </button>
      </div>

      <div className="party-list">
        {sampleParties.map((party) => (
          <div key={party.id} className="party-item">
            <div className="party-info">
              <h3 className="party-title">{party.title}</h3>
              <p className="party-content">
                📅 {party.date} &nbsp;&nbsp; 👥 {party.members}
              </p>
              <p className="party-tags">{party.tags}</p>
            </div>

            {party.writerId === user.id ? (
              <button className="join-btn disabled" disabled>
                내가 쓴 글
              </button>
            ) : (
              <button className="join-btn" onClick={() => handleJoin(party)}>
                참여하기
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
