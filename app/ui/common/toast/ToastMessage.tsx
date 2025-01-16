"use client";

import { useToastMessageContext } from "@/app/providers/ToastMessageProvider";
import { ToastMessageProps } from "@/app/providers/types/toastMessage-type";

const baseStyles =
  "flex items-center justify-between w-full p-4 shadow-lg rounded-xl animate-slideIn";

const typeStyles = {
  error: "bg-error-500 text-white",
  success: "bg-success-500 text-white",
  info: "bg-info-500 text-white",
};

const ToastMessageItem = ({ id, message, type }: ToastMessageProps) => {
  const { removeToastMessage } = useToastMessageContext();

  return (
    <div role="toastMessage" className={`${baseStyles} ${typeStyles[type]}`}>
      <span className="text-body font-medium pr-4">{message}</span>
      {/* <IconButton
        icon={
          <Image src="/icons/close.svg" alt="닫기" width={24} height={24} />
        }
        label="알림 닫기"
        color="white"
        onClick={() => removeToastMessage(id)}
        className="hover:bg-black-200"
      /> */}
    </div>
  );
};

export default ToastMessageItem;
