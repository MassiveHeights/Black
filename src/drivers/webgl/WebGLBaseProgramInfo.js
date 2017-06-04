const typeMap = {
  [WebGLConstants.FLOAT]     : `uniform1f`,
  [WebGLConstants.FLOAT_VEC2]: `uniform2fv`,
  [WebGLConstants.FLOAT_VEC3]: `uniform3fv`,
  [WebGLConstants.FLOAT_VEC4]: `uniform4fv`,
  [WebGLConstants.INT]       : `uniform1i`,
  [WebGLConstants.INT_VEC2]  : `uniform2iv`,
  [WebGLConstants.INT_VEC3]  : `uniform3iv`,
  [WebGLConstants.INT_VEC4]  : `uniform4iv`,
  [WebGLConstants.FLOAT_MAT2]: `uniformMatrix2fv`,
  [WebGLConstants.FLOAT_MAT3]: `uniformMatrix3fv`,
  [WebGLConstants.FLOAT_MAT4]: `uniformMatrix4fv`,
  [WebGLConstants.SAMPLER_2D]: `uniform1i`
};

/* @echo EXPORT */
class WebGLBaseProgramInfo {
  constructor(renderer, vertexShaderSource, fragmentShaderSource) {
    this.mRenderer = renderer;

    const gl = this.gl = renderer.gl;
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    const program = this.program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    const uniforms = this.uniforms = {};
    const uniformsAmount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < uniformsAmount; i++) {
      const uniformInfo = gl.getActiveUniform(program, i);
      let name = uniformInfo.name;
      const isArray = name.slice(-3) === `[0]`;
      name = isArray ? name.slice(0, -3) : name;

      const location = gl.getUniformLocation(program, uniformInfo.name);
      const sSetter = typeMap[uniformInfo.type] + (isArray ? `v` : ``);
      const setter = gl[sSetter].length === 2 ?
        v => gl[sSetter](location, v) : v => gl[sSetter](location, false, v);

      // setter.location = location;
      Object.defineProperty(uniforms, name, {set: setter});
    }

    this.mGLArrayBuffer = gl.createBuffer();
    this.mGLElementArrayBuffer = gl.createBuffer();

    // Elements Buffer
    const MAX_INDEX = 65535;
    const QUAD_INDICES = [0, 1, 2, 3, 3, 4];
    renderer.state.bindElementBuffer(this.mGLElementArrayBuffer);
    const len = MAX_INDEX / 4 | 0;
    const indices = new Uint16Array(len);

    for (let i = 0; i < len; i++) {
      indices[i] = QUAD_INDICES[i % 6] + (i / 6 | 0) * 4;
    }
    
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STREAM_DRAW);
  }

  init(clientWidth, clientHeight) {

  }

  setAttributesInfo(attributesInfo) {
    this.mRenderer.state.bindArrayBuffer(this.mGLArrayBuffer);
    this.attributes = new WebGLVAO(this, attributesInfo);
  }

  onResize(msg, rect) {

  }

  save(gameObject) {

  }

  setTransform(m) {

  }

  set globalAlpha(value) {

  }

  set tint(value) {

  }

  drawImage(texture, bounds) {

  }

  drawText(text, style, bounds, textWidth, textHeight) {

  }

  activate() {
    this.gl.useProgram(this.program);
  }

  flush() {
    this.mRenderer.state.endBatch();
  }
}
