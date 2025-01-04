import { createStore } from "zustand/vanilla";
import {
  TimePeriodState,
  TimePeriodStore,
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
  return createStore<TimePeriodStore>()((set) => ({
    ...initState,
    setTimePeriod: (period) =>
      set((state) => ({ ...state, timePeriod: period })),
  }));
};
