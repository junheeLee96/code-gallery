interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  id,
  value,
  onChange,
  name,
  label,
  placeholder,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm  mt-4">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        placeholder={placeholder ? placeholder : ""}
        onChange={onChange}
        className="w-full border border-gray-200 rounded p-1 mt-2 bg-white dark:bg-dark-bg dark:border-black"
      />
    </div>
  );
}
