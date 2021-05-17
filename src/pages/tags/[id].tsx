import { getAllCategories } from "src/lib/category";
import { getAllPagesWithTag, getAllTags } from "src/lib/tag";
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
  const tag = props.params.id;
  const thisSlug = ["tags", tag];

  const pages = getAllPagesWithTag(tag, { content: "truncated", metadata: true })
    .sort((a, b) => sortByDate(a.metadata, b.metadata));

  return {
    props: {
      page: {
        slug: thisSlug,
        metadata: {
          title: tag,
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
  const allTags = Object.keys(getAllTags());

  const paths = allTags.map(tag => ({
    params: {
      id: tag,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default DynamicPage;
