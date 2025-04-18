import React, { useEffect, useRef, useState } from "react";
import "./game-panel.css";
import Cell from "../Cell/Cell";
import NextPlayerBoard from '../nextPlayer/nextplayerboard.component';

export default function BoardPanel( {p1Name , p2Name}) {
  const rows = 6;
  const cols = 7;
  const [time, setTime] = useState(0);
  
  const [board, setBoard] = useState(
    Array.from({ length: rows }, () => Array(cols).fill("white"))
  );
  const [top, setTop] = useState(Array(cols).fill(false));

  const intervalRef = useRef(null);


  const [winedPositions, setWinPositions] = useState(
    Array.from({ length: rows }, () => Array(cols).fill("white"))
  );
  const [primePositions, setPrimePositions] = useState([]);

  const [currentPlayer, setCurrentPlayer] = useState("red");    
  const [currentPlayerName, setCurrentPlayerName] = useState(p1Name);
  const [gameFinished, setGameFinished] = useState(false);
  const [winner, setWinner] = useState(null)




  function startGame(){
    setGameFinished(false)
    setPrimePositions([])
    setWinPositions(Array.from({ length: rows }, () => Array(cols).fill("white")))
    setBoard(Array.from({ length: rows }, () => Array(cols).fill("white")))
    setSpecialPositions()
    selectRandomPlayer();
    startTimer()
  }

  function setSpecialPositions() {
    const newPositions = [];
  
    while (newPositions.length < 5) {
      const row = Math.floor(Math.random() * 6);
      const col = Math.floor(Math.random() * 7);
  
      if (!newPositions.some(position => position[0] === row && position[1] === col)) {
        newPositions.push([row, col]);
      }
    }
  
    setPrimePositions(newPositions); // Agora atualiza corretamente o state
  }
  

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
  




  function startTimer() {
    if(gameFinished) return
    if (intervalRef.current) clearInterval(intervalRef.current);
  
    setTime(0);
    intervalRef.current = setInterval(() => {
      setTime(prevTime => {
        if (prevTime > 10) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevTime +1;
      });
    }, 1000);
  }
  
    
    useEffect(() => {
      if(time > 10){
        handleTimeout()
      }
    }, [time]);
  
  
    function handleTimeout() {
      if (gameFinished) return;
      setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red");
      setCurrentPlayerName(currentPlayer === "red" ? p2Name || "Jogador 2" : p1Name || "Jogador 1"
      );
    
      startTimer();
    }
    
  
    

  
  
  
  
    useEffect(() => {
      startGame()
    }, []);
  
  

  
  function checkForWinners(currentBoard) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const current = currentBoard[i][j];
        if (current !== "white") {
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
  
  const [hoveredCol, setHoveredCol] = useState(null);

function handleHover(col) {
  setHoveredCol(col);
}

function handleHoverOut() {
  setHoveredCol(null);
}



  function handleColumnClick(col) {
    if (gameFinished) return; 
  
    for (let row = rows - 1; row >= 0; row--) {
      if (board[row][col] === "white") {
        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = currentPlayer;
  
        setBoard(newBoard);
        checkForWinners(newBoard);
        if (!primePositions.some(position => position[0] === row && position[1] === col)) {
        
          setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red");
          setCurrentPlayerName(currentPlayer === "yellow" ? p1Name ? p1Name : "Jogador 1" : p2Name ? p2Name : "Jogador 2");
        }
        //console.log(row, col)
        startTimer();

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
 
      <div className="top-panel">
       {!gameFinished ?
       ( <NextPlayerBoard player={currentPlayer} playerName = {currentPlayerName}/>) :
       (
        <p>Jogo terminado. Vencedor {winner}</p>
       )}
          <button className="restartButton" onClick={()=> startGame()}>Recomeçar jogo</button>

        </div>


    {!gameFinished && <div className="top-row">
        {top.map((hovered, colIndex) => (
          <div
            key={`top-${colIndex}`}
            className="top-cell"
        
          >
            
            {hovered && !gameFinished && <span ><Cell color={currentPlayer}/></span>}
          </div>
        ))}
      </div>}
  
    <div id="game">
      {board.map((row, rowIndex) =>
        row.map((color, colIndex) => (

            <div
              onMouseEnter={() => {handleHover(colIndex)
                setHoveredCol(colIndex)
              }}
              onMouseLeave={() => {handleHoverOut()
                setHoveredCol(null)
              }}>
              <Cell
                    key={`${rowIndex}-${colIndex}`}
                    color={color}
                    onClick={() =>{ handleColumnClick(colIndex)
                        console.log(currentPlayerName)
                    }}
                    isArrow={hoveredCol === colIndex && !gameFinished && color === "white"}
                    isWinning={winedPositions.some(
                        ([winRow, winCol]) => winRow === rowIndex && winCol === colIndex
                    )}
                    isPrimed = {primePositions.some(position => position[0] === rowIndex && position[1] === colIndex)}
                    row={rowIndex}
                    
                />

                
            </div>
        ))
      )}
    </div>
   {!gameFinished && (<p>
        Tempo restante para {currentPlayerName}: {time}s
     </p>)}
  
  

  </section>
  
  );
}
