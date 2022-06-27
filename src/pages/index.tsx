import classNames from "classnames";
import {NextPage} from "next";
import Head from "next/head";
import Link from "next/link";

import {Button, Markdown, Slide} from "~/components";
import {BlogPosts} from "~/components/blog";
import {Technologies} from "~/components/home";
import {site} from "~/config";
import {PageLayout} from "~/layout";
import {Blog, BlogPostMetaRaw, mapBlogPostRawToMeta} from "~/modules/blog";
import {
  ContentManager,
  PageProps,
  StaticPage,
  StaticPageMeta,
} from "~/modules/content-manager";

interface SlidePageMeta extends StaticPageMeta {
  background: string,
  target: string,
}

interface HomePage {
  page: StaticPage<StaticPageMeta>,
  slide: StaticPage<SlidePageMeta>,
  posts: BlogPostMetaRaw[],
  technologies: StaticPage<StaticPageMeta>[],
}

const Home: NextPage<PageProps<HomePage>> = ({menu, social, data}) => {
  const {page, slide, posts, technologies} = data;
  const title = `${page.meta.title}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PageLayout
        className="flex flex-col relative min-h-full"
        page={page.meta}
        links={menu}
        social={social}
      >
        <section className="sm:mb-24">
          <Slide variant="full" background={slide.meta.background}>
            <div className="sm:w-10/12 z-30 justify-left mx-auto flex flex-col items-start space-y-24">
              <h1>{slide.meta.title}</h1>
              <Markdown content={slide.content}></Markdown>
              <Button variant="secondary" href={slide.meta.target}>Learn more</Button>
            </div>
          </Slide>
        </section>
        <div className="relative text-md">
          <div
            className={classNames(
              "sm:absolute sm:w-3/4 lg:w-1/2 h-144 sm:-top-84 sm:left-1/2 sm:-translate-x-1/2 z-40 bg-white",
              "flex flex-col shadow-sm justify-center items-center space-y-8 p-24 text-center",
            )}
          >
            <div className="">
              We are a software studio that wants to make a stake in the world
            </div>
            <Link href="/about">
              <a className="uppercase text-sm">
                About us
              </a>
            </Link>
          </div>
        </div>
        <section>
          <BlogPosts
            posts={posts.slice(0, site.home.maxBlogPosts).map(mapBlogPostRawToMeta)}
          >
            <div className="flex items-center justify-center h-144">
              <Button href={`/${site.blog.slug}`}>More Posts</Button>
            </div>
          </BlogPosts>
        </section>
        <Technologies list={technologies} />
      </PageLayout>
    </>
  );
};

export const getStaticProps = async () => {
  const manager = new ContentManager();
  return {
    props: manager.getPageProps({
      page: manager.getStaticPage(site.home.slug),
      slide: manager.getStaticPage(`${site.home.slug}/slide`),
      technologies: manager.readFolderOrdered([site.home.slug, "technologies"]),
      posts: new Blog(manager.page(site.blog.slug)).getRawBlogPosts(site.home.maxBlogPosts),
    }),
  };
};

export default Home;
