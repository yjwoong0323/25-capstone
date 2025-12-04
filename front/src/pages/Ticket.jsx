import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../assets/styles/ticket.css";

export default function Ticket() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Booking 페이지에서 전달된 데이터
  const { title, place, date, time, people } = location.state || {};

  // 🔥 티켓 정보 저장 (예매 내역 등록)
  useEffect(() => {
    // location.state가 없으면(새로고침 시) 저장 안 함
    if (!location.state) return;

    const newTicket = {
      id: ticketId,
      title,
      place,
      date,
      time,
      people,
      poster: "/poster1.jpg", // 공연 포스터 필요 시 사용
      savedAt: new Date().toISOString(), // 저장 일시 (정렬 용)
    };

    // 기존 저장된 예매 내역 불러오기
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];

    // 🔥 중복 저장 방지 — 같은 티켓ID가 이미 저장되어 있으면 skip
    const exists = storedTickets.some((t) => t.id === ticketId);
    if (!exists) {
      const updatedTickets = [...storedTickets, newTicket];
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    }
  }, [ticketId, title, place, date, time, people, location.state]);

  return (
    <div className="ticket-container">
      <div className="ticket-card">
        <h2 className="ticket-title">예매 완료</h2>

        <div className="ticket-section">
          <p className="ticket-label">공연명</p>
          <p className="ticket-value">{title}</p>

          <p className="ticket-label">장소</p>
          <p className="ticket-value">{place}</p>

          <p className="ticket-label">날짜</p>
          <p className="ticket-value">{date}</p>

          <p className="ticket-label">회차</p>
          <p className="ticket-value">{time}</p>

          <p className="ticket-label">인원</p>
          <p className="ticket-value">{people}명</p>
        </div>

        <div className="ticket-divider">
          <span className="ticket-hole left-hole"></span>
          <hr className="ticket-dashed" />
          <span className="ticket-hole right-hole"></span>
        </div>

        <p className="ticket-id">TICKET #{ticketId}</p>

        <button className="ticket-btn" onClick={() => navigate("/")}>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
