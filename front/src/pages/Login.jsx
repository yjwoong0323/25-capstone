import React, { useState } from "react";
import "../assets/styles/login.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";   

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser();                     

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 백엔드 API를 통한 로그인
      const success = await login(email, password);

      if (!success) {
        alert("이메일 또는 비밀번호가 틀렸습니다.");
        return;
      }

      alert("로그인 성공 🎉");
      navigate("/mypage");
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="login-container">
      <img src="/logo.png" alt="logo" className="login-logo" />

      <h2 className="login-title">로그인</h2>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />

        <button className="login-btn" type="submit">
          로그인
        </button>
      </form>

      <button 
        className="signup-btn"
        onClick={() => navigate("/signup")}
      >
        회원가입
      </button>
    </div>
  );
}
