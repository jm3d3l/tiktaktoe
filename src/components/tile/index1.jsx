import React, { useState, useContext } from "react";
import AppContext from '../../context/app-context';
import "./style.css";
const Tile = ({ index }) => {
    const { state, action } = useContext(AppContext);
    const [clicked, isClicked] = useState(false);
    const handleClick = tile => {
        action.setActivePlayer(!state.activePlayer);
        isClicked(true);
    };

        return (
            <div onClick={() => handleClick(index)} className="tile">
                    {clicked && <h2>{state.activePlayer ? "x" : "o"}</h2>}
            </div>
        );
};

export default Tile;
