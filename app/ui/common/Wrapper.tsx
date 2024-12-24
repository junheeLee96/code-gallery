interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <div
      className={`w-full min-h-[60px] bg-white border borer-1 rounded-xl p-5 mt-4 ${className}`}
    >
      {children}
    </div>
  );
}
