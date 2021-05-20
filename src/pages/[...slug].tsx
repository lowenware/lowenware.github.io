import React from "react";

import { filterConflicts } from "src/lib/conflicts";
import { getAllCategories } from "src/lib/category";
import { getAllDynamicPages, getDynamicPageBySlug } from "src/lib/markdown";
import { getAllTags } from "src/lib/tag";
import { sortByDate, sortByWeight } from "src/lib/sort";
import array_starts_with from "src/helpers/array_starts_with";
import BlogPostLayout from "src/components/layouts/blog_post";
import ContactLayout from "src/components/layouts/contact";
import IContactMetadata from "src/interfaces/page/metadata/contact";
import IPage from "src/interfaces/page/page";
import IProjectRelatedPost from "src/interfaces/page/project-related-post";
import ISection from "src/interfaces/page/section";
import ListLayout from "src/components/layouts/list";
import MainLayout from "src/components/layouts/main";
import RenderMarkdown from "src/components/markdown/render_markdown";

interface IPageProps {
  page: IPage,
  props: {
    sections?: ISection[],
    projectRelatedPosts?: IProjectRelatedPost[],
    allCategories?: Record<string, number>,
    allTags?: Record<string, number>,
    pages?: IPage[],
  }
}

const DynamicWrapper: React.FC<IPageProps> = ({ page, props, children }) => {

  function render() {
    const { slug } = page;

    if (slug[0] === "contact")
      return <ContactLayout metadata={page.metadata as IContactMetadata}>{children}</ContactLayout>;

    if (slug.length > 1) {
      return <BlogPostLayout {...page} {...props}>{children}</BlogPostLayout>;
    } else {
      return <ListLayout {...page} {...props}>{children}</ListLayout>;
    }
  }

  return (
    render()
  );
};


const DynamicPage: React.FC<IPageProps> = ({ page, props }) => {
  const {
    content,
  } = page;

  return (
    <MainLayout>
      <DynamicWrapper page={page} props={props}>
        <RenderMarkdown markdown={content?.markdown} />
      </DynamicWrapper>
    </MainLayout>
  );
};

interface IStaticProps {
  params: {
    slug: string[],
  }
}

export async function getStaticProps(props: IStaticProps) {
  const thisSlug = props.params.slug;
  const allCategories = getAllCategories();
  const allTags = getAllTags();

  const page = getDynamicPageBySlug(thisSlug, { content: true, metadata: true });
  const sections = getAllDynamicPages({ content: false, metadata: true })
    .filter(({ slug }) => (slug.length > thisSlug.length) && array_starts_with(slug, ...thisSlug))
    .sort((a, b) => sortByWeight(a.metadata, b.metadata)) as ISection[];

  let projectRelatedPosts: any = []; // TODO: remove any
  const max = 8;
  const projectTag = page.metadata?.project?.tag;
  if (projectTag) {
    projectRelatedPosts = getAllDynamicPages({ content: false, metadata: true })
      .filter(({ metadata }) => metadata?.tags && metadata.tags.includes(projectTag))
      .sort((a, b) => sortByDate(a.metadata, b.metadata))
      .slice(0, max);
  }

  const pageProps: IPageProps = {
    page,
    props: {
      sections,
      projectRelatedPosts,
      allCategories,
      allTags,
    }
  };

  return {
    props: pageProps,
  };
}

export async function getStaticPaths() {
  const posts = getAllDynamicPages({ content: false, metadata: false })
    .filter(({ slug }) => filterConflicts([], slug));

  const paths = posts.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  console.log("/[...slug] paths ----------");
  paths.forEach(p => {
    console.log(p);
  });
  console.log("---------------------------");

  return {
    paths,
    fallback: false,
  };
}

export default DynamicPage;
