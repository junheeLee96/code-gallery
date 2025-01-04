import { createStore } from "zustand/vanilla";
import {
  TimePeriodState,
  timePeriodStore,
} from "./types/timePeriods-store-type";

export const initTimePeriodStore = (): TimePeriodState => {
  return { timePeriod: "whole" };
};

export const defaultInitState: TimePeriodState = {
  timePeriod: "whole",
};

export const createTimePeriodStore = (
  initState: TimePeriodState = defaultInitState
) => {
  return createStore<timePeriodStore>()((set) => ({
    ...initState,
    setTimePeriod: (timePeriod: string) =>
      set((state) => ({ ...state, timePeriod: timePeriod })),
  }));
};
