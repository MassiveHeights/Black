/**
 * An video driver that draw everything into DOM Canvas element.
 *
 * @cat drivers
 * @extends VideoNullDriver
 */
/* @echo EXPORT */
class WebGLDriver extends VideoNullDriver {
  /**
   * @param  {HTMLElement} containerElement description
   * @param  {number} width            description
   * @param  {number} height           description
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    console.log(`WebGL`);

    const fn = () => {
    };
    this.mEmptyPlugin = {
      stop: fn, start: fn, drawImage: fn, drawText: fn, onResize: fn, setTransform: fn,
      set blendMode(v) {
      },
      set globalAlpha(v) {
      }
    };
    this.mActivePlugin = this.mEmptyPlugin;
    this.mActiveArrayBuffer = null;
    this.mActiveElementBuffer = null;
    this.blend = null;
    this.boundTextures = [];

    this.__createCanvas();

    const gl = this.gl;
    gl.enable(gl.BLEND);

    this.MAX_TEXTURE_IMAGE_UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    this.glTextures = new WebGLTextures(this);
    this.blender = new WebGLBlendMode(gl);

    this.mPlugins = {
      [WebGLTexPlugin.name]      : new WebGLTexPlugin(this),
      [WebGLParticlesPlugin.name]: new WebGLParticlesPlugin(this)
    };
  }

  /**
   * __createCanvas
   *
   * @return {void}
   */
  __createCanvas() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.createElement(`canvas`));
    canvas.id = `canvas`;
    this.mContainerElement.appendChild(canvas);

    const config = {
      antialias         : true, // default true
      alpha             : false,
      premultipliedAlpha: false
    };

    this.gl = canvas.getContext(`webgl`, config) || canvas.getContext(`webgl-experimental`, config);
    this.__onResize(`init`, new Rectangle(0, 0, this.mClientWidth, this.mClientHeight))
  }

  __onResize(msg, rect) {
    super.__onResize(msg, rect);

    const gl = this.gl;
    const canvas = gl.canvas;

    const desiredWidthInCSSPixels = rect.width;
    const desiredHeightInCSSPixels = rect.height;

    // set the display size of the canvas.
    canvas.style.width = desiredWidthInCSSPixels + `px`;
    canvas.style.height = desiredHeightInCSSPixels + `px`;

    // set the size of the drawingBuffer
    var devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = desiredWidthInCSSPixels * devicePixelRatio;
    canvas.height = desiredHeightInCSSPixels * devicePixelRatio;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    this.mActivePlugin.onResize(msg, rect);
  }

  drawImage(object, texture) {
    let plugin = this.mPlugins[object.pluginName];

    if (plugin !== this.mActivePlugin) {
      this.mActivePlugin.stop();
      this.mActivePlugin = plugin;
      plugin.start();
    }

    plugin.globalAlpha = this.mGlobalAlpha;
    plugin.globalBlendMode = this.mGlobalBlendMode;
    plugin.setTransform(this.mTransform);
    plugin.drawImage(object, texture);
  }

  drawText(textField, style, bounds) {
    let plugin = this.mPlugins[textField.pluginName];

    if (plugin !== this.mActivePlugin) {
      this.mActivePlugin.stop();
      this.mActivePlugin = plugin;
      plugin.start();
    }

    plugin.globalAlpha = this.mGlobalAlpha;
    plugin.globalBlendMode = this.mGlobalBlendMode;
    plugin.setTransform(this.mTransform);
    plugin.drawText(textField, style, bounds);
  }

  bindTexture(texture, slot) {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0 + slot);
    // gl.bindTexture(gl.TEXTURE_2D, this.glTextures[slot]);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, Number(texture.premultiplyAlpha));
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.native);

    // only sprite plugin usable
    // _vSlotWebGL can be -1 even texture is bound
    const boundTextures = this.boundTextures;
    boundTextures[slot]._vSlotWebGL = -1;
    boundTextures[slot] = texture;
    texture._vSlotWebGL = slot;
  }

  bindArrayBuffer(buffer) {
    if (buffer === this.mActiveArrayBuffer) return;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.mActiveArrayBuffer = buffer;
  }

  bindElementBuffer(buffer) {
    if (buffer === this.mActiveElementBuffer) return;

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
    this.mActiveElementBuffer = buffer;
  }

  setBlend(blend) {
    const blendFunc = this.blender[blend];
    if (!blendFunc) debugger
    this.gl.blendFunc(blendFunc.src, blendFunc.dst);
    this.blend = blend;
  }

  endFrame() {
    this.mActivePlugin.stop();
  }

  measureText(textField, style, bounds) {
    let lines = textField.lines;
    let widths = textField.lineWidths;
    let lineHeight = textField.lineHeight;
    let text = textField.text;
    let multiLine = textField.multiLine;
    let strokeThickness = style.strokeThickness;
    let ctx = textField.context;
    let canvas;

    if (!ctx) {
      canvas = document.createElement(`canvas`);
      ctx = textField.context = canvas.getContext(`2d`);
      ctx.mLetterSpacing = 0;
    } else {
      canvas = ctx.canvas;
    }

    if (ctx.mLetterSpacing !== textField.letterSpacing) {
      ctx.mLetterSpacing = textField.letterSpacing;

      let canvas = ctx.canvas;
      document.getElementsByTagName(`body`)[0].appendChild(canvas);
      canvas.style.letterSpacing = `${textField.letterSpacing}px`;
      canvas.style.visibility = `hidden`; // todo
      // canvas.style.display = `none`;  this doesn't work
      // ctx = textField.context = canvas.getContext(`2d`);
    }

    ctx.font = `${style.style} ${style.weight} ${style.size}px "${style.name}"`;
    ctx.textBaseline = `bottom`;

    lines.length = 0;
    widths.length = 0;
    multiLine ? lines.push(...text.split(`\n`)) : lines.push(text);

    for (let i = 0, l = lines.length; i < l; i++) {
      widths[i] = ctx.measureText(lines[i]).width + strokeThickness;
    }

    if (!textField.autoSize) {
      bounds.set(0, 0, textField.fieldWidth, textField.fieldHeight);
    } else {
      bounds.set(0, 0, Math.max(...widths), lines.length * lineHeight * (style.size + strokeThickness));
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.naturalWidth = bounds.width;
    canvas.height = canvas.naturalHeight = bounds.height;
    textField.mTexture = new Texture(canvas); // todo cache
    textField.mTexture.premultiplyAlpha = true;
    
    return bounds;
  }
}
