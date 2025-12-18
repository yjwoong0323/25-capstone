import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageSquare, ThumbsUp, Trash2, Edit } from 'lucide-react';
import { useUser } from '../context/UserContext'; // 사용자 정보 및 로그인 상태 확인용
import '../assets/styles/post-detail.css'; // 스타일 파일

// --- 더미 데이터 (실제 프로젝트에서는 API로 대체됩니다) ---
const dummyPost = {
    id: '123',
    title: '대학생을 위한 뮤지컬 팟 구해요! (레미제라블)',
    content: '안녕하세요! 이번 주말 레미제라블 함께 보실 분 구합니다. 관심 있는 분들은 댓글 달아주세요! 저희는 총 3명이고 1명 더 모셔요. 쪽지 환영합니다.',
    author: 'minswim2002',
    authorProfile: 'https://placehold.co/50x50/1e3a8a/ffffff?text=M',
    date: '2025.11.20',
    views: 154,
    likes: 28,
    isAuthor: true, // 작성자 본인인지 여부
};

const initialComments = [
    { id: 1, user: 'yuukiev', text: '저희도 보고 싶었는데! 혹시 비용 분담 어떻게 되나요?', date: '2025.11.20 14:30', isAuthor: false },
    { id: 2, user: 'seoya24', text: '공연 잘 보고 오세요~!', date: '2025.11.20 15:00', isAuthor: false },
];
// --------------------------------------------------------

export default function PostDetail() {
    const { postId } = useParams(); // URL에서 게시물 ID 가져오기
    const { user, isLoggedIn } = useUser();

    // 상태 관리
    const [post, setPost] = useState(dummyPost);
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');

    // 댓글 작성 핸들러
    const handleSubmitComment = () => {
        if (!isLoggedIn) {
            alert('댓글을 작성하려면 로그인해야 합니다.');
            return;
        }
        if (newComment.trim() === '') return;

        const newCommentObj = {
            id: Date.now(),
            user: user.nickname,
            text: newComment.trim(),
            date: new Date().toLocaleString(),
            isAuthor: true, // 사용자가 작성했으므로 true
        };

        setComments([newCommentObj, ...comments]); // 새 댓글을 맨 위에 추가
        setNewComment('');
    };

    // 좋아요 버튼 핸들러
    const handleLike = () => {
        if (!isLoggedIn) {
            alert('좋아요를 누르려면 로그인해야 합니다.');
            return;
        }
        // 실제로는 서버에 좋아요 요청을 보냅니다.
        setPost(prev => ({ ...prev, likes: prev.likes + 1 }));
    };

    if (!post) return <div>게시물을 찾을 수 없습니다.</div>; // 게시물이 없을 경우

    return (
        <div className="post-detail-page">
            <div className="post-detail-container">

                {/* 1. 게시물 헤더 */}
                <header className="post-header">
                    <h1 className="post-title">{post.title}</h1>
                    <div className="post-meta">
                        <div className="author-info">
                            <img src={post.authorProfile} alt={post.author} className="author-avatar" />
                            <span className="author-name">{post.author}</span>
                            <span className="post-date">{post.date}</span>
                        </div>
                        <div className="post-stats">
                            <span>조회 {post.views}</span>
                            <span>댓글 {comments.length}</span>
                        </div>
                    </div>
                </header>

                {/* 2. 게시물 본문 */}
                <div className="post-content">
                    <p>{post.content}</p>
                </div>

                {/* 3. 액션 버튼 */}
                <div className="post-actions">
                    <button className="action-btn like-btn" onClick={handleLike}>
                        <ThumbsUp size={18} />
                        <span>좋아요 ({post.likes})</span>
                    </button>
                    {post.isAuthor && (
                        <>
                            <Link to={`/edit/${post.id}`} className="action-link">
                                <Edit size={18} /> 수정
                            </Link>
                            <button className="action-link delete-btn">
                                <Trash2 size={18} /> 삭제
                            </button>
                        </>
                    )}
                </div>
            </div> {/* post-detail-container end */}

            {/* 4. 댓글 섹션 */}
            <div className="comments-section">
                <h3 className="comments-count">댓글 ({comments.length})</h3>

                {/* 댓글 입력 폼 */}
                {isLoggedIn && (
                    <div className="comment-input-area">
                        <textarea
                            placeholder={isLoggedIn ? "댓글을 작성하세요..." : "로그인 후 댓글을 작성할 수 있습니다."}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            disabled={!isLoggedIn}
                        ></textarea>
                        <button onClick={handleSubmitComment} disabled={newComment.trim() === ''}>
                            작성
                        </button>
                    </div>
                )}

                {/* 댓글 목록 */}
                <div className="comments-list">
                    {comments.map((comment) => (
                        <div key={comment.id} className="comment-item">
                            <div className="comment-header">
                                <span className="comment-user">{comment.user}</span>
                                <span className="comment-date">{comment.date}</span>
                                {comment.isAuthor && <span className="comment-badge">작성자</span>}
                            </div>
                            <p className="comment-text">{comment.text}</p>
                            {/* 댓글 수정/삭제 버튼은 필요 시 추가 */}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}