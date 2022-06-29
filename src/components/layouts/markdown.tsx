import hljs from "highlight.js";
import md from "markdown-it";
import {useEffect} from "react";

interface MarkdownProps {
  className?: string,
  content?: string,
  tag?: "div" | "article" | "main",
  patchHtml?: (html: string) => string,
}

export const Markdown: React.FC<MarkdownProps> = ({className, content, patchHtml, tag="div"}) => {
  useEffect(() => {
    const buttons = document.querySelectorAll(".syntax button");
    buttons.forEach(b => b.addEventListener("click", e => {
      const syntax = (e.target as Element)?.parentNode;
      syntax?.childNodes.forEach(n => {
        if (n.nodeName.toLowerCase() === "code" && n.textContent) {
          navigator.clipboard.writeText(n.textContent);
          b.classList.add("copied");
        }
      });
    }));
  }, []);

  if (!content) {
    return null;
  }

  let html = md({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return [
            "<pre class=\"syntax\">",
            "<button class=\"button\">Copy</button>",
            "<code>",
            hljs.highlight(str, {language: lang, ignoreIllegals: true}).value,
            "</code>",
            "</pre>"
          ].join("");
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("Can't highlight syntax", e);
        }
      }

      return "<pre class=\"syntax\"><code>" + md().utils.escapeHtml(str) + "</code></pre>";
    }
  }).render(content);

  if (patchHtml) {
    html = patchHtml(html);
  }

  return (
    <>
      {tag === "div" && (<div className={className} dangerouslySetInnerHTML={{__html: html}} />)}
      {tag === "article" && (
        <article className={className} dangerouslySetInnerHTML={{__html: html}} />
      )}
      {tag === "main" && (<main className={className} dangerouslySetInnerHTML={{__html: html}} />)}
    </>
  );
};
