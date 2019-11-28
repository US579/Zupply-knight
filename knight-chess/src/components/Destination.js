import React, { Component } from "react";

class Des extends Component {
  render() {
    const knightStyle = {
      cursor: "pointer",
      opacity: 1
    };
    return <span style={knightStyle}>{"☉"}</span>;
  }
}

export default Des;
