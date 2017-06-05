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

    this.gl = null;
    
    this.__createCanvas();
    
    this.mPrograms = {};
    this.mActiveProgram = null;
    this.state = new WebGLState(this);
  }

  /**
   * __createCanvas
   *
   * @return {void}
   */
  __createCanvas() {
    let cvs = /** @type {HTMLCanvasElement} */ (document.createElement(`canvas`));
    cvs.id = `canvas`;
    this.mContainerElement.appendChild(cvs);

    const config = {
      antialias         : true, // default true
      alpha             : false,
      premultipliedAlpha: false
    };

    const gl = this.gl = cvs.getContext(`webgl`, config) || cvs.getContext(`webgl-experimental`, config);
    gl.canvas.width = this.mClientWidth;
    gl.canvas.height = this.mClientHeight;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 0, 0, 1);
  }

  __onResize(msg, rect) {
    super.__onResize(msg, rect);

    const gl = this.gl;
    gl.canvas.width = this.mClientWidth;
    gl.canvas.height = this.mClientHeight;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    Object.values(this.mPrograms).forEach(program => program.onResize(msg, rect));
  }

  save(gameObject) {
    let Program = gameObject.material && gameObject.material.Program || WebGLSpritesProgramInfo;
    let program = this.mPrograms[Program.name];
    
    if (!program) {
      program = this.mPrograms[Program.name] = new Program(this);
      this.__flush();
      program.activate();
      program.init(this.mClientWidth, this.mClientHeight);
      this.mActiveProgram = program;
    } else if (program !== this.mActiveProgram) {
      this.__flush();
      program.activate();
      this.mActiveProgram = program;
    }
    
    program.save(gameObject);
  }
  
  setTransform(m) {
    this.mActiveProgram.setTransform(m);
  }

  set globalAlpha(value) {
    this.mActiveProgram.globalAlpha = value;
  }
  
  set globalBlendMode(blendMode) {
    const same = this.state.checkBlendMode(blendMode);
  
    if (!same) {
      this.__flush();
      this.state.setBlendMode(blendMode);
    }
  }

  set tint(value) {
    this.mActiveProgram.tint = value;
  }
  
  drawImage(texture, bounds) {
    this.mActiveProgram.drawImage(texture, bounds);
  }

  drawText(text, style, bounds, textWidth, textHeight) {
    this.mActiveProgram.drawText(text, style, bounds, textWidth, textHeight);
  }

  beginFrame() {
    super.beginFrame();
    // this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  endFrame() {
    super.endFrame();
    this.__flush();
  }
  
  __flush() {
    this.mActiveProgram && this.mActiveProgram.flush();
  }
}
