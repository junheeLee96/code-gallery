import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  console.log("zzzzzz = ", session);
  return NextResponse.json([]);
}
