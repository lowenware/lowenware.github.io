/* eslint-disable no-restricted-imports */
import LowenwareLogo from "assets/lowenware-logo.svg"
import LogoYoutube from "assets/logo-youtube.svg";
import LogoGithub from "assets/logo-github.svg";
import LogoTwitter from "assets/logo-twitter.svg";
import LinkeId from "assets/logo-linkeid.svg"
import MenuIcon from "assets/menu-icon.svg"
import {ReactNode} from "react";
/* eslint-enable no-restricted-imports */

/* eslint-disable @next/next/no-img-element */


export const Logo = {
  GitHub: () => <img src={LogoGithub} alt="GitHub" />,
  Lowenware: () => <img src={LowenwareLogo} alt="Löwenware" />,
  Twitter: () => <img src={LogoTwitter} alt="Twitter" />,
  YouTube: () => <img src={LogoYoutube} alt="YouTube" />,
  LinkeId: () => <img src={LinkeId} alt="YouTube" />,
  from: (label: string): ReactNode | undefined => {
    switch(label) {
    case "GitHub": return <Logo.GitHub />;
    case "Twitter": return <Logo.Twitter />;
    case "YouTube": return <Logo.YouTube />;
    case "LinkeId": return <Logo.LinkeId />;
    }
},}

export const Icon = {
  Menu: () => <img src={MenuIcon} alt="Menu" />,
};
