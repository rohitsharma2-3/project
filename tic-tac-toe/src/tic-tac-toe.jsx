import { useState,useEffect, useRef } from "react";
import crossIcon from "../src/assets/cross.png";
import circleIcon from "../src/assets/circle.png";

function local(){
    let box = localStorage.getItem('box')
    if(box){
        return JSON.parse(localStorage.getItem('box'))
    }else{
        return Array(9).fill("")
    }
}


function TicTacToe() {
    // State for board, count, and lock
    const [board, setBoard] = useState(local());
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);

    const titleRef = useRef(null);

    // Handle player moves
    const toggle = (index) => {
        if (lock || board[index] !== "") return;

        const newBoard = [...board];
        newBoard[index] = count % 2 === 0 ? "x" : "o";
        setBoard(newBoard);
        setCount(count + 1);
        checkWin(newBoard);
    };

    // Check for winning combinations
    const checkWin = (currentBoard) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                won(currentBoard[a]);
                return;
            }
        }

        // Handle Draw
        if (count === 8) {
            titleRef.current.innerHTML = "It's a Draw!";
            setLock(true);
        }
    };

    // Display winner
    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Congratulations ${winner === "x" ? "x" : "o"
            }`;
    };

    // Reset the game
    const reset = () => {
        setBoard(Array(9).fill(""));
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = "";
    };

    useEffect(() => {
        localStorage.setItem('box',JSON.stringify(board))  
    }, [board])

    return (
        <div className="App">
            <h1 className="title" >
                Tic Tac Toe
            </h1>
            <div className="board">
                {board.map((value, index) => (
                    <button
                        key={index}
                        className="boxes"
                        onClick={() => toggle(index)}
                        dangerouslySetInnerHTML={{
                            __html: value
                                ? `<img src='${value === "x" ? crossIcon : circleIcon}' alt='${value}' />`
                                : "",
                        }}
                    ></button>
                ))}
            </div>
            <button className="reset-btn" onClick={reset}>
                Reset
            </button>
            <p className="result" ref={titleRef}></p>
        </div>
    );
}

export default TicTacToe;
