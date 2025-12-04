import React, { useState } from "react";
import "../assets/styles/write.css";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, content, file });
    alert("게시글이 등록되었습니다! (데이터 저장은 나중에 추가할 예정)");
  };

  return (
    <div className="write-container">
      <h2 className="board-title">자유게시판</h2>
      <p className="board-sub">
        공연 관람자들의 이야기를 자유롭게 나누는 공간입니다
      </p>

      <form className="write-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            className="write-input"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="content">본문</label>
          <textarea
            id="content"
            className="write-textarea"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="file-upload">
          <label htmlFor="file" className="file-box">
            파일첨부
          </label>
          <input
            id="file"
            type="file"
            className="file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit" className="write-submit-btn">
           게시하기
          </button>

      </form>
    </div>
  );
}
