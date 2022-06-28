import Link from 'next/link'
import { ReactNode } from 'react'
import { Button } from '../button'

export const RecentPosts: React.FC = () => {
  return (
    <section className="w-full flex flex-col my-32 items-center space-y-16">
      <p className='text-h3 text-grey-500'>Recent Posts</p>
      <ul className='space-y-16 flex flex-col w-1/3'>
      <li>
          <div>
            <a className='text-blue hover:text-dark duration-500' href="">Link to Post</a>
            <span className='text-grey-600'> - Date 01.01.2001</span>
          </div>
          <span>
            <Link href="/"><a className="hover:text-blue duration-500" href='#'>@tag </a></Link>
            /
            <Link href="/"><a className="hover:text-blue duration-500" href='#'> #tags</a></Link>
            <Link href="/"><a className="hover:text-blue duration-500" href='#'> #tags</a></Link>
            <Link href="/"><a className="hover:text-blue duration-500" href='#'> #tags</a></Link>
            <Link href="/"><a className="hover:text-blue duration-500" href='#'> #tags</a></Link>
            <Link href="/"><a className="hover:text-blue duration-500" href='#'> #tags</a></Link>
            </span>
        </li>
        <li>
          <div>
            <a className='text-blue hover:text-dark duration-500' href="">Link to Post</a>
            <span className='text-grey-600'> - Date 01.01.2001</span>
          </div>
          <span>
            <Link href="/"><a className="hover:text-blue duration-500" href='#'>@tag </a></Link>
            /
            <Link href="/"><a className="hover:text-blue duration-500" href='#'> #tags</a></Link></span>
        </li>
        <li>
          <div>
            <a className='text-blue hover:text-dark duration-500' href="">Link to Post</a>
            <span className='text-grey-600'> - Date 01.01.2001</span>
          </div>
          <span>
            <Link href="/"><a className="hover:text-blue duration-500" href='#'>@tag </a></Link>
            /
            <Link href="/"><a className="hover:text-blue duration-500" href='#'> #tags</a></Link></span>
        </li>
        <li>
          <div>
            <a className='text-blue hover:text-dark duration-500' href="">Link to Post</a>
            <span className='text-grey-600'> - Date 01.01.2001</span>
          </div>
          <span>
            <Link href="/"><a className="hover:text-blue duration-500" href='#'>@tag </a></Link>
            /
            <Link href="/"><a className="hover:text-blue duration-500" href='#'> #tags</a></Link></span>
        </li>
        <li>
          <div>
            <a className='text-blue hover:text-dark duration-500' href="">Link to Post</a>
            <span className='text-grey-600'> - Date 01.01.2001</span>
          </div>
          <span>
            <Link href="/"><a className="hover:text-blue duration-500" href='#'>@tag </a></Link>
            /
            <Link href="/"><a className="hover:text-blue duration-500" href='#'> #tags</a></Link></span>
        </li>
        <li>
          <div>
            <a className='text-blue hover:text-dark duration-500' href="">Link to Post</a>
            <span className='text-grey-600'> - Date 01.01.2001</span>
          </div>
          <span>
            <Link href="/"><a className="hover:text-blue duration-500" href='#'>@tag </a></Link>
            /
            <Link href="/"><a className="hover:text-blue duration-500" href='#'> #tags</a></Link></span>
        </li>
      </ul>
      <Button href={''}>Go to Blog</Button>
    </section>
  )
}
