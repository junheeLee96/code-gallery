/**
 * @jest-environment node
 */

import { handlers } from "@/auth";
import { GET, POST } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest } from "next/server";

jest.mock("@/auth", () => ({
  handlers: {
    GET: jest.fn(),
    POST: jest.fn(),
  },
}));

describe("NextAuth API Route", () => {
  it("should export GET handler from auth handlers", () => {
    expect(GET).toBe(handlers.GET);
  });

  it("should export POST handler from auth handlers", () => {
    expect(POST).toBe(handlers.POST);
  });

  it("should call GET handler when invoked", async () => {
    const mockRequest = new NextRequest(
      "http://localhost:3000/api/auth/signin"
    );
    await GET(mockRequest);
    expect(handlers.GET).toHaveBeenCalledWith(mockRequest);
  });

  it("should call POST handler when invoked", async () => {
    const mockRequest = new NextRequest(
      "http://localhost:3000/api/auth/signin",
      {
        method: "POST",
        body: JSON.stringify({ csrfToken: "mockToken" }),
      }
    );
    await POST(mockRequest);
    expect(handlers.POST).toHaveBeenCalledWith(mockRequest);
  });
});
