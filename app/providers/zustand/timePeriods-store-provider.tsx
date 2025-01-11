// "use client";

// import {
//   createTimePeriodStore,
//   initTimePeriodStore,
// } from "@/app/stores/timePeriod-store";
// import { TimePeriodStore } from "@/app/stores/types/timePeriods-store-type";
// import { createContext, ReactNode, useContext, useRef } from "react";
// import { useStore } from "zustand";

// export type TimePeriodStoreApi = ReturnType<typeof createTimePeriodStore>;

// export const TimePeriodStoreContext = createContext<
//   TimePeriodStoreApi | undefined
// >(undefined);

// export interface TimePeriodStoreProviderProps {
//   children: ReactNode;
// }

// export const TimePeriodStoreProvider = ({
//   children,
// }: TimePeriodStoreProviderProps) => {
//   const storeRef = useRef<TimePeriodStoreApi>();
//   if (!storeRef.current) {
//     storeRef.current = createTimePeriodStore(initTimePeriodStore());
//   }

//   return (
//     <TimePeriodStoreContext.Provider value={storeRef.current}>
//       {children}
//     </TimePeriodStoreContext.Provider>
//   );
// };

// export const useTimePeriodStore = <T,>(
//   selector: (store: TimePeriodStore) => T
// ): T => {
//   const timePeriodStoreContext = useContext(TimePeriodStoreContext);

//   if (!timePeriodStoreContext) {
//     throw new Error(`useCounterStore must be used within CounterStoreProvider`);
//   }

//   return useStore(timePeriodStoreContext, selector);
// };
