import React, { useEffect, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import { DialogContentText } from "@material-ui/core";

export default function FormDialog({
    open,
    handleReset,
    winner,
    activePlayer,
    winners,
    setWinners
}) {
     const [isOpen, setOpen] = React.useState(false);
     const [username, setUsername] = React.useState("");
     const [isSave, setIsSave] = React.useState(false);
    useEffect(() => {
        setOpen(open);
        return () => {
            handleClose();
        }
    }, [isSave]);
   

    const handleClose = () => {
        handleReset();
        setOpen(false);
    };

    const handleSave = async () => {
        let url = "http://localhost:3001/api/user";
        let newWinners = JSON.parse(JSON.stringify(winners));
        
        try {
            let res = await Axios.post(url, {
                username
            });
            if(res.data) {
               let userwinner = newWinners.find(winner => winner.username === res.data.username);
               if(userwinner) {
                   for(let i of newWinners) {
                       if(i.username === userwinner.username) {
                           i.win += 1;
                       }
                   }
                   setWinners(newWinners);
                   setIsSave(true);
               } else {
                    setWinners([...newWinners, res.data]);
                    setIsSave(true);
               }
            }
        } catch (error) {
           console.log(error);
           setIsSave(true);
        }
        
        
    };

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                style={{ bottom: 270 }}
                disableBackdropClick={true}
            >
                <DialogTitle id="form-dialog-title">
                    {winner
                        ? `Congrats you win ${
                              activePlayer ? "Player 1" : "Player 2"
                          }`
                        : "Draw"}
                </DialogTitle>
                <DialogContent style={{ width: 300 }}>
                    {winner && (
                        <Fragment>
                            <DialogContentText>
                                To save status enter your username.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="username"
                                label="username"
                                type="text"
                                fullWidth
                                onChange={({ target: input }) =>
                                    setUsername(input.value)
                                }
                            />
                        </Fragment>
                    )}
                </DialogContent>
                <DialogActions>
                    {winner && (
                        <Fragment>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleSave} color="primary">
                                save
                            </Button>
                        </Fragment>
                    )}
                    {!winner && (
                        <Button onClick={handleClose} color="primary">
                            Try again
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
