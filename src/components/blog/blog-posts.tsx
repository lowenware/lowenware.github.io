import classNames from "classnames";
import {ReactNode} from "react";

import {Grid} from "~/components";
import {site} from "~/config";
import {BlogPostMeta} from "~/modules/blog";

import {BlogCard} from "./blog-card";

interface BlogPostsProps {
  className?: string,
  title?: string,
  posts: BlogPostMeta[],
  children?: ReactNode,
}

export const BlogPosts: React.FC<BlogPostsProps> = ({className, title, posts, children}) => {
  return (
    <section className={classNames("flex flex-col", className)}>
      {title && (<h1 className="text-center">{title}</h1>)}
      <Grid>
        {posts.map(post => (
          <BlogCard key={post.slug} url={`/${site.blog.slug}/${post.slug}`} post={post} />
        ))}
      </Grid>
      <div className="text-center">
        {children}
      </div>
    </section>
  );
};
