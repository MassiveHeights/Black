import { TextRenderer } from "../TextRenderer";
import { Renderer } from "../Renderer";

/**
 * Renders `TextField` objects on canvas.
 *
 * @extends black-engine~TextRenderer
 * @cat drivers.canvas
 */
export class TextRendererCanvas extends TextRenderer {
  /** @inheritDoc */
  render(driver, session) {
    super.render(driver, session);

    driver.drawTexture(Renderer.getColoredTexture(this.texture, this.gameObject.mColor));
  }
}
