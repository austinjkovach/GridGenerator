import React from 'react';
import { render } from 'react-dom';

import {indigo500, indigo700, redA200} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

class BaseMUI extends React.Component {
  getChildContext() {
    return  {
      muiTheme: getMuiTheme({
        palette: {
          primary1Color: indigo500,
          primary2Color: indigo700,
          accent1Color: redA200,
          pickerHeaderColor: indigo500
        }
      })
    }
  }
}

BaseMUI.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default BaseMUI;



// class Raised extends BaseMUI {
//   render () {
//     return (
//       <RaisedButton label="default" />
//     )
//   }
// }

