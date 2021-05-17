import { filterConflicts } from "src/lib/conflicts";
import { getAllCategories } from "src/lib/category";
import { getAllDynamicPages, getDynamicPageBySlug } from "src/lib/markdown";
import { getAllTags } from "src/lib/tag";
import array_starts_with from "src/helpers/array_starts_with";
import BlogPostLayout from "src/components/layouts/blog_post";
import ContactLayout from "src/components/layouts/contact";
import IPageProps from "src/interfaces/page/page-props";
import ListLayout from "src/components/layouts/list";
import MainLayout from "src/components/layouts/main";
import React from "react";
import RenderMarkdown from "src/components/markdown/render_markdown";


const DynamicWrapper: React.FC<IPageProps> = ({ page, props, children }) => {

  function render(params: IPageProps, children: React.ReactNode) {
    const { slug } = params.page;

    if (slug.length > 1)
      return <BlogPostLayout {...params}>{children}</BlogPostLayout>;

    switch (slug[0]) {
      case "contact":
        return <ContactLayout {...params}>{children}</ContactLayout>;
      default:
        return <ListLayout {...params}>{children}</ListLayout>;
    }
  }

  return (
    render({ page, props }, children)
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
    .sort((a, b) => a.metadata["weight"] - b.metadata["weight"])
    .map(post => ({
      slug: post.slug,
      metadata: post.metadata,
    })); // TODO: how to omit content?

  let projectRelatedPosts: any = []; // TODO: remove any
  const max = 8;
  const projectTag = page.metadata?.project?.tag;
  if (projectTag) {
    projectRelatedPosts = getAllDynamicPages({ content: false, metadata: true })
      .filter(({ metadata }) => metadata?.tags && metadata.tags.includes(projectTag))
      .sort((a, b) => new Date(b.metadata["date"]) - new Date(a.metadata["date"]))
      .slice(0, max)
      .map(post => ({
        slug: post.slug,
        metadata: post.metadata,
      })); // TODO: how to omit content?
  }

  return {
    props: {
      page: {
        ...page,
      },
      props: {
        sections,
        projectRelatedPosts,
        allCategories,
        allTags,
      },
    },
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
