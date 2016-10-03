import React from 'react';
import Paper from 'material-ui/Paper';

import Tuplet from './Tuplet';
import Canvas from './Canvas';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SvgIcon from 'material-ui/SvgIcon';
import gridIcon from '../assets/dragIcon';

require('./Grid.scss');

const style = {
  height: '100%',
  width: '100%',
  textAlign: 'center',
  display: 'inline-block',
};

class Grid extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var component = this;
    return (
      <div className="grid">
        <div className="options-container">
          <div className="btn-container">
            {
              this.props.grid.map(function(note, i) {
                return (
                  <FloatingActionButton onClick={component.props.toggleDrag.bind(component, i)} mini={true} secondary={!note.drag} key={i}>
                    <SvgIcon viewBox='0 0 100 100'>
                      <rect width="55" height="15" transform="translate(20 55) rotate(-25)" />
                    </SvgIcon>
                  </FloatingActionButton>
                )
              })
            }
          </div>
          <div className="btn-container">
            {
              this.props.grid.map(function(note, i) {
                return (
                  <FloatingActionButton onClick={component.props.toggleFlam.bind(component, i)} mini={true} secondary={!note.flam} key={i}>
                    <SvgIcon viewBox='0 0 100 100'>
                      <rect x="51.5" y="25" width="4" height="35"/>
                      <ellipse transform="translate(46 60) rotate(-25)" rx="10" ry="8"/>
                      <path d="M53.5 25 Q 54 40 65 40" stroke="white" fill="transparent" strokeWidth="5"></path>
                    </SvgIcon>
                  </FloatingActionButton>
                )
              })
            }
          </div>
        </div>
        <Paper style={style} zDepth={3} children={<Canvas grid={this.props.grid}/>} />
      </div>
    )
  }
}

export default Grid