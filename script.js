// import recordings
// class for recordings?
// attach recordings to keys
// buffer
// envelope
// gain

const audioCtx = new AudioContext();
const currentTime = Date.now();

const masterGain = audioCtx.createGain();
masterGain.connect(audioCtx.destination);

let source;

const updateGain = function (event) {
  let sliderValue = document.getElementById("gain").value;
  sliderValue = parseFloat(sliderValue);
  masterGain.gain.linearRampToValueAtTime(
    sliderValue,
    audioCtx.currentTime + 0.01
  );
};

const loadAudio = async function () {
  const file = await fetch(noteMap.d);
  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(masterGain);
  source.start();
};

const stopAudio = function () {
  source.stop();
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
