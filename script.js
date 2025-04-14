import Voice from "./Voice.js";

//envelope
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

const selectVowel = function () {
  //let vowel =
};

const noteMap = {
  ah: {
    a: "ahsah.a.wav",
    w: "ahsah.cc.wav",
    s: "ahsah.d.wav",
    e: "ahsah.dd.wav",
    d: "ahsah.e.wav",
    f: "ahsah.f.wav",
    t: "ahsah.ff.wav",
    g: "ahsah.g.wav",
    y: "ahsah.gg.wav",
    h: "ahsah.a.wav",
    u: "ahsah.aa.wav",
    j: "ahsah.b.wav",
    k: "ahsah.oct.wav",
  },
  ee: {
    a: "eesee.c.wav",
    w: "eesee.cc.wav",
    s: "eesee.d.wav",
    e: "eesee.dd.wav",
    d: "eesee.e.wav",
    f: "eesee.f.wav",
    t: "eesee.ff.wav",
    g: "eesee.g.wav",
    y: "eesee.gg.wav",
    h: "eesee.a.wav",
    u: "eesee.aa.wav",
    j: "eesee.b.wav",
    k: "eesee.oct.wav",
  },
  eh: {
    a: "ehseh.c.wav",
    w: "ehseh.cc.wav",
    s: "ehseh.d.wav",
    e: "ehseh.dd.wav",
    d: "ehseh.e.wav",
    f: "ehseh.f.wav",
    t: "ehseh.ff.wav",
    g: "ehseh.g.wav",
    y: "ehseh.gg.wav",
    h: "ehseh.a.wav",
    u: "ehseh.aa.wav",
    j: "ehseh.b.wav",
    k: "ehseh.oct.wav",
  },
  oh: {
    a: "ohsoh.c.wav",
    w: "ohsoh.cc.wav",
    s: "ohsoh.d.wav",
    e: "ohsoh.dd.wav",
    d: "ohsoh.e.wav",
    f: "ohsoh.f.wav",
    t: "ohsoh.ff.wav",
    g: "ohsoh.g.wav",
    y: "ohsoh.gg.wav",
    h: "ohsoh.a.wav",
    u: "ohsoh.aa.wav",
    j: "ohsoh.b.wav",
    k: "ohsoh.oct.wav",
  },
  ooh: {
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
  },
};

const keyboard = document.getElementById("keyboard");

const keyboardKeys = keyboard.querySelectorAll("li");
keyboardKeys.forEach((pressKey) => {
  pressKey.addEventListener("mousedown", (event) => {
    let keyName = event.target.getAttribute("key");
    if (noteMap.ooh[keyName]) {
      playAudio(noteMap.ooh[keyName]);
      //pressKey[keyName].element.classList.add("pressed");
      console.log(keyName);
    }
  });

  pressKey.addEventListener("mouseup", (event) => {
    let keyName = event.target.getAttribute("key");
    if (noteMap.ooh[keyName]) {
      stopAudio(noteMap.ooh[keyName]);
      //pressKey[keyName].element.classList.remove("pressed");
    }
  });
});

/**
 * @event keydown
 * @description Listens for keydown events and starts a note if the key is mapped.
 */
document.addEventListener("keydown", (e) => {
  if (noteMap.ooh[e.key]) {
    playAudio(noteMap.ooh[e.key]);
    console.log(e.key);
  }
});

/**
 * @event keyup
 * @description Listens for keyup events and stops a note if the key is mapped.
 */
document.addEventListener("keyup", (e) => {
  if (noteMap.ooh[e.key]) {
    stopAudio(noteMap.ooh[e.key]);
  }
});

document.getElementById("eh").addEventListener("click", selectVowel);
document.getElementById("ee").addEventListener("click", selectVowel);
document.getElementById("ah").addEventListener("click", selectVowel);
document.getElementById("oh").addEventListener("click", selectVowel);
document.getElementById("oo").addEventListener("click", selectVowel);

document.getElementById("gain").addEventListener("input", updateGain);
