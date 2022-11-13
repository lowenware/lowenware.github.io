export const site = {
  name: "Löwenware",
  content: {
    extension: process.env.CONTENT_EXTENSION || ".md",
    root: process.env.CONTENT_ROOT || "content",
  },
  home: {
    slug: process.env.HOME_SLUG || "home",
    maxBlogPosts: 6,
  },
  blog: {
    slug: process.env.BLOG_SLUG || "blog",
    postsPerPage: 9,
  },
  about: {
    slug: process.env.ABOUT_SLUG || "about",
  },
  contact: {
    slug: process.env.CONTACT_SLUG || "contact",
  },
  community: {
    slug: process.env.COMMUNITY_SLUG || "community",
  },
  technologies: {
    slug: process.env.TECHNOLOGIES_SLUG || "technologies",
  },
  dotrix: {
    slug: process.env.DOTRIX_SLUG || "dotrix",
  },
};
