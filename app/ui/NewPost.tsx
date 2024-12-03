"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Dialog from "./Dialog";
// import Highlight from "react-highlight";
import PostWrapper from "./PostWrapper";
// import CustomEditor from "./CustomEditor";
import Textarea from "./TextArea";

export default function NewPost() {
  const [language, setLanguage] = useState("javascript");
  const [content, setContent] = useState("");
  const [code, setCode] = useState("console.log()");

  const onChange = (e) => {
    setCode(e); // CodeMirror의 값이 변할 때마다 호출되어서 값이 저장된다.
  };
  const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    // setContent(value);
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
        <div className="w-dialog-width g:w-[660px]">
          <div className="w-full ">게시물 만들기</div>
          <Textarea />
        </div>
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
