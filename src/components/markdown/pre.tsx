import React from "react";

const Pre: React.FC = (props) => {
  const childType: string = getChildType();

  function getChildType(): string {
    try {
      return (props.children as any)[0].type || "";
    } catch {
      return "";
    }
  }

  return (
    <>
      {childType == "code" ? (
        <div className="highlight">
          <pre>
            {props.children}
          </pre>
        </div>
      ) : (
        <pre>
          {props.children}
        </pre>
      )}
    </>
  );
};

export default Pre;
