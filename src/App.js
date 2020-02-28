import React, { useState } from "react";
import "./App.css";
import Tile from "./components/tile";
import AppContext from './context/app-context';

function App() {
    const [boards, setBoards] = useState([]);
    const [activePlayer, setActivePlayer] = useState(false);
    const [playerOneMoves, setPlayerMove] = useState([]);
    const [playerTwoMoves, setPlayerTwoMode] = useState([]);
   
    let winningCombination = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7],
    ]

    const handleOnClick = index => {
      let newBoard = [...boards];
      console.log('tile', index);
      if(newBoard[index]) return;
       setActivePlayer(!activePlayer);
      newBoard[index] = activePlayer ? 'x' : 'o'; 
      setBoards(newBoard);
      console.log('boards', newBoard);
      handleWinningCombination(newBoard);
    }

    const handleWinningCombination = newBoards => {
        let x = [];
        let o = [];
       for(let i = 1; i <= newBoards.length; i++) {
           if(newBoards[i] === 'x') {
               x.push(i)
           } else if(newBoards[i] === 'o') {
               o.push(i);
           }
       }
       console.log('x', x);
       console.log('o', o);
       for(let o of winningCombination) {
        //    console.log(x.every(o => x ))
       }
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
            <AppContext.Provider value={value}>
                <div className="container">
                    <div className="row row1">
                        <Tile start={1} end={3}/>
                    </div>
                    <div className="row row1">
                        <Tile start={4} end={6} />
                    </div>
                    <div className="row row1">
                        <Tile start={7} end={9} />
                    </div>
                </div>
            </AppContext.Provider>
        </div>
    );
}

export default App;
