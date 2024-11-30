import { render, waitFor } from "@testing-library/react";
import { getUserInfo } from "@/app/lib/data";
import CallbackPage from "@/app/oauth/google/page";

// Mock getUserInfo
jest.mock("@/app/lib/data");

describe("CallbackPage", () => {
  const mockGetUserInfo = getUserInfo as jest.MockedFunction<
    typeof getUserInfo
  >;

  beforeEach(() => {
    // Reset mocks before each test
    mockGetUserInfo.mockReset();
    window.localStorage.clear();
  });

  it("토큰이 유효하면 로컬스토리지에 저장함", async () => {
    window.location.hash = "#access_token=valid_token";

    mockGetUserInfo.mockResolvedValue({ isValid: true });
    render(<CallbackPage />);
    await waitFor(() => {
      expect(mockGetUserInfo).toHaveBeenCalledWith("valid_token");
      expect(localStorage.getItem("token")).toBe("valid_token");
    });
  });

  it("토큰이 유효하지 않으면 로컬스토리지에 저장을 안함", async () => {
    window.location.hash = "#access_token=invalid_token";

    mockGetUserInfo.mockResolvedValue({ isValid: false });

    render(<CallbackPage />);
    await waitFor(() => {
      expect(mockGetUserInfo).toHaveBeenCalledWith("invalid_token");
      expect(localStorage.getItem("token")).toBeNull();
    });
  });

  it("url에 토큰이 없으면 getUserInfo를 실행하지 않음", async () => {
    window.location.hash = "";

    render(<CallbackPage />);

    await waitFor(() => {
      expect(mockGetUserInfo).not.toHaveBeenCalled();
    });
  });
});
