import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import SessionStyles from '../../styles/Session';
import routes from "../../routes";


class Signin extends Component {
    render() {
        const {classes} = this.props;
        const getRoutes = (
            <Switch>
                { routes.items.map((item, index) => (
                    item.type === 'external' ? <Route exact path={item.path} component={item.component} name={item.name} key={index} />:
                        item.type === 'submenu' ? item.children.map(subItem => <Route exact path={`${item.path}${subItem.path}`} component={subItem.component} name={subItem.name} />):
                            <Route exact path={item.path} component={item.component} name={item.name} key={index} />
                ))}
                <Redirect to="/404" />
            </Switch>
        )

        return (
            <div className={classNames(classes.session, classes.background)}>
                <div className={classes.content}>
                    <div className={classes.wrapper}>
                        <Card>
                            <CardContent>
                                <form action="/taskboard" method="get">
                                    <div className="text-xs-center pb-xs">
                                        <img src="/static/images/logo-dark.svg" alt=""/>
                                        <Typography variant="caption">Sign in with your app id to continue.</Typography>
                                    </div>
                                    <TextField
                                        id="username"
                                        label="Username"
                                        className={classes.textField}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        id="password"
                                        label="Password"
                                        className={classes.textField}
                                        type="password"
                                        fullWidth
                                        margin="normal"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value="checkedA"
                                            />
                                        }
                                        label="Stayed logged in"
                                        className={classes.fullWidth}
                                    />
                                    <Button variant="raised" color="primary" fullWidth type="submit">Login</Button>
                                    <div className="pt-1 text-md-center">
                                        <Link to="/dashboard">
                                            <Button>Forgot password?</Button>
                                        </Link>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Link to="/signup">
                                            <Button>Create new account.</Button>
                                        </Link>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(SessionStyles)(Signin);
