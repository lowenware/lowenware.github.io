
import classNames from "classnames";
import {site} from "~/config";
import {BlogPostMeta} from "~/modules/blog";

import {BlogCard} from "./blog-card";

interface BlogPostsProps {
  className?: string,
  posts: BlogPostMeta[],
}

export const BlogPosts: React.FC<BlogPostsProps> = ({className, posts}) => {
  return (
    <section
      className={classNames(
        "z-30 space-y-32",
        className
      )}
    >
      {posts &&
        posts.map(post => (
          <span
            key={post.slug}
            className="flex flex-col hover:no-underline "
          >
            <BlogCard className="flex-grow" url={`/${site.blog.slug}/${post.slug}`} post={post} />
           
          </span>
        ))}
    </section>
  );
};
