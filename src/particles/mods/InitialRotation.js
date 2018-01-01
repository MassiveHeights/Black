class InitialRotation extends Modifier {
  constructor(...values) {
    super();

    this.scatter = FloatScatter.fromObject(...values);
  }

  update(emitter, particle, dt) {
    particle.r = this.scatter.getValue();
  }
}
