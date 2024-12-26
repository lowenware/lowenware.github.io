import Image from "next/image";
import Link from "next/link";

import {LeafOver, Markdown} from "~/components";
import {BlogComments} from "~/components/blog";
import {site} from "~/config";
import {PageLayout} from "~/layout";
import {BlogPost, BlogPostMeta, BlogPostMetaRaw} from "~/modules/blog";
import {ContentManager, SocialMeta, StaticPageMeta} from "~/modules/content-manager";
import {formatDate} from "~/utils/format";

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
              {formatDate(post.meta.date)} by <span className="font-bold">{post.meta.author}</span>
            </span>
          )}
          {!!tags.length && root?.url && (
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
        {post.meta.youtube && (
          <div className="mb-24 relative overflow-hidden w-full pt-[56.25%]">
            <iframe className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
              src={`https://www.youtube.com/embed/${post.meta.youtube}`}>
            </iframe>
          </div>
        )}
        {post.meta.image && (
          <div className="mb-24">
            <Image
              src={`//blog/${post.meta.image}`}
              alt={post.meta.title}
              layout="responsive"
              width={1280}
              height={720}
            />
          </div>
        )}
        <Markdown className="text-black-gray text-sm" content={post.content}></Markdown>
        {root?.url && (<LeafOver className="my-32"
          prev={prev && ({url: `${root.url}/${prev.slug}`, title: prev.title})}
          next={next && ({url: `${root.url}/${next.slug}`, title: next.title})}
        />)}
        {post.meta.comments && (
          <section className="border-t-8 border-grey">
            <BlogComments />
          </section>
        )}
      </div>
    </PageLayout>
  );
};

