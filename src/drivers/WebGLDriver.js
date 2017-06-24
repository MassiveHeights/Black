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

    const fn = () => {};
    this.mEmptyPlugin = {stop: fn, start: fn, drawImage: fn, drawText: fn, onResize: fn};
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
      [WebGLTexPlugin.name]: new WebGLTexPlugin(this)
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
      // premultipliedAlpha: false
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

  drawImage(object) {
    const plugin = this.mPlugins[object.PluginName];

    if (plugin !== this.mActivePlugin) {
      this.mActivePlugin.stop();
      this.mActivePlugin = plugin;
      plugin.start();
    }

    plugin.drawImage(object);
  }
  
  bindTexture(texture, slot) {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0 + slot);
    // gl.bindTexture(gl.TEXTURE_2D, this.glTextures[slot]);
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
    this.gl.blendFunc(blendFunc.src, blendFunc.dst);
    this.blend = blend;
  }

  // setMaterial(material) {
  //   let program = this.mPrograms[material.Program.name];
  //
  //   if (!program) {
  //     program = this.mPrograms[material.Program.name] = new material.Program(this);
  //     this.__flush();
  //     program.activate();
  //     program.init(this.mClientWidth, this.mClientHeight);
  //     this.mActiveProgram = program;
  //   } else if (program !== this.mActiveProgram) {
  //     this.__flush();
  //     program.activate();
  //     this.mActiveProgram = program;
  //   }
  //
  //   program.setMaterial(material);
  // }
  //
  // setTransform(m) {
  //   this.mActiveProgram.setTransform(m);
  // }
  //
  // set globalAlpha(value) {
  //   this.mActiveProgram.globalAlpha = value;
  // }
  //
  // set globalBlendMode(blendMode) {
  //   const same = this.state.checkBlendMode(blendMode);
  //
  //   if (!same) {
  //     this.__flush();
  //     this.state.setBlendMode(blendMode);
  //   }
  // }
  //
  // drawImage(texture, bounds) {
  //   this.mActiveProgram.drawImage(texture, bounds);
  // }
  //
  // drawText(text, style, bounds, textWidth, textHeight) {
  //   this.mActiveProgram.drawText(text, style, bounds, textWidth, textHeight);
  // }

  endFrame() {
    this.mActivePlugin.stop();
  }
}
