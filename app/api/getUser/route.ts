import { db } from "@/app/lib/db";
import { User } from "@/app/lib/definitions";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse<User[]>> {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get("uuid") as string;
  const query = `SELECT * FROM users WHERE uuid = ?`;
  const queryParams = [uuid];
  const data = await db<User[]>({ query, queryParams });
  return NextResponse.json(data);
}
