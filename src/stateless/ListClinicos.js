import React, {Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {ListItemText, ListItemSecondaryAction} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});



function ListClinicos(props) {


    const { data, handleRemove,handleEdit } = props;

    return (
        <Fragment>
            <List>
            {
                data.map((item, idx) =>
                <ListItem key={idx}>
                   <ListItemText  primary={item.clinico_label} secondary={item.clinico_descripcion} />
                   <ListItemSecondaryAction>
                      <Button aria-label="Eliminar" onClick={(evt) => handleRemove(idx)}>
                         <Delete />
                      </Button>
                      <Button aria-label="Editar" onClick={(evt) => handleEdit(idx)}>
                         <Edit />
                      </Button>
                   </ListItemSecondaryAction>
                </ListItem>
                )
            }
            </List>
        </Fragment>
    );
}

ListClinicos.propTypes = {

};

export default withStyles(styles)(ListClinicos);
