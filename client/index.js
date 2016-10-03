import React from 'react';
import { render } from 'react-dom';

import Grid from './components/Grid'
import Metronome from './components/Metronome';

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
    var component = this;

    timeWorker.onmessage = function(e){
      if(e.data === 'tick') {
        component.scheduler()
      }
      else {
        // console.log('got message:', e.data)
      }
    }

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
      ],
      tempo: 100.0,
      isPlaying: false,
      current16thNote: -1,
      nextNoteTime: 0.0,
      notesInQueue: []
    }

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

  play() {
    let {isPlaying, nextNoteTime, current16thNote} = this.state;
    isPlaying = !isPlaying;

    if(isPlaying) {
      current16thNote = 0
      nextNoteTime = audioContext.currentTime
      timeWorker.postMessage("start")

      this.setState({isPlaying: isPlaying,nextNoteTime: nextNoteTime, current16thNote: current16thNote})
      return "stop"
    }

    else {
      timeWorker.postMessage("stop")

      this.setState({isPlaying: isPlaying})
      return "play"
    }
  }

  nextNote() {
    let {tempo, current16thNote, nextNoteTime} = this.state
    let secondsPerBeat = 60.0 / tempo

    nextNoteTime += 1 * secondsPerBeat

    current16thNote++
    if (current16thNote === 16) {
      current16thNote = 0
    }
    // console.log('current16thNote', current16thNote, nextNoteTime)
    this.setState({current16thNote: current16thNote, nextNoteTime: nextNoteTime})
  }

  scheduler () {
    let scheduleAheadTime = 0.1
    let {nextNoteTime, current16thNote} = this.state
    // console.log('notetime', nextNoteTime, 'aCtx time', audioContext.currentTime)

    if(nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
      this.scheduleNote(current16thNote, nextNoteTime)

      this.nextNote()
    }
  }

  scheduleNote (beatNumber, time) {
    var osc = audioContext.createOscillator()
    // let {notesInQueue} = this.state
    // notesInQueue.push({ note: beatNumber, time: time })

    osc.connect( audioContext.destination )

    // if(beatNumber % 16 === 0){
    //   osc.frequency.value = 880.0
    // }
    // else if (beatNumber % 4 === 0){
      osc.frequency.value = 440.0
    // }
    // else {
    //   osc.frequency.value = 220.0
    // }

    osc.start( time )
    osc.stop( time + 0.05 )

  }


/////////////////////////

  changeTempo(event, value) {
    var {tempo} = this.state

    if(event === 'up') {
      value = tempo + 8
      if(value > 200) {
        value = 200
      }
    }
    if (event === 'down') {
      value = tempo - 8
      if(value < 40) {
        value = 40
      }

    }

    this.setState({tempo: value})
  }

  render() {
    return (
      <div>
        <AppBar
         title="Grid Generator"
        />
        <Grid
         grid={this.state.grid}
         toggleDrag={this.toggleDrag.bind(this)}
         toggleFlam={this.toggleFlam.bind(this)}
        />
        <Metronome
          play={this.play.bind(this)}
          isPlaying={this.state.isPlaying}
          tempo={this.state.tempo}
          changeTempo={this.changeTempo.bind(this)}
          upTempo={this.changeTempo.bind(this, 'up')}
          downTempo={this.changeTempo.bind(this, 'down')}
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


///////////////////////