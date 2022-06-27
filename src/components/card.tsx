import classNames from "classnames";
import Link from "next/link";
import {ReactNode} from "react";

interface CardProps {
  className?: string,
  href?: string,
  children: ReactNode,
}

export const Card: React.FC<CardProps> = ({className, children, href}) => {
  const defaultClasses = "card flex flex-col bg-grey";
  return href ? (
    <Link href={href}>
      <a className={classNames(defaultClasses, "block", className)}>
        {children}
      </a>
    </Link>
  ) : (
    <div className={classNames(defaultClasses, className)}>
      {children}
    </div>
  );
};
