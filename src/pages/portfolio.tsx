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
import { Button, PageLayout } from '../components'

interface PortfolioProps {
  meta: StaticPageMeta
  posts: BlogPostRaw[]
  portfolio: StaticContent[]
}
const Portfolio: NextPage<PageProps<PortfolioProps>> = ({
  menu,
  social,
  data,
}) => {
  const { meta, portfolio } = data

  return (
    <>
      <Head>
        <title>
          {meta.title} - {site.name}
        </title>
      </Head>

      <PageLayout
        className="flex flex-col relative"
        currentPage="portfolio"
        links={menu}
        social={social}
      >
        <section className="min-h-screen"></section>
      </PageLayout>
    </>
  )
}

export const getStaticProps = async () => {
  const manager = new ContentManager()
  return {
    props: manager.getPageProps({
      meta: manager.page(site.portfolio.slug),
      //TODO Why slug contains .md
      portfolio: manager.readFolderOrdered(['portfolio']),
    }),
  }
}
export default Portfolio
