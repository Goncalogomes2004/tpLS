// Piece.jsx
import React from 'react';

export default function Piece({ color }) {
  return (
    <div
      className="w-10 h-10 rounded-full"
      style={{
        backgroundColor: color,
        border: '2px solid #444',
      }}
    />
  );
}
