import { getAllCategories, getAllPagesInCategory } from "src/lib/category";
import { getAllTags } from "src/lib/tag";
import { sortByDate } from "src/lib/sort";
import BlogLayout from "src/components/layouts/blog";
import MainLayout from "src/components/layouts/main";
import React from "react";
import RenderMarkdown from "src/components/markdown/render_markdown";
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

interface IStaticProps {
  params: {
    id: string,
  }
}

export async function getStaticProps(props: IStaticProps) {
  const category = props.params.id;
  const slug = ["category", category];

  const pageProps: IPageProps = {
    page: {
      slug,
      metadata: {
        title: category,
      },
    },
    props: {
      allCategories: getAllCategories(),
      allTags: getAllTags(),
      posts: getAllPagesInCategory(category, { content: "truncated", metadata: true })
        .sort((a, b) => sortByDate(a.metadata, b.metadata)),
    }
  };

  return {
    props: pageProps,
  };
}

export async function getStaticPaths() {
  const allCategories = Object.keys(getAllCategories());

  const paths = allCategories.map(category => ({
    params: {
      id: category.toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default DynamicPage;
