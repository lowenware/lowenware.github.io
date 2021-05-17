import React, { useEffect } from "react";


const Comments: React.FC = () => {
  const ref = React.useRef<HTMLElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "lowenware/website");
    script.setAttribute("issue-term","url");
    script.setAttribute("label", "comment");
    script.setAttribute("theme", "github-light");
    script.crossOrigin = "anonymous";
    script.async = true;

    ref.current?.appendChild(script);

    return () => {
      if (ref.current) {
        ref.current.childNodes.forEach(child => {
          ref.current?.removeChild(child);
        });
      }
    };
  }, []);

  return (
    <section className="comments" ref={ref} />
  );
};

export default Comments;
