import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";
import Alert from "react-bootstrap/Alert";
import {Modal, Button} from 'react-bootstrap';  
// import { useState } from 'react';  

const Game = () => {

  const [gameShow,setgameShow]=useState(0)
  const [win,setWin]=useState(null)
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
   
    if (winner || squares[i]) return;

    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };


  console.log(win)

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });
    // if(winner===true){
    //   setWin(winner)
    //     }
  return (
    <>
     {gameShow ==0 ? <div><h1>React Tic Tac Toe - Husain Zaidi</h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? "Winner: " + winner && setgameShow(!false) : "Next Player: " + xO}</h3> 
      </div></div>: <div className="parent">
        <h1>Game Over</h1>
        <h2>Winner is Player {winner}</h2>
        <button className="btn" onClick={() => window.location.reload(false)}>New Game</button>
      
      </div> }
     
    </>
  );
};

export default Game;
