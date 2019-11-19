import React, { Component } from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import AppContext from './AppContext';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const generateClassName = createGenerateClassName();

class AppProvider extends Component {
  state = {
    type: 'light',
    direction: 'ltr',
  }

  render() {
    const { direction, type } = this.state;
    const theme = createMuiTheme({
      direction,
      palette: {
        type,
        primary: indigo,
        secondary: red,
        error: red
      },
      typography: {
        fontFamily: 'Roboto,"Helvetica Neue",Arial,sans-serif',
        headline: {
          fontSize: '1rem',
        },
        subheading: {
          fontSize: '0.8125rem',
        },
        button: {
          fontWeight: 400,
          textTransform: 'initial'
        }
      },
      shape: {
        borderRadius: 4
      }
    });

    return (
        <MuiThemeProvider theme={theme}>
          { this.props.children }
        </MuiThemeProvider>
    )
  }
}

export default AppProvider;