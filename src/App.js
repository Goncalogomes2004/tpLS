import './App.css';
import "./styles/App.css";
import BoardPanel from './components/board/board.compontent';
import Header from './components/header/header.component';
import { useState } from 'react';  // Importando useState
import ControlPanel from './components/controlPanel/control-panel.component';
import BoardPanelBot from './components/boardBot/boardPanelBot';

function App() {
  const [gameStarted, setGameStarted] = useState(false);  // Estado para controlar o jogo
  const [p1Name, setP1Name] = useState();  // Estado para o nome do jogador 1
  const [p2Name, setP2Name] = useState();  // Estado para o nome do jogador 2
  const [againstBot, setAgainstBot] = useState(false);

  return (
    <div id="container">
      <Header />
      <main>  
        <ControlPanel setGameStarted={setGameStarted} setp1Name={setP1Name} setp2Name={setP2Name} setAgainstBot={setAgainstBot}/>
     {gameStarted && !againstBot && <BoardPanel p1Name={p1Name} p2Name={p2Name} />} 
     {gameStarted && againstBot && <BoardPanelBot p1Name={p1Name}  />} 

      </main>
    </div>
  );
}

export default App;
