class InitialVelocity extends Modifier {
  constructor(...values) {
    super();

    this.scatter = VectorScatter.fromObject(...values);
  }

  update(emitter, particle, dt) {
    this.scatter.getValue();

    particle.vx = this.scatter.value.x;
    particle.vy = this.scatter.value.y;
  }
}
