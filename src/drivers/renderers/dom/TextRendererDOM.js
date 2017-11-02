/* @echo EXPORT */
class TextRendererDOM extends TextRenderer {
  render(driver) {
    super.render(driver);

    driver.drawTexture(this.texture);
  }
}
