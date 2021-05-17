import Link from "next/link";
import React from "react";

interface IProps {
  href: string,
}

// TODO: parameters
const Anchor: React.FC<IProps> = ({ children, href}) => {

  return (
    <>
      {href.startsWith("/") ? (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      ): (
        <a href={href}>{children}</a>
      )}
    </>
  );
};

export default Anchor;
