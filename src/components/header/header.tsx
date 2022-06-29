import Link from "next/link"
import { Logo } from "~/assets"
import { MenuSwitch } from "../menu"

export const Header:React.FC=({})=>{

    return<div className="lg:h-144 flex relative justify-between">
        <Link href="/"><a className="relative self-center m-16 lg:left-16 lg:fixed w-64 h-64 lg:w-80 lg:h-80"><Logo.Lowenware/></a></Link>
        <span className="lg:mx-auto lg:text-h3 text-medium before:w-1 before:mx-auto before:block before:content-[' '] before:bg-grey-600 before:h-32 lg:before:h-48">Löwenware</span>
       <MenuSwitch/>
    </div>
}