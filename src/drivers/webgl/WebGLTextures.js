/* @echo EXPORT */
class WebGLTextures {
  constructor(renderer) {
    this.renderer = renderer;
    this.gl = renderer.gl;
    // this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);

    this.MAX_TEXTURE_IMAGE_UNITS = this.gl.getParameter(this.gl.MAX_TEXTURE_IMAGE_UNITS);

    this.mBoundTextures = new Array(this.MAX_TEXTURE_IMAGE_UNITS).fill(null);
    this.mBatchTextures = new Array(this.MAX_TEXTURE_IMAGE_UNITS).fill(null);

    this.mGlTextures = [];

    for (let i = 0; i < this.MAX_TEXTURE_IMAGE_UNITS; i++) {
      const glTexture = this.mGlTextures[i] = this.gl.createTexture();

      this.gl.activeTexture(this.gl[`TEXTURE${i}`]);
      this.gl.bindTexture(this.gl.TEXTURE_2D, glTexture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.gl.canvas); // todo create empty canvas 8x8 fillRect
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    }
  }

  bindTexture(texture) {
    let index = this.mBoundTextures.indexOf(texture);

    if (index === -1) {

      index = this.mBoundTextures.indexOf(null);
      index = index === -1 ? this.mBatchTextures.indexOf(null) : index;

      if (index === -1) return;

      this.renderer.state.setActiveTexture(this.gl[`TEXTURE${index}`]);
      this.renderer.state.bindTexture(this.mGlTextures[index]);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, texture.native);
      // todo texture settings repeat nearest clamp from sprite
    }

    this.mBoundTextures[index] = texture;
    this.mBatchTextures[index] = texture;

    return index;
  }
  
  endBatch() {
    this.mBatchTextures.fill(null);
  }
}
