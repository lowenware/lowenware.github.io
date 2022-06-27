import fs from "fs";
import matter from "gray-matter";
import path from "path";

import {site} from "~/config";

import {StaticPageMeta} from "./content-manager";

export interface BlogPostMetaRaw extends StaticPageMeta {
  slug: string,
  title: string,
  summary?: string,
  tags: string,
  image: string | null,
  comments: boolean,
}

export interface BlogPostMeta extends Omit<BlogPostMetaRaw, "date" | "tags"> {
  date: Date,
  tags: string[],
}

export interface Tag {
  label: string,
  count: number,
}

export interface BlogPost<T> {
  meta: T,
  content: string,
}

export interface BlogStaticProps {
  mode: "PAGE" | "TAG",
  meta: StaticPageMeta,
  tag?: string,
  posts: BlogPostMetaRaw[],
  tags: Tag[],
  page: number,
  totalPages: number,
}

export interface BlogPostStaticProps {
  mode: "POST",
  meta: StaticPageMeta,
  post: BlogPost<BlogPostMetaRaw>,
  tags: Tag[],
  prev: BlogPostMetaRaw | null,
  next: BlogPostMetaRaw | null,
}

export class Blog {
  private root: string;
  posts: BlogPostMeta[];
  tags: Tag[];

  constructor(
    private meta: StaticPageMeta,
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
      meta: this.meta,
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
      meta: this.meta,
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
      meta: this.meta,
      post: {
        meta: mapBlogPostMetaToRaw(meta),
        content,
      },
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
      .sort((post1, post2) => (post2.date?.getTime() || 0) - (post1.date?.getTime() || 0));
  }

  getRawBlogPosts(sliceTo: number): BlogPostMetaRaw[] {
    return this.getBlogPosts().slice(0, sliceTo).map(mapBlogPostMetaToRaw);
  }

  private readBlogPost(fileName: string): BlogPost<BlogPostMeta> {
    const filePath = `${this.root}/${fileName}`;
    const {data, content} = matter(fs.readFileSync(filePath));
    ["title", "summary", "date"].forEach(field => {
      if (!data[field]) {
        throw `File '${filePath}' has not '${field}' meta data`;
      }
    });

    const {title, summary, date, tags, image, comments} = data;
    const slug = fileName.replace(this.extension, "");

    return {
      meta: mapBlogPostRawToMeta({
        slug,
        title,
        summary,
        date,
        tags,
        image,
        url: path.join(this.meta.url, slug),
        menu: null,
        order: 0,
        comments: comments === false ? false : true,
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

export const mapBlogPostMetaToRaw = (meta: BlogPostMeta): BlogPostMetaRaw => ({
  ...meta,
  tags: meta.tags.join(","),
  date: meta.date ? meta.date.toISOString() : null,
});

export const mapBlogPostRawToMeta = (raw: BlogPostMetaRaw): BlogPostMeta => ({
  ...raw,
  date: new Date(raw.date!),
  tags: raw.tags
    ? `${raw.tags}`.split(",").map(t => t.trim().toLowerCase())
    : [],
  image: raw.image || null,
});
