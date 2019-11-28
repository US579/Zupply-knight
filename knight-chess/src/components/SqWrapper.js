import React, { Component } from "react";
import { Square } from "./Square";

class SqWrapper extends Component {
  render() {
    const { x, y, children } = this.props;
    const squareIsBlack = (x + y) % 2 === 1;
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
      >
        <Square squareIsBlack={squareIsBlack} x={x} y={y}>{children}</Square>
      </div>
    );
  }                                           
}

export default SqWrapper;