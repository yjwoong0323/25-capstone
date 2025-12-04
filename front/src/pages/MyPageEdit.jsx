import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../assets/styles/mypage-edit.css";
// import axios from "axios"; // 나중에 백엔드 연결할 때 사용

export default function MyPageEdit() {
    const { user, updateUser } = useUser(); // useUser는 최상단에 있어야 함
    const navigate = useNavigate(); // useNavigate도 최상단에 있어야 함

    // ⭐⭐⭐ 1. 모든 useState 훅을 조건부 리턴보다 위로 이동 (오류 해결!) ⭐⭐⭐
    // user가 null일 경우에도 안전하게 접근하도록 옵셔널 체이닝(?. ) 사용
    const [nickname, setNickname] = useState(user?.nickname || "");
    const [profileImage, setProfileImage] = useState(user?.profileImage || "");
    const [uploadFile, setUploadFile] = useState(null);

    // 이름, 전화번호, 생년월일, 비밀번호 관련 상태
    const [name, setName] = useState(user?.name || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
    const [birthDate, setBirthDate] = useState(user?.birthDate || "");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

    // ⭐ 2. 조건부 리턴은 모든 훅 호출 이후에 배치합니다. (오류 해결!)
    if (!user) {
        return <div>로그인이 필요합니다...</div>;
    }

    // 🔥 이미지 업로드 준비 함수
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadFile(file);

        // 미리보기 URL 생성
        const preview = URL.createObjectURL(file);
        setProfileImage(preview);
    };

    const handleSave = async () => {
        // --- 1. 필수 입력 필드 검사 ---
        if (!nickname.trim() || !name.trim() || !phoneNumber.trim()) {
            alert("닉네임, 이름, 전화번호는 필수 입력입니다!");
            return;
        }

        // --- 2. 비밀번호 유효성 검사 ---
        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다!");
                return;
            }
            if (newPassword.length < 6) { // 최소 6자리 가정
                alert("비밀번호는 최소 6자리 이상이어야 합니다.");
                return;
            }
            // 이메일이나 비밀번호는 Context에 직접 저장하지 않고, 실제로는 API를 호출해야 합니다.
        }


        // 🔥 3. 이미지 업로드 로직 (기존 유지)
        let finalImageURL = user.profileImage;

        if (uploadFile) {
            // ... (이미지 업로드 로직)
            finalImageURL = profileImage; // 프론트 테스트
        }

        // 🔥 4. UserContext 업데이트
        updateUser({
            // 기본 정보 업데이트
            nickname,
            profileImage: finalImageURL,
            name,
            phoneNumber,
            birthDate,
            // 이메일은 변경 불가능하다고 가정하고 표시만 합니다.
        });

        alert("프로필 정보가 저장되었습니다.");
        navigate("/mypage");
    };

    return (
        <div className="edit-container">
            <h2 className="edit-title">프로필 수정</h2>

            <div className="edit-profile-img-box">
                <label className="edit-profile-img">
                    {profileImage ? (
                        <img src={profileImage} alt="profile" />
                    ) : (
                        <span className="edit-placeholder">사진 업로드</span>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                </label>
            </div>

            <div className="edit-form-group">

                {/* ⭐ 이메일 (읽기 전용 필드) */}
                <div className="edit-form">
                    <label className="edit-label">이메일</label>
                    <input
                        type="email"
                        className="edit-input read-only"
                        value={user.email} // 이메일은 변경 불가능하다고 가정
                        readOnly
                    />
                </div>

                {/* 기존 닉네임 필드 */}
                <div className="edit-form">
                    <label className="edit-label">닉네임</label>
                    <input
                        type="text"
                        className="edit-input"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>

                <hr className="edit-divider" />

                {/* 이름 수정 필드 */}
                <div className="edit-form">
                    <label className="edit-label">이름</label>
                    <input
                        type="text"
                        className="edit-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* 전화번호 수정 필드 */}
                <div className="edit-form">
                    <label className="edit-label">전화번호</label>
                    <input
                        type="tel"
                        className="edit-input"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                {/* 생년월일 수정 필드 */}
                <div className="edit-form">
                    <label className="edit-label">생년월일</label>
                    <input
                        type="date"
                        className="edit-input"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>

                <hr className="edit-divider" />

                {/* ⭐ 새 비밀번호 수정 필드 */}
                <div className="edit-form">
                    <label className="edit-label">새 비밀번호</label>
                    <input
                        type="password"
                        className="edit-input"
                        value={newPassword}
                        placeholder="비밀번호 변경 시에만 입력"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                {/* ⭐ 비밀번호 확인 필드 */}
                <div className="edit-form">
                    <label className="edit-label">비밀번호 확인</label>
                    <input
                        type="password"
                        className="edit-input"
                        value={confirmPassword}
                        placeholder="새 비밀번호를 다시 입력하세요"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

            </div> {/* .edit-form-group 닫는 태그 */}

            <button className="edit-save-btn" onClick={handleSave}>
                저장하기
            </button>

            <div style={{ height: '50px' }} />

        </div>
    );
}