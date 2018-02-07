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

    driver.drawTexture(this.texture);
  }
}
