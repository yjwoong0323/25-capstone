import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/mypage.css";
import { useUser } from "../context/UserContext";

export default function MyPage() {
    const { user, updateUser, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (logout) {
            logout();
            alert("로그아웃 되었습니다.");
            navigate('/');
        }
    };

    if (!user) return null;

    const tickets = user.tickets || [];

    return (
        <div className="mypage-container">

            {/* ================================ 프로필 영역 ================================ */}
            <div className="mypage-profile-center">
                <div className="mypage-profile-img">
                    {user.profileImage && <img src={user.profileImage} alt="profile" />}
                </div>

                <h2 className="mypage-nickname">{user.nickname}</h2>

                {user.name && <p className="mypage-realname">{user.name}</p>}
                <p className="mypage-email">{user.email}</p>

                <Link to="/mypage/edit">
                    <button className="mypage-edit-btn">정보 수정</button>
                </Link>
            </div>

            {/* ================================ 학부생 인증 ================================ */}
            <div className="mypage-verify-card">
                <div className="verify-row">
                    <span className="verify-label">학부생 인증</span>
                    <span className={`verify-dot ${user.verified ? "green" : "red"}`}></span>
                </div>

                {/* 인증된 경우 → 학번 / 전공만 출력 */}
                {user.verified && (
                    <>
                        <p className="verify-info">학번 : {user.studentId}</p>
                        <p className="verify-info">전공 : {user.major}</p>
                    </>
                )}

                {/* 인증되지 않은 경우 → 인증하기 버튼만 표시 */}
                {!user.verified && (
                    <button className="verify-btn" onClick={() => updateUser({ verified: true })}>
                        인증하기
                    </button>
                )}
            </div>

            <hr className="mypage-divider" />

            {/* ================================ 알림 목록 ================================ */}
            {user.notifications.length > 0 && (
                <>
                    <h2 className="mypage-section-title">알림</h2>
                    <div className="mypage-notification-list">
                        {user.notifications.map((n) => (
                            <div key={n.id} className="notification-item">
                                <span className="notification-dot"></span>
                                <p className="notification-text">{n.message}</p>
                            </div>
                        ))}
                    </div>
                    <hr className="mypage-divider" />
                </>
            )}

            {/* ================================ 예매 내역 ================================ */}
            <h2 className="mypage-section-title">예매 내역</h2>

            {tickets.length === 0 ? (
                <p className="no-ticket-text">예매 내역이 없습니다.</p>
            ) : (
                tickets.map((t) => (
                    <div key={t.id} className="mypage-ticket-box">
                        <div className="ticket-thumb"></div>
                        <div className="ticket-info">
                            <h3 className="ticket-title">{t.title}</h3>
                            <p className="ticket-place">{t.place}</p>
                            <p className="ticket-date">{t.date} {t.time}</p>
                            <p className="ticket-people">{t.people}명</p>
                        </div>
                    </div>
                ))
            )}

            <hr className="mypage-divider" />

            {/* ================================ 계정 및 지원 ================================ */}
            <h2 className="mypage-section-title">계정 및 지원</h2>
            <div className="mypage-actions">

                <Link to="/support" className="action-link">
                    <button className="mypage-action-btn">
                        고객센터 / 문의
                    </button>
                </Link>

                <button
                    className="mypage-action-btn logout-btn"
                    onClick={handleLogout}
                >
                    로그아웃
                </button>
            </div>

        </div>
    );
}
