const vertexShaderSource = `
  attribute vec2 aVertexPos;
  attribute vec4 aModelMatrix;
  attribute vec2 aModelPos;
  attribute float aAlpha;
  attribute vec2 aTexCoord;
  attribute float aTexSlot;
  attribute vec3 aTint;
  
  varying vec2 vTexCoord;
  varying float vTexSlot;
  varying vec4 vColor;

  uniform vec2 uProjection;

  void main() {
    vec2 pos = mat2(aModelMatrix) * aVertexPos + aModelPos;
    gl_Position = vec4(pos.x * uProjection.x - 1.0, -pos.y * uProjection.y + 1.0, 0.0, 1.0);
    
    vTexCoord = aTexCoord;
    vTexSlot = aTexSlot + 0.5;
    vColor = vec4(aTint * aAlpha, aAlpha);
  }
`;

const fragmentShaderSource = `
  precision lowp float;
  
  varying vec2 vTexCoord;
  varying float vTexSlot;
  varying vec4 vColor;
  
  uniform sampler2D uSamplers[MAX_TEXTURE_IMAGE_UNITS];
  
  void main() {
    int texSlot = int(vTexSlot);
    
    for (int i = 0; i < MAX_TEXTURE_IMAGE_UNITS; i++) {
      if (i == texSlot) {
        gl_FragColor = texture2D(uSamplers[i], vTexCoord) * vColor;
        return;
      }
    }
  }
`;

/**
 * A WebGLProgram manage data for render simple sprites batch. Contains WebGl program cra.
 *
 */

/* @echo EXPORT */
class WebGLProgramEx {
  constructor(renderer) {

    /** @type {WebGLDriver} */
    this.renderer = renderer;

    /** @type {WebGLRenderingContext} */
    this.gl = renderer.gl;

    const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

    this.gl.shaderSource(vertexShader, vertexShaderSource);
    this.gl.shaderSource(fragmentShader, fragmentShaderSource.replace(/MAX_TEXTURE_IMAGE_UNITS/g, renderer.textures.MAX_TEXTURE_IMAGE_UNITS));
    this.gl.compileShader(vertexShader);
    this.gl.compileShader(fragmentShader);

    this.mGlProgram = this.gl.createProgram();
    this.gl.attachShader(this.mGlProgram, vertexShader);
    this.gl.attachShader(this.mGlProgram, fragmentShader);
    this.gl.linkProgram(this.mGlProgram);
    this.gl.deleteShader(vertexShader);
    this.gl.deleteShader(fragmentShader);

    /**
     * Contains attributes location on GPU program.
     *
     * @type {Object} */
    this.mAttributes = {
      aVertexPos  : this.gl.getAttribLocation(this.mGlProgram, `aVertexPos`),
      aModelMatrix: this.gl.getAttribLocation(this.mGlProgram, `aModelMatrix`),
      aModelPos   : this.gl.getAttribLocation(this.mGlProgram, `aModelPos`),
      aAlpha      : this.gl.getAttribLocation(this.mGlProgram, `aAlpha`),
      aTexCoord   : this.gl.getAttribLocation(this.mGlProgram, `aTexCoord`),
      aTexSlot    : this.gl.getAttribLocation(this.mGlProgram, `aTexSlot`),
      aTint       : this.gl.getAttribLocation(this.mGlProgram, `aTint`)
    };

    /**
     * Contains uniforms location on GPU program.
     *
     * @type {Object} */
    this.mUniforms = {
      uProjection: this.gl.getUniformLocation(this.mGlProgram, `uProjection`),
      uSamplers  : this.gl.getUniformLocation(this.mGlProgram, `uSamplers`)
    };

    renderer.state.useProgram(this.mGlProgram);

    this.gl.uniform1iv(this.mUniforms.uSamplers, new Int32Array(renderer.textures.MAX_TEXTURE_IMAGE_UNITS).map((v, i) => i));
    this.resize();

    /** @type {WebGLBuffer} */
    this.mBuffer = new WebGLBufferEx(renderer);
    this.push = this.mBuffer.push.bind(this.mBuffer);

    const stride = Float32Array.BYTES_PER_ELEMENT * 15;
    const float = this.gl.FLOAT;
    const floatSize = Float32Array.BYTES_PER_ELEMENT;
    
    this.enableAttribute(this.mAttributes.aVertexPos, 2, float, false, stride, 0);        // vec 2
    this.enableAttribute(this.mAttributes.aModelMatrix, 4, float, false, stride, 2 * floatSize);  // vec 4
    this.enableAttribute(this.mAttributes.aModelPos, 2, float, false, stride, 6 * floatSize);     // vec 2          
    this.enableAttribute(this.mAttributes.aAlpha, 1, float, false, stride, 8 * floatSize);       // float
    this.enableAttribute(this.mAttributes.aTexCoord, 2, float, false, stride, 9 * floatSize);     // vec 2
    this.enableAttribute(this.mAttributes.aTexSlot, 1, float, false, stride, 11 * floatSize);     // float  // uint
    this.enableAttribute(this.mAttributes.aTint, 3, float, false, stride, 12 * floatSize);        // vec 3  // uint * 3

    /** @type {WebGLElementBuffer} */
    this.mElementBuffer = new WebGLElementBufferEx(renderer);
  }

  enableAttribute(index, size, type, normalize, stride, offset) {
    this.gl.vertexAttribPointer(index, size, type, normalize, stride, offset);
    this.gl.enableVertexAttribArray(index);
  }

  resize() {
    this.gl.uniform2f(this.mUniforms.uProjection, 2 / this.gl.drawingBufferWidth, 2 / this.gl.drawingBufferHeight);
  }

  draw(objectsAmount) {
    if (!objectsAmount) return;

    this.renderer.state.useProgram(this.mGlProgram);

    this.mElementBuffer.prepare(objectsAmount);
    this.mBuffer.prepare(objectsAmount);

    this.gl.drawElements(this.gl.TRIANGLE_STRIP, objectsAmount * 6 - 2, this.gl.UNSIGNED_SHORT, 0);
  }
}
