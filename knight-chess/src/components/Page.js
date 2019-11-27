import Board from './Board'
import React, { useState } from 'react';

export default function App(){
    const [loc,setLoc] = useState([0,1])
    console.log(localStorage.getItem('x'), localStorage.getItem('y'))                           
    return (
        <Board knightPosition={loc}/>
    );
}