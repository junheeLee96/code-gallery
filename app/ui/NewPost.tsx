"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Dialog from "./Dialog";
// import Highlight from "react-highlight";
import PostWrapper from "./PostWrapper";
// import CustomEditor from "./CustomEditor";
import Textarea from "./TextArea";

export default function NewPost() {
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const markdownContent = formData.get("markdownContent");
    console.log(markdownContent);
    // todo : post를 db에 저장하기
  };

  return (
    <PostWrapper>
      <button
        className="w-full h-[60px] flex items-center"
        popoverTarget="newPost"
        popoverTargetAction="toggle"
      >
        포스트 올리기
      </button>

      <Dialog id="newPost">
        <form onSubmit={onSubmit}>
          <div className="w-dialog-width g:w-[660px] max-h-[700px] scroll">
            <div className="w-full ">게시물 만들기</div>
            <Textarea />
            <button>제출하기 ㅋㅋㅋ</button>
          </div>
        </form>
        {/* <div className="relative w-full h-[500px] flex flex-col">
          <textarea
            spellCheck="false"
            wrap="soft"
            placeholder="오늘은 어떤 멍청한 코드를 작성했나요"
            // className=""
            onChange={onPostChange}
          />
          <ReactCodeMirror
            className="CodeMirror"
            lineNumber={true}
            value={code} // 입력된 값을 code라는 변수에 담았다
            extensions={[javascript({ jsx: true })]} // 입력값의 종류
            onChange={onChange} //값이 변할때마다 호출되는 함수
            theme={okaidia} // 테마
            gutter={true} // 자동생성
          />
        </div> */}
      </Dialog>
    </PostWrapper>
  );
}
