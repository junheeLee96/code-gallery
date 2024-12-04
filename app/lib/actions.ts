"use server";

import { z } from "zod";

const createFormSchema = z.object({
  markdownContent: z.string(),
});

export async function createPost(formData: FormData) {
  const { markdownContent } = createFormSchema.parse({
    markdownContent: formData.get("markdownContent"),
  });
  console.log("markdownContent = ", markdownContent);
}
