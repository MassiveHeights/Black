class InitialScale extends Modifier {
  constructor(...values) {
    super();

    this.scatter = FloatScatter.fromObject(...values);
  }

  update(emitter, particle, dt) {
    particle.scaleX = particle.scaleY = this.scatter.getValue();
  }
}
