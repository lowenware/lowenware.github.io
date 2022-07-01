import classNames from "classnames"
import Link from "next/link"
import { StaticPageMeta } from "~/modules/content-manager"

interface MenuProps{
    currentPage:string
    links:StaticPageMeta[]
}
export const hoverEffect = "before:duration-500 hover:before:w-24 before:w-0 before:h-1 before:absolute before:ease-in-out before:transition-all before:block" 
export const Menu:React.FC<MenuProps>=({currentPage,links})=>{

    return <nav id="menu" className="lg:fixed absolute z-50 py-16 bg-white w-full lg:w-144 lg:top-2/4 left-0 mt-0 lg:-mt-28 duration-300 transition ease-in -translate-x-full lg:-translate-x-0">
    <ul id="menu-list" className="px-32 text-medium font-light flex flex-col lg:space-y-4 gap-32 lg:gap-0">
       {links&&(links.map(link=>{
        return <li key={link.slug} className="relative">
              <Link href={link.url}>
                <a className={classNames(currentPage !== link.slug ?`uppercase hover:text-blue transition-colors duration-500 before:-left-32 before:top-1/2 hover:before:bg-dark-super ${hoverEffect}`:undefined,
                    currentPage === link.slug ? "uppercase font-bold before:block before:top-1/2 before:absolute before:-left-32 before:transition before:duration-700 before:w-24 before:h-1 before:bg-blue" : undefined)}>{link.menu}</a>
              </Link>
            </li>}))}
    </ul>
  </nav>
}