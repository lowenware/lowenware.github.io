import { Logo } from "~/assets"
import { MenuSwitch } from "../menu"

export const Header:React.FC=({})=>{

    return<div className="h-144 flex justify-between">
        <span className="self-center p-32 fixed top-0 left-0"><Logo.Lowenware/></span>
        <span className="mx-auto text-h3 before:w-1 before:mx-auto before:block before:content-[' '] before:bg-grey-600 before:h-14">Löwenware</span>
        <MenuSwitch/>
    </div>
}