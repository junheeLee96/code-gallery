import { ChangeEvent } from "react";

type SelectProps = {
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  value: string;
};

export default function Select({ children, onChange, value }: SelectProps) {
  return (
    <select
      className="block bg-white border border-gray-300 text-gray-900 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-5"
      id="languages"
      name="language"
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange?.(e)}
    >
      {children}
    </select>
  );
}
