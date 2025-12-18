import React, { createContext, useContext, useEffect, useState } from "react";

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
  name: string;
  email: string;
  phone: string;
  password?: string;
  profileImage: string | null;
  verified: boolean;
  notifications: Notification[];
  tickets: Ticket[];
}

interface UserContextType {
  user: User | null;

  login: (email: string, password: string) => boolean;
  logout: () => void;

  updateUser: (data: Partial<User>) => void;
  sendNotification: (targetEmail: string, message: string) => void;
  addTicket: (ticket: Ticket) => void;

  unreadCount: number;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // ⭐ 새로고침 로그인 유지
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("currentUser", JSON.stringify(user));
    else localStorage.removeItem("currentUser");
  }, [user]);

  // 🔥 로그인 (회원가입 유저 검증)
  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (u: User) => u.email === email && u.password === password
    );

    if (!foundUser) return false;

    setUser(foundUser);
    return true;
  };

  // 🔥 로그아웃
  const logout = () => {
    setUser(null);
  };

  // 🔧 사용자 정보 업데이트
  const updateUser = (data: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);

    // users 리스트도 업데이트
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: User) =>
      u.email === user.email ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // 🔔 알림 추가
  const sendNotification = (targetEmail: string, message: string) => {
    if (!user || user.email !== targetEmail) return;

    const newNotification: Notification = {
      id: Date.now(),
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };

    updateUser({
      notifications: [newNotification, ...(user.notifications || [])],
    });
  };

  // 🎫 티켓 추가
  const addTicket = (ticket: Ticket) => {
    if (!user) return;

    updateUser({
      tickets: [...(user.tickets || []), ticket],
    });
  };

  const unreadCount =
    user?.notifications?.filter((n) => !n.read).length ?? 0;

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
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
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
