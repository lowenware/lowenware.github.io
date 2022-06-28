import Link from "next/link"
import { Logo } from "~/assets"
import { SocialMeta } from "~/modules/content-manager"
interface FooterProps{
    social:SocialMeta[]
}
export const Footer:React.FC<FooterProps>=({social})=>{
    return <div className="w-full mt-auto">
        <span className="absolute -rotate-90 p-64 bottom-72 -left-72 w-288 h-144 bg-dark-super text-white text-h3 leading-3 hidden lg:block">Löwenware</span>
       
            <ul className="flex justify-center lg:justify-end space-x-16 h-144 items-center px-16">
        {social.map(link => (
          <Link key={link.slug} href={link.url}>
            <div className="cursor-pointer">
              {Logo.from(link.label)}
            </div>
          </Link>
         ))}
         </ul>
       
        
    <div className="lg:h-144 py-8 lg:py-0 text-small lg:text-medium w-full flex bg-dark-super">

        <div className="m-auto text-white z-10">
            <div className="copyright">&copy; 2017 - 2021 by Löwenware s.r.o.</div>
            <div>
              <a className="text-blue hover:text-white duration-500" href="/privacy-statement/">Privacy statement</a><span> | </span>
              <a className="text-blue hover:text-white duration-500" href="/terms-of-use/">Terms of use</a>
            </div>
        </div>
    </div>
    </div>
}