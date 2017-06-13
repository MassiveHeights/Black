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

const QUAD = [`left`, `top`, `right`, `top`, `left`, `bottom`, `right`, `bottom`];
const MAX_BATCH = 65532 / 4 - 1;

/* @echo EXPORT */
class WebGLTexProgramInfo extends WebGLBaseProgramInfo {
  constructor(renderer) {
    const gl = renderer.gl;
    const UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    
    const attributesInfo = {
      // aVertexPos  : {Type: Float32Array, normalize: false}, // default
      // aModelMatrix: {Type: Float32Array, normalize: false},
      // aModelPos   : {Type: Float32Array, normalize: false},
      // aAlpha      : {Type: Float32Array, normalize: false},
      // aTexCoord   : {Type: Float32Array, normalize: false},
      // aTexSlot    : {Type: Float32Array, normalize: false},
      aTint: {Type: Uint8Array, normalize: true, type: gl.UNSIGNED_BYTE}
    };

    super(renderer, vertexShaderSource, fragmentShaderSource.replace(/MAX_TEXTURE_IMAGE_UNITS/g, UNITS), attributesInfo);

    this.MAX_TEXTURE_IMAGE_UNITS = UNITS;
    this.mBatchObjects = 0;
    
    
    // Elements Buffer
    this.mGLElementArrayBuffer = gl.createBuffer();
    renderer.state.bindElementBuffer(this.mGLElementArrayBuffer);
    
    const MAX_INDEX = 65535;
    const QUAD_INDICES = [0, 1, 2, 3, 3, 4];
    const len = MAX_INDEX * 6 | 0;
    const indices = new Uint16Array(len);

    for (let i = 0; i < len; i++) {
      indices[i] = QUAD_INDICES[i % 6] + (i / 6 | 0) * 4;
    }

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STREAM_DRAW);


    // text
    this.mCanvas = document.createElement(`canvas`);
    this.mCtx2D = this.mCanvas.getContext(`2d`);
    this.mTextTextures = {};
  }

  init(clientWidth, clientHeight) {
    this.uniforms.uProjection = new Float32Array([2 / clientWidth, 2 / clientHeight]);
    this.uniforms.uSamplers = new Int32Array(new Array(this.MAX_TEXTURE_IMAGE_UNITS).fill(0).map((v, i) => i));
  }

  onResize(msg, rect) {
    this.uniforms.uProjection = new Float32Array([2 / rect.width, 2 / rect.height]);
  }

  save(gameObject) {

  }

  setTransform(m) {
    this.mTransform = m;
  }

  set globalAlpha(value) {
    this.mGlobalAlpha = value;
  }

  set tint(value) {
    this.mTint = value;
  }

  drawImage(texture, bounds) {
    const modelMatrix = this.mTransform.value;
    const attributes = this.attributes;
    const region = texture.relativeRegion;
    const alpha = this.mGlobalAlpha;
    const tint = this.mTint || 0xffffff;
    const r = (tint >> 16) & 255;
    const g = (tint >> 8) & 255;
    const b = tint & 255;
    let texSlot = this.mRenderer.state.bindTexture(texture);

    this.mBatchObjects++;
    
    if (this.mBatchObjects > MAX_BATCH) {
      this.flush();
    }

    if (texSlot === -1) {
      this.flush();
      texSlot = this.mRenderer.state.bindTexture(texture);
    }

    for (let i = 0; i < 8; i += 2) {
      attributes.aModelMatrix[0] = modelMatrix[0];
      attributes.aModelMatrix[1] = modelMatrix[1];
      attributes.aModelMatrix[2] = modelMatrix[2];
      attributes.aModelMatrix[3] = modelMatrix[3];
      attributes.aModelPos[0] = modelMatrix[4];
      attributes.aModelPos[1] = modelMatrix[5];

      attributes.aVertexPos[0] = bounds[QUAD[i]];
      attributes.aVertexPos[1] = bounds[QUAD[i + 1]];

      attributes.aTexCoord[0] = region[QUAD[i]];
      attributes.aTexCoord[1] = region[QUAD[i + 1]];

      attributes.aAlpha = alpha;
      attributes.aTexSlot = texSlot;
      attributes.aTint[0] = r;
      attributes.aTint[1] = g;
      attributes.aTint[2] = b;

      attributes.nextVertex();
    }
  }

  drawText(text, style, bounds, textWidth, textHeight) {
    const font = `${style.style} ${style.weight} ${style.size}px "${style.name}"`;
    const key = `${text}${font}${style.align}${style.color}${style.strokeThickness}${style.strokeColor}`;
    let texture = this.mTextTextures[key];

    if (!texture) {
      const canvas = this.mCanvas;
      const ctx = this.mCtx2D;

      canvas.width = textWidth;
      canvas.height = textHeight;

      ctx.font = font;
      ctx.fillStyle = this.mRenderer.hexColorToString(style.color);

      ctx.textAlign = style.align;
      ctx.textBaseline = `top`;

      const x = style.align === `center` ? textWidth / 2 : style.align === `left` ? 0 : textWidth;
      const lines = text.split(`\n`);
      const lineHeight = textHeight / lines.length;

      for (let i = 0, l = lines.length; i < l; i++) {
        const y = lineHeight * i;
        ctx.fillText(lines[i], x, y);

        if (style.strokeThickness > 0) {
          ctx.lineWidth = style.strokeThickness;
          ctx.strokeStyle = this.mRenderer.hexColorToString(style.strokeColor);
          ctx.strokeText(text, x, y);
        }
      }

      texture = this.mTextTextures[key] = new Texture(canvas, Rectangle.__cache.set(0, 0, canvas.width, canvas.height));
    }

    this.mTint = 0xffffff;
    this.drawImage(texture, bounds);
  }

  flush() {
    super.flush();

    const gl = this.gl;

    this.mRenderer.state.bindArrayBuffer(this.mGLArrayBuffer);
    this.mRenderer.state.bindElementBuffer(this.mGLElementArrayBuffer);

    let count = this.attributes.countForElementsDraw;

    if (count <= 0) return;
    gl.bufferData(gl.ARRAY_BUFFER, this.attributes.data, gl.STREAM_DRAW);
    gl.drawElements(gl.TRIANGLE_STRIP, count, gl.UNSIGNED_SHORT, 0);

    this.attributes.clear();
    this.mBatchObjects = 0;
  }
}
