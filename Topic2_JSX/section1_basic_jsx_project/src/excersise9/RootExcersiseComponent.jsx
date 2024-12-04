import React from "react";
import "./excersise.css";
import Excersise_1 from "./Excersise_1";
import Excersise_2 from "./Excersise_2";
import Excersise_3 from "./Excersise_3";
import Excersise_4 from "./Excersise_4";
import Excersise_5 from "./Excersise_5";

// Sử dụng jsx định nghĩa một class component
class RootExcersiseComp extends React.Component {
  render() {
    return (
      <section>
        <Excersise_1 />
        <Excersise_2 />
        <Excersise_3 />
        <Excersise_4 />
        <Excersise_5 />
      </section>
    );
  }
}

export default RootExcersiseComp;
