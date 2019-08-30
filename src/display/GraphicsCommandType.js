/**
 * Command to use in graphics
 * @cat display
 * @static
 * @constant
 * @enum {string}
 */
const GraphicsCommandType = {
  LINE_STYLE        : 'lineStyle',
  FILL_STYLE        : 'fillStyle',

  ARC               : 'arc',
  RECT              : 'rect',
  ROUNDED_RECT      : 'roundedRect',
  BEZIER_CURVE_TO   : 'bezierCurveTo',
  QUADRATIC_CURVE_TO: 'quadraticCurveTo',
  BEGIN_PATH        : 'beginPath',
  CLOSE_PATH        : 'closePath',
  FILL              : 'fill',
  LINE_TO           : 'lineTo',
  MOVE_TO           : 'moveTo',
  STROKE            : 'stroke',
  BOUNDS            : 'bounds',

  SHADOW_COLOR      : 'shadowColor',
  SHADOW_BLUR       : 'shadowBlur',

  LINE_DASH   : 'setLineDash',
  FILL_GRD    : 'gradientFillStyle',
  FILL_PATTERN: 'patternFillStyle',
};

export { GraphicsCommandType };