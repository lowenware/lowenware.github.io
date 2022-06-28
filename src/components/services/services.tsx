import { Logo } from "~/assets"
import { StaticContent } from "~/modules/content-manager"
import { Button } from "../button"


interface ServicesProps{
    services:StaticContent[]
}

export const Services:React.FC<ServicesProps>=({services})=>{
 return<section className="flex flex-col ">
    <div className="w-full h-144 bg-dark-super relative flex flex-col">
       <div className="flex justify-between items-center h-full px-32">
        <h3>Sevices</h3>
        <p className="text-center text-white">Looking for a subcontractor? Lets make something great together!</p>
        <Button variant="outline" href={""}>Get Started</Button>
       </div>
          <div className="w-32 h-32 bg-dark-super rotate-45 absolute left-1/2 -mt-16 top-full"></div>
          </div>
    <ul className="w-3/4 h-144 mx-auto flex space-x-32">
       {services && (
        services.map((servic,key)=>{
            return<li className="mt-auto w-64 h-64 space-y-64 flex grayscale hover:grayscale-0 duration-500" key={key}>{Logo.from(servic.meta["label"])}</li>
        })
       )}
    </ul>
 </section>   
}