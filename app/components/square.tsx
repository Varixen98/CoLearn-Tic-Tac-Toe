import { useState } from "react";

export default function Square({value, className, onSquareClick}: {onSquareClick: any, value: string | null, className?: string}){
    

    return(
        <button onClick={onSquareClick} className={`w-28 h-28 text-6xl font-semibold flex
         items-center justify-center bg-gray ${className}`}>{value}</button>
    );
}