import {GetStaticProps, NextPage} from "next";
import Head from "next/head";

import {Markdown} from "~/components";
import {site} from "~/config";
import {PageLayout} from "~/layout";
import {
  ContentManager,
  PageProps,
  StaticPage,
  StaticPageMeta,
} from "~/modules/content-manager";

export const getStaticPaths = async () => {
  return {
    paths: new ContentManager().getStaticPaths(),
    fallback: false,
  };
};

const StaticSlugPage: NextPage<PageProps<StaticPage<StaticPageMeta>>> = ({
  menu,
  social,
  data,
}) => {
  const {meta, content} = data;
  const title = `${meta.title} - ${site.name}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PageLayout page={meta} links={menu} social={social}>
        <Markdown
          className="mx-auto max-w-screen-lg p-24"
          tag="main"
          patchHtml={html => `<h1>${meta.title}</h1>${html}`}
          content={content}
        />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  if (!params?.static) {
    throw `Not implemented page for params ${JSON.stringify(params)}`;
  }

  const slug = `${params.static}`;
  const manager = new ContentManager();

  return {
    props: manager.getPageProps(manager.getStaticPage(slug)),
  };
};

export default StaticSlugPage;
