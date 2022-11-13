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
    case PaginatorButtonType.PrevPage: return [<>&lt;</>, "text-sm hidden sm:flex"];
    case PaginatorButtonType.NextPage: return [<>&gt;</>, "text-sm hidden sm:flex"];
    default: return [`${pageNumber}`, "text-sm"];
    }
  })();

  return (
    <Button
      variant={isCurrent ? "primary" : "highlight"}
      href={link}
      className={className}
    >
      {buttonText}
    </Button>
  );

};
