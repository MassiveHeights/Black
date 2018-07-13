class Style {
  constructor() {
    /*
    const CMD_STYLE_LINE = 'L';
    const CMD_STYLE_LINE_ALPHA = 'l';
    const CMD_STYLE_LINE_WIDTH = 'w';
    const CMD_STYLE_FILL = 'F';
    const CMD_STYLE_FILL_RULE = 'r';
    const CMD_STYLE_FILL_ALPHA = 'f';
    const CMD_STYLE_CAPS = 'c';
    const CMD_STYLE_JOINTS = 'j';
    const CMD_STYLE_MITER = 'm';
    const CMD_STYLE_ALPHA = 'a';
    */

    /*
    default values:
      this.L = 0;
      this.l = 1;
      this.w = 1;
      this.F = 0;
      this.f = 1;
      this.r = 1; // non zero
      this.c = 'r';
      this.j = 'r';
      this.m = 4;
      this.a = 1;
    */


    this.L = '-';
    this.l = 1;
    this.w = 1;
    this.F = 0;
    this.f = 1;
    this.r = 1; // non zero
    this.c = 'r';
    this.j = 'r';
    this.m = 4;
    this.a = 1;

    this.needsFill = true;
    this.needsStroke = true;

    this.fillColor = 0;
    this.fillAlpha = 1;

    this.lineColor = 0;
    this.lineAlpha = 1;
    this.lineWidth = 1;

    // this.L = null;
    // this.l = null;
    // this.w = null;
    // this.F = null;
    // this.f = null;
    // this.r = null; // non zero
    // this.c = null;
    // this.j = null;
    // this.m = null;
    // this.a = null;
  }

  merge(style) {
    if (style.F)
      this.F = style.F;

    if (style.L)
      this.L = style.L;

    if (style.w)
      this.w = style.w;

    if (style.l)
      this.l *= style.l;

    if (style.f)
      this.f *= style.f;
  }

  compute() {
    this.needsFill = this.F !== '-';

    if (this.needsFill)
      this.fillColor = parseInt(this.F, 16);

    this.lineWidth = +this.w;
    this.needsStroke = this.L !== '-' && this.lineWidth > 0;

    if (this.needsStroke)
      this.lineColor = parseInt(this.L, 16);

    this.lineAlpha = this.l;
    this.fillAlpha = this.f;

    // this.fillAlpha = 1;
    // this.lineColor = 0;
    // this.lineAlpha = 1;
    // this.lineWidth = 1;
  }

  clone() {
    let s = new Style();
    s.L = this.L;
    s.l = this.l;
    s.w = this.w;
    s.F = this.F;
    s.f = this.f;
    s.r = this.r;
    s.c = this.c;
    s.j = this.j;
    s.m = this.m;
    s.a = this.a;
    return s;
  }


}

const pathCmds = {
  MOVETO     : 'M',
  MOVETO_REL : 'm',
  LINETO     : 'L',
  LINETO_REL : 'l',
  VLINE      : 'V',
  VLINE_REL  : 'v',
  HLINE      : 'H',
  HLINE_REL  : 'h',
  CURVE      : 'C',
  CURVE_REL  : 'c',
  SCURVE     : 'S',
  SCURVE_REL : 's',
  QCURVE     : 'Q',
  QCURVE_REL : 'q',
  SQCURVE    : 'T',
  SQCURVE_REL: 't',
  ARC        : 'A',
  ARC_REL    : 'a',
  CLOSE_PATH : 'Z',
};

const shapeCmds = {
  RECT    : 'r',
  CIRCLE  : 'c',
  ELLIPSE : 'e',
  LINE    : 'l',
  POLYLINE: 's',
  PATH    : 'p',
  POLYGON : 'g',
  CLIPPING: 'm',
};

class BSVParser extends ParserBase {
  constructor(name) {
    super();

    this.mName = name;

    this.mStyles = [];
    this.mGraphics = new Graphics();
  }

  parse(data) {
    super.parse(data);

    this.mStyles = this.__parseStyles();
    this.__traverse(this.data, new Style(), this.mGraphics);
  }

