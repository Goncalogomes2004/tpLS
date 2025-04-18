import React from 'react';
import './cell.css';

export default function Cell({ color, onClick, isWinning, isArrow, isPrimed, row }) {
  const isDropping = color !== "white";

  const fallDistance = `${(
    row === 5 ?  row * 85 :
    row === 4 ? row * 90 :
    row === 3 ? row * 97 :
    row === 2 ? row * 110 :
    row === 1 ? row * 140 :
    (row + 1) * 80
  )}px`;

  const dropStyle = {
    backgroundColor: color,
    '--fall-distance': fallDistance,
  };

  return (
    <div className="cell-container" onClick={onClick}>
      <div className={`cell base  ${isPrimed  ? 'primed' : ''}  ${isArrow ? 'arrow' : ''}`} />

      {isDropping && (
        <div
          className={`cell ${isWinning ? 'winner' : ''} ${isArrow ? 'arrow' : ''} ${isPrimed && color === "white" ? 'primed' : ''} drop`}
          style={dropStyle}
        />
      )}
    </div>
  );
}
