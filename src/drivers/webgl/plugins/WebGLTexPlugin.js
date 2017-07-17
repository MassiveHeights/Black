const vertexShaderSource = `
  precision highp float;
  
  attribute vec2 aPosition; // 2 * float = 8
  attribute vec2 aTexCoord; // 2 * unsigned short = 4
  attribute vec4 aColor;    // 4 * UNSIGNED BYTE = 4
  attribute float aTexSlot; // 1 * float = 4
  
  varying vec2 vTexCoord;
  varying float vTexSlot;
  varying vec4 vColor;

  uniform vec2 uProjection;

  void main() {
    gl_Position = vec4(aPosition.x * uProjection.x - 1.0, -aPosition.y * uProjection.y + 1.0, 0.0, 1.0);
    
    vTexCoord = aTexCoord;
    vTexSlot = aTexSlot;
    vColor = aColor;
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

let LAST_SLOT = 0;

/* @echo EXPORT */
class WebGLTexPlugin extends WebGLBasePlugin {
  constructor(renderer) {
    const gl = renderer.gl;
    const UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);

    super(renderer, vertexShaderSource, fragmentShaderSource.replace(/MAX_TEXTURE_IMAGE_UNITS/g, UNITS));

    this.MAX_TEXTURE_IMAGE_UNITS = UNITS;
    this.batchSize = 2048;
    this.objects = [];
    this.batches = [];
    this.buffers = [];

    for (let i = 0, l = this.batchSize; i < l; i++) {
      this.batches.push({textures: [], texturesLength: 0, slots: {}, start: 0, size: 0, blend: null});
    }

    for (let i = 1, l = this.nextPow2(this.batchSize); i <= l; i *= 2) {
      const buffer = {data: new ArrayBuffer(i * 4 * 20)};
      buffer.float32View = new Float32Array(buffer.data);
      buffer.uint32View = new Uint32Array(buffer.data);
      this.buffers[i] = buffer;
    }


    // Element Buffer
    const len = this.batchSize * 6;
    const indices = new Uint16Array(len);

    for (let i = 0, j = 0; i < len; i += 6, j += 4) {
      indices[i] = j;
      indices[i + 1] = j + 1;
      indices[i + 2] = j + 2;
      indices[i + 3] = j + 3;
      indices[i + 4] = j + 3;
      indices[i + 5] = j + 4;
    }

    this.mElementBuffer = gl.createBuffer();
    renderer.bindElementBuffer(this.mElementBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STREAM_DRAW);


    // Array Buffer
    this.mArrayBuffer = gl.createBuffer();
    const location = {
      aPosition: gl.getAttribLocation(this.program, `aPosition`),
      aTexCoord: gl.getAttribLocation(this.program, `aTexCoord`),
      aColor   : gl.getAttribLocation(this.program, `aColor`),
      aTexSlot : gl.getAttribLocation(this.program, `aTexSlot`)
    };
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mArrayBuffer);
    gl.vertexAttribPointer(location.aPosition, 2, gl.FLOAT, false, 20, 0);
    gl.vertexAttribPointer(location.aTexCoord, 2, gl.UNSIGNED_SHORT, true, 20, 8);
    gl.vertexAttribPointer(location.aColor, 4, gl.UNSIGNED_BYTE, true, 20, 12);
    gl.vertexAttribPointer(location.aTexSlot, 1, gl.FLOAT, false, 20, 16);
    gl.enableVertexAttribArray(location.aPosition);
    gl.enableVertexAttribArray(location.aTexCoord);
    gl.enableVertexAttribArray(location.aColor);
    gl.enableVertexAttribArray(location.aTexSlot);


    gl.uniform2f(this.uniforms.uProjection, 2 / renderer.mClientWidth, 2 / renderer.mClientHeight);
    gl.uniform1iv(this.uniforms.uSamplers, new Int32Array(new Array(this.MAX_TEXTURE_IMAGE_UNITS).fill(0).map((v, i) => i)));

    this.stop = this.flush;
  }

  onResize(msg, rect) {
    this.gl.uniform2f(this.uniforms.uProjection, 2 / rect.width, 2 / rect.height);
  }

  drawImage(object) {
    if (object.worldAlpha === 0) return;

    this.objects.push(object);

    if (this.objects.length === this.batchSize) {
      this.flush();
    }
  }
  
  drawText(textField, style, bounds) {
    if (!textField.mNeedInvalidate) {
      return this.drawImage(textField);
    }

    let lines = textField.lines;
    let widths = textField.lineWidths;
    let lineOffset = textField.lineHeight * style.size;
    let strokeThickness = style.strokeThickness;
    let align = style.align;
    let maxWidth = bounds.width;
    let ctx = textField.context;

    if (ctx.mLetterSpacing !== textField.letterSpacing) {
      ctx.mLetterSpacing = textField.letterSpacing;

      let canvas = ctx.canvas;
      canvas.style.letterSpacing = `${textField.letterSpacing}px`;
      // ctx = this.mCtx = canvas.getContext(`2d`);
    }

    ctx.font = `${style.style} ${style.weight} ${style.size}px "${style.name}"`;
    ctx.fillStyle = this.mRenderer.hexColorToString(style.color);
    ctx.textBaseline = `bottom`;

    if (strokeThickness !== 0) {
      ctx.lineJoin = `round`;
      ctx.miterLimit = 2;
      ctx.lineWidth = strokeThickness;
      ctx.strokeStyle = this.mRenderer.hexColorToString(style.strokeColor);
    }

    // ctx.fillRect(0, 0, maxWidth, bounds.height);

    for (let i = 0, l = lines.length; i < l; i++) {
      let width = widths[i];
      let y = bounds.height - strokeThickness / 2 - lineOffset * (l - i - 1);
      let x = strokeThickness / 2;

      if (align === `center`) {
        x += maxWidth / 2 - width / 2;
      } else if (align === `right`) {
        x += maxWidth - width;
      }

      strokeThickness !== 0 && ctx.strokeText(lines[i], x, y);
      ctx.fillText(lines[i], x, y);
    }

    this.drawImage(textField);
  }

  flush() {
    const objects = this.objects;
    const length = objects.length;

    if (length === 0) return;

    const gl = this.gl;
    const renderer = this.mRenderer;
    const rendererBoundTextures = renderer.boundTextures;
    const vBoundTextures = rendererBoundTextures.slice();
    const batches = this.batches;
    const MAX_TEXTURE_IMAGE_UNITS = this.MAX_TEXTURE_IMAGE_UNITS;
    const buffer = this.buffers[this.nextPow2(length)];
    const uint32View = buffer.uint32View;
    const float32View = buffer.float32View;

    let index = 0;
    let currentBatchIndex = 0;
    let currentBatch = batches[0];
    let currentBlend = currentBatch.blend = objects[0].blendMode;
    let currentBatchSlots = currentBatch.slots;
    currentBatch.texturesLength = 0;
    let i;

    for (i = 0; i < length; i++) {
      const object = objects[i];
      const alpha = object.worldAlpha;
      const tint = object.tint;
      const nextBlend = object.blendMode;
      const texture = object.mTexture;
      /* object.lateDirty && */object.refreshVertexData();  // todo late dirt

      if (currentBlend !== nextBlend) {
        currentBlend = nextBlend;

        currentBatchSlots = 0;
        currentBatch.texturesLength = MAX_TEXTURE_IMAGE_UNITS;
      }

      if (currentBatchSlots[texture.id] === undefined) {
        if (currentBatch.texturesLength === MAX_TEXTURE_IMAGE_UNITS) {
          currentBatch.size = i - currentBatch.start;
          // currentBatch.texturesLength = currentBatch.textures.length;

          currentBatch = batches[++currentBatchIndex];
          currentBatch.start = i;
          currentBatch.blend = nextBlend;
          currentBatch.texturesLength = 0;
          currentBatchSlots = currentBatch.slots;
        }

        if (texture._vSlotWebGL === -1) {
          for (let j = 0; j < MAX_TEXTURE_IMAGE_UNITS; j++) {
            const k = (j + LAST_SLOT) % MAX_TEXTURE_IMAGE_UNITS;
            const tex = vBoundTextures[k];

            if (currentBatchSlots[tex.mId] === undefined) {
              tex._vSlotWebGL = -1;
              texture._vSlotWebGL = k;
              vBoundTextures[k] = texture;
              LAST_SLOT++;

              break;
            }
          }
        }

        currentBatchSlots[texture.mId] = texture._vSlotWebGL;
        currentBatch.textures[currentBatch.texturesLength++] = texture;
      }

      const vertexData = object.vertexData;
      float32View[index] = vertexData[0];
      float32View[index + 1] = vertexData[1];
      float32View[index + 5] = vertexData[2];
      float32View[index + 6] = vertexData[3];
      float32View[index + 10] = vertexData[4];
      float32View[index + 11] = vertexData[5];
      float32View[index + 15] = vertexData[6];
      float32View[index + 16] = vertexData[7];

      const texCoord = texture.coord;
      uint32View[index + 2] = texCoord[0];
      uint32View[index + 7] = texCoord[1];
      uint32View[index + 12] = texCoord[2];
      uint32View[index + 17] = texCoord[3];

      uint32View[index + 3] = uint32View[index + 8] = uint32View[index + 13] = uint32View[index + 18] = alpha === 1 ?
      (alpha * 255 << 24) + tint :
      (alpha * 255 << 24) + ((((tint >> 16) & 0xff) * alpha + 0.5 | 0) << 16) +
      ((((tint >> 8) & 0xff) * alpha + 0.5 | 0) << 8) + ((tint & 0xff) * alpha + 0.5 | 0);

      float32View[index + 4] = float32View[index + 9] = 
        float32View[index + 14] = float32View[index + 19] = texture._vSlotWebGL + 0.5;

      index += 20;
    }

    currentBatch.size = i - currentBatch.start;
    gl.bufferData(gl.ARRAY_BUFFER, buffer.data, gl.STREAM_DRAW);

    for (let i = 0, len = currentBatchIndex + 1; i < len; i++) {
      const batch = batches[i];
      const textures = batch.textures;
      const slots = batch.slots;

      for (let j = 0, l = batch.textures.length; j < l; j++) {
        const texture = textures[j];
        const slot = slots[texture.id];
        slots[texture.id] = undefined;

        if (rendererBoundTextures[slot] !== texture) {
          renderer.bindTexture(texture, slot);
        }
      }

      if (renderer.blend !== batch.blend) {
        renderer.setBlend(batch.blend);
      }

      gl.drawElements(gl.TRIANGLE_STRIP, batch.size * 6 - 2, gl.UNSIGNED_SHORT, batch.start * 12);
    }

    objects.length = 0;
  }

  start() {
    this.gl.useProgram(this.program);
  }

  nextPow2(v) {
    v += v === 0;
    --v;
    v |= v >>> 1;
    v |= v >>> 2;
    v |= v >>> 4;
    v |= v >>> 8;
    v |= v >>> 16;

    return v + 1;
  }
}
