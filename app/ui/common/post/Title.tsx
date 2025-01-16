type TitleProps = {
  title: string;
};

export default function Title({ title }: TitleProps) {
  return (
    <div className="w-full flex justify-center">
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
  );
}
