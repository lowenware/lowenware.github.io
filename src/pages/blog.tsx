import React from "react";

import { getAllCategories } from "src/lib/category";
import { getAllPages, getPageBySlug } from "src/lib/markdown";
import { getAllTags } from "src/lib/tag";
import { sortByDate } from "src/lib/sort";
import BlogLayout from "src/components/layouts/blog";
import Head from "src/components/partials/head";
import IPage from "src/interfaces/page/page";
import MainLayout from "src/components/layouts/main";
import RenderMarkdown from "src/components/markdown/render_markdown";

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

function getRecentBlogPosts(max: number) {
  const recentPosts = getAllPages({ content: "truncated", metadata: true })
    .filter(({ slug }) => slug[0] == "blog" && slug.length > 1)
    .sort((a, b) => sortByDate(a.metadata, b.metadata))
    .slice(0, max);
  return recentPosts;
}

export async function getStaticProps() {
  const slug = ["blog"];

  const pageProps: IPageProps = {
    page: getPageBySlug(slug, { content: true, metadata: true }),
    props: {
      allCategories: getAllCategories(),
      allTags: getAllTags(),
      posts: getRecentBlogPosts(8),
    }
  };

  return {
    props: pageProps,
  };
}

export default DynamicPage;
