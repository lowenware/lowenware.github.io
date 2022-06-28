import { NextPage } from 'next'
import { site } from '~/config'
import Head from 'next/head'
import { Blog, BlogPostRaw } from '~/modules/blog'
import {
  ContentManager,
  PageProps,
  StaticContent,
  StaticPageMeta,
} from '~/modules/content-manager'
import { PageLayout, RecentPosts } from '../components'
import Image from 'next/image'
import Link from 'next/link'
import { Services } from '~/components/services'
interface Home {
  meta: StaticPageMeta
  posts: BlogPostRaw[]
  services:StaticContent[]
}
const Home: NextPage<PageProps<Home>> = ({ menu, social, data }) => {
  const { meta, posts,services } = data

  const handbook = ContentManager.root(menu, site.home.slug)
  return (
    <>
      <Head>
        <title>
          {meta.title} - {site.name}
        </title>
      </Head>
      <PageLayout className="flex flex-col relative" currentPage="home" links={menu} social={social}>
        <section className="relative flex h-slide">
          <div className="z-30 justify-center w-full my-auto flex space-x-144">
            <div>
              <h1>
                <Link href={meta.url}>
                  <a href="#">{meta.title}</a>
                </Link>
              </h1>
              <p>Game Engine in Rust</p>
            </div>
            <div>
              <ul className="flex flex-col gap-16">
                <li className="flex flex-col space-y-8">
                  <Link href={''}>
                    <a className="text-large text-white" href="">
                      Handbook
                    </a>
                  </Link>
                  <span className="text-small">In Progress</span>
                </li>
                <li className="flex flex-col space-y-8">
                  <Link href={''}>
                    <a className="text-large text-white" href="">
                      Donate
                    </a>
                  </Link>
                  <span className="text-small">In Progress</span>
                </li>
              </ul>
            </div>
          </div>
          <Image
            alt=""
            src={'/'}
            layout="fill"
            width={'100'}
            height="100"
            className="w-full h-slide border border-dark bg-blue absolute z-10"
          />
        </section>
          <div className='w-10/12 h-144 mx-auto bg-white relative -mt-72 z-40 flex flex-col justify-center items-center space-y-16'>
            <span className='text-large'>A bit more than just a Software Studio</span>
            <Link href=""><a className='text-blue text-large' href="/about">About Löwenware</a></Link>
          </div>
          <section className='relative -mt-64'>
            <div className='flex w-full space-x-8'>
              <a className='w-1/3 h-60 bg-grey-200 hover:bg-grey-300 flex flex-col justify-center items-center space-y-16' href="">
                <p className='text-h3 text-blue'>LeOs</p>
                <span>Operating system for ARM64</span>
              </a>
              <a className='w-1/3 h-60 bg-grey-200 hover:bg-grey-300 flex flex-col justify-center items-center space-y-16' href="">
              <p className='text-h3 text-blue uppercase'>Aisl</p>
                <span>Web Development in C</span>
              </a>
              <a className='w-1/3 h-60 bg-grey-200 hover:bg-grey-300 flex flex-col justify-center items-center space-y-16' href="">
              <p className='text-h3 text-blue'>Open Source</p>
                <span>Discover on Github</span>
              </a>
            </div>
          </section>
          <RecentPosts/>
        <Services services={services}/>
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
