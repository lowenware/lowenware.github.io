import Link from "next/link"
import LowenwareLogo from "assets/lowenware-logo.svg"
import { MenuSwitch } from "../menu"
import classNames from "classnames"

interface HeaderProps{
    currentPage:string
}
export const Header:React.FC<HeaderProps>=({currentPage})=>{

    if(currentPage!=="home"){
    return<div className="lg:h-144 flex relative justify-between">
        <Link href={"/"}><a className={classNames("relative self-center m-16 lg:left-16 lg:fixed scale-75 lg:scale-100 lg:w-80 lg:h-80 duration-500",currentPage!=="home"?"hover:text-blue":"cursor-default")}><LowenwareLogo/></a></Link>
        <span className="lg:mx-auto lg:text-h3 text-large before:w-1 before:mx-auto before:block before:content-[' '] before:bg-grey-600 before:h-48">Löwenware</span>
       <MenuSwitch/>
    </div>}
    if(currentPage==="home"){
        return<div className="lg:h-144 flex relative justify-between">
        <a className={classNames("relative self-center m-16 lg:left-16 lg:fixed scale-75 lg:scale-100 lg:w-80 lg:h-80 duration-500",currentPage!=="home"?"hover:text-blue":"cursor-default")}><LowenwareLogo/></a>
        <span className="lg:mx-auto lg:text-h3 text-large before:w-1 before:mx-auto before:block before:content-[' '] before:bg-grey-600 before:h-48">Löwenware</span>
       <MenuSwitch/>
    </div>}
    return<></>
    }
