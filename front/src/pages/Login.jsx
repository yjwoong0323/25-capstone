import React from "react";
import "../assets/styles/login.css";

export default function Login() {
  // ⭐ 카카오 REST API KEY 입력
  const KAKAO_CLIENT_ID = "카카오REST_API_KEY";

  const KAKAO_AUTH_URL =
    `https://kauth.kakao.com/oauth/authorize` +
    `?client_id=${KAKAO_CLIENT_ID}` +
    `&redirect_uri=http://localhost:3000/auth/callback` +
    `&response_type=code` +
    `&state=kakao`;

  // ⭐ 구글 OAuth Client ID 입력
  const GOOGLE_CLIENT_ID =
    "530189704106-18j07s7d6kkasi7ukcsf9aghseul8lc9.apps.googleusercontent.com";

  const GOOGLE_AUTH_URL =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=http://localhost:3000/auth/google` + // 💥 콘솔과 반드시 동일해야 함
    `&response_type=code` +
    `&scope=email%20profile` + // 띄어쓰기 인코딩
    `&prompt=consent`; // 새 로그인 강제

  const loginWithKakao = () => (window.location.href = KAKAO_AUTH_URL);
  const loginWithGoogle = () => (window.location.href = GOOGLE_AUTH_URL);

  return (
    <div className="login-container">
      <img src="/logo.png" alt="logo" className="login-logo" />

      <div className="login-buttons">
        <button className="login-btn-kakao" onClick={loginWithKakao}>
          <img src="/kakao.png" className="login-icon" alt="Kakao" />
          <span>카카오로 시작하기</span>
        </button>

        <button className="login-btn-google" onClick={loginWithGoogle}>
          <img src="/google.png" className="login-icon" alt="Google" />
          <span>구글로 시작하기</span>
        </button>
      </div>
    </div>
  );
}
