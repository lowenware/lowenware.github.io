import {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";

import {Grid, Markdown, PageAction} from "~/components";
import {Card} from "~/components/card";
import {site} from "~/config";
import {PageLayout} from "~/layout";
import {
  ContentManager,
  PageProps,
  StaticPage,
  StaticPageMeta,
} from "~/modules/content-manager";

interface DotrixHighlightMeta extends StaticPageMeta {
  image: string,
}

interface DotrixHighlights {
  meta: StaticPageMeta,
  list: StaticPage<DotrixHighlightMeta>[],
}

interface DotrixPageProps {
  page: StaticPage<StaticPageMeta>,
  highlights: DotrixHighlights,
  faq: string,
}

const Product: NextPage<PageProps<DotrixPageProps>> = ({menu, social, data}) => {
  const {page, highlights, faq} = data;
  const title = `${page.meta.title} - ${site.name}`;

  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>

      <PageLayout
        className="flex flex-col relative"
        page={page.meta}
        links={menu}
        social={social}
      >
        <div className="flex flex-col mx-auto max-w-screen-lg items-left">
          <Markdown className="text-md" content={page.content} />
        </div>
        <h2>{highlights.meta.title}</h2>
        <Grid>
          {highlights.list.map(entry => (
            <Card key={entry.meta.slug}>
              {entry.meta.image && (
                <Image
                  src={`//dotrix/${entry.meta.image}`}
                  width={1280}
                  height={720}
                  alt={entry.meta.title}
                />
              )}
              <div className="flex flex-col p-32 space-y-32">
                <h3>{entry.meta.title}</h3>
                <Markdown className="text-sm" content={entry.content} />
              </div>
            </Card>
          ))}
        </Grid>
        <div className="mx-auto max-w-screen-lg">
          <Markdown className="text-md" content={faq} />
        </div>
        <PageAction action="GitHub" link="https://github.com/lowenware/dotrix">
          Find more on GitHub!
        </PageAction>
      </PageLayout>
    </>
  );
};

export const getStaticProps = async () => {
  const manager = new ContentManager();
  return {
    props: manager.getPageProps({
      page: manager.getStaticPage(site.dotrix.slug),
      highlights: {
        meta: manager.page("dotrix/highlights"),
        list: manager.readFolderOrdered(["dotrix", "highlights"]),
      },
      faq: manager.getStaticPage("dotrix/faq").content,
    }),
  };
};

export default Product;
