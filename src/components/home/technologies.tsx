import classNames from "classnames";

import {Logo} from "~/assets";
import {Button} from "~/components";
import {StaticPage, StaticPageMeta} from "~/modules/content-manager";

interface TechnologiesProps {
  list: StaticPage<StaticPageMeta>[],
}

export const Technologies: React.FC<TechnologiesProps> = ({list}) => {
  return (
    <section className="flex flex-col">
      <div
        className={classNames(
          "flex flex-col space-y-32 bg-dark text-white p-48 items-center",
          "md:flex-row md:space-y-0 md:space-x-32"
        )}
      >
        <h1 className="text-lg md:w-1/3 text-center uppercase">Our Technology stack</h1>
        <div className="md:w-1/3">
          <div className="text-center text-lg">
            Lets make something great together?
          </div>
        </div>
        <div className="flex md:w-1/3 justify-center">
          <Button variant="outline" href={"/contact"}>Contact us</Button>
        </div>
      </div>
      <div className="w-32 h-32 mx-auto -translate-y-16 rotate-45 bg-dark"></div>
      <ul className="justify-center flex flex-wrap space-x-16 lg:space-x-32 space-y-16 px-48">
        {list.map((tech, index) => (
          <li
            className="mt-auto lg:w-80 lg:h-80 w-64 h-64 space-y-64
                  flex grayscale hover:grayscale-0 duration-500"
            key={index}
          >
            {Logo.from(tech.meta.title)}
          </li>
        ))}
      </ul>
    </section>
  );
};
