import classNames from "classnames";
import {ReactNode} from "react";

interface GridProps {
  className?: string,
  children: ReactNode,
}

export const Grid: React.FC<GridProps> = ({className, children}) => {
  return (
    <div className={classNames("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-24", className)}>
      {children}
    </div>
  );
};
