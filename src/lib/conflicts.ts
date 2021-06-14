import fs from "fs";
import { join } from "path";
import array_starts_with from "src/helpers/array_starts_with";

const pagesDirectory = join(process.cwd(), "src/pages");

export function filterConflicts(baseSlug: string[], pageSlug: string[]): boolean {
  if (!array_starts_with(pageSlug, ...baseSlug)) {
    console.log("Array start with something else!");
    return false;
  }

  const slug = pageSlug.slice(baseSlug.length);

  if (fs.existsSync(join(pagesDirectory, ...slug) + ".tsx"))
    return false;

  for (let i = slug.length - 1; i > 0; i--) {
    const path = join(pagesDirectory, ...slug.slice(i));
    if (fs.existsSync(path)) {
      for (const file of fs.readdirSync(path)) {
        const re = /\[.*?\].tsx/;
        if (file.match(re))
          return false;
      }
    }
  }

  return true;
}
