/**
 * @cat display
 * @enum {string}
 */
/* @echo EXPORT */
var StageScaleMode = {
  NORMAL: 'normal', // the stage size will be the same no matter what DPI is
  NO_SCALE: 'noScale', // the stage size will be affected by dpi
  FIXED: 'fixed', // the stage size tries to stay inside requested size. default is 960x640
  LETTERBOX: 'letterBox' // the stage size will be equal to requested size, position will be centered
};
