import { ParserBase } from "./ParserBase";
import { GraphicsData } from "../display/GraphicsData";
import { GraphicsPattern } from "../display/GraphicsPattern";
import { CanvasRenderTexture } from "../textures/CanvasRenderTexture";
import { Matrix } from "../geom/Matrix";
import { Black } from "../Black";
import { BVGStyle } from "./BVGStyle";
import { ColorHelper } from "../utils/ColorHelper";
import { Graphics } from "../display/Graphics";
import { GraphicsLinearGradient } from "../display/GraphicsLinearGradient";
import { JointStyle } from "../display/JointStyle";
import { Rectangle } from "../geom/Rectangle";
import { FillRule } from "../display/FillRule";
import { MathEx } from "../math/MathEx";
import { CapsStyle } from "../display/CapsStyle";

const pathCmds = {
  MOVETO: 'M',
  MOVETO_REL: 'm',
  LINETO: 'L',
  LINETO_REL: 'l',
  VLINE: 'V',
  VLINE_REL: 'v',
  HLINE: 'H',
  HLINE_REL: 'h',
  CURVE: 'C',
  CURVE_REL: 'c',
  SCURVE: 'S',
  SCURVE_REL: 's',
  QCURVE: 'Q',
  QCURVE_REL: 'q',
  SQCURVE: 'T',
  SQCURVE_REL: 't',
  ARC: 'A',
  ARC_REL: 'a',
  CLOSE_PATH: 'Z',
};

const shapeCmds = {
  RECT: 'r',
  CIRCLE: 'c',
  ELLIPSE: 'e',
  LINE: 'l',
  POLYLINE: 's',
  PATH: 'p',
  POLYGON: 'g',
  CLIPPING: 'm',
};

/**
 * Black Vector Graphics parser.
 * Creates GraphicsData for Graphics from BVG format.
 *
 * @cat parsers
 * @extends black-engine~ParserBase
 */

export class BVGParser extends ParserBase {
  /**
   * Creates new instance of BVGParser
   */
  constructor() {
    super();

    /** @type {Object} */
    this._defs = {};
  }

  /**
   * @inheritDoc
   *
   * @return {black-engine~GraphicsData} Data for Graphics renderer
   */
  parse(data) {
    super.parse(data);

    const styles = this.__parseStyles(data['styles']);

    this._defs = {};
    this.__parseDefs(data['defs'], this._defs);

    return this.__traverse(data, styles, new GraphicsData(), new BVGStyle());
  }

