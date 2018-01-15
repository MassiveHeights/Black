class InitialMass extends Modifier {
  constructor(...values) {
    super();

    this.scatter = FloatScatter.fromObject(...values);
  }

  update(emitter, particle, dt) {
    particle.mass = this.scatter.getValue();
  }
}