"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={() => onClick?.()}
      className={
        "w-full p-2 pointer rounded hover:bg-slate-300 hover:dark:bg-dark-bg dark:bg-gray-900 " +
        className
      }
    >
      {children}
    </button>
  );
}
