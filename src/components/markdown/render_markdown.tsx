import ReactMarkdown from "react-markdown";
import React from "react";
import Anchor from "./anchor";

interface IProps {
  markdown?: string,
}

// TODO: add plugin https://remarkjs.github.io/react-markdown/


const RenderMarkdown: React.FC<IProps> = ({ markdown }) => {

  return (
    <>
      {markdown && (
        <ReactMarkdown components={{
          a: Anchor,
        }}>
          {markdown}
        </ReactMarkdown>
      )}
    </>
  );
};

export default RenderMarkdown;
