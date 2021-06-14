import Link from "next/link";
import React from "react";

import ToUrl from "src/helpers/slug_to_url";

interface IProps {
  categories?: string[],
}

const Categories: React.FC<IProps> = ({ categories }) => {
  return (
    <>
      {categories && (
        [...categories].sort().map(category => (
          <Link key={category} href={ToUrl("categories", category)}>
            <a>@{category} </a>
          </Link>
        ))
      )}
    </>
  );
};

export default Categories;
