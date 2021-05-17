import React from "react";
import IMetadata from "src/interfaces/page/metadata";
import path from "path";
import AllCategories from "src/components/blog/taxonomy/categories";
import AllTags from "src/components/blog/taxonomy/tags";
import IPageProps from "src/interfaces/page/page-props";
import RenderMarkdown from "../markdown/render_markdown";
import Link from "next/link";
import Tags from "../partials/taxonomy/tags";
import Categories from "../partials/taxonomy/categories";
import FormattedDate from "../partials/date";
import ToUrl from "src/helpers/slug_to_url";

const BlogLayout: React.FC<IPageProps> = ({ page, props, children }) => {
  const {
    title,
  } = page.metadata;
  const {
    allCategories,
    allTags,
    pages,
  } = props;

  return (
    <div className="text-content blog-content">
      <aside className="aside">
        <h1>{title}</h1>

        {children}

        <div className="taxonomies">
          <div className="title">Categories</div>
          <AllCategories categories={allCategories!} />

          <div className="title">Tags</div>
          <AllTags tags={allTags!} />
        </div>
      </aside>

      <div className="content">
        {pages && (
          pages.map(({ slug, metadata, content }, i) => (
            <article key={i} className="article">
              <div className="taxonomy">
                <span className="timestamp">
                  <FormattedDate date={metadata.date} />
                </span>
                {" – "}
                <Categories categories={metadata.categories} />
                {" / "}
                <Tags tags={metadata.tags} />
              </div>
              <h1>
                <Link href={ToUrl(...slug)}>
                  <a>{metadata.title}</a>
                </Link>
              </h1>
              {content && (
                <div className="summary">
                  <RenderMarkdown markdown={content.markdown} />
                  {" "}
                  {content.isTruncated && (
                    <Link href={ToUrl(...slug)}>
                      <a>Read More...</a>
                    </Link>
                  )}
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogLayout;
