"use client";
import React from "react";


export default function Strip({ text, color, rotation }: { text: string, color?: number, rotation?: number }) {
  //const randomRotate = Math.floor(Math.random() * 15) - 7;
  const randomRotate = rotation ? rotation : [-5, -4, -3, -7, -4, 7, 9, 6, 3, 4, 5][(Math.floor(Math.random() * 11))];
  const randomPadding = Math.floor(Math.random() * 64) - 32;
  const randomColor = ['bg-kek', 'bg-lila', 'bg-bezs'][color !== undefined ? color : Math.floor(Math.random() * 3)];

  return (
    <div
      className={'w-full h-16 text-background text-3xl overflow-hidden flex gap-8 items-center whitespace-nowrap ' + randomColor + ' font-bold'}
      style={{
        transform: `rotate(${randomRotate}deg) translateY(${randomRotate > 20 ? -400 : 0}px)`,
        paddingLeft: `${randomPadding}px`,
        backgroundColor: `var(--rajk-${randomColor})`,
      }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i}>{text}</span>
      ))}
    </div>
  );
}
