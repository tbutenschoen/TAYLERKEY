export default class Voice {
  constructor(ctx, out) {
    this.context = ctx;
    this.output = out;

    this.attack = 0.1;
    this.decay = 0.1;
    this.sustain = 0.9;
    this.release = 0.2;
    this.Amp = 1;
  }

  start() {
    const now = this.context.currentTime;
    this.source = this.context.createBufferSource();
    this.source.onended = this.dispose.bind(this);

    this.ampEnv = this.context.createGain();
    this.ampEnv.gain.setValueAtTime(0, now);

    this.source.connect(this.ampEnv);
    this.ampEnv.connect(this.output);

    this.source.start();

    this.ampEnv.gain.linearRampToValueAtTime(this.Amp, now + this.attack);
    this.ampEnv.gain.linearRampToValueAtTime(
      this.sustain * this.Amp,
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
