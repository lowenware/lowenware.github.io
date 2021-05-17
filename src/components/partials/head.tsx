import React from "react";
import NextHead from "next/head";

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
