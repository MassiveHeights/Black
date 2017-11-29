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
   * @param  {any} ...properties
   */
  static drawObject(gameObject, ...properties) {
    if (!gameObject.root) {
      Debug.warn('Game Object should have parent.');
      return;
    }

    Debug.__init();

    const fontData = Debug.__textRenderer.data;

    const columnValueOffset = 2;
    const textOffset = 4;

    let ctx = Black.instance.video.__debugContext;
    let bounds = gameObject.getBounds(gameObject.stage, true);
    let definedProperty = [];
    let columnNameWidth = 0;
    let columnValueWidth = 0;

    Debug.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);

    for (let i = 0; i < properties.length; i++) {
      let name = properties[i];
      let value = gameObject[properties[i]];

      if (value !== undefined) {
        if (typeof value === 'number')
          value = Math.round(value) !== value ? value.toFixed(2) : value;

        value = ': ' + value;

        definedProperty.push({ name, value });

        try {
          let nameWidth = TextMetricsEx.measureBitmap(definedProperty[i].name, fontData, 1).width;
          let valueWidth = TextMetricsEx.measureBitmap(definedProperty[i].value, fontData, 1).width;

          columnNameWidth = nameWidth > columnNameWidth ? nameWidth : columnNameWidth;
          columnValueWidth = valueWidth > columnValueWidth ? valueWidth : columnValueWidth;
        }
        catch (err) {
          debugger;
        }
      }
    }

    if (definedProperty.length > 0) {
      let rectWidth = columnNameWidth + columnValueWidth + columnValueOffset + textOffset * 2;
      let rectHeight = (Debug.fontSize + textOffset) * definedProperty.length + textOffset;

      ctx.fillStyle = Debug.colors.main;
      ctx.fillRect(bounds.x, bounds.y - 1, rectWidth, rectHeight);

      for (let i = 0; i < definedProperty.length; i++) {
        let xx = bounds.x + textOffset;
        let yy = bounds.y + (Debug.fontSize + textOffset) * i;
        let string = definedProperty[i].name;
        Debug.__drawText(string, ctx, xx, yy);
      }

      for (let i = 0; i < definedProperty.length; i++) {
        let xx = bounds.x + columnNameWidth + columnValueOffset + textOffset;
        let yy = bounds.y + (Debug.fontSize + textOffset) * i;
        let string = definedProperty[i].value;
        Debug.__drawText(string, ctx, xx, yy);
      }
    }
  }

  static __drawText(text, ctx, x, y) {
    let r = Debug.__textRenderer;
    r.bounds = TextMetricsEx.measureBitmap(text, Debug.__fontData, 1);
    r.text = text;
    r.render(null); // may cause issues

    let texture = r.texture;
    ctx.drawImage(texture.native, ~~x, ~~y);
  }

  /**
   * 
   * @param  {number} x
   * @param  {number} y
   * @param  {string} string
   */
  static drawText(x, y, string, alignX = 0, alignY = 0) {
    Debug.__init();

    let ctx = Black.instance.video.__debugContext;
    let bounds = TextMetricsEx.measureBitmap(string, Debug.__fontData, 1);

    let rectWidth = bounds.width + 4;
    let rectHeight = bounds.height;

    let rectX = x - (rectWidth * alignX);
    let rectY = y - (rectHeight * alignY);

    let textX = x - (rectWidth * alignX) + 2;
    let textY = y - (rectHeight * alignY) - 1;

    ctx.fillStyle = Debug.colors.main;
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    Debug.__drawText(string, ctx, textX, textY);
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
    ctx.lineWidth = 2;

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
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.strokeStyle = Debug.colors.main;
    ctx.fillStyle = Debug.colors.extra;

    ctx.rect(~~x, ~~y, ~~width, ~~height);

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

  static print(...text) {
    let str = '';
    for (let i = 0; i < text.length; i++) {
      str += text[i];

      if (i < text.length - 1)
        str += ' ';
    }

    Debug.__lines.push({ text: str, time: Time.time, dead: false });
  }

  static __render() {
    let dt = Time.dt;
    let ctx = Black.instance.video.__debugContext;
    let oldAlpha = ctx.globalAlpha;
    let diff = Debug.__printTime - Debug.__printAlphaTime;

    let y = 0;
    for (let i = 0; i < Debug.__lines.length; i++) {
      let line = Debug.__lines[i];
      let alpha = 1;

      if (Time.time - line.time >= Debug.__printAlphaTime) {
        alpha = 1 - (Time.time - line.time - Debug.__printAlphaTime);
        console.log(alpha);
        
        if (alpha <= 0) {
          alpha = 0;
          line.dead = true;
        }
      }

      ctx.globalAlpha = alpha;
      Debug.drawText(0, y, line.text, 0, 0, alpha);
      y += 14;
    }

    for (let i = Debug.__lines.length - 1; i >= 0; i--) {
      let line = Debug.__lines[i];

      if (line.dead === true)
        Debug.__lines.splice(i, 1);
    }

    ctx.globalAlpha = oldAlpha;
  }

  static __init() {
    if (Debug.__inited == true)
      return;

    let xml = new DOMParser().parseFromString(Debug.__xmlData, 'text/xml');

    let image = new Image();
    image.src = Debug.__imageData;

    Debug.__textRenderer = new BitmapTextRenderer();
    Debug.__textRenderer.lineHeight = 1;
    Debug.__textRenderer.data = Debug.__fontData = BitmapFontAsset.parse(xml, new Texture(image));

    Debug.__inited = true;
  }
}

