/**
 * Renders `BitmapTextField` objects on canvas.
 *
 * @extends BitmapTextRenderer
 * @cat drivers.canvas
 */
/* @echo EXPORT */
class BitmapTextRendererCanvas extends BitmapTextRenderer {

  /**
   * @inheritDoc
   */
  render(driver) {
    super.render(driver);

    driver.drawTexture(Renderer.getColoredTexture(this.texture, this.color));
  }
}
