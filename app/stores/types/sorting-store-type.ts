export type SortingType = string;

export type SortingState = {
  sorting: SortingType;
};

export type SortingeActions = {
  setSorting: (sort: string) => void;
};

export type SortingStore = SortingState & SortingeActions;
