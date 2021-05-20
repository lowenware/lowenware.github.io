import { getAllDynamicPages, getDynamicPageBySlug } from "src/lib/markdown";
import array_starts_with from "src/helpers/array_starts_with";
import Categories from "src/components/partials/taxonomy/categories";
import FormattedDate from "src/components/partials/date";
import IMetadata from "src/interfaces/page/metadata";
import MainLayout from "src/components/layouts/main";
import React from "react";
import Tags from "src/components/partials/taxonomy/tags";
import ToUrl from "src/helpers/slug_to_url";
import { sortByDate, sortByWeight } from "src/interfaces/page/sort";

interface IPageWithContent {
  slug: string[],
  content: string,
  metadata: IMetadata,
}

interface IPageMetadata {
  slug: string[],
  metadata: IMetadata,
}

interface IPageParams {
  page: IPageWithContent,
  recentPosts: IPageMetadata[],
  slide: {
    primary: IPageMetadata,
    secondary: IPageMetadata[],
  }
}

const HomePage: React.FC<IPageParams> = ({ page, recentPosts, slide }) => {
  const {
    content,
    metadata,
  } = page;

  const {
    title,
    description,
  } = metadata;

  return (
    <MainLayout>

      <div className="content home-content">
        <section id="slide" className="home-slide">
          <div className="wrapper">
            <div className="left">
              <h1><a href={ToUrl(...slide.primary.slug)}>{slide.primary.metadata.title}</a></h1>
              <p>{slide.primary.metadata.details}</p>
            </div>
            <div className="right">
              {slide.secondary.map(({ slug, metadata }) => (
                <article key={ToUrl(...slug)} className="article">
                  <h1><a href={ToUrl(...slug)}>{metadata.title}</a></h1>
                  <p>{metadata.details}</p>
                </article>
              ))}

            </div>
          </div>
          <div className="overlay">
            <p>A bit more than just a Software Studio</p>
            <a href="/about/">About Löwenware</a>
          </div>
        </section>

        <div className="home-projects">
          <section className="section-link left">
            <a href="/leos/" className="boxed">
              <h1>LeOS</h1>
              <p>Operating system for ARM64</p>
            </a>
          </section>

          <section className="section-link middle">
            <a href="/aisl/" className="boxed">
              <h1>AISL</h1>
              <p>Web Development in C</p>
            </a>
          </section>

          <section className="section-link right">
            <a href="http://github.com/lowenware/" className="boxed">
              <h1>Open Source</h1>
              <p>Discover on Github</p>
            </a>
          </section>
        </div>

        <section className="section posts">
          <div className="title">Recent posts</div>
          {recentPosts.map(post => (
            <article key={ToUrl(...post.slug)} className="article">
              <a href={ToUrl(...post.slug)}>{post.metadata["title"]}</a>
              <> &ndash; </>
              <span className="timestamp">
                <FormattedDate date={post.metadata["date"]} />
              </span>
              <div className="taxonomy">
                <Categories categories={post.metadata.categories} />
                <> / </>
                <span className="tags">
                  <Tags tags={post.metadata.tags} />
                </span>
              </div>
            </article>
          ))}
          <a href="/blog/" className="button">Go to blog</a>
        </section>


        <section className="services">
          <div className="dark-bg">
            <div className="left">
              <h1>Services</h1>
            </div>

            <div className="middle">
              <p>Looking for a subcontractor? Lets make something great together!</p>
            </div>

            <div className="right">
              <a href="/contact/?get-started" className="button">Get Started</a>
            </div>
          </div>
          <div className="arrow"></div>

          <div className="technologies">
            <img className="icon" src="/icon/angular.svg" />
            <img className="icon" src="/icon/arm.svg" />
            <img className="icon" src="/icon/c-2975.svg" />
            <img className="icon" src="/icon/html5.svg" />
            <img className="icon" src="/icon/python-5.svg" />
            <img className="icon" src="/icon/react.svg" />
            <img className="icon" src="/icon/rust.svg" />
            <img className="icon" src="/icon/typescript.svg" />
          </div>
        </section>
      </div>

    </MainLayout>
  );
};

function getRecentPosts(max: number) {
  return getAllDynamicPages({ content: false, metadata: true })
    .filter(({ metadata }) => metadata && metadata.date && metadata.publication)
    .sort((a, b) => sortByDate(a.metadata, b.metadata))
    .slice(0, max);
}

export async function getStaticProps() {
  const slug = ["home"];
  const page = getDynamicPageBySlug(slug, { content: true, metadata: true });
  const recentPosts = getRecentPosts(10);

  const slideTargetSlug = ["dotrix"];
  const slide = {
    primary: getDynamicPageBySlug(slideTargetSlug, { content: true, metadata: true }),
    secondary: getAllDynamicPages({ content: false, metadata: true })
      .filter(({ slug }) => array_starts_with(slug, ...slideTargetSlug))
      .filter(({ metadata }) => metadata && metadata.sticky)
      .sort((a, b) => sortByWeight(a.metadata, b.metadata))
  };

  return {
    props: {
      page: {
        ...page,
      },
      recentPosts,
      slide,
    },
  };
}

export default HomePage;
