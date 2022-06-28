import { NextPage } from "next"
import { site } from "~/config";
import { Blog, BlogPostRaw } from "~/modules/blog";
import { ContentManager, PageProps, StaticPageMeta } from "~/modules/content-manager";
import { PageLayout } from "../components"
interface Home {
    meta: StaticPageMeta,
    posts: BlogPostRaw[],
  }
const Home: NextPage<PageProps<Home>> = ({menu, social, data}) => {return <PageLayout currentPage="home" links={menu} social={social} ><></></PageLayout>}

export const getStaticProps = async () => {
    const manager = new ContentManager();
    return {
      props: manager.getPageProps({
        meta: manager.page(site.home.slug),
        posts: new Blog().getRawBlogPosts(site.home.maxBlogPosts),
      }),
    };
  };
export default Home