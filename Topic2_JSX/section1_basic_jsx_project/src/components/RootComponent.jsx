import React from "react";
import "./layout.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";


// Sử dụng jsx định nghĩa một class component
class RootComp extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <Main />
        <Footer />
      </section>
    );
  }
}

export default RootComp;
