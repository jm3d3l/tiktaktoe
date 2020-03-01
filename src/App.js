import React, { useState, useEffect } from "react";
import "./App.css";
import Tile from "./components/tile";
import AppContext from "./context/app-context";
import { isBoxFilled } from "./utils/utils";
import FormDialog from "./components/dialog";
import Axios from 'axios';
import WinnersList from "./components/list";

function App() {
    const [boards, setBoards] = useState(Array(9).fill(null));
    const [activePlayer, setActivePlayer] = useState(false);
    const [winner, setWinner] = useState(false);
    const [itHasAwinner, setIthasAwinner] = useState(false);
    const [winners, setWinners] = useState([]);

     useEffect(() => {
        let url = "http://localhost:3001/api/user";
        async function getUrl() {
           let result = await Axios.get(url);
           setWinners(result.data);
        }
        getUrl();
    }, []);

     useEffect(() => {
        setTimeout(() => {
            playersBoard(boards);
        }, 200);
    }, [boards]);

    let winningCombination = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    const handleOnClick = index => {
        let newBoard = [...boards];
        if (newBoard[index]) return;
        newBoard[index] = activePlayer ? "x" : "o";
        setBoards(newBoard);
        setActivePlayer(!activePlayer);
    };

    const playersBoard = newBoards => {
        let x = [];
        let o = [];
        for (let i = 1; i <= newBoards.length; i++) {
            if (newBoards[i] === "x") {
                x.push(i);
            } else if (newBoards[i] === "o") {
                o.push(i);
            }
        }
        handleWinningCombination(x, o);
    };

    const reset = () => {
        setBoards([]);
        setActivePlayer(false);
        setWinner(false);
        setIthasAwinner(false);
    };

    const handleDraw = (x, o) => {
        let newBoard = [...x, ...o];
        if (isBoxFilled(x, o)) {
            if (!winner && !newBoard.includes(null)) {
                 setIthasAwinner(true);
            }
        }
    };

    const handleWinningCombination = (x, o) => {
        for (const i of winningCombination) {
            if (x.length >= 3) {
                if (i.every(num => x.includes(num))) {
                    setWinner(true);
                    setIthasAwinner(true);
                }
            }

            if (o.length >= 3) {
                if (i.every(num => o.includes(num))) {
                    setWinner(true);
                    setIthasAwinner(true);
                    return;
                }
            }
        }

        handleDraw(x, o);
    };

    const value = {
        state: {
            activePlayer,
            boards
        },
        action: {
            setActivePlayer,
            handleOnClick
        }
    };

    return (
        <div className="App">
            <h3>Tik tak toe</h3>
            <p>
                {` ${!activePlayer ? "player 1" : "player 2"} move ${
                    activePlayer ? "x" : "o"
                }`}
            </p>
            <AppContext.Provider value={value}>
                <div className="container">
                    <div className="row row1">
                        <Tile start={1} end={3} />
                    </div>
                    <div className="row row1">
                        <Tile start={4} end={6} />
                    </div>
                    <div className="row row1">
                        <Tile start={7} end={9} />
                    </div>
                </div>
            </AppContext.Provider>
            {itHasAwinner && <FormDialog open={itHasAwinner} setWinners={setWinners} winners={winners} activePlayer={activePlayer} handleReset={reset} winner={winner} />}
            {winners.length > 0 && <WinnersList winners={winners}/>}
        </div>
    );
}

export default App;
