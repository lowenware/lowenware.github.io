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

interface Home {
  meta: StaticPageMeta
  posts: BlogPostRaw[]
  contact:StaticContent[]
}
const Home: NextPage<PageProps<Home>> = ({ menu, social, data }) => {
  const { meta, posts,contact } = data
console.log(data.contact);

  return (
    <>
      <Head>
        <title>
          {meta.title} - {site.name}
        </title>
      </Head>
      
      <PageLayout className="flex flex-col relative" currentPage="contact" links={menu} social={social}>
        {data.contact&&(
            data.contact.map((contact,key)=>{
               
 return  <section key={key} className='flex w-full'>
    <div className='flex flex-col w-1/2'>
      <div className="flex flex-col p-48 relative text-white min-h-min bg-dark space-y-32">
        <div className="space-y-32 flex flex-col">
          <h2>{contact.meta.title}</h2>
          <span>{contact.meta.summary}</span>
          <div className="space-y-16">
            <h3>{contact.meta.subTitle}</h3>
            <p className="org">{contact.meta.name}</p>
            <div className="label">Address:</div>
            <p className="adr">
              <span className="street-address">{contact.meta.street}</span><br />
              <span className="postal-code">{contact.meta.postalCode} </span>
              <span className="locality">{contact.meta.locality}</span><br />
              <span className="country-name">{contact.meta.country}</span>
            </p>
            <p>
              <span className="">Phone: </span>
              <a href={`tel:${contact.meta.phone}`} className="border-b-2 border-dotted border-white">{contact.meta.phone}</a>
            </p>
            <p className="org-id"><span className="label">Company ID: </span> <span className="value">{contact.meta.orgId}</span></p>
            <p className="org-iban"><span className="label">IBAN: </span> <span className="value">{contact.meta.iban}</span></p>
          </div>
        </div>
        </div>
        <div className="bg-dark h-32 w-32 -mt-16 mx-auto rotate-45 z-30"></div>
        <div className="-mt-16 h-288">
          <iframe width="100%" height="100%" id="gmap_canvas" src={"https://maps.google.com/maps?q=U Jezu 525/4&t=&z=17&ie=UTF8&iwloc=&output=embed"} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0}></iframe>
        </div>
      </div>
      
       
      <div className="feedback w-1/2 p-48">
        <form method="post" id="feedback__form">
          <div className="space-y-16 flex flex-col">
            <label htmlFor="feedback__msg" className='text-large'>Your Message</label>
            <textarea id="feedback__msg" className="h-288 w-full bg-grey-300 rounded-2xl p-8"></textarea>
          </div>
          <div className="pt-32">
            <label htmlFor="feedback__email" className='text-large'>Your E-Mail</label>
            <input type="email" id="feedback__email" defaultValue="" className="p-8 w-full bg-grey-300 rounded-2xl" />
          </div>
          <div className="py-8">
            By submitting this form you agree with <a
              href="/privacy-statement/" className='text-blue hover:text-dark duration-500'>Privacy Statement
              </a> and accept <a href="/terms-of-use/" className='text-blue hover:text-dark duration-500' >Terms of Use</a>.
          </div>
          <div className="flex justify-center">
            <Button href={''}><button type="submit" className="button">Send</button></Button>
          </div>
        </form>
      </div>

      </section>}))}
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
      contact: manager.readFolderOrdered(['contact']),
      posts: new Blog().getRawBlogPosts(site.home.maxBlogPosts),
    }),
  }
}
export default Home
