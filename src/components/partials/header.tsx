import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

import MenuSwitch from "./menu_switch";

const Logo: React.FC = () => (
  <svg className="icon logo">
    <use xlinkHref="/icon/sprite.svg#logo"/>
  </svg>
);

const Header: React.FC = () => {
  const router = useRouter();
  const isHome = router.asPath == "/";

  return (
    <div className="main-overlay">
      {isHome ? (
        <Logo/>
      ) : (
        <Link href="/">
          <a><Logo/></a>
        </Link>
      )}

      <MenuSwitch/>
      <div className="text-logo">Löwenware</div>
    </div>
  );
};

export default Header;
