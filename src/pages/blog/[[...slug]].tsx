import {GetStaticProps, NextPage} from "next";
import Head from "next/head";

import {site} from "~/config";
import {BlogLayout, BlogPostLayout} from "~/layout";
import {
  Blog,
  BlogPostStaticProps,
  BlogStaticProps,
  mapBlogPostRawToMeta,
} from "~/modules/blog";
import {ContentManager, PageProps} from "~/modules/content-manager";

export async function getStaticPaths() {
  const manager = new ContentManager();
  const blog = new Blog(manager.page(site.blog.slug));
  const paths = blog.getStaticPaths();

  return {
    paths,
    fallback: false,
  };
}

const BlogSlugPage: NextPage<PageProps<BlogStaticProps | BlogPostStaticProps>> = ({
  menu,
  social,
  data,
}) => {

  if (data.mode === "POST") {
    const title = `${data.post.meta.title} - ${data.meta.title} - ${site.name}`;
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <BlogPostLayout
          page={{
            ...data,
            post: {
              ...data.post,
              meta: mapBlogPostRawToMeta(data.post.meta),
            }
          }}
          menu={menu}
          social={social}
        />
      </>
    );
  }

  const tag = data.tag;
  return (
    <>
      <Head>
        <title>
          {tag ? `#${tag} - ${data.meta.title} - ${site.name}` : `${data.meta.title} - ${site.name}`}
        </title>
      </Head>
      <BlogLayout
        blog={{
          ...data,
          posts: data.posts.map(mapBlogPostRawToMeta)
        }}
        menu={menu}
        social={social} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const slug = (params?.slug && Array.isArray(params.slug)) ? params.slug : ["1"];

  const manager = new ContentManager();
  const blog = new Blog(manager.page(site.blog.slug));

  return {
    props: manager.getPageProps({
      ...blog.getBlogStaticProps(slug),
    })
  };
};

export default BlogSlugPage;
