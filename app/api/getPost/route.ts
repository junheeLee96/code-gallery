import { db } from "@/app/lib/db";
import { PostTypes } from "@/app/lib/definitions";
import { ResultSetHeader } from "mysql2";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<PostTypes[] | { error: string }>> {
  const { searchParams } = new URL(request.url);
  const post_id = searchParams.get("post_id");
  if (!post_id) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }
  const session = await auth();
  console.log("user:", session);
  const useruuid = session?.user?.id;
  try {
    const query = `SELECT * FROM posts WHERE idx = ?`;
    const queryParams = [post_id];
    const data = await db<(PostTypes & { uuid: string })[]>({
      query,
      queryParams,
    });
    if (data.length === 0) {
      return NextResponse.json({ error: "Not Exist post" }, { status: 404 });
    }

    const initialLike = await isLike(post_id, useruuid);
    const fommattingData = data.map(({ uuid, ...post }) => ({
      ...post,
      initialLike,
    }));

    return NextResponse.json(fommattingData);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

async function isLike(post_id: string, uuid: string | undefined) {
  if (!uuid) return false;

  const query = "SELECT * FROM likes WHERE post_id = ? AND uuid = ? ;";
  const queryParams = [post_id, uuid];
  const likeData = await db<ResultSetHeader[]>({ query, queryParams });
  if (likeData.length > 0) return true;
  return false;
}
