import Link from "next/link";
import React from "react";

import AllCategories from "src/components/partials/taxonomy/all_categories_list";
import AllTags from "src/components/partials/taxonomy/all_tags_list";
import CategoriesList from "../partials/taxonomy/categories";
import FormattedDate from "../partials/date";
import IPage from "src/interfaces/page/page";
import RenderMarkdown from "../markdown/render_markdown";
import Tags from "../partials/taxonomy/tags";
import ToUrl from "src/helpers/slug_to_url";

interface IProps extends IPage {
  allCategories: Record<string, number>,
  allTags: Record<string, number>,
  /** Recent posts, posts in category or posts with tag */
  posts: IPage[],
}

const BlogLayout: React.FC<IProps> = ({ metadata, children, allCategories, allTags, posts: posts }) => {
  return (
    <div className="text-content blog-content">
      <aside className="aside">
        <h1>{metadata?.title}</h1>

        {children}

        <div className="taxonomies">
          <div className="title">Categories</div>
          <AllCategories categories={allCategories} />

          <div className="title">Tags</div>
          <AllTags tags={allTags} />
        </div>
      </aside>

      <div className="content">
        {posts && (
          posts.map(({ slug, metadata, content }, i) => (
            <article key={i} className="article">
              <div className="taxonomy">
                <span className="timestamp">
                  <FormattedDate date={metadata?.date} />
                </span>
                {" – "}
                <CategoriesList categories={metadata?.categories} />
                {" / "}
                <Tags tags={metadata?.tags} />
              </div>
              <h1>
                <Link href={ToUrl(...slug)}>
                  <a>{metadata?.title}</a>
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
