import {NextPage} from "next";
import Head from "next/head";

import {PageLayout} from "~/components";
import {site} from "~/config";
import {BlogPostRaw} from "~/modules/blog";
import {
  ContentManager,
  PageProps,
  StaticContent,
  StaticPageMeta,
} from "~/modules/content-manager";

interface ProductProps {
  meta: StaticPageMeta,
  posts: BlogPostRaw[],
  product: StaticContent[],
}
const Product: NextPage<PageProps<ProductProps>> = ({menu, social, data}) => {
  const {meta} = data;
  const title = `${meta.title} - ${site.name}`;
  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>

      <PageLayout
        className="flex flex-col relative"
        currentPage="product"
        links={menu}
        social={social}
      >
        <section className="min-h-screen"></section>
      </PageLayout>
    </>
  );
};

export const getStaticProps = async () => {
  const manager = new ContentManager();
  return {
    props: manager.getPageProps({
      meta: manager.page(site.product.slug),
      //TODO Why slug contains .md
      product: manager.readFolderOrdered(["product"]),
    }),
  };
};

export default Product;
