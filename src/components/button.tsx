import classNames from "classnames";
import Link from "next/link";
import {ReactNode} from "react";

type ButtonVariantEnum = "primary" | "secondary" | "outline" | "highlight";

interface ButtonProps {
  variant?: ButtonVariantEnum,
  children: ReactNode,
  className?: string,
  href?: string,
}

export const Button:React.FC<ButtonProps> = ({
  variant = "primary",
  href,
  children,
  className
})=>{
  const getVariantClassNames = (variant: ButtonVariantEnum) => {
    switch (variant) {
    case "primary":
      return "bg-dark text-white hover:bg-highlight hover:text-white";
    case "secondary":
      return "bg-dark text-white hover:bg-white hover:text-dark";
    case "outline":
      return "border-2 border-white text-white hover:bg-white hover:text-dark";
    case "highlight":
      return "bg-white hover:bg-highlight text-dark hover:text-white";
    }
  };

  const classes = classNames(
    "button uppercase inline-block py-3 px-24 duration-500 rounded-3xl text-sm whitespace-nowrap",
    getVariantClassNames(variant),
    className
  );

  return href ? (
    <Link href={href}>
      <a className={classes}>{children}</a>
    </Link>
  ) : (
    <button className={classes}>{children}</button>
  );
};
