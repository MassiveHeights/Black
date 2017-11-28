// @ifdef DEBUG
/**
 * Utility class for logging and debugging.
 *
 * @cat core
 */
/* @echo EXPORT */
class Debug {
  constructor() {
    Debug.assert(false, 'Static class.');
  }

  static assert(value, message) {
    if (value === true)
      return;

    message = message == null ? 'Assertation failed.' : message;

    if (Debug.logOnFail)
      console.error('[ASSERT]', message);

    if (Debug.throwOnFail)
      throw new Error(message);
  }

  /**
   * Outputs a message to the console
   * 
   * @param  {...string} ...message
   */
  static log(...message) {
    console.info('%c%s', 'color: #000000', 'LOG:', ...message);
  }

  /**
   * Outputs a info message to the console
   * 
   * @param  {...string} ...message
   */
  static info(...message) {
    console.info('%c%s', 'color: #003bd2', 'INFO:', ...message);
  }

  /**
   * Outputs a warning message to the console
   * 
   * @param  {...string} ...message
   */
  static warn(...message) {
    console.info('%c%s', 'color: #f67400', ...message);
  }

  /**
   * Outputs a error message to the console
   * 
   * @param  {...string} ...message
   */
  static error(...message) {
    console.info('%c%s', 'color: #d50000', 'ERROR:', ...message);
  }

  /**
   * Allows to watching GameObject variables
   * 
   * @param  {GameObject} gameObject
   * @param  {any} ...proprties
   */
  static drawObject(gameObject, ...proprties) {
    if (!gameObject.root) {
      Debug.warn('Game Object should have parent.');
      return;
    }

    const columnValueOffset = 3;
    const textOffset = 2;

    let ctx = Black.instance.video.__debugContext;
    let bounds = gameObject.getBounds(gameObject.root, true);
    let definedProperty = [];
    let columnNameWidth = 0;
    let columnValueWidth = 0;

    Debug.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
    ctx.font = `${Debug.fontSize}px ${Debug.font}`;

    for (let i = 0; i < proprties.length; i++) {
      let name = proprties[i];
      let value = gameObject[proprties[i]];

      if (value !== undefined) {
        value = typeof value === 'number' ? value.toFixed(2) : value;
        value = ': ' + value;
        definedProperty.push({ name, value });

        let nameWidth = ctx.measureText(definedProperty[i].name).width;
        let valueWidth = ctx.measureText(definedProperty[i].value).width;

        columnNameWidth = nameWidth > columnNameWidth ? nameWidth : columnNameWidth;
        columnValueWidth = valueWidth > columnValueWidth ? valueWidth : columnValueWidth;
      }
    }

    if (definedProperty.length > 0) {
      let rectWidth = columnNameWidth + columnValueWidth + columnValueOffset + textOffset * 2;
      let rectHeight = (Debug.fontSize + textOffset) * definedProperty.length + textOffset;

      ctx.fillStyle = Debug.colors.main;
      ctx.fillRect(bounds.x, bounds.y - 1, rectWidth, rectHeight);
      ctx.textBaseline = 'hanging';

      ctx.fillStyle = Debug.colors.text;
      for (let i = 0; i < definedProperty.length; i++) {
        let xx = bounds.x + textOffset;
        let yy = bounds.y + (Debug.fontSize + textOffset) * i;
        let string = definedProperty[i].name;
        ctx.fillText(string, xx, yy);
      }

      for (let i = 0; i < definedProperty.length; i++) {
        let xx = bounds.x + columnNameWidth + columnValueOffset + textOffset;
        let yy = bounds.y + (Debug.fontSize + textOffset) * i;
        let string = definedProperty[i].value;
        let stringWidth = ctx.measureText(string).width;
        ctx.fillText(string, xx, yy);
      }
    }
  }

