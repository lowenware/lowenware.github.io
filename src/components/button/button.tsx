import classNames from "classnames";
import Link from "next/link";
import {ReactNode} from "react";

type ButtonVariantEnum = "primary" | "secondary" | "outline";

interface ButtonProps {
  variant?: ButtonVariantEnum,
  children: ReactNode,
  className?: string,
  href: string,
  isLink?:boolean,
}

export const Button:React.FC<ButtonProps> = ({href ,children,variant = "primary",className, isLink = true})=>{
  const getVariantClassNames = (variant: ButtonVariantEnum) => {
    switch (variant) {
    case "primary":
      return "bg-dark-super border-dark-super text-white hover:bg-white hover:text-dark-super";
    case "secondary":
      return "";
    case "outline":
      return "border-white text-white hover:bg-white hover:text-dark";
    }
  };

  const classes = classNames(
    "border-2 py-3 px-24 duration-500 rounded-3xl",
    getVariantClassNames(variant),
    className
  );

  if(isLink){
    return <Link href={href}>
      <a className={classes}>{children}</a>
    </Link>;
  }
  if(!isLink){
    return <a className={classes}>{children}</a>;
  }
  return<></>;
};
