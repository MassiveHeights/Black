/* @echo EXPORT */
class WebGLElementBuffer {
  constructor(renderer) {
    this.renderer = renderer;
    this.gl = renderer.gl;

    const initObjectsAmount = 128;

    this.mTemplate = [0, 1, 2, 3, 3, 4];
    this.mData = [];
    this.mGlBuffer = this.gl.createBuffer();
    this.prepare(initObjectsAmount);
  }

  prepare(objectsAmount) {
    if (this.mData.length >= objectsAmount * 6 - 2) return;

    this.mData = new Uint16Array(objectsAmount * 6 - 2);
    
    for (let i = 0, l = this.mData.length; i < l; i++) {
      this.mData[i] = this.mTemplate[i % 6] + (i / 6 | 0) * 4;
    }
    
    this.renderer.state.bindElementBuffer(this.mGlBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.mData, this.gl.STATIC_DRAW);
  }
}
