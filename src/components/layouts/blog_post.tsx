import Breadcrumbs from "../partials/breadcrumbs";
import Categories from "../partials/taxonomy/categories";
import Comments from "../partials/comments";
import FormattedDate from "../partials/date";
import IPageProps from "src/interfaces/page/page-props";
import React from "react";
import Tags from "src/components/partials/taxonomy/tags";


const BlogPostLayout: React.FC<IPageProps> = ({ page, children }) => {
  const {
    slug,
  } = page;

  const {
    author,
    categories,
    comments,
    date,
    publication,
    tags,
    title,
  } = page.metadata;

  return (
    <main className="content article text-content blog-post">
      <Breadcrumbs slug={slug} />
      <div className="taxonomy header">
        <h1>{title}</h1>
        {publication && (
          <>
            <>By <a href="/about/" className="author">{author} </a></>
            <Categories categories={categories} />
            <span className="timestamp"> / <FormattedDate date={date} /></span>
          </>
        )}
      </div>

      {children}


      <div className="tags">
        <Tags tags={tags || []} />
      </div>

      {comments && (
        <Comments />
      )}
    </main>
  );
};

export default BlogPostLayout;
