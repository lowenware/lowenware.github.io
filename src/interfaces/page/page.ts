import IContent from "./content";
import IMetadata from "./metadata";

interface IPage {
  slug: string[],
  content?: IContent,
  metadata?: IMetadata,
}

export default IPage;
