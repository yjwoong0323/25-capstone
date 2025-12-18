import { Routes, Route } from "react-router-dom";
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
import PostApply from "./pages/PostApply";
import Rental from "./pages/Rental";
import PostDetail from "./pages/PostDetail";
import Support from "./pages/Support";
import InquiryForm from "./pages/InquiryForm";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<FreeBoard />} />
        <Route path="/board/:id" element={<PostDetail />} />
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
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/support/inquiry" element={<InquiryForm />} />
        <Route path="/support" element={<Support />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
