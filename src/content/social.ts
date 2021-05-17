import ILink from "src/interfaces/link";

interface ISocial {
  links: {
    github: ILink,
    twitter: ILink,
    linkedin: ILink,
    youtube: ILink,
  }
}

const social: ISocial = { // TODO: use /goto/github or http?
  links: {
    github: {
      title: "Go to GitHub",
      href: "https://github.com/lowenware",
      icon: {
        src: "/icon/sprite.svg#github",
        alt: "github logo",
      },
    },
    twitter: {
      title: "Go to Twitter page",
      href:"https://twitter.com/lowenware",
      icon: {
        src: "/icon/sprite.svg#twitter",
        alt: "twitter logo",
      },
    },
    linkedin: {
      title: "Go to LinkedIn profile",
      href:"https://www.linkedin.com/company/lowenware",
      icon: {
        src: "/icon/sprite.svg#linkedin",
        alt: "linkedin logo",
      },
    },
    youtube: {
      title: "Go to YouTube channel",
      href:"https://www.youtube.com/channel/UCdriNXRizbBFQhqZefaw44A",
      icon: {
        src: "/icon/sprite.svg#youtube",
        alt: "youtube logo",
      },
    }
  }
};

export default social;
