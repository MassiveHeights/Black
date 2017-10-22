class Shader {
}

class MeshBatch {
  constructor() {
  }
}

class Material {
  constructor() {
    //this.shader = Black.instance.video.getShader('default');
  }
}

class Renderer {
  constructor() {
    this.updateRequired = true;
    this.zIndex = 0;
    this.dirty = DirtyFlag.DIRTY;
    this.texture = null;
    this.alpha = 1;
    this.blendMode = BlendMode.AUTO;
    this.transform = null;
    this.visible = true;
  }

  render(driver) {
  }

  get isRenderable() {
    return this.alpha > 0 && this.texture !== null && this.visible === true;
  }
}

class StageNullRenderer extends Renderer {
  constructor() {
    super();
  }

  get isRenderable() {
    return true;
  }
}

class SpriteRendererCanvas extends Renderer {
  render(driver) {
    const ctx = driver.mCtx;
    const w = this.texture.width;
    const h = this.texture.height;
    const ox = this.texture.untrimmedRect.x;
    const oy = this.texture.untrimmedRect.y;

    ctx.drawImage(this.texture.native, this.texture.region.x, this.texture.region.y, w, h, ox, oy, w, h);
  }
}


class SpriteRendererWebGL extends Renderer {
  constructor() {
    this.material = new Material();
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

class NativeFontRenderSupport extends Renderer {

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

  getRendererForType(type) {
    return new SpriteRendererCanvas;
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
    const length = this.mRenderers.length;

    for (let i = 0; i < length; i++) {
      let renderer = this.mRenderers[i];

      this.setTransform(renderer.transform);
      this.globalAlpha = renderer.alpha;
      this.globalBlendMode = renderer.blendMode;

      renderer.render(driver);
    }
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
    if (this.mTransform.exactEquals(m) === true)
      return;

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
    this.setTransform(this.mIdentityMatrix);
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