  /**
   * Recursively goes through children nodes and builds final GraphicsData.
   *
   * @private
   * @param {Object} node BVG node.
   * @param {Array<black-engine~BVGStyle>} styles Parsed BVG styles.
   * @param {black-engine~GraphicsData} parent Parent node.
   * @param {black-engine~BVGStyle} parentStyle Style for inheritance.
   *
   * @returns {black-engine~GraphicsData} Parsed data root.
   */
  __traverse(node, styles, parent, parentStyle) {
    const defs = this._defs;
    const graphicsData = new GraphicsData();
    let style = parentStyle.clone();
    parent.mNodes.push(graphicsData);

    if (node['id'])
      graphicsData.name = node['id'];

    let t = node['t'];
    if (t) {
      const x = t[0] || 0;
      const y = t[1] || 0;
      const sx = t[2] || 1;
      const sy = t[3] || 1;
      const px = t[5] || 0;
      const py = t[6] || 0;

      graphicsData.mTransform.rotate(t[4] || 0);
      graphicsData.mTransform.scale(sx, sy);
      graphicsData.mTransform.skew(t[7] || 0, t[8] || 0);

      graphicsData.mTransform.data[4] = x + px / sx;
      graphicsData.mTransform.data[5] = y + py / sy;

      graphicsData.mPivotX = px;
      graphicsData.mPivotY = py;
    }

    if (node['cmds']) {
      const cmds = node['cmds'].split('$').filter(v => v).reverse();
      const lastRect = new Rectangle();
      let prevName = '';

      while (cmds.length > 0) {
        const cmd = cmds.pop();
        const name = cmd[0];
        const args = cmd.slice(1).split(',').map(v => Number(v));

        graphicsData.beginPath();

        if (prevName !== 'S' && name !== 'S') {
          graphicsData.fillStyle(0x000000, 1);
          graphicsData.lineStyle(1, 0x000000, 1, CapsStyle.NONE, JointStyle.MITER, 4);
        }

        prevName = name;

        switch (name) {
          case 'S':
            const newStyle = styles[args[0]];
            style = parentStyle.clone();
            style.merge(newStyle);
            style.compute();

            break;
          case shapeCmds.PATH:
            this.__drawPath(cmd, graphicsData);
            break;
          case shapeCmds.RECT: {
            const x = args[0];
            const y = args[1];
            const width = args[2];
            const height = args[3];
            const rx = (args[4] === undefined ? args[5] : args[4]) || 0;
            const ry = (args[5] === undefined ? args[4] : args[5]) || 0;

            lastRect.set(x, y, width, height);

            if (rx !== 0 && ry !== 0) {
              graphicsData.moveTo(x, y + ry);
              graphicsData.quadraticCurveTo(x, y, x + rx, y);
              graphicsData.lineTo(x + width - rx, y);
              graphicsData.quadraticCurveTo(x + width, y, x + width, y + ry);
              graphicsData.lineTo(x + width, y + height - ry);
              graphicsData.quadraticCurveTo(x + width, y + height, x + width - rx, y + height);
              graphicsData.lineTo(x + rx, y + height);
              graphicsData.quadraticCurveTo(x, y + height, x, y + height - ry);
              graphicsData.closePath();
            } else {
              graphicsData.rect(args[0], args[1], args[2], args[3]);
            }

            break;
          }
          case shapeCmds.CIRCLE:
            const d = args[2] * 2;
            lastRect.set(0, 0, d, d);
            graphicsData.circle(args[0], args[1], args[2]);
            break;
          case shapeCmds.ELLIPSE:
            const x = args[0];
            const y = args[1];
            const rx = args[2];
            const ry = args[3];

            let a = /** @type {!Array<!Array<number>>} */ (this.__arcToBezier(x - rx, y, rx, ry, 0, 0, 0, x + rx, y));
            let b = /** @type {!Array<!Array<number>>} */ (this.__arcToBezier(x + rx, y, rx, ry, 0, 0, 0, x - rx, y));

            const curves = [...a, ...b];

            graphicsData.moveTo(x - rx, y);

            for (let i = 0, l = curves.length; i < l; i++) {
              const c = curves[i];
              graphicsData.bezierCurveTo(c[2], c[3], c[4], c[5], c[6], c[7]);
            }

            // graphics.moveTo(x, y);
            break;
          case shapeCmds.LINE:
            const x1 = args[0];
            const y1 = args[1];
            const x2 = args[2];
            const y2 = args[3];

            graphicsData.moveTo(x1, y1);
            graphicsData.lineTo(x2, y2);
            break;
          case shapeCmds.POLYLINE:
          case shapeCmds.POLYGON:
            const points = cmd.slice(1).split(',').map(v => Number(v));
            graphicsData.moveTo(points[0], points[1]);

            for (let i = 2, l = points.length; i < l; i += 2) {
              graphicsData.lineTo(points[i], points[i + 1]);
            }

            name === shapeCmds.POLYGON && graphicsData.closePath();
            break;
          default:
            break;
        }
        
        if (style.needsFill && name !== 'S') {
          if (this.__isRef(style.F)) {
            const def = defs[style.F.slice(1)].clone();

            if (def instanceof GraphicsPattern) {
              graphicsData.fillPattern(def);
            } else if (def instanceof GraphicsLinearGradient) {
              if (def.isAbsolute) {
                //
              } else {
                def.x0 *= lastRect.width; // todo other units (Now for percents only)
                def.x1 *= lastRect.width;
                def.y0 *= lastRect.height;
                def.y1 *= lastRect.height;
              }

              for (let key in def.stops) {
                def.stops[key] = ColorHelper.intToRGBA(parseInt(def.stops[key].slice(1), 16), style.fillAlpha);
              }

              graphicsData.fillGradient(def);
            }

          } else {
            graphicsData.fillStyle(style.fillColor, style.fillAlpha);
          }

          graphicsData.fill(style.fillRule === FillRule.NONE_ZERO);
        }

        if (style.needsStroke) {
          graphicsData.lineStyle(style.lineWidth, style.lineColor,
            style.lineAlpha, style.lineCap, style.lineJoin, style.miterLimit);

          graphicsData.setLineDash(style.lineDash);
          graphicsData.stroke();
        }
      }
    }

    if (node['nodes']) {
      node['nodes'].forEach(c => {
        this.__traverse(c, styles, graphicsData, style);
      });
    }

    return graphicsData;
  }

