import React, { Component } from "react";
import { Square } from "./Square";

class SqWrapper extends Component {
  render() {
    const { x, y, children } = this.props;
    // alternate square colors, determine if it is black or white by its position
    const squareIsBlack = (x + y) % 2 === 1;
    // connect the drop target and show the highlight overlay
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