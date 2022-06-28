import classNames from "classnames"
import Link from "next/link"
import { StaticPageMeta } from "~/modules/content-manager"

interface MenuProps{
    currentPage:string
    links:StaticPageMeta[]
}
export const Menu:React.FC<MenuProps>=({currentPage,links})=>{

    return <nav id="menu" className="fixed w-full lg:w-144 top-144 lg:top-2/4 left-0 mt-0 lg:-mt-40 duration-700 transition ease-in -translate-x-full lg:-translate-x-0">
    <ul id="menu-list" className="px-32 text-medium font-light flex flex-col gap-32 lg:gap-0">
       {links&&(links.map(link=>{
        return <li key={link.slug} className="relative">
            <Link href={link.url}>
                <a className={classNames(currentPage !== link.slug ?"hover:text-blue before:duration-500 hover:before:w-24 before:w-0 before:h-1 hover:before:bg-dark-super before:absolute before:-left-32 before:top-1/2  hover:before:translate-x-0 before:-translate-x-24 before:transition before:block transition duration-500 ":undefined,
                    currentPage === link.slug ? "font-bold before:block before:top-1/2 before:absolute before:-left-32 before:transition before:duration-700 before:w-24 before:h-1 before:bg-blue" : undefined)}>{link.menu}</a>
              </Link>
            </li>}))}
    </ul>
  </nav>
}