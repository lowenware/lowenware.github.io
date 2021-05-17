import Link from "next/link";
import React from "react";

interface IProps {
  tags?: string[],
}

const Tags: React.FC<IProps> = ({ tags }) => {
  return (
    <>
      {tags && (
        tags.map(tag => (
          <Link key={tag} href={"/tags/" + tag}>
            <a>#{tag} </a>
          </Link>
        ))
      )}
    </>
  );
};

export default Tags;
