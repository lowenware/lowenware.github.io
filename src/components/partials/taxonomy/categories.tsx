import Link from "next/link";
import React from "react";

interface IProps {
  categories?: string[],
}

const Categories: React.FC<IProps> = ({ categories }) => {
  return (
    <>
      {categories && (
        [...categories].sort().map(category => (
          <Link key={category} href={"/categories/" + category}>
            <a>@{category} </a>
          </Link>
        ))
      )}
    </>
  );
};

export default Categories;
