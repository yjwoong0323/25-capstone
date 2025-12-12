import React, { useState } from "react";
import "../assets/styles/login.css";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phone) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    // 전화번호 형식 검증 (- 없이 입력)
    if (!/^[0-9]{10,11}$/.test(phone)) {
      alert("전화번호는 숫자만 입력해주세요. (10~11자리)");
      return;
    }

    try {
      // 백엔드 API를 통한 회원가입
      await api.post("/user/signup", {
        name,
        email,
        password,
        phone,
      });

      alert("회원가입 완료! 로그인해주세요 😊");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 오류:", error);
      
      // 에러 메시지 처리
      if (error?.response?.status === 400 || error?.response?.status === 409) {
        const errorMessage = error?.response?.data?.error || error?.response?.data?.message || "이미 가입된 이메일이거나 입력 정보가 잘못되었습니다.";
        alert(errorMessage);
      } else {
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="login-container">
      <img src="/logo.png" alt="logo" className="login-logo signup-logo" />

      <h2 className="login-title">회원가입</h2>

      <form className="login-form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />

        <input
          type="email"
          placeholder="이메일 (아이디)"
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

        <input
          type="tel"
          placeholder="전화번호 ( - 없이 입력 )"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input"
          maxLength={11}
        />

        <button className="login-btn" type="submit">
          회원가입
        </button>
      </form>

      <button className="signup-btn" onClick={() => navigate("/login")}>
        로그인 화면으로 돌아가기
      </button>
    </div>
  );
}
