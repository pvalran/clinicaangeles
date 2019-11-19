import React from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Button from '@material-ui/core/Button';

import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

const styles = theme => ({
   root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
   }
});

function ListMedicamentos(props){
   const {data, handleRemove, handleEdit } = props;
   return (
      <List>
         {
            data.map((item,idx)=>
               <ListItem key={idx}>
                  <ListItemText  primary={item.descripcion} secondary={item.via_admin} />
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
   );
}

ListMedicamentos.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListMedicamentos);
