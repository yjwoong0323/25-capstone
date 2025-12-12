import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

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
  id: number;
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

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;

  updateUser: (data: Partial<User>) => void;
  sendNotification: (targetEmail: string, message: string) => void;
  addTicket: (ticket: Ticket) => void;

  unreadCount: number;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // ⭐ 토큰이 있으면 사용자 정보 로드
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      loadUser().catch(() => {
        // 사용자 정보 로드 실패 시 토큰 제거
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
    }
  }, []);

  // 🔥 사용자 정보 로드
  const loadUser = async (): Promise<void> => {
    try {
      const response = await api.get("/user/me");
      const userData = response.data;
      
      // 백엔드 응답을 프론트엔드 User 인터페이스에 맞게 변환
      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        profileImage: null, // 백엔드에서 제공하지 않으면 null
        verified: true,
        notifications: [], // 알림은 별도 API로 가져올 수 있음
        tickets: [], // 티켓은 별도 API로 가져올 수 있음
      };
      
      setUser(user);
    } catch (error) {
      console.error("사용자 정보 로드 실패:", error);
      throw error;
    }
  };

  // 🔥 로그인 (백엔드 API 호출)
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      // 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // 사용자 정보 로드
      await loadUser();

      return true;
    } catch (error: any) {
      console.error("로그인 실패:", error);
      return false;
    }
  };

  // 🔥 로그아웃 (백엔드 API 호출)
  const logout = async (): Promise<void> => {
    try {
      // 백엔드에 로그아웃 요청 (토큰 삭제)
      await api.post("/auth/logout");
    } catch (error) {
      console.error("로그아웃 요청 실패:", error);
      // 에러가 나도 프론트엔드에서는 로그아웃 처리
    } finally {
      // 로컬 스토리지 정리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    }
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
        loadUser,
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
