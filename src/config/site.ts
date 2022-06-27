export const site = {
  name: "Dotrix",
  content: {
    extension: process.env.CONTENT_EXTENSION || ".md",
    root: process.env.CONTENT_ROOT || "content",
  },
  home: {
    slug: process.env.HOME_SLUG || "home",
    maxBlogPosts: 8,
  },
  blog: {
    slug: process.env.BLOG_SLUG || "blog",
    postsPerPage: 16,
  },
  community: {
    slug: process.env.COMMUNITY_SLUG || "community",
  },
};
