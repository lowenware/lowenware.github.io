import classNames from "classnames";
import Head from "next/head";
import Link from "next/link";
import {ReactNode} from "react";

import {Logo} from "~/assets";
import {SocialMeta, StaticPageMeta} from "~/modules/content-manager";

import {Footer} from "./footer";
import {Header} from "./header";
import {Menu, NavigationMeta} from "./menu";

interface PageLayoutProps {
  children: ReactNode,
  links: StaticPageMeta[],
  social: SocialMeta[],
  section?: NavigationMeta,
  page: NavigationMeta,
  className?: string,
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  page,
  section,
  children,
  links,
  social,
  className,
}) => {
  const currentPageTitle = page.slug === "home" ? "Löwenware" : (page.menu || page.title);
  return (
    <div
      className={classNames(
        "w-full min-h-full relative flex flex-col",
        className,
      )}
    >
      <div className="flex-grow px-0 lg:px-144">
        <Link href={"/"}>
          <a
            className={classNames(
              "absolute self-center scale-75 duration-500",
              "lg:fixed lg:left-32 lg:top-32 lg:scale-100",
            )}
          >
            {Logo.from("Löwenware")}
          </a>
        </Link>
        <Menu section={section || page} links={links} />
        <main>
          <Header title={currentPageTitle} section={section} />
          {children}
        </main>
      </div>
      <Footer social={social} />
    </div>
  );
};
