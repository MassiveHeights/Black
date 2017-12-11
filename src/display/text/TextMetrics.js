/* @echo EXPORT */
class TextMetricsEx {
  constructor() {
    throw new Error('Singlton');
  }

  static measure(text, info, lineHeight, outBounds) {
    outBounds = outBounds || new Rectangle();

    let lineBounds = [];

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

    span.style.fontFamily = info.name;
    span.style.fontSize = `${info.size}px`;

    let fontMetrics = FontMetrics.get(info.name);

    let lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
      span.innerHTML = lines[i].replace(/ /g, '&nbsp');

      const bounds = new Rectangle(0, (fontMetrics.baselineNormalized * info.size) * i * lineHeight, span.offsetWidth, fontMetrics.bottomNormalized * info.size);
      lineBounds.push(bounds);

      outBounds.union(bounds);
    }

    return lineBounds;
  }

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

TextMetricsEx.__span = null;