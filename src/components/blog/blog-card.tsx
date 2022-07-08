import classNames from "classnames";
import Image from "next/image";

import {Card, CardBody} from "~/components/card";
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
    <Card className={classNames("flex-grow", className)}>
      <CardBody className="flex flex-grow">
        <article className="flex flex-grow space-y-8 flex-col">
          <h1>
            <a href={url}>{post.title}</a>
          </h1>
          <p className="text-gray-font">
            {post.summary}
            <a
              className="text-blue hover:text-dark-super duration-500"
              href={url}
            >
              Read More...
            </a>
          </p>
        </article>
        <div className="flex justify-between text-small">
          <div className="text-grey-600">{formatDate(post.date)}</div>
          {post.tags.length > 0 && (
            <a
              href={`/${post.tags[0]}`}
              className="text-blue hover:text-dark duration-500 font-bold"
            >{`#${post.tags[0]}`}</a>
          )}
        </div>
      </CardBody>
      {post.image && (
        <a href={url}>
          <Image
            src={`//${site.blog.slug}/${post.image}`}
            alt={""}
            height={200}
            width={100}
          />
        </a>
      )}
    </Card>
  );
};
