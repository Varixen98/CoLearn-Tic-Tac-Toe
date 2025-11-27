import { useEffect, useState } from "react";
import Square from "./square";
import MyMask from "./mask/modalMask";


export default function MyBoard({xIsNext, squares, onPlay}: {xIsNext: boolean, squares: (string | null)[], onPlay: (nesxtSquares:any[])=> void}){

    const [isModalOpen, setModalOpen] = useState(false);

    // fungsi untuk mengecek apakah ada
    // kombinasi index array yang menghasilkan kemenangan
    function declareWinner(squares: (string | null)[]){
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];

        for (let i = 0; i < lines.length; i++){
            const [a, b, c] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                return squares[a]
            }
        }

        return null;
    }

    const winner = declareWinner(squares);
    let status;
    if(winner){
        status = "The Winner is player " + winner + "!";
    }
    else{
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    useEffect(() => {
        if(winner){
            setModalOpen(true)
        }
        else{
            setModalOpen(false)
        }
    }, [winner])


    function handleClick(i: number){
        if(squares[i] || declareWinner(squares)){
            return;
        }

        const nextSquares = squares.slice();
        
        if(xIsNext){
            nextSquares[i] = "X";
        }
        else{
            nextSquares[i] = "O";
        }
        onPlay(nextSquares)
    }

    function closeModal(){
        setModalOpen(false)
        console.log('Modal Closed')
    }


    return( 
        <div id="board" className="w-fit mx-auto flex flex-col gap-4 justify-center items-center">
            <MyMask isOpen={isModalOpen} winner={winner} onClose={closeModal} value={status}></MyMask>
            <div id="board-container" className="flex flex-col bg-white-gray p-4 rounded-3xl items-center w-fit gap-2">
                <div id="board-row" className="grid grid-cols-3 gap-2">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} className="rounded-2xl" ></Square>
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} className="rounded-2xl" ></Square>
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} className="rounded-2xl" ></Square>
                </div>
                <div id="board-row" className="grid grid-cols-3 gap-2">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} className="rounded-2xl" ></Square>
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} className="rounded-2xl" ></Square>
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} className="rounded-2xl" ></Square>
                </div>
                <div id="board-row" className="grid grid-cols-3 gap-2">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} className="rounded-2xl" ></Square>
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} className="rounded-2xl" ></Square>
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} className="rounded-2xl" ></Square>
                </div>
            </div>
        </div>
    );
}
