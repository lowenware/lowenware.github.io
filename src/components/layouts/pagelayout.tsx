import { ReactNode } from "react"
import { StaticPageMeta } from "~/modules/content-manager"
import { Footer } from "./footer"
import { Header } from "./header"
import { Menu } from "./menu"


interface PageLayoutProps{
    children:ReactNode
    links:StaticPageMeta[]
    currentPage:string
}

export const PageLayout: React.FC<PageLayoutProps> = ({currentPage,children,links}) => {
    return<div className="w-full relative h-full">
        <section className="px-144">
        <Header/>
    <Menu currentPage={currentPage} links={links} />
    {children} 
    </section>
    <Footer/>
   
    </div>}