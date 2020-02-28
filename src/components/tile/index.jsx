import React, { useContext } from "react";
import AppContext from '../../context/app-context';
import "./style.css";

const Tile = ({ start, end }) => {
    const { state, action } = useContext(AppContext);

    const tiles = [];
    for(let i = start; i <= end; i++) {
        tiles.push(i)
    }

    return tiles.map((tile, i) => (
            <div
                key={i}
                onClick={() => action.handleOnClick(tile)}
                className="tile"
            >
                {state.boards[tile] && <h2>{state.boards[tile]}</h2>}
            </div>
        )
    );

};

export default Tile;
