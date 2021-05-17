import { join } from "path";
import deleteUndefinedFields from "src/helpers/delete_undefined_fields";
import fs from "fs";
import IContent from "src/interfaces/page/content";
import IPage from "src/interfaces/page/page";
import matter from "gray-matter";

/**
 * _pages and _pages/dynamic directory where the markdown content will live
 * _pages will have the home.md (aka index or /)
 * _pages/dynamic will be home to all other pages (aka [slug].js)
 */
const pagesDirectory = join(process.cwd(), "_pages");

/**
 * Gets all the files (slugs) in a directory
 */
export function getSlugsFromDirectory(dir: string) {
  return traverseDir(dir);
}

function traverseDir(dir: string, relative: string[] = [], files: string[][] = []) {
  fs.readdirSync(dir).forEach(fileName => {
    const fullPath = join(dir, fileName);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDir(fullPath, [...relative, fileName], files);
    } else {
      if (fileName == "_index.md") {
        files.push([...relative]);
      } else {
        files.push([...relative, fileName.replace(/\.md$/, "")]);
      }
    }
  });

  return files;
}

/**
 * Gets the contents of a file
 * The gray-matter (metadata at the top of the file) will be
 * added to the item object, the content will be in
 * item.content and the file name (slug) will be in item.slug.
 */
export function getBySlug(dir: string, slug: string[], request: IPageRequest) {
  let fullPath = join(dir, ...slug) + ".md";

  if (!fs.existsSync(fullPath))
    fullPath = join(dir, ...slug, "_index.md");

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const response: IPage = {
    slug,
    metadata: request.metadata ? data : undefined,
    content: request.content ? processContent(content, request.content == "truncated") : undefined,
  };

  deleteUndefinedFields(response);
  return response;
}

function processContent(markdown: string, truncate: boolean): IContent {
  const moreTag = "<!--more-->";
  const content: IContent = {
    isTruncated: false,
    markdown: markdown,
  };

  if (markdown.includes(moreTag)) {
    if (truncate) {
      content.isTruncated = true;
      content.markdown = markdown.slice(0, markdown.indexOf(moreTag));
    } else {
      content.markdown = markdown.split(moreTag).join("");
    }
  }

  return content;
}

export interface IPageRequest {
  metadata: boolean,
  content: boolean | "truncated",
}

/**
 * Returns contents of a page in the _pages/dynamic directory
 */
export function getDynamicPageBySlug(slug: string[], request: IPageRequest) {
  return getBySlug(pagesDirectory, slug, request);
}

/**
 * Returns a list of all the pages in the _pages/dynamic directory
 */
export function getAllDynamicPages(request: IPageRequest) {
  const slugs = getSlugsFromDirectory(pagesDirectory);
  const pages = slugs.map((slug) => getDynamicPageBySlug(slug, request));
  return pages;
}
