// import recordings
// class for recordings?
// attach recordings to keys
// buffer
// envelope
// gain

import Voice from "./Voice.js";

const audioCtx = new AudioContext();

let source;

const activeVoices = {};

const masterGain = audioCtx.createGain();
masterGain.gain.value = 0.2;
masterGain.connect(audioCtx.destination);

const loadAudio = async function (filename) {
  const file = await fetch(filename);
  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
};

const playAudio = function (note) {
  if (!activeVoices[note]) {
    let someVoice = new Voice(audioCtx, masterGain);
    activeVoices[note] = someVoice;
    activeVoices[note].start();
  }
};

const stopAudio = function (note) {
  if (activeVoices[note]) {
    activeVoices[note].stop();
    delete activeVoices[note];
  }
};

const updateGain = function (event) {
  let sliderValue = document.getElementById("gain").value;
  sliderValue = parseFloat(sliderValue);
  masterGain.gain.linearRampToValueAtTime(
    sliderValue,
    audioCtx.currentTime + 0.01
  );
};

const noteMap = {
  a: "ooh.wav",
  s: "ooh-pitchII_01.wav",
  d: "ooh-pitchII_02.wav",
  f: "ooh-pitchII_03.wav",
  g: "ooh-pitchII_04.wav",
  h: "ooh-pitchII_05.wav",
  j: "ooh-pitchII_06.wav",
  k: "ooh-pitchII_07.wav",
};

/**
 * @event keydown
 * @description Listens for keydown events and starts a note if the key is mapped.
 */
document.addEventListener("keydown", (e) => {
  if (noteMap[e.key]) {
    loadAudio(noteMap[e.key]);
    playAudio(noteMap[e.key]);
    console.log(e.key);
  }
});

/**
 * @event keyup
 * @description Listens for keyup events and stops a note if the key is mapped.
 */
document.addEventListener("keyup", (e) => {
  if (noteMap[e.key]) {
    stopAudio(noteMap[e.key]);
  }
});

document.getElementById("gain").addEventListener("input", updateGain);
