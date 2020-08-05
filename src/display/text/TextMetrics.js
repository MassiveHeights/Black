import { Rectangle } from "../../geom/Rectangle";
import { TextStyle } from "./TextStyle";
import { FontMetrics } from "./FontMetrics";
import { Debug } from "../../core/Debug";
import { FontStyle } from "./styles/FontStyle";

/**
 * Object representing text measurement result.
 * 
 * @cat display.text
 */
export class TextMetricsData {
  constructor() {

    /**
     * Array of TextSegmentMetricsData objects containing style, bounds and other metrics information for each segment,
     * @type {Array<black-engine~TextSegmentMetricsData>}
     */
    this.segments = []; // TextPartMetricsData

    /**
     * The sum bounds, including all segments.
     * @type {black-engine~Rectangle}
     */
    this.bounds = new Rectangle();

    /**
     * Bounds plus stroke size.
     * @type {black-engine~Rectangle}
     */
    this.strokeBounds = null;

    /**
     * Bounds of text shadow.
     * @type {black-engine~Rectangle}
     */
    this.shadowBounds = null;

    /**
     * Array if widths for each line.
     * @type {Array<number>}
     */
    this.lineWidth = [];
  }
}

/**
 * Object representing text segment measurement result.
 * 
 * @cat display.text
 */
export class TextSegmentMetricsData {
  constructor(text, style, lineIndex, bounds) {

    /**
     * Text value for this segment.
     * @type {string}
     */
    this.text = text;

    /**
     * The style of this segment.
     * @type {black-engine~TextStyle}
     */
    this.style = style;

    /**
     * The line index for this segment.
     * @type {number}
     */
    this.lineIndex = lineIndex;

    /**
     * The bounds of this segment.
     * @type {black-engine~Rectangle}
     */
    this.bounds = bounds;
  }
}


/**
 * @ignore
 * @private
 * @static
 * @type {HTMLElement|Element|null}
 */
let canvasElement = null;
let context = null;

/**
 * Provides native text measurement tools
 * 
 * @cat display.text
 * @static
 */
export class TextMetricsEx {
  constructor() {
    throw new Error('Singleton');
  }

  /**
   * Measures the area of provided text. In case style is not defined the default style will be used. Text is vertically
   * aligned by its baseline. 
   * 
   * @static
   * @param {string} text                            The text to measure.
   * @param {number} lineHeight                      The height of the line.
   * @param {...black-engine~TextStyle} styles The TextStyle object representing text properties and formatting.
   * 
   * @returns {black-engine~TextMetricsData} Object representing bounds for each rich text part.
   */
  static measure(text, lineHeight, ...styles) {
    let parts = [];

    const regex = /(~{([^}]+)}|^)(.+?(?=~{.+}|$|^))|(\n)/gm;

    let m;
    let currTag = 'def';
    let lineIx = 0;

    while ((m = regex.exec(text)) !== null) {
      if (m[4])
        lineIx++;

      if (m[2])
        currTag = m[2];

      if (m[3])
        parts.push({ tag: currTag, text: m[3], style: styles.filter(x => x.name === currTag)[0], lineIndex: lineIx });
    }

    let data = new TextMetricsData();
    let defaultStyle = styles.filter(x => x.name === 'def')[0] || TextStyle.default;
    let lineHeightPx = defaultStyle.size * lineHeight;
    let sumBounds = new Rectangle();
    let sumStrokeBounds = new Rectangle();
    let sumShadowBounds = null;

    let lastLineIndex = -1;
    let currentX = 0;
    let currentY = 0;
    let lastBounds = null;

    let defaultFontMetrics = FontMetrics.get(defaultStyle.family);
    let defaultBaseline = defaultFontMetrics.baselineNormalized * defaultStyle.size;

