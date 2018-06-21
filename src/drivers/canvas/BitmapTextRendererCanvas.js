/**
 * Renders `BitmapTextField` objects on canvas.
 *
 * @extends BitmapTextRenderer
 * @cat drivers.canvas
 */
/* @echo EXPORT */
class BitmapTextRendererCanvas extends BitmapTextRenderer {
  /** @inheritDoc */
  render(driver, session) {
    super.render(driver, session);

    driver.drawTexture(Renderer.getColoredTexture(this.texture, this.gameObject.mColor));
  }
}
