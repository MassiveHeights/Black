/**
 * Renders `TextField` objects on canvas.
 *
 * @extends TextRenderer
 * @cat drivers.canvas
 */
/* @echo EXPORT */
class TextRendererCanvas extends TextRenderer {

  /**
   * @inheritDoc
   */
  render(driver) {
    super.render(driver);

    driver.drawTexture(this.texture);
  }
}
