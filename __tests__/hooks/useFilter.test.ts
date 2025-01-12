import useFilter from "@/app/hooks/useFilter";
import {
  useLanguageStore,
  useSortingStore,
  useTimePeriodStore,
} from "@/app/providers/zustand";
import { renderHook } from "@testing-library/react";
import { act } from "react";

jest.mock("@/app/providers/zustand", () => ({
  useLanguageStore: jest.fn(),
  useSortingStore: jest.fn(),
  useTimePeriodStore: jest.fn(),
}));

describe("useFilter 훅 테스트", () => {
  const mockSetLanguage = jest.fn();
  const mockSetSorting = jest.fn();
  const mockSetTimePeriod = jest.fn();

  beforeEach(() => {
    (useLanguageStore as jest.Mock).mockReturnValue({
      language: "en",
      setLanguage: mockSetLanguage,
    });
    (useSortingStore as jest.Mock).mockReturnValue({
      sorting: "newest",
      setSorting: mockSetSorting,
    });
    (useTimePeriodStore as jest.Mock).mockReturnValue({
      timePeriod: "daily",
      setTimePeriod: mockSetTimePeriod,
    });
  });

  it("초기 상태를 올바르게 반환함", () => {
    const { result } = renderHook(() => useFilter());

    expect(result.current.timePeriod).toBe("daily");
    expect(result.current.sorting).toBe("newest");
    expect(result.current.language).toBe("en");
  });

  it("언어 변경 함수를 올바르게 호출함", () => {
    const { result } = renderHook(() => useFilter());
    const event = { target: { value: "ko" } };

    act(() => {
      result.current.onLanguageChange(event);
    });

    expect(mockSetLanguage).toHaveBeenCalledWith("ko");
  });

  it("정렬 방식 변경 함수를 올바르게 호출함", () => {
    const { result } = renderHook(() => useFilter());
    const event = { target: { value: "oldest" } };

    act(() => {
      result.current.onSortingChange(event);
    });

    expect(mockSetSorting).toHaveBeenCalledWith("oldest");
  });

  it("기간 변경 함수를 올바르게 호출함", () => {
    const { result } = renderHook(() => useFilter());
    const event = { target: { value: "weekly" } };

    act(() => {
      result.current.onTimePeriodsChange(event);
    });

    expect(mockSetTimePeriod).toHaveBeenCalledWith("weekly");
  });
});
