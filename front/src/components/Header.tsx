import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/header.css";
import { useUser } from "../context/UserContext";
import type { Notification } from "../context/UserContext";
import { SearchIcon, X } from "lucide-react"; // ⭐ X 아이콘 추가

export default function Header() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    // ⭐ 1. 검색어 상태 추가
    const [searchQuery, setSearchQuery] = useState('');

    const { user } = useUser();
    // user 객체의 존재 여부로 로그인 상태 확인
    const isLoggedIn = user !== null;

    const handleMouseEnter = (menu: string) => setActiveMenu(menu);
    const handleMouseLeave = () => setActiveMenu(null);

    // 🔔 읽지 않은 알림 수 계산
    const unread =
        user?.notifications
            ? user.notifications.filter((n: Notification) => !n.read).length
            : 0;

    // ⭐ 2. 검색어 입력 및 Clear 핸들러 추가
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };


    return (
        <header className="header">
            <div className="header-container">

                {/* 왼쪽 로고 */}
                <div className="header-left">
                    <Link to="/">
                        <img src="/logo.png" alt="logo" className="logo" />
                    </Link>
                </div>

                {/* 가운데 메뉴 */}
                <nav className="header-center">
                    {/* Talk & Find */}
                    <div
                        className="menu-wrapper"
                        onMouseEnter={() => handleMouseEnter("talk")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className="menu-item">Talk & Find</span>
                        {activeMenu === "talk" && (
                            <div className="dropdown">
                                <Link to="/party" className="dropdown-item">팟 구하기</Link>
                                <Link to="/board" className="dropdown-item">자유게시판</Link>
                            </div>
                        )}
                    </div>

                    {/* Stage Manager */}
                    <div
                        className="menu-wrapper"
                        onMouseEnter={() => handleMouseEnter("stage")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className="menu-item">Stage Manager</span>
                        {activeMenu === "stage" && (
                            <div className="dropdown">
                                <Link to="/rental" className="dropdown-item">대관</Link>
                                <Link to="/posting/apply" className="dropdown-item">포스팅신청</Link>
                            </div>
                        )}
                    </div>
                </nav>

                {/* 오른쪽 영역 */}
                <div className="header-right">

                    {/* ⭐ 3. 검색창 JSX 수정: Clear 버튼 로직 및 상태 연결 */}
                    <div className="header-search-wrapper search-group">
                        <input
                            type="text"
                            placeholder="검색..."
                            className="header-search-input-final"
                            value={searchQuery} // 상태 연결
                            onChange={handleSearchChange} // 변경 핸들러 연결
                        />
                        {/* SearchIcon: 돋보기 아이콘 */}
                        <SearchIcon className="search-icon-final" />

                        {/* Clear 버튼: 검색어가 있을 때만 표시 */}
                        {searchQuery.length > 0 && (
                            <button className="clear-btn" onClick={handleClearSearch} aria-label="검색 지우기">
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* ⭐ 4. 로그인/마이페이지 조건부 렌더링 */}
                    {!isLoggedIn ? (
                        <Link to="/login" className="login-btn">로그인</Link>
                    ) : (
                        <>
                            {/* 환영 메시지 (선택 사항) */}
                            <span className="login-status">환영합니다, {user?.nickname}!</span>

                            {/* 마이페이지 + 🔔 알림배지 */}
                            <Link to="/mypage" className="mypage-wrapper">
                                <img src="/icon.png" alt="mypage" className="right-icon" />
                                {unread > 0 && <span className="noti-badge">{unread}</span>}
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </header>
    );
}