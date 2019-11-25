import { GraphicsRenderer } from "../GraphicsRenderer";
import { Graphics } from "../../display/Graphics";
import { Debug } from "../../core/Debug";
import { Black } from "../../Black";
import { ColorHelper } from "../../utils/ColorHelper";
import { GraphicsCommandType } from "../../display/GraphicsCommandType";
import { Matrix } from "../../geom/Matrix";

/**
 * Renders `Graphics` objects on canvas.
 *
 * @extends black-engine~GraphicsRenderer
 * @cat drivers.canvas
 */

export class GraphicsRendererCanvas extends GraphicsRenderer {
  /**
   * Creates new instance of GraphicsRendererCanvas.
   */
  constructor() {
    super();
  }

  /** @inheritDoc */
  render(driver, session) {
    let gameObject = /** @type {Graphics} */ (this.gameObject);
    this.__drawCommandBuffer(driver);

    if (gameObject.mColor !== null && gameObject.mColor !== 0xFFFFFF) {
      driver.context.globalCompositeOperation = 'multiply';
      this.__drawCommandBuffer(driver, gameObject.mColor);
    }
  }

  /**
   * Prepare context to draw.
   *
   * @private
   * @param {black-engine~VideoNullDriver} driver Driver to draw.
   * @param {number|null=} [color=null] Tint.
   *
   * @return {void}
   */
  __drawCommandBuffer(driver, color = null) {
    const gameObject = /** @type {Graphics} */ (this.gameObject);
    const ctx = driver.context;

    ctx.save();
    ctx.beginPath();

    const transform = Matrix.pool.get().copyFrom(gameObject.worldTransformation);
    transform.translate(-gameObject.mDataOffsetX, -gameObject.mDataOffsetY);

    this.__renderNode(driver, color, gameObject.mGraphicsData, transform);

    Matrix.pool.release(transform);
    ctx.restore();
  }

