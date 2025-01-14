"use client";

import Languages from "../common/Languages";
import Sorting from "./Sorting";
import TimePeriods from "./TimePeriods";
import useFilter from "@/app/hooks/useFilter";

export default function Filters() {
  const {
    timePeriod,
    sorting,
    language,
    onLanguageChange,
    onSortingChange,
    onTimePeriodsChange,
  } = useFilter();

  return (
    <div className="h-[56px] lg:sticky relative top-0 rounded-xl flex items-center pl-4 bg-transparent">
      <ul className="flex gap-5">
        <li className="">
          <Languages
            onChange={onLanguageChange}
            isWholeRender={true}
            value={language}
          />
        </li>
        <li>
          <Sorting onChange={onSortingChange} value={sorting} />
        </li>
        <li>
          <TimePeriods onChange={onTimePeriodsChange} value={timePeriod} />
        </li>
      </ul>
    </div>
  );
}
