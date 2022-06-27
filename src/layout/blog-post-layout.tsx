import Link from "next/link";

import {LeafOver, Markdown} from "~/components";
import {BlogComments} from "~/components/blog";
import {site} from "~/config";
import {PageLayout} from "~/layout";
import {BlogPost, BlogPostMeta, BlogPostMetaRaw} from "~/modules/blog";
import {ContentManager, SocialMeta, StaticPageMeta} from "~/modules/content-manager";
import {formatDateTime} from "~/utils/format";

interface BlogPostProps {
  meta: StaticPageMeta,
  post: BlogPost<BlogPostMeta>,
  prev: BlogPostMetaRaw | null,
  next: BlogPostMetaRaw | null,
}

interface BlogPostLayoutProps {
  page: BlogPostProps,
  menu: StaticPageMeta[],
  social: SocialMeta[],
}

export const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({
  page,
  menu,
  social,
}) => {
  const {meta, post, prev, next} = page;
  const root = ContentManager.root(menu, site.blog.slug);
  const tags = post.meta.tags;

  return (
    <PageLayout section={meta} page={post.meta} links={menu} social={social}>
      <div className="max-w-screen-lg mx-auto p-24 lg:p-0">
        <h1>{post.meta.title}</h1>
        <div className="flex justify-between mb-32">
          {post.meta.date && (
            <span className="text-grey-700">
              {formatDateTime(post.meta.date)}
            </span>
          )}
          {tags.length > 0 && (
            <div className="flex space-x-8 font-bold">
              {tags.map(
                tag => (
                  <Link key={tag} href={`${root.url}/${tag}`}>
                    <a className="text-highlight">#{tag}</a>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
        <Markdown className="text-black-gray text-sm" content={post.content}></Markdown>
        <LeafOver className="my-32"
          prev={prev && ({url: `${root.url}/${prev.slug}`, title: prev.title})}
          next={next && ({url: `${root.url}/${next.slug}`, title: next.title})}
        />
        {post.meta.comments && (
          <section className="border-t-8 border-grey">
            <BlogComments />
          </section>
        )}
      </div>
    </PageLayout>
  );
};

