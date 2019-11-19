import React, {Component,Fragment} from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {ListItemText, ListItemSecondaryAction} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Card, CardContent} from '@material-ui/core';


import { Wrapper } from '../components';



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


class SearchPacientes extends Component {
    state = {
        pacientes:[]
    }
    componentDidMount = () => {
        fetch('/api/persona',{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data =>{
            this.setState({"pacientes": data});
        });
    }

    render(){
        const { data } = this.props;
        const { pacientes} = this.state;
        return (
            <Wrapper>
                <Grid container spacing={8}>
                { pacientes.map((item) =>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="title" gutterBottom> <b> {item.nombre} {item.apepat} {item.apemat}</b></Typography>
                                <Typography variant="body1" gutterBottom><a>www.example.com</a></Typography>
                                <Link to={`/paciente/home/${item.id}`}>Paciente</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
                </Grid>
            </Wrapper>
        );
    }
}

SearchPacientes.propTypes = {

};

export default withStyles(styles)(SearchPacientes);
