import { getAllCategories } from "src/lib/category";
import { getAllTags } from "src/lib/tag";
import { sortByDate } from "src/interfaces/page/sort";
import BlogLayout from "src/components/layouts/blog";
import IPageProps from "src/interfaces/page/page-props";
import MainLayout from "src/components/layouts/main";
import React from "react";
import RenderMarkdown from "src/components/markdown/render_markdown";
import { getAllDynamicPages, getDynamicPageBySlug } from "src/lib/markdown";

const DynamicPage: React.FC<IPageProps> = ({ page, props }) => {
  const {
    content,
  } = page;

  return (
    <MainLayout>

      <BlogLayout page={page} props={props}>
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
  const thisSlug = ["blog"];
  const page = getDynamicPageBySlug(thisSlug, { content: true, metadata: true });
  const recentPosts = getRecentBlogPosts(8);

  return {
    props: {
      page,
      props: {
        allCategories: getAllCategories(),
        allTags: getAllTags(),
        pages: recentPosts,
      },
    },
  };
}

export default DynamicPage;
