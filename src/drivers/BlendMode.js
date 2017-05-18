/**
 * A blend mode enum.
 * @enum {string}
 */
/* @echo EXPORT */
var BlendMode = {
  AUTO       : 'auto',
  NORMAL     : 'source-over',
  ADD        : 'lighter',
  MULTIPLY   : 'multiply',
  SCREEN     : 'screen',
  OVERLAY    : 'overlay',
  DARKEN     : 'darken',
  LIGHTEN    : 'lighten',
  COLOR_DODGE: 'color-dodge',
  COLOR_BURN : 'color-burn',
  HARD_LIGHT : 'hard-light',
  SOFT_LIGHT : 'soft-light',
  DIFFERENCE : 'difference',
  EXCLUSION  : 'exclusion',
  HUE        : 'hue',
  SATURATE   : 'saturate',
  COLOR      : 'color',
  LUMINOSITY : 'luminosity'
};

/* @echo EXPORT */
var WebGLBlendMode = (blendMode, gl) => {
  var map = {
    [BlendMode.NORMAL]     : {src: gl.SRC_ALPHA, dst: gl.ONE_MINUS_SRC_ALPHA},
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

  return () => {
    return {src: gl.SRC_ALPHA, dst: gl.ONE_MINUS_SRC_ALPHA};
  };
  return (WebGLBlendMode = blendMode => map[blendMode])(blendMode);
};
