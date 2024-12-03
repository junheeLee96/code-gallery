export default function PostWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-[60px] bg-black border borer-1 rounded-xl p-5">
      {children}
    </div>
  );
}
