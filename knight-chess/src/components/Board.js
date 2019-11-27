import SqWrapper from "./SqWrapper";
import Knight from "./knight"
import React, { useState } from 'react';


const boardStyle = {
  margin: "0 auto",
  width: "75vmin",
  height: "75vmin",
  display: "flex",
  flexWrap: "wrap",
  fontSize: "10vmin",
  border: "1px solid black",
};

const squareStyle = {
  width: "12.5%",
  height: "12.5%",
};


export default function App() {
  const [loc, setLoc] = useState([0, 1]);

  const Board = ({ knightPosition: [knightX, knightY] }) => {
    console.log(knightX);
    console.log(knightY);
    const renderPiece = (x, y) => (
      console.log(x, y), x === knightX && y === knightY ? <Knight /> : null
    );
    const renderSquare = i => {
      const x = i % 8;
      const y = Math.floor(i / 8);
      const piece = renderPiece(x, y);
      function handleClick(e) {
        e.preventDefault();
        console.log(x, y);
        setLoc([x,y])
      }
      return (
        <div key={i} style={squareStyle} onClick={handleClick}>
          <SqWrapper x={x} y={y}>
            {piece}
          </SqWrapper>
        </div>
      );
    };

    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(renderSquare(i));
    }
    return <div style={boardStyle}>{squares}</div>;
  };
  return <Board knightPosition={loc} />;
}

