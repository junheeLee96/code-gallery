// "use server";

import pool from "./db";
import { User } from "./definitions";

// import { z } from "zod";
// // import pool from "./db";

// // const createFormSchema = z.object({
// //   markdownContent: z.string(),
// // });

// export async function createPost(formData: FormData) {
//   //   console.log(process.env.DB_HOST);
//   //   const { markdownContent } = createFormSchema.parse({
//   //     markdownContent: formData.get("markdownContent"),
//   //   });
//   //   const [rows] = await pool.query("SELECT * FROM users");
//   //   console.log(rows);
//   //   return NextResponse.json(rows);
// }

export async function createNewUser(user: User) {
  const query = `
        INSERT INTO users (uuid, user_name, email, image)
        VALUES (?, ?, ?, ?)
    `;

  // `pool.query`에 쿼리와 파라미터를 전달합니다.
  const values = [user.uuid, user.user_name, user.email, user.image];

  try {
    await pool.query(query, values);

    return true;
  } catch (err) {
    console.error("Error inserting new user:", err);
    throw new Error("Cannot insert new user into the database");
  }
}
