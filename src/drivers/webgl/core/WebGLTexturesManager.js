/* @echo EXPORT */
class WebGLTexturesManager {
  constructor(renderer) {

    const gl = this.gl = renderer.gl;
    const UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    
    this.mRenderer = renderer;
    this.mBoundTextures = new Array(UNITS).fill(null);
    this.mBatchTextures = new Array(UNITS).fill(null);
    this.mGLTextures = [];

    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);

    const canvas = document.createElement(`canvas`);
    const ctx = canvas.getContext(`2d`);
    canvas.width = canvas.height = 8;
    ctx.fillRect(0, 0, 8, 8);

    for (let i = 0; i < UNITS; i++) {
      const glTexture = this.mGLTextures[i] = gl.createTexture();

      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, glTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
  }

  bindTexture(texture) {
    const gl = this.gl;
    const boundTextures = this.mBoundTextures;
    const batchTextures = this.mBatchTextures;
    let index = boundTextures.indexOf(texture);

    if (index === -1) {

      index = boundTextures.indexOf(null);
      index = index === -1 ? batchTextures.indexOf(null) : index;

      if (index === -1) {
        return -1;
      }

      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, this.mGLTextures[index]);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.native);
      // todo texture settings repeat nearest clamp from sprite
    }

    boundTextures[index] = texture;
    batchTextures[index] = texture;

    return index;
  }
  
  endBatch() {
    this.mBatchTextures.fill(null);
  }
}
