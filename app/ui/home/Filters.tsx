"use client";

import Languages from "../common/Languages";
import Sorting from "./Sorting";
import { useEffect, useRef } from "react";
import TimePeriods from "./TimePeriods";
import useFilter from "@/app/hooks/useFilter";

export default function Filters() {
  const ref = useRef<null | HTMLDivElement>(null);
  const {
    timePeriod,
    sorting,
    language,
    onLanguageChange,
    onSortingChange,
    onTimePeriodsChange,
  } = useFilter();

  const onScroll = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.top <= 0) {
      ref.current.style.backgroundColor = "rgb(238, 240, 244)";
    } else {
      ref.current.style.backgroundColor = "white";
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = "white";
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="h-[56px] lg:sticky relative top-0 rounded-xl flex items-center pl-4"
      ref={ref}
    >
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
          <Sorting onChange={onSortingChange} value={sorting} />
        </li>
        <li>
          <TimePeriods onChange={onTimePeriodsChange} value={timePeriod} />
        </li>
      </ul>
    </div>
  );
}
