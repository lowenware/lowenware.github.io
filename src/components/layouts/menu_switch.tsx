import React from "react";

const MenuSwitch: React.FC = () => { // TODO: fix issues

  const click = (e: React.MouseEvent) => {
    // initialize menu
    e.preventDefault();
    const menu = document.getElementById("menu");
    const menuList = document.getElementById("menu-list")
    const menuSwitch =  document.getElementById("menu-switch")
    menu?.classList.toggle("opened-nav");
    menuList?.classList.toggle("opened-list");
    menuSwitch?.classList.toggle("opened");
  };

  return (
    <a href="#" id="menu-switch" className="menu-switch flex items-center justify-center absolute right-48 top-64" title="Switch menu" onClick={click}>
    <svg className="icon path w-32 h-32 fill-dark-super hover:fill-blue" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="24 24">
        <g className="svg-group">
          <path className="path lines" d="m0 4v2h24v-2zm0 7v2h24v-2zm0 7v2h24v-2z" />
          <path className="path cross" d="m4.22 2.81-1.42 1.42 7.78 7.78-7.78 7.78 1.42 1.42 7.78-7.78 7.78 7.78 1.42-1.42-7.78-7.78 7.78-7.78-1.42-1.42-7.78 7.78z" />
        </g>
      </svg>
    </a>
  );
};

export default MenuSwitch;
