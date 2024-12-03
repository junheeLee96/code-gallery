"use server";

export const getUserInfo = async (token: string) => {
  //todo: 사용자 db저장
  try {
    const res = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token,
      {
        headers: {
          authorization: `token ${token}`,
          accept: "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.id) {
      return {
        data,
        isValid: true,
      };
    }
    return { isValid: false };
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof Error) {
      throw e;
    } else {
      throw new Error(typeof e === "string" ? e : "An unknown error occurred");
    }
  }
};

export default async function getPosts(category: string) {}
