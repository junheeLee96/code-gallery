type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={() => onClick?.()}
      className="w-full p-2 pointer rounded hover:bg-gray-200 "
    >
      {children}
    </button>
  );
}
