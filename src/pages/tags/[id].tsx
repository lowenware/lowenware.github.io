import { getAllCategories } from "src/lib/category";
import { getAllPagesWithTag, getAllTags } from "src/lib/tag";
import { sortByDate } from "src/lib/sort";
import BlogLayout from "src/components/layouts/blog";
import MainLayout from "src/components/layouts/main";
import React from "react";
import RenderMarkdown from "src/components/markdown/render_markdown";
import IPage from "src/interfaces/page/page";
import Head from "src/components/partials/head";

interface IPageProps {
  page: IPage,
  props: {
    allCategories: Record<string, number>,
    allTags: Record<string, number>,
    posts: IPage[],
  }
}

const DynamicPage: React.FC<IPageProps> = ({ page, props }) => {
  const {
    content,
  } = page;

  return (
    <>
      <Head {...page} />
      <MainLayout>

        <BlogLayout {...page} {...props}>
          <RenderMarkdown markdown={content?.markdown} />
        </BlogLayout>

      </MainLayout>
    </>
  );
};

interface IStaticProps {
  params: {
    id: string,
  }
}

export async function getStaticProps(props: IStaticProps) {
  const tag = props.params.id;
  const slug = ["tags", tag];

  const pageProps: IPageProps = {
    page: {
      slug,
      metadata: {
        title: tag,
      },
    },
    props: {
      allCategories: getAllCategories(),
      allTags: getAllTags(),
      posts: getAllPagesWithTag(tag, { content: "truncated", metadata: true })
        .sort((a, b) => sortByDate(a.metadata, b.metadata)),
    }
  };

  return {
    props: pageProps,
  };
}

export async function getStaticPaths() {
  const allTags = Object.keys(getAllTags());

  const paths = allTags.map(tag => ({
    params: {
      id: tag.toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default DynamicPage;
