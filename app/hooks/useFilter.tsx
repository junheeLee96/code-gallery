"use client";

import { ChangeEvent } from "react";
// import {
//   useLanguageStore,
//   useSortingStore,
//   useTimePeriodStore,
// } from "../providers/zustand";

export default function useFilter() {
  // const { timePeriod, setTimePeriod } = useTimePeriodStore((state) => state);
  // const { sorting, setSorting } = useSortingStore((state) => state);
  // const { language, setLanguage } = useLanguageStore((state) => state);

  const onLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    // setLanguage(e.target.value);
  };

  const onSortingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    // setSorting(e.target.value);
  };

  const onTimePeriodsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    // setTimePeriod(e.target.value);
  };

  return {
    // timePeriod,
    // sorting,
    // language,
    onLanguageChange,
    onSortingChange,
    onTimePeriodsChange,
  };
}
