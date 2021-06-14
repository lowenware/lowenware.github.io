import React from "react";

interface IProps {
  slug: string[],
}

const Breadcrumbs: React.FC<IProps> = ({ slug }) => {
  return (
    <div className="breadcrumbs">
      {slug[0] && (
        <span key={slug[0]} className="active">
          <a href={"/" + slug[0]}>{slug[0]}</a> /
        </span>
      )}
    </div>
  );
};

export default Breadcrumbs;
