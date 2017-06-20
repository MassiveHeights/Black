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

/* @echo EXPORT */
class WebGLTexProgramInfo extends WebGLBaseProgramInfo {
  constructor(renderer) {
    const gl = renderer.gl;
    const UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);

    const attributesInfo = {
      aTint: {Type: Uint8Array, normalize: true, type: gl.UNSIGNED_BYTE}
    };

    super(renderer, vertexShaderSource, fragmentShaderSource.replace(/MAX_TEXTURE_IMAGE_UNITS/g, UNITS), attributesInfo);

    this.MAX_TEXTURE_IMAGE_UNITS = UNITS;
    this.mBatchObjects = 0;


    // Elements Buffer
    this.mGLElementArrayBuffer = gl.createBuffer();
    renderer.state.bindElementBuffer(this.mGLElementArrayBuffer);
    
    this.maxBatchSize = 2000;

    const QUAD_INDICES = [0, 1, 2, 3, 3, 4];
    const len = this.maxBatchSize * 6;
    const indices = new Uint16Array(len);

    for (let i = 0; i < len; i++) {
      indices[i] = QUAD_INDICES[i % 6] + (i / 6 | 0) * 4;
    }

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STREAM_DRAW);
  }

  init(clientWidth, clientHeight) {
    this.uniforms.uProjection = new Float32Array([2 / clientWidth, 2 / clientHeight]);
    this.uniforms.uSamplers = new Int32Array(new Array(this.MAX_TEXTURE_IMAGE_UNITS).fill(0).map((v, i) => i));
  }

  onResize(msg, rect) {
    this.uniforms.uProjection = new Float32Array([2 / rect.width, 2 / rect.height]);
  }

  setMaterial(material) {
    this.mMaterial = material;
  }

  setTransform(m) {
    this.mTransform = m;
  }

  set globalAlpha(value) {
    this.mGlobalAlpha = value;
  }

  drawImage(texture, pivotX, pivotY) {
    const modelMatrix = this.mTransform.value;
    const attributes = this.attributes;
    const region = texture.relativeRegion;
    const alpha = this.mGlobalAlpha;
    const tint = this.mMaterial.tint;
    const r = (tint >> 16) & 255;
    const g = (tint >> 8) & 255;
    const b = tint & 255;
    let texSlot = this.mRenderer.state.bindTexture(texture);

    if (++this.mBatchObjects > this.maxBatchSize) {
      this.flush();
      this.mBatchObjects = 1;
    }

    if (texSlot === -1) {
      this.flush();
      this.mBatchObjects = 1;
      texSlot = this.mRenderer.state.bindTexture(texture);
    }
    
    const uintView = attributes.viewsHash.Uint8Array;
    const floatView =  attributes.viewsHash.Float32Array;

    const bounds = Rectangle.__cache;
    bounds.set(0, 0, texture.width, texture.height);

    for (let i = 0; i < 4; i++) {
      let batchOffset = floatView.batchOffset;

      floatView[batchOffset + 0] = bounds[QUAD[i * 2]];
      floatView[batchOffset + 1] = bounds[QUAD[i * 2 + 1]];

      floatView[batchOffset + 2] = modelMatrix[0];
      floatView[batchOffset + 3] = modelMatrix[1];
      floatView[batchOffset + 4] = modelMatrix[2];
      floatView[batchOffset + 5] = modelMatrix[3];

      floatView[batchOffset + 6] = modelMatrix[4];
      floatView[batchOffset + 7] = modelMatrix[5];

      floatView[batchOffset + 8] = alpha;

      floatView[batchOffset + 9] = region[QUAD[i * 2]];
      floatView[batchOffset + 10] = region[QUAD[i * 2 + 1]];

      floatView[batchOffset + 11] = texSlot;

      let offset = (batchOffset + 12) * 4;
      uintView[offset] = r;
      uintView[offset + 1] = g;
      uintView[offset + 2] = b;

      attributes.nextVertex();
    }
  }

  drawText(text, style, bounds, textWidth, textHeight) {
    const font = `${style.style} ${style.weight} ${style.size}px "${style.name}"`;
    const key = `${text}${font}${style.align}${style.color}${style.strokeThickness}${style.strokeColor}`;
    const material = this.mMaterial;
    let tex = material.tex;

    if (key !== material.key) {
      let ctx = material.ctx;
      let canvas;

      if (!ctx) {
        canvas = document.createElement(`canvas`);
        ctx = canvas.getContext(`2d`);
      } else {
        canvas = ctx.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

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

      tex = new Texture(canvas, Rectangle.__cache.set(0, 0, canvas.width, canvas.height));
    }

    this.drawImage(tex, bounds.x, bounds.y);  // todo there is no pivots there
  }

  flush() {
    super.flush();

    const gl = this.gl;

    this.mRenderer.state.bindArrayBuffer(this.mGLArrayBuffer);
    this.mRenderer.state.bindElementBuffer(this.mGLElementArrayBuffer);

    let count = this.attributes.countForElementsDraw;

    if (count > 0) {
      gl.bufferData(gl.ARRAY_BUFFER, this.attributes.data, gl.STREAM_DRAW);
      gl.drawElements(gl.TRIANGLE_STRIP, count, gl.UNSIGNED_SHORT, 0);

      this.attributes.clear();
      this.mBatchObjects = 0;
      this.mRenderer.state.endBatch();
    }
  }
}
