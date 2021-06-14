import { getAllPages, IPageRequest } from "./markdown";

export function getAllCategories() {
  const categories: Record<string, number> = {};
  const pages = getAllPages({ content: false, metadata: true });
  pages.map(({ metadata }) => {
    if (metadata && metadata["categories"]) {
      const pageCategories: string[] = metadata["categories"];
      pageCategories.forEach(category => {
        let count = categories[category] || 0;
        count++;
        categories[category] = count;
      });
    }
  });

  return categories;
}

export function getAllPagesInCategory(category: string, request: IPageRequest) {
  return getAllPages(request)
    .filter(({ metadata }) => {
      return metadata && metadata["categories"] && metadata["categories"].includes(category);
    });
}