  /**
   * Recursively draws each node of GraphicsData.
   *
   * @private
   * @param {black-engine~VideoNullDriver} driver Driver to draw.
   * @param {number|null} color Tint.
   * @param {black-engine~GraphicsData} node Commands provider.
   * @param {black-engine~Matrix} transform Graphics Data global transformation.
   *
   * @return {void}
   */
  __renderNode(driver, color, node, transform) {
    const commands = node.mCommandQueue;
    const ctx = driver.context;
    const len = commands.length;
    const r = driver.renderScaleFactor;
    const px = node.mPivotX;
    const py = node.mPivotY;

    transform = transform.clone().append(node.mTransform);
    driver.setTransform(transform);

    for (let i = 0; i < len; i++) {
      const cmd = commands[i];

      switch (cmd.type) {
        case GraphicsCommandType.LINE_STYLE: {
          ctx.lineWidth = cmd.getNumber(0) * r;
          ctx.strokeStyle = ColorHelper.intToRGBA(color === null ? cmd.getNumber(1) : /** @type {number} */(color), cmd.getNumber(2));
          ctx.lineCap = cmd.getString(3);
          ctx.lineJoin = cmd.getString(4);
          ctx.miterLimit = cmd.getNumber(5);
          break;
        }

        case GraphicsCommandType.FILL_STYLE: {
          ctx.fillStyle = ColorHelper.intToRGBA(color === null ? cmd.getNumber(0) : /** @type {number} */(color), cmd.getNumber(1));
          break;
        }

        case GraphicsCommandType.FILL_GRD: {
          const gradientInfo = /** @type {GraphicsLinearGradient} */(cmd.getObject(0));
          let grd = gradientInfo.native;

          if (!grd) {
            const dpr = Black.driver.renderScaleFactor;
            const entries = [];

            grd = gradientInfo.native = ctx.createLinearGradient(gradientInfo.x0 * dpr, gradientInfo.y0 * dpr,
              gradientInfo.x1 * dpr, gradientInfo.y1 * dpr);

            for (let key in gradientInfo.stops) {
              entries.push({ percent: parseFloat(key), color: gradientInfo.stops[key] });
            }

            entries.sort((a, b) => a.percent - b.percent);

            for (let i = 0, l = entries.length; i < l; i++) {
              const entry = entries[i];
              grd.addColorStop(entry.percent, entry.color);
            }
          }

          ctx.fillStyle = /** @type {CanvasGradient} */(grd);

          break;
        }

        case GraphicsCommandType.FILL_PATTERN: {
          const patternInfo = /** @type {GraphicsPattern} */(cmd.getObject(0));
          let pattern = patternInfo.native;

          if (!pattern) {
            pattern = patternInfo.native = ctx.createPattern(patternInfo.image, patternInfo.repetition);
          }

          ctx.fillStyle = /** @type {CanvasPattern} */(pattern);

          break;
        }

        case GraphicsCommandType.ARC: {
          ctx.arc(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py, cmd.getNumber(2) * r, cmd.getNumber(3), cmd.getNumber(4), cmd.getBoolean(5));
          break;
        }

        case GraphicsCommandType.RECT: {
          ctx.rect(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py, cmd.getNumber(2) * r, cmd.getNumber(3) * r);
          break;
        }

        case GraphicsCommandType.ROUNDED_RECT: {
          const x = cmd.getNumber(0);
          const y = cmd.getNumber(1);
          const width = cmd.getNumber(2);
          const height = cmd.getNumber(3);
          const radius = cmd.getNumber(4);

          ctx.moveTo(x * r - px, (y + radius) * r - py);
          ctx.quadraticCurveTo(x * r - px, y * r - py, (x + radius) * r - px, y * r - py);
          ctx.lineTo((x + width - radius) * r - px, y * r - py);
          ctx.quadraticCurveTo((x + width) * r - px, y * r - py, (x + width) * r - px, (y + radius) * r - py);
          ctx.lineTo((x + width) * r - px, (y + height - radius) * r - py);
          ctx.quadraticCurveTo((x + width) * r - px, (y + height) * r - py, (x + width - radius) * r - px, (y + height) * r - py);
          ctx.lineTo((x + radius) * r - px, (y + height) * r - py);
          ctx.quadraticCurveTo(x * r - px, (y + height) * r - py, x * r - px, (y + height - radius) * r - py);
          ctx.closePath();
          break;
        }

        case GraphicsCommandType.BEZIER_CURVE_TO: {
          ctx.bezierCurveTo(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py, cmd.getNumber(2) * r - px, cmd.getNumber(3) * r - py, cmd.getNumber(4) * r - px, cmd.getNumber(5) * r - py);
          break;
        }
        case GraphicsCommandType.QUADRATIC_CURVE_TO: {
          ctx.quadraticCurveTo(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py, cmd.getNumber(2) * r - px, cmd.getNumber(3) * r - py);
          break;
        }
        case GraphicsCommandType.BEGIN_PATH: {
          ctx.beginPath();
          break;
        }
        case GraphicsCommandType.CLOSE_PATH: {
          ctx.closePath();
          break;
        }
        case GraphicsCommandType.FILL: {
          ctx.fill(cmd.getBoolean(0) === true ? 'nonzero' : 'evenodd');
          break;
        }

        case GraphicsCommandType.LINE_TO: {
          ctx.lineTo(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py);
          break;
        }

        case GraphicsCommandType.MOVE_TO: {
          ctx.moveTo(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py);
          break;
        }

        case GraphicsCommandType.LINE_DASH: {
          ctx.setLineDash(cmd.getNumber(0));
          break;
        }

        case GraphicsCommandType.STROKE: {
          ctx.stroke();
          break;
        }

        case GraphicsCommandType.SHADOW_BLUR: {
          ctx.shadowBlur = cmd.getNumber(0) * r;
          break;
        }

        case GraphicsCommandType.SHADOW_COLOR: {
          let stringColor = ColorHelper.intToRGBA(color === null ? cmd.getNumber(0) : /** @type {number} */(color), cmd.getNumber(1));
          ctx.shadowColor = stringColor;
          break;
        }

        case GraphicsCommandType.BOUNDS: {
          break;
        }

        default:
          Debug.error(`Unsupported canvas command '${cmd.type}'.`);
          break;
      }
    }

    for (let i = 0, l = node.mNodes.length; i < l; i++)
      this.__renderNode(driver, color, node.mNodes[i], transform);
  }
}
