export type TimePeriodType = string;

export type TimePeriodState = {
  timePeriod: TimePeriodType;
};

export type timePeriodActions = {
  setTimePeriod: (period: string) => void;
};

export type TimePeriodStore = TimePeriodState & timePeriodActions;
