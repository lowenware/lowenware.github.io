
import {ReactNode} from "react";

import LogoAngular from "/assets/icon/logo-angular.svg";
import LogoArm from "/assets/icon/logo-arm.svg";
import LogoLangC from "/assets/icon/logo-c-2975.svg";
import LogoHtml5 from "/assets/icon/logo-html5.svg";
import LogoPython from "/assets/icon/logo-python-5.svg";
import LogoReact from "/assets/icon/logo-react.svg";
import LogoRust from "/assets/icon/logo-rust.svg";
import LogoTypeScript from "/assets/icon/logo-typescript.svg";
import LogoGithub from "/assets/logo-github.svg";
import LogoLinkeId from "/assets/logo-linkeid.svg";
import LogoTwitter from "/assets/logo-twitter.svg";
import LogoYoutube from "/assets/logo-youtube.svg";
import LogoLowenware from "/assets/lowenware-logo.svg";

export const Logo = {
  from: (label: string): ReactNode | undefined => {
    switch(label) {
    case "GitHub": return <LogoGithub />;
    case "Twitter": return <LogoTwitter />;
    case "YouTube": return <LogoYoutube />;
    case "LinkeId": return <LogoLinkeId />;
    case "Löwenware": return <LogoLowenware />;
    case "Angular": return <LogoAngular />;
    case "TypeScript": return <LogoTypeScript />;
    case "Python": return <LogoPython />;
    case "Html": return <LogoHtml5 />;
    case "Arm": return <LogoArm />;
    case "React": return <LogoReact />;
    case "LangC": return <LogoLangC />;
    case "Rust": return <LogoRust />;

    }
  }
};
