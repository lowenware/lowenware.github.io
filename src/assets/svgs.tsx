/* eslint-disable no-restricted-imports */
import LowenwareLogo from "assets/icon/lowenware-logo.svg"
import {ReactNode} from "react";
/* eslint-enable no-restricted-imports */

/* eslint-disable @next/next/no-img-element */


export const Logo = {
  Lowenware: () => <img src={LowenwareLogo} alt="Lowenware" />,

  // from: (label: string): ReactNode | undefined => {
  //   switch(label) {
  //   case "GitHub": return ;
  //   case "Discord": return;
  //   case "Patreon": return ;
  //   case "Twitter": return ;
  //   case "YouTube": return ;
  //   }
  // },
};

// export const Icon = {
//   Menu: () => <img src={MenuIcon} alt="Menu" />,
// };
