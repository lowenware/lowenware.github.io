import Link from "next/link";
import React from "react";

import ToUrl from "src/helpers/slug_to_url";

interface IProps {
  tags?: string[],
}

const Tags: React.FC<IProps> = ({ tags }) => {
  return (
    <>
      {tags && (
        tags.map(tag => (
          <Link key={tag} href={ToUrl("tags", tag)}>
            <a>#{tag} </a>
          </Link>
        ))
      )}
    </>
  );
};

export default Tags;
