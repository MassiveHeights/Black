/**
 * A blend mode enum.
 * @cat drivers
 * @static
 * @constant
 * @enum {string}
 */
const BlendMode = {
  /** Inherits blend mode from parent display object */
  AUTO       : 'auto',
  NORMAL     : 'normal',
  ADD        : 'add',
  MULTIPLY   : 'multiply',
  SCREEN     : 'screen',
  OVERLAY    : 'overlay',
  DARKEN     : 'darken',
  LIGHTEN    : 'lighten',
  COLOR_DODGE: 'colorDodge',
  COLOR_BURN : 'colorBurn',
  HARD_LIGHT : 'hardLight',
  SOFT_LIGHT : 'softLight',
  DIFFERENCE : 'difference',
  EXCLUSION  : 'exclusion',
  HUE        : 'hue',
  SATURATE   : 'saturate',
  COLOR      : 'color',
  LUMINOSITY : 'luminosity',
  MASK       : 'mask',
  MASK_INV   : 'maskInv'
};

/** 
 * @static 
 * @constant 
 * @dict
 * @private
 */
const CanvasBlendMode = {
  'auto'       : 'auto',
  'normal'     : 'source-over',
  'add'        : 'lighter',
  'multiply'   : 'multiply',
  'screen'     : 'screen',
  'overlay'    : 'overlay',
  'darken'     : 'darken',
  'lighten'    : 'lighten',
  'colorDodge' : 'color-dodge',
  'colorBurn'  : 'color-burn',
  'hardLight'  : 'hard-light',
  'softLight'  : 'soft-light',
  'difference' : 'difference',
  'exclusion'  : 'exclusion',
  'due'        : 'hue',
  'saturate'   : 'saturate',
  'color'      : 'color',
  'luminosity' : 'luminosity',
  'mask'       : 'source-in',
  'maskInv'    : 'source-out'
};

export { BlendMode, CanvasBlendMode };