  /**
   * Determines whether color string is url to defs or simple color.
   *
   * @private
   * @param {string} value Color or url.
   *
   * @return {boolean}
   */
  __isRef(value) {
    return value.indexOf('$') === 0;
  }

  /**
   * Parses raw defs to this defs object.
   *
   * @private
   * @param {Object} defs Raw defs.
   * @param {Object} res  Reference to this defs.
   *
   * @returns {Object} res Parsed data.
   */
  __parseDefs(defs, res) {
    if (!defs) {
      return res;
    }

    for (let id in defs) {
      if (!defs.hasOwnProperty(id)) continue;

      const def = defs[id];

      if (typeof def === 'string') {
        const cmd = def.charAt(0);

        switch (cmd) {
          case 'R': // Linear Gradient
            const pairs = def.slice(1).split(' ');
            const v = pairs[0].split(',').map(v => parseFloat(v));
            const gradientInfo = new GraphicsLinearGradient(v[0], v[1], v[2], v[3]);
            gradientInfo.isAbsolute = v[4] === 0;
            res[id] = gradientInfo;

            for (let i = 1, l = pairs.length; i < l; i++) {
              const pair = pairs[i];
              const values = pair.split(',');
              const color = '#' + values[1];

              gradientInfo.addColorStop(parseFloat(values[0]), color);
            }
        }
      } else {

        // Pattern
        const styles = this.__parseStyles(def.s);
        const gData = this.__traverse(def, styles, new GraphicsData(), new BVGStyle());
        const graphics = new Graphics(gData);
        const renderTexture = new CanvasRenderTexture(graphics.width, graphics.height, Black.driver.renderScaleFactor);
        Black.driver.render(graphics, renderTexture, new Matrix());

        res[id] = new GraphicsPattern(renderTexture.native, def.r);
      }
    }

    return res;
  }

  /**
   * BVG styles parser.
   *
   * @private
   *
   * @returns {Array<black-engine~BVGStyle>} Parsed data styles.
   */
  __parseStyles(styles) {
    if (!styles)
      return [];

    return styles.map(s => {
      const style = {};
      const props = s.split(' ');

      props.forEach(p => {
        const cmd = p[0];
        style[cmd] = p.slice(1);
      });

      return style;
    });
  }

