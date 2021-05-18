import React from "react";

const Pre: React.FC = ({ children}) => {
  const childTag: string = children[0].props.node.tagName || "";

  return (
    <>
      {childTag == "code" ? (
        <div className="highlight">
          {children}
        </div>
      ) : (
        <pre>
          {children}
        </pre>
      )}
    </>
  );
};

export default Pre;
