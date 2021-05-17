import Footer from "../partials/footer";
import Header from "../partials/header";
import Menu from "../partials/menu";
import React from "react";

const MainLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <Menu />

      {children}

      <Footer />
    </div>
  );
};

export default MainLayout;
