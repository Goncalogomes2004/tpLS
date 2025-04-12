// BoardPanel.jsx
import React, { useEffect, useState } from "react";
import "./game-panel.css";
import Cell from "../Cell/Cell";
import NextPlayerBoard from '../nextPlayer/nextplayerboard.component';

export default function BoardPanel( {p1Name , p2Name}) {
  const rows = 6;
  const cols = 7;

  const [board, setBoard] = useState(
    Array.from({ length: rows }, () => Array(cols).fill("white"))
  );



  const [top, setTop] = useState(Array(cols).fill(false));
  
  function selectRandomPlayer() {
    const number = Math.floor(Math.random() * 2);
    if(number === 0){
        setCurrentPlayer("red")
        setCurrentPlayerName(p1Name || "Jogador 1")
    }else{
        setCurrentPlayer("yellow")
        setCurrentPlayerName(p2Name || "Jogador 2")
    }

  }
  


  const [currentPlayer, setCurrentPlayer] = useState("red");    
  const [currentPlayerName, setCurrentPlayerName] = useState(p1Name);
  const [gameFinished, setGameFinished] = useState(false);
  const [winner, setWinner] = useState(null)


  const [winedPositions, setWinPositions] = useState(
    Array.from({ length: rows }, () => Array(cols).fill("white"))
  );

  useEffect(() => {
    selectRandomPlayer();
  }, []);

  function checkForWinners(currentBoard) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const current = currentBoard[i][j];
        if (current !== "white") {
  
          // Vertical
          if (
            i + 3 < rows &&
            current === currentBoard[i + 1][j] &&
            current === currentBoard[i + 2][j] &&
            current === currentBoard[i + 3][j]
          ) {
            setWinner(currentPlayerName);
            setWinPositions([
              [i, j],
              [i + 1, j],
              [i + 2, j],
              [i + 3, j]
            ]);
            setGameFinished(true);
            return;
          }
  
          // Horizontal
          if (
            j + 3 < cols &&
            current === currentBoard[i][j + 1] &&
            current === currentBoard[i][j + 2] &&
            current === currentBoard[i][j + 3]
          ) {
            setWinner(currentPlayerName);
            setWinPositions([
              [i, j],
              [i, j + 1],
              [i, j + 2],
              [i, j + 3]
            ]);
            setGameFinished(true);
            return;
          }
  
          // Diagonal ↘
          if (
            i + 3 < rows &&
            j + 3 < cols &&
            current === currentBoard[i + 1][j + 1] &&
            current === currentBoard[i + 2][j + 2] &&
            current === currentBoard[i + 3][j + 3]
          ) {
            setWinner(currentPlayerName);
            setWinPositions([
              [i, j],
              [i + 1, j + 1],
              [i + 2, j + 2],
              [i + 3, j + 3]
            ]);
            setGameFinished(true);
            return;
          }
  
          // Diagonal ↙
          if (
            i + 3 < rows &&
            j - 3 >= 0 &&
            current === currentBoard[i + 1][j - 1] &&
            current === currentBoard[i + 2][j - 2] &&
            current === currentBoard[i + 3][j - 3]
          ) {
            setWinner(currentPlayerName);
            setWinPositions([
              [i, j],
              [i + 1, j - 1],
              [i + 2, j - 2],
              [i + 3, j - 3]
            ]);
            setGameFinished(true);
            return;
          }
        }
      }
    }
  }
  
  


  function handleColumnClick(col) {
    {selectRandomPlayer()}
    if (gameFinished) return; 
  
    for (let row = rows - 1; row >= 0; row--) {
      if (board[row][col] === "white") {
        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = currentPlayer;
  
        setBoard(newBoard);
        checkForWinners(newBoard);
        setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red");
        setCurrentPlayerName(currentPlayer === "yellow" ? p1Name ? p1Name : "Jogador 1" : p2Name ? p2Name : "Jogador 2");
        break;
      }
    }
  }
  
  function handleHover(col) {
    const newTop = Array(cols).fill(false);
    newTop[col] = true;
    setTop(newTop);
  }
  
  function handleHoverOut() {
    setTop(Array(cols).fill(false));
  }
  
  return (
    <section id="panel-game">
       {!gameFinished && <NextPlayerBoard player={currentPlayer} playerName = {currentPlayerName}/>}
       {gameFinished && (<p>Jogo terminado. Vencedor {winner}</p>)}
   {!gameFinished && <div className="top-row">
      {top.map((hovered, colIndex) => (
        <div
          key={`top-${colIndex}`}
          className="top-cell"
       
        >
          {hovered && !gameFinished && <span className="arrow"><Cell color={currentPlayer}/></span>}
        </div>
      ))}
    </div>}
  
    <div id="game">
      {board.map((row, rowIndex) =>
        row.map((color, colIndex) => (
            <div
            onMouseEnter={() => handleHover(colIndex)}
            onMouseLeave={() => handleHoverOut()}>
              <Cell
                    key={`${rowIndex}-${colIndex}`}
                    color={color}
                    onClick={() =>{ handleColumnClick(colIndex)
                        console.log(currentPlayerName)
                    }}
                    isWinning={winedPositions.some(
                        ([winRow, winCol]) => winRow === rowIndex && winCol === colIndex
                    )}
                />

                
            </div>
        ))
      )}
    </div>
  
   
  </section>
  
  );
}
