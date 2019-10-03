import { CapsStyle } from "../display/CapsStyle";
import { JointStyle } from "../display/JointStyle";
import { FillRule } from "../display/FillRule";

/**
 * Black Vector Graphics style
 * Helper class for BVG style parse
 *
 * @cat parsers
 */
export class BVGStyle {
  /**
   * Creates new instance of BVGStyle.
   */
  constructor() {

    /**
     * Stroke color
     *
     * @private 
     * @type {string} */
    this.L = '-';

    /**
     * Stroke alpha.
     *
     * @private 
     * @type {number} */
    this.l = 1;

    /**
     * Line width.
     *
     * @private 
     * @type {number} */
    this.w = 1;

    /**
     * Fill color.
     *
     * @private 
     * @type {string}*/
    this.F = '0';

    /**
     * Fill alpha.
     *
     * @private 
     * @type {number} */
    this.f = 1;

    /**
     * Fill rule.
     * {nonzero: 1, evenodd: 0}
     *
     * @private 
     * @type {number} */
    this.r = 1;

    /**
     * Line cap.
     * {butt: 'b', round: 'r', square: 's'}
     *
     * @private 
     * @type {string} */
    this.c = 'b';

    /**
     * Line join.
     * {miter: 'm', round: 'r', bevel: 'b'}
     *
     * @private 
     * @type {string} */
    this.j = 'm';

    /**
     * Miter limit.
     *
     * @private 
     * @type {number} */
    this.m = 4;

    /**
     * Global alpha.
     *
     * @private 
     * @type {number} */
    this.a = 1;

    /**
     * Line dash.
     *
     * @private 
     * @type {string} */
    this.d = '';

    /**
     * Fill necessity flag.
     *
     * @public 
     * @type {boolean} 
     */
    this.needsFill = true;

    /**
     * Stroke necessity flag.
     *
     * @public 
     * @type {boolean} 
     */
    this.needsStroke = false;

    /** 
     * @public 
     * @type {number} 
     */
    this.fillColor = 0;

    /** 
     * @public 
     * @type {number} 
     */
    this.fillAlpha = 1;

    /** 
     * @public 
     * @type {number} 
     */
    this.lineColor = 0;

    /** 
     * @public 
     * @type {number} 
     */
    this.lineAlpha = 1;

    /** 
     * @public 
     * @type {number} 
     */
    this.lineWidth = 1;

    /** 
     * @public 
     * @type {black-engine~CapsStyle} 
     */
    this.lineCap = CapsStyle.NONE;

    /** 
     * @public 
     * @type {black-engine~JointStyle} 
     */
    this.lineJoin = JointStyle.MITER;

    /** 
     * @public 
     * @type {number} 
     */
    this.miterLimit = this.m;

    /** 
     * @public 
     * @type {black-engine~FillRule} 
     */
    this.fillRule = FillRule.NONE_ZERO;

    /**
     * Line dash segments length, unit.
     *
     * @public 
     * @type {Array<number>} 
     */
    this.lineDash = [];
  }

  /**
   * Merge parent style to this.
   *
   * @public
   * @param {black-engine~BVGStyle} style Parent style
   *
   * @returns {void}
   */
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

    if (style.r)
      this.r = style.r;

    if (style.c)
      this.c = style.c;

    if (style.j)
      this.j = style.j;

    if (style.m)
      this.m = style.m;

    if (style.a)
      this.a = style.a;

    if (style.d)
      this.d = style.d;
  }

  /**
   * Update readable properties to use this style.
   *
   * @public
   *
   * @returns {void}
   */
  compute() {
    this.needsFill = this.F !== '-';

    if (this.needsFill)
      this.fillColor = parseInt(this.F, 16);

    this.lineWidth = +this.w;
    this.needsStroke = this.L !== '-' && this.lineWidth > 0;

    if (this.needsStroke)
      this.lineColor = parseInt(this.L, 16);

    const alpha = Number(this.a);
    this.lineAlpha = Number(this.l) * alpha;
    this.fillAlpha = Number(this.f) * alpha;

    this.lineCap = { b: CapsStyle.NONE, r: CapsStyle.ROUND, s: CapsStyle.SQUARE }[this.c];
    this.lineJoin = { m: JointStyle.MITER, r: JointStyle.ROUND, b: JointStyle.BEVEL }[this.j];
    this.miterLimit = Number(this.m);
    this.fillRule = { 1: FillRule.NONE_ZERO, 0: FillRule.EVEN_ODD }[this.r];
    this.lineDash = this.d.split(',').map(v => Number(v));
  }

  /**
   * Create copy of this style.
   *
   * @public
   *
   * @returns {black-engine~BVGStyle} Created style.
   */
  clone() {
    let s = new BVGStyle();
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
