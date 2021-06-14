import NextHead from "next/head";
import React from "react";

import IMetadata from "src/interfaces/page/metadata";

interface IProps {
  slug: string[],
  metadata?: IMetadata,
}

const Head: React.FC<IProps> = ({ slug, metadata }) => {
  return (
    <NextHead>
    {metadata?.title && (
      <title>
        {metadata.title + ((slug.length === 1 && slug[0] === "home") ? "" : " - Löwenware")}
      </title>
    )}
  </NextHead>
  );
};

export default Head;
