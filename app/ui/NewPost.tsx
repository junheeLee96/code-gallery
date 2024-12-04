// import { FormEvent } from "react";
// import { ChangeEvent, useEffect, useState } from "react";
// import Dialog from "./Dialog";
// import Highlight from "react-highlight";
import PostWrapper from "./PostWrapper";
// import CustomEditor from "./CustomEditor";
// import Textarea from "./TextArea";
import Link from "next/link";

export default function NewPost() {
  // const onSubmit = (event: FormEvent) => {
  //   event.preventDefault();
  //   const form = event.target as HTMLFormElement;
  //   const formData = new FormData(form);
  //   const markdownContent = formData.get("markdownContent");
  //   console.log(markdownContent);
  //   // todo: post를 db에 저장하기
  // };

  return (
    <PostWrapper>
      <Link
        href="/post"
        className="w-full h-[60px] flex items-center"
        // popoverTarget="newPost"
        // popoverTargetAction="toggle"
      >
        포스트 올리기
      </Link>

      {/* <Dialog id="newPost">
        <form onSubmit={onSubmit}>
          <div className="w-dialog-width g:w-[660px] max-h-[700px] scroll">
            <div className="w-full ">게시물 만들기</div>
            <Textarea />
            <button>제출하기 ㅋㅋㅋ</button>
          </div>
        </form>
      </Dialog> */}
    </PostWrapper>
  );
}
