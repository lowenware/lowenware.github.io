import Categories from "../partials/taxonomy/categories";
import FormattedDate from "../partials/date";
import IMetadata from "src/interfaces/page/metadata";
import IPageProps from "src/interfaces/page/page-props";
import IProjectRelatedPost from "src/interfaces/page/project-related-post";
import path from "path";
import React from "react";
import ToUrl from "src/helpers/slug_to_url";

interface IProjectProps {
  metadata: IMetadata,
  relatedPosts?: IProjectRelatedPost[],
}

const Project: React.FC<IProjectProps> = ({ metadata, relatedPosts }) => {
  return (
    <>
      {metadata.project && (
        <aside className="aside">
          {metadata.project.version && (
            <>
              <div className="title">Latest version</div>
              <p>{metadata.project.version}</p>
            </>
          )}

          {metadata.project.github && (
            <>
              <div className="title">Repository</div>
              <div className="github-repo">
                <svg className="icon">
                  <use xlinkHref="/icon/sprite.svg#github" />
                </svg>
                <a href={"https://github.com/" + metadata.project.github}>
                  {metadata.project.github}
                </a>
              </div>
            </>
          )}

          {relatedPosts && relatedPosts.length > 0 && (
            <div className="posts">
              <div className="title">Related posts</div>
              <ul>
                {relatedPosts.map(({ slug, metadata }) => (
                  <li key={ToUrl(...slug)} className="article">
                    <a href={ToUrl(...slug)}>
                      {metadata.title}
                    </a>
                    <div className="taxonomy">
                      <Categories categories={metadata.categories} />
                      <> &ndash; </>
                      <span className="timestamp">
                        <FormattedDate date={metadata.date} />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </aside>
      )}
    </>
  );
};

const ListLayout: React.FC<IPageProps> = ({ page, props, children }) => {
  const {
    metadata
  } = page;

  const {
    title,
    className,
  } = metadata;

  const {
    projectRelatedPosts,
    sections,
  } = props;

  return (
    <div className={"list-content " + (className ? className : "")}>
      <Project metadata={metadata} relatedPosts={projectRelatedPosts} />

      <main className="content">
        <div className="header">
          <h1>{title}</h1>
        </div>

        {children}

        {sections && (
          <div className="sections">
            {sections.map(({ slug, metadata }) => (
              <section key={ToUrl(...slug)} className="section-link">
                <a href={ToUrl(...slug)}>
                  <h1>{metadata.linkTitle || metadata.title}</h1>
                  <p>{metadata.details}</p>
                </a>
              </section>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default ListLayout;
