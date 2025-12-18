import React, { useState } from "react";
import "../assets/styles/login.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phone) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    // 기존 저장된 유저들 불러오기 (없으면 빈 배열)
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // 이메일 중복 체크
    if (existingUsers.some((user) => user.email === email)) {
      alert("이미 가입된 이메일입니다.");
      return;
    }

    // 새 사용자 데이터
    const newUser = {
      name,
      email,
      password,
      phone,
      profileImage: null,
      verified: true,
      notifications: [],
    };

    // 배열에 추가하고 다시 저장
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("회원가입 완료! 로그인해주세요 😊");
    navigate("/login");
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
