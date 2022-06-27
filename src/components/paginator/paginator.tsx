import classNames from "classnames";

import {PaginatorButton, PaginatorButtonType} from "./paginator-button";

interface PaginatorProps {
  page: number,
  totalPages: number,
  root: string,
  className?: string,
}

export const Paginator: React.FC<PaginatorProps> = ({
  page,
  totalPages,
  root,
  className,
}) => {
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const pageLinks = [];

  if (hasPreviousPage) {
    pageLinks.push({
      linkType: PaginatorButtonType.PrevPage,
      pageNumber: page - 1,
    });
  }

  if (totalPages > 0) {
    pageLinks.push({linkType: PaginatorButtonType.Normal, pageNumber: 1});
  }

  if (page > 4) {
    pageLinks.push({linkType: PaginatorButtonType.Placeholder});
  }

  let from = 2;
  if (from < page - 1 && page !== 4) {
    from = page - 1;
  }
  let to = from + (page === 4 || page === totalPages - 3 ? 4 : 3);
  if (to > totalPages) {
    to = totalPages;
  }

  const linksCount = to - from;

  if (linksCount > 0) {
    Array(linksCount)
      .fill(0)
      .map((_, i) => {
        pageLinks.push({
          linkType: PaginatorButtonType.Normal,
          pageNumber: from + i,
        });
      });
  }
  if (page < totalPages - 3) {
    pageLinks.push({linkType: PaginatorButtonType.Placeholder});
  }

  if (totalPages > 1) {
    pageLinks.push({
      linkType: PaginatorButtonType.Normal,
      pageNumber: totalPages,
    });
  }

  if (hasNextPage) {
    pageLinks.push({
      linkType: PaginatorButtonType.NextPage,
      pageNumber: page + 1,
    });
  }

  return (
    <div
      className={classNames("mx-auto font-bold flex items-center justify-center space-x-8",
        className,)}
    >
      {pageLinks.map((link, index) => (
        <PaginatorButton
          key={index}
          linkType={link.linkType}
          pageNumber={link.pageNumber}
          link={`${root}/${link.pageNumber}`}
          isCurrent={link.pageNumber == page}
        />
      ))}
    </div>
  );
};
