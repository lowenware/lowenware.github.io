import React from "react";

interface IProps {

}

const Layout: React.FC<IProps> = (props) => {
  return (
    <>
      {props.children}
    </>
  );
};

export default Layout;
