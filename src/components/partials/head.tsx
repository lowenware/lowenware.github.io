import NextHead from "next/head";
import React from "react";

interface IProps {
  metadata: any,
}

const Head: React.FC<IProps> = (props) => {
  return (
    <>
      {console.log(props)}
    </>
  );
};

export default Head;
