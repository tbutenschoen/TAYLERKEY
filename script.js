import Voice from "./Voice.js";

//envelope
//record other vowels
//start coding for vowel switch
//key depress style

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
  const ampEnv = audioCtx.createGain();
  source.connect(ampEnv);
  ampEnv.connect(masterGain);
  source.start();
  return source;
};

const playAudio = async function (filename) {
  if (!activeVoices[filename]) {
    activeVoices[filename] = await loadAudio(filename);
    activeVoices[filename].start();
  }
};

const stopAudio = function (filename) {
  if (activeVoices[filename]) {
    activeVoices[filename].stop();
    delete activeVoices[filename];
  }
};

const updateGain = function () {
  let sliderValue = document.getElementById("gain").value;
  sliderValue = parseFloat(sliderValue);
  masterGain.gain.linearRampToValueAtTime(
    sliderValue,
    audioCtx.currentTime + 0.01
  );
};

const noteMap = {
  a: "ooh.c.wav",
  w: "ooh.cc.wav",
  s: "ooh.d.wav",
  e: "ooh.dd.wav",
  d: "ooh.e.wav",
  f: "ooh.f.wav",
  t: "ooh.ff.wav",
  g: "ooh.g.wav",
  y: "ooh.gg.wav",
  h: "ooh.a.wav",
  u: "ooh.aa.wav",
  j: "ooh.b.wav",
  k: "ooh.oct.wav",
};

const keyboard = document.getElementById("keyboard");

const keyboardKeys = keyboard.querySelectorAll("li");
keyboardKeys.forEach((pressKey) => {
  pressKey.addEventListener("mousedown", (event) => {
    let keyName = event.target.getAttribute("key");
    if (noteMap[keyName]) {
      playAudio(noteMap[keyName]);
      console.log(keyName);
    }
  });

  pressKey.addEventListener("mouseup", (event) => {
    let keyName = event.target.getAttribute("key");
    if (noteMap[keyName]) {
      stopAudio(noteMap[keyName]);
    }
  });
});

/**
 * @event keydown
 * @description Listens for keydown events and starts a note if the key is mapped.
 */
document.addEventListener("keydown", (e) => {
  if (noteMap[e.key]) {
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
