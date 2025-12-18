import React from 'react';
import '../assets/styles/support.css';
import { Link } from 'react-router-dom';

export default function Support() {
    // 자주 묻는 질문 데이터 (실제는 API로 가져오는 것이 좋음)
    const faqs = [
        { id: 1, question: "로그인은 어떻게 하나요?", answer: "화면 상단의 '로그인' 버튼을 클릭하여 소셜 계정 또는 이메일로 가입/로그인이 가능합니다." },
        { id: 2, question: "학부생 인증은 필수인가요?", answer: "학부생 인증은 필수는 아니지만, 일부 게시판 이용 및 예매 시 혜택을 받으실 수 있습니다." },
        { id: 3, question: "예매 내역은 어디서 확인하나요?", answer: "마이페이지 > 예매 내역 섹션에서 확인하실 수 있습니다." },
    ];

    return (
        <div className="support-container">
            <h1>고객센터 및 문의</h1>
            <p className="support-intro">궁금한 점이 있으시면 아래 정보를 참고하시거나 1:1 문의를 이용해 주세요.</p>

            {/* ================================
                1. FAQ (자주 묻는 질문) 섹션
            ================================= */}
            <div className="support-section">
                <h2>자주 묻는 질문 (FAQ)</h2>
                <div className="faq-list">
                    {faqs.map((faq) => (
                        <details key={faq.id} className="faq-item">
                            <summary className="faq-question">{faq.question}</summary>
                            <p className="faq-answer">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>

            {/* ================================
                2. 1:1 문의 및 정보
            ================================= */}
            <div className="support-section contact-info">
                <h2>1:1 문의 및 연락처</h2>
                
                {/* 1:1 문의 버튼 (별도의 문의 페이지가 있다고 가정) */}
                <Link to="/support/inquiry" className="contact-link">
                    <button className="inquiry-btn">
                        1:1 문의하기 (답변까지 24시간 소요)
                    </button>
                </Link>

                {/* 이메일 및 전화 정보 */}
                <div className="contact-details">
                    <p>📧 이메일 문의: **Bket123.naver.com**</p>
                    <p>📞 전화 문의: **070-1234-5678** (평일 10:00 ~ 17:00)</p>
                    <p>💬 카카오톡 채널: **@비켓**</p>
                </div>
            </div>
        </div>
    );
}