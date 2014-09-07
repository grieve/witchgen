var BufferLoader = require('./loader');
/**
 * Core audio loader and playback module
 * TODO: clean this shit up
 */

var mod = {};

var AUDIO;

var soundList = {};
var sounds = {};

var onSoundsLoaded = function(items) {
    console.log('All sounds loaded', items);
};

// quick sound loader
function setSounds(soundsHash) {

    soundList = soundsHash;

}

// play sound
function playSound(id, semitones, time, dur) {

  var source = AUDIO.createBufferSource();
  source.buffer = sounds[id];

  var semitoneRatio = Math.pow(2, 1/12);
  source.playbackRate.value = Math.pow(semitoneRatio, semitones);

  source.connect(AUDIO.destination);
  source.start(time);
  if(dur !== undefined) source.stop(time + dur);

}

function setCallback(fn) {
    onSoundsLoaded = fn;
}

// init
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    AUDIO = new AudioContext();

    mod._context = AUDIO;

    var bufferLoader = new BufferLoader(
        AUDIO, soundList, function(items) {
            sounds = items;
            onSoundsLoaded(sounds);
        }
    );

    bufferLoader.load();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

mod = {
    _context: null,
    init: init,
    setSounds: setSounds,
    play: playSound,
    ready: setCallback

};

module.exports = mod;
