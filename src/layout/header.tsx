import classNames from "classnames";
import Link from "next/link";

import {NavigationMeta} from "./menu";
import {MenuSwitch} from "./menu-switch";

interface HeaderProps {
  section?: NavigationMeta,
  title: string,
}

export const Header: React.FC<HeaderProps> = ({
  title,
  section,
}) => {
  return (
    <div className="h-80 lg:h-144 flex flex-row justify-between pl-80 lg:pl-0">
      <div className="flex grow justify-center">
        <div className={classNames(
          "before:w-1 before:mx-auto before:block",
          "before:bg-grey-600 before:h-16 lg:before:h-48"
        )}>
          <div className="flex flex-row space-x-16 text-lg">
            {section && (
              <>
                <Link href={section.url}>
                  <a>{section.menu}</a>
                </Link>
                <span>/</span>
              </>
            )}
            {!section && (<h1>{title}</h1>)}
          </div>
        </div>
      </div>
      <MenuSwitch />

    </div>
  );
};
