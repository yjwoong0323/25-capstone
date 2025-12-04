import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    const run = async () => {
      const params = new URL(window.location.href).searchParams;
      const code = params.get("code");
      const provider = params.get("state"); // kakao | google

      if (!code || !provider) {
        alert("로그인 실패 — code 또는 provider 누락");
        navigate("/login");
        return;
      }

      try {
        // 🔥 백엔드로 인가코드 전송
        const res = await axios.post("http://localhost:8080/auth/social", {
          provider,
          code,
        });

        // 로그인 성공 → 유저 정보 저장
        setUser(res.data.user);
        navigate("/");
      } catch (err) {
        console.error("로그인 오류:", err);
        alert("로그인 중 오류 발생");
        navigate("/login");
      }
    };

    run();
  }, [navigate, setUser]);

  return <div>로그인 중입니다. 잠시만 기다려 주세요...</div>;
}
