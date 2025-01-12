const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiError extends Error {
  statusCode?: number;
  code?: string;
}

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

export const client = async <T>(
  endPoint: string,
  { params, ...customConfig }: RequestConfig = {}
): Promise<T> => {
  const headers = {
    "Content-Type": "application/json",
    ...customConfig.headers,
  };
  const config: RequestInit = {
    ...customConfig,
    headers,
  };

  const queryString = params ? `?${new URLSearchParams(params)}` : "";
  const url = `${API_URL}${endPoint}${queryString}`;

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) {
      const error = new Error(
        data.message || "요청에 실패했습니다."
      ) as ApiError;
      error.statusCode = response.status;
      error.code = data.code;
      throw error;
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
