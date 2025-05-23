import "./control-panel.css";
import React, { useState } from "react";

export default function ControlPanel({ setGameStarted, setp1Name, setp2Name, setAgainstBot }) { 

   const [jogoIniciado, setJogoIniciado] = useState(false);  
   const [player1, setPlayer1] = useState("");  
   const [player2, setPlayer2] = useState(""); 
   const [VSBot, setVsBot] = useState(false); 
  
   const handleStartGame = () => {
      setp1Name(player1);
      setp2Name(player2);
      setJogoIniciado(!jogoIniciado);  
      setGameStarted(!jogoIniciado); 
      setAgainstBot(VSBot)
   };

   return (
    <section id="panel-control">
  

    
      <form className={!jogoIniciado ? "form ": "form-nonflex"}>
        <div className={jogoIniciado ? "form-items": ""}>
        <fieldset className="form-group">
          <label htmlFor="btLevel">Nível:</label>
          <br></br>
          <select
            id="btLevel"
            onChange={(e) => setVsBot(e.target.value === "1")} 
            className={jogoIniciado ? "blocked" : ""}
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
            onChange={(e) => setPlayer1(e.target.value)} 
          />
        </fieldset>

        {!VSBot && (<fieldset className="form-group">
          <label htmlFor="player2">Jogador 2:</label>
          <br></br>
          <input
            type="text"
            id="player2"
          className={jogoIniciado ? "blocked": ""}
            placeholder="Nome do Jogador 2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)} 
          />
        </fieldset>)}
        </div>
        <button
          type="button"
          id={jogoIniciado ? "btStop":"btPlay"}
          onClick={handleStartGame}  
        >
          {!jogoIniciado ? "Iniciar Jogo" : "Terminar Jogo"}
        </button>
      </form>

    </section>
  );
}
