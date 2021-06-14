import Link from "next/link";
import React from "react";

import ToUrl from "src/helpers/slug_to_url";

interface IProps {
  categories: Record<string, number>,
}

const AllCategories: React.FC<IProps> = ({ categories }) => {
  return (
    <ul>
      {Object.entries(categories).sort().map(([category, count]) => (
        <li key={category}>
          <Link href={ToUrl("categories", category)}>
            <a>@{category}</a>
          </Link>
          {` [${count}]`}
        </li>
      ))}
    </ul>
  );
};

export default AllCategories;
