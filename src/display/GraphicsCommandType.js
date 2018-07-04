/**
 * Command to use in graphics
 * @cat display
 * @static
 * @constant
 * @enum {string}
 */
/* @echo EXPORT */
const GraphicsCommandType = {  
  LINE_STYLE: 'lineStyle',
  FILL_STYLE: 'fillStyle',

  ARC: 'arc',
  RECT: 'rect',
  BEZIER_CURVE_TO: 'bezierCurveTo',
  BEGIN_PATH: 'beginPath',
  CLOSE_PATH: 'closePath',
  FILL: 'fill',
  LINE_TO: 'lineTo',
  MOVE_TO: 'moveTo',
  STROKE: 'stroke',
  BOUNDS: 'bounds',
  TRANSFORM: 'transform'
};