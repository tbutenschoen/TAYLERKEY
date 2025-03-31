export default class Voice {
  constructor(ctx, output) {
    this.context = ctx;
    this.output = output;

    this.attack = 0.02;
    this.decay = 0.01;
    this.sustain = 0.8;
    this.release = 0.4;
  }

  start() {
    const now = this.context.currentTime;
    this.source = this.context.createSource();
    this.source.onended = this.dispose.bind(this);

    this.ampEnv = this.context.createGain();
    this.ampEnv.gain.setValueAtTime(0, now);

    this.source.connect(this.ampEnv);
    this.ampEnv.connect(this.output);

    this.source.start();

    this.ampEnv.gain.linearRampToValueAtTime(this.maxAmp, now + this.attack);
    this.ampEnv.gain.linearRampToValueAtTime(
      this.sustain * this.maxAmp,
      now + this.attack + this.decay
    );
  }

  stop() {
    const now = this.context.currentTime;
    this.ampEnv.gain.cancelScheduledValues(now);
    this.ampEnv.gain.linearRampToValueAtTime(0, now + this.release);
    this.source.stop(now + this.release + 0.01);
  }

  dispose() {
    this.source.disconnect();
    this.source = null;
  }
}
