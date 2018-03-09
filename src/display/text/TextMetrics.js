class TextMetricsData {
  constructor() {
    this.segments = []; // TextPartMetricsData
    this.bounds = new Rectangle();
    this.strokeBounds = null;
    this.lineWidth = [];
  }
}

class TextSegmentMetricsData {
  constructor(text, style, lineIndex, bounds) {
    this.text = text;
    this.style = style;
    this.lineIndex = lineIndex;
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
    throw new Error('Singlton');
  }

  /**
   * Measures the area of provided text.
   * In case style is not defined the default style will be used.
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
        parts.push({ tag: currTag, text: m[3], style: styles.find(x => x.name === currTag), lineIndex: lineIx });
    }

    let data = new TextMetricsData();
    let defaultStyle = styles.find(x => x.name === 'def') || TextStyle.default;
    let lineHeightPx = defaultStyle.size * lineHeight;
    let sumBounds = new Rectangle();
    let sumStrokeBounds = new Rectangle();

    let lastLineIndex = -1;
    let currentX = 0;
    let currentY = 0;
    let lastBounds = null;
    
    let defaultFontMetrics = FontMetrics.get(defaultStyle.family);
    let defaultBaseline = defaultFontMetrics.baselineNormalized * defaultStyle.size;    

    for (let i = 0; i < parts.length; i++) {
      let part = parts[i];
      let bounds = TextMetricsEx.__measure(part.text, part.style);
      let baseline = FontMetrics.get(part.style.family).baselineNormalized * part.style.size;

      if (lastLineIndex !== part.lineIndex){
        data.lineWidth.push(0);
        currentX = 0;
      }
      
      currentY = (lineHeightPx * part.lineIndex) + defaultBaseline - baseline;
      
      bounds.x = currentX;
      bounds.y = currentY;
      
      currentX += bounds.width;
      
      lastLineIndex = part.lineIndex;
      
      part.bounds = bounds;
      data.lineWidth[part.lineIndex] += bounds.width;
      
      sumBounds.union(bounds);
      sumStrokeBounds.union(bounds.clone().inflate(part.style.strokeThickness, part.style.strokeThickness));

      data.segments.push(new TextSegmentMetricsData(part.text, part.style, part.lineIndex, part.bounds));
    }
    

    data.bounds = sumBounds;
    data.strokeBounds = sumStrokeBounds;

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
      span = TextMetricsEx.__span = document.createElement('span');
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

    outBounds.set(0, (fontMetrics.baselineNormalized * style.size), span.offsetWidth, fontMetrics.bottomNormalized * style.size);
    return outBounds;
  }

  /**
   * Measures the area of provided text
   * 
   * @static
   * @param {string} text 
   * @param {string|BitmapFontData} data 
   * @param {number} lineHeight 
   * @param {Rectangle} outBounds 
   * @returns {Rectangle}
   */
  static measureBitmap(text, data, lineHeight, outBounds) {
    outBounds = outBounds || new Rectangle();

    let prevCharCode = null;
    let cx = 0;
    let cy = 0;

    let maxHeight = 0;
    let maxWidth = 0;

    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);

      if (/(?:\r\n|\r|\n)/.test(text.charAt(i))) {
        cx = 0;
        cy += data.lineHeight * lineHeight;
        prevCharCode = null;
        continue;
      }

      let charData = data.chars[charCode];

      if (charData == null)
        continue;

      if (prevCharCode && charData.kerning[prevCharCode])
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
 */
TextMetricsEx.__span = null;
TextMetricsEx.NEWLINE_REGEX = /\r?\n/;