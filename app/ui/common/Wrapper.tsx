interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <div
      className={`w-full min-h-[60px] bg-wrapper dark:bg-dark-wrapper border borer-1 dark:border-none rounded-xl p-5 mt-4 ${className}`}
    >
      {children}
    </div>
  );
}
