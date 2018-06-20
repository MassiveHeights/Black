/**
 * Renders `Sprite` objects on canvas.
 *
 * @extends DisplayObjectRendererCanvas
 * @cat drivers.canvas
 */
/* @echo EXPORT */
class SpriteRendererCanvas extends Renderer {
  preRender(driver, isBackBufferActive) {
    this.endPassRequired = this.gameObject.mClipRect !== null && this.gameObject.mClipRect.isEmpty === false;

    this.skipChildren = this.gameObject.mAlpha <= 0 || this.gameObject.mVisible === false;
    this.skipSelf = this.gameObject.mTexture === null || this.skipChildren === true;
  }

  /**
   * @inheritDoc
   */
  render(driver) {
    driver.drawTexture(Renderer.getColoredTexture(this.gameObject.mTexture, this.color));
  }
}