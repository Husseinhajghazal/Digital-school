import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = (props) => {
  document.title = "Digital School - " + props.title;
  return (
    <div>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
