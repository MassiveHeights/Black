/* @echo EXPORT */
class WebGLState {
  constructor(renderer) {
    const gl = this.gl = renderer.gl;
    this.mRenderer = renderer;

    this.mTexturesManager = new WebGLTexturesManager(renderer);
    this.mBoundElementBuffer = null;
    this.mBoundArrayBuffer = null;
    this.mBlendMode = null;

    gl.enable(gl.BLEND);
    this.setBlendMode(BlendMode.NORMAL);
  }

  bindArrayBuffer(buffer) {
    if (buffer === this.mBoundArrayBuffer) return;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.mBoundArrayBuffer = buffer;
  }
  
  bindElementBuffer(buffer) {
    if (buffer === this.mBoundElementBuffer) return;

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
    this.mBoundElementBuffer = buffer;
  }
  
  bindTexture(texture) {
    return this.mTexturesManager.bindTexture(texture);
  }
  
  setBlendMode(blend) {
    if (blend === this.mBlendMode) return;

    this.mBlendMode = blend;
    const blendFunc = WebGLBlendMode(blend, this.gl);
    this.gl.blendFunc(blendFunc.src, blendFunc.dst);
    
    return true;
  }
  
  checkBlendMode(blend) {
    return blend === this.mBlendMode;
  }

  endBatch() {
    this.mTexturesManager.endBatch();
  }
}
