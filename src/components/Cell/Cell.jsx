import React from 'react';
import './cell.css';

export default function Cell({ color, onClick, isWinning }) {
  return (
    <div
      className={`cell ${isWinning ? 'winner' : ''}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
}
