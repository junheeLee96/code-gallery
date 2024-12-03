export default function Dialog({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div popover="auto" id={id} className="dialog max-w-full">
      {children}
    </div>
  );
}
