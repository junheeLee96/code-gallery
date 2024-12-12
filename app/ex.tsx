"use client";

import { useCounterStore } from "./providers/zustand/counter-store-provider";

export default function Zz() {
  const { count, incrementCount, decrementCount } = useCounterStore(
    (state) => state
  );

  return (
    <div>
      Count: {count}
      <hr />
      <button type="button" onClick={() => void incrementCount()}>
        Increment
      </button>
      <button
        type="button"
        onClick={() => void decrementCount()}
        className="ml-5"
      >
        Decrement
      </button>
    </div>
  );
}
