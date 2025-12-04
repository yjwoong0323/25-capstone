import React, { createContext, useContext, useState, useEffect } from "react";

export interface Notification {
  id: number;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface Ticket {
  id: number;
  title: string;
  place: string;
  date: string;
  time: string;
  people: number;
}

export interface User {
  id: string;
  nickname: string;
  email: string;
  profileImage: string | null;
  verified: boolean;
  studentId?: string;
  major?: string;
  notifications: Notification[];
  tickets: Ticket[];
}

interface UserContextType {
  user: User | null;
  updateUser: (data: Partial<User>) => void;
  sendNotification: (targetUserId: string, message: string) => void;
  addTicket: (ticket: Ticket) => void;

  unreadCount: number;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // ⭐ 로컬스토리지에서 초기 유저 로드 (새로고침 유지)
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    else {
      // 초기 유저 (임시)
      const defaultUser: User = {
        id: "user123",
        nickname: "닉네임",
        email: "minswim2002@gmail.com",
        profileImage: null,
        verified: true,
        studentId: "20213416",
        major: "컴퓨터공학부",
        notifications: [],
        tickets: [],
      };
      setUser(defaultUser);
    }
  }, []);

  // ⭐ User 변경 시 로컬스토리지 자동 저장
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    setUser((prev) => ({ ...prev!, ...data }));
  };

  // 🔥 특정 유저에게 알림 보내기 (백엔드 연동 READY)
  const sendNotification = (targetUserId: string, message: string) => {
    // 지금은 "내가 targetUserId라면 나에게만 적용"
    if (!user) return;
    if (user.id !== targetUserId) return;

    const newNotification: Notification = {
      id: Date.now(),
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };

    setUser((prev) => ({
      ...prev!,
      notifications: [newNotification, ...(prev?.notifications ?? [])],
    }));
  };

  // 🎟 예매 티켓 추가
  const addTicket = (ticket: Ticket) => {
    if (!user) return;
    setUser((prev) => ({
      ...prev!,
      tickets: [...(prev?.tickets ?? []), ticket],
    }));
  };

  // 🔔 읽지 않은 알림 수
  const unreadCount = user?.notifications?.filter((n) => !n.read).length ?? 0;

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        sendNotification,
        addTicket,
        unreadCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
