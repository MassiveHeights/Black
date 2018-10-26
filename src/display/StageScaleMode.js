/**
 * Stage scale mode
 * @cat display
 * @static
 * @constant
 * @enum {string}
 */
/* @echo EXPORT */
const StageScaleMode = {
  /** The stage size will be the same no matter what DPI is */
  NORMAL: 'normal',
  /** The stage size will be affected by dpi */
  NO_SCALE: 'noScale',
  /** The stage size tries to stay inside requested size. default is 960x640 */
  FIXED: 'fixed',
  /** The stage size will be equal to requested size, position will be centered */
  LETTERBOX: 'letterBox',
  /** The stage size will be equal to requested size, position will be centered, and cover the viewport */
  COVER: 'cover'
};
