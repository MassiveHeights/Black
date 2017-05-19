/**
 * An video driver that draw everything into DOM Canvas element.
 *
 * @cat drivers
 * @extends VideoNullDriver
 */
/* @echo EXPORT */
class WebGLDriver extends VideoNullDriver {
  /**
   * @param  {HTMLElement} containerElement description
   * @param  {number} width            description
   * @param  {number} height           description
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    console.log(`WebGL`);

    /** @type {Number} */
    this.MAX_BATCH_SIZE = 65535;

    /**
     * @public
     * @type {WebGLRenderingContext|null}
     */
    this.gl = null;
    
    /**
     * Contains current rendering object.
     *
     * @private
     * @type {DisplayObject|null}
     */
    this.mCurrentObject = null;

    /**
     * Counts batch objects amount.
     * 
     * @private
     * @type {Number|null}
     */
    this.mObjectsAmount = 0;

    this.__createCanvas();

    /** 
     * Contains WebGL context state
     * 
     * @type {WebGLState} 
     * */
    this.state = new WebGLState(this);

    /**
     * Manager for WebGL textures
     *
     * @type {WebGLTextures}
     * */
    this.textures = new WebGLTextures(this);

    /**
     * Program that renders sprites
     *
     * @type {WebGLProgram}
     * */
    this.program = new WebGLProgram(this);
  }

  /**
   * __createCanvas
   *
   * @return {void}
   */
  __createCanvas() {
    let cvs = /** @type {HTMLCanvasElement} */ (document.createElement(`canvas`));
    cvs.id = `canvas`;
    this.mContainerElement.appendChild(cvs);

    const config = {
      antialias         : true, // default true
      alpha             : false,
      premultipliedAlpha: false
    };

    this.gl = cvs.getContext(`webgl`, config) || cvs.getContext(`webgl-experimental`, config);
    this.gl.canvas.width = this.mClientWidth;
    this.gl.canvas.height = this.mClientHeight;
    this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    this.gl.clearColor(0, 0, 0, 1);
  }

  __onResize(msg, rect) {
    super.__onResize(msg, rect);

    this.gl.canvas.width = this.mClientWidth;
    this.gl.canvas.height = this.mClientHeight;
    this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    this.program.resize();
  }

  save(gameObject) {
    this.mCurrentObject = gameObject;
  }

  set globalBlendMode(blendMode) {
    const same = this.state.checkBlendMode(blendMode);

    if (!same) {
      this.flush();
      this.state.setBlendMode(blendMode);
    }
  }

  drawImage(texture, bounds) {
    const object = this.mCurrentObject;
    const coords = texture.relativeRegion;
    const m = this.mTransform.value;
    const tint = object.tint || {r: 1, g: 1, b: 1};

    let texSlot = this.textures.bindTexture(texture);

    if (texSlot === undefined) {
      this.flush();
      texSlot = this.textures.bindTexture(texture);
    }
    
    if (this.mObjectsAmount === this.MAX_BATCH_SIZE) {
      this.flush();
    }

    this.mObjectsAmount++;
    this.program.push(bounds, m, this.mGlobalAlpha, coords, texSlot, tint);
  }

  flush() {
    this.program.draw(this.mObjectsAmount);
    this.mObjectsAmount = 0;
    this.textures.endBatch();
  }

  beginFrame() {
    super.beginFrame();
    // this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  endFrame() {
    super.endFrame();
    this.flush();
  }
}
