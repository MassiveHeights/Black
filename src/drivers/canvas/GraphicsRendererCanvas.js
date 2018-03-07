/**
 * Renders `Graphics` objects on canvas.
 *
* @extends GraphicsRenderer
* @cat drivers.canvas
*/
/* @echo EXPORT */
class GraphicsRendererCanvas extends GraphicsRenderer {
  /**
   * Creates new instance of GraphicsRendererCanvas.
   */
  constructor() {
    super();
  }

  /**
   * Called when this renderer needs to be rendered.
   *
   * @param {VideoNullDriver} driver Active video driver.
   * @returns {void}
   */
  render(driver) {
    // if (this.dirty === DirtyFlag.CLEAN) {
    //   driver.drawTextureWithOffset(this.texture, this.bounds.x, this.bounds.y);
    //   return;
    // }

    const ctx = driver.context;
    const len = this.commands.length;
    const s = Black.driver.finalScale;

    for (let i = 0; i < len; i++) {
      const cmd = this.commands[i];

      switch (cmd.type) {
        case GraphicsCommandType.LINE: {
          this.__setLineStyle(cmd, ctx);
          ctx.beginPath();
          ctx.moveTo(cmd.data[0] * s, cmd.data[1] * s);
          ctx.lineTo(cmd.data[2] * s, cmd.data[3] * s);
          ctx.stroke();
          break;
        }
        case GraphicsCommandType.RECTANGLE: {
          ctx.beginPath();
          ctx.rect(cmd.data[0] * s, cmd.data[1] * s, cmd.data[2] * s, cmd.data[3] * s);

          this.__setFillStyle(cmd, ctx);
          ctx.fill();

          this.__setLineStyle(cmd, ctx);
          ctx.stroke();

          break;
        }
        case GraphicsCommandType.CIRCLE: {
          ctx.beginPath();
          ctx.arc(cmd.data[0] * s, cmd.data[1] * s, cmd.data[2] * s, 0, 2 * Math.PI);

          this.__setFillStyle(cmd, ctx);
          ctx.fill();

          this.__setLineStyle(cmd, ctx);
          ctx.stroke();
          break;
        }

        default:
          Debug.error('Unsupported canvas command.');
          break;
      }
    }

    // this.texture = texture;
    // driver.drawTextureWithOffset(this.texture, this.bounds.x, this.bounds.y);
  }

  /**
   * Returns true if this renderer can be rendered.
   *
   * @returns {boolean} True if can be rendered otherwise false.
   */
  get isRenderable() {
    return this.commands.length > 0;
  }

  /**
   * @ignore
   * @private
   * @param {GraphicsCommand} cmd
   * @param {CanvasRenderingContext2D} ctx
   */
  __setLineStyle(cmd, ctx) {
    ctx.lineWidth = cmd.lineWidth;
    ctx.strokeStyle = VideoNullDriver.hexColorToString(cmd.lineColor);
    ctx.globalAlpha = cmd.lineAlpha * this.alpha;
  }

  /**
   * @ignore
   * @private
   * @param {GraphicsCommand} cmd
   * @param {CanvasRenderingContext2D} ctx
   */
  __setFillStyle(cmd, ctx) {
    ctx.globalAlpha = cmd.fillAlpha * this.alpha;
    ctx.fillStyle = VideoNullDriver.hexColorToString(cmd.fillColor);
  }
}
