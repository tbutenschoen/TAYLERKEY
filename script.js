import Voice from "./Voice.js";

//envelope
//coding for vowel switch
//key depress style

const audioCtx = new AudioContext();

let source;
let currentVowel = "ah";

const activeVoices = {};

const masterGain = audioCtx.createGain();
masterGain.gain.value = 0.2;
masterGain.connect(audioCtx.destination);

const loadAudio = async function (filename) {
  const file = await fetch([filename]);
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
  masterGain.gain.setValueAtTime(sliderValue, audioCtx.currentTime);
};

const selectVowel = function (e) {
  currentVowel = vowelMap[e];
};

const vowelMap = {
  z: "eh",
  x: "ee",
  c: "ah",
  v: "oh",
  b: "ooh",
};

const noteMap = {
  ah: {
    a: "ahs/ah.c.wav",
    w: "ahs/ah.cc.wav",
    s: "ahs/ah.d.wav",
    e: "ahs/ah.dd.wav",
    d: "ahs/ah.e.wav",
    f: "ahs/ah.f.wav",
    t: "ahs/ah.ff.wav",
    g: "ahs/ah.g.wav",
    y: "ahs/ah.gg.wav",
    h: "ahs/ah.a.wav",
    u: "ahs/ah.aa.wav",
    j: "ahs/ah.b.wav",
    k: "ahs/ah.oct.wav",
  },
  ee: {
    a: "ees/ee.c.wav",
    w: "ees/ee.cc.wav",
    s: "ees/ee.d.wav",
    e: "ees/ee.dd.wav",
    d: "ees/ee.e.wav",
    f: "ees/ee.f.wav",
    t: "ees/ee.ff.wav",
    g: "ees/ee.g.wav",
    y: "ees/ee.gg.wav",
    h: "ees/ee.a.wav",
    u: "ees/ee.aa.wav",
    j: "ees/ee.b.wav",
    k: "ees/ee.oct.wav",
  },
  eh: {
    a: "ehs/eh.c.wav",
    w: "ehs/eh.cc.wav",
    s: "ehs/eh.d.wav",
    e: "ehs/eh.dd.wav",
    d: "ehs/eh.e.wav",
    f: "ehs/eh.f.wav",
    t: "ehs/eh.ff.wav",
    g: "ehs/eh.g.wav",
    y: "ehs/eh.gg.wav",
    h: "ehs/eh.a.wav",
    u: "ehs/eh.aa.wav",
    j: "ehs/eh.b.wav",
    k: "ehs/eh.oct.wav",
  },
  oh: {
    a: "ohs/oh.c.wav",
    w: "ohs/oh.cc.wav",
    s: "ohs/oh.d.wav",
    e: "ohs/oh.dd.wav",
    d: "ohs/oh.e.wav",
    f: "ohs/oh.f.wav",
    t: "ohs/oh.ff.wav",
    g: "ohs/oh.g.wav",
    y: "ohs/oh.gg.wav",
    h: "ohs/oh.a.wav",
    u: "ohs/oh.aa.wav",
    j: "ohs/oh.b.wav",
    k: "ohs/oh.oct.wav",
  },
  ooh: {
    a: "oohs/ooh.c.wav",
    w: "oohs/ooh.cc.wav",
    s: "oohs/ooh.d.wav",
    e: "oohs/ooh.dd.wav",
    d: "oohs/ooh.e.wav",
    f: "oohs/ooh.f.wav",
    t: "oohs/ooh.ff.wav",
    g: "oohs/ooh.g.wav",
    y: "oohs/ooh.gg.wav",
    h: "oohs/ooh.a.wav",
    u: "oohs/ooh.aa.wav",
    j: "oohs/ooh.b.wav",
    k: "oohs/ooh.oct.wav",
  },
};

const keyboard = document.getElementById("keyboard");

const keyboardKeys = keyboard.querySelectorAll("li");
keyboardKeys.forEach((pressKey) => {
  pressKey.addEventListener("mousedown", (event) => {
    let keyName = event.target.getAttribute("key");
    if (noteMap[currentVowel][keyName]) {
      playAudio(noteMap[currentVowel][keyName]);
      pressKey[keyName].element.classList.add("pressed");
      console.log(keyName);
    }
  });

  pressKey.addEventListener("mouseup", (event) => {
    let keyName = event.target.getAttribute("key");
    if (noteMap[currentVowel][keyName]) {
      stopAudio(noteMap[currentVowel][keyName]);
      pressKey[keyName].element.classList.remove("pressed");
    }
  });
});

/**
 * @event keydown
 * @description Listens for keydown events and starts a note if the key is mapped.
 */
document.addEventListener("keydown", (e) => {
  if (noteMap[currentVowel][e.key]) {
    playAudio(noteMap[currentVowel][e.key]);
    console.log(e.key);
  }
  if (vowelMap[e.key]) selectVowel(vowelMap[e.key]);
});

/**
 * @event keyup
 * @description Listens for keyup events and stops a note if the key is mapped.
 */
document.addEventListener("keyup", (e) => {
  if (noteMap[currentVowel][e.key]) {
    stopAudio(noteMap[currentVowel][e.key]);
  }
});

//document.getElementById("eh").addEventListener("click", selectVowel);
//document.getElementById("ee").addEventListener("click", selectVowel);
//document.getElementById("ah").addEventListener("click", selectVowel);
//document.getElementById("oh").addEventListener("click", selectVowel);
//document.getElementById("ooh").addEventListener("click", selectVowel);

document.getElementById("gain").addEventListener("input", updateGain);
