var timerID=null;
var interval=100;

self.onmessage=function(e){
  if (e.data=="start") {
    console.log("worker starting");
    timerID=setInterval(function(){postMessage("tick");},interval)
  }

  else if (e.data.interval) {
    console.log("worker setting interval");
    interval=e.data.interval;
    console.log("interval="+interval);
    if (timerID) {
      clearInterval(timerID);
      timerID=setInterval(function(){postMessage("tick");},interval)
    }
  }

  else if (e.data=="stop") {
    console.log("worker stopping");
    clearInterval(timerID);
    timerID=null;
  }

};
console.log('michelle');

// TODO

// Figure out why first 2 notes are dropped
