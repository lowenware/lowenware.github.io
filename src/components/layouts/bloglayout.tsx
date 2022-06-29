import { site } from '~/config'
import { BlogPostMeta, Tag } from '~/modules/blog'
import {
  ContentManager,
  SocialMeta,
  StaticPageMeta,
} from '~/modules/content-manager'
import { BlogPosts } from '../blog'

// import {BlogPosts} from "./blog-posts";
import { PageLayout } from './pagelayout'

interface BlogProps {
  posts: BlogPostMeta[]
  totalPages: number
  page: number
  tags: Tag[]
  tag?: string
}

interface BlogLayoutProps {
  menu: StaticPageMeta[]
  social: SocialMeta[]
  blog: BlogProps
}

export const BlogLayout: React.FC<BlogLayoutProps> = ({
  menu,
  social,
  blog,
}) => {
  const root = ContentManager.root(menu, site.blog.slug)
  const { posts, totalPages, page, tag } = blog
  return (
    <PageLayout className='' currentPage={site.blog.slug} links={menu} social={social}>
    <section className="w-full px-16 space-y-16">
      <h2>
        Blog
        {tag && (
          <span className="text-purple">
            <span className="mx-24">#</span>
            {tag}
          </span>
        )}
      </h2>

        <div className='flex flex-col space-y-16'>
        <div>
            <p className='uppercase'>
                Categories
            </p>
            <ul className='flex gap-x-8 flex-wrap'>
                <li><a className='text-blue' href="#">@tag<span className='text-dark'>[number]</span></a></li>
                <li><a className='text-blue' href="#">@tag<span className='text-dark'>[number]</span></a></li>
                <li><a className='text-blue' href="#">@tag<span className='text-dark'>[number]</span></a></li>
                <li><a className='text-blue' href="#">@tag<span className='text-dark'>[number]</span></a></li>
            </ul>
        </div>
        <div >
        <p className='uppercase'>
        Tags
            </p>
            <ul className='flex gap-x-8 flex-wrap'>
            {posts.map((post,key)=>{
    return <li key={key}><a className='text-blue' href={post.slug}>#{post.tags.map((tags,key)=>{        
        return<>{tags}</>
    })}<span className='text-dark'>[{post.tags.length}]</span></a></li>
})}
            </ul>
        </div>
        <BlogPosts posts={posts} className="w-full min-h-min -mt-32" />
        </div>
      </section>

     

      {/* <Paginator
        className="my-24"
        page={page}
        totalPages={totalPages}
        root={tag ? `${root.url}/${tag}` : root.url}
      /> */}
    </PageLayout>
  )
}
