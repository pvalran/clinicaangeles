import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Dialog, DialogTitle,DialogContent,DialogContentText,DialogActions} from '@material-ui/core';




import Button from '@material-ui/core/Button';
const styles = theme => ({
    root:{
        width:'100%',
        maxWidth:360,
        backgroundColor: theme.palette.background.paper,
    },
});

const ModalAlert = (props) => {
   const {open,title,descripcion,handleConfirm,handleClose} = props;
   return (
         <Dialog
            open={open}
            onClose = {handleClose}
         >
            <DialogTitle id='alert-dialog-tile'>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-descripcion'>{descripcion}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} color='primary' autoFocus>Confirmar</Button>
                <Button onClick={handleClose} color='secondary'>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

ModalAlert.propTypes = {

}

export default withStyles(styles)(ModalAlert);
