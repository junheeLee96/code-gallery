"use client";

import { sortings } from "@/app/lib/options";
import Select from "../common/Select";

export default function Sorting() {
  return (
    <Select>
      {sortings.map((sort, idx) => (
        <option key={idx} value={sort.value}>
          {sort.name}
        </option>
      ))}
    </Select>
  );
}
