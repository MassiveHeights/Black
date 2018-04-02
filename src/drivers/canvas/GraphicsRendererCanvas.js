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
    this.__drawCommandBuffer(driver);
    
    if (this.color !== null && this.color !== 0xFFFFFF) {
      driver.context.globalCompositeOperation = 'multiply';
      this.__drawCommandBuffer(driver, this.color);
    }
  }

  __drawCommandBuffer(driver, color = null) {
    const ctx = driver.context;
    const len = this.commands.length;
    const r = driver.renderScaleFactor;
    ctx.save();

    for (let i = 0; i < len; i++) {
      const cmd = this.commands[i];

      switch (cmd.type) {
        case GraphicsCommandType.TRANSFORM: {
          ctx.setTransform(cmd.data[0], cmd.data[1], cmd.data[2], cmd.data[3], cmd.data[4], cmd.data[5]);
          break;
        }
        case GraphicsCommandType.LINE: {
          this.__setLineStyle(cmd, ctx);
          ctx.beginPath();
          ctx.moveTo(cmd.data[0] * r, cmd.data[1] * r);
          ctx.lineTo(cmd.data[2] * r, cmd.data[3] * r);
          ctx.stroke();
          break;
        }
        case GraphicsCommandType.RECTANGLE: {
          ctx.beginPath();
          ctx.rect(cmd.data[0] * r, cmd.data[1] * r, cmd.data[2] * r, cmd.data[3] * r);

          this.__setFillStyle(cmd, ctx);
          ctx.fill();

          this.__setLineStyle(cmd, ctx);
          ctx.stroke();

          break;
        }
        case GraphicsCommandType.CIRCLE: {
          ctx.beginPath();
          ctx.arc(cmd.data[0] * r, cmd.data[1] * r, cmd.data[2] * r, 0, 2 * Math.PI);

          this.__setFillStyle(cmd, ctx, color);
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

    ctx.restore();
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
    ctx.strokeStyle = ColorHelper.hexColorToString(cmd.lineColor);
    ctx.globalAlpha = cmd.lineAlpha * this.alpha;
  }

  /**
   * @ignore
   * @private
   * @param {GraphicsCommand} cmd
   * @param {CanvasRenderingContext2D} ctx
   */
  __setFillStyle(cmd, ctx, color = null) {
    color = color === null ? cmd.fillColor : color;

    ctx.globalAlpha = cmd.fillAlpha * this.alpha;
    ctx.fillStyle = ColorHelper.hexColorToString(color);
  }
}