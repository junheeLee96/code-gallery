import { timePeriods } from "@/app/lib/options";
import { useTimePeriodStore } from "@/app/providers/zustand/timePeriods-store-provider";

export default function TimePeriods() {
  const { timePeriod, setTimePeriod } = useTimePeriodStore((state) => state);
  console.log(timePeriod);
  return <div></div>;
}
