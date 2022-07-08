import {NextPage} from "next";
import Head from "next/head";

import {PageLayout} from "~/components";
import {CardAbout} from "~/components/card/card-about";
import {site} from "~/config";
import {Blog, BlogPostRaw} from "~/modules/blog";
import {
  ContentManager,
  PageProps,
  StaticContent,
  StaticPageMeta,
} from "~/modules/content-manager";

interface About {
  meta: StaticPageMeta,
  posts: BlogPostRaw[],
  about: StaticContent[],
}
const About: NextPage<PageProps<About>> = ({menu, social, data}) => {
  const {meta, about} = data;
  const title = `${meta.title} - ${site.name}`;

  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <PageLayout
        className="flex flex-col relative min-h-full"
        currentPage="about"
        links={menu}
        social={social}
      >
        <section className="flex flex-col lg:flex-row w-full items-center">
          <CardAbout about={about} />
        </section>
      </PageLayout>
    </>
  );
};

export const getStaticProps = async () => {
  const manager = new ContentManager();
  return {
    props: manager.getPageProps({
      meta: manager.page(site.about.slug),
      //TODO Why slug contains .md
      about: manager.readFolderOrdered(["about"]),
      posts: new Blog().getRawBlogPosts(site.home.maxBlogPosts),
    }),
  };
};

export default About;
