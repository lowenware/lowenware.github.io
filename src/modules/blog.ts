import fs from "fs";
import matter from "gray-matter";
import path from "path";

import {site} from "~/config";

export interface BlogPostRaw {
  slug: string,
  title: string,
  summary: string,
  date: string,
  tags: string,
  image: string | null,
}

export interface BlogPostMeta {
  slug: string,
  title: string,
  summary: string,
  date: Date,
  tags: string[],
  image: string | null,
}

export interface Tag {
  label: string,
  count: number,
}

export interface BlogPost {
  meta: BlogPostMeta,
  content: string,
}

export interface BlogStaticProps {
  mode: "PAGE" | "TAG",
  tag?: string,
  posts: BlogPostRaw[],
  tags: Tag[],
  page: number,
  totalPages: number,
}

export interface BlogPostStaticProps {
  mode: "POST",
  meta: BlogPostRaw,
  content: string,
  tags: Tag[],
  prev: BlogPostRaw | null,
  next: BlogPostRaw | null,
}

export class Blog {
  private root: string;
  posts: BlogPostMeta[];
  tags: Tag[];

  constructor(
    private extension: string = site.content.extension,
    private postsPerPage: number = site.blog.postsPerPage,
  ) {

    this.root = path.join(site.content.root, site.blog.slug);
    this.posts = this.getBlogPosts();
    this.tags = this.getTagsFromPosts(this.posts);
  }

  getStaticPaths() {
    const pagesCount = this.countPages(this.posts.length, this.postsPerPage);
    return [
      {
        params: {
          slug: [],
        },
      },
      // posts
      ...this.posts.map(post => ({
        params: {
          slug: [post.slug],
        },
      })),
      // pages
      ...Array.from(Array(pagesCount).keys()).map(pageNum => ({
        params: {
          slug: [`${pageNum + 1}`],
        },
      })),
      // tags
      ...this.tags.flatMap(tag => [
        ...Array.from(
          Array(this.countPages(tag.count, this.postsPerPage)).keys()
        ).map(pageNum => ({
          params: {
            slug: [tag.label, `${pageNum + 1}`],
          },
        })),
        {
          params: {
            slug: [tag.label],
          },
        },
      ]),
    ];
  }

  getBlogPageStaticProps(pageNumber: number): BlogStaticProps {
    const {posts, totalPages, page} = this.paginate(
      this.posts,
      pageNumber,
      this.postsPerPage
    );

    return {
      mode: "PAGE",
      posts: posts.map(mapBlogPostMetaToRaw),
      tags: this.tags,
      totalPages,
      page,
    };
  }

  getBlogTagStaticProps(tag: string, pageNumber: number): BlogStaticProps {
    const {posts, totalPages, page} = this.paginate(
      this.posts.filter(p => p.tags.includes(tag)),
      pageNumber,
      this.postsPerPage
    );

    return {
      mode: "TAG",
      tag,
      posts: posts.map(mapBlogPostMetaToRaw),
      tags: this.tags,
      totalPages,
      page,
    };
  }

  private paginate<T>(posts: T[], page: number, perPage: number) {
    const totalPages = this.countPages(posts.length, perPage);

    if (page > totalPages) {
      page = 0;
    }

    const offsetFrom = (page - 1) * perPage;
    const offsetTo = offsetFrom + perPage;
    return {
      posts: posts.slice(offsetFrom, offsetTo),
      totalPages,
      page,
    };
  }

  private countPages(itemsCount: number, perPage: number) {
    return Math.ceil(itemsCount / perPage);
  }

  getBlogPostStaticProps(slug: string): BlogPostStaticProps {
    const {meta, content} = this.readBlogPost(`${slug}.md`);
    const index = this.posts.findIndex(p => p.slug === slug)!;

    let prev = null,
      next = null;

    if (index > 0) {
      prev = mapBlogPostMetaToRaw(this.posts[index - 1]);
    }
    if (index < this.posts.length - 1) {
      next = mapBlogPostMetaToRaw(this.posts[index + 1]);
    }

    return {
      mode: "POST",
      meta: mapBlogPostMetaToRaw(meta),
      content,
      prev,
      next,
      tags: this.tags,
    };
  }

  getBlogStaticProps(slugs: string[]): BlogStaticProps | BlogPostStaticProps {
    const [slug, page] = slugs;
    const re = /^\d+$/;

    // slug is tag
    if (this.tags.find(t => t.label === slug)) {
      return this.getBlogTagStaticProps(
        slug,
        re.test(page) ? parseInt(page) : 1
      );
    }

    // slug is page number
    if (re.test(slug)) {
      return this.getBlogPageStaticProps(parseInt(slug));
    }

    return this.getBlogPostStaticProps(slug);
  }

  getBlogPosts(): BlogPostMeta[] {
    return fs
      .readdirSync(this.root)
      .filter(fileName => fileName.endsWith(this.extension))
      .map(fileName => this.readBlogPost(fileName).meta)
      .sort((post1, post2) => post1.date.getTime() - post2.date.getTime());
  }

  getRawBlogPosts(sliceTo: number): BlogPostRaw[] {
    return this.getBlogPosts().slice(0, sliceTo).map(mapBlogPostMetaToRaw);
  }

  private readBlogPost(fileName: string): BlogPost {
    const filePath = `${this.root}/${fileName}`;
    const {data, content} = matter(fs.readFileSync(filePath));
    ["title", "summary", "date"].forEach(field => {
      if (!data[field]) {
        throw `File '${filePath}' has not '${field}' meta data`;
      }
    });

    const {title, summary, date, tags, image} = data;

    return {
      meta: mapBlogPostRawToMeta({
        slug: fileName.replace(this.extension, ""),
        title,
        summary,
        date,
        tags,
        image,
      }),
      content,
    };
  }

  private getTagsFromPosts(posts: BlogPostMeta[]) {
    const tags: Tag[] = [];
    posts.forEach(post =>
      post.tags.forEach(t => {
        const label = t.trim();
        const tag = tags.find(t => t.label === label);

        if (tag) {
          tag.count += 1;
        } else {
          tags.push({
            label,
            count: 1,
          });
        }
      })
    );
    return tags;
  }
}

export const mapBlogPostMetaToRaw = (meta: BlogPostMeta): BlogPostRaw => ({
  ...meta,
  tags: meta.tags.join(","),
  date: meta.date.toISOString(),
});

export const mapBlogPostRawToMeta = (raw: BlogPostRaw): BlogPostMeta => ({
  ...raw,
  date: new Date(raw.date),
  tags: raw.tags
    ? `${raw.tags}`.split(",").map(t => t.trim().toLowerCase())
    : [],
  image: raw.image || null,
});
