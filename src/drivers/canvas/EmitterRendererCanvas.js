/**
 * Renders `Particle` objects on canvas.
 *
 * @extends Renderer
 * @cat drivers.canvas
 */
/* @echo EXPORT */
class EmitterRendererCanvas extends Renderer {
  /**
   * Creates new instance of EmitterRendererCanvas.
   */
  constructor() {
    super();

    /**
     * @ignore
     * @type {boolean}
     */
    this.isLocal = false;

    /** @private @type {Matrix} */
    this.__tmpLocal = new Matrix();

    /** @private @type {Matrix} */
    this.__tmpWorld = new Matrix();
  }

  /** @inheritDoc */
  preRender() {
    this.skipChildren = !(this.gameObject.mAlpha > 0 && this.gameObject.mTextures.length > 0 && this.gameObject.mVisible === true);
    this.skipSelf = !(this.gameObject.mTextures.length > 0 && this.gameObject.mParticles.length > 0);
  }

  /** @inheritDoc */
  render(driver) {
    const plength = this.gameObject.mParticles.length;

    let localTransform = this.__tmpLocal;
    let worldTransform = this.__tmpWorld;
    localTransform.identity();

    if (this.gameObject.sortOrder === EmitterSortOrder.FRONT_TO_BACK) {
      for (let i = 0; i < plength; i++)
        this.__renderParticle(this.gameObject.mParticles[i], localTransform, worldTransform, driver);
    } else {
      for (let i = plength - 1; i > 0; i--)
        this.__renderParticle(this.gameObject.mParticles[i], localTransform, worldTransform, driver);
    }
  }

  /**
   * @ignore
   * @private
   * @param {Particle} particle
   * @param {Matrix} localTransform
   * @param {Matrix} worldTransform
   * @param {VideoNullDriver} driver
   */
  __renderParticle(particle, localTransform, worldTransform, driver) {
    let texture = this.gameObject.textures[particle.textureIndex];
    let tw = texture.displayWidth * particle.anchorX;
    let th = texture.displayHeight * particle.anchorY;

    if (particle.r === 0) {
      let tx = particle.x - tw * particle.scaleX;
      let ty = particle.y - th * particle.scaleY;
      localTransform.set(particle.scaleX, 0, 0, particle.scaleY, tx, ty);
    } else {
      let cos = Math.cos(particle.r);
      let sin = Math.sin(particle.r);
      let a = particle.scaleX * cos;
      let b = particle.scaleX * sin;
      let c = particle.scaleY * -sin;
      let d = particle.scaleY * cos;

      let tx = particle.x - tw * a - th * c;
      let ty = particle.y - tw * b - th * d;
      localTransform.set(a, b, c, d, tx, ty);
    }

    if (this.gameObject.mIsLocal === true) {
      worldTransform.identity();
      worldTransform.copyFrom(localTransform);
      worldTransform.prepend(this.gameObject.worldTransformation);
    } else {
      worldTransform.copyFrom(this.gameObject.mSpace.worldTransformation);
      worldTransform.append(localTransform);
    }

    driver.setGlobalAlpha(this.gameObject.mAlpha * particle.alpha);
    driver.setTransform(worldTransform);
    driver.drawTexture(Renderer.getColoredTexture(texture, particle.color === null ? this.gameObject.mColor : particle.color));
  }
}