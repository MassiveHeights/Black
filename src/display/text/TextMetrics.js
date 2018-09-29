/**
 * Object representing text measurement result.
 * 
 * @cat display.text
 */
/* @echo EXPORT */
class TextMetricsData {
  constructor() {

    /**
     * Array of TextSegmentMetricsData objects containing style, bounds and other metrics information for each segment,
     * @type {Array<TextSegmentMetricsData>}
     */
    this.segments = []; // TextPartMetricsData

    /**
     * The sum bounds, including all segments.
     * @type {Rectangle}
     */
    this.bounds = new Rectangle();

    /**
     * Bounds plus stroke size.
     * @type {Rectangle}
     */
    this.strokeBounds = null;

    /**
     * Bounds of text shadow.
     * @type {Rectangle}
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
/* @echo EXPORT */
class TextSegmentMetricsData {
  constructor(text, style, lineIndex, bounds) {

    /**
     * Text value for this segment.
     * @type {string}
     */
    this.text = text;

    /**
     * The style of this segment.
     * @type {TextStyle}
     */
    this.style = style;

    /**
     * The line index for this segment.
     * @type {number}
     */
    this.lineIndex = lineIndex;

    /**
     * The bounds of this segment.
     * @type {Rectangle}
     */
    this.bounds = bounds;
  }
}

/**
 * Provides native text measurement tools
 * 
 * @cat display.text
 * @static
 */
/* @echo EXPORT */
class TextMetricsEx {
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
   * @param {...TextStyle} styles The TextStyle object representing text properties and formatting.
   * 
   * @returns {TextMetricsData} Object representing bounds for each rich text part.
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
   * @param {TextStyle} style     The TextStyle object representing text properties and formatting.
   * @param {?Rectangle} [outBounds=null] Out param into which bounds of the text will be stored.
   * @returns {Rectangle} Bounds of the text;
   */
  static __measure(text, style, outBounds = null) {
    Debug.assert(style != null, 'Style cannot be null');

    outBounds = outBounds || new Rectangle();
    outBounds.zero();

    let span = TextMetricsEx.__span;

    if (TextMetricsEx.__span === null) {
      TextMetricsEx.__span = /** @type {HTMLElement} */ (document.createElement('span'));
      span = /** @type {HTMLElement} */ (TextMetricsEx.__span);
      span.id = 'font';
      span.style.position = 'absolute';
      span.style.width = 'auto';
      span.style.height = 'auto';
      span.style.top = '0px';
      span.style.left = '0px';
      span.style.display = 'inline-block';
      span.style.border = '1px solid green';
      span.style.color = '#00ff00';
      span.style.verticalAlign = 'baseline';
      span.style.whiteSpace = 'nowrap'; //pre
      span.style.lineHeight = 'normal';
      span.style.top = '-9999px';
      span.style.left = '-9999px';
      document.body.appendChild(span);
    }

    span.style.fontFamily = style.family;
    span.style.fontSize = `${style.size}px`;
    span.style.fontWeight = style.weight;
    span.style.fontStyle = style.style;

    let fontMetrics = FontMetrics.get(style.family);
    span.innerHTML = text.replace(/ /g, '&nbsp');

    outBounds.set(0, fontMetrics.baselineNormalized * style.size, span.offsetWidth + 2, fontMetrics.bottomNormalized * style.size + 2);
    return outBounds;
  }

  /**
   * Measures the area of provided text
   * 
   * @static
   * @param {string} text 
   * @param {BitmapFontData} data 
   * @param {number} lineHeight 
   * @param {Rectangle} outBounds 
   * @returns {Rectangle}
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

/**
 * @ignore
 * @private
 * @static
 * @type {HTMLElement|null}
 */
TextMetricsEx.__span = null;

/**
 * @ignore
 * @private
 * @static
 */
TextMetricsEx.NEWLINE_REGEX = /\r?\n/;