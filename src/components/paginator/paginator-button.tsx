import classNames from "classnames";

import {Button} from "~/components/button";

export enum PaginatorButtonType {
  Normal,
  PrevPage,
  NextPage,
  Placeholder,
}

interface PaginatorButtonProps {
  linkType: PaginatorButtonType,
  pageNumber?: number,
  link: string,
  isCurrent: boolean,
}

export const PaginatorButton: React.FC<PaginatorButtonProps> = ({
  linkType,
  pageNumber,
  link,
  isCurrent,
}) => {
  if (!pageNumber) {
    if (linkType == PaginatorButtonType.Placeholder) {
      return <span className="text-white">{"..."}</span>;
    }
  }

  const [buttonText, className] = (() => {
    switch (linkType) {
    case PaginatorButtonType.PrevPage: return [<>&lt;</>, "text-small hidden sm:flex"];
    case PaginatorButtonType.NextPage: return [<>&gt;</>, "text-small hidden sm:flex"];
    default: return [`${pageNumber}`, "text-small"];
    }
  })();

  return (
    <Button
      variant={isCurrent ? "primary" : "outline"}
      href={link}
      className={classNames(className,"rounded-none",
        isCurrent ? "px-16"
          :"text-dark border border-dark-super py-3 px-16 hover:text-white hover:bg-dark-super")}
    >
      {buttonText}
    </Button>
  );

};
