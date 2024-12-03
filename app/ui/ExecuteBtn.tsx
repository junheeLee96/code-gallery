"use client";

export default function ExecuteBtn() {
  const onExcuteCode = () => {
    const url = "http://localhost:3001/execute";
    const requestData = {
      language: "go",
      code: 'package main\nimport "fmt"\nfunc main() {\n fmt.Println("Hello, World!")\n}',
    };
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Output:", data.output);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return <button onClick={onExcuteCode}>Start</button>;
}
