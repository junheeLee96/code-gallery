"use server";

import { z } from "zod";
import pool from "./db";

const createFormSchema = z.object({
  markdownContent: z.string(),
});

export async function createPost(formData: FormData) {
  const { markdownContent } = createFormSchema.parse({
    markdownContent: formData.get("markdownContent"),
  });
  console.log("markdownContent = ", markdownContent);
  const [rows] = await pool.query("SELECT * FROM users");
  console.log(rows);
  //   return NextResponse.json(rows);
}
