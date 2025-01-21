import { timePeriods } from "@/app/lib/options";
import Select from "../common/Select";
import { ChangeEvent } from "react";

type TimePeriodsProps = {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

export default function TimePeriods({ onChange, value }: TimePeriodsProps) {
  return (
    <Select onChange={onChange} value={value} label="기간">
      {timePeriods.map((period, idx) => (
        <option key={idx} value={period.value}>
          {period.name}
        </option>
      ))}
    </Select>
  );
}
