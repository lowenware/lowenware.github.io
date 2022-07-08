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
    postsPerPage: 4,
  },
  about: {
    slug: process.env.ABOUT_SLUG || "about",
  },
  community: {
    slug: process.env.COMMUNITY_SLUG || "community",
  },
   services: {
    slug: process.env.SERVICES_SLUG || "services",
  },
  portfolio: {
    slug: process.env.PORTFOLIO_SLUG || "portfolio",
  },
  product: {
    slug: process.env.PRODUCT_SLUG || "product",
  },
};
