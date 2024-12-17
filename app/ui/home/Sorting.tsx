"use client";

import { sortings } from "@/app/lib/options";
import Select from "../common/Select";
import { ChangeEvent } from "react";
import { useSortingStore } from "@/app/providers/zustand/sorting-store.provider";

type SortingProps = {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

export default function Sorting({ value, onChange }: SortingProps) {
  return (
    <Select onChange={onChange} value={value}>
      {sortings.map((sort, idx) => (
        <option key={idx} value={sort.value}>
          {sort.name}
        </option>
      ))}
    </Select>
  );
}
