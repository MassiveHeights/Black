/**
 * Maps black blend modes to WebGl blend functions.
 */
/* @echo EXPORT */
let WebGLBlendMode = (blendMode, gl) => {
  const map = {
    [BlendMode.NORMAL]     : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.ADD]        : {src: gl.ONE, dst: gl.DST_ALPHA},
    [BlendMode.MULTIPLY]   : {src: gl.DST_COLOR, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.SCREEN]     : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_COLOR},
    [BlendMode.OVERLAY]    : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.DARKEN]     : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.LIGHTEN]    : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.COLOR_DODGE]: {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.COLOR_BURN] : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.HARD_LIGHT] : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.SOFT_LIGHT] : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.DIFFERENCE] : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.EXCLUSION]  : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.HUE]        : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.SATURATE]   : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.COLOR]      : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA},
    [BlendMode.LUMINOSITY] : {src: gl.ONE, dst: gl.ONE_MINUS_SRC_ALPHA}
  };

  return (WebGLBlendMode = blendMode => map[blendMode])(blendMode);
};