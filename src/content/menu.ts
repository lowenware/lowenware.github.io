import ILink from "src/interfaces/link";

interface IMenu {
  links: {
    home: ILink,
    about: ILink,
    dotrix: ILink,
    leos: ILink,
    aisl: ILink,
    blog: ILink,
    contact: ILink,
  }
}

const menu: IMenu = {
  links: {
    home: {
      title: "Home",
      href: "/",
    },
    about: {
      title: "About",
      href:"/about"
    },
    dotrix: {
      title: "Dotrix",
      href:"/dotrix"
    },
    leos: {
      title: "LeOS",
      href:"/leos"
    },
    aisl: {
      title: "AISL",
      href:"/aisl"
    },
    blog: {
      title: "Blog",
      href:"/blog"
    },
    contact: {
      title: "Contact",
      href:"/contact"
    },
  }
};

export default menu;
