import classNames from "classnames"
import { ReactNode } from "react"
import { SocialMeta, StaticPageMeta } from "~/modules/content-manager"
import { Footer,Header,Menu } from "~/components"

interface PageLayoutProps{
    children:ReactNode
    links:StaticPageMeta[]
    social:SocialMeta[]
    currentPage:string
    className?:string
}

export const PageLayout: React.FC<PageLayoutProps> = ({currentPage,children,links,social,className}) => {
    return<div className={classNames("w-full relative",className)}>
        <section className="px-0 lg:px-144 ">
        <Header/>
    <Menu currentPage={currentPage} links={links} />
    {children} 
    </section>
    <Footer social={social}/>
    </div>}