  /**
   * 
   * @param  {number} x
   * @param  {number} y
   * @param  {string} string
   * @param  {number=} alignX=0
   * @param  {number=} alignY=0
   */
  static drawText(x, y, string, alignX = 0, alignY = 0) {
    let ctx = Black.instance.video.__debugContext;
    const offset = 3;

    ctx.font = `${Debug.fontSize}px ${Debug.font}`;
    ctx.textBaseline = 'hanging';

    let textWidth = ctx.measureText(string).width;
    let textHeight = Debug.fontSize;

    let rectWidth = textWidth + (offset * 2);
    let rectHeight = textHeight + (offset * 2);
    let rectX = x - (rectWidth * alignX);
    let rectY = y - (rectHeight * alignY);

    let textX = (x + offset) - (rectWidth * alignX);
    let textY = (y + offset) - (rectHeight * alignY);

    ctx.fillStyle = Debug.colors.main;
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    ctx.fillStyle = Debug.colors.text;
    ctx.fillText(string, textX, textY);
  }

  /**
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   */
  static drawLine(x1, y1, x2, y2) {
    let ctx = Black.instance.video.__debugContext;
    ctx.strokeStyle = Debug.colors.main;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.closePath();
    ctx.stroke();
  }

  /**
   * @param  {number} x
   * @param  {number} y
   * @param  {number} width
   * @param  {number} height
   */
  static drawRect(x, y, width, height) {
    let ctx = Black.instance.video.__debugContext;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.strokeStyle = Debug.colors.main;
    ctx.fillStyle = Debug.colors.extra;

    ctx.rect(x, y, width, height);

    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
  
  /**
   * @param  {number} x
   * @param  {number} y
   * @param  {number} radius
   */
  static drawCircle(x, y, radius) {
    let ctx = Black.instance.video.__debugContext;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.strokeStyle = Debug.colors.main;
    ctx.fillStyle = Debug.colors.extra;

    ctx.arc(x, y, radius, 0, 2 * Math.PI);

    ctx.fill();
    ctx.moveTo(x, y);

    ctx.arc(x, y, 1, 0, 2 * Math.PI);
    ctx.stroke();
  }
  
  /**
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   */
  static drawRuler(x1, y1, x2, y2) {
    let ctx = Black.instance.video.__debugContext;

    let distance = Math.round(MathEx.distance(x1, y1, x2, y2));
    this.drawTextLine(x1, y1, x2, y2, distance);
  }
  
  /**
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   * @param  {string} string
   */
  static drawTextLine(x1, y1, x2, y2, string) {
    let ctx = Black.instance.video.__debugContext;

    if (string === undefined || string.length === 0) {
      this.drawLine(x1, y1, x2, y2);
      return;
    }

    let distance = MathEx.distance(x1, y1, x2, y2);
    let angle = MathEx.angleBetween(x1, y1, x2, y2);
    let flipText = Math.abs(angle) >= Math.PI / 2;

    let textWidth = ctx.measureText(string).width;
    let textX = flipText ? -(distance / 2 + textWidth / 2) : (distance / 2 - textWidth / 2);
    let clearOffset = 10;

    ctx.font = `${Debug.fontSize}px ${Debug.font}`;
    ctx.save();
    ctx.translate(x1, y1);
    ctx.rotate(angle);

    Debug.drawLine(0, 0, distance, 0, Debug.colors.main);

    if (flipText)
      ctx.scale(-1, -1);

    Debug.drawText(textX, 0, string, 0, 0.5);

    ctx.restore();
  }
  
  /**
   * @param  {GameObject} gameObject
   */
  static drawBounds(gameObject) {
    if (!gameObject.root) {
      Debug.warn('Game Object should have parent.');
      return;
    }

    let ctx = Black.instance.video.__debugContext;
    ctx.strokeStyle = Debug.colors.main;
    ctx.fillStyle = Debug.colors.main;

    let bounds = gameObject.getBounds(gameObject.root, true);

    let stringPosition = Math.round(bounds.x) + ';' + Math.round(bounds.y);
    let stringSize = Math.round(bounds.width) + ' x ' + Math.round(bounds.height);

    Debug.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);

    Debug.drawText(bounds.x, bounds.y, stringPosition);
    Debug.drawText(bounds.x + bounds.width, bounds.y + bounds.height, stringSize, 1, 1);
  }
}

Debug.throwOnFail = false;
Debug.logOnFail = true;

Debug.fontSize = 8;
Debug.font = 'PF Ronda Seven Regular';
Debug.colors = {
  extra: 'rgba(13, 82, 205, 0.1)',
  main: 'rgba(242, 173, 50, 0.9)',
  text: 'rgba(20, 20, 20, 1)'
};
// @endif