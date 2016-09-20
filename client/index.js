import React from 'react';
import { render } from 'react-dom';

import Grid from './components/Grid'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';

import {
  deepPurple500,
  deepPurple700,
  grey400,
  yellowA700,
  grey100,
  grey500
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepPurple500,
    primary2Color: deepPurple700,
    primary3Color: grey400,
    accent1Color: yellowA700,
    accent2Color: grey100,
    accent3Color: grey500
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [
        {
          flam: false, drag: false
        },
        {
          flam: false, drag: false
        },
        {
          flam: false, drag: false
        }
      ]
    }
    this.toggleDrag = this.toggleDrag.bind(this);
    this.toggleFlam = this.toggleFlam.bind(this);
  }

  toggleDrag(index) {
    let {grid} = this.state;
    grid[index].drag = !grid[index].drag;
    this.setState({grid: grid});
  }


  toggleFlam(index) {
    let {grid} = this.state;
    grid[index].flam = !grid[index].flam;
    this.setState({grid: grid});
  }

  render() {
    return (
      <div>
        <AppBar
          title="Grid Generator"
        />
        <Grid
          grid={this.state.grid}
          toggleDrag={this.toggleDrag}
          toggleFlam={this.toggleFlam}
         />
      </div>
    )
  }
}


class Mui extends React.Component {
  render() {
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <App />
        </MuiThemeProvider>
    );
  }
}

render(<Mui />, document.getElementById('app'));
