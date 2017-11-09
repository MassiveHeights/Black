/* @echo EXPORT */
class EmitterRendererCanvas extends Renderer {
  constructor() {
    super();

    this.particles = []; // []
    this.textures = []; // []
    this.space = null;

    this.__tmpLocal = new Matrix();
    this.__tmpWorld = new Matrix();
  }

  render(driver) {
    const plength = this.particles.length;

    let localTransform = this.__tmpLocal;
    let worldTransform = this.__tmpWorld;
    localTransform.identity();

    for (let i = 0; i < plength; i++) {
      let particle = this.particles[i];

      let texture = this.textures[particle.textureIndex];
      let tw = texture.width * 0.5;
      let th = texture.height * 0.5;

      if (particle.r === 0) {
        let tx = particle.x - tw * particle.scale;
        let ty = particle.y - th * particle.scale;
        localTransform.set(particle.scale, 0, 0, particle.scale, tx, ty);
      } else {
        let cos = Math.cos(particle.r);
        let sin = Math.sin(particle.r);
        let a = particle.scale * cos;
        let b = particle.scale * sin;
        let c = particle.scale * -sin;
        let d = particle.scale * cos;

        let tx = particle.x - tw * a - th * c;
        let ty = particle.y - tw * b - th * d;
        localTransform.set(a, b, c, d, tx, ty);
      }

      if (this.isLocal === true) {
        worldTransform.identity();
        worldTransform.copyFrom(localTransform);
        worldTransform.prepend(this.transform);
      } else {
        this.space.worldTransformation.copyTo(worldTransform);
        worldTransform.append(localTransform);
      }

      driver.globalAlpha = this.alpha * particle.alpha;

      driver.setTransform(worldTransform);
      driver.drawTexture(texture);
    }
  }

  childrenRendered(driver) {
    driver.endClip();
  }

  get isRenderable() {
    return this.alpha > 0 && this.textures.length > 0 && this.visible === true;
  }
}