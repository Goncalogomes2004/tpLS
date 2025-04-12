import "./nextPlayerBoard.css";

import React from "react";
import Cell from "../Cell/Cell";
export default function NextPlayerBoard( {player, playerName}){

    return(
        <section id="nextPlayer">
            
            <div className="nextPlayerSection">
            <h3>Próximo Jogador:</h3>
            <div
            className={`cellPlayer`}
            style={{ backgroundColor: player }}
            />  
                      <p>{playerName}</p>
            </div>

        </section>


    )
}
