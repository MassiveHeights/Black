/**
 * @cat core
 * @enum {number}
 */
const DirtyFlag = {
  CLEAN: 0,         // Object is 100% cached
  LOCAL: 1,         // Local transformation is dirty 
  WORLD: 2,         // World transformation is dirty 
  WORLD_INV: 4,     // Inverted world transformation is dirty 
  RENDER: 8,        // Object needs to be rendered 
  RENDER_CACHE: 16, // In case object renders to bitmap internally, bitmap needs to be updated
  ANCHOR: 32,       // 
  BOUNDS: 64,       // Parent-relative bounds needs update
  DIRTY: 0xffffff,  // Everything is dirty, you, me, everything!
  WIRB: 78
};

export { DirtyFlag };