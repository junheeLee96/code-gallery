"use server";

import { getPosts } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  //   const data = await getPosts();

  return NextResponse.json([]);
}
