import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';

require('./Navbar.scss');


class Navbar extends React.Component {
  render() {
    return (
      <AppBar
        title="Grid Generator"
        iconElementRight={<IconButton><NavigationExpandMore /></IconButton>}
      />
    )
  }  
}

export default Navbar;