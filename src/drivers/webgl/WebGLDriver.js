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

    this.gl = null;
    this.mCurrentObject = null;
    this.mObjectsAmount = 0;

    this.__createCanvas();

    this.state = new WebGLState(this);
    this.textures = new WebGLTextures(this);
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
      antialias: true, // default true
      alpha    : false
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
    if (blendMode === BlendMode.AUTO) return;

    const changed = this.state.setBlendMode(blendMode);
    
    if (changed) {
      this.flush();
    }
  }

  drawImage(texture) {
    const object = this.mCurrentObject;
    const bounds = Rectangle.__cache;
    const coords = texture.relativeRegion;
    const m = object.worldTransformation.value;
    const tint = object.tint;
    object.onGetLocalBounds(bounds);
    let texSlot = this.textures.bindTexture(object.texture);

    if (texSlot === undefined) {
      this.flush();
      texSlot = this.textures.bindTexture(object.texture);
    }

    this.mObjectsAmount++;
    this.program.push(bounds, m, object.alpha, coords, texSlot, tint);
  }

  flush() {
    this.program.draw(this.mObjectsAmount);
    this.mObjectsAmount = 0;
    this.textures.endBatch();
  }

  beginFrame() {
    super.beginFrame();
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  endFrame() {
    super.endFrame();
    this.flush();
  }
}
