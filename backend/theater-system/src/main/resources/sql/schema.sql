-- 초기 스키마 생성 SQL 파일
-- 이 파일은 Spring Boot 시작 시 자동 실행 (spring.sql.init.mode: always)

-- users (유저)
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `student_no` varchar(30) DEFAULT NULL,
  `enrolled_student` tinyint DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `student_no_UNIQUE` (`student_no`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_user_roles_user_idx` (`user_id`),
  KEY `fk_user_roles_role_idx` (`role_id`),
  CONSTRAINT `fk_user_roles_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- organizations
CREATE TABLE IF NOT EXISTS `organizations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `type` enum('DEPT','CLUB','ETC') NOT NULL,
  `owner_user_id` bigint DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_organizations_owner_idx` (`owner_user_id`),
  CONSTRAINT `fk_organizations_owner` FOREIGN KEY (`owner_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- venues
CREATE TABLE IF NOT EXISTS `venues` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `building` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `seat_mode` enum('SEATED','FREE') NOT NULL DEFAULT 'SEATED',
  `capacity` int NOT NULL DEFAULT '10',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- seats
CREATE TABLE IF NOT EXISTS `seats` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `venue_id` bigint NOT NULL,
  `seat_label` varchar(20) DEFAULT 'none',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_seat_label` (`venue_id`,`seat_label`),
  KEY `fk_seats_venue_idx` (`venue_id`),
  CONSTRAINT `fk_seats_venue` FOREIGN KEY (`venue_id`) REFERENCES `venues` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- events
CREATE TABLE IF NOT EXISTS `events` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `org_id` bigint NOT NULL,
  `type` enum('PERFORMANCE','EXHIBITION') NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text,
  `venue_id` bigint DEFAULT NULL,
  `approval_status` enum('SUBMITTED','APPROVED','REJECTED') NOT NULL DEFAULT 'SUBMITTED',
  `approved_by` bigint DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `visible_from` datetime NOT NULL,
  `visible_to` datetime NOT NULL,
  `created_by` bigint DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_events_org_idx` (`org_id`),
  KEY `fk_events_venue_idx` (`venue_id`),
  KEY `fk_events_approved_user_idx` (`approved_by`),
  KEY `fk_events_created_user_idx` (`created_by`),
  CONSTRAINT `fk_events_approved_user` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_events_created_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_events_org` FOREIGN KEY (`org_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_events_venue` FOREIGN KEY (`venue_id`) REFERENCES `venues` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- event_schedules
CREATE TABLE IF NOT EXISTS `event_schedules` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `event_id` bigint NOT NULL,
  `starts_at` datetime NOT NULL,
  `ends_at` datetime NOT NULL,
  `capacity` int DEFAULT NULL,
  `status` enum('ON_SALE','CLOSED','CANCELLED') NOT NULL DEFAULT 'ON_SALE',
  PRIMARY KEY (`id`),
  KEY `fk_event_schedules_event_idx` (`event_id`),
  CONSTRAINT `fk_event_schedules_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ticket_types
CREATE TABLE IF NOT EXISTS `ticket_types` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `event_id` bigint NOT NULL,
  `name` varchar(100) NOT NULL,
  `seated_required` tinyint NOT NULL DEFAULT '1',
  `quota_per_user` int NOT NULL,
  `total_quota` int NOT NULL,
  `valid` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_ticket_type_event_idx` (`event_id`),
  CONSTRAINT `fk_ticket_type_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- tickets
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `schedule_id` bigint NOT NULL,
  `ticket_type_id` bigint NOT NULL,
  `seat_id` bigint DEFAULT NULL,
  `status` enum('VALID','CANCELLED','EXPIRED') NOT NULL DEFAULT 'VALID',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expired_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tickets_schedule_seat` (`schedule_id`,`seat_id`),
  KEY `fk_tickets_user_idx` (`user_id`),
  KEY `fk_tickets_seat_idx` (`seat_id`),
  KEY `fk_tickets_type_idx` (`ticket_type_id`),
  KEY `fk_tickets_schedule_idx` (`schedule_id`),
  CONSTRAINT `fk_tickets_schedule` FOREIGN KEY (`schedule_id`) REFERENCES `event_schedules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tickets_seat` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tickets_type` FOREIGN KEY (`ticket_type_id`) REFERENCES `ticket_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tickets_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- free_boards
CREATE TABLE IF NOT EXISTS `free_boards` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `writer_id` bigint NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `in_notice` tinyint DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_boards_user_idx` (`writer_id`),
  CONSTRAINT `fk_boards_user` FOREIGN KEY (`writer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- board_comments
CREATE TABLE IF NOT EXISTS `board_comments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `board_id` bigint NOT NULL,
  `writer_id` bigint NOT NULL,
  `comment` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_board_comments_user_idx` (`writer_id`),
  KEY `fk_board_comments_board_idx` (`board_id`),
  CONSTRAINT `fk_board_comments_board` FOREIGN KEY (`board_id`) REFERENCES `free_boards` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_board_comments_user` FOREIGN KEY (`writer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- board_likes
CREATE TABLE IF NOT EXISTS `board_likes` (
  `user_id` bigint NOT NULL,
  `board_id` bigint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`board_id`),
  KEY `fk_board_likes_board_idx` (`board_id`),
  CONSTRAINT `fk_board_likes_board` FOREIGN KEY (`board_id`) REFERENCES `free_boards` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_board_likes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
