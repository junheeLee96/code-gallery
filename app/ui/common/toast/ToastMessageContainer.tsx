"use client";

import { useToastMessageContext } from "@/app/providers/ToastMessageProvider";
import ToastMessageItem from "./ToastMessage";

const ToastMessageContainer = () => {
  const { toastMessages } = useToastMessageContext();
  console.log(toastMessages);

  return (
    <div
      role="toastMessage"
      aria-live="polite"
      className="fixed bottom-[7.5rem] left-[4.6rem] z-50 flex flex-col gap-4 w-full max-w-[40rem] px-4"
    >
      {toastMessages.map((toastMessage) => (
        <ToastMessageItem key={toastMessage.id} {...toastMessage} />
      ))}
    </div>
  );
};

export default ToastMessageContainer;
