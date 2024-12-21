import { db } from "@/app/lib/db";
import { PostTypes } from "@/app/lib/definitions";
// import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const post_id = params.id;
  //   const session = await auth();
  //   const useruuid = session?.user?.id;

  const query = `SELECT * FROM posts WHERE idx = ?`;
  const queryParams = [post_id];
  const data = await db<PostTypes[]>({ query, queryParams });

  return NextResponse.json(data[0]);
}
