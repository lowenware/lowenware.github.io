import IMetadata from "./metadata";
import IPage from "./page";
import IProjectRelatedPost from "./project-related-post";

interface IPageProps {
  page: IPage,
  props: {
    sections?: ISections[],
    projectRelatedPosts?: IProjectRelatedPost[],
    allCategories?: Record<string, number>,
    allTags?: Record<string, number>,
    pages?: IPage[],
  }
}

interface ISections {
  slug: string[],
  metadata: IMetadata,
}

export default IPageProps;
