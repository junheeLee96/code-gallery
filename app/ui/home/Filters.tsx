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
    <div className="h-[56px] 1200-screen:sticky w-full top-0 rounded-xl flex items-center pl-4">
      <ul className="flex gap-5 w-full flex-1">
        <li className="w-full">
          <Languages
            onChange={onLanguageChange}
            isWholeRender={true}
            value={language}
          />
        </li>
        <li className="w-full">
          <Sorting onChange={onSortingChange} value={sorting} />
        </li>
        <li className="w-full">
          <TimePeriods onChange={onTimePeriodsChange} value={timePeriod} />
        </li>
      </ul>
    </div>
  );
}
