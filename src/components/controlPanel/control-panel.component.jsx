import "./control-panel.css";
import React, { useState } from "react";

export default function ControlPanel({ setGameStarted, setp1Name, setp2Name }) {  // Recebendo as funções como props

   const [jogoIniciado, setJogoIniciado] = useState(false);  
   const [player1, setPlayer1] = useState("");  
   const [player2, setPlayer2] = useState(""); 

   const handleStartGame = () => {
      setp1Name(player1);
      setp2Name(player2);
      setJogoIniciado(!jogoIniciado);  
      setGameStarted(!jogoIniciado); 
   };

   return (
    <section id="panel-control">
      <h3 className="sr-only">Escolha o tipo de Jogo</h3>

    
      <form className={!jogoIniciado ? "form ": "form-nonflex"}>
        <div className={jogoIniciado ? "form-items": ""}>
        <fieldset className="form-group">
          <label htmlFor="btLevel">Nível:</label>
          <br></br>
          <select id="btLevel"
          className={jogoIniciado ? "blocked": ""}
          >
            <option value="0">1 vs 1</option>
            <option value="1">1 vs Bot</option>
          </select>
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="player1">Jogador 1:</label>
          <br></br>
          <input
            type="text"
          className={jogoIniciado ? "blocked": ""}

            id="player1"
            placeholder="Nome do Jogador 1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}  // Atualiza o nome do jogador 1
          />
        </fieldset>

        <fieldset className="form-group">
          <label htmlFor="player2">Jogador 2:</label>
          <br></br>
          <input
            type="text"
            id="player2"
          className={jogoIniciado ? "blocked": ""}
            placeholder="Nome do Jogador 2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}  // Atualiza o nome do jogador 2
          />
        </fieldset>
        </div>
        <button
          type="button"
          id={jogoIniciado ? "btStop":"btPlay"}
          onClick={handleStartGame}  // Função chamada ao clicar no botão
        >
          {!jogoIniciado ? "Iniciar Jogo" : "Terminar Jogo"}
        </button>
      </form>

    </section>
  );
}
