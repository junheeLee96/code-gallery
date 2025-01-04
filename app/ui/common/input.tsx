"use client";

import { ChangeEvent } from "react";

type InputProps = {
  title: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function Input({
  title,
  onInputChange,
  placeholder,
}: InputProps) {
  return (
    <input
      type="text"
      value={title}
      placeholder={placeholder ? placeholder : ""}
      onChange={onInputChange}
      className="w-full border border-gray-200 rounded p-1 mt-2"
    />
  );
}
