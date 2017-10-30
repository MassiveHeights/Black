/* @echo EXPORT */
class TextMetrics {
  constructor() {
    throw new Error('Singlton');
  }

  static measure(text, info, lineHeight, outBounds) {
    outBounds = outBounds || new Rectangle();

    let lineBounds = [];

    let span = TextMetrics.__span;

    if (TextMetrics.__span === null) {
      span = TextMetrics.__span = document.createElement('span');
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

      //   console.log(fontMetrics.baselineNormalized);

      outBounds.union(bounds);
    }

    //console.log(lineBounds[lineBounds.length-1].y);
    

    //console.log(outBounds.width);
    

    return lineBounds;
  }
}

TextMetrics.__span = null;