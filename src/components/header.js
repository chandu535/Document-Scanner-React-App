import React from "react";
import { useNavigate } from "react-router-dom"

//importing materialUI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


function HeaderComponent() {

    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
        // sessionStorage.clear();
        localStorage.clear();
        navigate("/")
        localStorage.clear();
        window.location.reload()
        
    };

    
    return (
        <div className="head">
            <h2 className="logo">
                Documents-Scanning
            </h2>
            <div className="userlogin">

                <AccountCircleIcon /> <Button variant="filled" onClick={handleClickOpen}>
                    {localStorage.getItem("userName")}
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure to logout?"}
                    </DialogTitle>
                   
                    <DialogActions>
                        <Button onClick={handleClose}>LOGOUT</Button>
                      
                    </DialogActions>
                </Dialog>
            </div>
        </div >
    )
}
export default HeaderComponent;

