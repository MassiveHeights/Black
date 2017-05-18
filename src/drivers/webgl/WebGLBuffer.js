/* @echo EXPORT */
class WebGLBuffer {
  constructor(renderer) {
    this.renderer = renderer;
    this.gl = renderer.gl;

    this.mGlBuffer = this.gl.createBuffer();
    this.mFloatView = new Float32Array(65535);
    this.mBatchFloatsOffset = 0;
    
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
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.mFloatView.slice(0, objectsAmount * 60), this.gl.STATIC_DRAW);
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
      floatView[floatOffset++] = tint.r;
      floatView[floatOffset++] = tint.g;
      floatView[floatOffset++] = tint.b;
    }
    
    this.mBatchFloatsOffset = floatOffset;
  }
}
