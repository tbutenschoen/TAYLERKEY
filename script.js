import Voice from "./Voice.js";

const audioCtx = new AudioContext();

let source;
let currentVowel = "ooh";

const activeVoices = {};

const masterGain = audioCtx.createGain();
masterGain.gain.value = 3;
masterGain.connect(audioCtx.destination);

const loadBuffer = async function (filename) {
  const file = await fetch(currentVowel[filename]);
  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

const createBuffer = async function (filename) {
  for (let filename in noteMap) {
    let notePath = noteMap[currentVowel[filename]].path;
    let audio = await loadBuffer(notePath);
    noteMap[currentVowel[filename]].buffer = audio;
  }
};

const playAudio = async function (filename) {
  if (!activeVoices[filename]) {
    const myVoice = new Voice(audioCtx, masterGain);
    activeVoices[currentVowel[filename]] = myVoice;
    let myBuffer = await createBuffer(currentVowel[filename]);
    activeVoices[currentVowel[filename]].start(myBuffer);
  }
};

const stopAudio = function (filename) {
  if (activeVoices[filename]) {
    activeVoices[currentVowel[filename]].stop();
    delete activeVoices[currentVowel[filename]];
  }
};

const updateGain = function (event) {
  masterGain.gain.value = event.target.value;
};

const updateVowel = function (e) {
  currentVowel = vowelMap[e];
  console.log(currentVowel);
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
    a: {
      path: "ahs/ah.c.wav",
      buffer: null,
    },
    w: {
      path: "ahs/ah.cc.wav",
      buffer: null,
    },
    s: {
      path: "ahs/ah.d.wav",
      buffer: null,
    },
    e: {
      path: "ahs/ah.dd.wav",
      buffer: null,
    },
    d: {
      path: "ahs/ah.e.wav",
      buffer: null,
    },
    f: {
      path: "ahs/ah.f.wav",
      buffer: null,
    },
    t: {
      path: "ahs/ah.ff.wav",
      buffer: null,
    },
    g: {
      path: "ahs/ah.g.wav",
      buffer: null,
    },
    y: {
      path: "ahs/ah.gg.wav",
      buffer: null,
    },
    h: {
      path: "ahs/ah.a.wav",
      buffer: null,
    },
    u: {
      path: "ahs/ah.aa.wav",
      buffer: null,
    },
    j: {
      path: "ahs/ah.b.wav",
      buffer: null,
    },
    k: {
      path: "ahs/ah.oct.wav",
      buffer: null,
    },
  },
  ee: {
    a: {
      path: "ees/ee.c.wav",
      buffer: null,
    },
    w: {
      path: "ees/ee.cc.wav",
      buffer: null,
    },
    s: {
      path: "ees/ee.d.wav",
      buffer: null,
    },
    e: {
      path: "ees/ee.dd.wav",
      buffer: null,
    },
    d: {
      path: "ees/ee.e.wav",
      buffer: null,
    },
    f: {
      path: "ees/ee.f.wav",
      buffer: null,
    },
    t: {
      path: "ees/ee.ff.wav",
      buffer: null,
    },
    g: {
      path: "ees/ee.g.wav",
      buffer: null,
    },
    y: {
      path: "ees/ee.gg.wav",
      buffer: null,
    },
    h: {
      path: "ees/ee.a.wav",
      buffer: null,
    },
    u: {
      path: "ees/ee.aa.wav",
      buffer: null,
    },
    j: {
      path: "ees/ee.b.wav",
      buffer: null,
    },
    k: {
      path: "ees/ee.oct.wav",
      buffer: null,
    },
  },
  eh: {
    a: {
      path: "ehs/eh.c.wav",
      buffer: null,
    },
    w: {
      path: "ehs/eh.cc.wav",
      buffer: null,
    },
    s: {
      path: "ehs/eh.d.wav",
      buffer: null,
    },
    e: {
      path: "ehs/eh.dd.wav",
      buffer: null,
    },
    d: {
      path: "ehs/eh.e.wav",
      buffer: null,
    },
    f: {
      path: "ehs/eh.f.wav",
      buffer: null,
    },
    t: {
      path: "ehs/eh.ff.wav",
      buffer: null,
    },
    g: {
      path: "ehs/eh.g.wav",
      buffer: null,
    },
    y: {
      path: "ehs/eh.gg.wav",
      buffer: null,
    },
    h: {
      path: "ehs/eh.a.wav",
      buffer: null,
    },
    u: {
      path: "ehs/eh.aa.wav",
      buffer: null,
    },
    j: {
      path: "ehs/eh.b.wav",
      buffer: null,
    },
    k: {
      path: "ehs/eh.oct.wav",
      buffer: null,
    },
  },
  oh: {
    a: {
      path: "ohs/oh.c.wav",
      buffer: null,
    },
    w: {
      path: "ohs/oh.cc.wav",
      buffer: null,
    },
    s: {
      path: "ohs/oh.d.wav",
      buffer: null,
    },
    e: {
      path: "ohs/oh.dd.wav",
      buffer: null,
    },
    d: {
      path: "ohs/oh.e.wav",
      buffer: null,
    },
    f: {
      path: "ohs/oh.f.wav",
      buffer: null,
    },
    t: {
      path: "ohs/oh.ff.wav",
      buffer: null,
    },
    g: {
      path: "ohs/oh.g.wav",
      buffer: null,
    },
    y: {
      path: "ohs/oh.gg.wav",
      buffer: null,
    },
    h: {
      path: "ohs/oh.a.wav",
      buffer: null,
    },
    u: {
      path: "ohs/oh.aa.wav",
      buffer: null,
    },
    j: {
      path: "ohs/oh.b.wav",
      buffer: null,
    },
    k: {
      path: "ohs/oh.oct.wav",
      buffer: null,
    },
  },
  ooh: {
    a: {
      path: "oohs/ooh.c.wav",
      buffer: null,
    },
    w: {
      path: "oohs/ooh.cc.wav",
      buffer: null,
    },
    s: {
      path: "oohs/ooh.d.wav",
      buffer: null,
    },
    e: {
      path: "oohs/ooh.dd.wav",
      buffer: null,
    },
    d: {
      path: "oohs/ooh.e.wav",
      buffer: null,
    },
    f: {
      path: "oohs/ooh.f.wav",
      buffer: null,
    },
    t: {
      path: "oohs/ooh.ff.wav",
      buffer: null,
    },
    g: {
      path: "oohs/ooh.g.wav",
      buffer: null,
    },
    y: {
      path: "oohs/ooh.gg.wav",
      buffer: null,
    },
    h: {
      path: "oohs/ooh.a.wav",
      buffer: null,
    },
    u: {
      path: "oohs/ooh.aa.wav",
      buffer: null,
    },
    j: {
      path: "oohs/ooh.b.wav",
      buffer: null,
    },
    k: {
      path: "oohs/ooh.oct.wav",
      buffer: null,
    },
  },
};

const keyboard = document.getElementById("keyboard");

const keyboardKeys = keyboard.querySelectorAll("li");
keyboardKeys.forEach((pressKey) => {
  pressKey.addEventListener("mousedown", (event) => {
    let keyName = event.target.getAttribute("key");
    if (noteMap[currentVowel][keyName]) {
      playAudio(noteMap[currentVowel][keyName]);
      console.log(keyName);
    }
  });
  pressKey.addEventListener("mousedown", (event) => {
    let keyName = event.target.getAttribute("key");
    if (vowelMap[keyName]) {
      updateVowel([keyName]);
    }
  });
  pressKey.addEventListener("mouseup", (event) => {
    let keyName = event.target.getAttribute("key");
    if (noteMap[currentVowel][keyName]) {
      stopAudio(noteMap[currentVowel][keyName]);
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
});

document.addEventListener("keydown", (k) => {
  if (vowelMap[k.key]) {
    updateVowel([k.key]);
  }
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

document.getElementById("gain").addEventListener("input", updateGain);
