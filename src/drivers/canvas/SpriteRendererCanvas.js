/**
 * Renders `Sprite` objects on canvas.
 *
 * @extends DisplayObjectRendererCanvas
 * @cat drivers.canvas
 */
/* @echo EXPORT */
class SpriteRendererCanvas extends DisplayObjectRendererCanvas {
  /**
   * @inheritDoc
   */
  render(driver) {
    driver.drawTexture(Renderer.getColoredTexture(this.getTexture(), this.getColor()));
  }

  getTexture() {
    return this.gameObject.mTexture;
  }
}