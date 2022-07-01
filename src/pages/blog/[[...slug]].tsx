import {GetStaticProps, NextPage} from "next";
import Head from "next/head";
import { BlogLayout, BlogPostLayout } from "~/components";
import {site} from "~/config";
import {
  Blog,
  BlogPostStaticProps,
  BlogStaticProps,
  mapBlogPostRawToMeta,
} from "~/modules/blog";
import {ContentManager, PageProps} from "~/modules/content-manager";

export async function getStaticPaths() {
  const blog = new Blog();
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

  const root = ContentManager.root(menu, site.blog.slug);
  if (data.mode === "POST") {
    return (
      <>
        <Head>
          <title>{data.meta.title} - {root.title} - {site.name}</title>
        </Head>
        <BlogPostLayout
          post={{
            ...data,
            meta: mapBlogPostRawToMeta(data.meta)
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
          {tag ? `${root.title} #${tag} - ${site.name}` : `${root.title} - ${site.name}`}
        </title>
      </Head>
      <BlogLayout
        blog={{
          ...data,
          posts: data.posts.map(mapBlogPostRawToMeta)
        }}
        menu={menu}
        social={social}  />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const slug = (params?.slug && Array.isArray(params.slug)) ? params.slug : ["1"];

  const blog = new Blog();
  const manager = new ContentManager();

  return {
    props: manager.getPageProps(blog.getBlogStaticProps(slug))
  };
};

export default BlogSlugPage;
