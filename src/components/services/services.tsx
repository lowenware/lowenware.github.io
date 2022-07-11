import {Logo} from "~/assets";
import {Button} from "~/components";
import {StaticContent} from "~/modules/content-manager";

interface ServicesProps {
  services: StaticContent[],
}

export const Services: React.FC<ServicesProps> = ({services}) => {
  return (
    <section className="flex flex-col">
      <div className="services bg-dark-super text-white">
        <h3 className="left md:text-h2 text-h3 w-1/4 pl-16">Sevices</h3>
        <div className="middle w-1/2">
          <p className="text-center md:text-large">
            Looking for a subcontractor? Lets make something great together!
          </p>
        </div>
        <div className="right w-1/4 justify-end flex pr-16">
          <Button variant="outline" className="text-center px-4 py-8" href={"/contact"}>
            <span className="text-small sm:text-large">Get Started</span>
          </Button>
        </div>
      </div>
      <div className="w-32 h-32 mx-auto -translate-y-16 rotate-45 bg-dark-super"></div>
      <ul
        className="w-3/4 mx-auto justify-center
      flex flex-wrap space-x-16 lg:space-x-32 space-y-16 py-16"
      >
        {services &&
          services.map((servic, key) => {
            return (
              <li
                className="mt-auto lg:w-80 lg:h-80 w-64 h-64 space-y-64
                 flex grayscale hover:grayscale-0 duration-500"
                key={key}
              >
                {Logo.from(servic.meta["label"])}
              </li>
            );
          })}
      </ul>
    </section>
  );
};
