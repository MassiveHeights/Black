class InitialPosition extends Modifier {
  constructor(...values) {
    super();

    this.scatter = VectorScatter.fromObject(...values);
  }

  update(emitter, particle, dt) {
    let v = this.scatter.getValue();
    particle.x = v.x;
    particle.y = v.y;
  }
}