  __traverse(node, parentStyle, graphics) {
    const style = parentStyle.clone();

    if (node.t) {
      const g = new Graphics();

      g.x = node.t[0] || 0;
      g.y = node.t[1] || 0;
      g.scaleX = node.t[2] || 1;
      g.scaleY = node.t[3] || 1;
      g.rotation = node.t[4] || 0;
      g.mPivotX = node.t[5] || 0;
      g.mPivotY = node.t[6] || 0;
      g.mSkewX = node.t[7] || 0;
      g.mSkewY = node.t[8] || 0;

      g.x += g.mPivotX / g.scaleX;
      g.y += g.mPivotY / g.scaleY;

      graphics.addChild(g);
      graphics = g;
    }

    if (node.cmds) {
      const cmds = node.cmds.split('$').map(v => v.trim()).filter(v => v).reverse();

      while (cmds.length > 0) {
        const cmd = cmds.pop();
        const name = cmd[0];
        const args = cmd.slice(1).split(' ').map(v => Number(v));

        graphics.beginPath();

        switch (name) {
          case 'S':
            let newStyle = this.mStyles[args[0]];
            style.merge(newStyle);
            style.compute();

            if (style.needsFill === true)
              graphics.fillStyle(style.fillColor, style.fillAlpha);

            if (style.needsStroke === true)
              graphics.lineStyle(style.lineWidth, style.lineColor, style.lineAlpha);

            break;
          case shapeCmds.PATH:
            this.__drawPath(cmd, graphics);
            break;
          case shapeCmds.RECT:
            graphics.rect(args[0], args[1], args[2], args[3]);
            break;
          case shapeCmds.CIRCLE:
            graphics.circle(args[0], args[1], args[2]);
            break;
          case shapeCmds.ELLIPSE:
            const x = args[0];
            const y = args[1];
            const rx = args[2];
            const ry = args[3];

            const curves = [
              ...this.__arcToBezier(x - rx, y, rx, ry, 0, 0, 0, x + rx, y),
              ...this.__arcToBezier(x + rx, y, rx, ry, 0, 0, 0, x - rx, y),
            ];

            graphics.moveTo(x - rx, y);

            for (let i = 0, l = curves.length; i < l; i++) {
              const c = curves[i];
              graphics.bezierCurveTo(c[2], c[3], c[4], c[5], c[6], c[7]);
            }

            // graphics.moveTo(x, y);
            break;
          case shapeCmds.LINE:
            const x1 = args[0];
            const y1 = args[1];
            const x2 = args[2];
            const y2 = args[3];

            graphics.moveTo(x1, y1);
            graphics.lineTo(x2, y2);
            break;
          case shapeCmds.POLYLINE:
          case shapeCmds.POLYGON:
            const points = cmd.slice(1).split(',');
            graphics.moveTo(points[0], points[1]);

            for (let i = 2, l = points.length; i < l; i += 2) {
              graphics.lineTo(points[i], points[i + 1]);
            }

            name === shapeCmds.POLYGON && graphics.closePath();
            break;
          default:
            break;
        }

        if (style.needsFill === true)
          graphics.fill();

        if (style.needsStroke === true)
          graphics.stroke();
      }
    }

    if (!node.nodes)
      return;

    node.nodes.forEach(c => {
      this.__traverse(c, style, graphics);
    });
  }

  __parseStyles() {
    let obj = this.data;
    let out = [];

    if (!obj.styles)
      return;

    obj.styles.forEach(x => {
      const CMD_STYLE_LINE = 'L';
      const CMD_STYLE_LINE_ALPHA = 'l';
      const CMD_STYLE_LINE_WIDTH = 'w';
      const CMD_STYLE_FILL = 'F';
      const CMD_STYLE_FILL_RULE = 'r';
      const CMD_STYLE_FILL_ALPHA = 'f';
      const CMD_STYLE_CAPS = 'c';
      const CMD_STYLE_JOINTS = 'j';
      const CMD_STYLE_MITER = 'm';
      const CMD_STYLE_ALPHA = 'a';

      let style = {};
      let props = x.split(' ');
      props.forEach(p => {
        let cmd = p[0];
        let val = p.substring(1);
        style[cmd] = val;
      });

      out.push(style);
    });

    return out;
  }

  // ARC TO BEZIER START
  __approxUnitArc(theta1, delta_theta) {
    const alpha = 4 / 3 * Math.tan(delta_theta / 4);

    const x1 = Math.cos(theta1);
    const y1 = Math.sin(theta1);
    const x2 = Math.cos(theta1 + delta_theta);
    const y2 = Math.sin(theta1 + delta_theta);

    return [
      x1, y1,
      x1 - y1 * alpha, y1 + x1 * alpha,
      x2 + y2 * alpha, y2 - x2 * alpha,
      x2, y2,
    ];
  }

  __vectorAngle(ux, uy, vx, vy) {
    let sign = (ux * vy - uy * vx < 0) ? -1 : 1;
    let dot = ux * vx + uy * vy;

    if (dot > 1.0) {
      dot = 1.0;
    }

    if (dot < -1.0) {
      dot = -1.0;
    }

    return sign * Math.acos(dot);
  }

