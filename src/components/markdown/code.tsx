import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import codeStyle from "react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark";
import React from "react";

interface IProps {
  className?: string,
}

const Code: React.FC<IProps> = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || "");

  return (
    <>
      {match ? (
        <SyntaxHighlighter style={codeStyle} language={match[1]}>
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code>{children}</code>
      )}
    </>
  );
};

export default Code;