    for (let i = 0; i < parts.length; i++) {
      let part = parts[i];
      let style = part.style;
      let bounds = TextMetricsEx.__measure(part.text, style);
      let baseline = FontMetrics.get(style.family).baselineNormalized * style.size;

      if (lastLineIndex !== part.lineIndex) {
        data.lineWidth[part.lineIndex] = 0;
        currentX = 0;
      }

      currentY = (lineHeightPx * part.lineIndex) + defaultBaseline - baseline;

      bounds.x = currentX + 2;
      bounds.y = currentY + 2;

      currentX += bounds.width;

      lastLineIndex = part.lineIndex;

      part.bounds = bounds;
      data.lineWidth[part.lineIndex] += bounds.width;

      sumBounds.union(bounds);
      sumStrokeBounds.union(bounds.clone().inflate(style.strokeThickness, style.strokeThickness));

      if (style.dropShadow === true) {
        let shadowBounds = bounds.clone();
        shadowBounds.inflate(style.shadowBlur, style.shadowBlur);
        shadowBounds.x += style.shadowDistanceX;
        shadowBounds.y += style.shadowDistanceY;
        sumShadowBounds = sumShadowBounds || shadowBounds;
        sumShadowBounds.union(shadowBounds);
      }

      data.segments.push(new TextSegmentMetricsData(part.text, style, part.lineIndex, part.bounds));
    }

    data.bounds = sumBounds;
    data.strokeBounds = sumStrokeBounds;
    data.shadowBounds = sumShadowBounds || new Rectangle();

    return data;
  }

  /**
   * Measures the area of provided text. Multiline is not supported.
   * 
   * @static
   * @param {string} text         The text to measure.
   * @param {black-engine~TextStyle} style     The TextStyle object representing text properties and formatting.
   * @param {?black-engine~Rectangle} [outBounds=null] Out param into which bounds of the text will be stored.
   * @returns {black-engine~Rectangle} Bounds of the text;
   */
  static __measure(text, style, outBounds = null) {
    Debug.assert(style != null, 'Style cannot be null');

    outBounds = outBounds || new Rectangle();
    outBounds.zero();

    let fontMetrics = FontMetrics.get(style.family);

    if (canvasElement === null) {
      if (typeof OffscreenCanvas !== 'undefined' && FontMetrics.useOffscreenCanvas === true) {
        // this is only for worker
        canvasElement = new OffscreenCanvas(0, 0);
        context = canvasElement.getContext('2d');
      } else {
        canvasElement = document.createElement('canvas');
        context = canvasElement.getContext('2d');
      }
    }

    let extraX = 0;
    if (style.style === FontStyle.ITALIC)
      extraX = (fontMetrics.bottomNormalized * style.size) / 4;

    context.font = `${style.weight} ${style.style} ${style.size}px "${style.family}"`;
    let width = Math.ceil(context.measureText(text).width);

    return outBounds.set(0, fontMetrics.baselineNormalized * style.size, width + 2 + extraX, fontMetrics.bottomNormalized * style.size + 2);
  }

  /**
   * Measures the area of provided text
   * 
   * @static
   * @param {string} text 
   * @param {black-engine~BitmapFontData} data 
   * @param {number} lineHeight 
   * @param {black-engine~Rectangle} outBounds 
   * @returns {black-engine~Rectangle}
   */
  static measureBitmap(text, data, lineHeight, outBounds) {
    outBounds = outBounds || new Rectangle();

    let prevCharCode = -1;
    let cx = 0;
    let cy = 0;

    let maxHeight = 0;
    let maxWidth = 0;

    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);

      if (/(?:\r\n|\r|\n)/.test(text.charAt(i))) {
        cx = 0;
        cy += data.lineHeight * lineHeight;
        prevCharCode = -1;
        continue;
      }

      let charData = data.chars[charCode];

      if (charData == null)
        continue;

      if (prevCharCode >= 0 && charData.kerning[prevCharCode])
        cx += charData.kerning[prevCharCode];

      cx += charData.xAdvance;

      maxWidth = Math.max(maxWidth, cx + charData.xOffset);
      maxHeight = Math.max(maxHeight, cy + charData.height + charData.yOffset);

      prevCharCode = charCode;
    }

    return outBounds.set(0, 0, maxWidth, maxHeight);
  }
}
