"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  ToastMessageContextType,
  ToastMessageProps,
} from "./types/toastMessage-type";

const ToastMessageContext = createContext<ToastMessageContextType | null>(null);

export function ToastMessageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toastMessages, setToastMessages] = useState<ToastMessageProps[]>([]);
  const timeoutIds = useRef(new Set<NodeJS.Timeout>());

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  const removeToastMessage = useCallback((id: string) => {
    setToastMessages((prev) =>
      prev.filter((toastMessage) => toastMessage.id !== id)
    );
  }, []);

  const showToastMessage = useCallback(
    ({
      message,
      type,
    }: {
      message: string;
      type: ToastMessageProps["type"];
    }) => {
      const id = Math.random().toString(36).substring(7);

      if (
        toastMessages.some((toastMessage) => toastMessage.message === message)
      ) {
        return;
      }

      setToastMessages((prev) => [...prev, { id, message, type }]);

      // 3초 후 자동으로 알림 제거하는 타이머 설정
      const timeoutId = setTimeout(() => {
        removeToastMessage(id);
        timeoutIds.current.delete(timeoutId); // 타이머 제거
      }, 3000);

      timeoutIds.current.add(timeoutId); // 새로운 타이머 추가
    },
    [toastMessages, removeToastMessage]
  );

  return (
    <ToastMessageContext.Provider
      value={{ toastMessages, showToastMessage, removeToastMessage }}
    >
      {children}
    </ToastMessageContext.Provider>
  );
}

export const useToastMessageContext = () => {
  const context = useContext(ToastMessageContext);
  if (!context) {
    throw new Error(
      "useToastMessageContext must be used within ToastMessageProvider"
    );
  }
  return context;
};
