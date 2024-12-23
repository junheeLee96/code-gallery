import { db } from "@/app/lib/db";
import { PostTypes } from "@/app/lib/definitions";
// import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post_id = params.id;
  if (!post_id) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }
  try {
    const query = `SELECT * FROM posts WHERE idx = ?`;
    const queryParams = [post_id];
    const data = await db<PostTypes[]>({ query, queryParams });
    console.log("postPost  = ", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
