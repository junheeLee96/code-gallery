// "use client";

// import React from "react";

// const HighlightJS = ({ code, language }) => {
//   return <Highlight className={language}>{code}</Highlight>;
// };

// const parseContent = (content, language) => {
//   const regex = /```([\s\S]*?)```/g;
//   const parts = content.split(regex);

//   return parts.map((part, index) => {
//     if (index % 2 === 1) {
//       return <HighlightJS key={index} code={part.trim()} language={language} />;
//     }
//     return <pre key={index}>{part}</pre>;
//   });
// };

// export default function Content({ language, text }) {
//   return (
//     <div style={{ color: "white", position: "absolute" }}>
//       {parseContent(text, language)}
//     </div>
//   );
// }
