import Link from "next/link";

import {Logo} from "~/assets";
import {SocialMeta} from "~/modules/content-manager";

interface FooterProps {
  social: SocialMeta[],
}

export const Footer: React.FC<FooterProps> = ({social}) => {
  const year = (new Date()).getFullYear();
  return (
    <div className="w-full flex flex-row">
      <div className="hidden lg:flex flex-row items-center justify-center text-center w-144 text-white bg-dark text-lg">
        <div className="-rotate-90">
          Löwenware
        </div>
      </div>
      <div className="flex flex-col grow items-stretch">
        <ul className="flex justify-center lg:justify-end space-x-24 h-144 lg:h-144 items-center lg:pr-144">
          {social.map(link => (
            <Link key={link.slug} href={link.url}>
              <a>
                {Logo.from(link.label)}
              </a>
            </Link>
          ))}
        </ul>

        <div className="text-sm sm:text-md sm:h-144 py-8 lg:pr-144 w-full flex bg-dark text-white">
          <div className="m-auto z-10">
            <div className="copyright">
              &copy; 2017 - {year} by Löwenware s.r.o.
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-16 items-center">
              <Link href="/privacy-statement/">
                <a className="text-blue hover:text-white">
                  Privacy statement
                </a>
              </Link>
              <span className="hidden sm:block">|</span>
              <Link href="/terms-of-use/">
                <a className="text-blue hover:text-white">
                  Terms of use
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
