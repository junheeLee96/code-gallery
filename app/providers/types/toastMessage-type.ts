export type ToastMessageType = "error" | "success" | "info";

export interface ToastMessageProps {
  id: string;
  message: string;
  type: ToastMessageType;
}

export interface ToastMessageContextType {
  toastMessages: ToastMessageProps[];
  showToastMessage: ({
    message,
    type,
  }: {
    message: string;
    type: ToastMessageType;
  }) => void;
  removeToastMessage: (id: string) => void;
}
