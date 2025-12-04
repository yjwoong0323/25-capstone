import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/global.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import FreeBoard from "./pages/FreeBoard";
import WritePost from "./pages/WritePost";
import PartyBoard from "./pages/PartyBoard";
import WriteParty from "./pages/WriteParty";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import Ticket from "./pages/Ticket";
import MyPage from "./pages/MyPage";
import MyPageEdit from "./pages/MyPageEdit";
import { UserProvider } from "./context/UserContext";
import PostApply from "./pages/PostApply";
import Rental from "./pages/Rental";
import PostDetail from "./pages/PostDetail";
import AuthCallback from "./pages/AuthCallback";
import Support from './pages/Support';      // ⭐ Support 컴포넌트 추가
import InquiryForm from './pages/InquiryForm'; // ⭐ InquiryForm 컴포넌트 추가

function App() {
  return (
    <BrowserRouter>
      {/* UserProvider로 감싸기 → useUser 정상 작동 */}
      <UserProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<FreeBoard />} />
          <Route path="/board/:id" element={<PostDetail />} />   {/* 상세 페이지 추가 */}
          <Route path="/write" element={<WritePost />} />
          <Route path="/party" element={<PartyBoard />} />
          <Route path="/party/write" element={<WriteParty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking/:showId" element={<Booking />} />
          <Route path="/ticket/:ticketId" element={<Ticket />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/edit" element={<MyPageEdit />} />
          <Route path="/posting/apply" element={<PostApply />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/auth/kakao" element={<AuthCallback />} />
          <Route path="/auth/google" element={<AuthCallback />} />
                  {/* ⭐ 게시판 관련 라우트 추가  */}
          <Route path="/post/:postId" element={<PostDetail />} />
          {/* ⭐ 고객센터 관련 라우트 추가  */}
          <Route path="/support/inquiry" element={<InquiryForm />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
