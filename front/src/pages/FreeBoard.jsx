import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import '../assets/styles/freeboard.css';

// --- 더미 데이터 (Figma 디자인과 유사하게 목록 생성) ---
const dummyPosts = [
    { id: 1, title: '첫 번째 게시물 제목입니다.', content: '본문 내용', date: '2025 - 11 - 03', hasImage: true },
    { id: 2, title: '두 번째 게시물 제목입니다.', content: '본문 내용', date: '2025 - 11 - 03', hasImage: true },
    { id: 3, title: '세 번째 게시물 제목입니다.', content: '본문 내용', date: '2025 - 11 - 03', hasImage: true },
    { id: 4, title: '네 번째 게시물 제목입니다.', content: '본문 내용', date: '2025 - 11 - 03', hasImage: true },
    { id: 5, title: '다섯 번째 게시물 제목입니다.', content: '본문 내용', date: '2025 - 11 - 03', hasImage: true },
    { id: 6, title: '여섯 번째 게시물 제목입니다.', content: '본문 내용', date: '2025 - 11 - 03', hasImage: false },
    { id: 7, title: '일곱 번째 게시물 제목입니다.', content: '본문 내용', date: '2025 - 11 - 03', hasImage: false },
];
// --------------------------------------------------------

export default function FreeBoard() {
    const [posts, setPosts] = useState(dummyPosts);
    // 실제 프로젝트에서는 여기서 useState 대신 API를 호출하여 게시물 목록을 불러옵니다.

    return (
        <div className="board-page-container">

            {/* 제목 및 설명 영역 */}
            <div className="board-header">
                <h1 className="board-title">자유게시판</h1>
                <p className="board-description">공연 관람자들의 이야기를 자유롭게 나누는 공간입니다</p>
            </div>

            <div className="board-content-wrapper">

                {/* 작성하기 버튼 */}
                <div className="board-actions">
                    <Link to="/write" className="write-link">
                        <button className="write-btn">작성하기</button>
                    </Link>
                </div>

                {/* 게시물 목록 */}
                <div className="post-list-section">
                    {posts.map((post) => (
                        // 상세 페이지로 이동하는 링크 (post/:postId 경로를 사용한다고 가정)
                        <Link to={`/post/${post.id}`} key={post.id} className="post-card-link">
                            <div className="post-card">

                                {/* 1. 텍스트 정보 */}
                                <div className="post-text-content">
                                    <h3 className="post-card-title">{post.title}</h3>
                                    {/* ⭐ 본문 내용 추가 (제목 바로 아래) */}
                                    <p className="post-card-content">{post.content}</p>
                                    <p className="post-card-content">{post.content}</p>
                                    <div className="post-meta">
                                        <span className="post-date">{post.date}</span>
                                        <ChevronRight size={16} className="arrow-icon" />
                                    </div>
                                </div>

                                {/* 2. 이미지 썸네일 (Figma의 '사진' 영역) */}
                                <div className={`post-thumbnail ${!post.hasImage && 'no-image'}`}>
                                    {post.hasImage ? (
                                        <img
                                            src={`https://placehold.co/160x160/cccccc/ffffff?text=사진`}
                                            alt="게시물 썸네일"
                                        />
                                    ) : (
                                        <span className="image-placeholder">사진 없음</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* TODO: 페이지네이션 영역 추가 */}
        </div>
    );
}