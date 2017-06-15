/* @echo EXPORT */
class WebGLState {
  constructor(renderer) {
    this.renderer = renderer;
    this.gl = renderer.gl;

    /** @type {WebGLBuffer} */
    this.mBoundArrayBuffer = null;

    /** @type {WebGLBuffer} */
    this.mBoundElementBuffer = null;

    /** @type {WebGLTexture} */
    this.mBoundTexture = null;

    /** @type {WebGLTexture} */
    this.mActiveTexture = null;

    /** @type {WebGLProgram} */
    this.mProgram = null;

    /** @type {BlendMode} */
    this.mBlendMode = null;

    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
  }

  bindArrayBuffer(buffer) {
    if (buffer === this.mBoundArrayBuffer)
      return;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.mBoundArrayBuffer = buffer;
  }

  bindElementBuffer(buffer) {
    if (buffer === this.mBoundElementBuffer)
      return;

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
    this.mBoundElementBuffer = buffer;
  }

  bindTexture(texture) {
    if (texture === this.mBoundTexture)
      return;

    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.mBoundTexture = texture;
  }

  setActiveTexture(slot) {
    if (slot === this.mActiveTexture)
      return;

    this.gl.activeTexture(slot);
    this.mActiveTexture = slot;
  }

  useProgram(program) {
    if (program === this.mProgram)
      return;

    this.gl.useProgram(program);
    this.mProgram = program;
  }

  setBlendMode(blend) {
    if (blend === this.mBlendMode)
      return;

    this.mBlendMode = blend;
    const blendEquation = WebGLBlendMode(blend, this.gl);
    this.gl.blendFunc(blendEquation.src, blendEquation.dst);

    return true;
  }

  checkBlendMode(blend) {
    return blend === this.mBlendMode;
  }
}