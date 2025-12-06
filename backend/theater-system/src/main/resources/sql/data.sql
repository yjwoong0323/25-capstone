-- 초기 데이터 삽입 SQL 파일

START TRANSACTION;

-- 중복 방지 용 데이터 삭제
DELETE FROM board_likes;
DELETE FROM board_comments;
DELETE FROM free_boards;
DELETE FROM tickets;
DELETE FROM ticket_types;
DELETE FROM event_schedules;
DELETE FROM events;
DELETE FROM seats;
DELETE FROM venues;
DELETE FROM organizations;
DELETE FROM user_roles;
DELETE FROM roles;
DELETE FROM users;

-- AUTO_INCREMENT 초기화
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE roles AUTO_INCREMENT = 1;
ALTER TABLE organizations AUTO_INCREMENT = 1;
ALTER TABLE venues AUTO_INCREMENT = 1;
ALTER TABLE seats AUTO_INCREMENT = 1;
ALTER TABLE events AUTO_INCREMENT = 1;
ALTER TABLE event_schedules AUTO_INCREMENT = 1;
ALTER TABLE ticket_types AUTO_INCREMENT = 1;
ALTER TABLE tickets AUTO_INCREMENT = 1;
ALTER TABLE free_boards AUTO_INCREMENT = 1;
ALTER TABLE board_comments AUTO_INCREMENT = 1;

-- users insert
INSERT INTO users
(name, password_hash, email, phone, student_no, enrolled_student, status)
VALUES
('이재웅', '9874', 'yjwoong0323@gmail.com', '010-6298-3040', '20223764', 0, 1);

INSERT INTO users
(name, password_hash, email, phone, student_no, enrolled_student, status)
VALUES
('조민서', '1234', 'msms@gmail.com', '010-1111-3333', '20211111', 0, 1);

INSERT INTO users
(name, password_hash, email, phone, student_no, enrolled_student, status)
VALUES
('송종욱', '1234', 'sjw@gmail.com', '010-1111-2222', '20210000', 0, 1);

-- roles insert
INSERT INTO roles(name) VALUES('관리자');
INSERT INTO roles(name) VALUES('담당자');
INSERT INTO roles(name) VALUES('유저');

-- user_roles insert
INSERT INTO user_roles(user_id, role_id) VALUES(1, 1);
INSERT INTO user_roles(user_id, role_id) VALUES(2, 2);
INSERT INTO user_roles(user_id, role_id) VALUES(3, 3);

-- organizations insert
INSERT INTO organizations(name, type, owner_user_id)
VALUES('문화예술학부 연기예술 전공', 'DEPT', 2);

-- venues insert
INSERT INTO venues(name, building, address, seat_mode, capacity)
VALUES('조형관 씨어터(802호)', '조형관', '문암로 74 76', 'SEATED', '60');
INSERT INTO venues(name, building, address, seat_mode, capacity)
VALUES('백석홀 대강당', '백석홀', '백석대학로 1', 'SEATED', '300');

-- seats insert
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A1');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A2');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A3');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A4');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A5');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A6');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A7');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A8');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A9');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A10');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A11');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A12');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A13');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A14');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A15');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A16');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A17');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A18');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A19');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'A20');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B1');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B2');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B3');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B4');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B5');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B6');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B7');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B8');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B9');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B10');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B11');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B12');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B13');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B14');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B15');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B16');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B17');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B18');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B19');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'B20');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C1');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C2');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C3');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C4');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C5');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C6');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C7');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C8');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C9');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C10');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C11');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C12');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C13');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C14');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C15');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C16');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C17');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C18');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C19');
INSERT INTO seats(venue_id, seat_label) VALUES(1, 'C20');


-- events insert
INSERT INTO events(org_id, type, title, description, venue_id, visible_from, visible_to, created_by)
VALUES(1, 'PERFORMANCE', '25-2 연기예술 정기공연', '2025년 2학기 정기공연입니다.', 1,
 '2025-12-01 00:00:00', '2025-12-10 22:00:00', 2);
 
-- event_schedules insert
INSERT INTO event_schedules (event_id, starts_at, ends_at, capacity, status)
VALUES (1, '2025-12-10 10:00:00', '2025-12-10 12:00:00', 60, 'ON_SALE');
INSERT INTO event_schedules (event_id, starts_at, ends_at, capacity, status)
VALUES (1, '2025-12-10 17:00:00', '2025-12-10 19:00:00', 60, 'ON_SALE');

-- ticket_types insert
INSERT INTO ticket_types (event_id, name, seated_required, quota_per_user, total_quota, valid)
VALUES (1, '일반', 1, 4, 40, 1);
INSERT INTO ticket_types (event_id, name, seated_required, quota_per_user, total_quota, valid)
VALUES (1, 'VIP', 1, 2, 20, 1);

-- tickets insert
INSERT INTO tickets (user_id, schedule_id, ticket_type_id, seat_id, status, expired_at)
VALUES (3, 1, 1, 10, 'VALID', '2025-12-10 12:00:00');

-- free_boards insert
INSERT INTO free_boards (writer_id, title, content, in_notice)
VALUES (1, '첫 공지사항', '안녕하세요. 공연 예매 시스템 테스트용 게시글입니다.', 1);
INSERT INTO free_boards (writer_id, title, content, in_notice)
VALUES (3, '재밌네요', '공연 재밌네요', 0);

-- board_comments insert
INSERT INTO board_comments (board_id, writer_id, comment)
VALUES (1, 2, '잘 부탁드립니다.');
INSERT INTO board_comments (board_id, writer_id, comment)
VALUES (2, 2, '감사합니다.');

-- board_likes insert
INSERT INTO board_likes (user_id, board_id)
VALUES (3, 1);

COMMIT;