import SqWrapper from "./SqWrapper";
import Knight from "./knight";
import Des from "./Destination";
import React, { useState } from "react";
import { findway } from "./Astar";

const boardStyle = {
  margin: "0 auto",
  width: "75vmin",
  height: "75vmin",
  display: "flex",
  flexWrap: "wrap",
  fontSize: "10vmin",
  border: "1px solid black"
};
const squareStyle = {
  width: "12.5%",
  height: "12.5%"
};
const buttonStyle = {
  background: "#4CAF50",
  border: "none",  
  color: "white",
  padding: "2% 4%",
  marginLeft: "200px",
  textdecoration: "none",
  display: "inlineblock",
  fontSize: "40px",
  margin: "2%",
  cursor: "pointer",
  borderRadius: "20px"
};
const buttonStyle2 = {
  background: "#008CBA",
  border: "none",
  color: "white",
  padding: "2% 4%",
  textdecoration: "none",
  display: "inlineblock",
  fontSize: "40px",
  marginTop: "4%",
  cursor: "pointer",
  borderRadius: "20px"
};

export default function App() {
  let knight_x = Math.floor(Math.random() * 8);
  let knight_y = Math.floor(Math.random() * 8);
  let end_x = Math.floor(Math.random() * 8);
  let end_y = Math.floor(Math.random() * 8);
  while (knight_x === end_x && knight_y === end_y) {
    knight_x = Math.floor(Math.random() * 8);
    knight_y = Math.floor(Math.random() * 8);
    end_x = Math.floor(Math.random() * 8);
    end_y = Math.floor(Math.random() * 8);
  }
  const [loc, setLoc] = useState([knight_x, knight_y]);
  const [end_loc, setEndLoc] = useState([end_x, end_y]);

  var i = 0;
  function myLoop(lis) {
    setTimeout(function() {
      if (lis[i][0] === end_x && lis[i][1] === end_y) {
        setLoc([999, 999]);
        alert("That's destniation");
        return;
      }
      setLoc(lis[i]);
      i++;
      if (i < lis.length) {
        myLoop(lis);
      }
    }, 1000);
  }

  //Button listener
  function freshBt1() {
    window.location.reload();
  }
  function freshBt2() {
    if (loc[0]===999 && loc[1] ===999){
      alert("destnination reached, Please start again");
      return
    }
    var ans = findway(loc[0], loc[1], end_x, end_y);
    myLoop(ans);
    console.log(ans);
  }
  // Main implemenation for chess board
  const Board = ({                 
    knightPosition: [knightX, knightY],
    endPosition: [end_x, end_y]
  }) => {
    const renderPiece = (x, y) =>
      x === knightX && y === knightY ? <Knight /> : null;
    const renderDes = (x, y) => (x === end_x && y === end_y ? <Des /> : null);
    const renderSquare = i => {
      const x = i % 8;
      const y = Math.floor(i / 8);
      const piece = renderPiece(x, y);
      const des = renderDes(x, y);
      function handleClick(e) {
        e.preventDefault();
        if (canMove(loc)) {
          setLoc([x, y]);
        }
      }
      function canMove(loc) {
        if (Math.abs(x - loc[0]) > 1 || Math.abs(y - loc[1]) > 1) {
          return false;
        } else {
          if (x === end_x && y === end_y) {
            setLoc([999,999]);
            alert("Reach your desnination");
            return;
          }
          return true;
        }
      }
      return (
        <div key={i} style={squareStyle} onClick={handleClick}>
          <SqWrapper x={x} y={y}>
            {piece}
            {des}
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
  return (
    <div>
      <Board knightPosition={loc} endPosition={end_loc} />
      <button variant="primary" style={buttonStyle} onClick={freshBt1}>
        Start
      </button>
      <button variant="primary" style={buttonStyle2} onClick={freshBt2}>
        Help
      </button>
    </div>
  );
}
