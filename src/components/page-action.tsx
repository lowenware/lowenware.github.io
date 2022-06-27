import classNames from "classnames";
import {ReactNode} from "react";

import {Button} from "./button";

interface PageActionProps {
  className?: string,
  action: string,
  link: string,
  children: ReactNode,
}

export const PageAction: React.FC<PageActionProps> = ({className, children, action, link}) => {
  return (
    <div className={classNames("w-full max-w-screen-lg mx-auto bg-dark mt-32", className)}>
      <div className={
        classNames(
          "flex flex-col p-48 items-center justify-center space-y-48",
          "sm:flex-row md:h-144 sm:space-y-0 sm:space-x-48"
        )
      }>
        <div className="text-white flex-grow text-lg text-center sm:text-left">{children}</div>
        <Button variant="outline" href={link}>{action}</Button>
      </div>
    </div>
  );
};