  /**
   * BVG path data parser.
   *
   * @private
   * @param {string} data Path data attribute value
   * @param {black-engine~GraphicsData} graphicsData Graphics data to store parsed values to.
   *
   * @return {void}
   */
  __drawPath(data, graphicsData) {
    const values = [];

    data
      .split(',')
      .map(item => {
        while (item.length !== 0) {
          const arg = parseFloat(item);

          if (isNaN(arg)) {
            values.push(item.charAt(0));
            item = item.slice(1);
          } else {
            values.push(arg);

            for (let i = 1; true; i++) {
              if (parseFloat(item.slice(0, i)) === arg) {
                item = item.slice(i);
                break;
              }
            }
          }
        }
      });

    values.reverse();

    // Context position
    let x = 0;
    let y = 0;

    // Path start position, to return on close path
    let mx = 0;
    let my = 0;

    // Bezier curve control point 1 position, to draw next smoothed bezier curve
    let bcx = 0;
    let bcy = 0;

    // Quadratic curve control point 1 position, to draw next smoothed quadratic curve
    let qcx = 0;
    let qcy = 0;

    // Store last command
    let prevValue = '';

    // 0 for absolute path and x, y for relative
    let relX = 0;
    let relY = 0;

    while (values.length !== 0) {
      const last = values[values.length - 1];
      const v = last === last.toString() ? values.pop() : prevValue;
      prevValue = v;
      relX = relY = 0;

      if (v === v.toLowerCase()) {
        relX = x;
        relY = y;
      }

      switch (v) {
        case pathCmds.MOVETO:
        case pathCmds.MOVETO_REL:
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphicsData.moveTo(x, y);
          mx = x;
          my = y;
          break;
        case pathCmds.LINETO:
        case pathCmds.LINETO_REL:
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphicsData.lineTo(x, y);
          break;
        case pathCmds.VLINE:
        case pathCmds.VLINE_REL:
          y = values.pop() + relY;
          graphicsData.lineTo(x, y);
          break;
        case pathCmds.HLINE:
        case pathCmds.HLINE_REL:
          x = values.pop() + relX;
          graphicsData.lineTo(x, y);
          break;
        case pathCmds.CURVE:
        case pathCmds.CURVE_REL: {
          const cp1x = values.pop() + relX;
          const cp1y = values.pop() + relY;
          const cp2x = values.pop() + relX;
          const cp2y = values.pop() + relY;
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphicsData.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
          bcx = x * 2 - cp2x;
          bcy = y * 2 - cp2y;
          break;
        }
        case pathCmds.SCURVE:
        case pathCmds.SCURVE_REL: {
          const cp2x = values.pop() + relX;
          const cp2y = values.pop() + relY;
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphicsData.bezierCurveTo(bcx, bcy, cp2x, cp2y, x, y);
          bcx = x * 2 - cp2x;
          bcy = y * 2 - cp2y;
          break;
        }
        case pathCmds.QCURVE:
        case pathCmds.QCURVE_REL: {
          const cpx = values.pop() + relX;
          const cpy = values.pop() + relY;
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphicsData.quadraticCurveTo(cpx, cpy, x, y);
          qcx = x * 2 - cpx;
          qcy = y * 2 - cpy;
          break;
        }
        case pathCmds.SQCURVE:
        case pathCmds.SQCURVE_REL: {
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphicsData.quadraticCurveTo(qcx, qcy, x, y);
          qcx = x * 2 - qcx;
          qcy = y * 2 - qcy;
          break;
        }
        case pathCmds.ARC:
        case pathCmds.ARC_REL: {
          const px = x;
          const py = y;
          const rx = values.pop();
          const ry = values.pop();
          const xAxisRotation = values.pop();
          const largeArcFlag = values.pop();
          const sweepFlag = values.pop();
          x = values.pop() + relX;
          y = values.pop() + relY;

          const curves = this.__arcToBezier(px, py, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y);

          if (!curves) break;

          for (let i = 0, l = curves.length; i < l; i++) {
            const c = curves[i];
            graphicsData.bezierCurveTo(c[2], c[3], c[4], c[5], c[6], c[7]);
          }

          break;
        }
        case pathCmds.CLOSE_PATH:
          graphicsData.closePath();
          x = mx;
          y = my;
          break;
      }

      if (v !== pathCmds.CURVE && v !== pathCmds.CURVE_REL && v !== pathCmds.SCURVE && v !== pathCmds.SCURVE_REL) {
        bcx = x;
        bcy = y;
      }

      if (v !== pathCmds.QCURVE && v !== pathCmds.QCURVE_REL && v !== pathCmds.SQCURVE && v !== pathCmds.SQCURVE_REL) {
        qcx = x;
        qcy = y;
      }
    }
  }

  // ARC TO BEZIER START
  /**
   * Approximate curve corner. Single bezier shouldn't be longer than 90 degrees.
   *
   * @private
   * @param {number} theta Start angle.
   * @param {number} deltaTheta Angle from start to end.
   *
   * @returns {Array<number>} Center.
   */
  __approxUnitArc(theta, deltaTheta) {
    const alpha = 4 / 3 * Math.tan(deltaTheta / 4);
    const x1 = Math.cos(theta);
    const y1 = Math.sin(theta);
    const x2 = Math.cos(theta + deltaTheta);
    const y2 = Math.sin(theta + deltaTheta);

    return [
      x1, y1,
      x1 - y1 * alpha, y1 + x1 * alpha,
      x2 + y2 * alpha, y2 - x2 * alpha,
      x2, y2,
    ];
  }

  __vectorAngle(ux, uy, vx, vy) {
    const sign = (ux * vy - uy * vx < 0) ? -1 : 1;
    const dot = MathEx.clamp(ux * vx + uy * vy, -1, 1);

    return sign * Math.acos(dot);
  }

