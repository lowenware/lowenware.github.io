import { Logo } from "~/assets"
import { StaticContent } from "~/modules/content-manager"
import { Button } from "../button"


interface ServicesProps{
    services:StaticContent[]
}

export const Services:React.FC<ServicesProps>=({services})=>{
 return<section className="flex flex-col">
    <div className="w-full sm:h-144 bg-dark-super flex flex-col">
       <div className="flex w-full sm:flex-row flex-col items-center h-full py-32 md:px-32 lg:space-x-16 space-y-16 lg:space-y-0 justify-between">
        <h3 className="text-white">Sevices</h3>
        <p className="text-center text-white">Looking for a subcontractor? Lets make something great together!</p>
        <Button variant="outline" className="text-center" href={""}>Get Started</Button>
       </div>
          
          </div>
          <div className="w-32 h-32 mx-auto -translate-y-16 rotate-45 bg-dark-super"></div>
    <ul className="w-3/4 mx-auto justify-center flex flex-wrap space-x-16 lg:space-x-32 space-y-16 py-16">
       {services && (
        services.map((servic,key)=>{
            return <li className="mt-auto lg:w-80 lg:h-80 w-64 h-64 space-y-64 flex grayscale hover:grayscale-0 duration-500" key={key}>{Logo.from(servic.meta["label"])}</li>
        })
       )}
    </ul>
 </section>   
}