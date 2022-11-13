import React, {useEffect, useRef} from "react";

const config = {
  src: "https://utteranc.es/client.js",
  repo: "lowenware/website",
  "issue-term": "pathname",
  theme: "github-light",
  crossOrigin: "anonymous",
  defer: true
};

export const BlogComments: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");

    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value.toString());
    });

    setTimeout(() => {
      if (ref.current) {
        ref.current.append(script);
      }
    }, 300);
  }, [ref]);

  return <div ref={ref} />;
};