Debug.throwOnFail = false;
Debug.logOnFail = true;

Debug.__printAlphaTime = 4;
Debug.__printTime = 5;
Debug.__lines = [];
Debug.__textRenderer = null;
Debug.__fontData = null;
Debug.__inited = false;
Debug.__imageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAC4FJREFUeNrs3YGSozYWBVCpy///y9pKaifb8SC994To6Z05pyo1HYwBY3SRhMB9jNH+668/evu3H9PeX7uaty1e/7GS92XNljNbb7Tuynp3tif7eXeXVXlPdt7Z/6/2VQs+a2a+6ryf52+L992dJ7P/s/usWm5m76uud1x8tlH4Tv5Z5sfFxPcdd7Xgq3kzB+D7a7Pl9MSO3V3vne2pFv5xY/vvLH823+fXr6avtq0lCnOmcM7m/bwNPfh8d+eZ6ZPtnk0fwefuD6x3bH626xUHNQD+LNUz3Knay1Xt7P1EUJlndYZ8nydzZl2doMZiOyufPzqjV2sVqVrHq1CV6oenV860fWNHPT1/dfrT+2enxvO+zdkmUfXA22kCjRvzRFXjSvU7eybvh0L3S0/Ery848Ks7dlXNutsP0YupfPKLOLV/2gMHyNUZMRsEs76VbLu3PfQZR+EYu7vPrppWO31Yp7YpUxP7+++PQpviVzQPMjurL0Ii8x7+t0968iy7ComoCt6S+37cfL1vvHd8+i8zvU+Op68s/CNxbM+2pb0KhaQf3MhM51JlZ/VDO/fpUBiH9k+0306FbqXTcqfKnamJRO3vneNitp7sPv6VfWYny+VlE6Atdki/sdHZHfurd+6TYdBvFu4WVGuzBaPaCZitvlc6DNuk72HWnLiapy+q35kQeKIJ0L7gmI5OeFEz5KcA6Ik293eq9j+RpL9LNf7k+3twtp8V6tbiS1uZS7DR5efecpeoT9cM+8Ga5+yM3oOTxJEy8jq4YTtVk7E4OK7ap5XlZ+avVCOf3A8n9k/U8fV0sPQDy+xfsC3ZWlUvHGeV5d1Zxs4+WC7jr3EAv/QyBN9S9orA6hp99dJb5nJlpmm2M9/uFaHK59gdD7BzIpgt66dt+AiqaFcrGYlpY7HxI6g6tuTr7z2zo7jusdjuaL7W1iPmRrC/WnF5mfeO5LZEy7vqze+f1pEpxH2yzFkbdkzW1xbL72+1w35jvpEs7JnvpgVBEYVMXzRj+qIZNBvZuazlflwc5GPRvhnByjI9q6tr3qvLF6udUqmyRe3HlvxSZl/oToFYfb7scN+r7yTTzl617/tif/XE/Nnqfk9Oe6ofKDM2Yedyc3Y94yLI++HPeRloH4mOhtlB34OzQ+asU7nHYKfN/PT7TxaIbLu4F7ZhZ3kjWWO6W0McydpapuY3Wm7cwAiq071YkHeOlRH0N6yumJzqtP5nGz42UiM6E0eF66t63kfw74nlZwaMnJjWDkzLNHWiA6a33M1GmRrinUvKs6p95X0t6GN4YkBcdJKMBhv1k4U/CoDVzujJdvJOr+qpGkIvnBV3d+LsQG+Hp40D005UlbO34mYD6jt0Nq/6NcYXrGdWyE+v+7IMvVpupFemX+BuR0mmunXnoDk9vuF3H0q8W1XO3t/RH9zOnjgWo0FDOyNRZ83kzOCk6PJxZeBYtKx/1v/aPLNmDoInUrQdDpTKF5ttx4/D054u2LMzRJ/UAHuhIMymtc3OrhPX1rNhVe2z6cXtrIyD2BkPkOp4/dg8eLIJWylc36laOGs7jkWVODsMtTrt6krInWmVYbKrdnb2akGbvLcnC01PdOpl+lNWfR+Vm4Bm640uObfE69VLtyN4T9Shmx4J2BPT+mSFUe/naPFNG6u7q3bb9Tvhk7201Q9Pa4enZS63VR4t1oLq6Z3q7Go5O49Ei77XO7dpV+4J6DfWX72zcrqNrxtVpGq1KarGVF8/dcks89rTD0CJCtoqSCsPIomaZplq76xNu9qe0c48Z2KnhtgXZ9mnnqtQfR5CFC47/RKpEHgFBa16gP+KJ+FE6Xu3AJ2avnPb7ol+lOhAqz689HTBybZvx6GOsexDNrO1xxNPQtrdR7t9S/+qAWR7e08+IXi3oEQ7ovoUoJMH6G6hrPY87/ZUb1cTCyGbLbhX7+mJgputikdjFVqif2TnmDjxnpE4uc2ebbgacnx5EvlYdHTtFIgnLrX1jcIUNSV2tnMcOitGfR1PnWmztYnscNgWdOpl3xN1uJ66mhSNBzk9ZiJb0xvJ/ZK5JTvbPG/ZPoDqwZIdf97a/duHo/Qfi0SNOhWj5faDhT/7ee/UYO6On+g3l5fZ35VLy5UCuLud0f34UV9TdMWoeqn8id9hWD4UNPrQlR9EyDxwJPr/6mOoswdd1P9x5zHMdwp/P1wId89g/WaoRFeSRrDeWTX3zv31u53BlSZh39ienWck3Bp/8Cp0plU6aZ5op45EFbNyyWf3AaKrMeN3zxxPFNzVc/ArBah6nT57UN8ZcLPTZ5EdlLQa4zGK067WUfmFpjE59lqrjdb96Vh4PVAgswdm9ZFH0ai81S2WdwtcNZnvJvnu8sptwFa7ZHXyNxgyBXS3uVW5pJh9wMmpk1d070H2eQurWmpmHMP43Ak42vXIsWwVJ1MFijp9stWsXjhD9cI6KrfJvu/86M7DzJ2JO3+v7iJbvZ4ZpdaDTtbMPSB9cmxFtcirA38U/u5BU/PUnX69rTuHqyeWyuXazLMywpPfR1BI2uKgyh5I0WvRfNHyMvesR8up3h6bbU9mqq2j1Xu6Z0/THcnXV23v6NLpbidgm3xPqzsFr24fzvw9gprm6rbgljymWzt/12XmO8nWkFPf0Uei4Ow8+edpq+fRVy8bZqrJrRhQmekn9110K/YIzhDZcGht77LcSNbOMo+7vnNmXd3DsXvfRKZWkK0prB6uMxI1wPKYl1eLH+gYVbefeITRaPEz+qs/U10ZybhqW30n2X2QeQjG7GCftVEzl8yqfQCzDsvdAH36vondR6BV3nt3yPtyGa9EZ8yqrXZipN0Ilh0VzCgsZgdvC9qCUUfQV/zGW2vxDVit1S61teT3lrlhqD90oJ7+EQ8WNYBVAW/BgXS3l3S0ewM3ZoV2HD54qlXe3Wu3dx+qmX29WqvZHchV/RnvzPzC4IEAuFMQ7v6m352DcLeNeLqJsvt69fJQ5dJc9vf4MgWuHwi6TJ9LdX4eDoDMI6SrT4BpicIxq+5mayNPjZCrHqirf1eFuXJbaaaNXi2wCtwf4v2XgTJnmD/Z3QEl9iPfykei3bl6TvmPf3cfT7TzGKPoUsjOrxJl/j5R+IdDju8WAJWfn8pUf3cO8kyhmT02u729Pnv/3dthTz/uC75NDSD781PVtnKl8+pqOZnOtFkNIWoT7/7ePfxWfQAtKJgKB/zGNYDW4rHTlTHywP9ZH0Dm1tuhPQu/Zx9A1JZX4OE3bgIAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIABAAgAAABAAgAAABAAgAQAAAAgAQAIAAAAQAIAAAAQAIAEAAAAIAEACAAAAEACAAAAEACABAAAACABAAgAAABAAgAIBd/xFgAOWleEaf1m+qAAAAAElFTkSuQmCC';

