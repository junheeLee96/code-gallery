"use client";

import { useToastMessageContext } from "@/app/providers/ToastMessageProvider";
import ToastMessageItem from "./ToastMessage";

const ToastMessageContainer = () => {
  const { toastMessages } = useToastMessageContext();

  return (
    <div
      role="toastMessage"
      aria-live="polite"
      className="fixed top-[60px] right-[4.6rem] z-50 flex flex-col gap-4 max-w-[40rem] px-4"
    >
      {toastMessages.map((toastMessage) => (
        <ToastMessageItem key={toastMessage.id} {...toastMessage} />
      ))}
    </div>
  );
};

export default ToastMessageContainer;
