import { useState } from "react";

//Creating the Square
function Square ({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

//Creatin the Board
const Board = ({xIsNext, squares, onPlay }) => {
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status  = 'Winner: ' + winner;
  } 
  else {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }

  function handleClick (i) {
    if (squares[i] || winner) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((_,i) =>  (
          <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
       ))}
     </div>
    </div>
  );
};

//Creating the Game
const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
      let description;

      if(move > 0) {
        description = 'Got to move #' + move;
      }
      else {
        description = 'Go to game start';
      }

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      )

    }
  )

  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
export default Game;

//Function to calculate the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  return null;
}