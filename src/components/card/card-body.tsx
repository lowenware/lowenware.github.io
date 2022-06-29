import classNames from "classnames";
import {ReactNode} from "react";

interface CardProps {
  className?: string,
  children: ReactNode,
}

export const CardBody: React.FC<CardProps> = ({className, children}) => {
  return (
    <>
      <div
        className={classNames(
          "flex flex-col space-y-24",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};
