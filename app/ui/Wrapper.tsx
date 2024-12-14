export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-[60px] bg-white border borer-1 rounded-xl p-5 mt-4">
      {children}
    </div>
  );
}
