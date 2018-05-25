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
        case GraphicsCommandType.LINE_STYLE: {
          ctx.lineWidth = cmd.data[0];
          ctx.strokeStyle = ColorHelper.intToRGBA(cmd.data[1], cmd.data[2]);
          ctx.lineCap = cmd.data[3];
          ctx.lineJoin = cmd.data[4];
          ctx.mitterLimit = cmd.data[5];
          break;
        }

        case GraphicsCommandType.FILL_STYLE: {
          ctx.fillStyle = ColorHelper.intToRGBA(cmd.data[0], cmd.data[1]);
          break;
        }

        case GraphicsCommandType.ARC: {
          ctx.arc(cmd.data[0] * r, cmd.data[1] * r, cmd.data[2] * r, cmd.data[3], cmd.data[4], cmd.data[5]);
          break;
        }

        case GraphicsCommandType.RECT: {
          ctx.rect(cmd.data[0] * r, cmd.data[1] * r, cmd.data[2] * r, cmd.data[3] * r);
          break;
        }
        // case GraphicsCommandType.BEZIER_CURVE_TO: {
        //   ctx.bezierCurveTo(cmd.data[0], cmd.data[1], cmd.data[2], cmd.data[3], cmd.data[4], cmd.data[5]);
        //   break;
        // }
        case GraphicsCommandType.BEGIN_PATH: {
          ctx.beginPath();
          break;
        }
        case GraphicsCommandType.CLOSE_PATH: {
          ctx.closePath();
          break;
        }
        case GraphicsCommandType.FILL: {
          ctx.fill();
          break;
        }

        case GraphicsCommandType.LINE_TO: {
          ctx.lineTo(cmd.data[0] * r, cmd.data[1] * r);
          break;
        }

        case GraphicsCommandType.MOVE_TO: {
          ctx.moveTo(cmd.data[0] * r, cmd.data[1] * r);
          break;
        }

        case GraphicsCommandType.STROKE: {
          ctx.stroke();
          break;
        }

        default:
          Debug.error(`Unsupported canvas command '${cmd.type}'.`);
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