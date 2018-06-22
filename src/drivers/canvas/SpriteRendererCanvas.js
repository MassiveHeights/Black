/**
 * Renders `Sprite` objects on canvas.
 *
 * @extends DisplayObjectRendererCanvas
 * @cat drivers.canvas
 */
/* @echo EXPORT */
class SpriteRendererCanvas extends Renderer {
  /** @inheritDoc */
  preRender(driver, session) {
    let gameObject = /** @type {Sprite} */ (this.gameObject);

    this.endPassRequired = gameObject.mClipRect !== null && gameObject.mClipRect.isEmpty === false;
    this.skipChildren = gameObject.mAlpha <= 0 || gameObject.mVisible === false;
    this.skipSelf = gameObject.mTexture === null || this.skipChildren === true;
  }

  /** @inheritDoc */
  render(driver, session) {
    let gameObject = /** @type {Sprite} */ (this.gameObject);

    driver.drawTexture(Renderer.getColoredTexture(gameObject.mTexture, this.color));
  }
}