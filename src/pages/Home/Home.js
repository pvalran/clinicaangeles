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
        /*

           this.props.navigation.navigate('Details', {
             itemId: 86,
             otherParam: 'anything you want here',
           });
         }}
        *const { navigation } = this.props;
        *const itemId = navigation.getParam('itemId', 'NO-ID');
        *const otherParam = navigation.getParam('otherParam', 'some default value');
        */
        return (
            <Wrapper>
                <Grid container spacing={8}>
                { this.state.pacientes.map((item) =>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1" gutterBottom> <b> {item.nombre} {item.apepat} {item.apemat}</b></Typography>
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
