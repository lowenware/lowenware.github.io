import { Logo } from "~/assets"

export const Footer:React.FC=({})=>{

    return <div className="absolute bottom-0 w-full">
        <span className="absolute -rotate-90 p-64 bottom-72 -left-72 w-288 h-144 bg-dark-super text-white text-h3 leading-3">Löwenware</span>
        <div className="h-144 border-2">

        </div>
        
    <div className="h-144 w-full flex bg-dark-super">

        <div className="m-auto text-white z-10">
            <div className="copyright">&copy; 2017 - 2021 by Löwenware s.r.o.</div>
            <div className="legal">
              <a className="text-blue" href="/privacy-statement/">Privacy statement</a><span> | </span>
              <a className="text-blue" href="/terms-of-use/">Terms of use</a>
            </div>
        </div>
    </div>
    </div>
}