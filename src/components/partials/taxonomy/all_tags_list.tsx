import Link from "next/link";
import React from "react";

import ToUrl from "src/helpers/slug_to_url";

interface IProps {
  tags: Record<string, number>,
}

const AllTags: React.FC<IProps> = ({ tags }) => {
  return (
    <ul>
      {Object.entries(tags).sort().map(([tag, count]) => (
        <li key={tag}>
          <Link href={ToUrl("tags", tag)}>
            <a>#{tag}</a>
          </Link>
          {` [${count}]`}
        </li>
      ))}
    </ul>
  );
};

export default AllTags;
