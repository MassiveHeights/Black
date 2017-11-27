/* @echo EXPORT */
class Renderer {
  constructor() {
    this.texture = null;
    this.alpha = 1;
    this.blendMode = BlendMode.AUTO;
    this.transform = null;
    this.visible = true;
    this.pivotX = 0;
    this.pivotY = 0;
    this.dirty = DirtyFlag.DIRTY;
    this.clipRect = null;
    
    this.endPassRequiredAt = -1;
    this.endPassRequired = false;
    //this.isBatchable = null;

    // NOTE: this property is not yet finished. most likely this will be 
    // some kind of render-layer in future
    // this should be used only for custom overlays, debug draws etc
    // game objects should never use this property
    // ALSO: clipRect will not work 
    this.debugLayer = false;
  }

  render(driver) { }

  get isRenderable() {
    return this.alpha > 0 && this.visible === true;
  }

  getTransform() {
    return this.transform;
  }

  getAlpha() {
    return this.alpha;
  }

  getBlendMode() {
    return this.blendMode;
  }
}