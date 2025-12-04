import React from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import "../assets/styles/mypage.css";
import { useUser } from "../context/UserContext";

export default function MyPage() {
    // user, updateUser 외에 logout 함수도 가져옵니다.
    const { user, updateUser, logout } = useUser();
    const navigate = useNavigate();

    // 로그아웃 처리 함수 (Header.tsx에서 사용된 로직과 동일)
    const handleLogout = () => {
        if (logout) {
            logout(); // UserContext의 로그아웃 함수 호출
            alert("로그아웃 되었습니다.");
            navigate('/'); // 로그아웃 후 홈 페이지로 이동
        }
    };

    if (!user) return null;

    // user 객체에 tickets 배열이 없거나 tickets 배열이 비어있을 경우를 대비하여 tickets 배열을 가정합니다.
    const tickets = user.tickets || [];

    return (
        <div className="mypage-container">

            {/* ================================ 프로필 영역 ================================ */}
            <div className="mypage-profile-center">
                <div className="mypage-profile-img">
                    {user.profileImage && <img src={user.profileImage} alt="profile" />}
                </div>

                <h2 className="mypage-nickname">{user.nickname}</h2>
                {/* ⭐ 추가된 부분: 저장된 실제 이름 표시 ⭐ */}
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

                {user.verified && (
                    <>
                        <p className="verify-info">학번 : {user.studentId}</p>
                        <p className="verify-info">전공 : {user.major}</p>
                    </>
                )}

                {!user.verified ? (
                    <button className="verify-btn" onClick={() => updateUser({ verified: true })}>
                        인증하기
                    </button>
                ) : (
                    <button className="verify-btn verified" onClick={() => updateUser({ verified: false })}>
                        인증 취소
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

                            {/* ticket-info가 끝나는 부분 */}
                        </div>
                    </div>
                ))
            )}

            <hr className="mypage-divider" />


            {/* ================================
                ⭐ 계정 및 지원 섹션 (반복문 밖, 페이지 최하단으로 이동)
            ================================= */}
            <h2 className="mypage-section-title">계정 및 지원</h2>
            <div className="mypage-actions">

                {/* 1. 고객센터 버튼 */}
                <Link to="/support" className="action-link">
                    <button className="mypage-action-btn">
                        고객센터 / 문의
                    </button>
                </Link>

                {/* 2. 로그아웃 버튼 */}
                <button
                    className="mypage-action-btn logout-btn"
                    onClick={handleLogout}
                >
                    로그아웃
                </button>
            </div>
            {/* ================================================================== */}

        </div>
    );
}