export type TimePeriodType = string;

export type TimePeriodState = {
  timePeriod: TimePeriodType;
};

export type timePeriodActions = {
  setTimePeriod: (timePeriod: string) => void;
};

export type timePeriodStore = TimePeriodState & timePeriodActions;
