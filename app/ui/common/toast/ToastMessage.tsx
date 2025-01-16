"use client";

// import { useToastMessageContext } from "@/app/providers/ToastMessageProvider";
import { ToastMessageProps } from "@/app/providers/types/toastMessage-type";

const baseStyles =
  "flex items-center justify-between w-full p-4 shadow-lg rounded-xl animate-slideIn";

const typeStyles = {
  error: "bg-[#FF6161] text-black dark:text-white",
  success: "bg-[#05CE91] text-black dark:text-white",
  info: "bg-info-500 text-black dark:text-white",
};

const ToastMessageItem = ({ message, type }: ToastMessageProps) => {
  // const { removeToastMessage } = useToastMessageContext();

  return (
    <div
      role="toastMessage"
      className={`w-fit ${baseStyles} ${typeStyles[type]}`}
    >
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
