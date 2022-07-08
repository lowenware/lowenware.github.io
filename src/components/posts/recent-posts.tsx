import {Button} from "~/components";
import {site} from "~/config";
import {BlogPostMeta} from "~/modules/blog";
import {formatDate} from "~/utils/format";
interface RecentPostsProps {
  posts: BlogPostMeta[],
  postPerPage: number,
}
export const RecentPosts: React.FC<RecentPostsProps> = ({
  posts,
  postPerPage,
}) => {
  const TAGS_PER_POST = 4;

  return (
    <section className="w-full flex flex-col my-32 items-center space-y-16">
      <p className="text-h3 text-grey-500">Recent Posts</p>
      <ul className="space-y-16 flex flex-col ">
        {posts.slice(0, postPerPage).map((post, key) => {
          return (
            <li className="flex flex-col" key={key}>
              <div>
                <a
                  href={`${site.blog.slug}/${post.slug}`}
                  className="text-blue hover:text-dark duration-500"
                >
                  {post.title}
                </a>
                -
                <span className="text-grey-600">
                  {post.date && formatDate(post.date)}
                </span>
              </div>
              <div className="flex space-x-4">
                {post.tags.slice(0, TAGS_PER_POST).map(tag => {
                  return (
                    <a
                      key={tag}
                      href={`${site.blog.slug}/${tag}`}
                      className="hover:text-blue duration-500"
                    >
                      #{tag}
                    </a>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
      <Button href={site.blog.slug}>Go to Blog</Button>
    </section>
  );
};
