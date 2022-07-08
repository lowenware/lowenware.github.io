import { NextPage } from 'next'
import { site } from '~/config'
import Head from 'next/head'
import { Blog, BlogPostRaw, mapBlogPostRawToMeta } from '~/modules/blog'
import {
  ContentManager,
  PageProps,
  StaticContent,
  StaticPageMeta,
} from '~/modules/content-manager'
import { hoverEffect, PageLayout, RecentPosts } from '../components'
import Link from 'next/link'
import { Services } from '~/components/services'
import classNames from 'classnames'
import Image from 'next/image'

interface Home {
  meta: StaticPageMeta
  posts: BlogPostRaw[]
  services: StaticContent[]
}
const Home: NextPage<PageProps<Home>> = ({ menu, social, data }) => {
  const { meta, posts, services } = data
  const title = `${meta.title} - ${site.name}`

  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <PageLayout
        className="flex flex-col relative min-h-full"
        currentPage="home"
        links={menu}
        social={social}
      >
        <section className="relative w-full flex h-640 bg-[url('/static/backgrounds-image/aisl-slide.jpg')] bg-cover bg-no-repeat bg-center">
          <div className="z-30 justify-center w-full my-auto flex space-x-144">
            <div className="">
              <h1 className="relative">
                <Link href={meta.url}>
                  <a
                    className={classNames(
                      hoverEffect,
                      'before:bg-white text-white before:top-1/2 before:-left-32',
                    )}
                    href="#"
                  >
                    {meta.title}
                  </a>
                </Link>
              </h1>
              <p className="text-white">Game Engine in Rust</p>
            </div>
            <div>
              <ul className="flex flex-col space-y-32">
                <li className="flex flex-col space-y-8">
                  <Link href={''}>
                    <a
                      className={classNames(
                        hoverEffect,
                        'text-large text-white before:bg-white relative before:top-1/2 hover:before:w-16 before:-left-32',
                      )}
                      href=""
                    >
                      Handbook
                    </a>
                  </Link>
                  <span className="text-small">In Progress</span>
                </li>
                <li className="flex flex-col space-y-8 relative">
                  <Link href={''}>
                    <a
                      className={classNames(
                        hoverEffect,
                        'text-large text-white before:bg-white relative before:top-1/2 hover:before:w-16 before:-left-32',
                      )}
                      href=""
                    >
                      Donate
                    </a>
                  </Link>
                  <span className="text-small">In Progress</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div className="sm:w-10/12 h-144 mx-auto bg-white relative -mt-72 z-40 flex flex-col justify-center items-center space-y-16">
          <span className="text-large">
            A bit more than just a Software Studio
          </span>
          <Link href="/about">
            <a className="text-blue text-large hover:text-dark-super duration-500">
              About Löwenware
            </a>
          </Link>
        </div>
        <section className="relative sm:-mt-64">
          <div className="flex flex-col sm:flex-row w-full sm:space-x-8 sm:space-y-0 space-y-8">
            <a
              className="sm:w-1/3 h-60 bg-grey-200 duration-500 hover:text-dark text-blue hover:bg-grey-300 flex flex-col justify-center items-center space-y-16"
              href=""
            >
              <span className="text-h3">LeOs</span>
              <span className="text-dark">Operating system for ARM64</span>
            </a>
            <a
              className="sm:w-1/3 h-60 bg-grey-200 duration-500 hover:bg-grey-300 flex hover:text-dark text-blue flex-col justify-center items-center space-y-16"
              href=""
            >
              <span className="text-h3 uppercase">Aisl</span>
              <span className="text-dark">Web Development in C</span>
            </a>
            <a
              className="sm:w-1/3 h-60 bg-grey-200 duration-500 hover:bg-grey-300 flex flex-col hover:text-dark text-blue justify-center items-center space-y-16"
              href=""
            >
              <span className="text-h3">Open Source</span>
              <span className="text-dark">Discover on Github</span>
            </a>
          </div>
        </section>
        <RecentPosts
          posts={posts.map(mapBlogPostRawToMeta)}
          postPerPage={site.home.maxBlogPosts}
        />
        <Services services={services} />
      </PageLayout>
    </>
  )
}

export const getStaticProps = async () => {
  const manager = new ContentManager()
  return {
    props: manager.getPageProps({
      meta: manager.page(site.home.slug),
      //TODO Why slug contains .md
      services: manager.readFolderOrdered(['services']),
      posts: new Blog().getRawBlogPosts(site.home.maxBlogPosts),
    }),
  }
}
export default Home
