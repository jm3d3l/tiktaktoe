 
import React from "react";
import Typography from "@material-ui/core/Typography";

const WinnersList = ({winners}) => {
    return (
        <div style={{marginTop: 24}}>
            <Typography variant="body2">Winners</Typography>
            <ul style={{listStyleType: 'none', margin: 'auto', padding: 0, maxWidth:300}}>
                {winners.map(winner => (
                    <li key={winner._id} style={{display:'flex', alignItems: 'center'}}>
                        <p>{winner.username}</p>
                        <span style={{flexGrow: 1}} />
                        <span>win({winner.win})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default WinnersList;