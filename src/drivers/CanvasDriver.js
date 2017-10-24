// class Shader {
// }

// class MeshBatch {
//   constructor() {
//   }
// }

// class Material {
//   constructor() {
//     //this.shader = Black.instance.video.getShader('default');
//   }
// }

class Renderer {
  constructor() {
    this.updateRequired = true;
    this.zIndex = 0;
    this.texture = null;
    this.alpha = 1;
    this.blendMode = BlendMode.AUTO;
    this.transform = null;
    this.visible = true;
  }

  render(driver) {
  }

  get isRenderable() {
    return this.alpha > 0 && this.visible === true;
  }
}

class SpriteRendererCanvas extends Renderer {
  render(driver) {
    driver.setTransform(this.transform);
    driver.globalAlpha = this.alpha;
    driver.globalBlendMode = this.blendMode;
    driver.drawTexture(this.texture);
  }
}


class SpriteRendererWebGL extends Renderer {
  constructor() {
    super();

    //this.material = new Material();
    this.vertexData = [];
  }

  render() {
    // if (this.dirty == false)
    //   return;

  }

  refreshVertexData() {
    const vertexData = this.vertexData;
    const transform = this.transform.value;
    const a = transform[0];
    const b = transform[1];
    const c = transform[2];
    const d = transform[3];
    const tx = transform[4];
    const ty = transform[5];
    const texture = this.texture;
    const region = texture.mRegion;
    const w = region.width;
    const h = region.height;

    if (texture.isTrimmed) {
      const untrimmedRegion = texture.untrimmedRect;
      const left = untrimmedRegion.x;
      const top = untrimmedRegion.y;
      const right = left + w;
      const bottom = top + h;

      // left top
      vertexData[0] = a * left + c * top + tx;
      vertexData[1] = d * top + b * left + ty;

      // right top
      vertexData[2] = a * right + c * top + tx;
      vertexData[3] = d * top + b * right + ty;

      // left bottom
      vertexData[4] = a * left + c * bottom + tx;
      vertexData[5] = d * bottom + b * left + ty;

      // right bottom
      vertexData[6] = a * right + c * bottom + tx;
      vertexData[7] = d * bottom + b * right + ty;
    } else {

      // left top
      vertexData[0] = tx;
      vertexData[1] = ty;

      // right top
      vertexData[2] = a * w + tx;
      vertexData[3] = b * w + ty;

      // left bottom
      vertexData[4] = c * h + tx;
      vertexData[5] = d * h + ty;

      // right bottom
      vertexData[6] = a * w + c * h + tx;
      vertexData[7] = d * h + b * w + ty;
    }
  }
}

// class NativeFontRenderRenderer extends Renderer {

// }

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
    driver.globalBlendMode = this.blendMode;

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

  get isRenderable() {
    return this.alpha > 0 && this.textures.length > 0 && this.visible === true;
  }
}

class CanvasDriver extends VideoNullDriver {
  /**
   * @param  {HTMLElement} containerElement The DOM element to draw into.
   * @param  {number} width                 The width of the viewport.
   * @param  {number} height                The height of the viewport.
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    /**
     * @private
     * @type {CanvasRenderingContext2D|null}
     */
    this.mCtx = null;

    // cache
    this.mGlobalAlpha = 1;
    this.mGlobalBlendMode = BlendMode.NORMAL;
    this.mIdentityMatrix = new Matrix();

    this.mLetterSpacing = 0;
    this.mRenderers = [];
    this.skipChildren = false;
    this.__createCanvas();
  }

  registerRenderer(renderRenderer) {
    if (renderRenderer.isRenderable === false) {
      this.skipChildren = true;
      return;
    }

    this.skipChildren = false;
    this.mRenderers.push(renderRenderer);

    return renderRenderer;
  }

  render(driver) {
    for (let i = 0, len = this.mRenderers.length; i !== len; i++) {
      let renderer = this.mRenderers[i];

      renderer.render(driver);
    }
  }

  drawTexture(texture) {
    const w = texture.width;
    const h = texture.height;
    const ox = texture.untrimmedRect.x;
    const oy = texture.untrimmedRect.y;

    this.mCtx.drawImage(texture.native, texture.region.x, texture.region.y, w, h, ox, oy, w, h);
  }

  /**
   * @private
   * @return {void}
   */
  __createCanvas() {
    let cvs = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));
    cvs.id = 'canvas';
    cvs.width = this.mClientWidth;
    cvs.height = this.mClientHeight;
    this.mContainerElement.appendChild(cvs);

    this.mCtx = /** @type {CanvasRenderingContext2D} */ (cvs.getContext('2d'));
  }


  /**
   * @private
   * @param {Message} msg
   * @param {Rectangle} rect
   *
   * @returns {void}
   */
  __onResize(msg, rect) {
    super.__onResize(msg, rect);

    this.mCtx.canvas.width = this.mClientWidth;
    this.mCtx.canvas.height = this.mClientHeight;
  }

  /**
   * @ignore
   * @param {Matrix} m
   *
   * @return {void}
   */
  setTransform(m) {
    //TODO: does not work as expected
    // if (this.mTransform.exactEquals(m) === true)
    //   return;

    super.setTransform(m);

    const v = m.value;
    this.mCtx.setTransform(v[0], v[1], v[2], v[3], v[4], v[5]);
  }

  /**
   * @param {number} value
   *
   * @return {void}
   */
  set globalAlpha(value) {
    if (value == this.mGlobalAlpha)
      return;

    this.mGlobalAlpha = value;
    this.mCtx.globalAlpha = value;
  }

  /**
   * @inheritDoc
   * @override
   *
   * @param {string} blendMode
   *
   * @return {void}
   */
  set globalBlendMode(blendMode) {
    if (this.mGlobalBlendMode === blendMode)
      return;

    this.mGlobalBlendMode = blendMode;
    this.mCtx.globalCompositeOperation = blendMode;
  }

  /**
   * clear
   * @inheritDoc
   * @override
   *
   * @return {void}
   */
  clear() {
    // this.mTransform.identity();
    // this.setTransform(this.mIdentityMatrix);

    this.mCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.mCtx.clearRect(0, 0, this.mCtx.canvas.width, this.mCtx.canvas.height);
  }

  /**
   * @inheritDoc
   * @override
   *
   * @return {void}
   */
  beginFrame() {
    this.clear();
    this.skipChildren = false;

    this.mRenderers.splice(0, this.mRenderers.length);
  }

  /**
   * @inheritDoc
   * @override
   *
   * @return {void}
   */
  endFrame() {
  }

  /**
   * @ignore
   * @param {HTMLElement} canvas
   *
   * @return {Texture|null}
   */
  getTextureFromCanvas(canvas) {
    return new Texture(canvas);
  }
}