  /**
   * Find arc center.
   *
   * @private
   * @param {number} x1 Context current position x.
   * @param {number} y1 Context current position y.
   * @param {number} x2 Context target (next) position x.
   * @param {number} y2 Context target (next) position y.
   * @param {number} fa Flag to determine which arc to draw.
   * @param {number} fs Another flag to determine which arc to draw.
   * @param {number} rx Arc radius x.
   * @param {number} ry Arc radius y.
   * @param {number} sinPhi Sin of x axis rotation.
   * @param {number} cosPhi Cos of x axis rotation.
   *
   * @returns {Array<number>} Center.
   */
  __getArcCenter(x1, y1, x2, y2, fa, fs, rx, ry, sinPhi, cosPhi) {
    const x1p = cosPhi * (x1 - x2) / 2 + sinPhi * (y1 - y2) / 2;
    const y1p = -sinPhi * (x1 - x2) / 2 + cosPhi * (y1 - y2) / 2;

    const rxSq = rx * rx;
    const rySq = ry * ry;
    const x1pSq = x1p * x1p;
    const y1pSq = y1p * y1p;

    let radical = Math.max(0, (rxSq * rySq) - (rxSq * y1pSq) - (rySq * x1pSq));
    radical /= (rxSq * y1pSq) + (rySq * x1pSq);
    radical = Math.sqrt(radical) * (fa === fs ? -1 : 1);

    const cxp = radical * rx / ry * y1p;
    const cyp = radical * -ry / rx * x1p;

    const cx = cosPhi * cxp - sinPhi * cyp + (x1 + x2) / 2;
    const cy = sinPhi * cxp + cosPhi * cyp + (y1 + y2) / 2;

    const v1x = (x1p - cxp) / rx;
    const v1y = (y1p - cyp) / ry;
    const v2x = (-x1p - cxp) / rx;
    const v2y = (-y1p - cyp) / ry;

    const theta = this.__vectorAngle(1, 0, v1x, v1y);
    let deltaTheta = this.__vectorAngle(v1x, v1y, v2x, v2y);

    if (fs === 0 && deltaTheta > 0) {
      deltaTheta -= Math.PI * 2;
    }

    if (fs === 1 && deltaTheta < 0) {
      deltaTheta += Math.PI * 2;
    }

    return [cx, cy, theta, deltaTheta];
  }

  /**
   * BVG path data parser.
   *
   * @private
   * @param {number} px Context current position x.
   * @param {number} py Context current position y.
   * @param {number} rx Arc radius x.
   * @param {number} ry Arc radius y.
   * @param {number} xAxisRotation Rotation in degrees.
   * @param {number} largeFlag Flag to determine which arc to draw.
   * @param {number} sweepFlag Another flag to determine which arc to draw.
   * @param {number} x Context target (next) position x.
   * @param {number} y Context target (next) position y.
   *
   * @returns {Array<Array<number>>|null} Array of bezier curves attributes.
   */
  __arcToBezier(px, py, rx, ry, xAxisRotation, largeFlag, sweepFlag, x, y) {
    const sinPhi = Math.sin(xAxisRotation * Math.PI / 180);
    const cosPhi = Math.cos(xAxisRotation * Math.PI / 180);

    const x1p = cosPhi * (px - x) / 2 + sinPhi * (py - y) / 2;
    const y1p = -sinPhi * (px - x) / 2 + cosPhi * (py - y) / 2;

    if (x1p === 0 && y1p === 0 || rx === 0 || ry === 0)
      return;

    rx = Math.abs(rx);
    ry = Math.abs(ry);

    const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);

    if (lambda > 1) {
      const lambdaRt = Math.sqrt(lambda);
      rx *= lambdaRt;
      ry *= lambdaRt;
    }

    const center = this.__getArcCenter(px, py, x, y, largeFlag, sweepFlag, rx, ry, sinPhi, cosPhi);
    const curves = [];
    let theta = center[2];
    let deltaTheta = center[3];

    const segments = Math.max(Math.ceil(Math.abs(deltaTheta) / (Math.PI * 0.5)), 1);
    deltaTheta /= segments;

    for (let i = 0; i < segments; i++) {
      curves.push(this.__approxUnitArc(theta, deltaTheta));
      theta += deltaTheta;
    }

    return curves.map(function (curve) {
      for (let i = 0; i < curve.length; i += 2) {
        const x = curve[i] * rx;
        const y = curve[i + 1] * ry;
        const xp = cosPhi * x - sinPhi * y;
        const yp = sinPhi * x + cosPhi * y;

        curve[i] = xp + center[0];
        curve[i + 1] = yp + center[1];
      }

      return curve;
    });
  }
}
