/**
 * Renders `TextField` objects on canvas.
 *
 * @extends TextRenderer
 * @cat drivers.canvas
 */
/* @echo EXPORT */
class TextRendererCanvas extends TextRenderer {
  /** @inheritDoc */
  render(driver, session) {
    super.render(driver, session);

    driver.drawTexture(Renderer.getColoredTexture(this.texture, this.gameObject.mColor));
  }
}
