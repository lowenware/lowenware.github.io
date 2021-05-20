import gfm from "remark-gfm";
import Pre from "./pre";
import React from "react";
import ReactMarkdown from "react-markdown";

import Anchor from "./anchor";
import Code from "./code";

interface IProps {
  markdown?: string,
}

const RenderMarkdown: React.FC<IProps> = ({ markdown }) => {

  return (
    <>
      {markdown && (
        <ReactMarkdown remarkPlugins={[gfm]} components={{
          a: Anchor as React.FC,
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
