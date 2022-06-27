import classNames from "classnames";
import Image from "next/image";

import {Markdown} from "~/components";
import {Card} from "~/components/card";
import {site} from "~/config";
import {BlogPostMeta} from "~/modules/blog";
import {formatDate} from "~/utils/format";

interface BlogCardProps {
  className?: string,
  post: BlogPostMeta,
  url: string,
}

export const BlogCard: React.FC<BlogCardProps> = ({className, post, url}) => {
  return (
    <Card className={classNames("shadow-sm bg-grey-300", className)}>
      <article className="flex flex-col flex-grow">
        {post.image && (
          <a href={url}>
            <Image
              src={`//${site.blog.slug}/${post.image}`}
              alt={""}
              width={1280}
              height={720}
            />
          </a>
        )}
        <div className="flex flex-grow space-y-24 flex-col p-32">
          <h1>
            <a href={url}>{post.title}</a>
          </h1>
          <Markdown className="text-black-gray text-sm flex-grow" content={post.summary} />
          <div className="flex flex-row text-sm">
            <div className="flex flex-grow justify-left space-x-8 ">
              {post.tags.slice(0, 1).map(tag => (
                <a key={tag} href={`/blog/${tag}`} className="text-highlight">{`#${tag}`}</a>
              ))}
            </div>
            <div className="text-grey-600">{formatDate(post.date)}</div>
          </div>
        </div>
      </article>
    </Card>
  );
};
