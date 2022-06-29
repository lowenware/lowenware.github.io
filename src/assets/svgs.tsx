/* eslint-disable no-restricted-imports */
import LowenwareLogo from "assets/lowenware-logo.svg"
import LogoYoutube from "assets/logo-youtube.svg";
import LogoGithub from "assets/logo-github.svg";
import LogoTwitter from "assets/logo-twitter.svg";
import LogoLinkeId from "assets/logo-linkeid.svg"
import MenuIcon from "assets/menu-icon.svg"
import LogoLangC from "assets/icon/logo-c-2975.svg"
import LogoReact from "assets/icon/logo-react.svg"
import LogoArm from "assets/icon/logo-arm.svg"
import LogoHtml5 from "assets/icon/logo-html5.svg"
import LogoPython from "assets/icon/logo-python-5.svg"
import LogoRust from "assets/icon/logo-rust.svg"
import LogoAngular from "assets/icon/logo-angular.svg"
import LogoTypeScript from "assets/icon/logo-typescript.svg"
import {ReactNode} from "react";
/* eslint-enable no-restricted-imports */

/* eslint-disable @next/next/no-img-element */


export const Logo = {
  GitHub: () => <img src={LogoGithub} alt="GitHub" />,
  Lowenware: () => <img src={LowenwareLogo} className="hover:fill-blue" alt="Löwenware" />,
  Twitter: () => <img src={LogoTwitter} alt="Twitter" />,
  YouTube: () => <img src={LogoYoutube} alt="YouTube" />,
  LinkeId: () => <img src={LogoLinkeId} alt="YouTube" />,
  LogoLangC: () => <img src={LogoLangC} alt="LangC" />,
  LogoReact: () => <img src={LogoReact} alt="React" />,
  LogoArm: () => <img src={LogoArm} alt="Arm" />,
  LogoHtml5: () => <img src={LogoHtml5} alt="Html" />,
  LogoPython: () => <img src={LogoPython} alt="Python" />,
  LogoRust: () => <img src={LogoRust} alt="Rust" />,
  LogoAngular: () => <img src={LogoAngular} alt="Angular" />,
  LogoTypeScript: () => <img src={LogoTypeScript} alt="TypeScript" />,

  from: (label: string): ReactNode | undefined => {
    switch(label) {
    case "GitHub": return <Logo.GitHub />;
    case "Twitter": return <Logo.Twitter />;
    case "YouTube": return <Logo.YouTube />;
    case "LinkeId": return <Logo.LinkeId />;
    case "Angular": return <Logo.LogoAngular />;
    case "TypeScript": return <Logo.LogoTypeScript />;
    case "Python": return <Logo.LogoPython />;
    case "Html": return <Logo.LogoHtml5 />;
    case "Arm": return <Logo.LogoArm />;
    case "React": return <Logo.LogoReact />;
    case "LangC": return <Logo.LogoLangC />;
    case "Rust": return <Logo.LogoRust />;

    }
},}

export const Icon = {
  Menu: () => <img src={MenuIcon} alt="Menu" />,
};
