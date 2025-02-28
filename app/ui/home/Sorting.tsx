"use client";

import { sortings } from "@/app/lib/options";
import Select from "../common/Select";
import { ChangeEvent } from "react";

type SortingProps = {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

export default function Sorting({ value, onChange }: SortingProps) {
  return (
    <Select onChange={onChange} value={value} label="정렬" name="sorting">
      {sortings.map((sort, idx) => (
        <option key={idx} value={sort.value}>
          {sort.name}
        </option>
      ))}
    </Select>
  );
}
