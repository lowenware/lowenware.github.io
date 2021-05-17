import { getAllCategories, getAllPagesInCategory } from "src/lib/category";
import { getAllTags } from "src/lib/tag";
import { sortByDate } from "src/interfaces/page/sort";
import BlogLayout from "src/components/layouts/blog";
import IPageProps from "src/interfaces/page/page-props";
import MainLayout from "src/components/layouts/main";
import React from "react";
import RenderMarkdown from "src/components/markdown/render_markdown";

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

interface IStaticProps {
  params: {
    id: string,
  }
}

export async function getStaticProps(props: IStaticProps) {
  const category = props.params.id;
  const thisSlug = ["category", category];

  const pages = getAllPagesInCategory(category, { content: "truncated", metadata: true })
    .sort((a, b) => sortByDate(a.metadata, b.metadata));

  return {
    props: {
      page: {
        slug: thisSlug,
        metadata: {
          title: category,
        },
        content: "",
      },
      props: {
        allCategories: getAllCategories(),
        allTags: getAllTags(),
        pages,
      },
    },
  };
}

export async function getStaticPaths() {
  const allCategories = Object.keys(getAllCategories());

  const paths = allCategories.map(category => ({
    params: {
      id: category,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default DynamicPage;
