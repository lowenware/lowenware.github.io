import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

import menu from "src/content/menu";

const Menu: React.FC = () => {
  const router = useRouter();
  const slug = router.asPath.split("/").filter(s => s != "");
  const mainSection = "/" + (slug[0] || "");

  return (
    <nav id="menu" className="menu">
      <ul>
        {Object.entries(menu.links).map(([key, link]) => (
					<li key={key}>
						<Link href={link.href}>
							<a className={mainSection == link.href ? "active" : ""}>
								{link.title}
							</a>
						</Link>
					</li>
				))}
      </ul>
    </nav>
  );
};

export default Menu;
