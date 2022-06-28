import { ReactNode } from "react"
import { SocialMeta, StaticPageMeta } from "~/modules/content-manager"
import { Footer } from "./footer"
import { Header } from "./header"
import { Menu } from "./menu"


interface PageLayoutProps{
    children:ReactNode
    links:StaticPageMeta[]
    social:SocialMeta[]
    currentPage:string
}

export const PageLayout: React.FC<PageLayoutProps> = ({currentPage,children,links,social}) => {
    return<div className="w-full relative h-full bg">
        <section className="px-144 ">
        <Header/>
    <Menu currentPage={currentPage} links={links} />
    {children} 
    </section>
    <Footer social={social}/>
    </div>}