import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/header.css";
import { useUser } from "../context/UserContext";
import type { Notification } from "../context/UserContext";
import { SearchIcon, X } from "lucide-react"; // ⭐ X 아이콘 추가

export default function Header() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // ⭐ logout 포함해서 가져오기
    const { user, logout } = useUser();
    
    const isLoggedIn = user !== null;

    const handleMouseEnter = (menu: string) => setActiveMenu(menu);
    const handleMouseLeave = () => setActiveMenu(null);

    // 🔔 읽지 않은 알림 수 계산
    const unread =
        user?.notifications
            ? user.notifications.filter((n: Notification) => !n.read).length
            : 0;

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

                    {/* 검색창 */}
                    <div className="header-search-wrapper search-group">
                        <input
                            type="text"
                            placeholder="검색..."
                            className="header-search-input-final"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <SearchIcon className="search-icon-final" />

                        {searchQuery.length > 0 && (
                            <button className="clear-btn" onClick={handleClearSearch} aria-label="검색 지우기">
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* 로그인 / 마이페이지 UI */}
                    {!isLoggedIn ? (
                        <Link to="/login" className="login-btn">로그인</Link>
                    ) : (
                        <>
                            <span className="login-status">환영합니다, {user?.name}!</span>

                            <Link to="/mypage" className="mypage-wrapper">
                                <img src="/icon.png" alt="mypage" className="right-icon" />
                                {unread > 0 && <span className="noti-badge">{unread}</span>}
                            </Link>

                            {/* ⭐ 로그아웃 버튼 */}
                            <button 
                                className="logout-btn" 
                                onClick={async () => {
                                    await logout();
                                    // 로그아웃 후 홈으로 이동 (선택사항)
                                    window.location.href = '/';
                                }}
                            >
                                로그아웃
                            </button>
                        </>
                    )}

                </div>
            </div>
        </header>
    );
}
