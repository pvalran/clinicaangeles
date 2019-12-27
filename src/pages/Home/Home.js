import React, {Component} from 'react';

import PropTypes from 'prop-types';

import { MemoryRouter as Router } from 'react-router';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { Wrapper } from '../../components';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SocialStyles from '../../styles/Social';
import SearchPacientes from '../../stateless/SearchPacientes';

class Home extends Component{
    state = {
        pacientes: [],
        item:{
            id:1
        }

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
        const {item} = this.state;
        return (
            <Wrapper>
                <Grid container spacing={8}>
                { this.state.pacientes.map((item,idx) =>
                    <Grid item xs={12} sm={4} md={4} lg={4} key={idx}>
                        <Card>
                            <CardContent>
                                <Typography variant="subheading" gutterBottom> <b> {item.nombre} {item.apepat} {item.apemat}</b></Typography>
                                <Typography variant="caption">gerald@morris.com</Typography>
                                <Typography variant="body1">Human Resources Manager</Typography>
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

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(SocialStyles)(Home);
