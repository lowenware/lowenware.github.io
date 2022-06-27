import classNames from "classnames";
import Link from "next/link";

import {StaticPageMeta} from "~/modules/content-manager";

export type NavigationMeta = Pick<StaticPageMeta, "menu" | "title" | "slug" | "url">;

interface MenuProps {
  section: NavigationMeta,
  links: StaticPageMeta[],
}

export const Menu: React.FC<MenuProps> = ({section, links}) => {
  return (
    <nav
      id="menu"
      className={
        classNames(
          "duration-300 transition ease-in -translate-x-full",
          "absolute z-50 py-16 bg-white w-full left-0 top-80 mt-0",
          "lg:fixed lg:w-144 lg:top-2/4 lg:-mt-28 lg:-translate-x-0"
        )
      }
    >
      <ul
        id="menu-list"
        className={
          classNames(
            "px-32 text-sm flex flex-col lg:space-y-4 gap-32 lg:gap-0",
            "uppercase hover:text-blue transition-colors duration-500"
          )
        }
      >
        {links && links.map(link => (
          <li key={link.slug} className="relative">
            <Link href={link.url ? link.url : `/${link.slug}`}>
              <a
                className={
                  classNames(
                    "before:top-1/2 before:block before:h-1",
                    "before:absolute before:transition-width",
                    "before:-left-32",
                    section.url === link.url
                      ? "font-bold before:w-24 before:bg-blue"
                      : "hover:before:w-24 before:w-0 before:bg-dark",
                  )
                }
              >
                {link.menu}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
