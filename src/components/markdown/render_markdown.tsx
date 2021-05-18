import ReactMarkdown from "react-markdown";
import React from "react";
import Anchor from "./anchor";
import gfm from "remark-gfm";
import Code from "./code";
import Pre from "./pre";

interface IProps {
  markdown?: string,
}

const RenderMarkdown: React.FC<IProps> = ({ markdown }) => {

  return (
    <>
      {markdown && (
        <ReactMarkdown remarkPlugins={[gfm]} components={{
          a: Anchor,
          code: Code,
          pre: Pre,
        }}>
          {markdown}
        </ReactMarkdown>
      )}
    </>
  );
};

export default RenderMarkdown;
