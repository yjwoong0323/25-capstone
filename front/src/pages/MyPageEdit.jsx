import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../assets/styles/mypage-edit.css";

export default function MyPageEdit() {
    const { user, updateUser } = useUser();
    const navigate = useNavigate();

    const [nickname, setNickname] = useState(user?.nickname || "");
    const [profileImage, setProfileImage] = useState(user?.profileImage || "");
    const [uploadFile, setUploadFile] = useState(null);

    const [name, setName] = useState(user?.name || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    if (!user) {
        return <div>로그인이 필요합니다...</div>;
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadFile(file);

        const preview = URL.createObjectURL(file);
        setProfileImage(preview);
    };

    const handleSave = async () => {
        if (!nickname.trim() || !name.trim() || !phoneNumber.trim()) {
            alert("닉네임, 이름, 전화번호는 필수 입력입니다!");
            return;
        }

        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다!");
                return;
            }
            if (newPassword.length < 6) {
                alert("비밀번호는 최소 6자리 이상이어야 합니다.");
                return;
            }
        }

        let finalImageURL = user.profileImage;

        if (uploadFile) {
            finalImageURL = profileImage; 
        }

        updateUser({
            nickname,
            profileImage: finalImageURL,
            name,
            phoneNumber,
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
                <div className="edit-form">
                    <label className="edit-label">이메일</label>
                    <input
                        type="email"
                        className="edit-input read-only"
                        value={user.email}
                        readOnly
                    />
                </div>

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

                <div className="edit-form">
                    <label className="edit-label">이름</label>
                    <input
                        type="text"
                        className="edit-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="edit-form">
                    <label className="edit-label">전화번호</label>
                    <input
                        type="tel"
                        className="edit-input"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <hr className="edit-divider" />

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
            </div>

            <button className="edit-save-btn" onClick={handleSave}>
                저장하기
            </button>

            <div style={{ height: "50px" }} />
        </div>
    );
}
