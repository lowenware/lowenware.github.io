import { getAllCategories } from "src/lib/category";
import { getAllTags } from "src/lib/tag";
import { sortByDate } from "src/lib/sort";
import BlogLayout from "src/components/layouts/blog";
import MainLayout from "src/components/layouts/main";
import React from "react";
import RenderMarkdown from "src/components/markdown/render_markdown";
import { getAllDynamicPages, getDynamicPageBySlug } from "src/lib/markdown";
import IPage from "src/interfaces/page/page";

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
    <MainLayout>

      <BlogLayout {...page} {...props}>
        <RenderMarkdown markdown={content?.markdown} />
      </BlogLayout>

    </MainLayout>
  );
};

function getRecentBlogPosts(max: number) {
  const recentPosts = getAllDynamicPages({ content: "truncated", metadata: true })
    .filter(({slug}) => slug[0] == "blog" && slug.length > 1)
    .sort((a, b) => sortByDate(a.metadata, b.metadata))
    .slice(0, max);
  return recentPosts;
}

export async function getStaticProps() {
  const slug = ["blog"];

  const pageProps: IPageProps = {
    page: getDynamicPageBySlug(slug, { content: true, metadata: true }),
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
