'use client';

import Image from "next/image";
import MyBoard from "./components/board";
import { useState } from "react";

export default function Home() {

  const [xIsNext, setXisNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  // mengrecord history dari game
  // jika user menekan button jumpt to move 2 dar move 5
  // maka history kedepannya setelah 2 akan dipotong
  function handlePlay(nextSquares: any){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXisNext(!xIsNext);
  }

  // fungsi untuk kembeli ke state ke(n) yang ditunjuk berdasarkan history
  function jumpTo(nextMove : number){
    setCurrentMove(nextMove);
    setXisNext(nextMove % 2 == 0)
  }

  // print history ke bentuk button
  // button ini untuk fungsi jumpTo 
  // berdasarkan hasil move yang distore di history
  const moves = history.map((squares, move) =>{
    let description;
    if(move > 0){
      description = "Go to move #" + move;
    }
    else{
      description = "Go to game start";
    }
    return (
      <div key={move}>
        <button className="w-fit font-bold p-2 rounded-3xl bg-white-gray hover:bg-neutral-300/50 text-black" onClick={() => jumpTo(move)}>{description}</button>
      </div>
    )
  })

  return (
    <main className="bg-white flex flex-col min-h-screen items-center justify-center">

      <div id="game" className="w-[1200px] flex flex-col items-center justify-center mx-auto">
        <div id="container" className="flex w-fit items-center justify-center gap-5 p-2 mx-auto">

          <div id="board-container" className="flex flex-col w-fit mx-auto items-center justify-center gap-4">

            {/* app title */}
            <h1 id="title" className="text-center font-bold text-5xl p-1">Tic Tac Toe</h1>

            {/* display current player turn */}
            <div className="w-[300px] flex items-center justify-between text-2xl font-bold text-center rounded-4xl bg-white-gray">
              <div className={`w-1/2 h-10 ${xIsNext ? 'text-white bg-black' : 'text-black'}  
              flex items-center justify-center rounded-4xl text-2xl font-bold text-center p-1`}>
                Player X
              </div>
              <div className={`w-1/2 h-10 ${!xIsNext? 'text-white bg-black' : 'text-black'} flex items-center justify-center rounded-4xl 
              text-2xl font-bold text-center p-1`}>
                Player O
              </div>
            </div>

            {/* board game */}
            <MyBoard xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
          </div>

          {/* show game histories */}
          <div className="flex flex-col w-fit items-center justify-center h-fit gap-4 p-2 rounded-4xl">
            <h5 className="font-semibold text-xl p-2 bg-black text-white rounded-3xl">Game history</h5>
            <div id="game-info" className="w-full h-80 flex flex-col items-center gap-2 overflow-y-scroll py-4">
              {moves}
            </div>
          </div>
         
        </div>

      </div>

    </main>
  );
}
