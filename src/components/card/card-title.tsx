import classNames from "classnames";

interface CardTitleProps {
  className?: string,
  title?:string,
}

export const CardTitle: React.FC<CardTitleProps> = ({className, title}) => {
  return (
    <>
      <div
        className={classNames(
          "text-h3 text-white",
          className
        )}
      >
        {title}
      </div>
    </>
  );
};
