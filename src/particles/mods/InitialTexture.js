class InitialTexture extends Modifier {
  constructor(...values) {
    super();

    this.scatter = FloatScatter.fromObject(...values);
  }

  update(emitter, particle, dt) {
    particle.textureIndex = Math.round(this.scatter.getValue());
  }
}