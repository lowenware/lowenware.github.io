import { join } from "path";
import deleteUndefinedFields from "src/helpers/delete_undefined_fields";
import fs from "fs";
import IContent from "src/interfaces/page/content";
import IPage from "src/interfaces/page/page";
import matter from "gray-matter";

/**
 * Directory where the markdown content is located.
 */
const pagesDirectory = join(process.cwd(), "_content");

/**
 * Gets all the file paths (slugs) in a directory and subdirectories.
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
 * Gets the contents of a file.
 */
function getBySlug(dir: string, slug: string[], request: IPageRequest) {
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
 * Returns contents of a page in the pages directory.
 */
export function getPageBySlug(slug: string[], request: IPageRequest) {
  return getBySlug(pagesDirectory, slug, request);
}

/**
 * Returns a list of all dynamic pages.
 */
export function getAllPages(request: IPageRequest) {
  const slugs = getSlugsFromDirectory(pagesDirectory);
  const pages = slugs.map((slug) => getPageBySlug(slug, request));
  return pages;
}
