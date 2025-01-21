import { ChangeEvent } from "react";

type SelectProps = {
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  value: string;
  label: string;
};

export default function Select({
  children,
  onChange,
  value,
  label,
}: SelectProps) {
  return (
    <div>
      <label
        htmlFor="languages"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <select
        className="block bg-white border border-gray-300 text-gray-900 py-2 px-4 pr-8 rounded leading-tight 
        focus:outline-none focus:bg-white focus:border-gray-500 
        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:focus:bg-gray-800 dark:focus:border-gray-400
        w-full "
        id="languages" // 반드시 label의 for와 동일한 값이어야 함
        name="language"
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange?.(e)}
      >
        {children}
      </select>
    </div>
  );
}
