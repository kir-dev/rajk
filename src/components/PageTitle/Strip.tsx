"use client";
import React from "react";


export default function Strip({ text, color }: { text: string, color?: string}) {
  const randomRotate = Math.floor(Math.random() * 15) - 7;
  const randomPadding = Math.floor(Math.random() * 64) - 32;
  let randomColor = Math.floor(Math.random() * 2);
  if (color === 'blue') {
    randomColor = 0;
  } else if (color === 'purple') {
    randomColor = 1;
  }

  return (
    <div
      className="w-full h-16 text-background text-3xl overflow-hidden flex gap-8 items-center whitespace-nowrap"
      style={{
        transform: `rotate(${randomRotate}deg)`,
        paddingLeft: `${randomPadding}px`,
        backgroundColor: randomColor === 0 ? 'var(--rajk-blue)' : 'var(--rajk-purple)',
      }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i}>{text}</span>
      ))}
    </div>
  );
}
