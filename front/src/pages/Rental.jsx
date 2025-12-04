import React from "react";
import "../assets/styles/rental.css";

const rentalData = [
  {
    id: 1,
    name: "백석아트홀 (B1 Art Hall)",
    location: "천안시 동남구 백석대학로 1",
    capacity: 300,
    contact: "041-550-0000",
    image: "/images/sample.png",
  },
  {
    id: 2,
    name: "개작은 공연장",
    location: "천안시 서북구 두정동",
    capacity: 50,
    contact: "010-1234-5678",
    image: "/images/sample2.png",
  },
  {
    id: 3,
    name: "천안예술의전당 소극장",
    location: "천안시 동남구 태조산길 200",
    capacity: 150,
    contact: "041-900-0000",
    image: "/images/sample.png",
  },
  {
    id: 4,
    name: "개쩌는 공연장",
    location: "천안시 서북구 불당동",
    capacity: 500,
    contact: "010-9988-1122",
    image: "/images/sample2.png",
  },
];

export default function Rental() {
  return (
    <div className="rental-container">
      <h2 className="rental-title">대관 가능한 공연장</h2>

      <div className="rental-list">
        {rentalData.map((place) => (
          <div className="rental-card" key={place.id}>
            <div className="rental-img-box">
              <img src={place.image} alt={place.name} />
            </div>

            <div className="rental-info">
              <h3 className="rental-name">{place.name}</h3>
              <p className="rental-detail">{place.location}</p>
              <p className="rental-detail">수용 인원: {place.capacity}명</p>
              <p className="rental-contact">문의: {place.contact}</p>
            </div>
            <a
               href={place.link}
               target="_blank"
               rel="noopener noreferrer"
               className="rental-btn"
            >
                 상세보기
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
