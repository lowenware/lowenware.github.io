import classNames from "classnames";
import { Logo } from "~/assets";
import { StaticContent } from "~/modules/content-manager";

interface AboutProps{
    about:StaticContent[]
}

export const CardAbout:React.FC<AboutProps> = ({about}) => {

  return (
    <>
    {about &&(about.map((about,key)=>{
        
        return<div key={key} className="p-32 border border-grey-600 lg:w-1/3 w-3/4 h-min">
        <div className="flex flex-col">
            <div className="">
            <span className="lg:self-center w-128 h-128 rounded-full border float-right" >{Logo.from(about.meta.label)}</span>
            <span>{about.content}</span>
         
            </div>
        </div>
      </div>
    }))}
      
    </>
  );
};
