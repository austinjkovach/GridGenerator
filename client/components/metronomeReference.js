var isPlaying = false;
var audioContext = null;
var last16thNoteDrawn = -1;       // Last 'box' drawn on the screen'

var tempo = 120.0;                // tempo ( in beats per minute )
var lookahead = 25.0              // How frequently to call scheduling function ( in milliseconds )

var current16thNote;              // What note is currently last scheduled?
var nextNoteTime = 0.0;           // When the next note is due
var scheduleAheadTime = 0.1;
var scheduleNote;
var notesInQueue = [];

function nextNote() {

  var secondsPerBeat = 60.0 / tempo;

  nextNoteTime += secondsPerBeat;

  current16thNote++;
  if(current16thNote === 4) {
    current16thNote = 0;
  }
}

function play() {
  isPlaying = !isPlaying;

  //console.log("PLAY")

  if(isPlaying) {
    current16thNote = 0;
    nextNoteTime = audioContext.currentTime;
    timeWorker.postMessage("start");
    return "stop";
  }
  else {
    timeWorker.postMessage("stop");
    return "play";
  }
}

function draw() {
  var currentNote = last16thNoteDrawn;
  var currentTime = audioContext.currentTime;

  while(notesInQueue.length && notesInQueue[0].time < currentTime) {
    currentNote = notesInQueue[0].note;
    notesInQueue.splice(0, 1);
  }

  if(last16thNoteDrawn !== currentNote) {
    var x = Math.floor( canvas.width / 18 );
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    for(var i=0;i<4;i++){
      canvasContext.fillStyle = ( currentNote === i ) ? "red" : "black";
      canvasContext.fillRect( x * i+1, x, x/2, x/2 );
    }
    last16thNoteDrawn = currentNote;
  }

  requestAnimationFrame(draw);
}

function scheduleNote( beatNumber, time ) {

  console.log('SCHEDULENOTE >', beatNumber, time)
  notesInQueue.push( { note: beatNumber, time: time } );

  var osc = audioContext.createOscillator();

  osc.connect( audioContext.destination );

  // var freq = [1, (32/27), (4/3), (3/2), (16/9), 2]
  // var randFreqIndex = Math.floor(Math.random() * freq.length);
  // var freqIndex = freq[randFreqIndex];

  osc.frequency.value = 440.0 // (440.0 * freqIndex);
  if(beatNumber === 0) {
    osc.frequency.value = 880.0;
  }

  osc.start( time );

  osc.stop( time + .05); // sound length
}

function scheduler() {
  console.log('SCHEDULER >')
  while(nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
    scheduleNote( current16thNote, nextNoteTime );
    nextNote();
  }
}

function init(){
  console.log('INIT')

  // Appending new 'div' and 'canvas' to body

  canvas = document.getElementById( 'canvas' );
  canvasContext = canvas.getContext( '2d' );
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvasContext.strokeStyle = "#ffffff";
  canvasContext.lineWidth = 2;

  audioContext = new AudioContext();

  // requestAnimationFrame has a bunch of vendor prefixes
  requestAnimationFrame(draw); //Start drawing the loop

  //timeWorker = new Worker("./client/components/metronomeWorker.js");

  timeWorker.onmessage = function(e) {
    if(e.data === "tick") {
      scheduler();
    }
    else {
      console.log('message:', e.data)
    }
  };

  timeWorker.postMessage({"interval":lookahead});

}

init();

window.addEventListener('load', init);

////////////////////


function changeTempo(value) {
  tempo = value;

  document.getElementById('showTempo').innerText = tempo;
}




