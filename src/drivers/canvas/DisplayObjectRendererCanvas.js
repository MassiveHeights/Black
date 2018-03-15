/**
 * Renders `DisplayObject` objects on canvas.
 *
 * @extends Renderer
 * @cat drivers.canvas
 */
/* @echo EXPORT */
class DisplayObjectRendererCanvas extends Renderer {
  /**
   * @inheritDoc
   */
  render(driver) {
    if (this.texture !== null)
      driver.drawTexture(this.texture);
  }  
}