  __getArcCenter(x1, y1, x2, y2, fa, fs, rx, ry, sin_phi, cos_phi) {
    const x1p = cos_phi * (x1 - x2) / 2 + sin_phi * (y1 - y2) / 2;
    const y1p = -sin_phi * (x1 - x2) / 2 + cos_phi * (y1 - y2) / 2;

    const rx_sq = rx * rx;
    const ry_sq = ry * ry;
    const x1p_sq = x1p * x1p;
    const y1p_sq = y1p * y1p;

    let radicant = (rx_sq * ry_sq) - (rx_sq * y1p_sq) - (ry_sq * x1p_sq);

    if (radicant < 0) {
      radicant = 0;
    }

    radicant /= (rx_sq * y1p_sq) + (ry_sq * x1p_sq);
    radicant = Math.sqrt(radicant) * (fa === fs ? -1 : 1);

    const cxp = radicant * rx / ry * y1p;
    const cyp = radicant * -ry / rx * x1p;

    const cx = cos_phi * cxp - sin_phi * cyp + (x1 + x2) / 2;
    const cy = sin_phi * cxp + cos_phi * cyp + (y1 + y2) / 2;

    const v1x = (x1p - cxp) / rx;
    const v1y = (y1p - cyp) / ry;
    const v2x = (-x1p - cxp) / rx;
    const v2y = (-y1p - cyp) / ry;

    const theta1 = this.__vectorAngle(1, 0, v1x, v1y);
    let delta_theta = this.__vectorAngle(v1x, v1y, v2x, v2y);

    if (fs === 0 && delta_theta > 0) {
      delta_theta -= Math.PI * 2;
    }
    if (fs === 1 && delta_theta < 0) {
      delta_theta += Math.PI * 2;
    }

    return [cx, cy, theta1, delta_theta];
  }

  __arcToBezier(px, py, rx, ry, xAxisRotation, largeFlag, sweepFlag, x, y) {
    const sin_phi = Math.sin(xAxisRotation * Math.PI / 180);
    const cos_phi = Math.cos(xAxisRotation * Math.PI / 180);

    const x1p = cos_phi * (px - x) / 2 + sin_phi * (py - y) / 2;
    const y1p = -sin_phi * (px - x) / 2 + cos_phi * (py - y) / 2;

    if (x1p === 0 && y1p === 0)
      return;

    if (rx === 0 || ry === 0)
      return;

    rx = Math.abs(rx);
    ry = Math.abs(ry);

    const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);

    if (lambda > 1) {
      rx *= Math.sqrt(lambda);
      ry *= Math.sqrt(lambda);
    }

    const cc = this.__getArcCenter(px, py, x, y, largeFlag, sweepFlag, rx, ry, sin_phi, cos_phi);

    const result = [];
    let theta1 = cc[2];
    let delta_theta = cc[3];

    // Split an arc to multiple segments, so each segment
    // will be less than τ/4 (= 90°)
    //
    const segments = Math.max(Math.ceil(Math.abs(delta_theta) / (Math.PI * 0.5)), 1);
    delta_theta /= segments;

    for (let i = 0; i < segments; i++) {
      result.push(this.__approxUnitArc(theta1, delta_theta));
      theta1 += delta_theta;
    }

    return result.map(function (curve) {
      for (let i = 0; i < curve.length; i += 2) {
        let x = curve[i];
        let y = curve[i + 1];

        // scale
        x *= rx;
        y *= ry;

        // rotate
        const xp = cos_phi * x - sin_phi * y;
        const yp = sin_phi * x + cos_phi * y;

        // translate
        curve[i] = xp + cc[0];
        curve[i + 1] = yp + cc[1];
      }

      return curve;
    });
  }

  // ARC TO BEZIER END

  __drawPath(data, graphics) {
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
          graphics.moveTo(x, y);
          mx = x;
          my = y;
          break;
        case pathCmds.LINETO:
        case pathCmds.LINETO_REL:
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphics.lineTo(x, y);
          break;
        case pathCmds.VLINE:
        case pathCmds.VLINE_REL:
          y = values.pop() + relY;
          graphics.lineTo(x, y);
          break;
        case pathCmds.HLINE:
        case pathCmds.HLINE_REL:
          x = values.pop() + relX;
          graphics.lineTo(x, y);
          break;
        case pathCmds.CURVE:
        case pathCmds.CURVE_REL: {
          const cp1x = values.pop() + relX;
          const cp1y = values.pop() + relY;
          const cp2x = values.pop() + relX;
          const cp2y = values.pop() + relY;
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphics.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
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
          graphics.bezierCurveTo(bcx, bcy, cp2x, cp2y, x, y);
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
          graphics.quadraticCurveTo(cpx, cpy, x, y);
          qcx = x * 2 - cpx;
          qcy = y * 2 - cpy;
          break;
        }
        case pathCmds.SQCURVE:
        case pathCmds.SQCURVE_REL: {
          const cpx = values.pop();
          const cpy = values.pop();
          x = values.pop() + relX;
          y = values.pop() + relY;
          graphics.quadraticCurveTo(cpx, cpy, x, y);
          qcx = x * 2 - cpx;
          qcy = y * 2 - cpy;
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
            graphics.bezierCurveTo(c[2], c[3], c[4], c[5], c[6], c[7]);
          }

          break;
        }
        case pathCmds.CLOSE_PATH:
          graphics.closePath();
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
}
