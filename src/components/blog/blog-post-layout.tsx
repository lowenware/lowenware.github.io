import Link from "next/link";

import {LeafOver,Markdown,PageLayout} from "~/components";
import {site} from "~/config";
import {BlogPostMeta, BlogPostRaw} from "~/modules/blog";
import {ContentManager, SocialMeta, StaticPageMeta} from "~/modules/content-manager";
import {formatDateTime} from "~/utils/format";

interface BlogPostProps {
  meta: BlogPostMeta,
  content: string,
  prev: BlogPostRaw | null,
  next: BlogPostRaw | null,
}

interface BlogPostLayoutProps {
  post: BlogPostProps,
  menu: StaticPageMeta[],
  social: SocialMeta[],
}

export const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({
  post,
  menu,
  social,
}) => {
  const {meta, content, prev, next} = post;
  const root = ContentManager.root(menu, site.blog.slug);

  return (
    <PageLayout className="" currentPage={site.blog.slug} links={menu} social={social}>
      <div className="max-w-screen-lg mx-auto p-24 lg:p-0">
        <Link href="/blog"><a className="text-h2">{"<"}Blog</a></Link>
        <main>
          <h1>{meta.title}</h1>
          <div className="flex justify-between mb-32">
            {meta.date && (
              <span className="text-grey-700">
                {formatDateTime(meta.date)}
              </span>
            )}
            {meta.tags.length > 0 && (
              <div className="flex space-x-8 font-bold">
                {meta.tags.map(
                  tag => (
                    <Link key={tag} href={`${root.url}/${tag}`}>
                      <a className="text-blue">#{tag}</a>
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
          <Markdown className="text-black-gray text-small" content={content}></Markdown>
        </main>
        <LeafOver className="my-32"
          prev={prev && ({url: `${root.url}/${prev.slug}`, title: prev.title})}
          next={next && ({url: `${root.url}/${next.slug}`, title: next.title})}
        />
      </div>
    </PageLayout>
  );
};