Debug.fontSize = 8;
Debug.font = 'Terminal';
Debug.colors = {
  extra: 'rgba(13, 82, 205, 0.1)',
  main: 'rgba(2, 117, 234, 0.7)',
  text: 'rgba(255, 255, 255, 85)'
};

Debug.__xmlData = `<?xml version="1.0"?>
<font>
  <info face="PF Ronda Seven" size="13" bold="0" italic="0" charset="" unicode="1" stretchH="100" smooth="0" aa="1" padding="0,0,0,0" spacing="1,1" outline="0"/>
  <common lineHeight="13" base="11" scaleW="256" scaleH="256" pages="1" packed="0" alphaChnl="0" redChnl="4" greenChnl="4" blueChnl="4"/>
  <pages>
    <page id="0" file="font_0.png" />
  </pages>
  <chars count="230">
    <char id="32" x="147" y="33" width="3" height="1" xoffset="-1" yoffset="12" xadvance="3" page="0" chnl="15" />
    <char id="33" x="85" y="28" width="1" height="7" xoffset="1" yoffset="4" xadvance="3" page="0" chnl="15" />
    <char id="34" x="105" y="34" width="3" height="2" xoffset="0" yoffset="4" xadvance="4" page="0" chnl="15" />
    <char id="35" x="186" y="18" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="36" x="206" y="0" width="5" height="9" xoffset="0" yoffset="3" xadvance="6" page="0" chnl="15" />
    <char id="37" x="217" y="10" width="7" height="7" xoffset="0" yoffset="4" xadvance="8" page="0" chnl="15" />
    <char id="38" x="168" y="19" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="39" x="121" y="34" width="1" height="2" xoffset="0" yoffset="4" xadvance="2" page="0" chnl="15" />
    <char id="40" x="30" y="11" width="3" height="9" xoffset="0" yoffset="3" xadvance="4" page="0" chnl="15" />
    <char id="41" x="34" y="11" width="3" height="9" xoffset="0" yoffset="3" xadvance="4" page="0" chnl="15" />
    <char id="42" x="181" y="26" width="5" height="5" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="43" x="175" y="26" width="5" height="5" xoffset="0" yoffset="5" xadvance="6" page="0" chnl="15" />
    <char id="44" x="71" y="37" width="2" height="3" xoffset="0" yoffset="10" xadvance="3" page="0" chnl="15" />
    <char id="45" x="151" y="33" width="3" height="1" xoffset="0" yoffset="8" xadvance="4" page="0" chnl="15" />
    <char id="46" x="169" y="33" width="1" height="1" xoffset="1" yoffset="10" xadvance="3" page="0" chnl="15" />
    <char id="47" x="218" y="0" width="5" height="9" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="48" x="84" y="20" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="49" x="80" y="28" width="2" height="7" xoffset="0" yoffset="4" xadvance="3" page="0" chnl="15" />
    <char id="50" x="78" y="20" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="51" x="72" y="20" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="52" x="102" y="20" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="53" x="42" y="21" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="54" x="180" y="18" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="55" x="36" y="21" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="56" x="30" y="21" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="57" x="24" y="21" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="58" x="12" y="37" width="1" height="5" xoffset="1" yoffset="6" xadvance="3" page="0" chnl="15" />
    <char id="59" x="77" y="28" width="2" height="7" xoffset="0" yoffset="6" xadvance="3" page="0" chnl="15" />
    <char id="60" x="4" y="38" width="3" height="5" xoffset="0" yoffset="5" xadvance="4" page="0" chnl="15" />
    <char id="61" x="50" y="37" width="3" height="3" xoffset="0" yoffset="6" xadvance="4" page="0" chnl="15" />
    <char id="62" x="245" y="26" width="3" height="5" xoffset="0" yoffset="5" xadvance="4" page="0" chnl="15" />
    <char id="63" x="12" y="21" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="64" x="170" y="0" width="8" height="9" xoffset="0" yoffset="3" xadvance="9" page="0" chnl="15" />
    <char id="65" x="6" y="21" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="66" x="0" y="22" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="67" x="245" y="10" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="68" x="239" y="10" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="69" x="204" y="18" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="70" x="174" y="18" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="71" x="156" y="19" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="72" x="66" y="21" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="73" x="87" y="28" width="1" height="7" xoffset="0" yoffset="4" xadvance="2" page="0" chnl="15" />
    <char id="74" x="20" y="29" width="4" height="7" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="75" x="138" y="19" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="76" x="25" y="29" width="4" height="7" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="77" x="201" y="10" width="7" height="7" xoffset="0" yoffset="4" xadvance="8" page="0" chnl="15" />
    <char id="78" x="210" y="18" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="79" x="198" y="18" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="80" x="144" y="19" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="81" x="71" y="11" width="5" height="8" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="82" x="192" y="18" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="83" x="162" y="19" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="84" x="126" y="20" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="85" x="114" y="20" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="86" x="108" y="20" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="87" x="209" y="10" width="7" height="7" xoffset="0" yoffset="4" xadvance="8" page="0" chnl="15" />
    <char id="88" x="18" y="21" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="89" x="96" y="20" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="90" x="90" y="20" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="91" x="46" y="11" width="3" height="9" xoffset="0" yoffset="3" xadvance="4" page="0" chnl="15" />
    <char id="92" x="242" y="0" width="5" height="9" xoffset="0" yoffset="3" xadvance="6" page="0" chnl="15" />
    <char id="93" x="62" y="11" width="3" height="9" xoffset="0" yoffset="3" xadvance="4" page="0" chnl="15" />
    <char id="94" x="89" y="36" width="3" height="2" xoffset="0" yoffset="4" xadvance="4" page="0" chnl="15" />
    <char id="95" x="143" y="33" width="3" height="1" xoffset="0" yoffset="10" xadvance="4" page="0" chnl="15" />
    <char id="96" x="118" y="34" width="2" height="2" xoffset="0" yoffset="1" xadvance="3" page="0" chnl="15" />
    <char id="97" x="197" y="26" width="4" height="5" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="98" x="35" y="29" width="4" height="7" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="99" x="192" y="26" width="4" height="5" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="100" x="40" y="29" width="4" height="7" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="101" x="187" y="26" width="4" height="5" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="102" x="252" y="18" width="3" height="7" xoffset="0" yoffset="4" xadvance="3" page="0" chnl="15" />
    <char id="103" x="50" y="29" width="4" height="7" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="104" x="55" y="29" width="4" height="7" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="105" x="83" y="28" width="1" height="7" xoffset="0" yoffset="4" xadvance="2" page="0" chnl="15" />
    <char id="106" x="66" y="11" width="2" height="9" xoffset="-1" yoffset="4" xadvance="2" page="0" chnl="15" />
    <char id="107" x="251" y="10" width="4" height="7" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="108" x="91" y="28" width="1" height="7" xoffset="0" yoffset="4" xadvance="2" page="0" chnl="15" />
    <char id="109" x="93" y="28" width="7" height="5" xoffset="0" yoffset="6" xadvance="8" page="0" chnl="15" />
    <char id="110" x="222" y="26" width="4" height="5" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="111" x="217" y="26" width="4" height="5" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="112" x="227" y="18" width="4" height="7" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="113" x="237" y="18" width="4" height="7" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="114" x="249" y="26" width="3" height="5" xoffset="0" yoffset="6" xadvance="4" page="0" chnl="15" />
    <char id="115" x="241" y="26" width="3" height="5" xoffset="0" yoffset="6" xadvance="4" page="0" chnl="15" />
    <char id="116" x="69" y="29" width="3" height="7" xoffset="0" yoffset="4" xadvance="4" page="0" chnl="15" />
    <char id="117" x="202" y="26" width="4" height="5" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="118" x="212" y="26" width="4" height="5" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="119" x="101" y="28" width="7" height="5" xoffset="0" yoffset="6" xadvance="8" page="0" chnl="15" />
    <char id="120" x="207" y="26" width="4" height="5" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="121" x="242" y="18" width="4" height="7" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="122" x="237" y="26" width="3" height="5" xoffset="0" yoffset="6" xadvance="4" page="0" chnl="15" />
    <char id="123" x="38" y="11" width="3" height="9" xoffset="0" yoffset="3" xadvance="4" page="0" chnl="15" />
    <char id="124" x="69" y="11" width="1" height="9" xoffset="0" yoffset="3" xadvance="2" page="0" chnl="15" />
    <char id="125" x="42" y="11" width="3" height="9" xoffset="0" yoffset="3" xadvance="4" page="0" chnl="15" />
    <char id="126" x="84" y="36" width="4" height="2" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="161" x="89" y="28" width="1" height="7" xoffset="1" yoffset="4" xadvance="3" page="0" chnl="15" />
    <char id="162" x="48" y="21" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="163" x="54" y="21" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="164" x="151" y="27" width="5" height="5" xoffset="0" yoffset="5" xadvance="6" page="0" chnl="15" />
    <char id="165" x="60" y="21" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="166" x="254" y="0" width="1" height="9" xoffset="1" yoffset="3" xadvance="3" page="0" chnl="15" />
    <char id="167" x="11" y="11" width="4" height="9" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="168" x="155" y="33" width="3" height="1" xoffset="0" yoffset="2" xadvance="4" page="0" chnl="15" />
    <char id="169" x="161" y="0" width="8" height="9" xoffset="0" yoffset="3" xadvance="9" page="0" chnl="15" />
    <char id="170" x="46" y="37" width="3" height="3" xoffset="0" yoffset="4" xadvance="4" page="0" chnl="15" />
    <char id="171" x="132" y="27" width="6" height="5" xoffset="0" yoffset="5" xadvance="7" page="0" chnl="15" />
    <char id="172" x="42" y="37" width="3" height="3" xoffset="0" yoffset="6" xadvance="4" page="0" chnl="15" />
    <char id="174" x="179" y="0" width="8" height="9" xoffset="0" yoffset="3" xadvance="9" page="0" chnl="15" />
    <char id="175" x="159" y="33" width="3" height="1" xoffset="0" yoffset="2" xadvance="4" page="0" chnl="15" />
    <char id="176" x="58" y="37" width="3" height="3" xoffset="0" yoffset="4" xadvance="4" page="0" chnl="15" />
    <char id="177" x="169" y="27" width="5" height="5" xoffset="0" yoffset="5" xadvance="6" page="0" chnl="15" />
    <char id="178" x="232" y="26" width="4" height="5" xoffset="0" yoffset="1" xadvance="5" page="0" chnl="15" />
    <char id="179" x="227" y="26" width="4" height="5" xoffset="0" yoffset="1" xadvance="5" page="0" chnl="15" />
    <char id="180" x="115" y="34" width="2" height="2" xoffset="0" yoffset="1" xadvance="3" page="0" chnl="15" />
    <char id="181" x="247" y="18" width="4" height="7" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="182" x="0" y="12" width="5" height="9" xoffset="0" yoffset="3" xadvance="6" page="0" chnl="15" />
    <char id="183" x="167" y="33" width="1" height="1" xoffset="1" yoffset="7" xadvance="3" page="0" chnl="15" />
    <char id="184" x="109" y="34" width="2" height="2" xoffset="0" yoffset="11" xadvance="3" page="0" chnl="15" />
    <char id="185" x="253" y="26" width="2" height="5" xoffset="0" yoffset="1" xadvance="3" page="0" chnl="15" />
    <char id="186" x="38" y="37" width="3" height="3" xoffset="0" yoffset="4" xadvance="4" page="0" chnl="15" />
    <char id="187" x="125" y="28" width="6" height="5" xoffset="0" yoffset="5" xadvance="7" page="0" chnl="15" />
    <char id="188" x="151" y="0" width="9" height="9" xoffset="0" yoffset="3" xadvance="10" page="0" chnl="15" />
    <char id="189" x="140" y="0" width="10" height="9" xoffset="0" yoffset="3" xadvance="11" page="0" chnl="15" />
    <char id="190" x="129" y="0" width="10" height="9" xoffset="0" yoffset="3" xadvance="11" page="0" chnl="15" />
    <char id="191" x="132" y="19" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="192" x="66" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="193" x="96" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="194" x="90" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="195" x="24" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="196" x="194" y="0" width="5" height="9" xoffset="0" yoffset="2" xadvance="6" page="0" chnl="15" />
    <char id="197" x="0" y="0" width="5" height="11" xoffset="0" yoffset="0" xadvance="6" page="0" chnl="15" />
    <char id="198" x="171" y="10" width="9" height="7" xoffset="0" yoffset="4" xadvance="10" page="0" chnl="15" />
    <char id="199" x="236" y="0" width="5" height="9" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="200" x="30" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="201" x="102" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="202" x="108" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="203" x="200" y="0" width="5" height="9" xoffset="0" yoffset="2" xadvance="6" page="0" chnl="15" />
    <char id="204" x="126" y="0" width="2" height="10" xoffset="-1" yoffset="1" xadvance="2" page="0" chnl="15" />
    <char id="205" x="123" y="0" width="2" height="10" xoffset="0" yoffset="1" xadvance="2" page="0" chnl="15" />
    <char id="206" x="119" y="0" width="3" height="10" xoffset="-1" yoffset="1" xadvance="2" page="0" chnl="15" />
    <char id="207" x="50" y="11" width="3" height="9" xoffset="-1" yoffset="2" xadvance="2" page="0" chnl="15" />
    <char id="208" x="232" y="10" width="6" height="7" xoffset="0" yoffset="4" xadvance="7" page="0" chnl="15" />
    <char id="209" x="60" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="210" x="12" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="211" x="18" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="212" x="42" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="213" x="54" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="214" x="224" y="0" width="5" height="9" xoffset="0" yoffset="2" xadvance="6" page="0" chnl="15" />
    <char id="215" x="139" y="27" width="5" height="5" xoffset="0" yoffset="5" xadvance="6" page="0" chnl="15" />
    <char id="216" x="120" y="20" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="217" x="72" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="218" x="78" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="219" x="84" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="220" x="230" y="0" width="5" height="9" xoffset="0" yoffset="2" xadvance="6" page="0" chnl="15" />
    <char id="221" x="48" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="222" x="188" y="0" width="5" height="9" xoffset="0" yoffset="3" xadvance="6" page="0" chnl="15" />
    <char id="223" x="150" y="19" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="224" x="97" y="11" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="225" x="92" y="11" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="226" x="87" y="11" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="227" x="82" y="11" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="228" x="5" y="30" width="4" height="7" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="229" x="16" y="11" width="4" height="9" xoffset="0" yoffset="2" xadvance="5" page="0" chnl="15" />
    <char id="230" x="109" y="28" width="7" height="5" xoffset="0" yoffset="6" xadvance="8" page="0" chnl="15" />
    <char id="231" x="10" y="29" width="4" height="7" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="232" x="77" y="11" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="233" x="152" y="10" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="234" x="147" y="10" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="235" x="15" y="29" width="4" height="7" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="236" x="165" y="10" width="2" height="8" xoffset="-1" yoffset="3" xadvance="2" page="0" chnl="15" />
    <char id="237" x="168" y="10" width="2" height="8" xoffset="0" yoffset="3" xadvance="2" page="0" chnl="15" />
    <char id="238" x="161" y="10" width="3" height="8" xoffset="-1" yoffset="3" xadvance="2" page="0" chnl="15" />
    <char id="239" x="65" y="29" width="3" height="7" xoffset="-1" yoffset="4" xadvance="2" page="0" chnl="15" />
    <char id="240" x="6" y="11" width="4" height="9" xoffset="0" yoffset="2" xadvance="5" page="0" chnl="15" />
    <char id="241" x="142" y="10" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="242" x="102" y="11" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="243" x="107" y="11" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="244" x="112" y="11" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="245" x="117" y="11" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="246" x="45" y="29" width="4" height="7" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="247" x="157" y="27" width="5" height="5" xoffset="0" yoffset="5" xadvance="6" page="0" chnl="15" />
    <char id="248" x="163" y="27" width="5" height="5" xoffset="0" yoffset="6" xadvance="6" page="0" chnl="15" />
    <char id="249" x="122" y="11" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="250" x="127" y="11" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="251" x="132" y="10" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="252" x="222" y="18" width="4" height="7" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="253" x="114" y="0" width="4" height="10" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="254" x="232" y="18" width="4" height="7" xoffset="0" yoffset="5" xadvance="5" page="0" chnl="15" />
    <char id="255" x="21" y="11" width="4" height="9" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="305" x="14" y="37" width="1" height="5" xoffset="0" yoffset="6" xadvance="2" page="0" chnl="15" />
    <char id="321" x="216" y="18" width="5" height="7" xoffset="0" yoffset="4" xadvance="6" page="0" chnl="15" />
    <char id="322" x="73" y="28" width="3" height="7" xoffset="0" yoffset="4" xadvance="4" page="0" chnl="15" />
    <char id="338" x="181" y="10" width="9" height="7" xoffset="0" yoffset="4" xadvance="10" page="0" chnl="15" />
    <char id="339" x="117" y="28" width="7" height="5" xoffset="0" yoffset="6" xadvance="8" page="0" chnl="15" />
    <char id="352" x="6" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="353" x="137" y="10" width="4" height="8" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="376" x="212" y="0" width="5" height="9" xoffset="0" yoffset="2" xadvance="6" page="0" chnl="15" />
    <char id="381" x="36" y="0" width="5" height="10" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" />
    <char id="382" x="157" y="10" width="3" height="8" xoffset="0" yoffset="3" xadvance="4" page="0" chnl="15" />
    <char id="402" x="26" y="11" width="3" height="9" xoffset="0" yoffset="3" xadvance="4" page="0" chnl="15" />
    <char id="710" x="97" y="34" width="3" height="2" xoffset="0" yoffset="1" xadvance="4" page="0" chnl="15" />
    <char id="711" x="101" y="34" width="3" height="2" xoffset="0" yoffset="1" xadvance="4" page="0" chnl="15" />
    <char id="728" x="93" y="34" width="3" height="2" xoffset="0" yoffset="1" xadvance="4" page="0" chnl="15" />
    <char id="729" x="171" y="33" width="1" height="1" xoffset="0" yoffset="2" xadvance="2" page="0" chnl="15" />
    <char id="730" x="54" y="37" width="3" height="3" xoffset="0" yoffset="0" xadvance="4" page="0" chnl="15" />
    <char id="731" x="112" y="34" width="2" height="2" xoffset="0" yoffset="11" xadvance="3" page="0" chnl="15" />
    <char id="732" x="74" y="36" width="4" height="2" xoffset="0" yoffset="1" xadvance="5" page="0" chnl="15" />
    <char id="733" x="79" y="36" width="4" height="2" xoffset="0" yoffset="1" xadvance="5" page="0" chnl="15" />
    <char id="956" x="30" y="29" width="4" height="7" xoffset="0" yoffset="6" xadvance="5" page="0" chnl="15" />
    <char id="8211" x="137" y="33" width="5" height="1" xoffset="0" yoffset="7" xadvance="6" page="0" chnl="15" />
    <char id="8212" x="123" y="34" width="7" height="1" xoffset="0" yoffset="7" xadvance="8" page="0" chnl="15" />
    <char id="8216" x="68" y="37" width="2" height="3" xoffset="0" yoffset="4" xadvance="3" page="0" chnl="15" />
    <char id="8217" x="62" y="37" width="2" height="3" xoffset="0" yoffset="4" xadvance="3" page="0" chnl="15" />
    <char id="8218" x="65" y="37" width="2" height="3" xoffset="0" yoffset="10" xadvance="3" page="0" chnl="15" />
    <char id="8220" x="33" y="37" width="4" height="3" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="8221" x="28" y="37" width="4" height="3" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="8222" x="23" y="37" width="4" height="3" xoffset="0" yoffset="10" xadvance="5" page="0" chnl="15" />
    <char id="8224" x="54" y="11" width="3" height="9" xoffset="0" yoffset="3" xadvance="4" page="0" chnl="15" />
    <char id="8225" x="58" y="11" width="3" height="9" xoffset="0" yoffset="3" xadvance="4" page="0" chnl="15" />
    <char id="8226" x="145" y="27" width="5" height="5" xoffset="0" yoffset="5" xadvance="6" page="0" chnl="15" />
    <char id="8230" x="131" y="34" width="5" height="1" xoffset="1" yoffset="10" xadvance="7" page="0" chnl="15" />
    <char id="8240" x="191" y="10" width="9" height="7" xoffset="0" yoffset="4" xadvance="10" page="0" chnl="15" />
    <char id="8249" x="8" y="38" width="3" height="5" xoffset="0" yoffset="5" xadvance="4" page="0" chnl="15" />
    <char id="8250" x="0" y="38" width="3" height="5" xoffset="0" yoffset="5" xadvance="4" page="0" chnl="15" />
    <char id="8260" x="248" y="0" width="5" height="9" xoffset="0" yoffset="3" xadvance="5" page="0" chnl="15" />
    <char id="8364" x="225" y="10" width="6" height="7" xoffset="0" yoffset="4" xadvance="7" page="0" chnl="15" />
    <char id="8482" x="16" y="37" width="6" height="3" xoffset="0" yoffset="4" xadvance="7" page="0" chnl="15" />
    <char id="8722" x="163" y="33" width="3" height="1" xoffset="0" yoffset="7" xadvance="4" page="0" chnl="15" />
    <char id="64257" x="60" y="29" width="4" height="7" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
    <char id="64258" x="0" y="30" width="4" height="7" xoffset="0" yoffset="4" xadvance="5" page="0" chnl="15" />
  </chars>
  <kernings count="66">
    <kerning first="70" second="100" amount="-1" />
    <kerning first="70" second="97" amount="-1" />
    <kerning first="70" second="111" amount="-1" />
    <kerning first="70" second="112" amount="-1" />
    <kerning first="70" second="113" amount="-1" />
    <kerning first="70" second="114" amount="-1" />
    <kerning first="70" second="115" amount="-1" />
    <kerning first="70" second="116" amount="-1" />
    <kerning first="70" second="117" amount="-1" />
    <kerning first="70" second="109" amount="-1" />
    <kerning first="70" second="110" amount="-1" />
    <kerning first="70" second="101" amount="-1" />
    <kerning first="70" second="121" amount="-1" />
    <kerning first="70" second="118" amount="-1" />
    <kerning first="70" second="99" amount="-1" />
    <kerning first="70" second="103" amount="-1" />
    <kerning first="70" second="119" amount="-1" />
    <kerning first="70" second="120" amount="-1" />
    <kerning first="70" second="122" amount="-1" />
    <kerning first="70" second="74" amount="-1" />
    <kerning first="76" second="84" amount="-1" />
    <kerning first="76" second="86" amount="-1" />
    <kerning first="76" second="89" amount="-1" />
    <kerning first="80" second="74" amount="-1" />
    <kerning first="84" second="100" amount="-1" />
    <kerning first="84" second="97" amount="-1" />
    <kerning first="84" second="111" amount="-1" />
    <kerning first="84" second="112" amount="-1" />
    <kerning first="84" second="113" amount="-1" />
    <kerning first="84" second="114" amount="-1" />
    <kerning first="84" second="115" amount="-1" />
    <kerning first="84" second="116" amount="-1" />
    <kerning first="84" second="117" amount="-1" />
    <kerning first="84" second="109" amount="-1" />
    <kerning first="84" second="110" amount="-1" />
    <kerning first="84" second="101" amount="-1" />
    <kerning first="84" second="121" amount="-1" />
    <kerning first="84" second="118" amount="-1" />
    <kerning first="84" second="99" amount="-1" />
    <kerning first="84" second="103" amount="-1" />
    <kerning first="84" second="119" amount="-1" />
    <kerning first="84" second="120" amount="-1" />
    <kerning first="84" second="122" amount="-1" />
    <kerning first="84" second="74" amount="-1" />
    <kerning first="86" second="74" amount="-1" />
    <kerning first="47" second="47" amount="-2" />
    <kerning first="89" second="100" amount="-1" />
    <kerning first="89" second="97" amount="-1" />
    <kerning first="89" second="111" amount="-1" />
    <kerning first="89" second="112" amount="-1" />
    <kerning first="89" second="113" amount="-1" />
    <kerning first="89" second="114" amount="-1" />
    <kerning first="89" second="115" amount="-1" />
    <kerning first="89" second="116" amount="-1" />
    <kerning first="89" second="117" amount="-1" />
    <kerning first="89" second="109" amount="-1" />
    <kerning first="89" second="110" amount="-1" />
    <kerning first="89" second="101" amount="-1" />
    <kerning first="89" second="121" amount="-1" />
    <kerning first="89" second="118" amount="-1" />
    <kerning first="89" second="99" amount="-1" />
    <kerning first="89" second="103" amount="-1" />
    <kerning first="89" second="119" amount="-1" />
    <kerning first="89" second="120" amount="-1" />
    <kerning first="89" second="122" amount="-1" />
    <kerning first="89" second="74" amount="-1" />
  </kernings>
</font>`;
// @endif