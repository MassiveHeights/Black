class InitialLife extends Modifier {
  constructor(...values) {
    super();

    this.scatter = FloatScatter.fromObject(...values);
  }

  update(emitter, particle, dt) {
    particle.life = this.scatter.getValue();
  }
}