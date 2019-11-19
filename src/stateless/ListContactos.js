import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from  '@material-ui/core/ListItemSecondaryAction';

import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function ListContactos(props) {
   const { item } = props;

   return (

           <ListItem key={props.idx}>
               <ListItemText  primary={props.item.label} secondary={props.item.descripcion} />
               <ListItemSecondaryAction>
                  <Button aria-label="Delete" onClick={props.deletecontacto(props.idx)}>
                     <Delete />
                  </Button>
               </ListItemSecondaryAction>
            </ListItem>


   );
}

ListContactos.propTypes = {

};

export default withStyles(styles)(ListContactos);
