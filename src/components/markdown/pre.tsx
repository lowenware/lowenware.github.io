import React from "react";

const Pre: React.FC = ({ children}) => {
  const childTag: string = getChildTag();

  function getChildTag(): string {
    try {
      return (children as any)[0].props.node.tagName || "";
    } catch {
      return "";
    }
  }

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
