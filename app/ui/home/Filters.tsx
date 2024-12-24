"use client";

import { useLanguageStore, useSortingStore } from "@/app/providers/zustand";
import Languages from "../common/Languages";
import Sorting from "./Sorting";
import { ChangeEvent, useEffect, useRef } from "react";

export default function Filters() {
  const ref = useRef<null | HTMLDivElement>(null);

  const { sorting, setSorting } = useSortingStore((state) => state);
  const { language, setLanguage } = useLanguageStore((state) => state);
  const onLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const onSortingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSorting(e.target.value);
  };

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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="h-[56px] sticky top-0 " ref={ref}>
      <ul className="flex h-full ">
        <li className="mr-2 flex items-center">
          <Languages
            onChange={onLanguageChange}
            isWholeRender={true}
            value={language}
          />
        </li>
        <li className="flex items-center">
          <Sorting onChange={onSortingChange} value={sorting} />
        </li>
      </ul>
    </div>
  );
}
