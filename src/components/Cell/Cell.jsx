import React from 'react';
import './cell.css';

export default function Cell({ color, onClick, isWinning, isArrow, isPrimed }) {
  return (
    <div
      className={`cell ${isWinning ? 'winner' : ''} ${isArrow ? 'arrow':''} ${isPrimed && color === "white" ? 'primed':''}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      
    />
  );
}
