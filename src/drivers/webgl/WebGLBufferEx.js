/**
* Manages WebGl array buffer data for sprite program.
* */
/* @echo EXPORT */
class WebGLBufferEx {
  constructor(renderer) {

    /** @type {WebGLDriver} */
    this.renderer = renderer;
    
    /** @type {WebGLRenderingContext} */
    this.gl = renderer.gl;

    /** @type {WebGLBuffer} */
    this.mGlBuffer = this.gl.createBuffer();

    /** @type {Float32Array} */
    this.mFloatView = new Float32Array(renderer.MAX_BATCH_SIZE * 60);

    /** @type {Number} */
    this.mBatchFloatsOffset = 0;

    /** @type {String[]} */
    this.ORDER = [
      `left`, `top`,
      `right`, `top`,
      `left`, `bottom`,
      `right`, `bottom`
    ];

    renderer.state.bindArrayBuffer(this.mGlBuffer);
  }

  prepare(objectsAmount) {
    this.renderer.state.bindArrayBuffer(this.mGlBuffer);
    
    const len = objectsAmount * 60;
    const buffer = len === this.mFloatView.length ? this.mFloatView : this.mFloatView.slice(0, len);
    
    this.gl.bufferData(this.gl.ARRAY_BUFFER, buffer, this.gl.STATIC_DRAW);
    this.mBatchFloatsOffset = 0;
  }

  push(bounds, m, alpha, texCoords, texSlot, tint) {
    const floatView = this.mFloatView;
    const ORDER = this.ORDER;
    let floatOffset = this.mBatchFloatsOffset;
    
    for (let i = 0; i < 8; i += 2) {
      floatView[floatOffset++] = bounds[ORDER[i]];
      floatView[floatOffset++] = bounds[ORDER[i + 1]];
      floatView[floatOffset++] = m[0];
      floatView[floatOffset++] = m[1];
      floatView[floatOffset++] = m[2];
      floatView[floatOffset++] = m[3];
      floatView[floatOffset++] = m[4];
      floatView[floatOffset++] = m[5];
      floatView[floatOffset++] = alpha;
      floatView[floatOffset++] = texCoords[ORDER[i]];
      floatView[floatOffset++] = texCoords[ORDER[i + 1]];
      floatView[floatOffset++] = texSlot;
      floatView[floatOffset++] = tint.r;  // todo tint to UNSIGNED_BYTE
      floatView[floatOffset++] = tint.g;
      floatView[floatOffset++] = tint.b;
    }
    
    this.mBatchFloatsOffset = floatOffset;
  }
}
