import React from "react";

import {Paginator} from "~/components";
import {BlogPosts} from "~/components/blog";
import {site} from "~/config";
import {PageLayout} from "~/layout";
import {BlogPostMeta, Tag} from "~/modules/blog";
import {
  ContentManager,
  SocialMeta,
  StaticPageMeta,
} from "~/modules/content-manager";


interface BlogProps {
  meta: StaticPageMeta,
  posts: BlogPostMeta[],
  totalPages: number,
  page: number,
  tags: Tag[],
  tag?: string,
}

interface BlogLayoutProps {
  menu: StaticPageMeta[],
  social: SocialMeta[],
  blog: BlogProps,
}

export const BlogLayout: React.FC<BlogLayoutProps> = ({
  menu,
  social,
  blog
}) => {
  const root = ContentManager.root(menu, site.blog.slug);
  const {posts, totalPages, page, tag} = blog;

  return (
    <PageLayout
      className="min-h-screen"
      page={blog.meta}
      section={tag ? blog.meta : undefined}
      links={menu}
      social={social}
    >
      {tag && (
        <div className="w-full h-144 text-center">
          <h1>
            #{tag}
          </h1>
        </div>
      )}

      <BlogPosts posts={posts} className="w-full min-h-min" />
      {root?.url && (<Paginator
        className="h-144"
        page={page}
        totalPages={totalPages}
        root={tag ? `${root.url}/${tag}` : root.url}
      />)}
    </PageLayout>
  );
};
