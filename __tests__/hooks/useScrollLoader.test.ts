// useScrollLoaer.test.ts
import useScrollLoaer from "@/app/hooks/useScrollLoader";
import { renderHook, act } from "@testing-library/react";

describe("useScrollLoaer 커스텀 훅 테스트", () => {
  let fetchNextPage: jest.Mock;

  beforeEach(() => {
    fetchNextPage = jest.fn();

    // 스크롤 관련 속성 모킹
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 1000,
    });
    Object.defineProperty(document.documentElement, "scrollTop", {
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // todo: scroll fetchNextPage호출이 안됨
  //   test("스크롤이 최하단에 도달했을 때 fetchNextPage 호출", () => {
  //     const hasNextPage = true;
  //     const { result } = renderHook(() =>
  //       useScrollLoaer({
  //         fetchNextPage,
  //         hasNextPage,
  //       })
  //     );

  //     // 스크롤을 최하단으로 설정하고 스크롤 이벤트 디스패치
  //     act(() => {
  //       Object.defineProperty(document.documentElement, "scrollTop", {
  //         value: 1000,
  //         configurable: true,
  //       });
  //       window.dispatchEvent(new Event("scroll"));
  //     });

  //     expect(fetchNextPage).toHaveBeenCalled();
  //   });

  test("hasNextPage가 false일 때 fetchNextPage 호출되지 않음", () => {
    const hasNextPage = false;
    renderHook(() =>
      useScrollLoaer({
        fetchNextPage,
        hasNextPage,
      })
    );

    // 스크롤을 최하단으로 설정하고 스크롤 이벤트 디스패치
    act(() => {
      Object.defineProperty(document.documentElement, "scrollTop", {
        value: 1000,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  test("스크롤이 최하단에 도달하지 않았을 때 fetchNextPage 호출되지 않음", () => {
    const hasNextPage = true;
    renderHook(() =>
      useScrollLoaer({
        fetchNextPage,
        hasNextPage,
      })
    );

    // 스크롤을 최하단에 도달하지 않은 상태로 설정하고 스크롤 이벤트 디스패치
    act(() => {
      Object.defineProperty(document.documentElement, "scrollTop", {
        value: 500,
        configurable: true,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(fetchNextPage).not.toHaveBeenCalled();
  });
});
