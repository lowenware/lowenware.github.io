import { getAllDynamicPages, IPageRequest } from "./markdown";

export function getAllTags() {
  const tags: Record<string, number> = {};
  const pages = getAllDynamicPages({ content: false, metadata: true });
  pages.map(({ metadata }) => {
    if (metadata && metadata["tags"]) {
      const pageCategories: string[] = metadata["tags"];
      pageCategories.forEach(tag => {
        let count = tags[tag] || 0;
        count++;
        tags[tag] = count;
      });
    }
  });

  return tags;
}

export function getAllPagesWithTag(tag: string, request: IPageRequest) {
  return getAllDynamicPages(request)
    .filter(({ metadata }) => {
      return metadata && metadata.tags && includesCaseInsensitive(metadata.tags, tag);
    });
}

function includesCaseInsensitive(array: string[], str: string) {
  const lookingFor = str.toLowerCase();

  for (const value of array) {
    if (value.toLowerCase() === lookingFor)
      return true;
  }

  return false;
}
