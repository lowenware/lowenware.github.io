import classNames from "classnames";
import {ReactNode} from "react";

type Variant = "full" | "short";

interface SlideProps {
  variant?: Variant,
  className?: string,
  background: string,
  children: ReactNode,
}

export const Slide: React.FC<SlideProps> = ({
  variant = "short",
  className,
  background,
  children
}) => {
  return (
    <div
      className={classNames(
        variant === "full" ? "h-slide" : "h-144",
        "slide relative w-full flex items-center shadow-sm",
        "bg-cover bg-no-repeat bg-center",
        className,
      )}
      style={{backgroundImage: `url('/slides/${background}')`}}
    >
      {children}
    </div>
  );
};
