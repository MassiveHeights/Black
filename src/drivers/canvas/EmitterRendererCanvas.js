import { Renderer } from "../Renderer";
import { Matrix } from "../../geom/Matrix";
import { Emitter } from "../../particles/Emitter";
import { EmitterSortOrder } from "../../particles/EmitterSortOrder";

/**
 * Renders `Particle` objects on canvas.
 *
 * @extends black-engine~Renderer
 * @cat drivers.canvas
 */
export class EmitterRendererCanvas extends Renderer {
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

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     */
    this.__tmpLocal = new Matrix();

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     */
    this.__tmpWorld = new Matrix();
  }

  /** @inheritDoc */
  preRender(driver, session) {
    let gameObject = /** @type {Emitter} */ (this.gameObject);

    this.endPassRequired = this.gameObject.mClipRect !== null && this.gameObject.mClipRect.isEmpty === false;
    this.skipChildren = !(gameObject.mAlpha > 0 && gameObject.mTextures.length > 0 && gameObject.mVisible === true);
    this.skipSelf = !(gameObject.mTextures.length > 0 && gameObject.mParticles.length > 0);
  }

  /** @inheritDoc */
  render(driver, session) {
    let gameObject = /** @type {Emitter} */ (this.gameObject);

    driver.setSnapToPixels(gameObject.snapToPixels);

    let plength = gameObject.mParticles.length;
    let localTransform = this.__tmpLocal;
    let worldTransform = this.__tmpWorld;
    localTransform.identity();

    if (gameObject.sortOrder === EmitterSortOrder.FRONT_TO_BACK) {
      for (let i = 0; i < plength; i++)
        this.__renderParticle(gameObject.mParticles[i], localTransform, worldTransform, driver);
    } else {
      for (let i = plength - 1; i > 0; i--)
        this.__renderParticle(gameObject.mParticles[i], localTransform, worldTransform, driver);
    }
  }

  /**
   * @ignore
   * @private
   * @param {black-engine~Particle} particle
   * @param {black-engine~Matrix} localTransform
   * @param {black-engine~Matrix} worldTransform
   * @param {black-engine~VideoNullDriver} driver
   */
  __renderParticle(particle, localTransform, worldTransform, driver) {
    let gameObject = /** @type {Emitter} */ (this.gameObject);

    let texture = gameObject.textures[particle.textureIndex];
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

    if (gameObject.mIsLocal === true) {
      worldTransform.identity();
      worldTransform.copyFrom(localTransform);
      worldTransform.prepend(gameObject.worldTransformation);
    } else {
      worldTransform.copyFrom(gameObject.mSpace.worldTransformation);
      worldTransform.append(localTransform);
    }

    driver.setGlobalAlpha(gameObject.mAlpha * particle.alpha);
    driver.setTransform(worldTransform);
    driver.drawTexture(Renderer.getColoredTexture(texture, particle.color === null ? gameObject.mColor : particle.color));
  }
}