import React from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import { Button, IconButton, Snackbar } from "@mui/material";

const SnackbarToast = ({ open, handleClose, message }) => {
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={action}
        />
    );
};

export { SnackbarToast }