import './App.css';
import "./styles/App.css";
import BoardPanel from './components/board/board.compontent';
import Header from './components/header/header.component';
import { useState } from 'react';  // Importando useState
import ControlPanel from './components/controlPanel/control-panel.component';

function App() {
  const [gameStarted, setGameStarted] = useState(false);  // Estado para controlar o jogo
  const [p1Name, setP1Name] = useState();  // Estado para o nome do jogador 1
  const [p2Name, setP2Name] = useState();  // Estado para o nome do jogador 2

  return (
    <div id="container">
      <Header />
      <main>  
        <ControlPanel setGameStarted={setGameStarted} setp1Name={setP1Name} setp2Name={setP2Name} />
        {gameStarted && <BoardPanel p1Name={p1Name} p2Name={p2Name} />}  {/* Passa os nomes dos jogadores para o BoardPanel */}
      </main>
    </div>
  );
}

export default App;
