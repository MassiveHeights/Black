/**
 * Manages WebGl element buffer data for sprite program.
 * */
/* @echo EXPORT */
class WebGLElementBuffer {
  constructor(renderer) {

    /** @type {WebGLDriver} */
    this.renderer = renderer;

    /** @type {WebGLRenderingContext} */
    this.gl = renderer.gl;

    /** @type {Number[]} */
    this.mTemplate = [0, 1, 2, 3, 3, 4];

    /** @type {Uint16Array} */
    this.mData = new Uint16Array(renderer.MAX_BATCH_SIZE * 6 - 2);

    /** @type {WebGLBuffer} */
    this.mGlBuffer = this.gl.createBuffer();

    for (let i = 0, l = this.mData.length; i < l; i++) {
      this.mData[i] = this.mTemplate[i % 6] + (i / 6 | 0) * 4;
    }
    
    this.renderer.state.bindElementBuffer(this.mGlBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.mData, this.gl.STATIC_DRAW);
  }

  prepare(objectsAmount) {
    this.renderer.state.bindElementBuffer(this.mGlBuffer);
    // if (this.mData.length >= objectsAmount * 6 - 2) return;
    //
    // this.mData = new Uint16Array(objectsAmount * 6 - 2);
    //
    // for (let i = 0, l = this.mData.length; i < l; i++) {
    //   this.mData[i] = this.mTemplate[i % 6] + (i / 6 | 0) * 4;
    // }
    //
    // this.renderer.state.bindElementBuffer(this.mGlBuffer);
    // this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.mData, this.gl.STATIC_DRAW);
  }
}
