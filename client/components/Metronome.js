import React from 'react';


import Slider from 'material-ui/Slider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import PauseArrow from 'material-ui/svg-icons/av/pause';
import AddIcon from 'material-ui/svg-icons/Content/Add';
import RemoveIcon from 'material-ui/svg-icons/Content/Remove';
require('./Metronome.scss')

class Metronome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var playPause = this.props.isPlaying ? (<PauseArrow />) : (<PlayArrow />);
    return (
      <div className="metronome">
        <div id="controls">
          <div>
            <FloatingActionButton onClick={ this.props.play }>
              { playPause }
            </FloatingActionButton>
          </div>
          <div id="tempoBox">
            <div className="tempoButton">
            <FloatingActionButton onClick={this.props.downTempo} mini={true}><RemoveIcon /></FloatingActionButton>
            </div>
            <div className="tempoSlider">
              <Slider min={40.0} max={200.0} step={1} value={this.props.tempo} onChange={this.props.changeTempo} />
            </div>
            <div className="tempoButton">
              <FloatingActionButton onClick={this.props.upTempo} mini={true}><AddIcon /></FloatingActionButton>
            </div>
            <div className="tempoDisplay">{this.props.tempo} BPM</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Metronome