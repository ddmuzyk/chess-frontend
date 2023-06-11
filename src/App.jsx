import { useState, useEffect } from 'react'
import { Chessboard } from "react-chessboard";
import {Chess} from 'chess.js';
import './App.css';
import styles from './Chessboard.module.css';


function App() {
  
  const [game, setGame] = useState(new Chess());
  const [isPlayersTurn, setIsPlayersTurn] = useState(false);

  // useEffect(() => {
  //   if (!isPlayersTurn) {
  //     makeRandomMove();
  //     setIsPlayersTurn(true);
  //   }
  // }, [])

  function makeAMove(move) {
    const result = game.move(move);
    console.log(game.fen())
    setGame(new Chess(game.fen()));
    console.log(result)
    return result; // null if the move was illegal, the move object if the move was legal
  
  }

  // console.log(game.moves())

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    console.log(possibleMoves[randomIndex])
    makeAMove(possibleMoves[randomIndex]);
    setIsPlayersTurn(true);
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    // setTimeout(makeRandomMove, 200);
    return true;
  }

  return ( 
    <div className='chessboard-wrapper'>
      <div className={styles.container}>
        <Chessboard position={game.fen()}
        onPieceDrop={onDrop}
        boardOrientation='black'
        showBoardNotation={true}
        />
      </div> 
    </div>
  );
}
export default App;
