/* @echo EXPORT */
class WebGLTextures {
  constructor(renderer) {
    const gl = this.gl = renderer.gl;
    const UNITS = renderer.MAX_TEXTURE_IMAGE_UNITS;
    const glTextures = [];

    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);

    const canvas = document.createElement(`canvas`);
    const ctx = canvas.getContext(`2d`);
    canvas.width = canvas.height = 8;
    ctx.fillRect(0, 0, 8, 8);

    for (let i = 0; i < UNITS; i++) {
      const glTexture = glTextures[i] = gl.createTexture();
      const texture = new Texture(canvas);
      texture._vSlotWebGL = i;
      renderer.boundTextures[i] = texture;

      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, glTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.native);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    
    return glTextures;
  }
}
