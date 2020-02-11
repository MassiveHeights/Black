/**
 * @preserve
 * Blacksmith 2D v0.5.11
 * 
 * SIMPLIFIED BSD LICENSE
 * ======================
 * 
 * Copyright 2019 Borna Technology Ltd. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY BORNA TECHNOLOGY "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL BORNA TECHNOLOGY OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Borna Technology.
 */

// @ifdef DEBUG
/**
 * Utility class for logging and debugging.
 *
 * @cat core
 */
class Debug {
  constructor() {
    Debug.assert(false, 'Static class.');
  }

  static isNumber(...values) {
    values.forEach(x => {
      if (typeof x === 'number' && isNaN(parseFloat(x)) === false && isFinite(x) === true)
        return;

      let message = 'Not a number.';

      if (Debug.logOnFail)
        console.error('[ASSERT]', message);

      if (Debug.throwOnFail)
        throw new Error(message);
    });
  }

  static assert(value, message) {
    if (value === true)
      return;

    message = message == null ? 'Assertion failed.' : message;

    if (Debug.logOnFail)
      console.error('[ASSERT]', message);

    if (Debug.throwOnFail)
      throw new Error(message);
  }

  static assertWarn(value, message) {
    if (value === true)
      return;

    message = message == null ? 'Assertion warning.' : message;
    Debug.warn(message);
  }

  static assertInfo(value, message) {
    if (value === true)
      return;

    message = message == null ? 'Assertion info.' : message;
    Debug.info(message);
  }

  /**
   * Outputs a message to the console
   * 
   * @param  {...string} message
   */
  static log(...message) {
    console.info('%c%s', 'color: #000000', 'LOG:', ...message);
  }

  /**
   * Outputs a info message to the console
   * 
   * @param  {...string} message
   */
  static info(...message) {
    console.info('%c%s', 'color: #003bd2', 'INFO:', ...message);
  }

  /**
   * Outputs a warning message to the console
   * 
   * @param  {...string} message
   */
  static warn(...message) {
    console.info('%c%s', 'color: #f67400', 'WARN:', ...message);
  }

  /**
   * Outputs a error message to the console
   * 
   * @param  {...string} message
   */
  static error(...message) {
    console.info('%c%s', 'color: #d50000', 'ERROR:', ...message);
  }

  /**
   * 
   * @param {string} name 
   */
  static time(name) {
    Debug.timeProfiles[name] = performance.now();
  }

  /**
   * 
   * @param {string} name 
   */
  static timeEnd(name) {
    Debug.timeProfiles[name] = performance.now() - Debug.timeProfiles[name];
  }
}

Debug.throwOnFail = true;
Debug.logOnFail = false;
Debug.timeProfiles = {};
// @endif

/**
 * Set of math helper functions.
 *
 * @cat core
 * @static
 */
class MathEx {
  /**
   * Generates a random number in given range.
   *
   * @param {number} a A lower value.
   * @param {number} b A greater value.
   * @return {number}
   */
  static randomBetween(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }

  /**
   * Clamps given value to min max range.
   *
   * @param {number} value A value to clamp.
   * @param {number} min A lower threshold.
   * @param {number} max A greater threshold.
   * @return {number}
   */
  static clamp(value, min, max) {
    return (value < min) ? min : (value > max) ? max : value;
  }

  /**
   * Calculates distance between two points.
   * 
   * @param  {number} x1 First point x-coordinate.
   * @param  {number} y1 First point y-coordinate.
   * @param  {number} x2 Second point x-coordinate.
   * @param  {number} y2 Second point y-coordinate.
   * @return {number}
   */
  static distance(x1, y1, x2, y2) {
    let x = x1 - x2;
    let y = y1 - y2;

    return Math.sqrt((x * x) + (y * y));
  }

  /**
   * Calculates squared distance between two points.
   * 
   * @param  {number} x1 First point x-coordinate.
   * @param  {number} y1 First point y-coordinate.
   * @param  {number} x2 Second point x-coordinate.
   * @param  {number} y2 Second point y-coordinate.
   * @return {number}
   */
  static distanceSqr(x1, y1, x2, y2) {
    let x = x1 - x2;
    let y = y1 - y2;

    return (x * x) + (y * y);
  }

  /**
   * Calculates angle in radians between two points.
   * 
   * @param  {number} x1 First point x-coordinate.
   * @param  {number} y1 First point y-coordinate.
   * @param  {number} x2 Second point x-coordinate.
   * @param  {number} y2 Second point y-coordinate.
   * @return {number}
   */
  static angleBetween(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  }

  /**
   * Maps one range onto another.
   *
   * @param  {number} value A value to map.
   * @param  {number} fromA Lower value from first range.
   * @param  {number} fromB Greater value from first range.
   * @param  {number} toA Lower value from second range.
   * @param  {number} toB Greater value from second range.
   * @return {number}
   */
  static mapRange(value, fromA, fromB, toA, toB) {
    return toA + (toB - toA) * (value - fromA) / (fromB - fromA);
  }

  /**
   * Linearly interpolates a number.
   *
   * @param {number} a First value.
   * @param {number} b Second value.
   * @param {number} t A value between 0 and 1.
   * @return {number}
   */
  static lerp(a, b, t) {
    return a + t * (b - a);
  }

  /**
   * Compares two numbers using given epsilon value.
   *
   * @param {number} a First value.
   * @param {number} b Second value.
   * @param {number} epsilon Comparison threshold.
   * @returns {boolean}
   */
  static equals(a, b, epsilon = Number.EPSILON) {
    return (a - epsilon < b) && (a + epsilon > b);
  }
}

/**
 * Pi divided by 4.
 * @type {number}
 */
MathEx.PI_Q = Math.PI / 4;

/**
 * PI multiplied by 2.
 * @type {number}
 */
MathEx.PI2 = Math.PI * 2;

/**
 * Degrees to radians constant.
 * @const
 * @type {number}
 */
MathEx.DEG2RAD = 0.01745329251994329576923690768489;

/**
 * Radians to degrees constant.
 * @type {number}
 */
MathEx.RAD2DEG = 57.295779513082320876798154814105;

class Perlin {
  constructor(repeat = 0) {
    this.mRepeat = 0;
    this.mPerm = [];
    
    for (let x = 0; x < 512; x++)
      this.mPerm.push(Perlin.__permutation[x % 256]);
  }

  __perlin(x, y, z) {
    if (this.mRepeat > 0) {
      x = x % this.mRepeat;
      y = y % this.mRepeat;
      z = z % this.mRepeat;
    }

    let p = this.mPerm;

    const xi = ~~x & 255;
    const yi = ~~y & 255;
    const zi = ~~z & 255;
    const xf = x - ~~x;
    const yf = y - ~~y;
    const zf = z - ~~z;
    const u = xf * xf * xf * (xf * (xf * 6 - 15) + 10);
    const v = yf * yf * yf * (yf * (yf * 6 - 15) + 10);
    const w = zf * zf * zf * (zf * (zf * 6 - 15) + 10);

    const aaa = p[p[p[xi] + yi] + zi];
    const aba = p[p[p[xi] + this.inc(yi)] + zi];
    const aab = p[p[p[xi] + yi] + this.inc(zi)];
    const abb = p[p[p[xi] + this.inc(yi)] + this.inc(zi)];
    const baa = p[p[p[this.inc(xi)] + yi] + zi];
    const bba = p[p[p[this.inc(xi)] + this.inc(yi)] + zi];
    const bab = p[p[p[this.inc(xi)] + yi] + this.inc(zi)];
    const bbb = p[p[p[this.inc(xi)] + this.inc(yi)] + this.inc(zi)];

    let x1 = this.lerp(this.grad(aaa, xf, yf, zf), this.grad(baa, xf - 1, yf, zf), u);
    let x2 = this.lerp(this.grad(aba, xf, yf - 1, zf), this.grad(bba, xf - 1, yf - 1, zf), u);
    let y1 = this.lerp(x1, x2, v);

    x1 = this.lerp(this.grad(aab, xf, yf, zf - 1), this.grad(bab, xf - 1, yf, zf - 1), u);
    x2 = this.lerp(this.grad(abb, xf, yf - 1, zf - 1), this.grad(bbb, xf - 1, yf - 1, zf - 1), u);
    let y2 = this.lerp(x1, x2, v);

    return (this.lerp(y1, y2, w) + 1) * 0.5;
  }

  perlin(x, y, z, octaves = 1, persistence = 1) {
    if (octaves === 1 && persistence === 1)
      return this.__perlin(x, y, z);

    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    let maxValue = 0;
    for (let i = 0; i < octaves; i++) {
      total += this.__perlin(x * frequency, y * frequency, z * frequency) * amplitude;

      maxValue += amplitude;

      amplitude *= persistence;
      frequency *= 2;
    }

    return total / maxValue;
  }

  inc(num) {
    num++;
    if (this.mRepeat > 0)
      num %= this.mRepeat;

    return num;
  }

  grad(hash, x, y, z) {
    const b = hash & 15;

    switch (b) {
      case 0: return x + y;
      case 1: return -x + y;
      case 2: return x - y;
      case 3: return -x - y;
      case 4: return x + z;
      case 5: return -x + z;
      case 6: return x - z;
      case 7: return -x - z;
      case 8: return y + z;
      case 9: return -y + z;
      case 10: return y - z;
      case 11: return -y - z;
      case 12: return y + x;
      case 13: return -y + z;
      case 14: return y - x;
      case 15: return -y - z;
    }
  }

  lerp(a, b, t) {
    return a + t * (b - a);
  }
}

Perlin.__permutation = [151, 160, 137, 91, 90, 15,
  131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
  190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
  88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
  77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
  102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
  135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
  5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
  223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
  129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
  251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
  49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
  138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
];

/**
 * A double key map.
 * @cat utils
 */
class MapMap {
  constructor() {
    this.mMap = new Map();
  }

  /**
   * Returns true if value found.
   * 
   * @param {string} key1 
   * @param {string} key2 
   */
  has(key1, key2) {
    return this.mMap.has(key1) && this.mMap.get(key1).has(key2);
  }

  /**
   * Sets or updates value by given keys.
   * 
   * @param {string} key1 
   * @param {string} key2 
   * @param {*} value 
   */
  set(key1, key2, value) {
    let map = this.mMap.get(key1);

    if (map == null) {
      map = new Map();
      this.mMap.set(key1, map);
    }
    map.set(key2, value);
  }

  /**
   * Returns value by given keys.
   * 
   * @param {string} key1 
   * @param {string} key2 
   * @returns {*}
   */
  get(key1, key2) {
    let map = this.mMap.get(key1);
    if (map != null) {
      return this.mMap.get(key1) && this.mMap.get(key1).get(key2);
    }
    return null;
  }
}

/**
 * A simple object pool class. Used to avoid GC.
 * 
 * @cat utils
 */
class ObjectPool {
  /**
   * Creates new ObjectPool instance.
   * @param {Function} type 
   * @param {number} capacity 
   */
  constructor(type, capacity = 100) {
    /** 
     * @ignore
     * @type {Array<*>} 
     */
    this.mReleased = [];

    /** 
     * @ignore 
     * @type {number} 
     */
    this.mCapacity = capacity;

    /** 
     * @ignore 
     * @type {Function} 
     */
    this.mType = type;
  }

  /**
   * Gets/Sets capacity of the pool.
   * 
   * @returns {number}
   */
  get capacity() {
    return this.mCapacity;
  }

  /**
   * @param {number} value
   */
  set capacity(value) {
    Debug.assert(value !== 0, 'Capacity cannot be equal to zero.');
    Debug.assert(value > -1, 'Capacity cannot be smaller then -1.');

    this.mCapacity = value;

    if (this.mCapacity > this.mReleased.length)
      this.mReleased.splice(0, this.mReleased.length - this.mCapacity);
  }

  /**
   * Releases all objects from the pool.
   */
  releaseAll() {
    this.mReleased.splice(0, this.mReleased.length);
  }

  /**
   * Returns new object instance or an object from the pool.
   */
  get() {
    return this.mReleased.length > 0 ? this.mReleased.pop() : new this.mType();
  }

  /**
   * Releases given object.
   * 
   * @param {*} object 
   */
  release(object) {
    if (this.mCapacity === -1 || this.mReleased.length < this.mCapacity)
      this.mReleased.push(object);
  }
}

/**
 * RGB helper struct.
 * 
 * @cat utils
 */
class RGB {
  /**
   * Creates new RGB instance.
   * 
   * @param {number} r 
   * @param {number} g 
   * @param {number} b 
   */
  constructor(r = 0, g = 0, b = 0) {
    /** 
     * @ignore 
     * @type {number} 
     * */
    this.r = r;

    /** 
     * @ignore 
     * @type {number} 
     * */
    this.g = g;

    /** 
     * @ignore 
     * @type {number} 
     * */
    this.b = b;
  }
}

/**
 * Hue, saturation, lightness helper class.
 * 
 * @cat utils
 */
class HSV {
  /**
   * Creates new HSV instance.
   * 
   * @param {number} h
   * @param {number} s 
   * @param {number} v 
   */
  constructor(h = 0, s = 0, v = 0) {
    /** 
     * @ignore 
     * @type {number} 
     */
    this.h = h;

    /** 
     * @ignore 
     * @type {number} 
     */
    this.s = s;

    /** 
     * @ignore 
     * @type {number} 
     */
    this.v = v;
  }
}

/** 
 * Set of methods related to color transformations.
 * 
 * @cat utils
 * @static
*/
class ColorHelper {
  /**
   * Converts number color to RGB object.
   *
   * @param {number} hex The color to convert.
   * @returns {black-engine~RGB} The resulting string.
   */
  static hex2rgb(hex) {
    return new RGB(hex >> 16 & 255, hex >> 8 & 255, hex & 255);
  }

  /**
   * Converts RGB object into number color.
   *
   * @param {black-engine~RGB} rgb The object, which contains 'r', 'g' and 'b' properties.
   * @returns {number} The resulting uint.
   */
  static rgb2hex(rgb) {
    return rgb.r << 16 | rgb.g << 8 | rgb.b;
  }

  /**
   * Converts HSV object into RGB object.
   *
   * @param {black-engine~HSV} hsv The object, which contains 'h', 's' and 'v' properties.
   * @returns {black-engine~RGB} The resulting RGB object.
   */
  static hsv2rgb(hsv) {
    let { h, s, v } = hsv;
    let r = 0;
    let g = 0;
    let b = 0;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }

    r *= 255;
    g *= 255;
    b *= 255;

    return new RGB(r, g, b);
  }

  /**
   * Converts RGB object into HSV object.
   *
   * @param {black-engine~RGB} rgb The object, which contains 'r', 'g' and 'b' properties.
   * @returns {black-engine~HSV} The resulting HSV object.
   */
  static rgb2hsv(rgb) {
    let { r, g, b } = rgb;
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h = 0;
    let s = 0;
    let v = max;

    let d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return new HSV(h, s, v);
  }

  /**
   * Linearly interpolates between two colors within HSV model.
   * 
   * @param {number} hex1 First color number
   * @param {number} hex2 Second color number 
   * @param {number} factor A value between 0 and 1
   */
  static lerpHSV(hex1, hex2, factor = 0.5) {
    let c1 = ColorHelper.rgb2hsv(ColorHelper.hex2rgb(hex1));
    let c2 = ColorHelper.rgb2hsv(ColorHelper.hex2rgb(hex2));

    let h = 0;
    let d = c2.h - c1.h;

    if (c1.h > c2.h) {
      let h3 = c2.h;
      c2.h = c1.h;
      c1.h = h3;
      d = -d;
      factor = 1 - factor;
    }

    if (d > 0.5) {
      c1.h = c1.h + 1;
      h = (c1.h + factor * (c2.h - c1.h)) % 1;
    }

    if (d <= 0.5)
      h = c1.h + factor * d;

    let s = c1.s + factor * (c2.s - c1.s);
    let v = c1.v + factor * (c2.v - c1.v);

    return ColorHelper.rgb2hex(ColorHelper.hsv2rgb(new HSV(h, s, v)));
  }

  /**
   * Converts number color to hex string.
   *
   * @param {number} color The color to convert.
   * @returns {string} The resulting hex string.
   */
  static hexColorToString(color) {
    let parsedColor = color.toString(16);
    return '#000000'.substring(0, 7 - parsedColor.length) + parsedColor;
  }

  /**
   * Converts number color to RGBA string.
   *
   * @param {number} color The color to convert.
   * @param {number} [alpha=1] Alpha to use in RGBA string
   * @returns {string} The resulting string.
   */
  static intToRGBA(color, alpha = 1) {
    const r = (color >> 16) & 255;
    const g = (color >> 8) & 255;
    const b = color & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}

/**
 * @private
 * @ignore
 */
const patterns = { '*': '[^/]+', '**': '.+/?[^/]+', '**/': '.+/?' };

/**
 * Helper glob matching class.
 * 
 * @cat utils
 */
class Glob {
  /**
   * Creates new Glob instance.
   * 
   * @param {string} pattern 
   */
  constructor(pattern) {
    this.mRegExp = new RegExp(`^${pattern.replace(/\./g, '\\.').replace(/\*\*$/g, '.+').replace(/(?:\*\*\/|\*\*|\*)/g, s => { return patterns[s]; })}$`);
  }

  /**
   * Tests whenever string matches the glob.
   * 
   * @param {string} string 
   * @returns {boolean}
   */
  test(string) {
    return this.mRegExp.test(string);
  }
}

/**
 * Mathematical representation of a vector.
 *
 * @cat geom
 */
class Vector {
  /**
   * Creates new Vector instance.
   *
   * @param  {number=} [x=0] X-component.
   * @param  {number=} [y=0] y-component.
   */
  constructor(x = 0, y = 0) {
    Debug.isNumber(x, y);
    
    /** 
     * @type {number} X coordinate of a point in the space. 
     */
    this.x = x;

    /** 
     * @type {number} Y coordinate of a point in the space. 
     */
    this.y = y;
  }

  /**
   * Updates values of this vector with a given.
   *
   * @param {number=} [x=0] X-component.
   * @param {number=} [y=0] y-component
   * @return {black-engine~Vector} This.
   */
  set(x = 0, y = 0) {
    Debug.isNumber(x, y);

    this.x = x;
    this.y = y;

    return this;
  }

  /**
   * Adds two vectors.
   *
   * @param {black-engine~Vector} vector The vector object to be added to this.
   * @return {black-engine~Vector} This.
   */
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  /**
   * Subtract two vectors.
   *
   * @param {black-engine~Vector} vector The vector object to be subtracted.
   * @return {black-engine~Vector} This.
   */
  subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  }

  /**
   * Returns distance between two vectors.
   *
   * @param {black-engine~Vector} vector Second vector to check distance with.
   * @return {number} The distance between two vectors.
   */
  distance(vector) {
    let x = this.x - vector.x;
    let y = this.y - vector.y;

    return Math.sqrt((x * x) + (y * y));
  }

  /**
   * Returns the squared distance between two vectors.
   *
   * @param {black-engine~Vector} vector Second vector to check distance with.
   * @return {number} The distance between two vectors.
   */
  distanceSqr(vector) {
    let x = this.x - vector.x;
    let y = this.y - vector.y;

    return (x * x) + (y * y);
  }

  /**
   * Multiplies two vectors.
   *
   * @param {black-engine~Vector} vector A second vector to multiply with.
   * @return {black-engine~Vector} This.
   */
  multiply(vector) {
    this.x *= vector.x;
    this.y *= vector.y;

    return this;
  }

  /**
   * Multiplies this vector by scalar value.
   *
   * @param {number} scalar The values to mul by.
   * @return {black-engine~Vector} This.
   */
  multiplyScalar(scalar) {
    Debug.isNumber(scalar);

    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  /**
   * Find dot product between two vectors.
   *
   * @param {black-engine~Vector} vector Second vector to find angle with.
   * @return {number} A scalar value representing dot product.
   */
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * Returns the length of this vector.
   *
   * @return {number} The length of the vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Returns the squared length of this vector.
   *
   * @return {number} Squared length.
   */
  lengthSqr() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Creates unit vector out of this one.
   *
   * @returns {black-engine~Vector} This.
   */
  normalize() {
    let sum = this.lengthSqr();

    if (sum > 0) {
      sum = Math.sqrt(sum);
      this.x /= sum;
      this.y /= sum;
    } else {
      this.x = 0;
      this.y = 0;
    }

    return this;
  }

  /**
   * Clamps values of this vector to given range.
   *
   * @param {number} min Min value.
   * @param {number} max Max value.
   * @return {black-engine~Vector} This.
   */
  clamp(min, max) {
    Debug.isNumber(min, max);

    this.x = MathEx.clamp(this.x, min, max);
    this.y = MathEx.clamp(this.y, min, max);

    return this;
  }

  /**
   * Clamps vector length of this vector to given range.
   *
   * @param {number} min Min value.
   * @param {number} max Max value.
   * @return {black-engine~Vector} This.
   */
  clampLength(min, max) {
    Debug.isNumber(min, max);

    let length = MathEx.clamp(this.length(), min, max);
    this.normalize();
    this.multiplyScalar(length);
    return this;
  }

  /**
   * Linearly interpolates between two vectors.
   *
   * @param {black-engine~Vector} vector The second vector to interpolate values between.
   * @param {number} t      Alpha value.
   * @return {black-engine~Vector} This.
   */
  lerp(vector, t) {
    Debug.isNumber(t);

    this.x = MathEx.lerp(this.x, vector.x, t);
    this.y = MathEx.lerp(this.y, vector.y, t);

    return this;
  }

  /**
   * Copies this vector values into given vector.
   *
   * @param {black-engine~Vector} vector The vector to store values in.
   * @return {black-engine~Vector} Given vector.
   */
  copyTo(vector) {
    vector.x = this.x;
    vector.y = this.y;

    return vector;
  }

  /**
   * Copies values from given vector into this.
   *
   * @param {black-engine~Vector} vector The vector to copy values from.
   * @return {black-engine~Vector} This.
   */
  copyFrom(vector) {
    this.x = vector.x;
    this.y = vector.y;

    return this;
  }

  /**
   * Clones this vector object.
   *
   * @return {black-engine~Vector} New Vector instance.
   */
  clone() {
    return new Vector(this.x, this.y);
  }

  /**
   * Compares two vectors for equality.
   *
   * @param {black-engine~Vector} vector Second vector to compare with.
   * @param {number=} epsilon Threshold.
   * @return {boolean} True if equal.
   */
  equals(vector, epsilon = Number.EPSILON) {
    return vector !== null && (Math.abs(vector.x - this.x) < epsilon) && (Math.abs(vector.y - this.y) < epsilon);
  }

  /**
   * Checks if this vector is empty.
   *
   * @return {boolean} True if both components equal to zero.
   */
  isEmpty() {
    return this.x === 0 && this.y === 0;
  }

  /**
   * Rotates this vector around specified point.
   *
   * @param {black-engine~Vector} vector Center vector.
   * @param {number} rotation Angle in radians.
   * @return {black-engine~Vector} This rotated vector.
   */
  setRotationFrom(vector, rotation) {
    Debug.isNumber(rotation);

    return this
      .subtract(vector)
      .setRotation(rotation)
      .add(vector);
  }

  /**
   *  Rotates this vector around zero vector.
   *
   * @param {number} rotation Angle in radians.
   * @return {black-engine~Vector} This rotated vector.
   */
  setRotation(rotation) {
    Debug.isNumber(rotation);

    let cos = Math.cos(rotation);
    let sin = Math.sin(rotation);

    return this.set(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
  }

  /**
   * Calculates angle in radians within this and specified vectors.
   *
   * @param {black-engine~Vector} vector Second vector.
   * @return {number} Angle in radians.
   */
  angleBetween(vector) {
    return Math.atan2(vector.y - this.y, vector.x - this.x);
  }

  /**
   * Calculates vector angle in radians. Same as heading.
   *
   * @return {number} Angle in radians.
   */
  angle() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Rotates this vector to normal.
   *
   * @return {black-engine~Vector} This vector.
   */
  perp() {
    return this.set(this.y, -this.x);
  }

  /**
   * Creates new Vector from given angle in radians.
   *
   * @param {number} angle Angle.
   * @param {black-engine~Vector=} outVector Vector to be returned.
   * @return {black-engine~Vector} New Vector object.
   */
  static fromAngle(angle, outVector) {
    Debug.isNumber(angle);

    outVector = outVector || new Vector();
    return outVector.set(Math.cos(angle), Math.sin(angle));
  }
  
  /**
   * Returns random number within this rectangle.
   * @returns {number}
   */
  get random() {
    return MathEx.randomBetween(this.x, this.y);
  }

  /**
   * @ignore
   * @param {black-engine~Vector} vectorMin
   * @param {black-engine~Vector} vectorMax
   * @param {black-engine~Vector=} outVector
   * @return {black-engine~Vector}
   */
  static randomRange(vectorMin, vectorMax, outVector) {
    outVector = outVector || new Vector();

    outVector.x = Math.random() * (vectorMax.x - vectorMin.x) + vectorMin.x;
    outVector.y = Math.random() * (vectorMax.y - vectorMin.y) + vectorMin.y;

    return outVector;
  }

  // @ifdef DEBUG
  /**
   * @ignore
   * @param {number=} [digits=2] Description
   * @return {string} Description
   */
  toString(digits = 2) {
    return `Vector: { x: ${this.x.toFixed(digits)}, y: ${this.y.toFixed(digits)} }`;
  }
  // @endif
}

/**
 * @ignore
 * @type {black-engine~Vector}
 * @nocollapse
 */
Vector.__cache = new Vector();

/**
 * Recycled vectors pool.
 *
 * @type {black-engine~ObjectPool}
 * @nocollapse
 */
Vector.pool = new ObjectPool(Vector);

/**
 * Mathematical representation of a bezier curve.
 *
 * @cat geom
 */
class Line {
  /**
   * Creates new Line instance.
   * @param  {black-engine~Vector} start Start point.
   * @param  {black-engine~Vector} end End point.
   */
  constructor(start, end) {
    /** @type {black-engine~Vector} The start point coordinates */
    this.start = start;

    /** @type {black-engine~Vector} The end point coordinates */
    this.end = end;
  }

  /**
   * set - Sets new line properties
   *
   * @param  {black-engine~Vector} start Start point.
   * @param  {black-engine~Vector} end End point.
   *
   * @return {black-engine~Line} This circle.
   */
  set(start, end) {
    this.start = start;
    this.end = end;

    return this;
  }

  /**
   * Clones this line.
   *
   * @return {black-engine~Line} Created line.
   */
  clone() {
    return new Line(this.start.clone(), this.end.clone());
  }

  /**
   * Copy this properties to another line.
   *
   * @param {black-engine~Line} line Object to copy to.
   *
   * @return {black-engine~Line} Passed line.
   */
  copyTo(line) {
    return line.set(this.start.clone(), this.end.clone());
  }

  /**
   * Copy another line properties to this.
   *
   * @param {black-engine~Line} line Object to copy from.
   *
   * @return {black-engine~Line} This circle.
   */
  copyFrom(line) {
    return this.set(line.start.clone(), line.end.clone());
  }

  /**
   * Shows whether lines are identical.
   *
   * @param {black-engine~Line} line Object to comparison.
   * @param {number=} epsilon Compare precision.
   *
   * @return {boolean} True if lines are identical.
   */
  equals(line, epsilon = Number.EPSILON) {
    return (this.start.equals(line.start, epsilon) && this.end.equals(line.end, epsilon)) ||
      (this.start.equals(line.end, epsilon) && this.end.equals(line.start, epsilon));
  }

  /**
   * Finds left X position.
   *
   * @return {number} Left X position.
   */
  get left() {
    return Math.min(this.start.x, this.end.x);
  }

  /**
   * Finds right X position.
   *
   * @return {number} Right X position.
   */
  get right() {
    return Math.max(this.start.x, this.end.x);
  }

  /**
   * Finds top Y position.
   *
   * @return {number} Top Y position.
   */
  get top() {
    return Math.min(this.start.y, this.end.y);
  }

  /**
   * Finds bottom Y position.
   *
   * @return {number} Bottom Y position.
   */
  get bottom() {
    return Math.max(this.start.y, this.end.y);
  }

  /**
   * Replace line start and end points.
   *
   * @return {black-engine~Line} This line.
   */
  reverse() {
    let start = this.start;
    this.start = this.end;
    this.end = start;

    return this;
  }

  /**
   * Change line's length to one. Moves end point.
   *
   * @return {black-engine~Line} This line.
   */
  normalize() {
    this.end
      .subtract(this.start)
      .normalize()
      .add(this.start);

    return this;
  }

  /**
   * Change line's length to scaled. Moves end point.
   *
   * @return {black-engine~Line} This line.
   */
  scale(multiplier) {
    this.end
      .subtract(this.start)
      .multiplyScalar(multiplier)
      .add(this.start);

    return this;
  }

  /**
   * Returns zero length line at zero position.
   *
   * @return {black-engine~Line} Description
   */
  zero() {
    return this.set(new Vector(), new Vector());
  }

  /**
   * Length of this line.
   *
   * @return {number} length.
   */
  length() {
    return this.start.distance(this.end);
  }

  /**
   * Represents center as vector.
   *
   * @param {black-engine~Vector=} outVector Object for result.
   *
   * @return {black-engine~Vector} Center point.
   */
  center(outVector = undefined) {
    outVector = outVector || new Vector();
    return outVector.set((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2);
  }

  /**
   * Returns 'line'.
   *
   * @return {string} Description
   */
  get type() {
    return 'Line';
  }

  /**
   * Shows whether point is on line.
   *
   * @param {number} x Point position x.
   * @param {number} y Point position y.
   *
   * @return {boolean} True if line contains point.
   */
  containsXY(x, y) {
    return this.contains(new Vector(x, y));
  }

  /**
   * Shows whether point is on line.
   *
   * @param {black-engine~Vector} vector Point to check.
   *
   * @return {boolean} True if line contains point.
   */
  contains(vector) {
    return this.start.distance(vector) + this.end.distance(vector) === this.length();
  }

  /**
   * Shows whether this line intersects another.
   *
   * @param {black-engine~Line} line Line to check.
   *
   * @return {boolean} True if intersects.
   */
  intersects(line) {
    let start1 = this.start;
    let end1 = this.end;
    let start2 = line.start;
    let end2 = line.end;

    let denominator = ((end2.y - start2.y) * (end1.x - start1.x)) - ((end2.x - start2.x) * (end1.y - start1.y));

    if (denominator === 0) {
      return false;
    }

    let a = start1.y - start2.y;
    let b = start1.x - start2.x;
    let numerator1 = ((end2.x - start2.x) * a) - ((end2.y - start2.y) * b);
    let numerator2 = ((end1.x - start1.x) * a) - ((end1.y - start1.y) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    return a >= 0 && a <= 1 && b > 0 && b < 1;
  }

  /**
   * Shows whether this line intersects circle.
   *
   * @param {black-engine~Circle} circle Circle to check.
   *
   * @return {boolean} True if intersects.
   */
  intersectsCircle(circle) {
    let start = this.start;
    let end = this.end;

    if (circle.contains(start) || circle.contains(end)) {
      return true;
    }

    let distance = start.distance(end);
    let directionX = (end.x - start.x) / distance;
    let directionY = (end.y - start.y) / distance;

    let t = directionX * (circle.x - start.x) + directionY * (circle.y - start.y);

    let nearest = new Vector((t * directionX) + start.x, (t * directionY) + start.y);
    let nearestDistance = nearest.distance(new Vector(circle.x, circle.y));

    if (nearestDistance < circle.r) {
      let dt = Math.sqrt(Math.pow(circle.r, 2) - Math.pow(nearestDistance, 2));

      let x1 = ((t - dt) * directionX + start.x);
      let y1 = ((t - dt) * directionY + start.y);
      let x2 = ((t + dt) * directionX + start.x);
      let y2 = ((t + dt) * directionY + start.y);

      return this.__isInBoundsXY(x1, y1) || this.__isInBoundsXY(x2, y2);
    }

    return false;
  }

  __isInBoundsXY(x, y) {
    let x1 = this.start.x;
    let y1 = this.start.y;
    let x2 = this.end.x;
    let y2 = this.end.y;

    return x > Math.min(x1, x2) && x < Math.max(x1, x2) && y > Math.min(y1, y2) && y < Math.max(y1, y2);
  }

  // @ifdef DEBUG
  /**
   * toString - String representation of this line.
   *
   * @param {number=} [digits=2] Number of digits after float point.
   *
   * @return {string} Description.
   */
  toString(digits = 2) {
    return `Line { start: ${this.start.toString(digits)}, end: ${this.end.toString(digits)} }`;
  }
  // @endif
}

/**
 * @type {black-engine~Line}
 * @nocollapse
 * @ignore
 */
Line.__cache = new Line(new Vector(), new Vector());

/**
 * Mathematical representation of a rectangle.
 *
 * @cat geom
 */
class Rectangle {
  /**
   * Creates new instance of Rectangle.
   *
   * @param  {number=} [y=0] X-component.
   * @param  {number=} [x=0] Y-component.
   * @param  {number=} [w=0] The width.
   * @param  {number=} [h=0] The height.
   */
  constructor(x = 0, y = 0, w = 0, h = 0) {
    Debug.isNumber(x, y, w, h);

    /** 
     * @type {number} The x coordinate of the rectangle. 
     */
    this.x = x;

    /** 
     * @type {number} The y coordinate of the rectangle. 
     */
    this.y = y;

    /** 
     * @type {number} The width of the rectangle. 
     */
    this.width = w;

    /** 
     * @type {number} The height of the rectangle. 
     */
    this.height = h;
  }

  /**
   * Update rectangle values with a given.
   *
   * @param {number} x X-component.
   * @param {number} y Y-component.
   * @param {number} w The width.
   * @param {number} h The height.
   * @return {black-engine~Rectangle} This.
   */
  set(x, y, w, h) {
    Debug.isNumber(x, y, w, h);

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    return this;
  }

  /**
   * Copies values from given rectangle into this one.
   *
   * @param {black-engine~Rectangle} rect The Rectangle to copy values from.
   * @return {black-engine~Rectangle} This.
   */
  copyFrom(rect) {
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;

    return this;
  }

  /**
   * Copies values from this rectangle into given rectangle.
   *
   * @param {black-engine~Rectangle} rect The destination rect.
   * @return {black-engine~Rectangle} Given rect object.
   */
  copyTo(rect) {
    rect.x = this.x;
    rect.y = this.y;
    rect.width = this.width;
    rect.height = this.height;

    return rect;
  }

  /**
   * Get/Sets the leftmost point of this rectangle.
   *
   * @return {number}
   */
  get left() {
    return this.x;
  }

  /**
   * @param {number} left
   */
  set left(left) {
    Debug.isNumber(left);
    this.x = left;
  }

  /**
   * Get/Sets the rightmost point of this rectangle.
   *
   * @return {number}
   */
  get right() {
    return this.x + this.width;
  }

  /**
   * @param {number} right
   */
  set right(right) {
    Debug.isNumber(right);
    this.x = right - this.width;
  }

  /**
   * Get/Sets the topmost point of this rectangle.
   *
   * @return {number}
   */
  get top() {
    return this.y;
  }

  /**
   * @param {number} top
   */
  set top(top) {
    Debug.isNumber(top);
    this.y = top;
  }

  /**
   * Get/Sets the bottommost point of this rectangle.
   *
   * @return {number}
   */
  get bottom() {
    return this.y + this.height;
  }

  /**
   * @param {number} bottom
   */
  set bottom(bottom) {
    Debug.isNumber(bottom);

    this.y = bottom - this.height;
  }

  /**
   * Get/Sets the top left point for this rectangle.
   *
   * @return {black-engine~Vector}
   */
  get topLeft() {
    return new Vector(this.x, this.y);
  }

  /**
   * @param {black-engine~Vector} vector
   */
  set topLeft(vector) {
    this.left = vector.x;
    this.top = vector.y;
  }

  /**
   * Get/Sets the top right point for this rectangle.
   *
   * @return {black-engine~Vector}
   */
  get topRight() {
    return new Vector(this.right, this.y);
  }

  /**
   * @param {black-engine~Vector} vector
   */
  set topRight(vector) {
    this.right = vector.x;
    this.top = vector.y;
  }

  /**
   * Get/Sets the top left point for this rectangle.
   *
   * @return {black-engine~Vector}
   */
  get bottomRight() {
    return new Vector(this.right, this.bottom);
  }

  /**
   * @param {black-engine~Vector} vector
   */
  set bottomRight(vector) {
    this.right = vector.x;
    this.bottom = vector.y;
  }

  /**
   * Get/Sets the top left point for this rectangle.
   *
   * @return {black-engine~Vector}
   */
  get bottomLeft() {
    return new Vector(this.x, this.bottom);
  }

  /**
   * @param {black-engine~Vector} vector
   */
  set bottomLeft(vector) {
    this.x = vector.x;
    this.bottom = vector.y;
  }

  /**
   * Creates a new Rectangle instance with width and height equal to current instance.
   *
   * @param {black-engine~Vector=} outVector Resulting rect to save values in.
   * @return {black-engine~Vector} New Rectangle instance or `outVector` if passed.
   */
  size(outVector = undefined) {
    outVector = outVector || new Vector();
    return outVector.set(this.width, this.height);
  }

  /**
   * Sets all components of this Rectangle to zero.
   *
   * @return {black-engine~Rectangle} This.
   */
  zero() {
    return this.set(0, 0, 0, 0);
  }

  /**
   * Compares this Rectangle with a given one.
   *
   * @param {black-engine~Rectangle} rect Rect to compare values with.
   * @param {number} [epsilon=Number.EPSILON] Comparison threshold.
   * @return {boolean} True if rectangles are equal.
   */
  equals(rect, epsilon = Number.EPSILON) {
    return rect !== null && (Math.abs(this.x - rect.x) < epsilon) && (Math.abs(this.y - rect.y) < epsilon) &&
      (Math.abs(this.width - rect.width) < epsilon) && (Math.abs(this.height - rect.height) < epsilon);
  }


  /**
   * Checks if a given point is inside this rectangle.
   *
   * @param {number} x The x-component of a point.
   * @param {number} y The y-component of a point.
   * @return {boolean} True if point is inside.
   */
  containsXY(x, y) {
    return x >= this.x && x <= this.right && y >= this.y && y <= this.bottom;
  }


  /**
   * Checks if a given rectangle is inside this rect.
   *
   * @param {black-engine~Rectangle} rect Rectangle to check with.
   * @return {boolean} True if given rectangle is inside this one.
   */
  contains(rect) {
    return rect.x >= this.x && rect.y >= this.y && rect.right <= this.right && rect.bottom <= this.bottom;
  }

  /**
   * Checks if this rect intersects with a given rectangle.
   *
   * @param {black-engine~Rectangle} rect The rect to check intersection with.
   * @return {boolean} True if intersects.
   */
  intersects(rect) {
    return rect.right > this.x && rect.bottom > this.y &&
      rect.x < this.right && rect.y < this.bottom;
  }

  /**
   * Makes rectangle, which represents intersection between this and passed rectangles.
   *
   * @param {black-engine~Rectangle} toIntersect Rectangle to intersect with.
   * @param {black-engine~Rectangle=} outRect Rectangle to be returned.
   * @returns {black-engine~Rectangle}
   */
  intersection(toIntersect, outRect) {
    outRect = outRect || new Rectangle();

    let x0 = this.x < toIntersect.x ? toIntersect.x : this.x;
    let x1 = this.right > toIntersect.right ? toIntersect.right : this.right;

    if (x1 <= x0)
      return new Rectangle();

    let y0 = this.y < toIntersect.y ? toIntersect.y : this.y;
    let y1 = this.bottom > toIntersect.bottom ? toIntersect.bottom : this.bottom;

    if (y1 <= y0)
      return new Rectangle();

    outRect.set(x0, y0, x1 - x0, y1 - y0);
    return outRect;
  }


  /**
   * Adds given rectangle into this.
   *
   * @param {black-engine~Rectangle} toUnion A rectangle object to add to this rect.
   * @return {black-engine~Rectangle} New rectangle object that is the union.
   */
  union(toUnion) {
    let x0 = this.x > toUnion.x ? toUnion.x : this.x;
    let x1 = this.right < toUnion.right ? toUnion.right : this.right;
    let y0 = this.y > toUnion.y ? toUnion.y : this.y;
    let y1 = this.bottom < toUnion.bottom ? toUnion.bottom : this.bottom;

    return this.set(x0, y0, x1 - x0, y1 - y0);
  }

  /**
   * Returns volume of this Rectangle.
   *
   * @return {number}
   */
  get volume() {
    return this.width * this.height;
  }

  /**
   * Expands this rectangle object by given values.
   *
   * @param {number} x      X-component.
   * @param {number} y      Y-component
   * @param {number} width  The width.
   * @param {number} height The height.
   * @return {black-engine~Rectangle} This.
   */
  expand(x, y, width, height) {
    Debug.isNumber(x, y, width, height);

    if (this.volume === 0)
      return this.set(x, y, width, height);

    let cacheRight = this.right;
    let cacheBottom = this.bottom;

    if (this.x > x) {
      this.x = x;
      this.width = cacheRight - x;
    }

    if (this.y > y) {
      this.y = y;
      this.height = cacheBottom - y;
    }

    if (cacheRight < x + width)
      this.width = x + width - this.x;

    if (cacheBottom < y + height)
      this.height = y + height - this.y;

    return this;
  }

  /**
   * Expands this rectangle with a given point.
   * 
   * @param {number} x 
   * @param {number} y 
   * @returns {black-engine~Rectangle}
   */
  expandXY(x, y) {
    if (x < this.x) {
      this.width += this.x - x;
      this.x = x;
    }

    if (y < this.y) {
      this.height += this.y - y;
      this.y = y;
    }

    if (x > this.x + this.width)
      this.width = x - this.x;

    if (y > this.y + this.height)
      this.height = y - this.y;

    return this;
  }

  /**
   * Increases the size of this rectangle by given x- and y- values.
   *
   * @param {number=} [x=0] X-component.
   * @param {number=} [y=0] Y-component.
   * @return {black-engine~Rectangle} This.
   */
  inflate(x = 0, y = 0) {
    Debug.isNumber(x, y);

    this.x -= x;
    this.y -= y;
    this.width += 2 * x;
    this.height += 2 * y;

    return this;
  }

  /**
   * Clones this Rectangle object into new one.
   *
   * @return {black-engine~Rectangle} New rectangle object.
   */
  clone() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }

  /**
   * Gets rectangle perimeter.
   *
   * @return {number}
   */
  get perimeter() {
    return 2 * (this.width + this.height);
  }


  /**
   * Returns the center point of this rectangle.
   *
   * @param {black-engine~Vector=} outVector The out-Vector to store values in.
   * @return {black-engine~Vector} New rectangle object.
   */
  center(outVector = undefined) {
    outVector = outVector || new Vector();
    return outVector.set(this.x + this.width * 0.5, this.y + this.height * 0.5);
  }

  /**
   *  Scales this rectangle.
   *
   * @param {number} x Width multiplier.
   * @param {number} y Height multiplier.
   * @return {black-engine~Rectangle} This rectangle.
   */
  scale(x, y) {
    this.width *= x;
    this.height *= y;

    return this;
  }

  /**
   * Checks if rectangle has area.
   *
   * @return {boolean} True if has.
   */
  get isEmpty() {
    return this.width <= 0 || this.height <= 0;
  }

  /**
   * Gets a list of lines, which make up this rectangle.
   *
   * @returns {Array<black-engine~Line>}
   */
  get lines() {
    return [
      new Line(this.topLeft, this.topRight),
      new Line(this.topRight, this.bottomRight),
      new Line(this.bottomRight, this.bottomLeft),
      new Line(this.bottomLeft, this.topLeft)
    ];
  }

  /**
   * Returns random number within this rectangle.
   * @returns {Vector}
   */
  get random() {
    const rx = MathEx.randomBetween(this.x, this.width);
    const ry = MathEx.randomBetween(this.y, this.height);

    return new Vector(rx, ry);
  }

  /**
   * Calculates a bonding box enclosing the given list of points.
   * 
   * @param {Array<Vector>} points 
   * @returns {black-engine~Rectangle}
   */
  static fromPoints(points) {
    let result = new Rectangle();

    if (points.length === 0)
      return result;

    let length = points.length;
    let minX = points[0].x;
    let minY = points[0].y;
    let maxX = points[0].x;
    let maxY = points[0].y;

    for (let i = 1; i < length; i++) {
      let p = points[i];
      let x = p.x;
      let y = p.y;

      minX = Math.min(x, minX);
      maxX = Math.max(x, maxX);
      minY = Math.min(y, minY);
      maxY = Math.max(y, maxY);
    }

    result.x = minX;
    result.y = minY;
    result.width = maxX - minX;
    result.height = maxY - minY;
    return result;
  }

  /**
   * Calculates a bonding box enclosing the given list of x-y pairs.
   * 
   * @param {Array<number>} points 
   * @returns {black-engine~Rectangle}
   */
  static fromPointsXY(points) {
    let result = new Rectangle();

    if (points.length < 2)
      return result;

    let length = points.length;
    let minX = points[0];
    let minY = points[1];
    let maxX = points[0];
    let maxY = points[1];

    for (let i = 2; i < length; i += 2) {
      let x = points[i];
      let y = points[i + 1];

      minX = Math.min(x, minX);
      maxX = Math.max(x, maxX);
      minY = Math.min(y, minY);
      maxY = Math.max(y, maxY);
    }

    result.x = minX;
    result.y = minY;
    result.width = maxX - minX;
    result.height = maxY - minY;
    return result;
  }

  // @ifdef DEBUG
  /**
   * @ignore
   * @param {number=} [digits=2] Description
   * @return {string} Description
   */
  toString(digits = 2) {
    return `Rectangle { x: ${this.x.toFixed(digits)}, y: ${this.y.toFixed(digits)}, width: ${this.width.toFixed(digits)}, height: ${this.height.toFixed(digits)} }`;
  }
  // @endif
}

/**
 * @ignore
 * @type {black-engine~Rectangle}
 * @nocollapse
 */
Rectangle.__cache = new Rectangle();

/**
 * Recycled rectangles pool.
 *
 * @type {black-engine~ObjectPool}
 * @nocollapse
 */
Rectangle.pool = new ObjectPool(Rectangle);

/**
 * A 2x3 matrix allows you to transform objects in space.
 *
 * @cat geom
 */
class Matrix {
  /**
   * Creates new Matrix instance.
   *
   * @param  {number} [a=1]  A-component.
   * @param  {number} [b=0]  B-component.
   * @param  {number} [c=0]  C-component.
   * @param  {number} [d=1]  D-component.
   * @param  {number} [tx=0] TX-component.
   * @param  {number} [ty=0] TY-component.
   */
  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    /** 
     * @private 
     * @type {Float32Array} 
     */
    this.data = new Float32Array(6);
    this.set(a, b, c, d, tx, ty);
  }

  /**
   * Sets components of this matrix to the given values.
   *
   * @param  {number} a  A-component.
   * @param  {number} b  B-component.
   * @param  {number} c  C-component.
   * @param  {number} d  D-component.
   * @param  {number} tx TX-component.
   * @param  {number} ty TY-component.
   * @return {black-engine~Matrix} This.
   */
  set(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    Debug.isNumber(a, b, c, d, tx, ty);

    let m = this.data;

    m[0] = a;
    m[1] = b;
    m[2] = c;
    m[3] = d;
    m[4] = tx;
    m[5] = ty;

    return this;
  }

  /**
   * Translates the matrix by x and y axes.
   *
   * @param {number} dx Amount along x-axis.
   * @param {number} dy Amount along y-axis.
   * @return {black-engine~Matrix} This.
   */
  translate(dx, dy) {
    Debug.isNumber(dx, dy);

    let a = this.data;

    let /** @type {number} */ a0 = a[0]; // a
    let /** @type {number} */ a1 = a[1]; // b
    let /** @type {number} */ a2 = a[2]; // c
    let /** @type {number} */ a3 = a[3]; // d
    let /** @type {number} */ a4 = a[4]; // tx
    let /** @type {number} */ a5 = a[5]; // ty

    this.data[4] = a0 * dx + a2 * dy + a4;
    this.data[5] = a1 * dx + a3 * dy + a5;

    return this;
  }

  /**
   * Sets tx and ty components to given values.
   *
   * @param {number} x The tx component to update.
   * @param {number} y The ty component to update.
   * @return {black-engine~Matrix} This.
   */
  setTranslation(x, y) {
    Debug.isNumber(x, y);

    this.data[4] = x;
    this.data[5] = y;

    return this;
  }

  /**
   * Sets absolute rotation of this matrix to specified angle.
   *
   * @param  {number} theta     Theta value.
   * @param  {number} scale = 1 Scale value.
   * @return {black-engine~Matrix} This.
   */
  setRotation(theta, scale = 1) {
    Debug.isNumber(theta, scale);

    let m = this.data;
    m[0] = Math.cos(theta) * scale;
    m[2] = Math.sin(theta) * scale;
    m[1] = -m[2];
    m[3] = m[0];

    return this;
  }

  /**
   * Applies rotation to this matrix.
   *
   * @param  {number} angle Angle in radians.
   * @return {black-engine~Matrix} This.
   */
  rotate(angle) {
    Debug.isNumber(angle);

    let a = this.data;
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    let a0 = a[0];
    let a2 = a[2];
    let a4 = a[4];

    a[0] = a0 * cos - a[1] * sin;
    a[1] = a0 * sin + a[1] * cos;
    a[2] = a2 * cos - a[3] * sin;
    a[3] = a2 * sin + a[3] * cos;
    a[4] = a4 * cos - a[5] * sin;
    a[5] = a4 * sin + a[5] * cos;

    return this;
  }

  /**
   * Scales current matrix.
   *
   * @param {number} sx Abscissa of the scaling vector.
   * @param {number} sy Ordinate of the scaling vector.
   * @return {black-engine~Matrix} This.
   */
  scale(sx, sy) {
    Debug.isNumber(sx, sy);

    let a = this.data;
    let /** @type {number} */ a0 = a[0]; // a
    let /** @type {number} */ a1 = a[1]; // b
    let /** @type {number} */ a2 = a[2]; // c
    let /** @type {number} */ a3 = a[3]; // d
    let /** @type {number} */ a4 = a[4]; // tx
    let /** @type {number} */ a5 = a[5]; // ty

    this.data[0] = a0 * sx;
    this.data[1] = a1 * sx;
    this.data[2] = a2 * sy;
    this.data[3] = a3 * sy;

    return this;
  }

  skew(sx, sy) {
    let sinX = Math.sin(sx);
    let cosX = Math.cos(sx);
    let sinY = Math.sin(sy);
    let cosY = Math.cos(sy);
    let d = this.data;

    this.set(
      d[0] * cosY - d[1] * sinX,
      d[0] * sinY + d[1] * cosX,
      d[2] * cosY - d[3] * sinX,
      d[2] * sinY + d[3] * cosX,
      d[4] * cosY - d[5] * sinX,
      d[4] * sinY + d[5] * cosX);
  }

  /**
   * Resets current matrix to identity state.
   *
   * @return {black-engine~Matrix} This.
   */
  identity() {
    return this.set(1, 0, 0, 1, 0, 0);
  }

  /**
   * Specifies if current matrix is identity.
   *
   * @returns {boolean}
   */
  get isIdentity() {
    return this.exactEquals(Matrix.__identity);
  }

  /**
   * Concatenates a given matrix with the current one.
   *
   * @param  {black-engine~Matrix} b The matrix to be concatenated.
   * @return {black-engine~Matrix}   This.
   */
  prepend(b) {
    let a = this.data;
    let bv = b.data;

    let /** @type {number} */ a0 = a[0]; // a
    let /** @type {number} */ a1 = a[1]; // b
    let /** @type {number} */ a2 = a[2]; // c
    let /** @type {number} */ a3 = a[3]; // d
    let /** @type {number} */ a4 = a[4]; // tx
    let /** @type {number} */ a5 = a[5]; // ty

    let /** @type {number} */ b0 = bv[0]; // a
    let /** @type {number} */ b1 = bv[1]; // b
    let /** @type {number} */ b2 = bv[2]; // c
    let /** @type {number} */ b3 = bv[3]; // d
    let /** @type {number} */ b4 = bv[4]; // tx
    let /** @type {number} */ b5 = bv[5]; // ty

    if (b0 !== 1 || b1 !== 0 || b2 !== 0 || b3 !== 1) {
      let a11 = (a0 * b0 + a1 * b2);
      a[1] = a0 * b1 + a1 * b3;
      a[0] = a11;

      let c11 = (a2 * b0 + a3 * b2);
      a[3] = a2 * b1 + a3 * b3;
      a[2] = c11;
    }


    let tx11 = (a4 * b0 + a5 * b2 + b4);
    a[5] = a4 * b1 + a5 * b3 + b5;
    a[4] = tx11;
    return this;
  }

  /**
   * Appends values to this matrix.
   *
   * @param  {black-engine~Matrix} b The matrix to be appended.
   * @return {black-engine~Matrix} This.
   */
  append(b) {
    let a = this.data;
    let bv = b.data;

    let /** @type {number} */ a0 = a[0];
    let /** @type {number} */ a1 = a[1];
    let /** @type {number} */ a2 = a[2];
    let /** @type {number} */ a3 = a[3];
    let /** @type {number} */ a4 = a[4];
    let /** @type {number} */ a5 = a[5];
    let /** @type {number} */ b0 = bv[0];
    let /** @type {number} */ b1 = bv[1];
    let /** @type {number} */ b2 = bv[2];
    let /** @type {number} */ b3 = bv[3];
    let /** @type {number} */ b4 = bv[4];
    let /** @type {number} */ b5 = bv[5];

    a[0] = a0 * b0 + a2 * b1;
    a[1] = a1 * b0 + a3 * b1;
    a[2] = a0 * b2 + a2 * b3;
    a[3] = a1 * b2 + a3 * b3;
    a[4] = a0 * b4 + a2 * b5 + a4;
    a[5] = a1 * b4 + a3 * b5 + a5;
    return this;
  }

  /**
   * Transforms given and x- and y- components of a point from a local space to world space.
   *
   * @param  {number} x          The x- component of a point.
   * @param  {number} y          The y- component of a point.
   * @param  {black-engine~Vector=} outVector If given stores resulting values in it.
   * @return {black-engine~Vector} Transformed Vector object.
   */
  transformXY(x, y, outVector) {
    Debug.isNumber(x, y);

    outVector = outVector || new Vector();
    let m = this.data;

    outVector.x = m[0] * x + m[2] * y + m[4];
    outVector.y = m[1] * x + m[3] * y + m[5];

    return outVector;
  }

  /**
   * Transforms given point from a local space to world space without applying scaling.
   *
   * @param  {number} x          The x- component.
   * @param  {number} y          The y- component.
   * @param  {black-engine~Vector=} outVector If given stores results in it.
   * @return {black-engine~Vector} Just transformed Vector object.
   */
  transformDirectionXY(x, y, outVector) {
    Debug.isNumber(x, y);

    let m = this.data;
    outVector = outVector || new Vector();

    outVector.x = m[0] * x + m[2] * y;
    outVector.y = m[1] * x + m[3] * y;

    return outVector;
  }

  /**
   * Transforms vector by current matrix object.
   *
   * @param  {black-engine~Vector} vector     Vector to apply transformation on.
   * @param  {black-engine~Vector=} outVector Out Vector to store results in.
   * @return {black-engine~Vector} New transformed vector.
   */
  transformVector(vector, outVector) {
    outVector = outVector || new Vector();
    const m = this.data;

    const x = m[0] * vector.x + m[2] * vector.y + m[4];
    const y = m[1] * vector.x + m[3] * vector.y + m[5];

    return outVector.set(x, y);
  }

  /**
   * Transforms rectangle by current matrix object.
   *
   * @param  {black-engine~Rectangle} rect         Rectangle to apply transformation on.
   * @param  {black-engine~Rectangle|null} outRect When given stores results in it.
   * @return {black-engine~Rectangle} Transformed  Rectangle object.
   */
  transformRect(rect, outRect) {
    outRect = outRect || new Rectangle();

    let minX = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    let m = this.data;
    let tmpVector = Vector.pool.get();

    /** @type {Array<number>} */
    let points = [rect.x, rect.y, rect.x + rect.width, rect.y, rect.x, rect.y + rect.height, rect.x + rect.width, rect.y + rect.height];

    for (let i = 0; i < points.length; i += 2) {
      tmpVector.x = m[0] * points[i] + m[2] * points[i + 1] + m[4];
      tmpVector.y = m[1] * points[i] + m[3] * points[i + 1] + m[5];

      if (minX > tmpVector.x)
        minX = tmpVector.x;
      if (maxX < tmpVector.x)
        maxX = tmpVector.x;
      if (minY > tmpVector.y)
        minY = tmpVector.y;
      if (maxY < tmpVector.y)
        maxY = tmpVector.y;
    }

    Vector.pool.release(tmpVector);

    return outRect.set(minX, minY, maxX - minX, maxY - minY);
  }

  /**
   * Inverts current matrix.
   *
   * @return {black-engine~Matrix} This.
   */
  invert() {
    let a = this.data;

    let aa = a[0];
    let ab = a[1];
    let ac = a[2];
    let ad = a[3];
    let atx = a[4];
    let aty = a[5];

    let det = aa * ad - ab * ac;
    if (det === 0) {
      a[0] = a[1] = a[2] = a[3] = 0;
      a[4] = -atx;
      a[5] = -aty;
      return this;
    }
    det = 1.0 / det;

    a[0] = ad * det;
    a[1] = -ab * det;
    a[2] = -ac * det;
    a[3] = aa * det;
    a[4] = (ac * aty - ad * atx) * det;
    a[5] = (ab * atx - aa * aty) * det;

    return this;
  }

  /**
   * TODO: remove or finish
   * @ignore
   * @returns {Array<number>} Description
   */
  __decompose() {
    let m = this.data;
    let a = m[0];
    let b = m[1];
    let c = m[2];
    let d = m[3];
    let tx = m[4];
    let ty = m[5];

    let skewX = -Math.atan2(-c, d);
    let skewY = Math.atan2(b, a);

    let delta = Math.abs(skewX + skewY);

    let r_rotation = 0;
    let r_skewX = 0;
    let r_skewY = 0;
    let r_scaleX = 0;
    let r_scaleY = 0;
    let r_x = 0;
    let r_y = 0;

    if (delta < 0.00001) {
      r_rotation = skewY;

      if (a < 0 && d >= 0)
        r_rotation += (r_rotation <= 0) ? Math.PI : -Math.PI;
    } else {
      r_skewX = skewX;
      r_skewY = skewY;
    }

    r_scaleX = Math.sqrt((a * a) + (b * b));
    r_scaleY = Math.sqrt((c * c) + (d * d));

    r_x = tx;
    r_y = ty;

    return [r_x, r_y, r_rotation, r_scaleX, r_scaleY, r_skewX, r_skewY];
  }

  /**
   * Clones the current matrix and returns new cloned object.
   *
   * @return {black-engine~Matrix} New cloned object.
   */
  clone() {
    let m = new Matrix();
    let v = this.data;
    m.set(v[0], v[1], v[2], v[3], v[4], v[5]);
    return m;
  }

  /**
   * Copies values to given matrix.
   *
   * @param  {black-engine~Matrix} matrix The destination matrix.
   * @return {black-engine~Matrix} This.
   */
  copyTo(matrix) {
    let a = this.data;
    let b = matrix.data;

    b[0] = a[0];
    b[1] = a[1];
    b[2] = a[2];
    b[3] = a[3];
    b[4] = a[4];
    b[5] = a[5];

    return matrix;
  }

  /**
   * Copies values from given matrix into this.
   *
   * @param  {black-engine~Matrix} matrix The matrix to copy values from.
   * @return {black-engine~Matrix} This.
   */
  copyFrom(matrix) {
    return matrix.copyTo(this);
  }

  /**
   * Compares this matrix values with given matrix and checks if they are the same.
   *
   * @param {black-engine~Matrix} matrix Matrix object to compare with.
   * @returns {boolean}
   */
  exactEquals(matrix) {
    if (!matrix)
      return false;

    let a = this.data;
    let b = matrix.data;

    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
  }

  /**
   * Compares this matrix values with given matrix and checks if they are the same.
   *
   * @param  {black-engine~Matrix} matrix                   Matrix object to compare with.
   * @param  {number} epsilon = Number.EPSILON Comparison threshold.
   * @return {boolean} True if equal.
   */
  equals(matrix, epsilon = Number.EPSILON) {
    if (!matrix)
      return false;

    let a = this.data;
    let b = matrix.data;

    return (Math.abs(a[0] - b[0]) < epsilon) && (Math.abs(a[1] - b[1]) < epsilon) && (Math.abs(a[2] - b[2]) < epsilon) &&
      (Math.abs(a[3] - b[3]) < epsilon) && (Math.abs(a[4] - b[4]) < epsilon) && (Math.abs(a[5] - b[5]) < epsilon);
  }

  /**
   * Returns array of values representing this matrix object.
   *
   * @return {Float32Array}
   */
  get value() {
    return this.data;
  }

  // @ifdef DEBUG
  /**
   * @ignore
   * @param  {number=} digits = 2
   * @return {string}
   */
  toString(digits = 2) {
    return `        | ${this.value[0].toFixed(digits)} | ${this.value[1].toFixed(digits)} | ${this.value[4].toFixed(digits)} |
Matrix: | ${this.value[2].toFixed(digits)} | ${this.value[3].toFixed(digits)} | ${this.value[5].toFixed(digits)} |`;
  }
  // @endif
}

/**
 * @ignore
 * @type {black-engine~Matrix}
 * @nocollapse
 */
Matrix.__cache = new Matrix();

/**
 * @ignore
 * @type {black-engine~Matrix}
 * @nocollapse
 */
Matrix.__identity = new Matrix();

/**
 * Recycled matrices pool.
 *
 * @type {black-engine~ObjectPool}
 * @nocollapse
 */
Matrix.pool = new ObjectPool(Matrix);

/**
 * Mathematical representation of a circle.
 *
 * @cat geom
 */
class Circle {
  /**
   * Creates new Circle instance.
   * 
   * @param  {number=} [x = 0] Position x.
   * @param  {number=} [y = 0] Position y.
   * @param  {number=} [r = 1] Radius.
   */
  constructor(x = 0, y = 0, r = 1) {

    /** 
     * @private 
     * @type {number} 
     */
    this.x = x;

    /** 
     * @private 
     * @type {number} 
     */
    this.y = y;

    /** 
     * @private 
     * @type {number} 
     */
    this.r = r;
  }

  /**
   * Sets new circle properties
   *
   * @param {number} x Position x.
   * @param {number} y Position y.
   * @param {number} r Radius.
   * @return {Circle} This circle.
   */
  set(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    return this;
  }

  /**
   * Clones this circle.
   *
   * @return {black-engine~Circle} Created circle.
   */
  clone() {
    return new Circle(this.x, this.y, this.r);
  }

  /**
   * Copy this properties to another circle.
   *
   * @param {black-engine~Circle} circle Object to copy to.
   * @return {black-engine~Circle} Passed circle.
   */
  copyTo(circle) {
    return circle.set(this.x, this.y, this.r);
  }

  /**
   * Copy another circle properties to this.
   *
   * @param {black-engine~Circle} circle Object to copy from.
   * @return {black-engine~Circle} This circle.
   */
  copyFrom(circle) {
    return this.set(circle.x, circle.y, circle.r);
  }

  /**
   * Shows whether circles are identical.
   *
   * @param {black-engine~Circle} circle Object to comparison.
   * @param {number=} epsilon Compare precision.
   * @return {boolean} True if circles are identical.
   */
  equals(circle, epsilon = Number.EPSILON) {
    return circle !== null && (Math.abs(this.x - circle.x) < epsilon) && (Math.abs(this.y - circle.y) < epsilon) &&
      (Math.abs(this.r - circle.r) < epsilon);
  }

  /**
   * Shows whether point is in circle.
   *
   * @param {number} x Point position x.
   * @param {number} y Point position y.
   * @return {boolean} True if circle contains point.
   */
  containsXY(x, y) {
    return this.contains(new Vector(x, y));
  }

  /**
   * Shows whether point is in circle.
   *
   * @param {black-engine~Vector} vector Point to check.
   * @return {boolean} True if circle contains point.
   */
  contains(vector) {
    // TODO: remove new Vector init
    return new Vector(this.x, this.y).subtract(vector).length() <= this.r;
  }

  /**
   * Resets all values to zero.
   *
   * @return {black-engine~Circle} Returns this.
   */
  zero() {
    return this.set(0, 0, 0);
  }

  /**
   * Shows whether this circle intersects another.
   *
   * @param {black-engine~Circle} circle Circle to check.
   * @return {boolean} True if intersects.
   */
  intersects(circle) {
    let d = new Vector(this.x, this.y).distance(new Vector(circle.x, circle.y));
    return d <= this.r + circle.r && d >= this.r - circle.r;
  }

  /**
   * Shows whether this circle collide with another.
   *
   * @param {black-engine~Circle} circle Circle to check.
   * @return {boolean} True if collide.
   */
  collide(circle) {
    let d = new Vector(this.x, this.y).distance(new Vector(circle.x, circle.y));
    return d <= this.r + circle.r;
  }

  /**
   * Shows whether this circle overlap another.
   *
   * @param {black-engine~Circle} circle Circle to check.
   * @return {boolean} True if overlap.
   */
  overlap(circle) {
    if (this.r < circle.r) {
      return false;
    }

    let d = new Vector(this.x, this.y).distance(new Vector(circle.x, circle.y));
    return d <= this.r - circle.r;
  }


  /**
   * Represents center as vector.
   *
   * @param {black-engine~Vector=} outVector Object for result.
   * @return {black-engine~Vector} Center point.
   */
  center(outVector = undefined) {
    outVector = outVector || new Vector();
    return outVector.set(this.x, this.y);
  }

  static getCircumferencePoint(x, y, r, angle, outVector = undefined) {
    outVector = outVector || new Vector();
    outVector.set(x + r * Math.sin(angle), y + r * -Math.cos(angle));
    return outVector;
  }

  /**
   * Returns area of this circle.
   *
   * @return {number} area.
   */
  get volume() {
    return Math.PI * this.r * this.r;
  }

  /**
   * Returns perimeter of this circle.
   *
   * @return {number} perimeter.
   */
  get perimeter() {
    return 2 * Math.PI * this.r;
  }

  /**
   * Finds left X position.
   *
   * @return {number} Left X position.
   */
  get left() {
    return this.x - this.r;
  }

  /**
   * Finds right X position.
   *
   * @return {number} Right X position.
   */
  get right() {
    return this.x + this.r;
  }

  /**
   * Finds top Y position.
   *
   * @return {number} Top Y position.
   */
  get top() {
    return this.y - this.r;
  }

  /**
   * Finds bottom Y position.
   *
   * @return {number} Bottom Y position.
   */
  get bottom() {
    return this.y + this.r;
  }

  /**
   * Returns top point of this circle.
   *
   * @return {black-engine~Vector}
   */
  get topPoint() {
    return new Vector(this.x, this.top);
  }

  /**
   * Returns bottom point of this circle.
   *
   * @return {black-engine~Vector}
   */
  get bottomPoint() {
    return new Vector(this.x, this.bottom);
  }

  // @ifdef DEBUG
  /**
   * String representation of this circle.
   *
   * @ignore
   * @param {number=} [digits=2] Number of digits after float point.
   * @return {string} Returns string representation of this circle.
   */
  toString(digits = 2) {
    return `Circle { x: ${this.x.toFixed(digits)}, y: ${this.y.toFixed(digits)}, r: ${this.r.toFixed(digits)} }`;
  }
  // @endif
}

/**
 * @ignore
 * @type {black-engine~Circle}
 * @nocollapse
 */
Circle.__cache = new Circle();

/**
 * @cat geom
 */
class Polygon {
  /**
   * Creates new Polygon instance.
   *
   * @param  {Array<black-engine~Vector>} vertices = [] Array of vertex points;
   */
  constructor(vertices = []) {

    /** 
     * @private 
     * @type {Array<black-engine~Vector>} 
     */
    this.mVertices = vertices;

    /** 
     * @private 
     * @type {Array<black-engine~Line>} 
     */
    this.mLines = [];

    /** 
     * @private 
     * @type {black-engine~Rectangle} 
     */
    this.mBounds = new Rectangle();

    /** 
     * @private 
     * @type {black-engine~Vector} 
     */
    this.mCenter = new Vector();

    if (vertices.length > 2)
      this.refresh();
  }

  /**
   * Sets new vertices.
   *
   * @param {Array<black-engine~Vector>} vertices New points.
   * @return {black-engine~Polygon} This polygon.
   */
  set(vertices) {
    this.mVertices = vertices;
    this.refresh();
    return this;
  }

  /**
   * Copies this properties to another polygon.
   *
   * @param {black-engine~Polygon} polygon Object to copy to.
   * @return {black-engine~Polygon} Passed polygon.
   */
  copyTo(polygon) {
    let len = this.mVertices.length;
    let vertices = [];

    for (let i = 0; i < len; i++) {
      vertices.push(this.mVertices[i].clone());
    }

    return polygon.set(vertices);
  }

  /**
   * Copies another polygon properties to this.
   *
   * @param {black-engine~Polygon} polygon Object to copy from.
   * @return {black-engine~Polygon} This polygon.
   */
  copyFrom(polygon) {
    let polygonVertices = polygon.mVertices;
    let len = polygonVertices.length;
    let vertices = [];

    for (let i = 0; i < len; i++) {
      vertices.push(polygonVertices[i].clone());
    }

    return this.set(vertices);
  }

  /**
   * Clones this polygon.
   *
   * @return {black-engine~Polygon} Created polygon.
   */
  clone() {
    let thisVertices = this.mVertices;
    let len = thisVertices.length;
    let vertices = [];

    for (let i = 0; i < len; i++) {
      vertices.push(thisVertices[i].clone());
    }

    return new Polygon(vertices);
  }

  /**
   * Gets the width of this polygon.
   *
   * @readonly
   * @returns {number}
   */
  get width() {
    return this.mBounds.width;
  }

  /**
   * Gets the height of this polygon.
   *
   * @readonly
   * @returns {number}
   */
  get height() {
    return this.mBounds.height;
  }

  /**
   * Shows whether point is within polygon area.
   *
   * @param {number} x Point position x.
   * @param {number} y Point position y.
   * @return {boolean} True if polygon contains point.
   */
  containsXY(x, y) {
    return this.contains(new Vector(x, y));
  }

  /**
   * Shows whether point is within polygon area.
   *
   * @param {black-engine~Vector} vector Point to check.
   * @return {boolean} True if polygon contains point.
   */
  contains(vector) {
    let center = this.mCenter;
    let lines = this.mLines;
    let len = lines.length;

    if (center.equals(vector)) {
      return true;
    }

    let intersectionLine = new Line(vector, center.clone());
    let intersects = 0;
    intersectionLine.scale((this.width + this.height) / intersectionLine.length());

    for (let i = 0; i < len; i++) {
      intersects += lines[i].intersects(intersectionLine) ? 1 : 0;
    }

    return intersects % 2 !== 0;
  }

  /**
   * Perimeter of this polygon.
   *
   * @return {number} perimeter.
   */
  get perimeter() {
    let thisLines = this.mLines;
    let len = thisLines.length;
    let perimeter = 0;

    for (let i = 0; i < len; i++) {
      perimeter += thisLines[i].length();
    }

    return perimeter;
  }

  /**
   * Checks collision between two polygons.
   *
   * @param {black-engine~Polygon} polygon Object to check.
   * @return {boolean} True if polygon collides with another polygon.
   */
  collide(polygon) {
    if (!this.mBounds.intersects(polygon.mBounds)) {
      return false;
    }

    let thisLines = this.mLines;
    let thisLen = thisLines.length;
    let polygonLines = polygon.mLines;
    let polygonLen = polygonLines.length;

    for (let i = 0; i < thisLen; i++) {
      for (let j = 0; j < polygonLen; j++) {
        if (thisLines[i].intersects(polygonLines[j])) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Checks collision between this polygon and circle.
   *
   * @param {black-engine~Circle} circle Object to check.
   * @return {boolean} True if polygon collides with circle.
   */
  collideCircle(circle) {
    let bounds = this.mBounds;
    let lines = this.mLines;

    if (bounds.left > circle.right || bounds.right < circle.left || bounds.top > circle.bottom || bounds.bottom < circle.top) {
      return false;
    }

    let len = lines.length;
    for (let i = 0; i < len; i++) {
      if (lines[i].intersectsCircle(circle)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks collision between this polygon and rectangle.
   *
   * @param {black-engine~Rectangle} rectangle Object to check.
   * @return {boolean} True if polygon collides with rectangle.
   */
  collideRectangle(rectangle) {
    if (!this.mBounds.intersects(rectangle)) {
      return false;
    }

    let thisLines = this.mLines;
    let thisLen = thisLines.length;
    let rectangleLines = rectangle.lines;
    let rectangleLen = rectangleLines.length;

    for (let i = 0; i < thisLen; i++) {
      for (let j = 0; j < rectangleLen; j++) {
        if (thisLines[i].intersects(rectangleLines[j])) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Checks if this polygon overlaps another.
   *
   * @param {black-engine~Polygon} polygon Object to check.
   * @return {boolean} True if polygon overlaps second.
   */
  overlap(polygon) {
    if (this.mBounds.width < polygon.mBounds.width || this.mBounds.height < polygon.mBounds.height) {
      return false;
    }

    if (!this.contains(polygon.mCenter)) {
      return false;
    }

    let thisLines = this.mLines;
    let thisLen = thisLines.length;
    let polygonLines = polygon.mLines;
    let polygonLen = polygonLines.length;

    for (let i = 0; i < thisLen; i++) {
      for (let j = 0; j < polygonLen; j++) {
        if (thisLines[i].intersects(polygonLines[j])) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Checks if this polygon overlaps passed circle.
   *
   * @param {black-engine~Circle} circle Object to check.
   * @return {boolean} True if polygon overlaps circle.
   */
  overlapCircle(circle) {
    if (!this.containsXY(circle.x, circle.y)) {
      return false;
    }

    let thisLines = this.mLines;
    let len = thisLines.length;

    for (let i = 0; i < len; i++) {
      if (thisLines[i].intersectsCircle(circle)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Checks if this polygon overlaps given rectangle.
   *
   * @param {black-engine~Rectangle} rectangle Object to check.
   * @return {boolean} True if polygon overlaps rectangle.
   */
  overlapRectangle(rectangle) {
    if (!this.contains(rectangle.center())) {
      return false;
    }

    let thisLines = this.mLines;
    let thisLen = thisLines.length;
    let rectangleLines = rectangle.lines;
    let rectangleLen = rectangleLines.length;

    for (let i = 0; i < thisLen; i++) {
      for (let j = 0; j < rectangleLen; j++) {
        if (thisLines[i].intersects(rectangleLines[j])) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Calculates center, bounds, and edges of this polygon.
   *
   * @return {black-engine~Polygon} This polygon.
   */
  refresh() {
    let center = this.mCenter;
    let bounds = this.mBounds;
    let vertices = this.mVertices;
    let lines = this.mLines = [];
    center.set(0, 0);

    // bounds
    let maxX = -Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;

    for (let i = 0; i < vertices.length; i++) {
      let vector = vertices[i];
      center.add(vector);

      // bounds
      let {
        x,
        y
      } = vector;
      maxX = x > maxX ? x : maxX;
      maxY = y > maxY ? y : maxY;
      minX = x < minX ? x : minX;
      minY = y < minY ? y : minY;

      lines.push(new Line(vector, vertices[i + 1] || vertices[0]));
    }

    center.multiplyScalar(1 / vertices.length);
    bounds.set(minX, minY, maxX - minX, maxY - minY);

    return this;
  }

  /**
   * Calculates center of this polygon.
   *
   * @return {black-engine~Polygon} This polygon.
   */
  refreshCenter() {
    let center = this.mCenter;
    let vertices = this.mVertices;
    let len = vertices.length;
    center.set(0, 0);

    for (let i = 0; i < len; i++) {
      center.add(vertices[i]);
    }

    center.multiplyScalar(1 / vertices.length);

    return this;
  }

  /**
   * Calculates bounds of this polygon.
   *
   * @return {black-engine~Polygon} This polygon.
   */
  refreshBounds() {
    let bounds = this.mBounds;
    let vertices = this.mVertices;
    let maxX = -Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let len = vertices.length;
    let x;
    let y;

    for (let i = 0; i < len; i++) {
      x = vertices[i].x;
      y = vertices[i].y;
      maxX = x > maxX ? x : maxX;
      maxY = y > maxY ? y : maxY;
      minX = x < minX ? x : minX;
      minY = y < minY ? y : minY;
    }

    bounds.set(minX, minY, maxX - minX, maxY - minY);

    return this;
  }

  /**
   * Calculates edges of this polygon.
   *
   * @return {black-engine~Polygon} This polygon.
   */
  refreshLines() {
    let vertices = this.mVertices;
    let lines = this.mLines = [];

    for (let i = 0; i < vertices.length; i += 2) {
      lines.push(new Line(vertices[i], vertices[i + 1] || vertices[0]));
    }

    return this;
  }

  /**
   * Creates instance of Polygon.
   *
   * @param {string} path Numbers x y divided with space.
   * @return {black-engine~Polygon} Created polygon.
   */
  static fromPath(path) {
    let vertices = [];
    let path2 = path.split(' ');

    for (let i = 0; i < path2.length; i += 2) {
      vertices.push(new Vector(Number(path2[i]), Number(path2[i + 1])));
    }

    return new Polygon(vertices);
  }

  /**
   * Sets rotation. Rotates this polygon around it center.
   *
   * @param {number} rotation Angle in radians.
   * @return {black-engine~Polygon} This polygon.
   */
  setRotation(rotation) {
    let center = this.mCenter;
    let vertices = this.mVertices;
    let cos = Math.cos(rotation);
    let sin = Math.sin(rotation);

    for (let i = 0, len = vertices.length; i < len; i++) {
      let vector = vertices[i];
      vector
        .subtract(center)
        .set(vector.x * cos - vector.y * sin, vector.x * sin + vector.y * cos)
        .add(center);
    }

    return this.refresh();
  }

  /**
   * Translates this polygon to specified position.
   *
   * @param {black-engine~Vector} point Translation vector.
   * @return {black-engine~Polygon} This vertices.
   */
  setTranslation(point) {
    let center = this.mCenter;
    let vertices = this.mVertices;
    let len = vertices.length;
    point.subtract(center);

    for (let i = 0; i < len; i++) {
      vertices[i].add(point);
    }

    return this.refresh();
  }

  /**
   * Returns array of vertices.
   * 
   * @returns {Array<black-engine~Vector>}
   */
  get vertices() {
    return this.mVertices;
  }

  /**
   * Returns center points of this polygon.
   * @returns {black-engine~Vector}
   */
  get center() {
    return this.mCenter;  
  }

  // @ifdef DEBUG
  /**
   * String representation of this polygon.
   *
   * @ignore
   * @param {number=} [digits=2] Number of digits after float point.
   * @return {string} Description.
   */
  toString(digits = 2) {
    let thisLines = this.mLines;
    let thisVertices = this.mVertices;
    let len = thisLines.length;
    let vertices = '';
    let lines = '';

    for (let i = 0; i < len; i++) {
      lines += thisLines[i].toString(digits);
    }

    len = thisVertices.length;
    for (let i = 0; i < len; i++) {
      vertices += thisVertices[i].toString(digits);
    }

    return `Polygon { vertices: ${vertices}, bounds: ${this.mBounds.toString(digits)}, center: ${this.mCenter.toString()}, lines: ${lines} }`;
  }

  // @endif
}

/**
 * @ignore
 * @type {black-engine~Polygon}
 * @nocollapse
 */
Polygon.__cache = new Polygon();

/**
 * Mathematical representation of a bezier curve.
 *
 * @cat geom
 */
class Curve {
  /**
   * Creates new Curve instance.
   */
  constructor() {
    /** 
     * @private 
     * @type {Array<number>} 
     */
    this.mPoints = [];

    /** 
     * @private 
     * @type {Array<black-engine~Vector>} 
     */
    this.mLookup = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mBaked = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mStep = 1 / 60;

    /** 
     * @private 
     * @type {Array<number>} 
     */
    this.mEachT = [];
  }

  /**
   * Sets new points coordinates.
   *
   * @param  {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   * @return {black-engine~Curve} This curve.
   */
  set(...points) {
    this.mPoints = this.__initPoints(points);
    this.__refreshEachT();

    if (this.mBaked)
      this.__refreshCache();

    return this;
  }


  /**
   * Enables or disables interpolation from cache (lookup).
   * Returns true or false depending on baked is enabled or not.
   *
   * @return {boolean}
   */
  get baked() {
    return this.mBaked;
  }

  /**
   * @param  {boolean} label
   */
  set baked(label) {
    this.mBaked = label;

    if (!this.mLookup && this.mPoints) {
      this.__refreshCache();
    }
  }

  /**
   * Wides points array. Sets first point for next bezier same as last of previous.
   *
   * @private
   * @param  {Array<number>} points Array of points coordinates.
   * @return {Array<number>} Points coordinates array.
   */
  __initPoints(points) {
    let res = [];

    for (let i = 6; i < points.length; i += 6) {
      res = res.concat(points.slice(i - 6, i + 2));
    }

    return res;
  }

  /**
   * Refresh cache (lookup) for fast interpolations.
   *
   * @private
   * @return {black-engine~Curve} This curve.
   */
  __refreshCache() {
    let lookup = this.mLookup = [];
    let getFullLength = this.getFullLength();
    let points = this.mPoints;
    let pointsLen = points.length;

    for (let i = 0; i < pointsLen; i += 8) {
      let length = Curve.getLength(...points.slice(i, i + 8));
      let step = this.mStep * getFullLength / length;

      for (let t = step; t < 1; t += step)
        lookup.push(Curve.lerp(t, ...points.slice(i, i + 8)));
    }

    return this;
  }


  /**
   * Refresh local interpolation kof for each bezier in curve.
   *
   * @ignore
   * @private
   * @return {black-engine~Curve} This curve.
   */
  __refreshEachT() {
    let points = this.mPoints;
    let eachT = this.mEachT = [];
    let pointsLen = points.length;
    let eachLength = [];

    for (let i = 0; i < pointsLen; i += 8)
      eachLength.push(Curve.getLength(...points.slice(i, i + 8)));

    let length = this.getFullLength();
    let s = 0;
    for (let i = 0; i < pointsLen; i += 8) {
      s += eachLength[i / 8];
      eachT.push(s / length);
    }

    return this;
  }

  /**
   * Interpolates single bezier on t position.
   *
   * @param  {number} t Interpolation position (0...1).
   * @param  {number} startX
   * @param  {number} startY
   * @param  {number} cpStartX
   * @param  {number} cpStartY
   * @param  {number} cpEndX
   * @param  {number} cpEndY
   * @param  {number} endX
   * @param  {number} endY
   * @param  {black-engine~Vector=} outVector
   * @return {black-engine~Vector} Position on bezier.
   */
  static lerp(t, startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX, endY, outVector) {
    let u = 1 - t;
    let tt = t * t;
    let uu = u * u;
    let uuu = uu * u;
    let ttt = tt * t;

    let p = outVector || new Vector();
    p.set(startX, startY);
    p.x *= uuu;
    p.y *= uuu;

    // first
    p.x += 3 * uu * t * cpStartX;
    p.y += 3 * uu * t * cpStartY;

    // second
    p.x += 3 * u * tt * cpEndX;
    p.y += 3 * u * tt * cpEndY;

    // third
    p.x += ttt * endX;
    p.y += ttt * endY;

    return p;
  }

  /**
   * Interpolates across whole curve.
   *
   * @param  {number} t Interpolation position (0...1).
   * @param  {black-engine~Vector=} outVector Vector to be returned.
   * @return {black-engine~Vector} Position on curve.
   */
  interpolate(t, outVector) {
    let res = outVector || new Vector();
    let lookup = this.mLookup;

    if (this.mBaked) {
      let i = Math.ceil((lookup.length - 1) * t);
      let p = lookup[i];
      res.copyFrom(p);

      return res;
    }

    // not backed
    let { mEachT, mPoints } = this;
    let i = 0;

    while (mEachT[i] < t)
      i++;

    let minT = mEachT[i - 1] || 0;
    let maxT = mEachT[i];
    let bezier = mPoints.slice(i * 8, i * 8 + 8);

    return Curve.lerp((t - minT) / (maxT - minT), ...bezier, res);
  }

  /**
   * Returns single bezier length.
   *
   * @param  {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX, endY
   * @return {number} Length.
   */
  static getLength(...points) {
    let p0 = new Vector(points[0], points[1]);
    let p1 = new Vector(points[2], points[3]);
    let p2 = new Vector(points[4], points[5]);
    let p3 = new Vector(points[6], points[7]);

    return (p3.distance(p0) + p0.distance(p1) + p1.distance(p2) + p2.distance(p3)) / 2;
  }

  /**
   * Returns this curve length.
   *
   * @return {number} Length.
   */
  getFullLength() {
    let points = this.mPoints;
    let mPointsLen = points.length;
    let res = 0;

    for (let i = 0; i < mPointsLen; i += 8)
      res += Curve.getLength(...points.slice(i, i + 8));

    return res;
  }
}

/**
 * @ignore
 * @type {black-engine~Curve}
 * @nocollapse
 */
Curve.__cache = new Curve();

/**
 * The type of the message. 
 * @cat core
 * @static
 * @constant
 * @enum {string}
 */
const MessageType = {
  DIRECT: 'direct',
  BUBBLE: 'bubble'
};

/**
 * The type of the binding. 
 * @cat core
 * @static
 * @constant
 * @enum {string}
 */
const BindingType = {
  REGULAR: 'regular',
  OVERHEARD: 'overheard'
};

/**
 * Message holds all information about dispatched event. This is a pooled object.
 *
 * @cat core
 */
class Message {
  constructor() {
    /** @type {black-engine~MessageDispatcher} The `MessageDispatcher` object, which posted this message. */
    this.sender = null;

    /** @type {string} The name of message. */
    this.name = '';

    /** @type {Object} `GameObject` which receives this message. */
    this.target = null;

    /** @type {Object} The point from which sending is begun. */
    this.origin = null;

    /** @type {boolean} Specifies if invocation of this message was canceled. */
    this.canceled = false;

    /** @type {black-engine~MessageType} Message type. See `MessageType` enum. */
    this.type = MessageType.DIRECT;
  }

  /**
   * Cancels message invocation.
   *
   * @return {void}
   */
  cancel() {
    this.canceled = true;
  }

  // @ifdef DEBUG
  /**
   * Generates message string representation.
   *
   * @return {string}
   */
  toString() {
    let name = this.sender.name !== undefined ? this.sender.name : '';
    return `MESSAGE: { name: '${this.name}', sender: '${name}', target: '${this.target.name}', path: '${this.path}' }`;
  }
  // @endif

  /**
   * @ignore
   * @returns {black-engine~Message}
   */
  __reset() {
    this.sender = null;
    this.name = '';
    this.target = null;
    this.canceled = false;
    this.type = MessageType.DIRECT;
    return this;
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get PROGRESS() {
    return 'progress';
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get COMPLETE() {
    return 'complete';
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get ERROR() {
    return 'error';
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get CHANGE() {
    return 'change';
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get READY() {
    return 'ready';
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get UPDATE() {
    return 'update';
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get RESIZE() {
    return 'resize';
  }

  static get pool() {
    return pool;
  }
}

/**
 * Pool for messages.
 *
 * @type {black-engine~ObjectPool}
 * @nocollapse
 *
 */
const pool = new ObjectPool(Message);

/**
 * A bridge between callback and context.
 * 
 * @cat core
 */
class MessageBinding {
  /**
   * @param {black-engine~MessageDispatcher} owner                The owner of this binding.
   * @param {string} name                            Name of the message.
   * @param {Function} callback                      Callback function.
   * @param {boolean} isOnce                         Indicates whenever this binding should be auto destroyed after first execution.
   * @param {*=} [context=null]                      Optional context (usually this).
   * @param {black-engine~BindingType} [type=BindingType.REGULAR] Type of the binding.
   * @param {?string} [pathPattern=null]             Glob pattern to filter sender by name.
   */
  constructor(owner, name, callback, isOnce, context = null, type = BindingType.REGULAR, pathPattern = null) {
    /** 
     * @ignore 
     * @type {black-engine~MessageDispatcher} 
     */
    this.owner = owner;

    /** 
     * @ignore 
     * @type {string} 
     */
    this.name = name;

    /** 
     * @ignore 
     * @type {Function} 
     */
    this.callback = callback;

    /** 
     * @ignore 
     * @type {boolean} 
     */
    this.isOnce = isOnce;

    /** 
     * @ignore 
     * @type {*} 
     */
    this.context = context;

    /** 
     * @ignore 
     * @type {?string} 
     */
    this.pathPattern = pathPattern;

    /** 
     * @ignore 
     * @type {black-engine~Glob|null} 
     */
    this.glob = pathPattern == null ? null : new Glob(pathPattern);

    /** 
     * @ignore 
     * @type {black-engine~BindingType} 
     */
    this.type = type;
  }

  /**
   * Destroys this binding.
   */
  off() {
    this.owner.__off(this);
  }

  /**
   * @ignore
   * @returns {black-engine~MessageBinding}
   */
  __reset() {
    this.owner = null;
    this.pathPattern = null;
    return this;
  }
}

var mInstance = null;

/**
 * Connects all the dots.
 * 
 * @static
 * @staticClass
 */
class Black {
  constructor() {
    mInstance = this;

    /**
     * @private
     * @type {black-engine~Engine}
     */
    this.mEngine = null;

    /**
     * @private
     * @type {black-engine~Input}
     */
    this.mInput = null;

    /**
     * @private
     * @type {black-engine~MasterAudio}
     */
    this.mAudio = null;

    /**
     * @private
     * @type {black-engine~Time}
     */
    this.mTime = null;

    /**
     * @private
     * @type {black-engine~Device}
     */
    this.mDevice = null;

    /**
     * @private
     * @type {black-engine~AssetManager}
     */
    this.mAssets = null;

    /**
     * Active camera instance.
     * 
     * @private
     * @type {black-engine~Camera}
     */
    this.mCamera = null;
  }
  
  /**
   * Returns current Black Engine instance.
   * 
   * @returns {black-engine~Engine}
   */
  static get engine() {
    return mInstance.mEngine;
  }

  /**
   * Sets new Engine instance.
   * @param {black-engine~Engine} value
   */
  static set engine(value) {
    mInstance.mEngine = value;
  }

  /**
   * Returns current active Input System instance.
   * 
   * @returns {black-engine~Input}
   */
  static get input() {
    return mInstance.mInput;
  }

  /**
   * Sets new Input System.
   * @param {black-engine~Input} value
   */
  static set input(value) {
    mInstance.mInput = value;
  }

  /**
   * Returns current active Audio System instance.
   * 
   * @returns {black-engine~MasterAudio}
   */
  static get audio() {
    return mInstance.mAudio;
  }

  /**
   * Sets new Audio System.
   * @param {black-engine~MasterAudio} value
   */
  static set audio(value) {
    mInstance.mAudio = value;
  }
  
  /**
   * Returns current Time management instance.
   * 
   * @returns {black-engine~Time}
   */
  static get time() {
    return mInstance.mTime;
  }

  /**
   * Sets new Time instance.
   * @param {black-engine~Time} value
   */
  static set time(value) {
    mInstance.mTime = value;
  }  

  /**
   * Returns current Device instance.
   * 
   * @returns {black-engine~Device}
   */
  static get device() {
    return mInstance.mDevice;
  }

  /**
   * Sets new Device instance.
   * @param {black-engine~Device} value
   */
  static set device(value) {
    mInstance.mDevice = value;
  }

  /**
   * Default AssetManager instance. Sprite and other classes uses this instance to find textures by name.
   * It will be automatically re-assigned when new AssetManager is created.
   * 
   * @returns {black-engine~AssetManager}
   */
  static get assets() {
    return mInstance.mAssets;
  }

  /**
   * Sets new AssetManager.
   * @param {black-engine~AssetManager} value
   */
  static set assets(value) {
    mInstance.mAssets = value;
  }

  /**
   * Returns current stage.
   *
   * @readonly
   * @returns {black-engine~Stage}
   */
  static get stage() {
    return mInstance.mEngine.mStage;
  }

  /**
   * Returns current video driver.
   *
   * @readonly
   * @returns {black-engine~VideoNullDriver}
   */
  static get driver() {
    return mInstance.mEngine.mVideo;
  }

  /**
   * Returns active camera instance.
   * 
   * @returns {black-engine~Camera}
   */
  static get camera() {
    if (mInstance.mCamera !== null && mInstance.mCamera.mAdded === true)
      return mInstance.mCamera;

    return null;
  }

  /**
   * Sets default camera;
   * @param {black-engine~Camera} value
   */
  static set camera(value) {
    mInstance.mCamera = value;
  }

  /**
   * @readonly
   * @returns {number}
   */
  static get magic() {
    return Math.random();
  }
}

new Black();

/**
 * The MessageDispatcher class is the base class for all classes that posts messages.
 *
 * Global messages will not be dispatched on non GameObject objects.
 *
 * @cat core
 */
class MessageDispatcher {
  /**
   * Creates new MessageDispatcher instance
   * @param {boolean} [checkForStage=false]
   */
  constructor(checkForStage = false) {
    this.mBindings = null;
    this.checkForStage = checkForStage;
  }

  /**
   * Adds listener by given name and callback.
   *
   * @public
   * @param {string} name       Message name.
   * @param {Function} callback Function to be called on message send.
   * @param {*} [context=null]  Object to be used as `this` in callback function.
   * @return {black-engine~MessageBinding}
   */
  on(name, callback, context) {
    return this.__on(name, callback, false, context);
  }

  /**
   * Removes all bindings by given message name.
   * 
   * @public
   * @param {...string} names One or more message name.
   * @returns {void}
   */
  off(...names) {
    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      let earIndex = name.indexOf('@');
      if (earIndex !== -1) {
        Debug.error('Removing overheard bindings is not allowed.');
        return;
      }

      if (this.mBindings !== null && this.mBindings.hasOwnProperty(name) === true) {
        let bindings = this.mBindings[name].slice();

        for (let i = 0; i < bindings.length; i++)
          this.__off(bindings[i]);
      }
    }
  }

  /**
   * Adds listener by given name and callback. Binding will be automatically removed after first execution.
   *
   * @public
   * @param {string} name       Message name.
   * @param {Function} callback Function to be called on message send.
   * @param {*} [context=null]  Object to be used as `this` in callback function.
   * @return {black-engine~MessageBinding}
   */
  once(name, callback, context) {
    return this.__on(name, callback, true, context);
  }

  /**
   * Posts message with a given params.
   * 
   * Adding `~` character to the begging of the name will bubble message to the top of the tree.
   *
   * @public
   * @param {string} name  The name of a message
   * @param {...*} params  A list of params to send
   * @return {void}
   */
  post(name, ...params) {
    let message = this.__draftMessage(name);

    if (message.type === MessageType.DIRECT)
      this.__invoke(this, message, ...params);
    else if (message.type === MessageType.BUBBLE)
      this.__postBubbles(this, message, true, ...params);

    if (message.canceled === false)
      this.__invokeOverheard(this, message, ...params);

    Message.pool.release(message);
  }

  /**
   * Returns parent MessageDispatcher.
   * 
   * @readonly
   * @return {black-engine~MessageDispatcher|null}
   */
  get parent() {
    return null;
  }

  /**
   * Returns the stage Game Object to which this belongs to or null if not added onto stage.
   *
   * @readonly
   * @return {black-engine~Stage|null}
   */
  get stage() {
    return null;
  }

  /**
   * Returns string representing a url like path to this object in the display
   * tree.
   *
   * @readonly
   * @return {string|null}
   */
  get path() {
    return null;
  }

  /**
   * @private
   * @ignore
   * @param {string} name
   * @param {Function} callback
   * @param {boolean} [isOnce=false]
   * @param {*} [context=null]
   * @return {black-engine~MessageBinding}
   */
  __on(name, callback, isOnce = false, context = null) {
    Debug.assert(name !== null, 'name cannot be null.');
    Debug.assert(name.trim().length > 0, 'name cannot be null.');
    Debug.assert(!(name.indexOf('~') === 0), 'Using `~` is not tot allowed here.');
    Debug.assert(callback !== null, 'callback cannot be null.');

    let earIndex = name.indexOf('@');
    if (earIndex !== -1) {
      let messageName = name.substring(0, earIndex);
      let pathPattern = name.substring(earIndex + 1);
      let global = MessageDispatcher.mOverheardHandlers;

      if (global.hasOwnProperty(messageName) === false)
        global[messageName] = [];

      let bindings = global[messageName];
      let binding = new MessageBinding(this, messageName, callback, isOnce, context, BindingType.OVERHEARD, pathPattern);
      bindings.push(binding);
      return binding;
    }

    if (this.mBindings === null)
      this.mBindings = {};

    if (this.mBindings.hasOwnProperty(name) === false)
      this.mBindings[name] = [];

    let binding = new MessageBinding(this, name, callback, isOnce, context, BindingType.REGULAR);
    this.mBindings[name].push(binding);

    return binding;
  }

  /**
   * @private
   * @ignore
   * @param {black-engine~MessageBinding} binding 
   */
  __off(binding) {
    if (binding.type === BindingType.REGULAR) {
      if (this.mBindings === null)
        return;

      if (this.mBindings.hasOwnProperty(binding.name) === false)
        return;

      let bindings = this.mBindings[binding.name];
      const ix = bindings.indexOf(binding);
      if (ix === -1)
        return;

      bindings.splice(ix, 1);
    } else if (binding.type === BindingType.OVERHEARD) {
      let global = MessageDispatcher.mOverheardHandlers;
      if (global.hasOwnProperty(binding.name) === false)
        return;

      let bindings = global[binding.name];

      const ix = bindings.indexOf(binding);
      if (ix === -1)
        return;

      bindings.splice(ix, 1);
    }
  }

  /**
   * @private
   * @ignore
   * @param {black-engine~MessageDispatcher} sender 
   * @param {black-engine~Message} message 
   * @param {...*} params 
   * @return {void}
   */
  __invoke(sender, message, ...params) {
    if (message.canceled === true)
      return;

    if (this.mBindings === null)
      return;

    if (this.checkForStage === true && this !== Black.stage && this.stage === null)
      return;

    let bindings = (this.mBindings[message.name]);

    if (bindings === undefined || bindings.length === 0)
      return;

    let cloned = bindings.slice(0);

    for (let i = 0; i < cloned.length; i++) {
      message.target = this;

      let binding = cloned[i];

      if (this.checkForStage === true && binding.owner.stage === Black.stage && binding.owner.stage === null)
        continue;

      binding.callback.call(binding.context, message, ...params);

      if (binding.isOnce === true)
        this.__off(binding);

      if (message.canceled === true)
        return;
    }
  }

  /**
   * @private
   * @ignore
   * @param {black-engine~MessageDispatcher}  sender
   * @param {black-engine~Message}  message
   * @param {...*} params
   * @return {void}
   */
  __invokeOverheard(sender, message, ...params) {
    if (message.canceled === true)
      return;

    let bindings = MessageDispatcher.mOverheardHandlers[message.name];

    if (bindings === undefined || bindings.length === 0)
      return;

    let cloned = bindings.slice(0);

    for (let i = 0; i < cloned.length; i++) {
      let binding = cloned[i];

      if (this.checkForStage === true && binding.owner.stage === Black.stage && binding.owner.stage === null)
        continue;

      if (!this.__checkPath(sender.path, binding))
        continue;

      message.target = this;
      binding.callback.call(binding.context, message, ...params);

      if (binding.isOnce === true)
        this.__off(binding);

      if (message.canceled === true)
        return;
    }
  }

  /**
   * Message will always reach the stage even if some of the middle nodes were removed during process of invocation.
   * 
   * @private
   * @ignore
   * @param {*}  sender
   * @param {Message}  message
   * @param {boolean}  toTop
   * @param {...*} params
   * @return {void}
   */
  __postBubbles(sender, message, toTop, ...params) {
    message.origin = this;

    let list = [this];

    let current = this;
    while (current.parent !== null) {
      list.push(current.parent);
      current = current.parent;
    }

    for (let i = 0; i < list.length; i++) {
      let dispatcher = list[i];
      dispatcher.__invoke(sender, message, ...params);

      if (message.canceled === true)
        return;
    }
  }

  /**
   * @private
   * @ignore
   * 
   * @param {string} name 
   * @returns {black-engine~Message}
   */
  __draftMessage(name) {
    const message = Message.pool.get();
    message.__reset();

    message.sender = this;

    if (name.charAt(0) === '~') {
      message.name = name.substr(1);
      message.type = MessageType.BUBBLE;
    } else {
      message.name = name;
    }

    return message;
  }

  /**
   * @ignore
   * @private
   * @param {string|null} path
   * @param {black-engine~MessageBinding} binding
   * @returns {boolean}
   */
  __checkPath(path, binding) {
    if (path === null || binding.pathPattern === null)
      return false;

    if (path === binding.pathPattern)
      return true;

    if (binding.pathPattern.indexOf('*') === -1)
      return path === binding.pathPattern;

    return binding.glob.test(path);
  }

  static dispose() {
    MessageDispatcher.mOverheardHandlers = {};
  }
}

/**
 * @private
 * @type {Object.<string, Array>}
 */
MessageDispatcher.mOverheardHandlers = {};

/**
 * @cat display.text
 * @static
 * @constant
 * @enum {string}
 */
const FontStyle = {
  NORMAL: 'normal',
  ITALIC: 'italic'
};

/**
 * @cat display.text
 * @static
 * @constant
 * @enum {string}
 */
const FontWeight = {
  NORMAL: '400',
  BOLD: '700'
};

/**
 * @private
 * @ignore
 * @type {TextStyle|null}
 */
let defaultStyle = null;

/**
 * Holds TextField's style details.
 *
 * @cat display.text
 */
class TextStyle {
  /**
   * Creates instance of TextStyle.
   * @param  {string=} family                                             Font name
   * @param  {number=} [color=0x0]                                        Text color as hexadecimal number eg 0xff0000 (total red)
   * @param  {number=} [size=14]                                          Text size
   * @param  {black-engine~FontStyle=} [style=FontStyle.NORMAL]                        Text style eg italic
   * @param  {black-engine~FontWeight=} [weight=FontWeight.NORMAL]                     Font thickness. The value is set from 100 to 900 in increments of 100.
   * @param  {number=} [strokeThickness=0]                                Thickness of the stroke. 0 means that no stroke
   * @param  {number=} [strokeColor=0xffffff]                             Stroke color as hexadecimal number eg 0x00ff00 (total green)
   */
  constructor(family = 'sans-serif', color = 0x000000, size = 14, style = FontStyle.NORMAL, weight = FontWeight.NORMAL, strokeThickness = 0, strokeColor = 0xffffff) {
    /** @type {string} */
    this.name = 'def';

    /** @type {string} */
    this.family = family;

    /** @type {number} */
    this.size = size;

    /** @type {number} */
    this.color = color;

    /** @type {number} */
    this.alpha = 1;

    /** @type {black-engine~FontStyle} */
    this.style = style;

    /** @type {black-engine~FontWeight} */
    this.weight = weight;

    /** @type {number} */
    this.strokeThickness = strokeThickness;

    /** @type {number} */
    this.strokeColor = strokeColor;

    /** @type {number} */
    this.strokeAlpha = 1;

    /** @type {boolean} */
    this.dropShadow = false;

    /** @type {number} */
    this.shadowDistanceX = 0;

    /** @type {number} */
    this.shadowDistanceY = 0;

    /** @type {number} */
    this.shadowColor = 0x0;

    /** @type {number} */
    this.shadowAlpha = 1;

    /** @type {number} */
    this.shadowBlur = 0;
  }

  /**
   * @deprecated
   */
  clone(family = null, color = NaN, size = NaN, style = null, weight = null, strokeThickness = NaN, strokeColor = NaN) {
    let ret = new TextStyle();
    ret.family = family === null ? this.family : family;
    ret.size = isNaN(size) ? this.size : size;
    ret.color = isNaN(color) ? this.color : color;
    ret.style = style === null ? this.style : style;
    ret.weight = weight === null ? this.weight : weight;
    ret.strokeThickness = isNaN(strokeThickness) ? this.strokeThickness : strokeThickness;
    ret.strokeColor = isNaN(strokeColor) ? this.strokeColor : strokeColor;

    ret.dropShadow = this.dropShadow;
    ret.shadowAlpha = this.shadowAlpha;
    ret.shadowBlur = this.shadowBlur;
    ret.shadowColor = this.shadowColor;
    ret.shadowDistanceX = this.shadowDistanceX;
    ret.shadowDistanceY = this.shadowDistanceY;

    return ret;
  }

  /**
   * Returns default TextStyle instance.
   * 
   * @returns {black-engine~TextStyle}
   */
  static get default() {
    if (defaultStyle === null)
      defaultStyle = new TextStyle('sans-serif', 0x0, 14, FontStyle.NORMAL, FontWeight.NORMAL, 0, 0x0);

    return defaultStyle;
  }
}

/** 
 * @ignore 
 * @static 
 * @private
 */
let CACHE = {};

/** 
 * @ignore 
 * @static 
 * @private
 */
let CONTEXT = null;

/** 
 * @ignore 
 * @static 
 * @private
 * @type {HTMLCanvasElement|OffscreenCanvas}
 */
let CANVAS = null;

let useOffscreenCanvas = false;

/**
 * Font measurement tools.
 *
 * @cat display.text
 */
class FontMetrics {
  /**
   * Creates new instance of FontMetrics. Do not use constructor directly instead use {@link FontMetrics#get} method.
   *
   * @ignore
   * @private
   * @param {black-engine~TextStyle} style Default text info with 24 font size.
   */
  constructor(style) {
    if (CONTEXT === null) {
      if (typeof OffscreenCanvas !== 'undefined' && useOffscreenCanvas === true) {
        CANVAS = new OffscreenCanvas(10, 200);
        CONTEXT = CANVAS.getContext('2d');
      } else {
        CANVAS = /** @type {HTMLCanvasElement} */(document.createElement('canvas'));
        CONTEXT = CANVAS.getContext('2d');

        CANVAS.width = 10;
        CANVAS.height = 200;
      }
    }

    style.size = 24;

    /** @private */
    this.mCanvas = CANVAS;

    /** @private */
    this.mCtx = CONTEXT;

    /** 
     * @private 
     * @type {black-engine~TextStyle} 
     */
    this.mStyle = style;

    const drawY = Math.floor(CANVAS.height * 0.7766);
    this.mCtx.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height);
    this.mCtx.font = `${style.weight} ${style.size}px ${style.family}`;
    this.mCtx.fillText('x', 0, drawY, 1);

    let data = this.mCtx.getImageData(0, 0, 1, this.mCanvas.height).data;

    const xHeight = this.__getBottom(data) - this.__getTop(data);

    for (let i = 32; i <= 126; i++) {
      this.mCtx.fillText(String.fromCharCode(i), 0, drawY, 1);
    }

    data = this.mCtx.getImageData(0, 0, 1, this.mCanvas.height).data;

    const top = this.__getTop(data);
    const bottom = this.__getBottom(data);
    const baseLine = drawY - top;
    const height = bottom - top;

    /**
     * The line upon which most letters "sit" and below which descender extend.
     * @public
     * @type {number}
     */
    this.baseline = baseLine;

    /**
     * The maximum y position for the lowest glyph in the font.
     * @public
     * @type {number}
     */
    this.bottom = height;

    /**
     * The recommended distance above the mean line (top of lower case characters) for singled spaced text.
     * @public
     * @type {number}
     */
    this.ascent = baseLine - xHeight;

    /**
     * The recommended distance below the baseline for singled spaced text.
     * @public
     * @type {number}
     */
    this.descent = height - baseLine;

    /**
      * The distance between the baseline and the mean line of lower-case letters, i.e height of `x` character.
      * @public
      * @type {number}
      */
    this.xHeight = xHeight;

    /**
     * The height of a capital letter above the baseline.
     * @public
     * @type {number}
     */
    this.capHeight = baseLine;
  }

  /**
   * Gets/sets if OffscreenCanvas should be used to measure text width. Usefull when running Black Engine inside worker.
   * @returns {boolean}
   */
  static get useOffscreenCanvas() {
    return useOffscreenCanvas;
  }

  /**
   * @param {boolean} value
   * @returns {void}
   */
  static set useOffscreenCanvas(value) {
    useOffscreenCanvas = value;
  }

  /**
   * `capHeight` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get capHeightNormalized() {
    return this.capHeight / this.mStyle.size;
  }

  /**
   * `xHeight` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get xHeightNormalized() {
    return this.xHeight / this.mStyle.size;
  }

  /**
   * `ascent` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get ascentNormalized() {
    return this.ascent / this.mStyle.size;
  }

  /**
   * `descent` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get descentNormalized() {
    return this.descent / this.mStyle.size;
  }

  /**
   * `baseline` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get baselineNormalized() {
    return this.baseline / this.mStyle.size;
  }

  /**
   * `bottom` normalized.
   *
   * @readonly
   * @public
   * @returns {number}
   */
  get bottomNormalized() {
    return this.bottom / this.mStyle.size;
  }

  /**
   * @ignore
   * @private
   * @param {Uint8ClampedArray} data
   * @returns {number}
   */
  __getTop(data) {
    for (let i = 3, n = data.length; i < n; i += 4) {
      if (data[i] > 0) {
        return (i - 3) / 4;
      }
    }

    return data.length / 4;
  }

  /**
   * @ignore
   * @private
   * @param {Uint8ClampedArray} data
   * @returns {number}
   */
  __getBottom(data) {
    for (let i = data.length - 1; i > 0; i -= 4) {
      if (data[i] > 0) {
        return (i + 1) / 4;
      }
    }

    return 0;
  }

  /**
   * Use this method instead of constructor.
   *
   * @static
   * @param {string} fontName Name of font.
   * @returns {black-engine~FontMetrics}
   */
  static get(fontName) {
    let cache = CACHE[fontName];

    if (cache == null) {
      let style = new TextStyle(fontName, 0, 24);
      cache = new FontMetrics(style);
      CACHE[fontName] = cache;
    }

    return cache;
  }
}

/**
 * Object representing text measurement result.
 * 
 * @cat display.text
 */
class TextMetricsData {
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
class TextSegmentMetricsData {
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

    context.font = `${style.weight} ${style.style} ${style.size}px ${style.family}`;
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

/**
 * Provides time related methods.
 *
 * @cat core
 * 
 * @static
 */
class Time {
  constructor() {
    /** 
     * @private
     * @type {number} 
     */
    this.mTime = 0;

    /** 
     * @private
     * @type {number} 
     */
    this.mActualTime = 0;

    /** 
     * @private
     * @type {number} 
     */
    this.mDeltaTimeMs = 1000 / 60;

    /** 
     * @private
     * @type {number} 
     */
    this.mDeltaTime = (1000 / 60) * 0.001;

    /** 
     * @private
     * @type {number} 
     */
    this.mScale = 1;

    /** 
     * @private
     * @type {number} 
     */
    this.mAlphaTime = 0;

    /** 
     * @private
     * @type {number} 
     */
    this.mRenderOffset = 0;
  }

  /**
   * Time since start in seconds.
   * 
   * @static
   * @returns {number}
   */
  get now() {
    return this.mTime;
  }

  /**
   * Time since last frame.
   * 
   * @static
   * @returns {number}
   */
  get dt() {
    return this.mDeltaTime * this.mScale;
  }

  /**
   * Time since last update.
   * 
   * @static
   * @returns {number}
   */
  get alpha() {
    return this.mAlphaTime;
  }

  /**
   * Time since last frame.
   * 
   * @static
   * @returns {number}
   */
  get delta() {
    return this.mDeltaTime * this.mScale;
  }

  /**
   * Gets/Sets timescale for engine
   * 
   * @returns {number}
   */
  get scale() {
    return this.mScale;
  }

  /**
   * @param {number} value
   */
  set scale(value) {
    Debug.assert(value >= 0, 'Time scale must be >= 0.');

    this.mScale = value;
  }
}

/**
 * Base class for custom systems. System is used to listen scene changes.
 *
 * @cat core
 * @extends black-engine~MessageDispatcher
 */
class System extends MessageDispatcher {
  constructor() {
    super();
  }

  /**
   * Called when engine is paused.
   *
   * @public
   * @return {void} 
   */
  onPause() { }

  /**
   * Called when engine is resumed.
   *
   * @public
   * @return {void} 
   */
  onResume() { }

  /**
   * onUpdate
   *
   * @protected
   * @return {void} 
   */
  onUpdate() { }

  /**
   * onPostUpdate
   *
   * @protected
   * @return {void}
   */
  onPostUpdate() { }

  /**
   * onRender
   *
   * @protected
   * @return {void}
   */
  onRender() { }

  /**
   * onChildrenAdded
   *
   * @protected
   * @param {black-engine~GameObject} gameObject GameObject instance.
   * @return {void}
   */
  onChildrenAdded(gameObject) { }

  /**
   * onChildrenRemoved
   *
   * @protected
   * @param {black-engine~GameObject} gameObject GameObject instance.
   * @return {void}
   */
  onChildrenRemoved(gameObject) { }

  /**
   * onChildrenRemoved
   *
   * @protected
   * @param {black-engine~GameObject} gameObject GameObject instance.
   * @return {void}
   */
  onChildrenChanged(gameObject) { }

  /**
   * onComponentAdded
   *
   * @protected
   * @param {black-engine~GameObject} child GameObject instance.
   * @param {black-engine~Component} component Component instance added to game object.
   * @return {void} 
   */
  onComponentAdded(child, component) { }

  /**
   * onComponentRemoved
   *
   * @protected
   * @param {black-engine~GameObject} child GameObject instance.
   * @param {black-engine~Component} component Component instance removed from game object.
   * @return {void}
   */
  onComponentRemoved(child, component) { }

  /**
   * Disposes all allocated resources.
   */
  dispose() { }
}

/**
 * Orientation
 * @cat display
 * @enum {string}
 * @static
 * @constant
 */
const Orientation = {
  /** Automatically detects orientation and switches width and height depending on device orientation. */
  UNIVERSAL: 'universal',
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait'
};

/**
 * Manages viewport, handles DOM container resize events and updates internal data.
 * When firing `resize` event stage bounds will be not up to date. Listen for stage's `resize` message instead.
 *
 * @cat core
 * @fires Viewport#resize
 * @extends black-engine~MessageDispatcher
 */
class Viewport extends MessageDispatcher {
  /**
   * constructor
   * @param {HTMLElement|null} containerElement The native HTML element.
   * @return {void}
   */
  constructor(containerElement = null) {
    super();

    /** 
     * @private 
     * @type {HTMLElement|null} 
     */
    this.mContainerElement = containerElement;

    /** 
     * @private 
     * @type {HTMLElement|Element|null} 
     */
    this.mViewportElement = null;

    /** 
     * @private 
     * @type {black-engine~Rectangle} 
     */
    this.mSize = new Rectangle();

    /** 
     * @private 
     * @type {boolean} 
     */
    this.isTransparent = true;

    /** 
     * @private 
     * @type {number} 
     */
    this.backgroundColor = 0x000000;

    /** 
     * @private 
     * @type {number} 
     */
    this.mChecksLeftSeconds = 0;

    /** 
     * @private 
     * @type {black-engine~Orientation} 
     */
    this.mOrientation = Orientation.UNIVERSAL;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mOrientationLock = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mRotation = 0;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsPrimary = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mReflect = false;

    /**
     * @private
     * @type {Function}
     */
    this.mBoundResize;

    this.__initialize();
  }

  /**
   * @ignore
   */
  __initialize() {
    this.mViewportElement = /** @type {HTMLElement} */ (document.createElement('div'));
    this.mViewportElement.style.position = 'relative';
    this.mContainerElement.appendChild(this.mViewportElement);

    let style = this.mContainerElement.style;
    style.userSelect = 'none';
    style.touchAction = 'none';
    style.cursor = 'auto';
    style.WebkitTapHighlightColor = 'rgba(0, 0, 0, 0)';

    let size = this.mContainerElement.getBoundingClientRect();
    this.mSize.set(size.left, size.top, size.width, size.height);

    this.mIsPrimary = this.isPrimary();

    this.__onResize();

    this.mBoundResize = x => this.__onResize();
    window.addEventListener('resize', this.mBoundResize);
  }

  isPrimary() {
    const orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type;

    if (orientation === 'landscape-primary' || orientation === 'portrait-primary')
      return true;
    else if (orientation === 'landscape-secondary' || orientation === 'portrait-secondary')
      return false;

    Debug.warn('The orientation API isn\'t supported in this browser');

    return true;
  }

  /**
   * Gets/Sets stage orientation.
   *
   * @returns {black-engine~Orientation}
   */
  get orientation() {
    return this.mOrientation;
  }

  /**
   * @param {black-engine~Orientation} value
   * @returns {void}
   */
  set orientation(value) {
    this.mOrientation = value;
    this.__onResize();
  }

  /**
   * Gets/sets whenever stage orientation should be locked. If false and orientation is not universal stage will remain same size in both orientation.
   * @returns {boolean}
   */
  get orientationLock() {
    return this.mOrientationLock;
  }

  /**
   * @param {boolean} value
   * @returns {void}
   */
  set orientationLock(value) {
    this.mOrientationLock = value;
    this.__onResize();
  }

  /**
   * @private
   * @ignore
   */
  __update() {
    if (this.mChecksLeftSeconds <= 0)
      return;

    this.__onResize();

    this.mChecksLeftSeconds -= Black.time.delta;
  }

  /**
   * Refreshes viewport size and posts Message.RESIZE message. Make sure to refresh stage too in case container has changed its size.
   */
  refresh() {
    this.__onResize();
  }

  /**
   * @private
   * @ignore
   */
  __onResize() {
    const viewportElementStyle = this.mViewportElement.style;
    const size = this.mContainerElement.getBoundingClientRect();
    const deviceOrientation = size.width > size.height ? Orientation.LANDSCAPE : Orientation.PORTRAIT;

    const dispatchSize = Rectangle.pool.get().copyFrom(size);
    const wasPrimary = this.mIsPrimary;
    this.mIsPrimary = this.isPrimary();

    if (this.mIsPrimary !== wasPrimary)
      this.mReflect = !this.mReflect;

    if (this.mOrientationLock && this.mOrientation !== deviceOrientation) {
      this.mRotation = this.mReflect ? -1 : 1;

      viewportElementStyle.transform = this.mReflect ? 'rotate(-90deg)' : 'rotate(90deg)';
      viewportElementStyle.left = (size.width - size.height) * 0.5 + 'px';
      viewportElementStyle.top = (size.height - size.width) * 0.5 + 'px';
      viewportElementStyle.width = size.height + 'px';
      viewportElementStyle.height = size.width + 'px';

      dispatchSize.width = size.height;
      dispatchSize.height = size.width;
    } else {
      this.mRotation = 0;

      this.mReflect = false;
      viewportElementStyle.transform = 'rotate(0deg)';
      viewportElementStyle.left = '0px';
      viewportElementStyle.top = '0px';
      viewportElementStyle.width = size.width + 'px';
      viewportElementStyle.height = size.height + 'px';
    }

    if (this.mSize.equals(dispatchSize) === true)
      return;

    this.mSize.copyFrom(dispatchSize);

    /**
     * Posted every time viewport size has changed.
     * @event Viewport#resize
     */
    this.post(Message.RESIZE, dispatchSize);

    this.mChecksLeftSeconds = 1;
    Rectangle.pool.release(dispatchSize);
  }

  dispose() {
    this.mViewportElement.remove();
    window.removeEventListener('resize', this.mBoundResize);
  }

  /**
   * Returns the size of a viewport.
   *
   * @return {black-engine~Rectangle}
   */
  get size() {
    return this.mSize;
  }

  /**
   * Returns the HTML container element the viewport runs in.
   *
   * @return {Element}
   */
  get nativeElement() {
    return this.mViewportElement;
  }

  /**
   * Returns viewport orientation. 
   * 
   * -1 is for -90 degrees
   * 0 is for 0 degrees
   * 1 is for 90 degrees
   * 
   * @returns {number}
   */
  get rotation() {
    return this.mRotation;
  }
  // TODO: dispose, remove resize event

  /**
   * Returns true if device is in landscape orientation.
   * 
   * @public
   * @readonly
   * @returns {boolean}
   */
  get isLandscape() {
    return this.size.width >= this.size.height;
  }

  /**
   * Returns true if device is in portrait orientation.
   * 
   * @public
   * @readonly
   * @returns {boolean}
   */
  get isPortrait() {
    return !this.isLandscape;
  }
}

/**
 * @ignore
 * @type {number}
 */
let ID = 0;

/**
 * A base class for custom components.
 *
 * @cat core
 * @unrestricted
 * @extends black-engine~MessageDispatcher
 */
class Component extends MessageDispatcher {
  /**
   * Creates new Component instance.
   */
  constructor() {
    super(true);

    /** 
     * @private 
     * @type {number} 
     */
    this.mId = ++ID;

    /** 
     * @private 
     * @type {black-engine~GameObject|null} 
     */
    this.mGameObject = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mAdded = false;

    /**
     * Indicates whenever this modifier is enabled or not.
     * 
     * @type {boolean}
     */
    this.enabled = true;
  }

  /**
   * Called when attached to GameObject.
   *
   * @protected
   * @param  {black-engine~GameObject} gameObject The owner of this component.
   * @return {void}
   */
  onAdded(gameObject) { }

  /**
   * Called when detached from GameObject.
   *
   * @protected
   * @param  {black-engine~GameObject} gameObject The owner of this component.
   * @return {void}
   */
  onRemoved(gameObject) { }

  /**
   * Called at every update.
   *
   * @protected
   * @return {void}
   */
  onUpdate() { }

  /**
   * Called after all updates have been executed but before DisplayObject's onRender. GameObject itself does not have onRender method so Component#onRender will not be called on GameObjects.
   * This method can be used to interpolate/extrapolate values when low `Black#ups` value is used.
   *
   * @protected
   * @return {void}
   */
  onRender() { }

  /**
   * Detaches this Component from its parent GameObject.
   *
   * @returns {void}
   */
  removeFromParent() {
    if (this.mGameObject === null)
      return;

    this.mGameObject.removeComponent(this);
  }

  /**
   * Returns owner of this component.
   *
   * @readonly
   * @returns {black-engine~GameObject}
   */
  get gameObject() {
    return this.mGameObject;
  }
  
  /**
   * Returns this Component owner GameObject.
   * @readonly
   * @return {black-engine~GameObject|null}
   */
  get parent() {
    return this.mGameObject;
  }

  /**
   * Returns the stage Game Object to which this component belongs to or null if not on the stage.
   *
   * @override
   * @readonly
   * @return {black-engine~Stage|null}
   */
  get stage() {
    if (this.mGameObject === null)
      return null;

    return this.mGameObject.stage;
  }

  /**
   * Returns string representing a url like path to this object in the display tree.
   *
   * @override
   * @readonly
   * @return {string|null}
   */
  get path() {
    if (this.mGameObject !== null)
      return this.mGameObject.path + '#' + this.constructor.name;

    return this.constructor.name;
  }
}

/**
 * A blend mode enum.
 * @cat drivers
 * @static
 * @constant
 * @enum {string}
 */
const BlendMode = {
  /** Inherits blend mode from parent display object */
  AUTO       : 'auto',
  NORMAL     : 'normal',
  ADD        : 'add',
  MULTIPLY   : 'multiply',
  SCREEN     : 'screen',
  OVERLAY    : 'overlay',
  DARKEN     : 'darken',
  LIGHTEN    : 'lighten',
  COLOR_DODGE: 'colorDodge',
  COLOR_BURN : 'colorBurn',
  HARD_LIGHT : 'hardLight',
  SOFT_LIGHT : 'softLight',
  DIFFERENCE : 'difference',
  EXCLUSION  : 'exclusion',
  HUE        : 'hue',
  SATURATE   : 'saturate',
  COLOR      : 'color',
  LUMINOSITY : 'luminosity',
  MASK       : 'mask',
  MASK_INV   : 'maskInv'
};

/** 
 * @static 
 * @constant 
 * @dict
 * @private
 */
const CanvasBlendMode = {
  'auto'       : 'auto',
  'normal'     : 'source-over',
  'add'        : 'lighter',
  'multiply'   : 'multiply',
  'screen'     : 'screen',
  'overlay'    : 'overlay',
  'darken'     : 'darken',
  'lighten'    : 'lighten',
  'colorDodge' : 'color-dodge',
  'colorBurn'  : 'color-burn',
  'hardLight'  : 'hard-light',
  'softLight'  : 'soft-light',
  'difference' : 'difference',
  'exclusion'  : 'exclusion',
  'due'        : 'hue',
  'saturate'   : 'saturate',
  'color'      : 'color',
  'luminosity' : 'luminosity',
  'mask'       : 'source-in',
  'maskInv'    : 'source-out'
};

/**
 * @private
 * @type {number}
 * @nocollapse
 */
let __ID = 0;

/**
 * A base texture class.
 *
 * @cat textures
 */
class Texture {
  /**
   * Creates new instance of texture.
   *
   * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} nativeElement The native element to get image data from.
   * @param {black-engine~Rectangle=} [region=null]                                          The area of texture to be drawn.
   * @param {black-engine~Rectangle=} [untrimmedRegion=null]                                 The original area of texture.
   * @param {number=} [scale=1]                                                 Inverted scale factor.
   * @param {black-engine~Vector=} [registrationPoint=null]                                  Default anchor for newly created sprites with the texture.
   * @param {black-engine~Rectangle=} [slice9borders=null]                                   Default slice 9 grid for newly created sprites with the texture.
   */
  constructor(nativeElement, region = null, untrimmedRegion = null, scale = 1, registrationPoint = null, slice9borders = null) {
    this.mId = ++__ID;

    /** 
     * @private 
     * @type {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} */
    this.mNative = nativeElement;

    /** 
     * @private 
     * @type {boolean} */
    this.mValid = false;

    /** 
     * @private 
     * @type {black-engine~Rectangle} */
    this.mRegion = new Rectangle();

    /** 
     * @private 
     * @type {black-engine~Rectangle} */
    this.mUntrimmedRegion = new Rectangle();

    /** 
     * @private 
     * @type {number} */
    this.mNativeWidth = 0;

    /** 
     * @private 
     * @type {number} */
    this.mNativeHeight = 0;

    /** 
     * @private 
     * @type {number} */
    this.mDisplayWidth = 0;

    /** 
     * @private 
     * @type {number} */
    this.mDisplayHeight = 0;

    /** 
     * @private 
     * @type {number} */
    this.mRenderWidth = 0;

    /** 
     * @private 
     * @type {number} */
    this.mRenderHeight = 0;

    /** 
     * @private 
     * @type {number} */
    this.mScale = scale;

    /** 
     * @private 
     * @type {black-engine~Vector|null} */
    this.mRegistrationPoint = registrationPoint;

    /** 
     * @private 
     * @type {black-engine~Rectangle|null} */
    this.mSlice9borders = slice9borders;

    this.set(nativeElement, region, untrimmedRegion, scale);
  }

  /**
   * Updates this texture with new native element.
   *
   * @param {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} nativeElement The native element to get image data from.
   * @param {black-engine~Rectangle=} [region=null]                                          The area of texture to be drawn.
   * @param {black-engine~Rectangle=} [untrimmedRegion=null]                                 The original area of texture.
   * @param {number=} [scale=1]                                                 Inverted scale factor.
   */
  set(nativeElement, region = null, untrimmedRegion = null, scale = 1) {
    Debug.assert(nativeElement != null, 'nativeElement cannot be null');
    Debug.assert(!isNaN(scale), 'scale cannot be NaN');

    this.mScale = scale;
    this.mNative = nativeElement;

    this.mNativeWidth = nativeElement.naturalWidth || nativeElement.videoWidth || nativeElement.width;
    this.mNativeHeight = nativeElement.naturalHeight || nativeElement.videoHeight || nativeElement.height;

    this.mRegion = region || this.mRegion.set(0, 0, this.mNativeWidth, this.mNativeHeight);
    this.mUntrimmedRegion = untrimmedRegion || this.mUntrimmedRegion.set(0, 0, this.mRegion.width, this.mRegion.height);

    this.mDisplayWidth = Math.ceil(this.mUntrimmedRegion.width * this.mScale);
    this.mDisplayHeight = Math.ceil(this.mUntrimmedRegion.height * this.mScale);

    this.mRenderWidth = Math.ceil(this.mRegion.width * this.mScale);
    this.mRenderHeight = Math.ceil(this.mRegion.height * this.mScale);

    this.mValid = nativeElement != null && this.mDisplayWidth > 0 && this.mDisplayHeight > 0;
  }

  /**
   * @ignore
   * @param {string} name
   * @returns {number}
   */
  static getScaleFactorFromName(name) {
    let ixStart = name.indexOf('@');
    if (ixStart === -1)
      return 1;

    let ixEnd = name.indexOf('x', ixStart);
    return parseFloat(name.substring(ixStart + 1, ixEnd));
  }

  /**
   * @ignore
   * @param {string} name
   * @returns {string}
   */
  static removeScaleFactorFromName(name) {
    let ixStart = name.indexOf('@');
    if (ixStart === -1)
      return name;

    let ixEnd = name.indexOf('x', ixStart);
    return name.substring(0, ixStart) + name.substring(ixEnd + 1);
  }

  /**
   * Creates new texture from Base64 string.
   *
   * @param {string} string Base64 string.
   * @returns {black-engine~Texture}
   */
  static fromBase64String(string) {
    let imgElement = new Image();
    imgElement.src = string;
    return new Texture(imgElement);
  }

  /**
   * @ignore
   * @param {Element} canvas
   * @param {string} type
   * @param {number} quality
   * @returns {black-engine~Texture}
   */
  static fromCanvasAsImage(canvas, type = 'image/png', quality = 1) {
    let imgElement = new Image();
    imgElement.src = /** @type {HTMLCanvasElement} */(canvas).toDataURL(type, quality);

    return new Texture(imgElement);
  }

  /**
   * @ignore
   * @param {HTMLCanvasElement} canvas
   * @returns {black-engine~Texture|null}
   */
  static fromCanvas(canvas) {
    return Black.driver.getTextureFromCanvas(canvas);
  }

  /**
   * Original width of the texture multiplied by scale.
   *
   * @readonly
   * @returns {number}
   */
  get width() {
    return this.mDisplayWidth;
  }

  /**
   * Original height of the texture multiplied by scale.
   *
   * @readonly
   * @returns {number}
   */
  get height() {
    return this.mDisplayHeight;
  }

  /**
   * Texture scale.
   *
   * @readonly
   * @returns {number}
   */
  get scale() {
    return this.mScale;
  }

  /**
   * The area of the texture to be drawn.
   *
   * @readonly
   * @returns {black-engine~Rectangle}
   */
  get region() {
    return this.mRegion;
  }

  /**
   * The original area of the texture.
   *
   * @readonly
   * @returns {black-engine~Rectangle}
   */
  get untrimmedRegion() {
    return this.mUntrimmedRegion;
  }

  /**
   * Original width of the texture.
   *
   * @readonly
   * @returns {number}
   */
  get nativeWidth() {
    return this.mNativeWidth;
  }

  /**
   * Original height of the texture.
   *
   * @readonly
   * @returns {number}
   */
  get nativeHeight() {
    return this.mNativeHeight;
  }

  /**
   * The same as Texture.width
   *
   * @readonly
   * @returns {number}
   */
  get displayWidth() {
    return this.mDisplayWidth;
  }

  /**
   * The same as Texture.height
   *
   * @readonly
   * @returns {number}
   */
  get displayHeight() {
    return this.mDisplayHeight;
  }

  /**
   * Renderable width of the texture multiplied by scale.
   *
   * @readonly
   * @returns {number}
   */
  get renderWidth() {
    return this.mRenderWidth;
  }

  /**
   * Renderable height of the texture multiplied by scale.
   *
   * @readonly
   * @returns {number}
   */
  get renderHeight() {
    return this.mRenderHeight;
  }

  /**
   * Determines if the texture can be drawn.
   *
   * @readonly
   * @returns {boolean}
   */
  get isValid() {
    return this.mValid;
  }

  /**
   * Anchor of the texture.
   * 
   * @returns {black-engine~Vector|null}
   */
  get registrationPoint() {
    return this.mRegistrationPoint;
  }

  /**
   * Returns slice 9 borders for this texture.
   * 
   * @returns {black-engine~Rectangle|null}
   */
  get slice9borders() {
    return this.mSlice9borders;
  }

  /**
   * Native HTML element.
   *
   * @readonly
   * @returns {HTMLImageElement|HTMLCanvasElement|HTMLVideoElement}
   */
  get native() {
    return this.mNative;
  }

  get id() {
    return this.mId;
  }
}

/**
 * Base class for representing rendering surface.
 *
 * @cat drivers
 */
class RenderTarget {
  /**
   * Creates new instance fo RenderTarget.
   *
   * @param {number} width  The width of the surface.
   * @param {number} height The height of the surface.
   */
  constructor(width, height) {
    /** 
     * @private 
     * @type {number} 
     */
    this.mWidth = Math.ceil(width);

    /** 
     * @private 
     * @type {number} 
     */
    this.mHeight = Math.ceil(height);
  }

  /**
   * Resizes surface to the given size.
   *
   * @param {number} width The width of the surface.
   * @param {number} height The height of the surface.
   */
  resize(width, height) {
    this.mWidth = width;
    this.mHeight = height;
  }

  /**
   * Clears whole surface.
   */
  clear() {
  }

  /**
   * The width of the surface.
   *
   * @returns {number}
   */
  get width() {
    return this.mWidth;
  }

  /**
   * @param {number} value
   * @returns {void}
   */
  set width(value) {
    this.mWidth = value;
  }

  /**
   * The height of the surface.
   *
   * @returns {number}
   */
  get height() {
    return this.mHeight;
  }

  /**
   * @param {number} value
   * @returns {void}
   */
  set height(value) {
    this.mHeight = value;
  }
}

/**
 * Canvas rendering surface.
 *
 * @extends black-engine~RenderTarget
 * @cat drivers.canvas
 */
class RenderTargetCanvas extends RenderTarget {
  /**
   * Creates new instance of RenderTargetCanvas.
   *
   * @param {number} width  The width of the surface.
   * @param {number} height The height of the surface.
   */
  constructor(width, height) {
    super(width, height);

    /** 
     * @ignore 
     * @private 
     * @type {HTMLCanvasElement} 
     */
    this.mCanvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));

    /** 
     * @ignore 
     * @private 
     * @type {CanvasRenderingContext2D} 
     */
    this.mCtx = /** @type {CanvasRenderingContext2D} */ (this.mCanvas.getContext('2d'));

    this.resize(width, height);
  }

  /**
   * @inheritDoc
   */
  resize(width, height) {
    this.mCanvas.width = Math.ceil(width);
    this.mCanvas.height = Math.ceil(height);
  }

  /**
   * @inheritDoc
   */
  clear() {
    this.mCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.mCtx.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height);
  }

  /**
   * The width of the surface.
   * @override
   * 
   * @returns {number}
   */
  get width() {
    return this.mCanvas.width;
  }

  /**
   * @override
   * 
   * @param {number} value
   * @returns {void}
   */
  set width(value) {
    this.mCanvas.width = value;
  }

  /**
   * The height of the surface.
   * @override
   *
   * @returns {number}
   */
  get height() {
    return this.mCanvas.height;
  }

  /**
   * @override
   * 
   * @param {number} value
   * @returns {void}
   */
  set height(value) {
    this.mCanvas.height = value;
  }

  /**
   * HTML canvas element.
   *
   * @returns {HTMLCanvasElement}
   */
  get native() {
    return this.mCanvas;
  }

  /**
   * Canvas rendering context.
   *
   * @returns {CanvasRenderingContext2D}
   */
  get context() {
    return this.mCtx;
  }
}

/**
 * A render unit. Base class for all renderables.
 *
 * @cat drivers
 */
class Renderer {
  /**
   * Creates new instance of Renderer.
   */
  constructor() {
    /** @type {black-engine~DisplayObject|null} */
    this.gameObject = null;

    /** @type {black-engine~Renderer|null} */
    this.parent = null;

    /** 
     * @ignore 
     * @type {boolean} 
     */
    this.skipChildren = false;

    /** 
     * @ignore 
     * @type {boolean} 
     */
    this.skipSelf = false;

    /** 
     * @ignore 
     * @type {boolean} 
     */
    this.endPassRequired = false;

    /** 
     * @ignore 
     * @type {number} 
     */
    this.endPassRequiredAt = -1;

    /** 
     * @ignore 
     * @type {number} 
     */
    this.alpha = 1;

    /** 
     * @ignore 
     * @type {black-engine~BlendMode} 
     */
    this.blendMode = BlendMode.NORMAL;

    /** 
     * @ignore 
     * @type {number|null} 
     */
    this.color = null;
  }

  /**
   * Called when this renderer needs to be rendered.
   *
   * @param {black-engine~VideoNullDriver} driver Active video driver.
   * @param {black-engine~RenderSession} session Active session.
   * @returns {void}
   */
  preRender(driver, session) {
    this.endPassRequired = this.gameObject.mClipRect !== null && this.gameObject.mClipRect.isEmpty === false;

    this.skipChildren = !(this.gameObject.mAlpha > 0 && this.gameObject.mVisible === true);
    this.skipSelf = this.skipChildren;
  }

  /**
   * Called after `preRender` but before `GameObject#onRender`. Used to compute world alpha, color and blend mode.
   * @param {black-engine~VideoNullDriver} driver 
   * @param {black-engine~RenderSession} session 
   */
  begin(driver, session) {
    this.alpha = this.gameObject.mAlpha * this.parent.alpha;
    this.color = this.gameObject.mColor === null ? this.parent.color : this.gameObject.mColor;
    this.blendMode = this.gameObject.mBlendMode === BlendMode.AUTO ? this.parent.blendMode : this.gameObject.mBlendMode;
  }

  /**
   * Called if `skipSelf` equals to false. Used to upload everything onto gpu.
   * 
   * @param {black-engine~VideoNullDriver} driver 
   * @param {black-engine~RenderSession} session 
   */
  upload(driver, session) {
    let gameObject = /** @type {DisplayObject} */ (this.gameObject);
    let transform = gameObject.worldTransformation;

    driver.setSnapToPixels(gameObject.snapToPixels);
    driver.setGlobalAlpha(this.alpha);
    driver.setGlobalBlendMode(this.blendMode);
    driver.setTransform(transform);

    if (this.endPassRequired === true)
      driver.beginClip(gameObject.mClipRect, gameObject.mPivotX, gameObject.mPivotY);
  }

  /**
   * Called if `skipSelf` equals to false.
   *
   * @param {black-engine~VideoNullDriver} driver Active video driver.
   * @param {black-engine~RenderSession} session
   * @returns {void}
   */
  render(driver, session) {
  }

  /**
   * Called after all children objects got rendered.
   * 
   * @param {black-engine~VideoNullDriver} driver 
   * @param {black-engine~RenderSession} session 
   */
  end(driver, session) {
    driver.endClip();

    this.endPassRequiredAt = -1;
    this.endPassRequired = false;
  }

  /**
   * Tints given texture with a given color.
   * 
   * @param {black-engine~Texture} texture 
   * @param {number|null} color 
   * @returns {black-engine~Texture}
   */
  static getColoredTexture(texture, color) {
    if (color === 0xFFFFFF || color === null)
      return texture;

    let colorString = color.toString();
    if (Renderer.__colorCache.has(texture.id, colorString))
      return /** @type {Texture}*/ (Renderer.__colorCache.get(texture.id, colorString));

    let region = texture.region;
    let w = region.width;
    let h = region.height;

    let rt = new RenderTargetCanvas(w, h);
    let ctx = rt.context;

    ctx.fillStyle = ColorHelper.hexColorToString(color);
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(texture.native, region.x, region.y, region.width, region.height, 0, 0, region.width, region.height);

    ctx.globalCompositeOperation = 'destination-atop';
    ctx.drawImage(texture.native, region.x, region.y, region.width, region.height, 0, 0, region.width, region.height);

    let t = new Texture(rt.native, null, texture.untrimmedRegion.clone(), texture.scale);
    Renderer.__colorCache.set(texture.id, colorString, t);

    return t;
  }
}

/**
 * @ignore
 * @private
 * @static
 * @type {black-engine~MapMap}
 */
Renderer.__colorCache = new MapMap();

/**
 * Used to optimize battery-life on static scenes.
 * @private
 * @type {boolean}
 * @nocollapse
 */
Renderer.__dirty = true;

/**
 * Indicates whenever engine should render the stage if nothing were changed in this frame. Default is false.
 * @type {boolean}
 */
Renderer.skipUnchangedFrames = false;

/**
 * Base class for collider component.
 *
 * @cat colliders
 * @extends black-engine~Component
 */
class Collider extends Component {
  /**
   * Creates new instance for Collider.
   *
   * @ignore
   */
  constructor() {
    super();

    /**
     * Dirty flag.
     * 
     * @private 
     * @type {boolean}
     */
    this.mChanged = true;

    /**
     * Global in stage coordinates center.
     * 
     * @private 
     * @type {black-engine~Vector}
     */
    this.mCenter = new Vector();

    /**
     * Global in stage coordinates min x and y vertex.
     * 
     * @private 
     * @type {black-engine~Vector}
     */
    this.mMin = new Vector();

    /**
     * Global in stage coordinates max x and y vertex. 
     * 
     * @private 
     * @type {black-engine~Vector} */
    this.mMax = new Vector();
  }

  /**
   * Checks if given global coordinates are located within collider's area.
   *
   * @public
   * @param {black-engine~Vector} point Global coordinates.
   * @returns {boolean}
   */
  containsPoint(point) {
    Debug.error('Abstract method.');
    return false;
  }

  /**
   * Updates min, max, center of this collider, to prepare to collision test
   *
   * @public
   * @param {black-engine~Matrix} transform Game object world transformation with zero position.
   * @param {black-engine~Vector} position  Rigid body position.
   */
  refresh(transform, position) { }
}

/**
 * This component will allow you to subscribe for some input messages.
 *
 * @cat input
 * @extends black-engine~Component
 */
class InputComponent extends Component {
  /**
   * @return {void}
   */
  constructor() {
    super();

    /** @type {boolean} Specifies whether the component is active. */
    this.touchable = true;

    /* INTERNAL */
    /** 
     * @ignore 
     * @type {boolean} 
     */
    this.mPointerInDispatched = false;
  }
}

/**
 * @cat core
 * @enum {number}
 */
const DirtyFlag = {
  CLEAN: 0,         // Object is 100% cached
  LOCAL: 1,         // Local transformation is dirty 
  WORLD: 2,         // World transformation is dirty 
  WORLD_INV: 4,     // Inverted world transformation is dirty 
  RENDER: 8,        // Object needs to be rendered 
  RENDER_CACHE: 16, // In case object renders to bitmap internally, bitmap needs to be updated
  ANCHOR: 32,       // 
  BOUNDS: 64,       // Parent-relative bounds needs update
  DIRTY: 0xffffff,  // Everything is dirty, you, me, everything!
  WIRB: 78
};

let ID$1 = 0;

/**
 * Building block in Black Engine.
 *
 * @cat core
 * @unrestricted
 * @extends black-engine~MessageDispatcher
 */
class GameObject extends MessageDispatcher {
  /**
   * Creates new instance of GameObject.
   */
  constructor() {
    super(true);

    /** 
     * @private 
     * @type {number} 
     */
    this.mId = ++ID$1;

    /** 
     * @private 
     * @type {string|null} 
     */
    this.mName = null;

    /** 
     * @private 
     * @type {Array<black-engine~Component>} 
     */
    this.mComponents = [];

    /** 
     * @protected 
     * @type {Array<black-engine~GameObject>} 
     */
    this.mChildren = [];

    /** 
     * @private 
     * @type {number} 
     */
    this.mX = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mY = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mScaleX = 1;

    /** 
     * @private 
     * @type {number} 
     */
    this.mScaleY = 1;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mPivotX = 0;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mPivotY = 0;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mSkewX = 0;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mSkewY = 0;

    /** 
     * @protected 
     * @type {number|null} 
     */
    this.mAnchorX = null;

    /** 
     * @protected 
     * @type {number|null} 
     */
    this.mAnchorY = null;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mPivotOffsetX = 0;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mPivotOffsetY = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mRotation = 0;

    /** 
     * @protected 
     * @type {black-engine~Rectangle} 
     */
    this.mBoundsCache = new Rectangle();

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     */
    this.mLocalTransform = new Matrix();

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     */
    this.mWorldTransform = new Matrix();

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     */
    this.mWorldTransformInverted = new Matrix();

    /** 
     * @private 
     * @type {black-engine~DirtyFlag} 
     */
    this.mDirty = DirtyFlag.DIRTY;

    /** 
     * @protected 
     * @type {black-engine~GameObject} 
     */
    this.mParent = null;

    /** 
     * @private 
     * @type {string|null} 
     */
    this.mTag = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mAdded = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mNumChildrenRemoved = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mNumComponentsRemoved = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mDirtyFrameNum = 0;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mSuspendDirty = false;

    // cache all colliders for fast access
    /** 
     * @private 
     * @type {Array<black-engine~Collider>} 
     */
    this.mCollidersCache = [];

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mChildOrComponentBeenAdded = false;

    /** 
     * @private 
     * @type {Array<black-engine~GameObject>} 
     */
    this.mChildrenClone = null;

    /** 
     * @private 
     * @type {Array<black-engine~Component>} 
     */
    this.mComponentClone = null;
  }

  make(values) {
    // can be helpful if there are many children
    this.mSuspendDirty = true;

    for (let property in values) {
      if (values.hasOwnProperty(property)) {
        this[property] = values[property];
      }
    }

    this.mSuspendDirty = false;
    this.setTransformDirty();

    return this;
  }

  /**
   * Returns unique object id.
   *
   * @returns {number}
   */
  get id() {
    return this.mId;
  }

  /**
   * Returns true if object was clean for at least 1 update.
   * 
   * Note: Make sure to apply all changes to this game object before checking for static.
   * 
   * @param {boolean} [includeChildren=true]
   * @returns {boolean}
   */
  checkStatic(includeChildren = true) {
    if (includeChildren === false)
      return this.mDirtyFrameNum < Black.engine.frameNum;

    let isDynamic = false;
    GameObject.forEach(this, x => {
      if (x.mDirtyFrameNum >= Black.engine.frameNum) {
        isDynamic = true;
        return true;
      }
    });

    return !isDynamic;
  }

  /**
   * This method called each time object added to stage.
   *
   * @action
   * @return {void}
   */
  onAdded() { }

  /**
   * Called when object is removed from stage.
   *
   * @action
   * @return {void}
   */
  onRemoved() { }

  /**
   * Sugar method for adding child `GameObjects` or `Components` in a simple manner.
   *
   * @param {...(black-engine~GameObject|black-engine~Component)} gameObjectsAndOrComponents A `GameObject` or `Component` to add.
   * @return {black-engine~GameObject} This game object
   */
  add(...gameObjectsAndOrComponents) {
    for (let i = 0; i < gameObjectsAndOrComponents.length; i++) {
      let gooc = gameObjectsAndOrComponents[i];

      if (gooc instanceof GameObject)
        this.addChild( /** @type {!GameObject} */(gooc));
      else
        this.addComponent( /** @type {!Component} */(gooc));
    }

    return this;
  }

  /**
   * Adds a child `GameObject` instance to this `GameObject` instance. The child is added to the top of all other 
   * children in this GameObject instance.
   *
   * @param  {black-engine~GameObject} child The GameObject instance to add as a child of this GameObject instance.
   * @return {black-engine~GameObject}
   */
  addChild(child) {
    return this.addChildAt(child, this.mChildren.length);
  }

  /**
   * Adds a child `GameObject` instance to this `GameObject` instance. The child is added to the top of all other 
   * children in this GameObject instance.
   *
   * @param  {black-engine~GameObject} child The GameObject instance to add as a child of this GameObject instance.
   * @param  {number=} [index=0] The index position to which the child is added.
   * @return {black-engine~GameObject} The GameObject instance that you pass in the child parameter.
   */
  addChildAt(child, index = 0) {
    Debug.assert(child instanceof GameObject, 'Type error.');

    let numChildren = this.mChildren.length;

    if (index < 0 || index > numChildren)
      throw new Error('Child index is out of bounds.');

    if (child.mParent === this)
      return this.setChildIndex(child, index);

    // this operation should be atomic. since __setParent can throw exception.
    this.mChildren.splice(index, 0, child);

    child.removeFromParent();
    child.__setParent(this);

    Black.engine.onChildrenAdded(child, this);

    this.mChildOrComponentBeenAdded = true;

    return child;
  }

  /**
   * @private
   * @ignore
   * @param {black-engine~GameObject} value
   * @return {boolean}
   */
  __setParent(value) {
    let p = value;

    while (p !== null && p !== this)
      p = p.mParent;

    if (p === this)
      throw new Error('Object cannot be a child to itself.');

    this.mParent = value;
    this.setTransformDirty();
    return true;
  }

  /**
   * Sets the index (layer) of the specified `GameObject` to the specified index (layer).
   *
   * @param {black-engine~GameObject} child The `GameObject` instance to change index for.
   * @param {number} index Desired index.
   * @returns {black-engine~GameObject} The `GameObject` instance that you pass in the child parameter.
   */
  setChildIndex(child, index) {
    let ix = this.mChildren.indexOf(child);

    if (ix < 0)
      throw new Error('Given child element was not found in children list.');

    if (ix === index)
      return child;

    // NOTE: systems needs to know when trees changes
    this.mChildren.splice(ix, 1);
    this.mChildren.splice(index, 0, child);

    if (this.stage !== null)
      Black.engine.onChildrenChanged(child);

    this.setTransformDirty();

    return child;
  }

  /**
   * Removes this `GameObject` instance from its parent.
   *
   * @return {black-engine~GameObject}
   */
  removeFromParent() {
    if (this.mParent !== null)
      this.mParent.removeChild(this);

    this.setTransformDirty();
    return this;
  }

  /**
   * Removes specified child `GameObject` instance from children.
   *
   * @param {black-engine~GameObject} child `GameObject` instance to remove.
   * @return {black-engine~GameObject} The `GameObject` instance that you pass in the child parameter.
   */
  removeChild(child) {
    let ix = this.mChildren.indexOf(child);

    if (ix < 0)
      return null;

    return this.removeChildAt(ix);
  }


  /**
   * Finds children by name.
   *
   * @param {string} name Name of the child object to find.
   * @return {black-engine~GameObject|null} GameObject instance or null if not found.
   */
  getChildByName(name) {
    for (let i = 0; i < this.mChildren.length; i++) {
      if (this.mChildren[i].name === name)
        return this.mChildren[i];
    }

    return null;
  }

  /**
   * Removes `GameObjects` instance from specified index.
   *
   * @param {number} index Index of child. Negative index will remove object from it end.
   * @return {black-engine~GameObject|null} The removed `GameObject` instance or null if not found.
   */
  removeChildAt(index) {
    let child = this.mChildren.splice(index, 1)[0];
    if (child == null)
      return null;

    let hadRoot = this.stage !== null;

    child.__setParent(null);

    if (hadRoot === true)
      Black.engine.onChildrenRemoved(child);

    this.setTransformDirty();
    this.mNumChildrenRemoved++;

    return child;
  }

  /**
   * Removes all children objects.
   * @returns {black-engine~GameObject} Returns this.
   */
  removeAllChildren() {
    while (this.mChildren.length > 0)
      this.removeChildAt(0);

    return this;
  }

  /**
   * Returns `GameObject` at specified index.
   *
   * @param {number} index The index of child `GameObject`.
   * @return {black-engine~GameObject} The `GameObject` at specified index.
   */
  getChildAt(index) {
    return this.mChildren[index];
  }

  /**
   * Adds Component instance to the end of the list.
   *
   * @throws {Error}
   * @param  {black-engine~Component} component The instances of Component to be added,
   * @return {black-engine~Component} The `Component` instance you pass in the instances parameter.
   */
  addComponent(component) {
    return this.addComponentAt(component, this.mComponents.length);
  }

  /**
   * Adds Component to the list at given position.
   * 
   * @throws {Error}
   * @param {black-engine~Component} component The instances of Component to be added,
   * @param {number} [index=0] Position in the list.
   * @returns {black-engine~Component} The `Component` instance you pass in the instances parameter.
   */
  addComponentAt(component, index = 0) {
    Debug.assert(component instanceof Component, 'Type error.');

    if (component.gameObject)
      throw new Error('Component cannot be added to two game objects at the same time.');

    let numComponents = this.mComponents.length;

    if (index < 0 || index > numComponents)
      throw new Error('Component index is out of bounds.');

    this.mComponents.splice(index, 0, component);
    component.mGameObject = this;

    if (component instanceof Collider)
      this.mCollidersCache.push(component);

    if (this.stage !== null || Black.stage === this)
      Black.engine.onComponentAdded(this, component);

    this.mChildOrComponentBeenAdded = true;

    return component;
  }

  /**
   * Removes component at given index.
   * 
   * @param {number} index Negative index will remove component from the end.
   * @returns {black-engine~Component|null} Returns removed component of null.
   */
  removeComponentAt(index) {
    let instance = this.mComponents.splice(index, 1)[0];

    if (instance == null)
      return null;

    // detach game object after or before?
    instance.mGameObject = null;

    if (instance instanceof Collider) {
      let colliderIx = this.mCollidersCache.indexOf(instance);
      if (colliderIx > -1)
        this.mCollidersCache.splice(colliderIx, 1);
    }

    if (this.stage !== null || Black.stage === this)
      Black.engine.onComponentRemoved(this, instance);

    this.mNumComponentsRemoved++;

    return instance;
  }

  /**
   * Remove specified component.
   *
   * @param {black-engine~Component} instance The `Component` instance.
   * @returns {black-engine~Component|null} Returns removed component of null.
   */
  removeComponent(instance) {
    if (instance == null)
      return null;

    Debug.assert(instance instanceof Component, 'Type error.');

    let index = this.mComponents.indexOf(instance);
    if (index > -1)
      return this.removeComponentAt(index);

    return null;
  }

  /**
   * Removes all components.
   * @returns {black-engine~GameObject} Returns this.
   */
  removeAllComponents() {
    while (this.mComponents.length > 0)
      this.removeComponentAt(0);

    return this;
  }

  /**
   * Get component by type.
   *
   * @param {Function} typeName The component type.
   * @return {black-engine~Component|null} The `Component` instance or null if not found.
   */
  getComponent(typeName) {
    for (let i = 0; i < this.mComponents.length; i++) {
      let c = this.mComponents[i];
      if (c instanceof typeName)
        return c;
    }

    return null;
  }

  /**
   * Returns number of component's of this GameObject.
   *
   * @return {number}
   */
  get numComponents() {
    return this.mComponents.length;
  }

  /**
   * Retrieves `Component` at given index.
   *
   * @param {number} index Index of component.
   * @return {black-engine~Component|null}
   */
  getComponentAt(index) {
    if (index >= 0 && index < this.mComponents.length)
      return this.mComponents[index];

    return null;
  }

  /**
   * Returns local transformation `Matrix`
   *
   * @return {black-engine~Matrix}
   */
  get localTransformation() {
    if (this.mDirty & DirtyFlag.LOCAL) {
      this.mDirty ^= DirtyFlag.LOCAL;

      if (this.mSkewX === 0.0 && this.mSkewY === 0.0) {
        if (this.mRotation === 0) {
          return this.mLocalTransform.set(this.mScaleX, 0, 0, this.mScaleY, this.mX - this.mPivotX * this.mScaleX, this.mY - this.mPivotY * this.mScaleY);
        } else {
          let cos = Math.cos(this.mRotation);
          let sin = Math.sin(this.mRotation);
          let a = this.mScaleX * cos;
          let b = this.mScaleX * sin;
          let c = this.mScaleY * -sin;
          let d = this.mScaleY * cos;
          let tx = this.mX - this.mPivotX * a - this.mPivotY * c;
          let ty = this.mY - this.mPivotX * b - this.mPivotY * d;
          return this.mLocalTransform.set(a, b, c, d, tx, ty);
        }
      } else {
        this.mLocalTransform.identity();
        this.mLocalTransform.scale(this.mScaleX, this.mScaleY);
        this.mLocalTransform.skew(this.mSkewX, this.mSkewY);
        this.mLocalTransform.rotate(this.mRotation);

        let a = this.mLocalTransform.data[0];
        let b = this.mLocalTransform.data[1];
        let c = this.mLocalTransform.data[2];
        let d = this.mLocalTransform.data[3];
        let tx = this.mX;
        let ty = this.mY;

        if (this.mPivotX !== 0.0 || this.mPivotY !== 0.0) {
          tx = this.mX - a * this.mPivotX - c * this.mPivotY;
          ty = this.mY - b * this.mPivotX - d * this.mPivotY;
        }

        this.mLocalTransform.data[4] = tx;
        this.mLocalTransform.data[5] = ty;
      }
    }

    return this.mLocalTransform;
  }

  /**
   * @param {black-engine~Matrix} value
   * @return {void}
   */
  set localTransformation(value) {
    const PI_Q = Math.PI / 4.0;

    let a = value.data[0];
    let b = value.data[1];
    let c = value.data[2];
    let d = value.data[3];
    let tx = value.data[4];
    let ty = value.data[5];

    this.mPivotOffsetX = this.mPivotOffsetY = 0;
    this.mAnchorX = this.mAnchorX = null;
    this.mX = tx;
    this.mY = ty;

    let skewX = Math.atan(-c / d);
    let skewY = Math.atan(b / a);

    if (skewX != skewX)
      skewX = 0.0;
    if (skewY != skewY)
      skewY = 0.0;

    this.mScaleY = (skewX > -PI_Q && skewX < PI_Q) ? d / Math.cos(skewX) : -c / Math.sin(skewX);
    this.mScaleX = (skewY > -PI_Q && skewY < PI_Q) ? a / Math.cos(skewY) : b / Math.sin(skewY);

    if (MathEx.equals(skewX, skewY)) {
      this.mRotation = skewX;
      this.mSkewX = this.mSkewY = 0;
    } else {
      this.mRotation = 0;
      this.mSkewX = skewX;
      this.mSkewY = skewY;
    }

    this.setTransformDirty();
  }

  /**
   * Gets cloned Matrix object which represents object orientation in world space.
   *
   * @return {black-engine~Matrix}
   */
  get worldTransformation() {
    if (this.mDirty & DirtyFlag.ANCHOR && (this.mAnchorX !== null || this.mAnchorY !== null)) {
      this.mDirty ^= DirtyFlag.ANCHOR;

      this.__updatePivots(this);

      this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.LOCAL | DirtyFlag.WIRB), true);
    }

    if (this.mDirty & DirtyFlag.WORLD) {
      this.mDirty ^= DirtyFlag.WORLD;

      if (this.mParent !== null)
        this.mParent.worldTransformation.copyTo(this.mWorldTransform).append(this.localTransformation);
      else
        this.localTransformation.copyTo(this.mWorldTransform);
    }
    return this.mWorldTransform;
  }

  /**
   * Returns cloned and inverted Matrix object which represents object orientation in world space
   *
   * @readonly
   * @return {black-engine~Matrix}
   */
  get worldTransformationInverted() {
    if ((this.mDirty & DirtyFlag.WORLD_INV)) {
      this.mDirty ^= DirtyFlag.WORLD_INV;

      this.worldTransformation.copyTo(this.mWorldTransformInverted).invert();
    }

    return this.mWorldTransformInverted;
  }

  /**
   * @ignore
   * @private
   * @return {void}
   */
  __update() {
    this.onUpdate();

    if (this.mChildOrComponentBeenAdded === false)
      return;

    if (this.mComponents.length > 0) {
      this.mComponentClone = this.mComponents.slice();

      for (let k = 0; k < this.mComponentClone.length; k++) {
        if (this.mAdded === false)
          break;

        let c = this.mComponentClone[k];

        if (c.mAdded === false || c.enabled === false)
          continue;

        c.onUpdate();
      }
    }

    if (this.mChildren.length > 0) {
      this.mChildrenClone = this.mChildren.slice();

      for (let i = 0; i < this.mChildrenClone.length; i++) {
        let child = this.mChildrenClone[i];

        if (child.mAdded === true)
          child.__update();
      }
    }
  }

  /**
   * Called at every engine update. The execution order of onFixedUpdate, onUpdate and onPostUpdate is
   * going from top to bottom of the display list.
   * 
   * @action
   * @protected
   * @return {void}
   */
  onUpdate() { }

  /**
   * Override this method if you need to specify GameObject size. Should be always be a local coordinates.
   *
   * @action
   * @protected
   * @param {black-engine~Rectangle=} [outRect=undefined] Rectangle to be returned.
   * @return {black-engine~Rectangle} bounds in local space without taking care about transformation matrix
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();
    return outRect.set(0, 0, 0, 0);
  }

  /**
   * Returns world bounds of this object and all children if specified (true by default).
   * 
   * `object.getBounds()` - relative to parent (default).<br>
   * `object.getBounds(object)` - local bounds.<br>
   * `object.getBounds(object.parent)` - relative to parent.<br>
   * `object.getBounds(objectB)` - relative to objectB space.<br>
   *
   * @param {black-engine~GameObject} [space=null] The `GameObject` relative to.
   * @param {boolean} [includeChildren=true] Specifies if include children in calculations.
   * @param {black-engine~Rectangle=} [outRect=null] Rectangle to be returned.
   * @return {black-engine~Rectangle} Returns bounds of the object with/without all children.
   */
  getBounds(space = null, includeChildren = true, outRect = undefined) {
    outRect = outRect || new Rectangle();

    this.onGetLocalBounds(outRect);

    if (space == null)
      space = this.mParent;

    if (space == this) ; else if (space == this.mParent) {
      if (includeChildren === false) {
        let matrix = Matrix.pool.get();
        matrix.copyFrom(this.localTransformation);
        matrix.transformRect(outRect, outRect);
        Matrix.pool.release(matrix);
      }
      else if (includeChildren === true && this.mDirty & DirtyFlag.BOUNDS) {
        let matrix = Matrix.pool.get();
        matrix.copyFrom(this.localTransformation);
        matrix.transformRect(outRect, outRect);
        Matrix.pool.release(matrix);
      } else {
        outRect.copyFrom(this.mBoundsCache);
        return outRect;
      }
    } else {
      let matrix = Matrix.pool.get();
      matrix.copyFrom(this.worldTransformation);
      matrix.prepend(space.worldTransformationInverted);
      matrix.transformRect(outRect, outRect);
      Matrix.pool.release(matrix);
    }

    if (includeChildren === true) {
      let childBounds = Rectangle.pool.get();

      for (let i = 0; i < this.mChildren.length; i++) {
        childBounds.zero();

        this.mChildren[i].getBounds(space, includeChildren, childBounds);
        outRect.union(childBounds);
      }

      Rectangle.pool.release(childBounds);

      if (space == this.mParent && this.mDirty & DirtyFlag.BOUNDS) {
        this.mBoundsCache.copyFrom(outRect);
        this.mDirty ^= DirtyFlag.BOUNDS;
      }
    }

    return outRect;
  }

  /**
   * Returns stage relative bounds of this object excluding it's children;
   * 
   * @param {black-engine~Rectangle=} [outRect=null] Rectangle to be store resulting bounds in.
   * @returns {black-engine~Rectangle} 
   */
  getStageBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    this.onGetLocalBounds(outRect);

    let matrix = Matrix.pool.get();
    matrix.copyFrom(this.worldTransformation);
    matrix.prepend(this.stage.worldTransformationInverted); // 120ms
    matrix.transformRect(outRect, outRect); // 250ms
    Matrix.pool.release(matrix);

    return outRect;
  }

  /**
   * Evaluates whether the game object or one of its children intersects with the given point
   *
   * @param {black-engine~Vector} localPoint Coordinates vector.
   * @return {black-engine~GameObject|null}
   */
  hitTest(localPoint) {
    let c = /** @type {InputComponent}*/ (this.getComponent(InputComponent));
    let touchable = c !== null && c.touchable;
    let insideMask = this.onHitTestMask(localPoint);

    if (touchable === false || insideMask === false)
      return null;

    let target = null;
    let numChildren = this.mChildren.length;

    for (let i = numChildren - 1; i >= 0; --i) {
      let child = this.mChildren[i];

      target = child.hitTest(localPoint);

      if (target !== null)
        return target;
    }

    if (this.onHitTest(localPoint) === true)
      return this;

    return null;
  }

  /**
   * @action
   * @protected
   * @param {black-engine~Vector} localPoint 
   * @return {boolean}
   */
  onHitTest(localPoint) {
    let contains = false;

    // BEGINOF: WTF
    let tmpVector = /** @type {Vector}*/ (Vector.pool.get());
    this.worldTransformationInverted.transformVector(localPoint, tmpVector);
    // ENDOF: WTF

    if (this.mCollidersCache.length > 0) {
      for (let i = 0; i < this.mCollidersCache.length; i++) {
        let collider = this.mCollidersCache[i];

        contains = collider.containsPoint(tmpVector);
        if (contains === true)
          return true;
      }
    } else {
      contains = this.localBounds.containsXY(tmpVector.x, tmpVector.y);
    }

    Vector.pool.release(tmpVector);
    return contains;
  }

  /**
   * @action
   * @protected
   * @param {black-engine~Vector} localPoint 
   * @return {boolean}
   */
  onHitTestMask(localPoint) {
    return true;
  }

  /**
   * Returns local bounds of this object (without children).
   * @returns {black-engine~Rectangle}
   */
  get localBounds() {
    return this.getBounds(this, false);
  }

  /**
   * Returns parent-relative bounds (including children).
   * @returns {black-engine~Rectangle}
   */
  get bounds() {
    return this.getBounds(this.mParent, true);
  }

  /**
   * Sets the object transform in one line.
   *
   * @param {number} [x=0]       Cord X.
   * @param {number} [y=0]       Cord Y.
   * @param {number} [r=0]       Rotation.
   * @param {number} [scaleX=1]  Scale X.
   * @param {number} [scaleY=1]  Scale Y.
   * @param {number} [anchorX=0] Anchor X.
   * @param {number} [anchorY=0] Anchor Y.
   * @param {boolean} [includeChildren=true] Include children when adjusting pivot?
   *
   * @return {black-engine~GameObject} This.
   */
  setTransform(x = 0, y = 0, r = 0, scaleX = 1, scaleY = 1, anchorX = 0, anchorY = 0, includeChildren = true) {
    this.mX = x;
    this.mY = y;
    this.mRotation = r;
    this.mScaleX = scaleX;
    this.mScaleY = scaleY;
    this.mAnchorX = anchorX;
    this.mAnchorY = anchorY;

    this.setTransformDirty();
    return this;
  }

  /**
   * Calculates GameObject's position relative to another GameObject.
   *
   * @param {black-engine~GameObject} gameObject Coordinates vector.
   * @param {black-engine~Vector|null} [outVector=null] Vector to be returned.
   * @return {black-engine~Vector}
   */
  relativeTo(gameObject, outVector = null) {
    outVector = outVector || new Vector();
    outVector.set(this.x, this.y);

    if (this.parent == null || gameObject == null)
      return outVector;

    this.parent.localToGlobal(outVector, outVector);
    gameObject.globalToLocal(outVector, outVector);
    return outVector;
  }

  /**
   * Calculate global position of the object.
   *
   * @param {black-engine~Vector} localPoint Coordinates vector.
   * @param {black-engine~Vector|null} [outVector=null] Vector to be returned.
   * @return {black-engine~Vector}
   */
  localToGlobal(localPoint, outVector = null) {
    return this.worldTransformation.transformVector(localPoint, outVector);
  }

  /**
   * Calculate local position of the object
   *
   * @param {black-engine~Vector} globalPoint Coordinates vector.
   * @param {black-engine~Vector|null} [outVector=null] Vector to be returned.
   * @return {black-engine~Vector}
   */
  globalToLocal(globalPoint, outVector = null) {
    return this.worldTransformationInverted.transformVector(globalPoint, outVector);
  }
  /**
   * Gets a count of children elements.
   *
   * @return {number}
   */
  get numChildren() {
    return this.mChildren.length;
  }

  /**
   * Gets/Sets the name of this GameObject instance.
   *
   * @return {string|null}
   */
  get name() {
    return this.mName;
  }

  /**
   * @param {string|null} value
   * @return {void}
   */
  set name(value) {
    this.mName = value;
  }

  /**
   * Gets/Sets the x coordinate of the GameObject instance relative to the local coordinates of the parent GameObject.
   * @return {number}
   */
  get x() {
    return this.mX;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set x(value) {
    if (this.mX == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mX = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the y coordinate of the GameObject instance relative to the local coordinates of the parent GameObject.
   *
   * @return {number}
   */
  get y() {
    return this.mY;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set y(value) {
    if (this.mY == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mY = value;
    this.setTransformDirty();
  }
  
  /**
   * Gets/sets object position.
   * 
   * NOTE: setting individual values on this vector will give zero results.
   * @returns {black-engine~Vector}
   */
  get xy() {
    return new Vector(this.mX, this.mY);
  }

  /**
   * Gets/sets object position.
   * 
   * @param {black-engine~Vector} value
   * @returns {void}
   */
  set xy(value) {
    if (this.mX === value.x && this.mY === value.y)
      return;

    this.mX = value.x;
    this.mY = value.y;

    this.setTransformDirty();
  }

  /**
   * Gets/Sets the x coordinate of the object's origin in its local space in pixels.
   *
   * @return {number}
   */
  get pivotOffsetX() {
    return this.mPivotOffsetX;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set pivotOffsetX(value) {
    if (this.mPivotOffsetX === value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mPivotOffsetX = value;

    this.__updatePivots(this);
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the y coordinate of the object's origin in its local space in pixels.
   *
   * @return {number}
   */
  get pivotOffsetY() {
    return this.mPivotOffsetY;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set pivotOffsetY(value) {
    if (this.mPivotOffsetY === value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mPivotOffsetY = value;

    this.__updatePivots(this);
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the x-coordinate of the object's origin in its local space in percent.
   * 
   * @param {number|null} value
   * @return {void}
   */
  set anchorX(value) {
    if (this.mAnchorX === value)
      return;

    Debug.assert(value !== null && !isNaN(value), 'Value cannot be NaN');

    this.mAnchorX = value;

    this.setTransformDirty();
  }

  /**
   * Gets/Sets the y-coordinate of the object's origin in its local space in percent.
   * 
   * @param {number|null} value
   * @return {void}
   */
  set anchorY(value) {
    if (this.mAnchorY === value)
      return;

    Debug.assert(value !== null && !isNaN(value), 'Value cannot be NaN');

    this.mAnchorY = value;

    this.setTransformDirty();
  }

  /**
   * Returns current anchor-x value in range from 0 to 1.
   * 
   * @returns {number|null}
   */
  get anchorX() {
    return this.mAnchorX;
  }

  /**
   * Returns current anchor-y value in range from 0 to 1.
   * 
   * @returns {number|null}
   */
  get anchorY() {
    return this.mAnchorY;
  }

  /**
   * Returns current pivot-x value in range from 0 to 1.
   * 
   * @returns {number}
   */
  get pivotX() {
    return this.mPivotX;
  }

  /**
   * Returns current pivot-y value in range from 0 to 1.
   * 
   * @returns {number}
   */
  get pivotY() {
    return this.mPivotY;
  }

  /**
   * Sets the origin point relatively to its bounds. For example, setting x and y value to 0.5 will set origin to the 
   * center of the object.
   *
   * @param {number}  [ax=0.5]               Align along x-axis.
   * @param {number}  [ay=0.5]               Align along y-axis.
   *
   * @return {black-engine~GameObject} This.
   */
  alignAnchor(ax = 0.5, ay = 0.5) {
    Debug.isNumber(ax, ay);

    this.mAnchorX = ax;
    this.anchorY = ay;

    return this;
  }

  /**
   * Sets anchor point to given position. See `alignPivotOffset`.
   * 
   * @deprecated
   *
   * @param {number}  [ax=0.5]               Align along x-axis.
   * @param {number}  [ay=0.5]               Align along y-axis.
   * @return {black-engine~GameObject} This.
   */
  alignPivot(ax = 0.5, ay = 0.5) {
    return this.alignPivotOffset(ax, ay);
  }

  /**
   * Sets the origin point offset from current anchor value. For example, setting anchor-x value to 0.5 and pivotOffsetX
   * to 10 will center object by x-axis and will shift object to the left by 10 pixels from half of the width.
   *
   * @param {number}  [ax=0.5]               Align along x-axis.
   * @param {number}  [ay=0.5]               Align along y-axis.
   * @param {boolean} [includeChildren=true] Include children elements when calculating bounds?
   *
   * @return {black-engine~GameObject} This.
   */
  alignPivotOffset(ax = 0.5, ay = 0.5, includeChildren = true) {
    Debug.isNumber(ax, ay);

    this.getBounds(this, includeChildren, Rectangle.__cache.zero());

    this.mPivotOffsetX = (Rectangle.__cache.width * ax) + Rectangle.__cache.x;
    this.mPivotOffsetY = (Rectangle.__cache.height * ay) + Rectangle.__cache.y;

    this.__updatePivots(this);

    this.setTransformDirty();

    return this;
  }

  /**
   * Gets/Sets the scale factor of this object along x-axis.
   *
   * @return {number}
   */
  get scaleX() {
    return this.mScaleX;
  }

  /**
   * @param {number} value
   *
   * @return {void}
   */
  set scaleX(value) {
    if (this.mScaleX == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mScaleX = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the scale factor of this object along y-axis.
   *
   * 
   * @return {number}
   */
  get scaleY() {
    return this.mScaleY;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set scaleY(value) {
    if (this.mScaleY == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mScaleY = value;
    this.setTransformDirty();
  }

  /**
   * Gets/sets both `scaleX` and `scaleY`. Getter will return `scaleX` value;
   * @returns {number}
   */
  get scale() {
    return this.scaleX;
  }

  /**
   * @param {number} value
   * 
   * @returns {void}
   */
  set scale(value) {
    if (this.mScaleX == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mScaleX = this.mScaleY = value;
    this.setTransformDirty();
  }

  /**
   * Gets/sets horizontal skew angle in radians.
   * @returns {number}
   */
  get skewX() {
    return this.mSkewX;
  }

  /**
   * @param {number} value
   * 
   * @returns {void}
   */
  set skewX(value) {
    if (this.mSkewX == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mSkewX = value;
    this.setTransformDirty();
  }

  /**
   * Gets/sets vertical skew angle in radians.
   * @returns {number}
   */
  get skewY() {
    return this.mSkewY;
  }

  /**
   * @param {number} value
   * 
   * @returns {void}
   */
  set skewY(value) {
    if (this.mSkewY == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mSkewY = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets rotation in radians.
   *
   * 
   * @return {number}
   */
  get rotation() {
    return this.mRotation;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set rotation(value) {
    if (this.mRotation == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mRotation = value;
    this.setTransformDirty();
  }

  /**
   * Returns this GameObject parent GameObject or null.
   * @readonly
   * @return {black-engine~GameObject|null}
   */
  get parent() {
    return this.mParent;
  }

  /**
   * Returns top most parent object or this if there is no parents.
   * 
   * @readonly
   * @return {black-engine~GameObject}
   */
  get root() {
    let current = this;

    while (current.mParent != null)
      current = current.mParent;

    return current;
  }

  /**
   * Returns the stage Game Object to which this game object belongs to or null if not added on stage.
   *
   * @override
   * @readonly
   * @return {black-engine~Stage|null}
   */
  get stage() {
    return this.mAdded === true ? Black.stage : null;
  }

  /**
   * Gets/sets the width of this object.
   *
   * @return {number}
   */
  get width() {
    return this.getBounds(this.mParent).width;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set width(value) {
    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.scaleX = 1;
    const currentWidth = this.width;

    if (currentWidth != 0.0)
      this.scaleX = value / currentWidth;
  }

  /**
   * Gets/sets the height of this object.
   *
   * @return {number}
   */
  get height() {
    return this.getBounds(this.mParent).height;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set height(value) {
    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.scaleY = 1;
    const currentHeight = this.height;

    if (currentHeight != 0)
      this.scaleY = value / currentHeight;
  }

  /**
   * Returns width of this GameObject in local space without including children
   * elements.
   *
   * @readonly
   * @return {number}
   */
  get localWidth() {
    return this.getBounds(this, false).width;
  }

  /**
   * Returns height of this GameObject in local space without including children
   * elements.
   *
   * @readonly
   * @return {number}
   */
  get localHeight() {
    return this.getBounds(this, false).height;
  }

  // TODO: precache
  /**
   * Returns string representing a url like path to this object in the display
   * tree.
   *
   * @override
   * @readonly
   * @return {string|null}
   */
  get path() {
    if (this.mParent !== null)
      return this.mParent.path + '/' + this.mName;

    return this.mName;
  }

  /**
  * Gets/Sets tag of this GameObject.
  *
  * @return {string|null}
  */
  get tag() {
    return this.mTag;
  }

  /**
   * @param {string|null} value
   * @return {void}
   */
  set tag(value) {
    if (this.mTag === value)
      return;

    /** @type {string|null} */
    let old = this.mTag;
    this.mTag = value;

    if (this.mAdded)
      Black.engine.onTagUpdated(this, old, value);
  }

  /**
   * Starts coroutine.
   *
   * @param {Function} gen  Generator function.
   * @param {*=} [ctx=null] Context for Generator function.
   * @return {*}
   */
  spawn(gen, ctx = null) {
    let iter = gen.apply(ctx == null ? this : ctx);

    function step(it) {
      if (it.done)
        return;

      if (typeof it.value === 'function')
        it.value(x => step(iter.next(x)));
      else
        step(iter.next(it.value));
    }

    step(iter.next());
    return iter;
  }

  /**
   * Waits for given amount of seconds before processing.
   *
   * @param {number} [seconds=1] Duration
   * @return {function(*):*}
   */
  wait(seconds = 1) {
    return cb => setTimeout(cb.bind(this, (/** @type {number} */(seconds) * 1000)), (/** @type {number} */(seconds) * 1000));
  }

  /**
   * Waits for a specific message.
   *
   * @param {string} message The name of the message to wait for.
   * @return {function(*):*}
   */
  waitMessage(message) {
    return cb => this.once(message, cb.bind(this));
  }

  /**
   * Marks this GameObject and/or its children elements as dirty.
   *
   * @param {black-engine~DirtyFlag} flag The flag or flag bit mask.
   * @param {boolean} [includeChildren=true] Specifies if the flag needed for all children.
   * @return {void}
   */
  setDirty(flag, includeChildren = true) {
    if (includeChildren) {
      GameObject.forEach(this, x => {
        x.mDirty |= flag;
        x.mDirtyFrameNum = Black.engine.frameNum;
      });
    } else {
      this.mDirty |= flag;
      this.mDirtyFrameNum = Black.engine.frameNum;
    }

    Renderer.__dirty = true;
  }

  /**
   * @private
   * @ignore
   * @param {black-engine~GameObject} go 
   */
  __updatePivots(go) {
    go.getBounds(go, true, Rectangle.__cache.zero());

    go.mPivotX = go.mAnchorX === null ? go.mPivotOffsetX : go.mPivotOffsetX + (Rectangle.__cache.width * go.mAnchorX) + Rectangle.__cache.x;
    go.mPivotY = go.mAnchorY === null ? go.mPivotOffsetY : go.mPivotOffsetY + (Rectangle.__cache.height * go.mAnchorY) + Rectangle.__cache.y;
  }

  /**
   * Marks the GameObject's parent as dirty.
   *
   * @param {black-engine~DirtyFlag} flag The flag or flag bit mask.
   * @return {void}
   */
  setParentDirty(flag) {
    let current = this;
    while (current != null) {
      current.mDirty |= flag;
      current.mDirtyFrameNum = Black.engine.frameNum;
      current = current.mParent;
    }

    Renderer.__dirty = true;
  }

  /**
   * Marks this GameObject as Local dirty and all children elements as World dirty.
   *
   * @returns {void}
   */
  setTransformDirty() {
    if (this.mSuspendDirty === true)
      return;

    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.LOCAL | DirtyFlag.BOUNDS), false);
    this.setDirty(DirtyFlag.WIRB, true);

    this.setParentDirty(/** @type {DirtyFlag} */(DirtyFlag.BOUNDS | DirtyFlag.ANCHOR));
  }

  /**
   * Marks this GameObject with Render dirty flag if it is not suspended for dirty.
   *
   * @returns {void}
   */
  setRenderDirty() {
    if (this.mSuspendDirty === true)
      return;

    this.setDirty(DirtyFlag.RENDER, true);
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set touchable(value) {
    let c = /** @type {InputComponent}*/ (this.getComponent(InputComponent));

    if (value === true) {
      if (c === null)
        this.addComponent(new InputComponent());
      else
        c.touchable = true;
    } else {
      if (c !== null)
        this.removeComponent(c);
    }
  }

  /**
   * Gets/Sets whether the object will listen for user input messages.
   *
   * @return {boolean}
   */
  get touchable() {
    let c = /** @type {InputComponent} */ (this.getComponent(InputComponent));
    return c !== null && c.touchable === true;
  }

  // TODO: rename method
  /**
   * @ignore
   *
   * @param {Array<number>} points
   * @param {black-engine~Matrix} worldTransformation
   * @param {black-engine~Rectangle=} outRect
   * @return {black-engine~Rectangle}
   */
  static getBoundsWithPoints(points, worldTransformation, outRect) {
    outRect = outRect || new Rectangle();

    let minX = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    let tmpVector = new Vector();

    for (let i = 0; i < points.length; i += 2) {
      worldTransformation.transformXY(points[i], points[i + 1], tmpVector);

      if (minX > tmpVector.x)
        minX = tmpVector.x;

      if (maxX < tmpVector.x)
        maxX = tmpVector.x;

      if (minY > tmpVector.y)
        minY = tmpVector.y;

      if (maxY < tmpVector.y)
        maxY = tmpVector.y;
    }

    outRect.set(minX, minY, maxX - minX, maxY - minY);
    return outRect;
  }

  /**
   * Returns whenever a given GameObject intersects with a point.
   *
   * @param {black-engine~GameObject} gameObject GameObject to test.
   * @param {black-engine~Vector} point A point to test.
   * @return {boolean} True if intersects.
   */
  static intersects(gameObject, point) {
    let tmpVector = new Vector();
    let inv = gameObject.worldTransformationInverted;

    inv.transformVector(point, tmpVector);

    return gameObject.localBounds.containsXY(tmpVector.x, tmpVector.y);
  }

  /**
   * Returns a point where intersection were made in local space.
   *
   * @param {black-engine~GameObject} gameObject GameObject to test intersection with.
   * @param {black-engine~Vector} point The point to test.
   * @param {black-engine~Vector=} outVector If passed point of intersection will be stored in it.
   * @return {boolean} True if intersects.
   */
  static intersectsAt(gameObject, point, outVector = undefined) {
    outVector = outVector || new Vector();

    Vector.__cache.set();

    gameObject.worldTransformationInverted.transformVector(point, Vector.__cache);
    let contains = gameObject.localBounds.containsXY(Vector.__cache.x, Vector.__cache.y);

    if (contains === false)
      return false;

    outVector.x = Vector.__cache.x - gameObject.localBounds.x;
    outVector.y = Vector.__cache.y - gameObject.localBounds.y;
    return true;
  }

  /**
   * Checks if GameObject or any of its children elements intersects the given point.
   *
   * @param {black-engine~GameObject} gameObject GameObject to test.
   * @param {black-engine~Vector} point Point to test.
   * @return {black-engine~GameObject|null} Intersecting object or null.
   */
  static intersectsWith(gameObject, point) {
    let obj = null;
    for (let i = gameObject.numChildren - 1; i >= 0; --i) {
      let child = gameObject.mChildren[i];

      obj = GameObject.intersectsWith(child, point);
      if (obj != null)
        return obj;

      let inside = GameObject.intersects(child, point);
      if (inside) {
        obj = child;
        break;
      }
    }

    if (obj === null && GameObject.intersects(gameObject, point))
      return gameObject;

    return null;
  }

  /**
   * Returns all GameObject with given tag.
   *
   * @param {string} tag Tag to find.
   * @returns {Array<black-engine~GameObject>|null} Array of GameObject or null if not found.
   */
  static findWithTag(tag) {
    if (Black.engine.mTagCache.hasOwnProperty(tag) === false)
      return null;

    return Black.engine.mTagCache[tag];
  }

  /**
   * Returns a list of Components.
   *
   * @param {black-engine~GameObject} gameObject GameObject to start search from.
   * @param {function (new:black-engine~Component)} type Type of Component.
   * @return {Array<black-engine~Component>} Array of Component or empty array.
   */
  static findComponents(gameObject, type) {
    Debug.assert(gameObject !== null, 'gameObject cannot be null.');
    Debug.assert(type !== null, 'type cannot be null.');

    /** @type {Array<Component>} */
    let list = [];

    /** @type {function(GameObject, function(new:Component)):void} */
    let f = function (gameObject, type) {
      for (let i = 0; i < gameObject.mComponents.length; i++) {
        let c = gameObject.mComponents[i];
        if (c instanceof type)
          list.push(c);
      }

      for (let i = 0; i < gameObject.mChildren.length; i++)
        f(gameObject.mChildren[i], type);
    };

    f(gameObject, type);

    return list;
  }

  /**
   * Runs action across all GameObjects.
   *
   * @param {black-engine~GameObject} gameObject GameObject to start iteration from.
   * @param {function(black-engine~GameObject)} action The function to be executed on every GameObject.
   * @return {void}
   */
  static forEach(gameObject, action) {
    if (gameObject == null)
      gameObject = Black.stage;

    let r = action(gameObject);
    if (r === true)
      return;

    for (let i = 0; i < gameObject.mChildren.length; i++) {
      r = GameObject.forEach(gameObject.mChildren[i], action);
      if (r === true)
        return;
    }
  }


  /**
   * Finds object by its name. If node is not passed the root will be taken as
   * starting point.
   *
   * @param {string} name      Name to search.
   * @param {black-engine~GameObject=} node Starting GameObject.
   *
   * @return {black-engine~GameObject} GameObject or null.
   */
  static find(name, node) {
    if (node == null)
      node = Black.stage;

    if (node.name === name)
      return node;

    for (let i = 0; i < node.numChildren; i++) {
      let r = GameObject.find(name, node.getChildAt(i));
      if (r != null)
        return r;
    }

    return null;
  }

  /**
   * Finds object by its id property. If node is not passed the root will be taken as
   * starting point.
   *
   * @param {number} id         Id to search.
   * @param {black-engine~GameObject=} node  Starting GameObject or null.
   *
   * @return {black-engine~GameObject} GameObject or null.
   */
  static findById(id, node) {
    if (node == null)
      node = Black.stage;

    if (node.id === id)
      return node;

    for (let i = 0; i < node.numChildren; i++) {
      let r = GameObject.findById(id, node.getChildAt(i));
      if (r !== null)
        return r;
    }

    return null;
  }
}

/**
 * Stage scale mode.
 * 
 * Make sure to to have viewport meta tag in your HTML file.
 * 
 * @example
 * <meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0" />
 * 
 * @cat display
 * @static
 * @constant
 * @enum {string}
 */
const StageScaleMode = {
  /** The stage size will be the same no matter what DPI is */
  NORMAL: 'normal',
  /** The stage size will be affected by dpi */
  NO_SCALE: 'noScale',
  /** The stage size tries to stay inside requested size. default is 960x640 */
  FIXED: 'fixed',
  /** The stage size will be equal to requested size, position will be centered */
  LETTERBOX: 'letterBox',
  /** The stage size will be equal to requested size, position will be centered, and cover the viewport */
  COVER: 'cover'
};

/**
 * Holds information about keyboard event.
 *
 * @cat input
 */
class KeyInfo {

  /**
   * Create new instance of KeyInfo
   *
   * @param {KeyboardEvent} nativeEvent Native touch event.
   * @return {void}
   */
  constructor(nativeEvent) {
    this.keyCode = nativeEvent.keyCode;
    this.code = nativeEvent.code;
    this.char = nativeEvent.key;
    this.shiftKey = nativeEvent.shiftKey;
    this.altKey = nativeEvent.altKey;
    this.ctrlKey = nativeEvent.ctrlKey;
  }
}

/**
 * Contains system functions.
 * @static
 * @cat system
 */
class Device {
  constructor() {
    /**
     * @type {number|null}
     * @private
     */
    this.mPixelRatioCache = null;
  }

  /**
   * Returns current OS name.
   * 
   * @return {string}
   */
  get os() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent))
      return 'Windows Phone';

    if (/android/i.test(userAgent))
      return 'Android';

    if (/iPad|iPhone|iPod/.test(userAgent)/* && !window.MSStream*/)
      return 'iOS';

    return 'unknown';
  }

  /**
   * Returns True if touch screen is present.
   *
   * @return {boolean}
   */
  get isTouch() {
    let hasEvent = 'ontouchstart' in window;
    if (hasEvent)
      return true;

    if (navigator.maxTouchPoints > 0)
      return true;

    return false;
  }

  /**
   * Returns True if engine is running on mobile device.
   *
   * @return {boolean}
   */
  get isMobile() {
    return /Mobi/.test(navigator.userAgent);
  }

  /**
   * Returns screen pixel ratio.
   *
   * @return {number}
   */
  get pixelRatio() {
    if (this.mPixelRatioCache === null)
      this.mPixelRatioCache = this.getDevicePixelRatio();

    return this.mPixelRatioCache;
  }

  /**
   * Returns true if web audio is supported.
   *
   * @return {boolean}
   */
  get webAudioSupported() {
    return window['AudioContext'] != null || window['webkitAudioContext'] != null;
  }

  /**
   * Returns device pixel ratio.
   *
   * @suppress {missingProperties}
   * @return {number} Description
   */
  getDevicePixelRatio() {
    if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI)
      return window.screen.systemXDPI / window.screen.logicalXDPI;
    else if (window.devicePixelRatio !== undefined)
      return window.devicePixelRatio;

    return 1;
  }
}

/**
 * The base class for all renderable objects. Adds `alpha` and `visible` properties to GameObject.
 *
 * @cat display
 * @extends black-engine~GameObject
 */
class DisplayObject extends GameObject {
  constructor() {
    super();

    /** 
     * @protected 
     * @type {number} 
     */
    this.mAlpha = 1;

    /** 
     * @protected 
     * @type {black-engine~BlendMode} 
     */
    this.mBlendMode = BlendMode.AUTO;

    /** 
     * @protected 
     * @type {boolean} 
     */
    this.mVisible = true;

    /** 
     * @protected 
     * @type {black-engine~Rectangle} 
     */
    this.mClipRect = null;

    /** 
     * @protected 
     * @type {black-engine~Renderer|null} 
     */
    this.mRenderer = this.getRenderer();

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mCacheAsBitmap = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mCacheAsBitmapDynamic = true;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mCacheAsBitmapDirty = true;

    /** 
     * @private 
     * @type {black-engine~Matrix|null} 
     */
    this.mCacheAsBitmapMatrixCache = null;

    /** 
     * @private 
     * @type {black-engine~CanvasRenderTexture|null} 
     */
    this.mCache = null;

    /** 
     * @private 
     * @type {black-engine~Rectangle|null} 
     */
    this.mCacheBounds = null;

    /** 
     * @protected 
     * @type {?number} 
     */
    this.mColor = null;

    /** 
     * @protected 
     * @type {boolean} 
     */
    this.mSnapToPixels = false;
  }

  /**
   * Called at the end of the loop, all renderers are already collected and this object and its children will be
   * rendered. Should be used to interpolate between last and current state. 
   * 
   * NOTE: Adding, removing or changing children elements inside onRender method can lead to unexpected behavior.
   * 
   * @protected
   * @return {void}
   */
  onRender() { }

  /**
   * Factory method returns concrete renderer for this Game Object.
   * 
   * @returns {black-engine~Renderer}
   */
  getRenderer() {
    return Black.driver.getRenderer('DisplayObject', this);
  }

  /**
   * @inheritDoc
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    if (this.mClipRect !== null) {
      this.mClipRect.copyTo(outRect);
      return outRect;
    }

    return outRect.set(0, 0, 0, 0);
  }

  /**
   * @inheritDoc
   */
  getBounds(space = undefined, includeChildren = true, outRect = undefined) {
    outRect = outRect || new Rectangle();

    let localBounds = this.onGetLocalBounds();

    if (space == null)
      space = this.mParent;

    if (space == this) ; else if (space == this.mParent) {
      if (includeChildren === false || this.mClipRect !== null) {
        let matrix = Matrix.pool.get();
        matrix.copyFrom(this.localTransformation);
        matrix.transformRect(localBounds, outRect);
        Matrix.pool.release(matrix);
      }
      else if (includeChildren === true && this.mDirty & DirtyFlag.BOUNDS) {
        let matrix = Matrix.pool.get();
        matrix.copyFrom(this.localTransformation);
        matrix.transformRect(localBounds, outRect);
        Matrix.pool.release(matrix);
      } else {
        // Return cached
        outRect.copyFrom(this.mBoundsCache);
        return outRect;
      }
    } else {
      let matrix = Matrix.pool.get();
      matrix.copyFrom(this.worldTransformation);
      matrix.prepend(space.worldTransformationInverted);
      matrix.transformRect(localBounds, outRect);
      Matrix.pool.release(matrix);
    }

    if (space !== this) {
      if (this.mClipRect !== null) {
        outRect.x += this.mPivotX;
        outRect.y += this.mPivotY;
      }
    } else {
      localBounds.copyTo(outRect);
    }

    if (this.mClipRect !== null)
      return outRect;

    if (includeChildren === true) {
      let childBounds = Rectangle.pool.get();

      for (let i = 0; i < this.mChildren.length; i++) {
        childBounds.zero();

        this.mChildren[i].getBounds(space, includeChildren, childBounds);
        outRect.union(childBounds);
      }

      Rectangle.pool.release(childBounds);

      if (space == this.mParent && this.mDirty & DirtyFlag.BOUNDS) {
        this.mBoundsCache.copyFrom(outRect);
        this.mDirty ^= DirtyFlag.BOUNDS;
      }
    }

    return outRect;
  }

  /**
   * @inheritDoc
   */
  hitTest(localPoint) {
    let c = /** @type {InputComponent}*/ (this.getComponent(InputComponent));
    let touchable = c !== null && c.touchable;
    let insideMask = this.onHitTestMask(localPoint);

    if (this.visible === false || touchable === false || insideMask === false)
      return null;

    let target = null;
    let numChildren = this.mChildren.length;

    for (let i = numChildren - 1; i >= 0; --i) {
      let child = this.mChildren[i];

      target = child.hitTest(localPoint);

      if (target !== null)
        return target;
    }

    if (this.onHitTest(localPoint) === true)
      return this;

    return null;
  }

  /**
  * @inheritDoc
  */
  onHitTestMask(localPoint) {
    if (this.mClipRect === null)
      return true;

    let tmpVector = Vector.pool.get();
    this.worldTransformationInverted.transformVector(localPoint, tmpVector);

    let contains = this.mClipRect.containsXY(tmpVector.x - this.mPivotX, tmpVector.y - this.mPivotY);
    Vector.pool.release(tmpVector);

    return contains;
  }

  /**
   * Gets/Sets tinting color of the object. Pass `null` to disable tinting. Tinting color will be applied to all children
   * objects. You can override tint color for children by setting custom value or `null` to inherit color from parent.
   * @returns {?number}
   */
  get color() {
    return this.mColor;
  }

  /**
   * @param {?number} value
   * @return {void}
   */
  set color(value) {
    if (this.mColor === value)
      return;

    this.mColor = value;
    this.setRenderDirty();
  }

  /**
   * Gets/Sets whether this container and all it's children should be baked into bitmap. Setting `cacheAsBitmap` onto
   * Sprites,, TextField's or any other inherited classes will give zero effect.
   *
   * @return {boolean} 
   */
  get cacheAsBitmap() {
    return this.mCacheAsBitmap;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set cacheAsBitmap(value) {
    if (value === this.mCacheAsBitmap)
      return;

    this.mCacheAsBitmap = value;

    if (value === false) {
      this.mCache = null;
      this.mCacheAsBitmapDirty = true;
      this.mCacheAsBitmapMatrixCache = null;
      this.mCacheBounds = null;

      this.setTransformDirty();
    }
  }

  /**
   * Gets/sets whenever cache as bitmap should be automatically refreshed.
   * 
   * @returns {boolean}
   */
  get cacheAsBitmapDynamic() {
    return this.mCacheAsBitmapDynamic;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set cacheAsBitmapDynamic(value) {
    this.mCacheAsBitmapDynamic = value;
  }

  /**
   * Gets/Sets the opacity of the object.
   * Baked objects may change behavior.
   *
   * @return {number}
   */
  get alpha() {
    return this.mAlpha;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set alpha(value) {
    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    if (this.mAlpha === MathEx.clamp(value, 0, 1))
      return;

    this.mAlpha = MathEx.clamp(value, 0, 1);
    this.setRenderDirty();
  }

  /**
   * Gets/Sets visibility of the object.
   *
   * @return {boolean}
   */
  get visible() {
    return this.mVisible;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set visible(value) {
    if (this.mVisible === value)
      return;

    this.mVisible = value;
    this.setRenderDirty();
  }

  /**
   * Gets/Sets blend mode for the object.
   *
   * @return {black-engine~BlendMode}
   */
  get blendMode() {
    return this.mBlendMode;
  }

  /**
   * @param {black-engine~BlendMode} value
   * @return {void}
   */
  set blendMode(value) {
    if (this.mBlendMode === value)
      return;

    this.mBlendMode = value;
    this.setRenderDirty();
  }

  /**
   * Gets/Sets clipping area for the object.
   *
   * @return {black-engine~Rectangle}
   */
  get clipRect() {
    return this.mClipRect;
  }

  /**
   * @param {black-engine~Rectangle} value
   * @return {void}
   */
  set clipRect(value) {
    this.mClipRect = value;
    this.setRenderDirty();
  }

  /**
   * Gets/sets whenever this object x and y value should be rounded.
   * @returns {boolean}
   */
  get snapToPixels() {
    return this.mSnapToPixels;
  }

  /**
   * @param {boolean} value
   */
  set snapToPixels(value) {
    this.mSnapToPixels = value;
  }
}

/**
 * The base class for all renderable objects. Adds `alpha` and `visible` properties to GameObject.
 *
 * @cat display
 * @extends black-engine~DisplayObject
 */
class Camera extends DisplayObject {
  constructor() {
    super();

    Black.camera = this;
  }

  get worldTransformation() {
    let wt = super.worldTransformation.clone();
    wt.prepend(this.stage.worldTransformationInverted);

    return wt;
  }
}

/**
 * A input system class is responsible for mouse, touch and keyboard input events.
 * Pointer events works for a single target only.
 * Global Input messages has higher priority.
 *
 * When GameObject gets a `pointerDown` message it gets target locked. Other
 * objects will not receive `pointerMove` or `pointerUp` messages. Target locked
 * object will receive `pointerUp` message even if pointer is outside of its
 * bounds.
 * 
 * Every object in the display list should be `touchable` in order to receive input messages.
 *
 * @cat input
 * @fires Input#pointerMove
 * @fires Input#pointerDown
 * @fires Input#pointerUp
 * 
 * @fires GameObject#pointerMove
 * @fires GameObject#pointerDown
 * @fires GameObject#pointerUp
 * 
 * @extends black-engine~System
 */
class Input extends System {
  /**
   * Private constructor.
   */
  constructor() {
    super();

    Debug.assert(this.constructor.instance == null, 'Only single instance is allowed');

    Black.input = this;

    /** 
     * @private 
     * @type {black-engine~Vector} 
     */
    this.mViewportPosition = new Vector();

    /** 
     * @private 
     * @type {black-engine~Vector} 
     */
    this.mPointerPosition = new Vector();

    /** 
     * @private 
     * @type {black-engine~Vector} 
     */
    this.mStagePosition = new Vector();

    /** 
     * @private 
     * @type {Element|null} 
     */
    this.mDom = null;

    /** 
     * @private 
     * @type {Array<string>} 
     */
    this.mEventList = null;

    /** 
     * @private 
     * @type {Array<string>} 
     */
    this.mKeyEventList = null;

    /** 
     * @private 
     * @type {Array<{name: String, listener: Function}>} 
     */
    this.mBoundListeners = [];

    /** 
     * @private 
     * @type {Array<{e: Event, x: number, y:number}>} 
     */
    this.mPointerQueue = [];

    /** 
     * @private 
     * @type {Array<KeyboardEvent>} 
     */
    this.mKeyQueue = [];

    /** 
     * @private 
     * @type {Array<number>} 
     */
    this.mPressedKeys = [];

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsPointerDown = false;

    // NOTE: we need guarantee that keys are not going to change theirs order when iterating.
    /** 
     * @private 
     * @type {Map} 
     */
    this.mInputListeners = new Map();

    /** 
     * @private 
     * @type {black-engine~GameObject} 
     */
    this.mTarget = null;

    /** 
     * @private 
     * @type {black-engine~Component} 
     */
    this.mTargetComponent = null;

    /** 
     * @private 
     * @type {black-engine~GameObject} 
     */
    this.mLockedTarget = null;

    /** 
     * @private 
     * @type {black-engine~Component} 
     */
    this.mLastInTargetComponent = null;

    this.__initialize();
  }

  /**
   * @ignore
   */
  __initialize() {
    this.mDom = Black.engine.viewport.nativeElement;

    this.__initListeners();
  }

  /**
   * @ignore
   * @private
   * @returns {void}
   */
  __initListeners() {
    this.mKeyEventList = mKeyEventList;
    let isMouseDevice = false;

    if (window.PointerEvent) {
      this.mEventList = mPointerEventList;
      isMouseDevice = true;
    }
    else if (Black.device.isTouch && Black.device.isMobile) {
      this.mEventList = mTouchEventList;
    }
    else {
      this.mEventList = mMouseEventList;
      isMouseDevice = true;
    }

    for (let i = 0; i < 3; i++)
      this.mDom.addEventListener(this.mEventList[i], e => this.__onPointerEvent(e), false);

    let addBoundsListener = (target, name, action) => {
      const listener = e => action.call(this, e);

      this.mBoundListeners.push({ name: name, listener: listener });
      target.addEventListener(name, listener);
    };

    addBoundsListener(document, this.mEventList[IX_POINTER_MOVE], this.__onPointerEventDoc);
    addBoundsListener(document, this.mEventList[IX_POINTER_UP], this.__onPointerEventDoc);

    if (isMouseDevice === true)
      addBoundsListener(window, 'wheel', this.__onPointerEventDoc);

    // handle keyboard listeners
    for (let i = 0; i < this.mKeyEventList.length; i++)
      addBoundsListener(document, this.mKeyEventList[i], this.__onKeyEvent);
  }

  /**
   * @ignore
   * @private
   * @param {KeyboardEvent} e
   * @returns {boolean}
   */
  __onKeyEvent(e) {
    if (Black.engine.isPaused === true)
      return false;

    this.mKeyQueue.push(e);
    return true;
  }

  /**
   * @ignore
   * @private
   * @param {Event} e
   * @returns {void}
   */
  __onPointerEventDoc(e) {
    if (Black.engine.isPaused === true)
      return;

    let over = false;

    // IE11 does not have support for `path`
    let element = e.target;
    while (element) {
      if (element === this.mDom) {
        over = true;
        break;
      }
      element = element.parentElement;
    }

    if (e.type === 'wheel') {
      if (over === true)
        this.__pushEvent(e);
    } else {
      if (over === false && this.mIsPointerDown === true)
        this.__pushEvent(e);
    }
  }

  /**
   * @ignore
   * @private
   * @param {Event} e
   * @returns {boolean}
   */
  __onPointerEvent(e) {
    if (Black.engine.isPaused === true)
      return false;

    e.preventDefault();

    this.__pushEvent(e);
    return true;
  }

  /**
   * @ignore
   * @private
   * @param {Event} e
   * @returns {void}
   */
  __pushEvent(e) {
    let /** @type {Vector|null} */ p = null;
    if (e.type.indexOf('touch') === 0)
      p = this.__getTouchPos(this.mDom, /** @type {TouchEvent} */(e));
    else
      p = this.__getPointerPos(this.mDom, e);

    this.mPointerQueue.push({ e: e, x: p.x, y: p.y });
  }

  /**
   * @ignore
   * @private
   * @param {Element} canvas
   * @param {Event} evt
   * @returns {black-engine~Vector}
   */
  __getPointerPos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();

    const rotation = Black.engine.viewport.rotation;

    let scaleX = (rotation === 0 ? canvas.clientWidth : canvas.clientHeight) / rect.width;
    let scaleY = (rotation === 0 ? canvas.clientHeight : canvas.clientWidth) / rect.height;

    return new Vector((evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY);
  }

  /**
   * @ignore
   * @private
   * @param {Element} canvas
   * @param {TouchEvent} evt
   * @returns {black-engine~Vector}
   */
  __getTouchPos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();

    /** @type {Touch} */
    let touch = evt.changedTouches[0]; // ios? what about android?
    let x = touch.clientX;
    let y = touch.clientY;

    const rotation = Black.engine.viewport.rotation;
    let scaleX = (rotation === 0 ? canvas.clientWidth : canvas.clientHeight) / rect.width;
    let scaleY = (rotation === 0 ? canvas.clientHeight : canvas.clientWidth) / rect.height;

    return new Vector((x - rect.left) * scaleX, (y - rect.top) * scaleY);
  }

  /**
   * @inheritDoc
   */
  onUpdate() {
    // omg, who gave you keyboard?
    this.__updateKeyboard();

    const size = Black.engine.viewport.size;
    const rotation = Black.engine.viewport.rotation;

    let stage = Black.stage;

    while (this.mPointerQueue.length > 0) {
      const nativeEvent = this.mPointerQueue.shift();

      const x = nativeEvent.x;
      const y = nativeEvent.y;

      if (rotation === 1) {
        nativeEvent.x = y;
        nativeEvent.y = size.height - x;
      } else if (rotation === -1) {
        nativeEvent.x = size.width - y;
        nativeEvent.y = x;
      }

      // update to the latest position
      this.mPointerPosition.x = nativeEvent.x;
      this.mPointerPosition.y = nativeEvent.y;

      this.mViewportPosition.copyFrom(this.mPointerPosition);

      if (Black.camera !== null)
        Black.camera.worldTransformation.transformVector(this.mPointerPosition, this.mPointerPosition);

      this.mStagePosition.copyFrom(this.mPointerPosition);

      let inv = stage.worldTransformationInverted;
      inv.transformVector(this.mStagePosition, this.mStagePosition);

      let eventType = mInputEventsLookup[this.mEventList.indexOf(nativeEvent.e.type)];

      this.__findTarget(this.mPointerPosition);
      this.__processNativeEvent(nativeEvent, this.mPointerPosition, eventType);
    }
  }

  /**
   * @ignore
   * @private
   * @param {black-engine~Vector} pos
   */
  __findTarget(pos) {
    let obj = Black.stage.hitTest(pos);

    if (obj === null) {
      this.mTarget = null;
      this.mTargetComponent = null;
      return;
    }

    this.mTarget = obj;
    this.mTargetComponent = obj.getComponent(InputComponent);
  }

  /**
   * @ignore
   * @private
   * @param {Object} nativeEvent
   * @param {black-engine~Vector} pos
   * @param {string} type
   */
  __processNativeEvent(nativeEvent, pos, type) {
    if (type === Input.POINTER_DOWN) {
      this.mIsPointerDown = true;
    }
    else if (type === Input.POINTER_UP) {
      this.mIsPointerDown = false;
    }

    let delta = 0;
    if (type === Input.WHEEL)
      delta = nativeEvent.e.deltaY > 0 ? 1 : -1;

    const info = new PointerInfo(this.mTarget, pos.x, pos.y, nativeEvent.e.button, delta);
    this.post(type, info);

    if (this.mTarget === null && this.mLockedTarget === null)
      return;

    if (type === Input.POINTER_DOWN) {
      this.mLockedTarget = this.mTarget;
    }
    else if (type === Input.POINTER_UP && this.mLockedTarget !== null) {
      this.mLockedTarget.post('~pointerUp', info);
      this.mLockedTarget = null;
      return;
    }

    let sameTarget = this.mTarget === this.mLockedTarget;

    if (this.mLockedTarget === null) {
      if (this.mTarget !== null)
        this.mTarget.post('~' + type, info);
    } else {
      if (sameTarget === true)
        this.mLockedTarget.post('~' + type, info);
      else {
        if (this.mLockedTarget.mParent !== null && this.mTarget !== null)
          this.mLockedTarget.mParent.post('~' + type, info);
      }
    }
  }

  /**
   * @ignore
   * @private
   * @returns {void}
   */
  __updateKeyboard() {
    while (this.mKeyQueue.length > 0) {
      let nativeEvent = this.mKeyQueue.shift();

      let ix = this.mKeyEventList.indexOf(nativeEvent.type);
      let pIx = this.mPressedKeys.indexOf(nativeEvent.keyCode);
      let fnName = mKeyEventsLookup[ix];

      if (fnName === 'keyUp' && pIx !== -1)
        this.mPressedKeys.splice(pIx, 1);

      else if (fnName === 'keyDown' && pIx === -1) {
        this.mPressedKeys.push(nativeEvent.keyCode);
        fnName = 'keyPress';
      }

      this.post(fnName, new KeyInfo(nativeEvent), nativeEvent);
    }
  }

  /**
   * @override
   */
  dispose() {
    super.dispose();

    while (this.mBoundListeners.length > 0) {
      let keyValue = this.mBoundListeners.pop();
      document.removeEventListener(keyValue.name, keyValue.listener);
    }

    Black.input = null;
  }

  /**
   * Indicates if mouse or touch in down at this moment.
   *
   * @returns {boolean}
   */
  get isPointerDown() {
    return this.mIsPointerDown;
  }

  /**
   * Returns mouse or touch pointer x-component.
   *
   * @returns {number}
   */
  get pointerX() {
    return this.mPointerPosition.x;
  }

  /**
   * Returns mouse or touch pointer x-component.
   *
   * @returns {number}
   */
  get pointerY() {
    return this.mPointerPosition.y;
  }

  /**
   * Returns mouse or touch pointer x-component relative to stage.
   *
   * @returns {number}
   */
  get stageX() {
    return this.mStagePosition.x;
  }

  /**
   * Returns mouse or touch pointer x-component  relative to stage.
   *
   * @returns {number}
   */
  get stageY() {
    return this.mStagePosition.y;
  }

  /**
   * Returns mouse or touch pointer position relative to viewport.
   *
   * @returns {black-engine~Vector}
   */
  get viewportPosition() {
    return this.mViewportPosition;
  }

  /**
   * Returns mouse or touch pointer position including active camera transformation.
   *
   * @returns {black-engine~Vector}
   */
  get pointerPosition() {
    return this.mPointerPosition;
  }

  /**
   * Returns pointer position relative to the stage.
   * 
   * @returns {black-engine~Vector}
   */
  get stagePosition() {
    return this.mStagePosition;
  }

  /**
   * Returns list of pressed keys.
   *
   * @returns {Array<number>}
   */
  get pressedKeys() {
    return this.mPressedKeys;
  }

  /**
   * @type {string}
   * @const
   */
  static get POINTER_DOWN() { return 'pointerDown'; }

  /**
   * @type {string}
   * @const
   */
  static get POINTER_MOVE() { return 'pointerMove'; }

  /**
   * @type {string}
   * @const
   */
  static get POINTER_UP() { return 'pointerUp'; }

  /**
   * @type {string}
   * @const
   */
  static get WHEEL() { return 'wheel'; }
}


/**
 * @private
 * @type {number}
 * @const
 */
const IX_POINTER_MOVE = 0;

/**
 * @private
 * @type {number}
 * @const
 */
const IX_POINTER_UP = 2;

/**
 * @private
 * @type {Array<string>}
 * @const
 */
const mKeyEventList = ['keydown', 'keyup'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
const mKeyEventsLookup = ['keyDown', 'keyUp', 'keyPress'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
const mInputEventsLookup = ['pointerMove', 'pointerDown', 'pointerUp', 'pointerIn', 'pointerOut', 'wheel'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
const mPointerEventList = ['pointermove', 'pointerdown', 'pointerup', 'pointerenter', 'pointerleave', 'wheel'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
const mMouseEventList = ['mousemove', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave', 'wheel'];

/**
 * @private
 * @type {Array<string>}
 * @const
 */
const mTouchEventList = ['touchmove', 'touchstart', 'touchend', 'touchenter', 'touchleave'];

/**
 * Posts when mouse down or touch down event happened.
 * @event Input#pointerDown
 */

/**
 * Posts when mouse up or touch up event happened.
 * @event Input#pointerUp
 */

/**
 * Posts when mouse move or touch move event happened.
 * @event Input#pointerMove
 */

/**
* Posts when mouse down or touch down event happened.
* @event GameObject#pointerDown
*/

/**
 * Posts when mouse up or touch up event happened.
 * @event GameObject#pointerUp
 */

/**
 * Posts when mouse move or touch move event happened.
 * @event GameObject#pointerMove
 */

/**
 * Stores additional information about pointer events.
 *
 * @ignore
 * @cat input
 */
class PointerInfo {
  /**
   * Creates new PointerInfo instance. For internal use only.
   *
   * @param {black-engine~GameObject} activeObject `GameObject` the cursor is above.
   * @param {number} x x-coordinate
   * @param {number} y y-coordinate
   * @param {number} button active pressed button
   */
  constructor(activeObject, x, y, button, delta = 0) {

    /** 
     * @private 
     * @type {black-engine~GameObject} 
     */
    this.mActiveObject = activeObject;

    /** 
     * @private 
     * @type {number} 
     */
    this.mX = x;

    /** 
     * @private 
     * @type {number} 
     */
    this.mY = y;

    /** 
     * @private 
     * @type {number} 
     */
    this.mButton = button;

    /** 
     * @private 
     * @type {number} 
     */
    this.mDelta = delta;
  }

  /**
   * Retruns normalized wheel delta value.
   * @returns {number}
   */
  get delta() {
    return this.mDelta;
  }

  /**
   * Retruns current pressed button.
   * @returns {number}
   */
  get button() {
    return this.mButton;
  }

  /**
   * Returns the object under cursor right now.
   *
   * @readonly
   * @returns {black-engine~GameObject}
   */
  get activeObject() {
    return this.mActiveObject;
  }

  /**
   * X-coordinate.
   *
   * @readonly
   * @returns {number}
   */
  get x() {
    return this.mX;
  }

  /**
   * Y-coordinate.
   *
   * @readonly
   * @returns {number}
   */
  get y() {
    return this.mY;
  }
}

/**
 * The root container for all renderable objects
 *
 * @cat display
 * @fires Stage#resize
 * @extends black-engine~GameObject
 */
class Stage extends GameObject {
  constructor() {
    super();

    /** 
     * @private 
     * @type {string} 
     */
    this.mName = 'stage';

    /** 
     * @private 
     * @type {black-engine~StageScaleMode} 
     */
    this.mScaleMode = StageScaleMode.NORMAL;

    /** 
     * @private 
     * @type {number} 
     */
    this.mWidth = 960;
    /** 
     * @private 
     * @type {number} 
     */
    this.mHeight = 640;

    /** 
     * @private 
     * @type {number} 
     */
    this.mStageWidth = 0;
    /** 
     * @private 
     * @type {number} 
     */
    this.mStageHeight = 0;
    /** 
     * @private 
     * @type {number} 
     */
    this.mStageScaleFactor = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mCacheWidth = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mCacheHeight = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mDPR = Black.device.getDevicePixelRatio();

    this.mAdded = true;

    // Fake 
    if (Black.engine.hasSystem(Input)){
      let c = new InputComponent();
      c.mAdded = true;
      this.addComponent(c);
    }
  }

  /**
   * Sets stage size by given width and height.
   *
   * @param {number} width New stage width.
   * @param {number} height New stage height.
   * @returns {void}
   */
  setSize(width, height) {
    this.mWidth = width;
    this.mHeight = height;

    this.__refresh();
  }

  /**
   * @inheritDoc
   */
  onUpdate() {
    let size = Black.engine.viewport.size;

    if (this.mCacheWidth !== size.width || this.mCacheHeight !== size.height) {
      this.mCacheWidth = size.width;
      this.mCacheHeight = size.height;

      this.__refresh();
    }
  }

  /**
   * Refreshes stage size. Call this method only if you are changing the size of the container manually. 
   */
  refresh() {
    this.__refresh();
  }

  /**
   * @private
   * @ignore
   * @returns {void}
   */
  __refresh() {
    const size = Black.engine.viewport.size;
    const windowWidth = size.width;
    const windowHeight = size.height;

    if (this.mScaleMode === StageScaleMode.FIXED) {
      const mw = windowWidth * this.mHeight / windowHeight;
      const mh = windowHeight * this.mWidth / windowWidth;
      const sc = Math.max(mw / windowWidth, mh / windowHeight);
      const width = windowWidth * sc;
      const height = windowHeight * sc;

      this.mStageWidth = width;
      this.mStageHeight = height;

      this.mScaleX = this.mScaleY = this.mStageScaleFactor = Math.min(windowWidth / width, windowHeight / height);
    } else if (this.mScaleMode === StageScaleMode.LETTERBOX || this.mScaleMode === StageScaleMode.COVER) {
      const sc = this.mScaleMode === StageScaleMode.COVER ?
        Math.max(windowWidth / this.mWidth, windowHeight / this.mHeight) :
        Math.min(windowWidth / this.mWidth, windowHeight / this.mHeight);

      this.mX = (windowWidth - this.mWidth * sc) / 2;
      this.mY = (windowHeight - this.mHeight * sc) / 2;

      this.mStageWidth = this.mWidth;
      this.mStageHeight = this.mHeight;

      this.mScaleX = this.mScaleY = this.mStageScaleFactor = sc;
    } else if (this.mScaleMode === StageScaleMode.NORMAL) {
      this.mStageWidth = windowWidth;
      this.mStageHeight = windowHeight;
      this.mScaleX = this.mScaleY = this.mStageScaleFactor = 1;
    } else if (this.mScaleMode === StageScaleMode.NO_SCALE) {
      this.mStageWidth = (windowWidth * this.mDPR);
      this.mStageHeight = (windowHeight * this.mDPR);

      this.mScaleX = this.mScaleY = this.mStageScaleFactor = 1 / this.mDPR;
    } else {
      Debug.error('Not supported stage scale mode.');
    }

    this.mStageWidth = Math.round(this.mStageWidth);
    this.mStageHeight = Math.round(this.mStageHeight);
    this.mX = Math.round(this.mX);
    this.mY = Math.round(this.mY);

    // TODO: i don't like this line
    // TODO: me neither
    // TODO: but its setting Renderer.__dirty which is good
    // TODO: replace with priority message?
    Black.driver.__onResize(null, null);

    this.setTransformDirty();

    this.mLocalTransform.set(this.mScaleX, 0, 0, this.mScaleY, this.mX, this.mY);

    /**
     * Posts every time stage size is changed.
     * @event Stage#resize
     */
    this.post(Message.RESIZE);
  }

  /**
   * Gets/Sets stage scale mode.
   *
   * @return {black-engine~StageScaleMode}
   */
  get scaleMode() {
    return this.mScaleMode;
  }

  /**
   * @param {black-engine~StageScaleMode} value
   * @returns {void}
   */
  set scaleMode(value) {
    this.mScaleMode = value;
    this.__refresh();
  }

  /**
   * Stage scale factor.
   *
   * @public
   * @readonly
   * @returns {number}
   */
  get scaleFactor() {
    return this.mStageScaleFactor;
  }

  /**
   * Original stage width multiplied by device pixel ratio and stage scale factor.
   *
   * @public
   * @readonly
   * @returns {number}
   */
  get renderWidth() {
    return this.mStageWidth * this.mDPR * this.mStageScaleFactor;
  }

  /**
   * Original stage height multiplied by device pixel ratio and stage scale factor.
   *
   * @public
   * @readonly
   * @returns {number}
   */
  get renderHeight() {
    return this.mStageHeight * this.mDPR * this.mStageScaleFactor;
  }

  /**
   * Gets stage center coordinate along X-axis.
   *
   * @public
   * @readonly
   * @returns {number}
   */
  get centerX() {
    return this.mStageWidth * 0.5;
  }

  /**
   * Gets stage center coordinate along Y-axis.
   *
   * @public
   * @readonly
   * @returns {number}
   */
  get centerY() {
    return this.mStageHeight * 0.5;
  }

  /**
   * @inheritDoc
   */
  getBounds(space = undefined, includeChildren = true, outRect = undefined) {
    outRect = outRect || new Rectangle();
    return outRect.set(-this.mX / this.mStageScaleFactor, -this.mY / this.mStageScaleFactor, this.mStageWidth + 2 * this.mX / this.mStageScaleFactor, this.mStageHeight + 2 * this.mY / this.mStageScaleFactor);
  }

  /**
   * @override
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();
    return outRect.set(0, 0, this.mStageWidth, this.mStageHeight);
  }

  /**
   * Returns local transformation `Matrix`
   *
   * @override
   * @return {black-engine~Matrix}
   */
  get localTransformation() {
    return this.mLocalTransform;
  }

  /**
   * @override
   * @param {black-engine~Matrix} value
   * @return {void}
   */
  set localTransformation(value) {
    Debug.error('Not allowed.');
  }

  removeFromParent() { Debug.error('Not allowed.'); }

  set scaleX(value) { Debug.error('Not allowed.'); }
  get scaleX() { return 1; }

  set scaleY(value) { Debug.error('Not allowed.'); }
  get scaleY() { return 1; }

  set pivotOffsetX(value) { Debug.error('Not allowed.'); }
  get pivotOffsetX() { return 0; }

  set pivotOffsetY(value) { Debug.error('Not allowed.'); }
  get pivotOffsetY() { return 0; }

  set anchorX(value) { Debug.error('Not allowed.'); }
  get anchorX() { return 0; }

  set anchorY(value) { Debug.error('Not allowed.'); }
  get anchorY() { return 0; }

  set x(value) { Debug.error('Not allowed.'); }
  get x() { return this.mX / this.mStageScaleFactor; } // GG ES6

  set y(value) { Debug.error('Not allowed.'); }
  get y() { return this.mY / this.mStageScaleFactor } // GG ES6

  set rotation(value) { Debug.error('Not allowed.'); }
  get rotation() { return 0; } // GG ES6

  set width(value) { Debug.error('Not allowed.'); }
  get width() { return this.mStageWidth; }

  set height(value) { Debug.error('Not allowed.'); }
  get height() { return this.mStageHeight; }

  set name(value) { Debug.error('Not allowed.'); }
  get name() { return this.mName }
}

/**
 * Collider with rectangle shape.
 *
 * @cat colliders
 * @extends black-engine~Collider
 */
class BoxCollider extends Collider {
  /**
   * Creates instance of BoxCollider.
   *
   * @param {number} x      X-coordinate.
   * @param {number} y      Y-coordinate.
   * @param {number} width  Rectangle width.
   * @param {number} height Rectangle height.
   */
  constructor(x, y, width, height) {
    super();

    const normals = [];
    const vertices = [];

    for (let i = 0; i < 4; i++) {
      normals.push(new Vector());
      vertices.push(new Vector());
    }

    /**
     * Local to gameObject. 
     * 
     * @private 
     * @type {black-engine~Rectangle}
     */
    this.mRect = new Rectangle();

    /**
     * Local to rigid body normals. 
     * 
     * @private 
     * @type {Array<black-engine~Vector>}
     */
    this.mNormals = normals;

    /**
     * Local to rigid body vertices. 
     * 
     * @private 
     * @type {Array<black-engine~Vector>} */
    this.mVertices = vertices;

    /**
     * Local to rigid body min x and y vertex. 
     * 
     * @private 
     * @type {black-engine~Vector} */
    this.mLocalMin = new Vector();

    /**
     * Local to rigid body max x and y vertex 
     * 
     * @private 
     * @type {black-engine~Vector}
     */
    this.mLocalMax = new Vector();

    /**
     * Local to rigid body center  
     * 
     * @private 
     * @type {black-engine~Vector}
     */
    this.mLocalCenter = new Vector();

    this.set(x, y, width, height);
  }

  /**
   * Updates this collider with a new given values.
   *
   * @public
   * @param {number} x      X-coordinate.
   * @param {number} y      Y-coordinate.
   * @param {number} width  Rectangle width.
   * @param {number} height Rectangle height.
   * @returns {black-engine~BoxCollider}
   */
  set(x, y, width, height) {
    this.mRect.set(x, y, width, height);
    this.mChanged = true;
    return this;
  }

  /**
   * @inheritDoc
   */
  refresh(transform, position) {
    const localMin = this.mLocalMin;
    const localMax = this.mLocalMax;
    const min = this.mMin;
    const max = this.mMax;
    const localCenter = this.mLocalCenter;
    const center = this.mCenter;

    if (this.mChanged) {
      const vertices = this.mVertices;
      const normals = this.mNormals;
      const rect = this.mRect;
      const vec = Vector.pool.get();

      transform.transformVector(vec.set(0, -1), normals[0]);
      transform.transformVector(vec.set(1, 0), normals[1]);
      transform.transformVector(vec.set(0, 1), normals[2]);
      transform.transformVector(vec.set(-1, 0), normals[3]);

      for (let i = 0; i < 4; i++) {
        normals[i].normalize();
      }

      transform.transformVector(vec.set(rect.x, rect.y), vertices[0]);
      transform.transformVector(vec.set(rect.x + rect.width, rect.y), vertices[1]);
      transform.transformVector(vec.set(rect.x + rect.width, rect.y + rect.height), vertices[2]);
      transform.transformVector(vec.set(rect.x, rect.y + rect.height), vertices[3]);

      localCenter.set((vertices[0].x + vertices[2].x) / 2, (vertices[0].y + vertices[2].y) / 2);
      localMin.x = Math.min(vertices[0].x, vertices[1].x, vertices[2].x, vertices[3].x);
      localMin.y = Math.min(vertices[0].y, vertices[1].y, vertices[2].y, vertices[3].y);
      localMax.x = Math.max(vertices[0].x, vertices[1].x, vertices[2].x, vertices[3].x);
      localMax.y = Math.max(vertices[0].y, vertices[1].y, vertices[2].y, vertices[3].y);

      Vector.pool.release(vec);
    }

    min.x = localMin.x + position.x;
    min.y = localMin.y + position.y;
    max.x = localMax.x + position.x;
    max.y = localMax.y + position.y;

    center.x = localCenter.x + position.x;
    center.y = localCenter.y + position.y;
  }

  /**
   * Checks if given global coordinates are located within collider's area.
   *
   * @public
   * @param {black-engine~Vector} point Global coordinates.
   *
   * @return {boolean}
   */
  containsPoint(point) {
    return this.mRect.containsXY(point.x, point.y);
  }

  // /**
  //  * Draw this
  //  *
  //  * @public
  //  * @param {Graphics} graphics   Drawing place
  //  * @param {Vector} bodyPosition This parent global position
  //  *
  //  * @return {void}
  //  */
  // debug(graphics, bodyPosition) {
  //   const vertices = this.mVertices;
  //
  //   graphics.beginPath();
  //   graphics.moveTo(bodyPosition.x + vertices[0].x, bodyPosition.y + vertices[0].y);
  //   graphics.lineTo(bodyPosition.x + vertices[1].x, bodyPosition.y + vertices[1].y);
  //   graphics.lineTo(bodyPosition.x + vertices[2].x, bodyPosition.y + vertices[2].y);
  //   graphics.lineTo(bodyPosition.x + vertices[3].x, bodyPosition.y + vertices[3].y);
  //   graphics.lineTo(bodyPosition.x + vertices[0].x, bodyPosition.y + vertices[0].y);
  //   graphics.stroke();
  // }
}

/**
 * Collider with circle shape.
 *
 * @cat colliders
 * @extends black-engine~Collider
 */
class CircleCollider extends Collider {
  /**
   * Creates new instance of CircleCollider.
   *
   * @param {number} x      Center coordinate within X-axis.
   * @param {number} y      Center coordinate within Y-axis.
   * @param {number} radius Radius of the circle.
   */
  constructor(x, y, radius) {
    super();

    /** 
     * @private 
     * @type {black-engine~Circle} */
    this.mCircle = new Circle(x, y, radius);  // local to sprite

    /**
     * Local to rigid body center.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mLocalCenter = new Vector();

    /**
     * Local to rigid body min x and y vertex.
     * @private 
     * @type {black-engine~Vector} */
    this.mLocalMin = new Vector();

    /**
     * Local to rigid body max x and y vertex 
     * @private 
     * @type {black-engine~Vector}
     */
    this.mLocalMax = new Vector();

    /**
     * Global in stage coordinates radius 
     * @private 
     * @type {number}
     */
    this.mRadius = 0;

    this.set(x, y, radius);
  }

  /**
   * Updates this collider with a new given values.
   *
   * @public
   * @param {number} x      Center coordinate within X-axis.
   * @param {number} y      Center coordinate within Y-axis.
   * @param {number} radius Radius of the circle.
   * @returns {black-engine~CircleCollider}
   */
  set(x, y, radius) {
    this.mCircle.set(x, y, radius);
    this.mChanged = true;
    return this;
  }

  /**
   * @inheritDoc
   */
  refresh(transform, position) {
    const localMin = this.mLocalMin;
    const localMax = this.mLocalMax;
    const min = this.mMin;
    const max = this.mMax;
    const localCenter = this.mLocalCenter;
    const center = this.mCenter;

    if (this.mChanged) {
      const circle = this.mCircle;
      const scale = Math.sqrt(transform.data[0] * transform.data[0] + transform.data[1] * transform.data[1]);
      const radius = circle.r * scale;

      transform.transformXY(circle.x, circle.y, localCenter);
      this.mRadius = radius;

      localMin.x = localCenter.x - radius;
      localMin.y = localCenter.y - radius;
      localMax.x = localCenter.x + radius;
      localMax.y = localCenter.y + radius;
    }

    min.x = localMin.x + position.x;
    min.y = localMin.y + position.y;
    max.x = localMax.x + position.x;
    max.y = localMax.y + position.y;

    center.x = localCenter.x + position.x;
    center.y = localCenter.y + position.y;
  }

  /**
   * Checks if given global coordinates are located within collider's area.
   *
   * @public
   * @param {black-engine~Vector} point Global coordinates.
   * @returns {boolean}
   */
  containsPoint(point) {
    if (this.gameObject === null) {
      return false;
    }

    const circle = this.mCircle;
    const vec = Vector.pool.get();
    const distance = vec.set(circle.x, circle.y).distance(point);
    Vector.pool.release(vec);

    return distance <= circle.r;
  }

  // /**
  //  * Draw this
  //  *
  //  * @public
  //  * @param {Graphics} graphics Drawing place
  //  */
  // debug(graphics) {
  //   graphics.beginPath();
  //   graphics.circle(this.mCenter.x, this.mCenter.y, this.mRadius);
  //   graphics.stroke();
  // }
}

/**
 * A texture allowing game objects to be rendered onto it.
 *
 * @cat textures
 * @extends black-engine~Texture
 */
class CanvasRenderTexture extends Texture {
  /**
   * Creates new CanvasRenderTexture instance with given size and scale.
   *
   * @param {number} width  The width of the texture in stage space.
   * @param {number} height The height of the texture in stage space.
   * @param {number} scale  The scale factor of the internal texture
   */
  constructor(width, height, scale) {
    const renderTarget = new RenderTargetCanvas(width * scale, height * scale);

    super(renderTarget.native);
    this.set(renderTarget.native, null, null, 1 / scale);

    this.renderTarget = renderTarget;
  }

  /**
   * Updates this instance with given size and scale.
   *
   * @param {number} width  The width of the texture in stage space.
   * @param {number} height The height of the texture in stage space.
   * @param {number} scale  The scale factor of the internal texture
   */
  resize(width, height, scale) {
    this.renderTarget.resize(width * scale, height * scale);
    this.set(this.renderTarget.native, null, null, 1 / scale);
  }

  __dumpToDocument() {
    let img = new Image();
    img.style.position = 'fixed';
    img.style.top = '0px';
    img.style.left = '0px';
    img.style.background = '#333';
    img.style.width = '256px';
    img.style.height = 'auto';
    //img.style.border = '1px solid crimson';
    img.src = /** @type {HTMLCanvasElement} */(this.mNative).toDataURL('image/png');
    document.body.appendChild(img);
  }
}

/**
 * A texture atlas.
 *
 * @cat textures
 * @extends black-engine~Texture
 */
class AtlasTexture extends Texture {
  constructor(nativeElement, jsonObject, scale = 1) {
    super(nativeElement, null, null, scale);

    /** 
     * @private 
     * @type {Object.<string, black-engine~Texture>} 
     */
    this.mSubTextures = {};

    this.__parseAtlasData(jsonObject, scale);
  }

  /**
   * @ignore
   * @private
   * @param {{meta: *, frames: Object}} o
   * @param {number} scale
   * @return {void}
   */
  __parseAtlasData(o, scale) {
    for (let key in o.frames) {
      const data = /** @type {Array<number>} */ (o.frames[key]);
      const region = new Rectangle(data[0], data[1], data[2], data[3]);
      const untrimmedRect = new Rectangle(data[4], data[5], data[6], data[7]);

      let registrationPoint = null;
      let slice9borders = null;

      if (data.length === 8 + 2) {
        // we got pivots
        registrationPoint = new Vector(data[8], data[9]);
      } else if (data.length === 8 + 4) {
        // we got 9 slice but no pivots
        slice9borders = new Rectangle(data[8], data[9], data[10], data[11]);
      } else if (data.length === 8 + 6) {
        // we got both pivots and 9 slice
        registrationPoint = new Vector(data[8], data[9]);
        slice9borders = new Rectangle(data[10], data[11], data[12], data[13]);
      }
      
      this.mSubTextures[key] = new Texture(this.native, region, untrimmedRect, scale, registrationPoint, slice9borders);
    }
  }

  /**
   * Returns the texture by a given name.
   *
   * @param {string} name The name of the texture to find.
   * @return {black-engine~Texture} The Texture or null if not found.
   */
  getTexture(name) {
    /** @type {Texture} */
    let t = this.mSubTextures[name];
    Debug.assertWarn(t !== undefined, `Texture '${name}' was not found`);

    return /** @type {Texture} */ (t);
  }

  /**
   * Returns array of Texture by given name or wildcard mask.
   * If `nameMask` is null then all textures will be returned.
   * This method sorts all resulting textures using neutral sort algorith.
   *
   * @param {string|null} [nameMask=null] The mask to filter by.
   * @param {Array<black-engine~Texture>|null}         outTextures If passed will be overwritten by result object.
   * @return {Array<black-engine~Texture>}             The list of found textures.
   */
  getTextures(nameMask = null, outTextures = null) {
    let out = outTextures || [];
    if (nameMask === null) {
      for (let key in this.mSubTextures)
        out.push(this.mSubTextures[key]);

      return /** @type {Array<Texture>} */ (out);
    }

    let names = [];

    // TODO: make helper wild function
    let re = new RegExp("^" + nameMask.split("*").join(".*") + "$");
    for (let key in this.mSubTextures)
      if (re.test(key))
        names.push(key);

    //names.sort(AtlasTexture.__naturalComparer);
    AtlasTexture.naturalSort(names);

    for (let i = 0; i < names.length; i++)
      out.push(this.mSubTextures[names[i]]);

    return out;
  }

  /**
   * Gets dictionary of sub textures.
   *
   * @returns {Object} The list of sub textures.
   */
  get subTextures() {
    return this.mSubTextures;
  }

  /**
   * Sorts set of data in natural order
   *
   * @ignore
   * @param {Array<Object>} dataset
   * @param {string|null} [field=null]
   */
  static naturalSort(dataset, field = null) {
    dataset.sort(AtlasTexture.__naturalComparer(field));
  }

  /**
   * @ignore
   * @private
   * @param {string|null} field
   * @param {boolean} useAbs
   * @returns {function(?, ?):number}
   */
  static __naturalComparer(field = null, useAbs = true) {
    return function (a, b) {
      const NUMBER_GROUPS = /(-?\d*\.?\d+)/g;
      let aa = String(field == null ? a : a[field]).split(NUMBER_GROUPS);
      let bb = String(field == null ? b : b[field]).split(NUMBER_GROUPS);
      let min = Math.min(aa.length, bb.length);

      for (let i = 0; i < min; i++) {
        let x = 0;
        let y = 0;

        if (useAbs) {
          x = Math.abs(parseFloat(aa[i])) || aa[i].toLowerCase();
          y = Math.abs(parseFloat(bb[i])) || bb[i].toLowerCase();
        } else {
          x = parseFloat(aa[i]) || aa[i].toLowerCase();
          y = parseFloat(bb[i]) || bb[i].toLowerCase();
        }

        if (x < y)
          return -1;
        else if (x > y)
          return 1;
      }

      return 0;
    }
  }
}

/**
 * Asset type enum.
 * @cat assets
 * @static
 * @constant
 * @enum {string}
 */
const AssetType = {
  TEXTURE              : 'texture',
  TEXTURE_ATLAS        : 'textureAtlas',
  VECTOR_TEXTURE       : 'vectorTexture',
  VECTOR_TEXTURE_ATLAS : 'vectorTextureAtlas',
  FONT                 : 'font',
  BITMAP_FONT          : 'bitmapFont',
  XML                  : 'xml',
  JSON                 : 'json',
  VECTOR_GRAPHICS      : 'vectorGraphics',
  SOUND                : 'sound',
  SOUND_ATLAS          : 'soundAtlas'
};

/**
 * Loader type enum.
 * @cat assets
 * @static
 * @constant
 * @enum {string}
 */
const LoaderType = {
  FONT_FACE : 'fontFace',
  IMAGE     : 'image',
  XHR       : 'xhr'
};

/**
 * Base class for loaders.
 *
 * @cat assets.loaders
 * @extends black-engine~MessageDispatcher
 */
class AssetLoader extends MessageDispatcher {
  /**
   * Creates new AssetLoader instance.
   * 
   * @param {string} url
   */
  constructor(url) {
    super();

    /** 
     * @protected 
     * @type {string} 
     */
    this.mUrl = url;

    /** 
     * @protected 
     * @type {*|null} 
     */
    this.mData = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsLoaded = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mNumOwners = 0;
  }

  /**
   * When overridden loads data. Should not be called directly.
   * 
   * @public
   */
  load() { }

  /**
   * When overridden aborts loading process. Should not be called directly.
   * 
   * @returns {void}
   */
  abort() {
    // more than one owner means this loader was used by two assets, eg two assets has same url.
    if (this.mNumOwners > 1)
      return;

    this.onAbort();
  }

  /**
   * @protected
   * @returns {void}
   */
  onAbort() { }

  /**
   * @protected
   */
  onLoad() {
    this.mIsLoaded = true;
    this.post(Message.COMPLETE);
  }

  /**
   * @protected
   */
  onError() {
    this.mIsLoaded = false;
    this.post(Message.ERROR);
  }

  /**
   * Returns native loaded data object associated with this loader.
   *
   * @return {*}
   */
  get data() {
    return this.mData;
  }

  get url() {
    return this.mUrl;
  }
}

var alternativeUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYmBgAAgwAAAMAAMjcmNcAAAAAElFTkSuQmCC';

/**
 * Responsible for loading images.
 *
 * @cat assets.loaders
 * @extends black-engine~AssetLoader
 */
class ImageAssetLoader extends AssetLoader {
  /**
   * Creates new ImageAssetLoader instance.
   * @param {string} url 
   */
  constructor(url) {
    super(url);

    /** 
     * @private 
     * @type {Image} 
     */
    this.mImageElement = new Image();
    this.mImageElement.crossOrigin = 'anonymous';
  }

  /**
   * @inheritDoc
   */
  load() {
    this.mData = this.mImageElement;
    
    this.mImageElement.onload = () => this.onLoad();
    this.mImageElement.onerror = () => this.onError();
    this.mImageElement.src = this.mUrl;
  }

  /**
   * @inheritDoc
   */
  onAbort() {
    this.mImageElement.onload = this.mImageElement.onabort = this.mImageElement.onerror = function () { };
    this.mImageElement.src = alternativeUrl;
  }
}

/**
 * XHRAssetLoader responsible for loading data via XMLHttpRequest.
 *
 * @cat assets.loaders
 * @extends black-engine~AssetLoader
 */
class XHRAssetLoader extends AssetLoader {
  constructor(url) {
    super(url);

    /** 
     * @protected 
     * @type {XMLHttpRequest} 
     */
    this.mRequest = new XMLHttpRequest();

    /** 
     * @type {string|undefined} 
     */
    this.mimeType = undefined;

    /** 
     * @type {string} 
     */
    this.responseType = '';
  }

  /**
   * @inheritDoc
   */
  load() {
    this.mRequest.open('GET', this.mUrl, true);

    if (this.responseType != '')
      this.mRequest.responseType = this.responseType;

    if (this.mRequest.overrideMimeType != undefined && this.mimeType)
      this.mRequest.overrideMimeType(this.mimeType);

    this.mRequest.onreadystatechange = () => {
      if (this.mRequest.readyState === 4) {
        if ((this.mRequest.status === 200) || ((this.mRequest.status === 0) && this.mRequest.responseText)) {
          if (this.responseType === '' || this.responseType === 'text')
            this.mData = this.mRequest.responseText;
          else
            this.mData = this.mRequest.response;

          this.onLoad();
        }
        else
          this.onError();
      }
    };

    this.mRequest.send(null);
  }

  /**
   * @inheritDoc
   */
  onAbort() {
    this.mRequest.abort();
  }
}

/**
 * Responsible for loading local or Google fonts.
 *
 * @cat assets.loaders
 * @extends black-engine~AssetLoader
 */
class FontFaceAssetLoader extends AssetLoader {
  /**
   * Creates new FontFaceAssetLoader instance.
   *
   * @param {string} name     The custom name of the font
   * @param {string} url      The path to the font
   * @param {boolean} isLocal Pass `true` if font is local otherwise Google Fonts service is used.
   */
  constructor(name, url, isLocal) {
    super(url);

    /** 
     * @private 
     * @type {string} 
     */
    this.mName = name;

    /** 
     * @private 
     * @type {string} 
     */
    this.mTestingFontName = 'Courier New';

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsLocal = isLocal;

    /** 
     * @private 
     * @type {string} 
     */
    this.mTestingString = '~ GHBDTN,.#$Mlck';

    /** 
     * @private 
     * @type {number} 
     */
    this.mCheckDelay = 50;

    /** 
     * @private 
     * @type {HTMLElement} 
     */
    this.mTestingElement = this.__getTestingElement();

    /** 
     * @private 
     * @type {black-engine~FontMetrics|null} 
     */
    this.metrics = null;

    /** 
     * @private 
     * @type {Element} 
     */
    this.mLoaderElement = this.__getLoaderElement(this.mIsLocal);
    this.mTestingElement.style.fontFamily = this.mTestingFontName;

    /** 
     * @private 
     * @type {number} 
     */
    this.mDefaultFontWidth = this.mTestingElement.offsetWidth;
    this.mTestingElement.style.fontFamily = name + ',' + this.mTestingFontName;

    /** 
     * @private 
     * @type {number} 
     */
    this.mTimeoutHandle = -1;
  }

  load() {
    if (this.mIsLocal)
      this.mLoaderElement.innerHTML += (`\n @font-face {font-family: ${this.mName}; src: url(${this.mUrl});}`);
    else
      this.mLoaderElement.href = this.mUrl;

    this.__checkLoadingStatus();
  }

  onAbort() {
    clearTimeout(this.mTimeoutHandle);
    this.mTestingElement.parentNode.removeChild(this.mTestingElement);
  }

  /**
   * @ignore
   * @private
   * @return {Element}
   */
  __getLoaderElement(local) {
    let loaderElement = document.createElement(local ? 'style' : 'link');
    loaderElement.type = 'text/css';
    loaderElement.media = 'all';
    loaderElement.rel = 'stylesheet';
    loaderElement.onerror = () => { this.onError(); };
    document.getElementsByTagName('head')[0].appendChild(loaderElement);
    return loaderElement;
  }

  /**
   * @ignore
   * @private
   * @return {HTMLElement}
   */
  __getTestingElement() {
    let testingElement = /** @type {HTMLElement}*/ (document.createElement('span'));
    testingElement.style.position = 'absolute';
    testingElement.style.top = '-9999px';
    testingElement.style.left = '-9999px';
    testingElement.style.visibility = 'hidden';
    testingElement.style.fontSize = '250px';
    testingElement.innerHTML = this.mTestingString;
    document.body.appendChild(testingElement);

    return testingElement;
  }

  /**
   * @private
   * @return {void}
   */
  __checkLoadingStatus() {
    if (this.mDefaultFontWidth === this.mTestingElement.offsetWidth) {
      this.mTimeoutHandle = setTimeout(this.__checkLoadingStatus.bind(this), this.mCheckDelay);
      return;
    }

    this.metrics = FontMetrics.get(this.mName);
    this.mTestingElement.parentNode.removeChild(this.mTestingElement);

    this.onLoad();
  }
}

/**
 * This is abstract class for custom assets. For example Asset can be used to load video or other data files.
 * Holds information about external assets.
 *
 * @fires Asset#error
 * @fires Asset#complete
 * 
 * @cat assets
 * @extends black-engine~MessageDispatcher
 */
class Asset extends MessageDispatcher {
  /**
   * Creates new Asset instance.
   *
   * @param  {string} name Name of asset.
   */
  constructor(type, name) {
    super();

    /** 
     * @protected 
     * @type {string} 
     */
    this.mType = type;

    /** 
     * @protected 
     * @type {string} 
     */
    this.mName = name;

    /** 
     * @protected 
     * @type {Object|null} 
     */
    this.mData = null;

    /** 
     * @protected 
     * @type {Array<black-engine~AssetLoader>} 
     */
    this.mLoaders = [];

    /** 
     * @private 
     * @type {number} 
     */
    this.mNumLoaded = 0;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsReady = false;

    /** 
     * @private 
     * @type {Array<black-engine~MessageBinding>} 
     */
    this.mBindings = [];
  }

  /**
   * Adds given loader to the list. Loader cannot be added to multiply Assets.
   * 
   * @param {black-engine~AssetLoader} loader Loader to add.
   * @returns {black-engine~AssetLoader}
   */
  addLoader(loader) {
    this.mLoaders.push(loader);

    loader.mNumOwners++;

    this.mBindings.push(loader.on(Message.COMPLETE, this.__onLoaderComplete, this));
    this.mBindings.push(loader.on(Message.ERROR, this.__onLoaderError, this));

    return loader;
  }

  /**
   * Called when AssetManager is about to request loaders for this asset.
   * @param {black-engine~LoaderFactory} factory 
   */
  onLoaderRequested(factory) { }

  /**
   * @private
   * @param {Message} m 
   * @returns {void}
   */
  __onLoaderComplete(m) {
    this.mNumLoaded++;

    if (this.mNumLoaded === this.mLoaders.length) {
      this.mBindings.forEach(x => x.off());

      this.onAllLoaded();
    }
  }

  /**
   * @private
   * @param {black-engine~Message} m 
   */
  __onLoaderError(m) {
    this.abort();

    /**
     * Posted when error occurred during loading this asset. 
     * @event Asset#error
     */
    this.post(Message.ERROR);
  }

  /**
   * @protected
   */
  onAllLoaded() { }

  /**
   * Aborts loading of this asset.
   * @public
   */
  abort() {
    this.mNumLoaded = 0;

    this.mBindings.forEach(x => x.off());

    for (let i = 0; i < this.mLoaders.length; i++) {
      const loader = this.mLoaders[i];
      loader.abort();
    }
  }

  /**
   * Protected method used to notify AssetManager about completion of loading this asset.
   * 
   * @protected
   * @param {Object=} data
   * @returns {void}
   */
  ready(data) {
    this.mData = data;
    this.mIsReady = true;

    /**
     * Posted when asset finished loading.
     * @event Asset#complete
     */
    this.post(Message.COMPLETE);
  }

  /**
   * Returns the type of this asset.
   *
   * @return {string}
   */
  get type() {
    return this.mType;
  }

  /**
   * Returns the name of this asset.
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }

  /**
   * Returns loaded data object associated with this asset.
   *
   * @return {*}
   */
  get data() {
    return this.mData;
  }

  /**
   * Returns `true` if this asset is loaded.
   *
   * @return {boolean}
   */
  get isReady() {
    return this.mIsReady;
  }

  /**
   * Returns array of loaders.
   * 
   * @returns {Array<black-engine~AssetLoader>}
   */
  get loaders() {
    return this.mLoaders;
  }
}

/**
 * Single Texture file asset class responsible for loading images file and
 * converting them into Textures.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
class TextureAsset extends Asset {
  /**
   * Creates TextureAsset instance.
   *
   * @param {string} name Asset name.
   * @param {string} url  URL to load image from.
   */
  constructor(name, url) {
    super(AssetType.TEXTURE, name);

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /** @type {number} */
    this.mScale = 1 / Texture.getScaleFactorFromName(url);

    /** 
     * @private 
     * @type {black-engine~ImageAssetLoader|null} 
     */
    this.mImageLoader = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mImageLoader = factory.get(LoaderType.IMAGE, this.mUrl);
    this.addLoader(this.mImageLoader);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    super.ready(new Texture(this.mImageLoader.data, null, null, this.mScale));
  }
}

/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
class JSONAsset extends Asset {
  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name The name of asset.
   * @param {string} url  URL to the json file.
   * @return {void}
   */
  constructor(name, url) {
    super(AssetType.JSON, name);

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /** 
     * @private 
     * @type {black-engine~XHRAssetLoader|null} 
     */
    this.mXHR = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mXHR = factory.get(LoaderType.XHR, this.mUrl);
    this.mXHR.mimeType = 'application/json';
    this.mXHR.responseType = 'json';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    super.ready(/** @type {!Object}*/(this.mXHR.data));
  }
}

/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
class XMLAsset extends Asset {
  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name The name of asset.
   * @param {string} url  URL to the json file.
   * @return {void}
   */
  constructor(name, url) {
    super(AssetType.XML, name);

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /** 
     * @private 
     * @type {black-engine~XHRAssetLoader|null} 
     */
    this.mXHR = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mXHR = factory.get(LoaderType.XHR, this.mUrl);
    this.mXHR.mimeType = 'text/xml';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    super.ready(new DOMParser().parseFromString(/** @type {string} */(this.mXHR.data), 'text/xml'));
  }
}

/**
 * Font file asset class responsible for loading local font files.
 *
 * Note: this class need a body to work properly.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
class FontAsset extends Asset {
  /**
   * Creates new instance of FontAsset.
   *
   * @param {string} name     The custom name of the font
   * @param {string} url      The path to the font
   * @param {boolean} isLocal Pass `true` if font is local otherwise Google Fonts service is used.
   */
  constructor(name, url, isLocal) {
    super(AssetType.FONT, name);

    if (isLocal === false)
      url = 'https://fonts.googleapis.com/css?family=' + name.replace(new RegExp(' ', 'g'), '+');

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsLocal = isLocal;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    // We are not doing actual loading since loading is handled by browser. Just fake it.
    const loader = factory.get(LoaderType.FONT_FACE, this.mName, this.mUrl, this.mIsLocal);
    this.addLoader(loader);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    super.ready();
  }
}

/**
 * Texture Atlas asset responsible for loading Image file and corresponding Json
 * file.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
class AtlasTextureAsset extends Asset {
  /**
   * Creates new AtlasTextureAsset instance.
   *
   * @param {string} name     Name of the asset.
   * @param {string} imageUrl Image URL.
   * @param {string} dataUrl  Json URL.
   */
  constructor(name, imageUrl, dataUrl) {
    super(AssetType.TEXTURE_ATLAS, name);

    /**
     * @private
     * @type {string}
     */
    this.mImageUrl = imageUrl;

    /**
     * @private
     * @type {string}
     */
    this.mDataUrl = dataUrl;

    /** 
     * @private 
     * @type {number} 
     */
    this.mScale = 1 / Texture.getScaleFactorFromName(imageUrl);

    /** 
     * @private 
     * @type {black-engine~ImageAssetLoader|null} 
     */
    this.mImageLoader = null;

    /** 
     * @private 
     * @type {XHRAssetLoader|null} 
     */
    this.mXHR = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mImageLoader = factory.get(LoaderType.IMAGE, this.mImageUrl);
    this.addLoader(this.mImageLoader);

    this.mXHR = factory.get(LoaderType.XHR, this.mDataUrl);
    this.mXHR.mimeType = 'application/json';
    this.mXHR.responseType = 'json';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    super.ready(new AtlasTexture(this.mImageLoader.data, this.mXHR.data, this.mScale));
  }
}

/**
 * Bitmap Font Asset responsible for loading font image file and corresponding xml file.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
class BitmapFontAsset extends Asset {
  /**
   * Creates new AtlasTextureAsset instance.
   *
   * @param {string} name     Name of the asset.
   * @param {string} imageUrl Image URL.
   * @param {string} xmlUrl   XML URL.
   */
  constructor(name, imageUrl, xmlUrl) {
    super(AssetType.BITMAP_FONT, name);

    /**
     * @private
     * @type {string}
     */
    this.mImageUrl = imageUrl;

    /**
     * @private
     * @type {string}
     */
    this.mXmlUrl = xmlUrl;

    /** @type {number} */
    this.mScale = 1 / Texture.getScaleFactorFromName(imageUrl);

    /** 
     * @private 
     * @type {black-engine~ImageAssetLoader|null}
     */
    this.mImageLoader = null;

    /** 
     * @private 
     * @type {XHRAssetLoader|null} 
     */
    this.mXHR = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mImageLoader = factory.get(LoaderType.IMAGE, this.mImageUrl);
    this.addLoader(this.mImageLoader);

    this.mXHR = factory.get(LoaderType.XHR, this.mXmlUrl);
    this.mXHR.mimeType = 'text/xml';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    let xml = new DOMParser().parseFromString(/** @type {string} */(this.mXHR.data), 'text/xml');
    let texture = new Texture(this.mImageLoader.data, null, null, this.mScale);

    super.ready(BitmapFontAsset.parse(xml, texture));
  }

  /**
   *
   * @param {Document} xml
   * @param {black-engine~Texture} texture
   * @returns {black-engine~BitmapFontData}
   */
  static parse(xml, texture) {
    let data = new BitmapFontData();
    data.texture = texture;
    data.xml = xml;

    let info = xml.getElementsByTagName('info')[0];
    let common = xml.getElementsByTagName('common')[0];

    data.name = info.getAttribute('face');
    data.size = parseInt(info.getAttribute('size'), 10);
    data.lineHeight = parseInt(common.getAttribute('lineHeight'), 10);
    data.baseline = parseInt(common.getAttribute('base'), 10);
    data.chars = {};

    let letters = xml.getElementsByTagName('char');

    for (let i = 0; i < letters.length; i++) {
      let letter = letters[i];
      let charCode = parseInt(letter.getAttribute('id'), 10);
      let x = parseInt(letter.getAttribute('x'), 10) + texture.region.x;
      let y = parseInt(letter.getAttribute('y'), 10) + texture.region.y;
      let w = parseInt(letter.getAttribute('width'), 10);
      let h = parseInt(letter.getAttribute('height'), 10);
      let xo = parseInt(letter.getAttribute('xoffset'), 10);
      let yo = parseInt(letter.getAttribute('yoffset'), 10);
      let xa = parseInt(letter.getAttribute('xadvance'), 10);
      let textureRect = new Rectangle(x, y, w, h);

      let charData = new BitmapFontCharData();
      charData.texture = new Texture(texture.native, textureRect);
      charData.xOffset = xo;
      charData.yOffset = yo;
      charData.width = w;
      charData.height = h;
      charData.xAdvance = xa;

      data.chars[charCode] = charData;
    }

    let kernings = xml.getElementsByTagName('kerning');

    for (let i = 0; i < kernings.length; i++) {
      let kerning = kernings[i];
      let first = parseInt(kerning.getAttribute('first'), 10);
      let second = parseInt(kerning.getAttribute('second'), 10);
      let amount = parseInt(kerning.getAttribute('amount'), 10);

      if (data.chars[second])
        data.chars[second].kerning[first] = amount;
    }

    return data;
  }
}

class BitmapFontData {
  constructor() {
    /** @type {Texture} */
    this.texture = null;

    /** @type {Document} */
    this.xml = null;

    /** @type {string} */
    this.name = '';

    /** @type {number} */
    this.size = 0;

    /** @type {number} */
    this.lineHeight = 0;

    /** @type {Object.<number, BitmapFontCharData>} */
    this.chars = {};

    /** @type {number} */
    this.baseline = 0;
  }
}

class BitmapFontCharData {
  constructor() {
    /** @type {Texture} */
    this.texture = null;

    /** @type {number} */
    this.xOffset = 0;

    /** @type {number} */
    this.yOffset = 0;

    /** @type {number} */
    this.width = 0;

    /** @type {number} */
    this.height = 0;

    /** @type {number} */
    this.xAdvance = 0;

    /** @type {Object.<number, number>} */
    this.kerning = {};
  }
}

/**
 * Sound states.
 * @ignore
 * @constant
 * @cat audio
 * @enum {string}
 */
const SoundState = {
  NEWBORN: 'newborn',
  PLAYING: 'playing',
  PAUSED: 'paused',
  STOPPED: 'stopped',
  COMPLETED: 'completed'
};

/**
 * The sound effect interface. Implementations can be attached to sound channel.
 * 
 * @cat audio
 */
class SoundEffect {

  /**
   * Creates new instance of SoundEffect.
   */
  constructor() {
    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mInputNode = null;

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mOutputNode = null;
  }

  /**
   * @ignore
   * @return {AudioNode}
   */
  get _inputNode() {
    Debug.assert(this.mInputNode != null, 'Input node must be specified in descendant class');
    return this.mInputNode;
  }

  /**
   * @ignore
   * @return {AudioNode}
   */
  get _outputNode() {
    Debug.assert(this.mOutputNode != null, 'Output node must be specified in descendant class');
    return this.mOutputNode;
  }
}

/**
 * Allows to distribute sound between left and right channel.
 * 
 * @cat audio.effects
 * @extends {black-engine~SoundEffect}
 */
class StereoPanner extends SoundEffect {
  /**
   * Creates new instance of StereoPan.
   */
  constructor() {
    super();

    /** 
     * @private 
     * @type {GainNode} 
     */
    this.mGainL = Black.audio._newGainNode();

    /** 
     * @private 
     * @type {GainNode} 
     */
    this.mGainR = Black.audio._newGainNode();

    /** 
     * @private 
     * @type {ChannelSplitterNode} 
     */
    this.mSplitter = Black.audio.context.createChannelSplitter(2);
    
    /** 
     * @private 
     * @type {ChannelMergerNode} 
     */
    this.mMerger = Black.audio.context.createChannelMerger(2);

    this.mSplitter.connect(this.mGainL, 0);
    this.mSplitter.connect(this.mGainR, 1);
    this.mGainL.connect(this.mMerger, 0, 0);
    this.mGainR.connect(this.mMerger, 0, 1);

    /** 
     * @private 
     * @type {number} 
     */
    this.mValue = 0;

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mInputNode = this.mSplitter;

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mOutputNode = this.mMerger;
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set pan(value) {
    this.mValue = MathEx.clamp(value, -1, 1);
    this.mGainL.gain.setValueAtTime(1 - MathEx.clamp(this.mValue, 0, 1), 0);
    this.mGainR.gain.setValueAtTime(1 + MathEx.clamp(this.mValue, -1, 0), 0);
  }

  /**
   * Sets/Gets stereo panning value
   * 
   * @public
   * @returns {number}
   */
  get pan() {
    return this.mValue;
  }
}

/**
 * @ignore
 * @private
 */
let ID$2 = 0;

/**
 * The sound
 * 
 * @cat audio
 * @extends {black-engine~MessageDispatcher}
 */
class SoundInstance extends MessageDispatcher {
  /**
   * Creates instance
   * @param {black-engine~SoundClip} sound `SoundClip` instance taken from `AssetManager`.
   */
  constructor(sound) {
    super();

    /** 
     * @private 
     * @type {number} 
     */
    this.mId = ++ID$2;

    /** 
     * @private 
     * @type {black-engine~SoundClip} 
     */
    this.mSound = sound;

    /** 
     * @private 
     * @type {black-engine~SoundState} 
     */
    this.mState = SoundState.NEWBORN;

    /** 
     * @private 
     * @type {string} 
     */
    this.mChannel = 'master';

    /** 
     * @private 
     * @type {number} 
     */
    this.mVolume = 1;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mLoop = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mStartTime = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mPausePosition = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mStopPosition = 0;

    /** 
     * @private 
     * @type {AudioBufferSourceNode} 
     */
    this.mSrc = null;

    /** 
     * @private 
     * @type {GainNode} 
     */
    this.mGainNode = Black.audio._newGainNode();

    /** 
     * @private 
     * @type {AudioNode} The node to connect audio source 
     */
    this.mFirstNode = this.mGainNode;

    /** 
     * @private 
     * @type {AudioNode} The node the source is connected to 
     */
    this.mPlayNode = null;

    /** 
     * @private 
     * @type {PannerNode} 
     */
    this.mSpatialPanner = null;

    /** 
     * @private 
     * @type {StereoPanner} 
     */
    this.mStereoPanner = null;

    /** 
     * @private 
     * @type {AnalyserNode} 
     */
    this.mAnalyser = null;
  }

  /**
   * Enables spatial effect if not enabled previously.
   * 
   * @public
   * @returns {PannerNode}
   */
  enableSpacePan() {
    if (this.mSpatialPanner == null) {
      this.mSpatialPanner = Black.audio.context.createPanner();
      if (this.mFirstNode) {
        this.mSpatialPanner.connect(this.mFirstNode);
        this.mFirstNode = this.mSpatialPanner;
      }
      this.__reconnectSource();
    }
    return this.mSpatialPanner;
  }

  /**
   * Enables stereo panning effect if not enabled previously.
   * 
   * @public
   * @returns {StereoPanner}
   */
  enableStereoPan() {
    if (this.mStereoPanner == null) {
      this.mStereoPanner = new StereoPanner();
      if (this.mFirstNode) {
        this.mStereoPanner._outputNode.connect(this.mFirstNode);
        this.mFirstNode = this.mStereoPanner._inputNode;
      }
      this.__reconnectSource();
    }
    return this.mStereoPanner;
  }

  /**
   * Enables analyser node if not enabled previously.
   * 
   * @public
   * @returns {AnalyserNode}
   */
  enableAnalyser() {
    if (this.mAnalyser == null) {
      this.mAnalyser = Black.audio.context.createAnalyser();
      if (this.mFirstNode) {
        this.mAnalyser.connect(this.mFirstNode);
        this.mFirstNode = this.mAnalyser;
      }
      this.__reconnectSource();
    }
    return this.mAnalyser;
  }

  /**
   * @ignore
   * @private
   * @returns {void}
   */
  __reconnectSource() {
    if (this.mSrc != null && this.mPlayNode != null && this.mFirstNode != null) {
      this.mSrc.disconnect(this.mPlayNode);
      this.mSrc.connect(this.mFirstNode);
      this.mPlayNode = this.mFirstNode;
    }
  }

  /**
   * @ignore
   * @returns {black-engine~SoundInstance}
   */
  _play() {
    if (this.mState === SoundState.PLAYING)
      return this;

    this.mState = SoundState.PLAYING;

    let duration = this.mSound.isSubClip && !this.mLoop ? this.mSound.duration - this.mPausePosition : undefined;
    this.mGainNode.gain.setValueAtTime(this.mVolume, 0);

    let src = Black.audio.context.createBufferSource();
    src.buffer = this.mSound.native;
    src.loop = this.mLoop;
    src.onended = () => this.__onComplete();
    this.mFirstNode && src.connect(this.mFirstNode);
    this.mPlayNode = this.mFirstNode;
    this.mStartTime = Black.audio.context.currentTime - this.mPausePosition;

    if (this.mLoop && this.mSound.isSubClip) {
      src.loopStart = this.mSound.offset;
      src.loopEnd = this.mSound.offset + this.mSound.duration;
    }

    src.start(Black.audio.context.currentTime, this.mSound.offset + this.mPausePosition, duration);
    Black.audio._resolveChannel(this);
    this.mSrc = src;

    return this;
  }

  /**
   * Stops playing.
   * 
   * @public
   * @param {number=} [duration=0] Time offset in seconds specifying when the sound will completely stop.
   * @returns {void}
   */
  stop(duration = 0) {
    if (this.mState === SoundState.PLAYING) {
      this.mStopPosition = this.currentPosition;

      this.mGainNode.gain.cancelScheduledValues(0);
      this.mSrc.stop(Black.audio.context.currentTime + duration);

      this.mState = SoundState.STOPPED;
    }
  }

  /**
   * Pauses current sound.
   * 
   * @public
   * @returns {void}
   */
  pause() {
    if (this.mState === SoundState.PLAYING) {
      this.mPausePosition = this.currentPosition;
      this.stop();
      
      this.mState = SoundState.PAUSED;
    }
  }

  /**
   * Resumes current sound, if it has been paused.
   * 
   * @public
   * @returns {void}
   */
  resume() {
    if (this.mState === SoundState.PAUSED)
      this._play();
  }

  /**
   * Changes the volume of sound in given time.
   * 
   * @param {number} from            Initial volume level.
   * @param {number} to              Target volume level.
   * @param {number=} [duration=0]   In seconds. If '0' changes the volume instantly.
   * @param {string} [type='linear'] Possible types: 'linear', 'exp'.
   */
  fade(from, to, duration = 0, type = 'linear') {
    if (duration <= 0) {
      this.mGainNode.gain.setValueAtTime(to, 0);
    } else {
      this.mGainNode.gain.setValueAtTime(from, 0);
      if (type === 'exp')
        this.mGainNode.gain.exponentialRampToValueAtTime(Math.max(to, 0.01), Black.audio.context.currentTime + duration);
      else
        this.mGainNode.gain.linearRampToValueAtTime(to, Black.audio.context.currentTime + duration);
    }
  }

  /**
   * @ignore
   * @private
   * @returns {void}
   */
  __onComplete() {
    this.mSrc = null;

    if (this.mState !== SoundState.PAUSED) {
      this.mStartTime = 0;
      this.mState = SoundState.COMPLETED;
      this.post(Message.COMPLETE);
    }
  }

  /**
   * Gets current position of sound in seconds.
   * 
   * @public
   * @readonly
   * @returns {number}
   */
  get currentPosition() {
    switch (this.mState) {
      case SoundState.PLAYING:
        return (Black.audio.context.currentTime - this.mStartTime) % (this.mSound.duration + 0.01);
      case SoundState.PAUSED:
        return this.mPausePosition;
      case SoundState.COMPLETED:
        return this.mSound.duration;
      case SoundState.STOPPED:
        return this.mStopPosition;
    }
    
    return 0;
  }

  /**
   * @ignore
   * @readonly
   * @returns {AudioNode}
   */
  get _outputNode() {
    return this.mGainNode;
  }

  /**
   * Gets/Sets current channel to play by name.
   * 
   * @public
   * @returns {string}
   */
  get channel() {
    return this.mChannel;
  }

  /**
   * @public
   * @param {string} value
   * @returns {void}
   */
  set channel(value) {
    if (this.mChannel === value)
      return;
    this.mChannel = value;
    if (this.mState === SoundState.PLAYING) {
      Black.audio._resolveChannel(this);
    }
  }

  /**
   * Gets/Sets sound volume. Ranging from 0 to 1.
   * 
   * @public
   * @returns {number}
   */
  get volume() {
    return this.mVolume;
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set volume(value) {
    this.mVolume = value;
    this.mGainNode.gain.setValueAtTime(this.mVolume, 0);
  }

  /**
   * Gets/Sets whether the sound will be looped.
   * 
   * @public
   * @returns {boolean}
   */
  get loop() {
    return this.mLoop;
  }

  /**
   * @public
   * @param {boolean} value
   * @returns {void}
   */
  set loop(value) {
    this.mLoop = value;
  }

  /**
   * Gets/Sets pan stereo effect. Ranging from -1 (left) to 1 (right).
   * 
   * @public
   * @returns {number}
   */
  get pan() {
    return this.mStereoPanner.pan;
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set pan(value) {
    if (value !== 0 && this.mStereoPanner == null)
      this.enableStereoPan();

    if (this.mStereoPanner)
      this.mStereoPanner.pan = value;
  }

  /**
   * Gets whether sound is playing.
   * 
   * @public
   * @readonly
   * @returns {boolean}
   */
  get isPlaying() {
    return this.mState === SoundState.PLAYING;
  }

  /**
   * Gets total duration of sound clip.
   * 
   * @public
   * @readonly
   * @returns {number}
   */
  get duration() {
    return this.mSound.duration;
  }
}

/**
 * Sound channel
 * 
 * @cat audio
 */
class SoundChannel {
  /**
   * Creates instance of SoundChannel with specific name
   * 
   * @param {string} name The name of the channel.
   */
  constructor(name) {

    /** 
     * @private 
     * @type {string} 
     */
    this.mName = name;

    /** 
     * @private 
     * @type {!GainNode} 
     */
    this.mGain = Black.audio._newGainNode();

    /** 
     * @private 
     * @type {Array<black-engine~SoundInstance>} 
     */
    this.mSounds = [];

    /** 
     * @private 
     * @type {Array<black-engine~SoundEffect>} 
     */
    this.mEffects = [];
  }

  /**
   * Allows the sound to be played on this channel
   * 
   * @public
   * @param {black-engine~SoundInstance} soundInstance Concrete SoundInstance.
   * @returns {void}
   */
  attachSound(soundInstance) {
    Debug.assert(soundInstance != null, 'Sound cannot be null');

    soundInstance._outputNode.connect(this._inputNode);
    this.mSounds.push(soundInstance);

    soundInstance.on(Message.COMPLETE, () => {
      this.mSounds.splice(this.mSounds.indexOf(soundInstance), 1);
      soundInstance._outputNode.disconnect(0);
    });
  }

  /**
   * Removes given sound instance from this channel
   * 
   * @public
   * @param {black-engine~SoundInstance} soundInstance Concrete SoundInstance.
   * @returns {void}
   */
  detachSound(soundInstance) {
    Debug.assert(soundInstance != null, 'Sound cannot be null');

    let ix = this.mSounds.indexOf(soundInstance);
    if (ix > -1) {
      this.mSounds.splice(ix, 1);
      soundInstance._outputNode.disconnect(0);
    }
  }

  /**
   * Stops all sounds on this channel
   * 
   * @public
   * @returns {void}
   */
  stopAll() {
    for (let snd = this.mSounds[0]; this.mSounds.length; snd = this.mSounds.shift()) {
      snd.stop();
    }
  }

  /**
   * Pauses all sounds on this channel.
   * 
   * @public
   * @returns {void}
   */
  pauseAll() {
    for (let i = 0; i < this.mSounds.length; i++)
      this.mSounds[i].pause();
  }

  /**
   * Resumes all paused sounds on this channel.
   * 
   * @public
   * @returns {void}
   */
  resumeAll() {
    for (let i = 0; i < this.mSounds.length; i++)
      this.mSounds[i].resume();
  }

  /**
   * Adds sound effect to this channel
   * 
   * @public
   * @param {black-engine~SoundEffect} effect SoundEffect instance.
   * @returns {black-engine~SoundEffect}
   */
  addEffect(effect) {
    Debug.assert(effect != null, 'Effect cannot be null');

    effect._outputNode.connect(this._inputNode);
    this.mEffects.unshift(effect);
    this.__reconnectSounds();
    return effect;
  }

  /**
   * Removes sound effect from this channel
   * 
   * @public
   * @param {black-engine~SoundEffect} effect SoundEffect instance.
   * @returns {black-engine~SoundEffect}
   */
  removeEffect(effect) {
    Debug.assert(effect != null, 'Effect cannot be null');

    effect._outputNode.disconnect(0);
    this.mEffects.splice(this.mEffects.indexOf(effect), 1);
    this.__reconnectSounds();
    return effect;
  }

  /**
   * Removes all sound effect from this channel
   * 
   * @public
   * @returns {void}
   */
  removeAllEffects() {
    for (; this.mEffects.length; this.mEffects.shift()) {
      this.mEffects[0]._outputNode.disconnect(0);
    }
    this.__reconnectSounds();
  }

  /**
   * @ignore
   * @private
   * @returns {void}
   */
  __reconnectSounds() {
    this.mSounds.forEach(x => {
      x._outputNode.disconnect(0);
      x._outputNode.connect(this._inputNode);
    });
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set volume(value) {
    this.mGain.gain.setValueAtTime(value, 0);
  }

  /**
   * Gets/Sets the volume for this channel
   * 
   * @public
   * @returns {number}
   */
  get volume() {
    return this.mGain.gain.value;
  }

  /**
   * @ignore
   * @readonly
   * @returns {!AudioNode}
   */
  get _inputNode() {
    return this.mEffects.length ? /** @type {!AudioNode} */ (this.mEffects[0]._inputNode) : this.mGain;
  }

  /**
   * @ignore
   * @readonly
   * @returns {!AudioNode}
   */
  get _outputNode() {
    return this.mGain;
  }
}

/**
 * The main class, which is responsible for audio support.
 * 
 * @cat audio
 * @extends {black-engine~System}
 */
class MasterAudio extends System {
  /**
   * Singleton
   */
  constructor() {
    super();

    Black.audio = this;

    /** 
     * @private 
     * @type {AudioContext|null} 
     */
    this.mContext = null;

    /** 
     * @private 
     * @type {black-engine~SoundListener|null} 
     */
    this.mCurrentListener = null;

    /** 
     * @private 
     * @type {Object<string, black-engine~SoundChannel>} 
     */
    this.mChannels = {};

    /** 
     * @private 
     * @type {black-engine~SoundChannel|null} 
     */
    this.mMasterChannel = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mIsPendingResume = false;

    /**
     * @private
     * @type {number}
     */
    this.mPendingResume = 0;

    /**
     * @private
     * @type {number}
     */
    this.mResumeTimeout = 0.1;

    this.__initialize();
  }

  /**
   * @inheritDoc
   */
  onPause() {
    if (this.mContext === null)
      return;

    if (this.mContext.state === 'running')
      this.mContext.suspend();

    this.mIsPendingResume = false;
  }

  /**
   * @inheritDoc
   */
  onResume() {
    this.mPendingResume = this.mResumeTimeout;
    this.mIsPendingResume = true;
  }

  onUpdate() {
    if (this.mIsPendingResume)
      this.mPendingResume -= Black.time.delta;
    else
      return;

    if (this.mPendingResume <= 0) {
      if (this.mContext === null)
        return;

      if (this.mContext.state === 'suspended' || this.mContext.state === 'interrupted') {
        this.mContext.resume();
        this.mIsPendingResume = false;
      }
    }
  }

  /**
   * @ignore
   */
  __initialize() {
    try {
      this.mContext = new (window['AudioContext'] || window['webkitAudioContext'])();
    } catch (error) {
      if (this.mContext == null) {
        Debug.warn('no audio support');
        return;
      }
    }

    this.__unlock();

    this.mMasterChannel = new SoundChannel('master');

    this.mMasterChannel._outputNode.connect(this.mContext.destination);
    this.mChannels['master'] = this.mMasterChannel;
  }

  dispose() {
    super.dispose();

    if (this.mContext !== null) {
      this.stopAll();
      this.mContext.close();
    }

    this.mIsPendingResume = false;

    Black.audio = null;
  }

  /**
   * @ignore
   * @private
   * @return {void}
   */
  __unlock() {
    let f = () => {
      let buffer = this.mContext.createBuffer(1, 1, 22050);
      let unlockSource = this.mContext.createBufferSource();
      unlockSource.buffer = buffer;
      unlockSource.connect(this.mContext.destination);

      if (unlockSource.start === undefined)
        unlockSource.noteOn(0);
      else
        unlockSource.start(0);

      if (unlockSource.context.state === 'suspended')
        unlockSource.context.resume();

      document.removeEventListener('touchstart', f);
      document.removeEventListener('click', f);
    };

    document.addEventListener('touchstart', f);
    document.addEventListener('click', f);
  }

  /**
   * Creates or returns the channel with specific name.
   * 
   * @param {string} name The name of channel to create.
   * @returns {black-engine~SoundChannel}
   */
  createChannel(name) {
    if (this.mChannels[name] == null) {
      let ch = new SoundChannel(name);
      ch._outputNode.connect(this.mMasterChannel._inputNode);
      this.mChannels[name] = ch;
    }

    return this.mChannels[name];
  }

  /**
   * Gets the channel with specific name.
   * 
   * @param {string} name The name of channel to get.
   * @returns {black-engine~SoundChannel|null}
   */
  getChannel(name) {
    return this.mChannels[name];
  }

  /**
   * @ignore
   * @param {black-engine~SoundInstance} snd 
   * @returns {black-engine~SoundChannel}
   */
  _resolveChannel(snd) {
    for (let chName in this.mChannels)
      this.mChannels[chName].detachSound(snd);

    let chName = snd.channel == '' ? 'master' : snd.channel;
    let ch = this.mChannels[chName];
    ch.attachSound(snd);

    return ch;
  }

  /**
   * Plays sound on specific channel.
   * 
   * @public
   * @param {string|black-engine~SoundAtlasClip} nameOrSound The name of sound or the instance of SoundInstance.
   * @param {string=} [channel='master']       The name of channel to play on.
   * @param {number=} [volume=1]               Volume level.
   * @param {boolean=} [loop=false]            Defines if sound will loop.
   * @param {number=} [pan=0]                  The panning of the sound, ranging from -1 (left) to 1 (right).
   * @returns {SoundInstance}                  New sound instance to be played.
   */
  play(nameOrSound, channel = 'master', volume = 1, loop = false, pan = 0) {
    Debug.assert(nameOrSound != null, `Param 'nameOrSound' cannot be null.`);

    let sound = null;
    if (nameOrSound.constructor === String)
      sound = (Black.assets.getSound( /** @type {string} */(nameOrSound)));

    return sound.play(channel, volume, loop, pan);
  }

  /**
   * Stops all sound on specific channel.
   * 
   * @public
   * @param {string|null} channelName The name of channel to stop sounds on. If empty, stops sounds on all channels.
   * @returns {void} 
   */
  stopAll(channelName = null) {
    if (channelName === null)
      for (let chName in this.mChannels)
        this.mChannels[chName].stopAll();
    else
      this.getChannel(channelName).stopAll();
  }

  /**
   * Pauses all the sounds on specific channel.
   * 
   * @public
   * @param {string|null} channelName The name of channel to pause sounds on. If empty, pauses all the sounds on all channels.
   * @returns {void}
   */
  pauseAll(channelName = null) {
    if (channelName === null)
      for (let chName in this.mChannels)
        this.mChannels[chName].pauseAll();
    else
      this.getChannel(channelName).pauseAll();
  }

  /**
   * Resumes all the sounds on specific channel.
   * 
   * @public
   * @param {string|null} channelName The name of channel to resume sounds on. If empty, resumes all the sounds on all channels.
   * @returns {void}
   */
  resumeAll(channelName = null) {
    if (channelName === null)
      for (let chName in this.mChannels)
        this.mChannels[chName].resumeAll();
    else
      this.getChannel(channelName).resumeAll();
  }

  /**
   * @param {number} value
   * @returns {void}
   */
  set masterVolume(value) {
    this.mMasterChannel.volume = value;
  }

  /**
   * Gets/Sets volume on master channel.
   * 
   * @public
   * @returns {number}
   */
  get masterVolume() {
    return this.mMasterChannel.volume;
  }

  /**
   * Gets the only instance of native AudioContext.
   * 
   * @readonly
   * @returns {AudioContext}
   */
  get context() {
    return this.mContext;
  }

  /**
   * Gets the master channel.
   * 
   * @readonly
   * @returns {black-engine~SoundChannel}
   */
  get masterChannel() {
    return this.mMasterChannel;
  }

  /**
   * @param {black-engine~SoundListener} value
   * @returns {void}
   */
  set currentListener(value) {
    this.mCurrentListener = value;
  }

  /**
   * Gets/Sets current listener for spatial sound effects.
   * 
   * @public
   * @returns {black-engine~SoundListener}
   */
  get currentListener() {
    return this.mCurrentListener;
  }

  /**
   * Gets/Sets current timeout when resuming audio context from sleep.
   * Recommended value is 100ms for iOS devices running in Safari.
   * 
   * @public
   * @returns {number}
   */
  get resumeTimeout() {
    return this.mResumeTimeout;
  }

  /**
   * @param {number} value 
   * @returns {void}
   */
  set resumeTimeout(value) {
    this.mResumeTimeout = value;
  }

  /**
   * Resets current listener to default AudioContext listener.
   * 
   * @public
   * @returns {void}
   */
  looseListener() {
    this.mContext.listener.setPosition(0, 0, 1);
    this.mCurrentListener = null;
  }

  /**
   * @ignore
   * @returns {!GainNode}
   */
  _newGainNode() {
    if (this.mContext.createGain === undefined)
      return this.mContext.createGainNode();

    return this.mContext.createGain();
  }
}

/**
 * The class which stores audio buffer and its all sounds data.
 * 
 * @cat audio
 */
class SoundClip {
  /**
   * Creates new instance of SoundClip.
   * 
   * @param {AudioBuffer} nativeBuffer     Decoded audio buffer.
   * @param {number=} [offset=0]           Determines at which position of buffer the sound will be played.
   * @param {number=} [duration=undefined] If undefined, gets duration value from native audio buffer.
   * @param {boolean=} [isSubClip=false]   Specifies whether this sound clip is part of a sound atlas.
   */
  constructor(nativeBuffer, offset = 0, duration = NaN, isSubClip = false) {

    /** 
     * @private 
     * @type {AudioBuffer} 
     */
    this.mNativeBuffer = nativeBuffer;

    /** 
     * @private 
     * @type {number} 
     */
    this.mStartOffset = offset;

    /** 
     * @private 
     * @type {number} 
     */
    this.mDuration = duration || nativeBuffer.duration;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsSubClip = isSubClip;
  }

  /**
   * Creates sound instance and starts to play on specific channel
   * 
   * @public
   * @param {string=} [channel='master'] The name of channel.
   * @param {number=} [volume=1]         The volume level.
   * @param {boolean=} [loop=false]      Specifies if sound will repeat infinite times.
   * @param {number=} [pan=0]            The panning value.
   * @returns {SoundInstance}            New sound instance to be played.
   */
  play(channel = 'master', volume = 1, loop = false, pan = 0) {
    let instance = new SoundInstance(this);
    instance.channel = channel;
    instance.volume = volume;
    instance.loop = loop;
    instance.pan = pan;
    return instance._play();
  }

  /**
   * Creates an array of blocks filled with average amplitude gathered in certain interval
   * 
   * @public
   * @param {number} blockNum Number of blocks to divide data to
   * @returns {Float32Array}
   */
  collectWaveData(blockNum) {
    let channels = [];
    for (let i = 0; i < this.mNativeBuffer.numberOfChannels; i++)
      channels[i] = this.mNativeBuffer.getChannelData(i);

    const playPercent = this.mDuration / this.mNativeBuffer.duration;
    const startPercent = this.mStartOffset / this.mNativeBuffer.duration;
    const startPos = ~~(channels[0].length * startPercent);
    const endPos = startPos + ~~(channels[0].length * playPercent);
    const values = new Float32Array(blockNum);
    const blockWidth = ~~(channels[0].length * playPercent / blockNum);
    let dataBlock = [];

    for (let i = startPos, c = 0; i < endPos ; i++) {
      dataBlock.push(this.__averagePeak(channels, i));

      if (dataBlock.length >= blockWidth) {
        let max = Math.max(...dataBlock);
        let min = Math.min(...dataBlock);
        values[c++] = (max + min) / 2;
        dataBlock = [];
      }
    }

    return values;
  }

  /**
   * @ignore
   * @private
   * @param {Array<Float32Array>} channels 
   * @param {number} ix 
   */
  __averagePeak(channels, ix) {
    let sum = 0;
    channels.forEach(ch => sum += Math.abs(ch[ix]));
    return sum / channels.length;
  }

  /**
   * Gets the decoded audio buffer.
   * 
   * @public
   * @readonly
   * @returns {AudioBuffer}
   */
  get native() {
    return this.mNativeBuffer;
  }

  /**
   * Gets the position in seconds, where the sound should start to play.
   * 
   * @public
   * @readonly
   * @returns {number}
   */
  get offset() {
    return this.mStartOffset;
  }

  /**
   * Gets sound clip duration.
   * 
   * @public
   * @readonly
   * @returns {number}
   */
  get duration() {
    return this.mDuration;
  }

  /**
   * Represents whether this sound clip is a part of sound atlas clip.
   * 
   * @public
   * @readonly
   * @returns {boolean}
   */
  get isSubClip() {
    return this.mIsSubClip;
  }
}

/**
 * Sound file asset class responsible for loading audio files.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
class SoundAsset extends Asset {
  /**
   * Creates SoundAsset instance.
   *
   * @param {string} name Sound name.
   * @param {string} url  URL to load audio from.
   */
  constructor(name, url) {
    super(AssetType.SOUND, name);

    if (Black.device.webAudioSupported === false)
      return;

    if (Black.engine.hasSystem(MasterAudio) === false) {
      Debug.warn('[SoundAsset] Loading sound files without MasterAudio system.');
      return;
    }

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /** 
     * @private 
     * @type {black-engine~XHRAssetLoader|null} 
     */
    this.mXHR = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mXHR = factory.get(LoaderType.XHR, this.mUrl);
    this.mXHR.responseType = 'arraybuffer';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    let undecodedAudio = /** @type {!ArrayBuffer} */ (this.mXHR.data);
    Black.audio.context.decodeAudioData(undecodedAudio, (buffer) => {
      super.ready(new SoundClip(buffer));
    });
  }
}

/**
 * The class which stores audio buffer of sound atlas and information about sub sound clips.
 * 
 * @cat audio
 * @extends black-engine~SoundClip
 */
class SoundAtlasClip extends SoundClip {

  /**
   * Creates instance of SoundAtlas.
   * 
   * @param {AudioBuffer} nativeBuffer Decoded audio buffer.
   * @param {Object} jsonObject        Data representing sub sounds name, duration and offset.
   */
  constructor(nativeBuffer, jsonObject) {
    super(nativeBuffer);

    /** 
     * @private 
     * @type {Object<string, black-engine~SoundClip>} 
     */
    this.mClips = {};
    
    if (jsonObject !== null)
      for (let key in jsonObject['sounds'])
        this.addSubSound(key, jsonObject['sounds'][key][0], jsonObject['sounds'][key][1]);
  }

  /**
   * Dynamically sets new sub sound info bypassing json.
   * 
   * @public
   * @param {string} name     The name of the sub sound.
   * @param {number} offset   The offset is seconds, where sub sound will be start playing from.
   * @param {number} duration The duration of sub sound.
   * @returns {black-engine~SoundClip}     New instance of SoundClip.
   */
  addSubSound(name, offset = 0, duration = NaN) {
    this.mClips[name] = new SoundClip(this.native, offset, duration, true);
    return this.mClips[name];
  }

  /**
   * Removes previously added sub sound info.
   * 
   * @public
   * @param {string} name The name of the sub sound.
   * @returns {void}
   */
  removeSubSound(name) {
    delete this.mClips[name];
  }

  /**
   * Directly plays sub sound by given name on specific channel.
   * 
   * @public
   * @param {string} name                The name of the sub sound.
   * @param {string=} [channel='master'] The name of channel.
   * @param {number=} [volume=1]         The volume level.
   * @param {boolean=} [loop=false]      Specifies if sound will repeat infinite times.
   * @param {number=} [pan=0]            The panning value.
   * @returns {black-engine~SoundInstance|null}       New sound instance to be played.
   */
  playSubSound(name, channel = 'master', volume = 1, loop = false, pan = 0) {
    let clip = this.mClips[name];
    if (clip == null)
      return null;
    
    let instance = new SoundInstance(clip);
    instance.channel = channel;
    instance.volume = volume;
    instance.loop = loop;
    instance.pan = pan;
    return instance._play();
  }

  /**
   * The dictionary of sub sounds.
   *
   * @public
   * @readonly
   * @returns {Object<string, black-engine~SoundClip>}
   */
  get subSounds() {
    return this.mClips;
  }
}

/**
 * Sound file asset class responsible for loading audio atlas files.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
class SoundAtlasAsset extends Asset {
  /**
   * Creates new SoundAtlasAsset instance.
   *
   * @param {string} name Sound name.
   * @param {string} soundUrl  URL to load audio atlas from.
   * @param {string} dataUrl  URL to load atlas data from.
   */
  constructor(name, soundUrl, dataUrl) {
    super(AssetType.SOUND_ATLAS, name);

    /**
     * @private
     * @type {string}
     */
    this.mSoundUrl = soundUrl;

    /**
     * @private
     * @type {string}
     */
    this.mDataUrl = dataUrl;

    if (Black.device.webAudioSupported === false)
      return;

    if (Black.engine.hasSystem(MasterAudio) === false) {
      Debug.warn('[SoundAsset] Loading sound files without MasterAudio system.');
      return;
    }

    /** 
     * @private 
     * @type {black-engine~XHRAssetLoader|null} 
     */
    this.mAudioXHR = null;

    /** 
     * @private 
     * @type {black-engine~XHRAssetLoader|null} 
     */
    this.mDataXHR = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mAudioXHR = factory.get(LoaderType.XHR, this.mSoundUrl);
    this.mAudioXHR.responseType = 'arraybuffer';
    this.addLoader(this.mAudioXHR);

    this.mDataXHR = factory.get(LoaderType.XHR, this.mDataUrl);
    this.mDataXHR.mimeType = 'application/json';
    this.mDataXHR.responseType = 'json';
    this.addLoader(this.mDataXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    let undecodedAudio = /** @type {!ArrayBuffer} */ (this.mAudioXHR.data);
    Black.audio.context.decodeAudioData(undecodedAudio, (buffer) => {
      super.ready(new SoundAtlasClip(buffer, this.mDataXHR.data));
    });
  }
}

/**
 * Command to use in graphics
 * @cat display
 * @static
 * @constant
 * @enum {string}
 */
const GraphicsCommandType = {
  LINE_STYLE        : 'lineStyle',
  FILL_STYLE        : 'fillStyle',

  ARC               : 'arc',
  RECT              : 'rect',
  ROUNDED_RECT      : 'roundedRect',
  BEZIER_CURVE_TO   : 'bezierCurveTo',
  QUADRATIC_CURVE_TO: 'quadraticCurveTo',
  BEGIN_PATH        : 'beginPath',
  CLOSE_PATH        : 'closePath',
  FILL              : 'fill',
  LINE_TO           : 'lineTo',
  MOVE_TO           : 'moveTo',
  STROKE            : 'stroke',
  BOUNDS            : 'bounds',

  SHADOW_COLOR      : 'shadowColor',
  SHADOW_BLUR       : 'shadowBlur',

  LINE_DASH   : 'setLineDash',
  FILL_GRD    : 'gradientFillStyle',
  FILL_PATTERN: 'patternFillStyle',
};

/**
 * A helper class for Graphics.
 *
 * @ignore
 * @cat display
 */
class GraphicsCommand {
  /**
   * Creates new instance of GraphicsCommand
   *
   * @param {black-engine~GraphicsCommandType} type
   * @param {Array<*>} data
   */
  constructor(type, data) {
    /** 
     * @public 
     * @type {GraphicsCommandType} 
     */
    this.type = type;

    /** 
     * @public 
     * @type {Array<*>} 
     */
    this.data = data;
  }

  /**
   * Returns value at given index as a number. Used for GCC only.
   * @param {number} ix
   * @returns {number}
   */
  getNumber(ix) {
    return /** @type {!number} */ (this.data[ix]);
  }

  /**
   * Returns value at given index as a string. Used for GCC only.
   * @param {number} ix
   * @returns {string}
   */
  getString(ix) {
    return /** @type {!string} */ (this.data[ix]);
  }

  /**
   * Returns value at given index as a string. Used for GCC only.
   * @param {number} ix
   * @returns {boolean}
   */
  getBoolean(ix) {
    return /** @type {!boolean} */ (this.data[ix]);
  }

  /**
   * Returns value at given index as an object. Used for GCC only.
   * @param {number} ix
   * @returns {Object}
   */
  getObject(ix) {
    return /** @type {!Object} */ (this.data[ix]);
  }
}

/**
 * Path state holder for graphics.
 *
 * @ignore
 * @cat display
 */
class GraphicsPath {
  /**
   * Creates new instance of GraphicsPath
   */
  constructor() {
    /** @type {Recblack-engine~tangle|null} */
    this.bounds = null;

    /** @type {Array<number>} */
    this.points = [];

    /** @type {number} */
    this.maxLineWidth = 0;

    /** @type {number} */
    this.lastLineWidth = 0;

    /** @type {number} */
    this.lineMul = 0.5;
  }
}

/**
 * Joint style to use in drawing lines.
 * @cat display
 * @static
 * @constant
 * @enum {string}
 */
const JointStyle = {
  BEVEL: 'bevel',
  MITER: 'miter',
  ROUND: 'round'
};

/**
 * A base abstract class for graphics gradient fill.
 *
 * @ignore
 * @cat display
 */
class GraphicsGradient {
  /**
   * Creates new instance of GraphicsGradient
   */
  constructor() {

    /** @type {Object} */
    this.stops = {};

    /** @type {CanvasGradient|null} */
    this.native = null;
  }

  /**
   * Adds a new stop, defined by an offset and a color, to the gradient
   *
   * @param {number} offset A number between 0 and 1
   * @param {string} color A CSS <color>.
   *
   * @return {void}
   */
  addColorStop(offset, color) {
    this.stops[offset] = color;
    this.native = null;
  }
}

/**
 * Linear gradient fill style for graphics.
 *
 * @ignore
 * @cat display
 */
class GraphicsLinearGradient extends GraphicsGradient {
  /**
   * Creates new instance of GraphicsLinearGradient
   *
   * @param {number} x0 The x axis of the coordinate of the start point.
   * @param {number} y0 The y axis of the coordinate of the start point.
   * @param {number} x1 The x axis of the coordinate of the end point.
   * @param {number} y1 The y axis of the coordinate of the end point.
   */
  constructor(x0, y0, x1, y1) {
    super();

    /** @type {number} */
    this.x0 = x0;

    /** @type {number} */
    this.y0 = y0;

    /** @type {number} */
    this.x1 = x1;

    /** @type {number} */
    this.y1 = y1;

    /** @type {boolean} */
    this.isAbsolute = false;
  }

  /**
   * @inheritDoc
   */
  addColorStop(percent, color) {
    this.stops[percent] = color;
    this.native = null;
  }

  /**
   * Creates copy of this
   *
   * @return {GraphicsLinearGradient} New instance
   */
  clone() {
    const g = new GraphicsLinearGradient(this.x0, this.y0, this.x1, this.y1);
    g.isAbsolute = this.isAbsolute;

    for (let key in this.stops) {
      g.stops[key] = this.stops[key];
    }

    return g;
  }
}

/**
 * Caps style to use in drawing lines.
 * @cat display
 * @static
 * @constant
 * @enum {string}
 */
const CapsStyle = {
  NONE: 'none',
  ROUND: 'round',
  SQUARE: 'square'
};

/**
 * Structure object for graphics. Stores parsed layered data, ready for render.
 * Normally you should not work with this object, and use Graphics instead.
 *
 * @cat display
 */
class GraphicsData {
  /**
   * Creates new instance of GraphicsData
   */
  constructor() {
    /** 
     * @private 
     * @type {Array<black-engine~GraphicsData>} 
     */
    this.mNodes = [];

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     */
    this.mTransform = new Matrix();

    /** 
     * @private 
     * @type {Array<black-engine~GraphicsCommand>} 
     */
    this.mCommandQueue = [];

    /** 
     * @private 
     * @type {number} 
     */
    this.mPivotX = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mPivotY = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mPosX = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mPosY = 0;

    /** 
     * @private 
     * @type {string|null} 
     */
    this.mName = null;
  }

  /**
   * Calculates trimmed local bounds.
   *
   * @protected
   * @param {Object} graphics Object to store bounds by reference.
   * @param {black-engine~Matrix} transform Matrix to transform children nodes, for internal use.
   *
   * @return {black-engine~Rectangle} Calculated local bounds.
   */
  onGetLocalBounds(graphics, transform) {
    let path = new GraphicsPath();
    let len = this.mCommandQueue.length;

    transform = transform.clone().append(this.mTransform);
    const m = transform.data;
    const scaleX = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
    const scaleY = Math.sqrt(m[2] * m[2] + m[3] * m[3]);

    for (let i = 0; i < len; i++) {
      let cmd = this.mCommandQueue[i];

      switch (cmd.type) {
        case GraphicsCommandType.BEGIN_PATH: {
          if (path.bounds) {
            transform.transformRect(path.bounds, path.bounds);
            graphics.mLocalBounds = graphics.mLocalBounds ? graphics.mLocalBounds.union(path.bounds) : path.bounds;
          }

          path = new GraphicsPath();
          break;
        }
        case GraphicsCommandType.BOUNDS: {
          for (let k = 0; k < cmd.data.length; k += 2) {
            path.points.push(cmd.getNumber(k), cmd.getNumber(k + 1));
          }

          break;
        }
        case GraphicsCommandType.LINE_STYLE: {
          path.lastLineWidth = cmd.getNumber(0);
          let joints = cmd.getString(4);

          if (joints === JointStyle.MITER)
            path.lineMul = 1;

          break;
        }
        case GraphicsCommandType.FILL: {
          if (path.points.length !== 0) {
            let tmpBounds = Rectangle.fromPointsXY(path.points);
            path.bounds = path.bounds ? path.bounds.union(tmpBounds) : tmpBounds;
          }

          break;
        }
        case GraphicsCommandType.STROKE: {
          if (path.lastLineWidth > path.maxLineWidth)
            path.maxLineWidth = path.lastLineWidth;

          if (path.maxLineWidth === 0)
            path.maxLineWidth = 1;

          path.maxLineWidth *= path.lineMul;

          if (path.points.length !== 0) {
            let tmpBounds = Rectangle.fromPointsXY(path.points);

            if (path.points.length > 1)
              tmpBounds.inflate(path.maxLineWidth * scaleX, path.maxLineWidth * scaleY);

            path.bounds = path.bounds ? path.bounds.union(tmpBounds) : tmpBounds;
          }

          break;
        }

        default:
          break;
      }
    }

    if (path.bounds) {
      transform.transformRect(path.bounds, path.bounds);
      graphics.mLocalBounds = graphics.mLocalBounds ? graphics.mLocalBounds.union(path.bounds) : path.bounds;
    }

    for (let i = 0, l = this.mNodes.length; i < l; i++) {
      this.mNodes[i].onGetLocalBounds(graphics, transform);
    }

    return graphics.mLocalBounds;
  }

  /**
   * Sets line style. Zero or less values of `lineWidth` are ignored.
   *
   * @public
   * @param {number} lineWidth Line width.
   * @param {number=} [color=0] Line color.
   * @param {number=} [alpha=1] Line alpha.
   * @param {black-engine~CapsStyle=} [caps=CapsStyle.NONE] Line caps style.
   * @param {black-engine~JointStyle=} [joints=JointStyle.MITER] Line joints style.
   * @param {number=} [miterLimit=3] Miter limit.
   * @returns {void}
   */
  lineStyle(lineWidth = 0, color = 0, alpha = 1, caps = CapsStyle.NONE, joints = JointStyle.MITER, miterLimit = 3) {
    Debug.isNumber(lineWidth, color, alpha, miterLimit);
    if (lineWidth <= 0)
      return;

    this.__pushCommand(GraphicsCommandType.LINE_STYLE, lineWidth, color, alpha, caps, joints, miterLimit);
  }

  /**
   * Sets shadow blur level.
   * 
   * @param {number} level 
   * @returns {void}
   */
  shadowBlur(level) {
    Debug.isNumber(level);

    this.__pushCommand(GraphicsCommandType.SHADOW_BLUR, level);
  }

  /**
   * Sets shadow color.
   * 
   * @param {number} color 
   * @param {number} alpha 
   * @returns {void}
   */
  shadowColor(color, alpha) {
    Debug.isNumber(color, alpha);

    this.__pushCommand(GraphicsCommandType.SHADOW_COLOR, color, alpha);
  }
  
  /**
   * Sets fill style
   *
   * @public
   * @param {number} [color=0] Fill color.
   * @param {number=} [alpha=1] Fill alpha.
   * @returns {void}
   */
  fillStyle(color = 0, alpha = 1) {
    Debug.isNumber(color, alpha);
    this.__pushCommand(GraphicsCommandType.FILL_STYLE, color, alpha);
  }

  /**
   * Sets fill style to gradient.
   *
   * @public
   * @param {black-engine~GraphicsGradient} gradient Fill gradient.
   *
   * @returns {void}
   */
  fillGradient(gradient) {
    if (gradient instanceof GraphicsLinearGradient) {
      this.__pushCommand(GraphicsCommandType.FILL_GRD, /** @type {GraphicsLinearGradient} */(gradient));
    } // radial todo
  }

  /**
   * Sets fill style to pattern.
   *
   * @public
   * @param {black-engine~GraphicsPattern} pattern Fill pattern.
   *
   * @returns {void}
   */
  fillPattern(pattern) {
    this.__pushCommand(GraphicsCommandType.FILL_PATTERN, pattern);
  }

  /**
   * Clears the graphics that were drawn and resets fill and line styles.
   *
   * @public
   * @returns {void}
   */
  clear() {
    this.mPosX = 0;
    this.mPosY = 0;

    this.mCommandQueue = [];
    this.mNodes = [];

    this.beginPath();
  }

  /**
   * Moves the starting point of a path to given x and y coordinates.
   *
   * @public
   * @param {number} x The x-axis of the point.
   * @param {number} y The y-axis of the point.
   * @returns {void}
   */
  moveTo(x, y) {
    this.mPosX = x;
    this.mPosY = y;
    this.__pushCommand(GraphicsCommandType.MOVE_TO, x, y);
  }

  /**
   * Draws a line between last point and given.
   *
   * @public
   * @param {number} x The x-axis of the point.
   * @param {number} y The y-axis of the point.
   * @returns {void}
   */
  lineTo(x, y) {
    this.mPosX = x;
    this.mPosY = y;

    this.__pushCommand(GraphicsCommandType.LINE_TO, x, y);
    this.__pushCommand(GraphicsCommandType.BOUNDS, this.mPosX, this.mPosY, x, y);
  }

  /**
   * Adds an arc to the current path.
   *
   * @public
   * @param {number} x             The x-axis of the arc's center.
   * @param {number} y             The y-axis of the arc's center.
   * @param {number} radius        The radius of the arc.
   * @param {number} startAngle    The starting angle in radians.
   * @param {number} endAngle      The ending angle in radians.
   * @param {boolean=} [anticlockwise=false] If true the arc will be drawn counter-clockwise.
   * @returns {void}
   */
  arc(x, y, radius, startAngle, endAngle, anticlockwise = false) {
    let needsMoveTo = false;
    let moveToX = 0;
    let moveToY = 0;
    let points = [];
    let diff = Math.abs(startAngle - endAngle);

    if (startAngle === endAngle)
      return;

    if (diff >= MathEx.PI2) {
      points.push(x - radius, y - radius, x + radius, y + radius);

      let end = Circle.getCircumferencePoint(x, y, radius, endAngle + Math.PI * 0.5);

      needsMoveTo = true;
      endAngle = startAngle + MathEx.PI2;
      moveToX = end.x;
      moveToY = end.y;
    } else {
      let start = startAngle % MathEx.PI2 + (startAngle < 0 ? MathEx.PI2 : 0);
      let end = endAngle;

      if (anticlockwise) {
        end = start;
        start = endAngle;
      }

      while (end < start)
        end += MathEx.PI2;

      const right = start === 0 || end >= MathEx.PI2;
      const left = start <= Math.PI && end >= Math.PI || end >= Math.PI * 3;
      const bottom = start <= Math.PI * 0.5 && end >= Math.PI * 0.5 || end >= Math.PI * 2.5;
      const top = start <= Math.PI * 1.5 && end >= Math.PI * 1.5 || end >= Math.PI * 3.5;

      let startCos, endCos, startSin, endSin;

      if (!left || !right) {
        startCos = Math.cos(start) * radius;
        endCos = Math.cos(end) * radius;
      }

      if (!top || !bottom) {
        startSin = Math.sin(start) * radius;
        endSin = Math.sin(end) * radius;
      }

      const minX = left ? -radius : Math.min(startCos, endCos);
      const maxX = right ? radius : Math.max(startCos, endCos);
      const minY = top ? -radius : Math.min(startSin, endSin);
      const maxY = bottom ? radius : Math.max(startSin, endSin);

      points.push(minX + x, minY + y, maxX + x, maxY + y);
    }

    this.__pushCommand(GraphicsCommandType.ARC, x, y, radius, startAngle, endAngle, anticlockwise);
    this.__pushCommand(GraphicsCommandType.BOUNDS, ...points);

    if (needsMoveTo === true)
      this.__pushCommand(GraphicsCommandType.MOVE_TO, moveToX, moveToY);
  }

  /**
   * Adds circle to current path.
   *
   * @public
   * @param {number} x      The x-axis of the circle's center.
   * @param {number} y      The y-axis of the circle's center.
   * @param {number} radius The radius of the circle.
   * @returns {void}
   */
  circle(x, y, radius) {
    this.__pushCommand(GraphicsCommandType.ARC, x, y, radius, 0, MathEx.PI2);
    this.__pushCommand(GraphicsCommandType.BOUNDS, x - radius, y - radius, x + radius, y + radius);
  }

  /**
   * Creates closed rectangle like path.
   *
   * @public
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   *
   * @returns {void}
   */
  rect(x, y, width, height) {
    Debug.isNumber(x, y, width, height);

    this.__pushCommand(GraphicsCommandType.RECT, x, y, width, height);
    this.__pushCommand(GraphicsCommandType.BOUNDS, x, y, x + width, y + height);
  }

  /**
   * Creates closed rounded rectangle.
   *
   * @public
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} radius
   *
   * @returns {void}
   */
  roundedRect(x, y, width, height, radius) {
    Debug.isNumber(x, y, width, height, radius);

    this.__pushCommand(GraphicsCommandType.ROUNDED_RECT, x, y, width, height, radius);
    this.__pushCommand(GraphicsCommandType.BOUNDS, x, y, x + width, y + height);
  }

  /**
   * @public
   * @param {number} cp1x
   * @param {number} cp1y
   * @param {number} cp2x
   * @param {number} cp2y
   * @param {number} x
   * @param {number} y
   */
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    const rangeX = this.__bezierRange(this.mPosX, cp1x, cp2x, x, Vector.pool.get());
    const rangeY = this.__bezierRange(this.mPosY, cp1y, cp2y, y, Vector.pool.get());

    this.mPosX = x;
    this.mPosY = y;

    this.__pushCommand(GraphicsCommandType.BEZIER_CURVE_TO, cp1x, cp1y, cp2x, cp2y, x, y);
    this.__pushCommand(GraphicsCommandType.BOUNDS, rangeX.x, rangeY.x, rangeX.y, rangeY.y);

    Vector.pool.release(rangeX);
    Vector.pool.release(rangeY);
  }

  /**
   * @public
   * @param {number} cpx
   * @param {number} cpy
   * @param {number} x
   * @param {number} y
   */
  quadraticCurveTo(cpx, cpy, x, y) {
    const rangeX = this.__quadraticRange(this.mPosX, cpx, x, Vector.pool.get());
    const rangeY = this.__quadraticRange(this.mPosY, cpy, y, Vector.pool.get());

    this.mPosX = x;
    this.mPosY = y;

    this.__pushCommand(GraphicsCommandType.QUADRATIC_CURVE_TO, cpx, cpy, x, y);
    this.__pushCommand(GraphicsCommandType.BOUNDS, rangeX.x, rangeY.x, rangeX.y, rangeY.y);

    Vector.pool.release(rangeX);
    Vector.pool.release(rangeY);
  }

  /**
   * @private
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {black-engine~Vector=} out
   *
   * @return {black-engine~Vector} Out vector with set x, y as min and max bezier coordinate on passed axis
   */
  __bezierRange(p0, p1, p2, p3, out) {
    out = out || new Vector();

    const a = (p2 - 2 * p1 + p0) - (p3 - 2 * p2 + p1);
    const b = 2 * (p1 - p0) - 2 * (p2 - p1);
    const c = p0 - p1;
    const discriminant = b * b - 4 * a * c;

    let min = Math.min(p0, p3);
    let max = Math.max(p0, p3);

    if (discriminant >= 0) {
      const discRoot = Math.sqrt(discriminant);
      const inv2a = 1 / (a * 2);
      let x1 = (-b + discRoot) * inv2a;
      let x2 = (-b - discRoot) * inv2a;
      x1 = isFinite(x1) ? x1 : 0.5;
      x2 = isFinite(x2) ? x2 : 0.5;

      if (x1 > 0 && x1 < 1) {
        const dot = this.__bezierDot(p0, p1, p2, p3, x1);
        min = Math.min(dot, min);
        max = Math.max(dot, max);
      }

      if (x2 > 0 && x2 < 1) {
        const dot = this.__bezierDot(p0, p1, p2, p3, x2);
        min = Math.min(dot, min);
        max = Math.max(dot, max);
      }
    }

    out.x = min;
    out.y = max;

    return out;
  }

  /**
   * @private
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} x
   *
   * @return {number}
   */
  __bezierDot(p0, p1, p2, p3, x) {
    const y = 1 - x;
    return p0 * y * y * y + 3 * p1 * x * y * y + 3 * p2 * x * x * y + p3 * x * x * x;
  }

  /**
   * @private
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {black-engine~Vector=} out
   *
   * @return {black-engine~Vector} Out vector with set x, y as min and max bezier coordinate on passed axis
   */
  __quadraticRange(p0, p1, p2, out) {
    const a = p2 - p0;
    const b = p1 - p0;
    const c = b / a;
    const d = p0 + (c < 0 || c > 1 ? b * b / (2 * b - a) : 0);

    out.x = Math.min(p0, p2, d);
    out.y = Math.max(p0, p2, d);

    return out;
  }

  /**
   * Starts new path.
   *
   * @public
   * @returns {void}
   */
  beginPath() {
    this.__pushCommand(GraphicsCommandType.BEGIN_PATH);
  }

  /**
   * Closes current path.
   *
   * @public
   * @returns {void}
   */
  closePath() {
    this.__pushCommand(GraphicsCommandType.CLOSE_PATH);
  }

  /**
   * Sets the line dash pattern used when stroking lines,
   * using an array of values which specify alternating lengths of lines and gaps which describe the pattern.
   *
   * @public
   * @param {Array<number>} segments An Array of numbers which specify distances to alternately draw a line and a gap (in coordinate space units).
   *
   * @returns {void}
   */
  setLineDash(segments) {
    this.__pushCommand(GraphicsCommandType.LINE_DASH, segments);
  }

  /**
   * Strokes current path with the current line style..
   *
   * @public
   * @returns {void}
   */
  stroke() {
    this.__pushCommand(GraphicsCommandType.STROKE);
  }

  /**
   * Fills current path with the current fill style.
   *
   * @public
   * @param {boolean} isNonZero The algorithm by which to determine if a point is inside a path or outside a path, True is for "nonzero" and False is for "evenodd".
   *
   * @returns {void}
   */
  fill(isNonZero) {
    this.__pushCommand(GraphicsCommandType.FILL, isNonZero);
  }

  /**
   * @private
   * @ignore
   * @param {black-engine~GraphicsCommandType} type
   * @param {...*} data
   */
  __pushCommand(type, ...data) {
    let cmd = new GraphicsCommand(type, data);
    this.mCommandQueue.push(cmd);
  }

  searchNode(name, parent = this) {
    if (parent.name === name) {
      return parent;
    }

    for (let i = 0, l = parent.mNodes.length; i < l; i++) {
      const node = this.searchNode(name, parent.mNodes[i]);

      if (node) {
        return node;
      }
    }
  }

  /**
   * Gets/Sets the name of this GraphicsData instance. Used for searching elements.
   *
   * @return {string|null}
   */
  get name() {
    return this.mName;
  }

  /**
   * @param {string|null} value
   * @return {void}
   */
  set name(value) {
    this.mName = value;
  }
}

class ParserBase {
  constructor() {
    /** 
     * Input data to parse
     * @public 
     * @type {Object}
     */
    this.data = null;
  }

  /**
   * 
   * @param {Object} data
   *
   * @return {Object} Parsed data
   */
  parse(data) {
    this.data = data;

    return null;
  }
}

/**
 * A pattern fill style class for Graphics.
 *
 * @ignore
 * @cat display
 */
class GraphicsPattern {
  /**
   * Creates new instance of GraphicsPattern
   */
  constructor(image, repetition) {

    /** @type {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement} */
    this.image = image;

    /** @type {string} */
    this.repetition = repetition;

    /** @type {CanvasPattern|null} */
    this.native = null;
  }

  /**
   * Creates copy of this
   *
   * @return {black-engine~GraphicsPattern} New instance
   */
  clone() {
    return new GraphicsPattern(this.image, this.repetition);
  }
}

/**
 * Fill Rule style to use on shapes fill.
 * @cat display
 * @static
 * @constant
 * @enum {string}
 */
const FillRule = {
  NONE_ZERO: 'nonzero',
  EVEN_ODD : 'evenodd',
};

/**
 * Black Vector Graphics style
 * Helper class for BVG style parse
 *
 * @cat parsers
 */
class BVGStyle {
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

/**
 * A basic utility class for drawing shapes.
 *
 * @cat display
 * @extends black-engine~DisplayObject
 */
class Graphics extends DisplayObject {
  /**
   * Creates new Graphics instance.
   *
   * @param {black-engine~GraphicsData|string|null} graphicsData The id of BVG object.
   * @param {boolean} trim Flag to determine the passed graphicsData needs trim.
   */
  constructor(graphicsData = null, trim = false) {
    super();

    /** 
     * @private
     * @type {black-engine~Rectangle} 
     */
    this.mBounds = new Rectangle();

    /**
     * For internal usage
     *
     * 
     * @private
     * @type {black-engine~Rectangle|null} 
     */
    this.mLocalBounds = null;

    /** 
     * @private
     * @type {black-engine~GraphicsData|null} 
     */
    this.mGraphicsData = null;

    /** 
     * @private
     * @type {number} 
     */
    this.mDataOffsetX = 0;

    /** 
     * @private
     * @type {number} 
     */
    this.mDataOffsetY = 0;

    /** 
     * @private
     * @type {boolean} 
     */
    this.mTrim = trim;

    if (graphicsData === null) {
      this.mGraphicsData = new GraphicsData();
    } else if (typeof graphicsData === 'string') {
      this.mGraphicsData = Black.assets.getGraphicsData(graphicsData);
    } else {
      this.mGraphicsData = graphicsData;
    }

    if (trim) {
      this.mGraphicsData.onGetLocalBounds(this, new Matrix());

      if (this.mLocalBounds) {
        this.mDataOffsetX = this.mLocalBounds.x;
        this.mDataOffsetY = this.mLocalBounds.y;
        this.mLocalBounds = null;
      }
    }
  }

  /**
   * @inheritDoc
   */
  getRenderer() {
    return Black.driver.getRenderer('Graphics', this);
  }

  /**
   * @inheritDoc
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    if (this.mClipRect !== null) {
      this.mClipRect.copyTo(outRect);
      return outRect;
    }

    this.mGraphicsData.onGetLocalBounds(this, new Matrix());

    this.mLocalBounds && outRect.copyFrom(this.mLocalBounds);
    this.mLocalBounds = null;

    if (!this.mTrim) {
      outRect.width += Math.max(0, outRect.x);
      outRect.height += Math.max(0, outRect.y);
      outRect.x = Math.min(0, outRect.x);
      outRect.y = Math.min(0, outRect.y);
    }

    return outRect;
  }

  /**
   * Sets line style. Zero or less values of `lineWidth` are ignored.
   *
   * @public
   * @param {number} lineWidth Line width.
   * @param {number=} [color=0] Line color.
   * @param {number=} [alpha=1] Line alpha.
   * @param {black-engine~CapsStyle=} [caps=CapsStyle.NONE] Line caps style.
   * @param {black-engine~JointStyle=} [joints=JointStyle.MITER] Line joints style.
   * @param {number=} [miterLimit=3] Miter limit.
   * @returns {void}
   */
  lineStyle(lineWidth = 0, color = 0, alpha = 1, caps = CapsStyle.NONE, joints = JointStyle.MITER, miterLimit = 3) {
    this.mGraphicsData.lineStyle(lineWidth, color, alpha, caps, joints, miterLimit);
  }

  /**
   * Sets shadow blur level.
   * 
   * @param {number} level 
   * @returns {void}
   */
  shadowBlur(level) {
    this.mGraphicsData.shadowBlur(level);
  }

  /**
   * Sets shadow color.
   * 
   * @param {number} color 
   * @param {number} alpha 
   * @returns {void}
   */
  shadowColor(color, alpha = 1) {
    this.mGraphicsData.shadowColor(color, alpha);
  }

  /**
   * Sets fill style
   *
   * @public
   * @param {number} [color=0] Fill color.
   * @param {number=} [alpha=1] Fill alpha.
   * @returns {void}
   */
  fillStyle(color = 0, alpha = 1) {
    this.mGraphicsData.fillStyle(color, alpha);
  }

  /**
   * Sets fill style to gradient.
   *
   * @public
   * @param {black-engine~GraphicsGradient} gradient Fill gradient.
   *
   * @returns {void}
   */
  fillGradient(gradient) {
    this.mGraphicsData.fillGradient(gradient);
  }

  /**
   * Sets fill style to pattern.
   *
   * @public
   * @param {black-engine~GraphicsPattern} pattern Fill pattern.
   *
   * @returns {void}
   */
  fillPattern(pattern) {
    this.mGraphicsData.fillPattern(pattern);
  }

  /**
   * Clears the graphics that were drawn and resets fill and line styles.
   *
   * @public
   * @returns {void}
   */
  clear() {
    this.mBounds.zero();
    this.mGraphicsData.clear();
    this.setTransformDirty();
  }

  /**
   * Moves the starting point of a path to given x and y coordinates.
   *
   * @public
   * @param {number} x The x-axis of the point.
   * @param {number} y The y-axis of the point.
   * @returns {void}
   */
  moveTo(x, y) {
    this.mGraphicsData.moveTo(x, y);
  }

  /**
   * Draws a line between last point and given.
   *
   * @public
   * @param {number} x The x-axis of the point.
   * @param {number} y The y-axis of the point.
   * @returns {void}
   */
  lineTo(x, y) {
    this.mGraphicsData.lineTo(x, y);
  }

  /**
   * Adds an arc to the current path.
   *
   * @public
   * @param {number} x             The x-axis of the arc's center.
   * @param {number} y             The y-axis of the arc's center.
   * @param {number} radius        The radius of the arc.
   * @param {number} startAngle    The starting angle in radians.
   * @param {number} endAngle      The ending angle in radians.
   * @param {boolean=} [anticlockwise=false] If true the arc will be drawn counter-clockwise.
   * @returns {void}
   */
  arc(x, y, radius, startAngle, endAngle, anticlockwise = false) {
    this.mGraphicsData.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  }

  /**
   * Adds circle to current path.
   *
   * @public
   * @param {number} x      The x-axis of the circle's center.
   * @param {number} y      The y-axis of the circle's center.
   * @param {number} radius The radius of the circle.
   * @returns {void}
   */
  circle(x, y, radius) {
    this.mGraphicsData.circle(x, y, radius);
  }

  /**
   * Creates closed rectangle like path.
   *
   * @public
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   *
   * @returns {void}
   */
  rect(x, y, width, height) {
    this.mGraphicsData.rect(x, y, width, height);
  }

  /**
   * Creates closed rounded rectangle.
   *
   * @public
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} radius
   *
   * @returns {void}
   */
  roundedRect(x, y, width, height, radius) {
    this.mGraphicsData.roundedRect(x, y, width, height, radius);
  }

  /**
   * @public
   * @param {number} cp1x
   * @param {number} cp1y
   * @param {number} cp2x
   * @param {number} cp2y
   * @param {number} x
   * @param {number} y
   */
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.mGraphicsData.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  }

  /**
   * @public
   * @param {number} cpx
   * @param {number} cpy
   * @param {number} x
   * @param {number} y
   */
  quadraticCurveTo(cpx, cpy, x, y) {
    this.mGraphicsData.quadraticCurveTo(cpx, cpy, x, y);
  }

  /**
   * Starts new path.
   *
   * @public
   * @returns {void}
   */
  beginPath() {
    this.mGraphicsData.beginPath();
  }

  /**
   * Closes current path.
   *
   * @public
   * @returns {void}
   */
  closePath() {
    this.mGraphicsData.closePath();
  }

  /**
   * Sets the line dash pattern used when stroking lines,
   * using an array of values which specify alternating lengths of lines and gaps which describe the pattern.
   *
   * @public
   * @param {Array<number>} An Array of numbers which specify distances to alternately draw a line and a gap (in coordinate space units).
   *
   * @returns {void}
   */
  setLineDash(segments) {
    this.mGraphicsData.setLineDash(segments);
  }

  /**
   * Strokes current path with the current line style..
   *
   * @public
   * @returns {void}
   */
  stroke() {
    this.mGraphicsData.stroke();
    this.setTransformDirty();
  }

  /**
   * Fills current path with the current fill style.
   *
   * @public
   * @param {boolean} isNonZero The algorithm by which to determine if a point is inside a path or outside a path, True is for "nonzero" and False is for "evenodd".
   *
   * @returns {void}
   */
  fill(isNonZero = true) {
    this.mGraphicsData.fill(isNonZero);
    this.setTransformDirty();
  }

  createLinearGradient(x, y, width, height) {
    return new GraphicsLinearGradient(x, y, width, height);
  }
}

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

class BVGParser extends ParserBase {
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
              if (def.isAbsolute) ; else {
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

/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat assets
 * @extends black-engine~Asset
 */
class BVGAsset extends Asset {
  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   *
   * @returns {void}
   */
  constructor(name, url) {
    super(AssetType.VECTOR_GRAPHICS, name);

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /** 
     * @private 
     * @type {black-engine~GraphicsData|null} 
     */
    this.mGraphicsData = null;

    /** 
     * @private 
     * @type {XHRAssetLoader|null} 
     */
    this.mXHR = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mXHR = factory.get(LoaderType.XHR, this.mUrl);
    this.mXHR.mimeType = 'application/json';
    this.mXHR.responseType = 'json';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    const data = /** @type {!Object}*/(this.mXHR.data);
    const parser = new BVGParser();

    this.mGraphicsData = parser.parse(data);
    this.mGraphicsData.name = this.name;

    super.ready(this.mGraphicsData);
  }
}

/**
 * Single JSON file asset class responsible for loading json file.
 *
 * @cat assets
 * @extends black-engine~Asset
 */

class VectorTextureAsset extends Asset {
  /**
   * Creates new JSONAsset instance.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   * @param {boolean} bakeSelf Flag to bake full BVG as texture. If false root will not be baked.
   * @param {boolean} bakeChildren Flag to bake each node with id to textures. If false none children nodes will be baked.
   * @param {Array<string>} namesToBake Concrete nodes ids to bake. Works only if bakeChildren is set to true.
   *
   * @returns {void}
   */
  constructor(name, url, bakeSelf, bakeChildren, namesToBake) {
    super(AssetType.VECTOR_TEXTURE, name);

    /**
     * @private
     * @type {string}
     */
    this.mUrl = url;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mBakeSelf = bakeSelf;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mBakeChildren = bakeChildren;

    /** 
     * @private 
     * @type {Array<string>} 
     */
    this.mNamesToBake = /** @type {Array<string>} */ (bakeChildren && namesToBake ? namesToBake : []);

    /** 
     * @private 
     * @type {black-engine~GraphicsData|null} 
     */
    this.mGraphicsData = null;

    /** 
     * @private 
     * @type {black-engine~XHRAssetLoader|null} 
     */
    this.mXHR = null;
  }

  /**
   * @inheritDoc
   */
  onLoaderRequested(factory) {
    this.mXHR = factory.get(LoaderType.XHR, this.mUrl);
    this.mXHR.mimeType = 'application/json';
    this.mXHR.responseType = 'json';
    this.addLoader(this.mXHR);
  }

  /**
   * @inheritDoc
   */
  onAllLoaded() {
    const data = /** @type {!Object}*/(this.mXHR.data);
    const parser = new BVGParser();

    this.mGraphicsData = parser.parse(data);
    this.mGraphicsData.name = this.name;

    const bakedTextures = this.bakeTextures();
    const ret = [];

    for (let name in bakedTextures) {
      if (!bakedTextures.hasOwnProperty(name))
        continue;

      ret.push({ name: name, data: bakedTextures[name] });
    }

    super.ready(ret);
  }

  /**
   * Creates baked textures from this graphics data.
   *
   * @return {Object.<string, black-engine~CanvasRenderTexture>}
   */
  bakeTextures() {
    const textures = {};
    const namesToBake = this.mNamesToBake;

    if (this.mBakeChildren && namesToBake.length === 0) {
      const traverse = nodes => {
        nodes = /** @type {Array<GraphicsData>} */(nodes);

        if (nodes.length === 0)
          return;

        for (let i = 0, l = nodes.length; i < l; i++) {
          if (nodes[i].name)
            namesToBake.push(/** @type {string} */(nodes[i].name));

          traverse(/** @type {Array<GraphicsData>} */(nodes[i].mNodes));
        }
      };

      traverse(this.mGraphicsData.mNodes);
    }

    if (this.mBakeSelf)
      namesToBake.unshift(this.mGraphicsData.name);

    for (let i = 0, l = namesToBake.length; i < l; i++) {
      const name = namesToBake[i];
      const node = this.mGraphicsData.searchNode(name);

      if (!node) {
        Debug.warn(`[BVGAsset] GraphicsData node with id '${name}' not found.`);
        continue;
      }

      const graphics = new Graphics(node, name !== this.mGraphicsData.name);
      const dpr = 1 / Black.driver.renderScaleFactor;
      const renderTexture = new CanvasRenderTexture(graphics.width, graphics.height, 1);

      Black.driver.render(graphics, renderTexture, new Matrix().scale(dpr, dpr));

      textures[name] = renderTexture;
    }

    return textures;
  }
}

/**
 * Represents current state of the AssetManager.
 * 
 * @cat assets
 * @static
 * @constant
 * @enum {string}
 */
const AssetManagerState = {
  NONE     : 'none',
  LOADING  : 'loading',
  FINISHED : 'finished'
};

/**
 * A factory object used to get or create a loader.
 * @cat assets
 */
class LoaderFactory {
  /**
   * 
   * @param {black-engine~AssetManager} assetManager 
   */
  constructor(assetManager) {
    this.mAssetManager = assetManager;
  }

  /**
   * Returns an existing instance of the loader if url is already in queue or creates new instance if not.
   * 
   * @param {string} type 
   * @param {string|black-engine~LoaderType} url 
   * @param {...any} args
   * 
   * @returns {black-engine~AssetLoader}
   */
  get(type, url, ...args) {
    let am = this.mAssetManager;
    // TODO: idea is to not create new loader each time it is requested.
    // But the problem that for example XHR can have different responseTypes.

    // let loader = am.mLoadersQueue[url];

    // if (loader != undefined)
    //   return loader;

    return new am.mLoaderTypeMap[type](url, ...args);
  }
}

/**
 * Responsible for loading assets and manages its in memory state.
 *
 * @fires AssetManager#progress
 * @fires AssetManager#complete
 * @fires AssetManager#error
 *
 * @cat assets
 * @extends black-engine~MessageDispatcher
 */
class AssetManager extends MessageDispatcher {
  /**
   * Creates new AssetManager instance. AssetManager exposes static property
   * called 'default' and many internal classes uses default instance.
   */
  constructor() {
    super();

    if (Black.assets === null)
      Black.assets = this;

    /** 
     * @private 
     * @type {string} 
     */
    this.mDefaultPath = '';

    /** 
     * @private 
     * @type {number} 
     */
    this.mTotalLoaded = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mTotalPending = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mTotalErrors = 0;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsAllLoaded = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mLoadingProgress = 0;

    /** 
     * @private 
     * @type {Array<black-engine~Asset>} 
     */
    this.mQueue = [];

    /** 
     * @private 
     * @type {Object.<string, black-engine~AssetLoader>} 
     */
    this.mLoadersQueue = {};

    /** 
     * @private 
     * @type {black-engine~AssetManagerState} 
     */
    this.mState = AssetManagerState.NONE;

    /**
     * @private
     * @type {black-engine~LoaderFactory}
     */
    this.mLoaderFactory = new LoaderFactory(this);

    this.mAssets = {};
    this.mAssetTypeMap = {};
    this.mLoaderTypeMap = {};

    this.registerDefaultTypes();
  }

  registerDefaultTypes() {
    // Textures
    this.mAssetTypeMap[AssetType.TEXTURE] = TextureAsset;
    this.mAssetTypeMap[AssetType.TEXTURE_ATLAS] = AtlasTextureAsset;

    // Vector
    this.mAssetTypeMap[AssetType.VECTOR_GRAPHICS] = BVGAsset;

    // Vector textures 
    this.mAssetTypeMap[AssetType.VECTOR_TEXTURE] = VectorTextureAsset;
    //this.mAssetTypeMap[AssetType.VECTOR_TEXTURE_ATLAS] = VectorTextureAsset;

    // Fonts
    this.mAssetTypeMap[AssetType.FONT] = FontAsset;
    this.mAssetTypeMap[AssetType.BITMAP_FONT] = BitmapFontAsset;

    // JSON & XML
    this.mAssetTypeMap[AssetType.XML] = XMLAsset;
    this.mAssetTypeMap[AssetType.JSON] = JSONAsset;

    // Sounds
    this.mAssetTypeMap[AssetType.SOUND] = SoundAsset;
    this.mAssetTypeMap[AssetType.SOUND_ATLAS] = SoundAtlasAsset;

    // Loaders
    this.mLoaderTypeMap[LoaderType.FONT_FACE] = FontFaceAssetLoader;
    this.mLoaderTypeMap[LoaderType.IMAGE] = ImageAssetLoader;
    this.mLoaderTypeMap[LoaderType.XHR] = XHRAssetLoader;
  }

  /**
   * Sets asset type. You can use this method to override Asset with your own.
   * 
   * @param {string} name 
   * @param {string} type 
   */
  setAssetType(name, type) {
    this.mAssetTypeMap[name] = type;
  }

  /**
   * Sets loader type. Use this method to override default loaders with custom ones.
   * 
   * @param {string} name 
   * @param {string} type 
   */
  setLoaderType(name, type) {
    this.mLoaderTypeMap[name] = type;
  }

  /**
   * Adds asset into the loading queue.
   * 
   * @param {string} name 
   * @param {black-engine~Asset} asset 
   * @returns {void}
   */
  enqueueAsset(name, asset) {
    this.__validateState();
    this.__validateName(asset.type, name);

    this.mQueue.push(asset);
  }

  /**
   * Returns new asset instance by given type.
   * 
   * @private
   * @param {string|black-engine~AssetType} type 
   * @param  {...any} args 
   */
  __getAsset(type, ...args) {
    return new this.mAssetTypeMap[type](...args);
  }

  /**
   * Adds or changes texture to the internal list for future reuse by given name.
   * @param {string} name
   * @param {black-engine~Texture} texture
   */
  addTexture(name, texture) {
    this.mTextures[name] = texture;
  }

  /**
   * Adds single image to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the image.
   * @returns {void}
   */
  enqueueImage(name, url) {
    this.enqueueAsset(name, this.__getAsset(AssetType.TEXTURE, name, this.mDefaultPath + url));
  }

  /**
   * Adds atlas to the loading queue.
   *
   * @param {string} name     Name of the asset.
   * @param {string} imageUrl Atlas URL.
   * @param {string} dataUrl  URL to the .json file which describes the atlas.
   * @returns {void}
   */
  enqueueAtlas(name, imageUrl, dataUrl) {
    this.enqueueAsset(name, this.__getAsset(AssetType.TEXTURE_ATLAS, name, this.mDefaultPath + imageUrl, this.mDefaultPath + dataUrl));
  }

  /**
   * Adds bitmap font to the loading queue.
   *
   * @param {string} name     Name of the font.
   * @param {string} imageUrl Image URL.
   * @param {string} xmlUrl   URL to the .xml file which describes the font.
   * @returns {void}
   */
  enqueueBitmapFont(name, imageUrl, xmlUrl) {
    this.enqueueAsset(name, this.__getAsset(AssetType.BITMAP_FONT, name, this.mDefaultPath + imageUrl, this.mDefaultPath + xmlUrl));
  }

  /**
   * Adds single xml file to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   * @returns {void}
   */
  enqueueXML(name, url) {
    this.enqueueAsset(name, this.__getAsset(AssetType.XML, name, this.mDefaultPath + url));
  }

  /**
   * Adds single json file to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   * @returns {void}
   */
  enqueueJSON(name, url) {
    this.enqueueAsset(name, this.__getAsset(AssetType.JSON, name, this.mDefaultPath + url));
  }

  /**
   * Adds single Black Vector Graphics file to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   *
   * @returns {void}
   */
  enqueueVector(name, url) {
    this.enqueueAsset(name, this.__getAsset(AssetType.VECTOR_GRAPHICS, name, this.mDefaultPath + url));
  }

  /**
   * Adds single Black Vector Graphics file to the loading queue and bakes it into the Texture.
   * 
   * If baked both graphics data and baked texture will be stored inside this AssetManager.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL of the json.
   * @param {boolean=} [bakeSelf=false] Flag to bake full BVG as texture. If false root will not be baked.
   * @param {boolean=} [bakeChildren=false] Flag to bake each node with id to textures. If false none children nodes will be baked.
   * @param {Array<string>=} [namesToBake=null] Concrete nodes ids to bake. Works only if bakeChildren is set to true.
   *
   * @returns {void}
   */
  enqueueVectorTexture(name, url, bakeSelf = false, bakeChildren = false, namesToBake = null) {
    if (bakeSelf === true || bakeChildren === true)
      this.enqueueAsset(name, this.__getAsset(AssetType.VECTOR_TEXTURE, name, this.mDefaultPath + url, bakeSelf, bakeChildren, namesToBake));
  }

  // /**
  //  * Adds single Black Vector Graphics file to the loading queue and bakes it into the AtlasTexture.
  //  * 
  //  * If baked both graphics data and baked texture will be stored inside this AssetManager.
  //  *
  //  * @param {string} name Name of the asset.
  //  * @param {string} url  The URL of the json.
  //  * @param {boolean=} [bakeSelf=false] Flag to bake full BVG as texture. If false root will not be baked.
  //  * @param {boolean=} [bakeChildren=false] Flag to bake each node with id to textures. If false none children nodes will be baked.
  //  * @param {Array<string>=} [namesToBake=null] Concrete nodes ids to bake. Works only if bakeChildren is set to true.
  //  *
  //  * @returns {void}
  //  */
  // enqueueVectorAtlas(name, url, bakeSelf = false, bakeChildren = false, namesToBake = null) {
  //   if (bakeSelf === true || bakeChildren === true)
  //     this.enqueueAsset(name, this.__getAsset(AssetType.VECTOR_TEXTURE_ATLAS, name, this.mDefaultPath + url, bakeSelf, bakeChildren, namesToBake));
  // }

  /**
   * Adds single sound to the loading queue.
   *
   * @param {string} name Name of the sound.
   * @param {string} url  The URL of the sound.
   * @returns {void}
   */
  enqueueSound(name, url) {
    this.enqueueAsset(name, this.__getAsset(AssetType.SOUND, name, this.mDefaultPath + url));
  }

  /**
   * Adds sound atlas to the loading queue.
   *
   * @param {string} name Name of the sound.
   * @param {string} soundUrl  The URL of the sound.
   * @param {string} dataUrl  The URL of the data JSON.
   * @returns {void}
   */
  enqueueSoundAtlas(name, soundUrl, dataUrl) {
    this.enqueueAsset(name, this.__getAsset(AssetType.SOUND_ATLAS, name, this.mDefaultPath + soundUrl, this.mDefaultPath + dataUrl));
  }

  /**
   * Adds local font to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @param {string} url  The URL to the font.
   * @returns {void}
   */
  enqueueFont(name, url) {
    this.enqueueAsset(name, this.__getAsset(AssetType.FONT, name, this.mDefaultPath + url, true));
  }

  /**
   * Adds Google Font to the loading queue.
   *
   * @param {string} name Name of the asset.
   * @returns {void}
   */
  enqueueGoogleFont(name) {
    this.enqueueAsset(name, this.__getAsset(AssetType.FONT, name, '', false));
  }

  /**
   * Starts loading all enqueued assets.
   *
   * @fires complete
   * @return {void}
   */
  loadQueue() {
    this.__validateState();

    if (this.mQueue.length === 0) {
      this.post(Message.COMPLETE);
      return;
    }

    this.mState = AssetManagerState.LOADING;

    for (let i = 0; i < this.mQueue.length; i++) {
      let item = this.mQueue[i];

      item.onLoaderRequested(this.mLoaderFactory);

      if (item.loaders.length > 0) {
        item.once(Message.COMPLETE, this.onAssetLoaded, this);
        item.once(Message.ERROR, this.onAssetError, this);

        this.mTotalPending++;

        item.loaders.forEach(x => {
          //this.mLoadersQueue[x.url] = x;
          x.load();
        });
      }
    }

    // Loader will notify Asset when its ready. Asset will notify AssetManager.
    // for (const key in this.mLoadersQueue) {
    //   if (this.mLoadersQueue.hasOwnProperty(key)) {
    //     const loader = this.mLoadersQueue[key];
    //     loader.load();
    //   }
    // }
  }

  /**
   * @protected
   * @ignore
   * @param {black-engine~Message} msg
   * @return {void}
   */
  onAssetLoaded(msg) {
    this.mTotalLoaded++;
    this.mLoadingProgress = this.mTotalLoaded / this.mTotalPending;

    let item = /** @type {Asset}*/ (msg.sender);
    item.off(Message.COMPLETE, Message.ERROR);

    if (this.mAssets[item.type] == null)
      this.mAssets[item.type] = {};

    if (Array.isArray(item.data)) {
      let objects = (item.data);

      objects.forEach(x => {
        this.__validateName(x.name);
        this.mAssets[item.type][x.name] = x.data;
      });
    }
    else
      this.mAssets[item.type][item.name] = item.data;

    /**
     * Posted when loading progress is changed.
     * @event AssetManager#progress
     */
    this.post(Message.PROGRESS, this.mLoadingProgress);

    if (this.mTotalLoaded === this.mTotalPending) {
      this.mQueue.splice(0, this.mQueue.length);
      this.mLoadersQueue = {};
      this.mState = AssetManagerState.FINISHED;
      this.mTotalLoaded = 0;
      this.mTotalErrors = 0;
      this.mTotalPending = 0;
      this.mIsAllLoaded = true;

      /**
       * Posted when all assets finished loading.
       * @event AssetManager#complete
       */
      this.post(Message.COMPLETE);
    }
  }

  onAssetError(msg) {
    this.mTotalErrors++;

    let total = this.mTotalLoaded + this.mTotalErrors;
    this.mLoadingProgress = this.mTotalLoaded / this.mTotalPending;

    let item = /** @type {Asset}*/ (msg.sender);

    item.off(Message.COMPLETE, Message.ERROR);
    Debug.warn(`[AssetManager] Error loading asset '${item.name}'.`);

    /**
     * Posted when error occurred while loading assets.
     * @event AssetManager#complete
     */
    this.post(Message.ERROR, item);

    if (total === this.mTotalPending) {
      this.mQueue.splice(0, this.mQueue.length);
      this.mLoadersQueue = {};
      this.mState = AssetManagerState.FINISHED;
      this.mTotalLoaded = 0;
      this.mTotalErrors = 0;
      this.mTotalPending = 0;
      this.mIsAllLoaded = true;
      this.post(Message.COMPLETE);
    }
  }

  /**
   * Returns BitmapFontData object by given name.
   *
   * @param {string} name The name of the Asset to search.
   * @return {black-engine~BitmapFontData|null} Returns a BitmapFontData if found or null.
   */
  getBitmapFont(name) {
    /** @type {black-engine~BitmapFontData} */
    let font = this.mAssets[AssetType.BITMAP_FONT][name];

    if (font != null)
      return font;

    Debug.warn(`[AssetManager] BitmapFontData '${name}' was not found.`);
    return null;
  }

  /**
   * Returns Texture object by given name.
   *
   * @param {string} name The name of the Asset.
   * @return {black-engine~Texture|null} Returns a Texture if found or null.
   */
  getTexture(name) {
    let textures = this.mAssets[AssetType.TEXTURE];
    if (textures != null) {
      /** @type {Texture} */
      let t = textures[name];

      if (t != null)
        return t;
    }

    let textureAtlases = this.mAssets[AssetType.TEXTURE_ATLAS];
    if (textureAtlases != null) {
      for (let key in textureAtlases) {
        let t = textureAtlases[key].subTextures[name];

        if (t != null)
          return t;
      }
    }

    let vectorTextures = this.mAssets[AssetType.VECTOR_TEXTURE];
    if (vectorTextures != null) {
      let t = vectorTextures[name];

      if (t != null)
        return t;
    }

    let vectorTextureAtlases = this.mAssets[AssetType.VECTOR_TEXTURE_ATLAS];
    if (vectorTextureAtlases != null) {
      for (let key in vectorTextureAtlases) {
        let t = vectorTextureAtlases[key].subTextures[name];

        if (t != null)
          return t;
      }
    }

    Debug.warn(`[AssetManager] Texture '${name}' was not found.`);
    return null;
  }

  /**
   * Returns Graphics data by given name.
   * @param {string} name 
   * @returns {black-engine~GraphicsData}
   */
  getGraphicsData(name) {
    let vectors = this.mAssets[AssetType.VECTOR_GRAPHICS];

    if (vectors == null)
      return null;

    /** @type {GraphicsData} */
    let data = vectors[name];

    if (data)
      return data;

    for (let key in vectors) {
      data = vectors[key].searchNode(name);

      if (data) {
        return data;
      }
    }

    Debug.warn(`[AssetManager] GraphicsData '${name}' was not found.`);
    return null;
  }

  /**
   * Returns array of Texture by given name mask.
   * Searches across all loaded images and atlases.
   *
   * @param {string} nameMask The name mask.
   * @returns {Array<black-engine~Texture>|null}
   */
  getTextures(nameMask) {
    let textures = this.mAssets[AssetType.TEXTURE];
    let textureAtlases = this.mAssets[AssetType.TEXTURE_ATLAS];
    let vectorTextures = this.mAssets[AssetType.VECTOR_TEXTURE];
    let vectorTextureAtlases = this.mAssets[AssetType.VECTOR_TEXTURE_ATLAS];

    let out = [];
    let names = [];

    let re = new RegExp('^' + nameMask.split('*').join('.*') + '$');

    // collect single textures
    if (textures != null) {
      for (let key in textures)
        if (re.test(key))
          names.push({ name: key, atlas: null, isBakedVector: false });
    }

    if (vectorTextures != null) {
      for (let key in vectorTextures)
        if (re.test(key))
          names.push({ name: key, atlas: null, isBakedVector: true });
    }

    // collect textures from all atlases
    if (textureAtlases != null) {
      for (let key in textureAtlases) {
        let atlas = textureAtlases[key];

        for (let key2 in atlas.subTextures)
          if (re.test(key2))
            names.push({ name: key2, atlas: atlas, isBakedVector: false });
      }
    }

    // collect texture from vector atlases
    if (vectorTextureAtlases != null) {
      for (let key in vectorTextureAtlases) {
        let atlas = vectorTextureAtlases[key];

        for (let key2 in atlas.subTextures)
          if (re.test(key2))
            names.push({ name: key2, atlas: atlas, isBakedVector: true });
      }
    }

    AtlasTexture.naturalSort(names, 'name');

    for (let i = 0; i < names.length; i++) {
      let ao = names[i];

      if (ao.atlas === null) {
        if (ao.isBakedVector === true)
          out.push(vectorTextures[ao.name]);
        else
          out.push(textures[ao.name]);
      }
      else
        out.push(ao.atlas.mSubTextures[ao.name]);
    }

    if (out.length > 0)
      return out;

    return null;
  }

  /**
   * Returns AtlasTexture by given name.
   *
   * @param {string} name The name of the Asset.
   * @return {black-engine~AtlasTexture|null} Returns atlas or null.
   */
  getAtlas(name) {
    let atlasses = this.mAssets[AssetType.TEXTURE_ATLAS];
    if (atlasses == null)
      return null;

    if (atlasses[name] != null)
      return atlasses[name];

    Debug.warn(`[AssetManager] Atlas '${name}' was not found.`);
    return null;
  }

  /**
   * Returns `SoundClip` by given name.
   *
   * @param {string} name The name of the sound.
   * @return {black-engine~SoundClip} Returns sound or null.
   */
  getSound(name) {
    let sounds = this.mAssets[AssetType.SOUND];
    let soundAtlases = this.mAssets[AssetType.SOUND_ATLAS];

    if (sounds != null) {
      /** @type {SoundClip} */
      let s = sounds[name];

      if (s != null)
        return s;
    }

    if (soundAtlases != null) {
      for (let key in soundAtlases) {
        let s = soundAtlases[key].subSounds[name];
        if (s != null)
          return s;
      }
    }

    Debug.warn(`[AssetManager] Sound '${name}' was not found.`);
    return null;
  }

  /**
   * Returns `SoundAtlasClip` by given name.
   *
   * @param {string} name The name of the sound.
   * @return {black-engine~SoundClip} Returns sound or null.
   */
  getSoundAtlas(name) {
    if (this.mAssets[AssetType.SOUND_ATLAS] == null)
      return null;

    return this.mAssets[AssetType.SOUND_ATLAS][name];
  }

  /**
   * Returns Object parsed from JSON by given name.
   *
   * @param {string} name The name of the JSON asset.
   * @return {Object} Returns object or null.
   */
  getJSON(name) {
    if (this.mAssets[AssetType.JSON] == null)
      return null;

    return this.mAssets[AssetType.JSON][name];
  }

  /**
   * Returns Object parsed from `CutsomAsset` by given name.
   *
   * @param {string} type The type of the asset.
   * @param {string} name The name of the asset.
   * @return {Object|null} Returns object or null.
   */
  getCustomAsset(type, name) {
    if (this.mAssets[type] == null)
      return null;

    return this.mAssets[type][name];
  }

  __validateState() {
    Debug.assert(this.mState === AssetManagerState.NONE || this.mState === AssetManagerState.FINISHED, 'Illegal state.');
  }

  __validateName(type, name) {
    if (this.mAssets[type] && this.mAssets[type][name])
      Debug.assert(this.mDictionary[name] == null, 'Asset with such name is already added.');
  }

  /**
   * Destroys all loaded resources.
   */
  dispose() {
    // todo: for each asset call abort
    this.mQueue.forEach(x => {
      x.abort();
    });
  }

  /**
   * Gets/Sets default path for loading. Useful when URLs getting too long.
   * The asset path will be concatenated with defaultPath.
   *
   * @return {string}
   */
  get defaultPath() {
    return this.mDefaultPath;
  }

  /**
   * @param {string} value
   * @return {void}
   */
  set defaultPath(value) {
    this.mDefaultPath = value;
  }

  /**
   * Returns True if all assets were loaded.
   *
   * @return {boolean}
   */
  get isAllLoaded() {
    return this.mIsAllLoaded;
  }

  /**
   * Returns number of errors occurred during loading.
   * @returns {number}
   */
  get numErrors() {
    return this.mTotalErrors;
  }

  /**
   * Returns current state.
   *
   * @returns {black-engine~AssetManagerState}
   */
  get state() {
    return this.mState;
  }

  /**
   * Always returns 'AssetManager', can be used to overhear AssetManager's messages.
   *
   * @override
   * @readonly
   * @return {string|null}
   */
  get path() {
    return 'AssetManager';
  }
}

/**
 * A RenderSession object holds state of current frame renderers.
 *
 * @cat drivers
 */
class RenderSession {
  /**
   * Creates new instance of RenderSession.
   */
  constructor() {
    /** @type {Array<Renderer>} */
    this.parentRenderers = [];

    /** @type {Array<black-engine~Renderer>} */
    this.endPassParentRenderers = [];

    /** @type {boolean} */
    this.isBackBufferActive = true;

    /** @type {Mblack-engine~atrix|null} */
    this.customTransform = null;
  }

  /**
   * Resets state for future reuse.
   */
  reset() {
    this.parentRenderers.splice(0, this.parentRenderers.length);
    this.endPassParentRenderers.splice(0, this.endPassParentRenderers.length);
    this.isBackBufferActive = true;
    this.customTransform = null;
  }
}

/**
 * Responsible for rendering `TextField` objects by different drivers.
 *
 * @extends black-engine~Renderer
 * @cat drivers
 */
class TextRenderer extends Renderer {
  /**
   * Creates new instance of TextRenderer.
   */
  constructor() {
    super();

    this.texture = null;

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     * @ignore 
     */
    this.mTransformCache = new Matrix();

    /** 
     * @private 
     * @type {black-engine~Matrix|null} 
     * @ignore 
     */
    this.mTransform = null;

    /** 
     * @private 
     * @type {boolean} 
     * @ignore 
     */
    this.mUseTransformCache = false;

    /** 
     * @private 
     * @type {HTMLCanvasElement} 
     */
    this.mCanvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));

    /** 
     * @private 
     * @type {CanvasRenderingContext2D} 
     */
    this.mContext = /** @type {CanvasRenderingContext2D} */ (this.mCanvas.getContext('2d'));

    /** 
     * @ignore
     */
    this.mContext.lineJoin = 'round';

    /** 
     * @ignore
     */
    this.mContext.miterLimit = 2;

    /** 
     * @private 
     * @type {black-engine~TextMetricsData|null} 
     */
    this.mMetrics = null;
  }

  /** @inheritDoc */
  preRender(driver, session) {
    this.endPassRequired = this.gameObject.mClipRect !== null && this.gameObject.mClipRect.isEmpty === false;

    this.skipChildren = !(this.gameObject.mAlpha > 0 && this.gameObject.mVisible === true);
    this.skipSelf = this.skipChildren === true;
  }

  /** @inheritDoc */
  upload(driver, session) {
    let gameObject = /** @type {TextField} */ (this.gameObject);

    if (gameObject.mDirty & DirtyFlag.RENDER_CACHE) {
      gameObject.onGetLocalBounds();
      this.mMetrics = gameObject.mMetrics;
    }

    if (gameObject.mDirty & DirtyFlag.RENDER_CACHE || gameObject.mDirty & DirtyFlag.RENDER)
      this.updateTransform();

    this.mTransform = this.mUseTransformCache === true ? this.mTransformCache : this.gameObject.worldTransformation;

    driver.setSnapToPixels(gameObject.snapToPixels);
    driver.setTransform(this.mTransform);
    driver.setGlobalAlpha(this.alpha);
    driver.setGlobalBlendMode(this.blendMode);

    if (this.endPassRequired === true) {
      driver.beginClip(gameObject.mClipRect, gameObject.mPivotX, gameObject.mPivotY);
    }
  }

  /**
   * @ignore
   * @private
   * @param {black-engine~TextMetricsData} metrics
   * @param {black-engine~TextSegmentMetricsData} segment
   * @param {CanvasRenderingContext2D} ctx
   * @param {black-engine~VideoNullDriver} driver
   * @param {black-engine~FontMetrics} fontMetrics
   * @param {boolean} isStroke
   */
  renderSegment(metrics, segment, ctx, driver, fontMetrics, isStroke) {
    let gameObject = /** @type {TextField} */ (this.gameObject);

    let baseline = fontMetrics.baselineNormalized * segment.style.size;

    if (isStroke === true) {
      ctx.lineWidth = segment.style.strokeThickness;
      ctx.strokeStyle = ColorHelper.intToRGBA(segment.style.strokeColor, segment.style.strokeAlpha);
    } else {
      ctx.fillStyle = ColorHelper.intToRGBA(segment.style.color, segment.style.alpha);
    }

    ctx.font = `${segment.style.weight} ${segment.style.style} ${segment.style.size}px ${segment.style.family}`;

    let lx = segment.bounds.x - Math.min(metrics.strokeBounds.x, metrics.shadowBounds.x);
    let ly = baseline + segment.bounds.y - Math.min(metrics.strokeBounds.y, metrics.shadowBounds.y);

    lx += gameObject.padding.x;
    ly += gameObject.padding.y;

    if (gameObject.align === 'center')
      lx += metrics.bounds.width * 0.5 - metrics.lineWidth[segment.lineIndex] * 0.5;
    else if (gameObject.align === 'right')
      lx += metrics.bounds.width - metrics.lineWidth[segment.lineIndex];

    if (isStroke === true)
      ctx.strokeText(segment.text, lx, ly);
    else
      ctx.fillText(segment.text, lx, ly);
  }

  /** @inheritDoc */
  render(driver, session) {
    let gameObject = /** @type {TextField} */ (this.gameObject);

    if (gameObject.mHighQuality === true && gameObject.mDirty & DirtyFlag.RENDER) {
      gameObject.mDirty ^= DirtyFlag.RENDER;
      gameObject.mDirty |= DirtyFlag.RENDER_CACHE;
    }

    if (gameObject.mDirty & DirtyFlag.RENDER_CACHE) {
      gameObject.mDirty ^= DirtyFlag.RENDER_CACHE;

      const cvs = this.mCanvas;
      const ctx = this.mContext;
      let scale = 1;
      ctx.textBaseline = 'alphabetic';

      if (gameObject.mHighQuality === true) {
        let data = this.mTransform.data;
        let gameObjectScaleX = Math.sqrt((data[0] * data[0]) + (data[2] * data[2]));
        let gameObjectScaleY = Math.sqrt((data[1] * data[1]) + (data[3] * data[3]));
        scale = Math.max(gameObjectScaleX, gameObjectScaleY) * driver.renderScaleFactor;
      }

      let canvasBounds = this.mMetrics.strokeBounds.clone();
      canvasBounds.union(this.mMetrics.shadowBounds);
      canvasBounds.inflate(gameObject.padding.right, gameObject.padding.bottom);
      canvasBounds.scale(scale, scale);

      cvs.width = canvasBounds.width;
      cvs.height = canvasBounds.height;

      let fontMetrics = FontMetrics.get(gameObject.mDefaultStyle.family);
      let segments = this.mMetrics.segments;

      ctx.save();
      ctx.scale(scale, scale);

      for (let i = 0; i < segments.length; i++) {
        if (segments[i].style.dropShadow) {
          ctx.save();
          ctx.shadowColor = ColorHelper.intToRGBA(segments[i].style.shadowColor, segments[i].style.shadowAlpha);
          ctx.shadowBlur = segments[i].style.shadowBlur;
          ctx.shadowOffsetX = segments[i].style.shadowDistanceX * scale;
          ctx.shadowOffsetY = segments[i].style.shadowDistanceY * scale;
          this.renderSegment(this.mMetrics, segments[i], ctx, driver, fontMetrics, false);
          ctx.restore();
        }
      }

      for (let i = 0; i < segments.length; i++) {
        let segment = segments[i];
        if (segment.style.strokeThickness > 0) {
          ctx.lineJoin = 'round';
          ctx.miterLimit = 2;
          this.renderSegment(this.mMetrics, segment, ctx, driver, fontMetrics, true);
        }
      }

      for (let i = 0; i < segments.length; i++)
        this.renderSegment(this.mMetrics, segments[i], ctx, driver, fontMetrics, false);

      ctx.restore();

      // whats the max texture size?
      if (this.texture === null)
        this.texture = new Texture(cvs, null, null, 1 / scale);
      else
        this.texture.set(cvs, null, null, 1 / scale);
    }
  }

  /** @ignore */
  updateTransform() {
    let gameObject = /** @type {TextField} */ (this.gameObject);
    let transform = gameObject.worldTransformation;

    let fieldXOffset = 0;
    let fieldYOffset = 0;

    let filterOffsetX = Math.min(this.mMetrics.strokeBounds.x, this.mMetrics.shadowBounds.x);
    let filterOffsetY = Math.min(this.mMetrics.strokeBounds.y, this.mMetrics.shadowBounds.y);

    const hasFilter = filterOffsetX !== 0 || filterOffsetY !== 0;

    if (gameObject.mAutoSize === false) {
      if (gameObject.align === 'center')
        fieldXOffset = (gameObject.mFieldWidth - this.mMetrics.bounds.width) * 0.5;
      else if (gameObject.align === 'right')
        fieldXOffset = gameObject.mFieldWidth - this.mMetrics.bounds.width;

      if (gameObject.mVerticalAlign === 'middle')
        fieldYOffset = (gameObject.mFieldHeight - this.mMetrics.bounds.height) * 0.5;
      else if (gameObject.mVerticalAlign === 'bottom')
        fieldYOffset = gameObject.mFieldHeight - this.mMetrics.bounds.height;
    }

    if (hasFilter === true || gameObject.mAutoSize === false) {
      this.mUseTransformCache = true;
      transform.copyTo(this.mTransformCache);
      this.mTransformCache.translate((filterOffsetX + fieldXOffset) - gameObject.padding.x, (filterOffsetY + fieldYOffset) - gameObject.padding.y);
    } else if (gameObject.padding.isEmpty === false) {
      this.mUseTransformCache = true;
      transform.copyTo(this.mTransformCache);
      this.mTransformCache.translate(-gameObject.padding.x, -gameObject.padding.y);
    } else {
      this.mUseTransformCache = false;
    }
  }
}

/**
 * Responsible for rendering `BitmapTextField` objects by different drivers.
 *
 * @extends black-engine~Renderer
 * @cat drivers
 */
class BitmapTextRenderer extends Renderer {
  /**
   * Creates new instance of BitmapTextRenderer.
   */
  constructor() {
    super();

    /** 
     * @ignore 
     * @private 
     * @type {HTMLCanvasElement} 
     */
    this.mCanvas = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));

    /** 
     * @ignore 
     * @private 
     * @type {CanvasRenderingContext2D} 
     */
    this.mContext = /** @type {CanvasRenderingContext2D} */ (this.mCanvas.getContext('2d'));

    /** 
     * @ignore 
     * @type {black-engine~Texture|null} 
     */
    this.texture = null;
  }

  /**
   * @inheritDoc
   */
  render(driver, session) {
    let gameObject = /** @type {BitmapTextField} */ (this.gameObject);

    if (gameObject.mText === null)
      return;

    if (gameObject.mDirty & DirtyFlag.RENDER_CACHE) {
      const cvs = this.mCanvas;
      const ctx = this.mContext;

      let data = gameObject.mData;
      let text = gameObject.mText;
      let canvasBounds = gameObject.onGetLocalBounds();

      // remove dirty flag only after getting bounds
      gameObject.mDirty ^= DirtyFlag.RENDER_CACHE;

      let prevCharCode = -1;
      let cx = 0;
      let cy = 0;

      cvs.width = canvasBounds.width;
      cvs.height = canvasBounds.height;

      for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);

        if (/(?:\r\n|\r|\n)/.test(text.charAt(i))) {
          cx = 0;
          cy += data.lineHeight * gameObject.mLineHeight;
          prevCharCode = -1;
          continue;
        }

        let charData = data.chars[charCode];

        if (charData == null)
          continue;

        let texture = charData.texture;

        if (prevCharCode >= 0 && charData.kerning[prevCharCode])
          cx += charData.kerning[prevCharCode];

        const w = texture.width;
        const h = texture.height;

        // skip empty char (space for example)
        if (w === 0 || h === 0)
          continue

        const ox = texture.untrimmedRegion.x + charData.xOffset + cx;
        const oy = texture.untrimmedRegion.y + charData.yOffset + cy;

        ctx.drawImage(texture.native, texture.region.x, texture.region.y, w, h, ~~ox, ~~oy, w, h);

        cx += charData.xAdvance;
        prevCharCode = charCode;
      }

      if (this.texture === null)
        this.texture = new Texture(cvs);
      else
        this.texture.set(cvs);
    }
  }
}

/**
 * Responsible for rendering `Graphics` objects by different drivers.
 *
 * @extends black-engine~Renderer
 * @cat drivers
 */
class GraphicsRenderer extends Renderer {
  constructor() {
    super();
  }
}

/**
 * Renders `DisplayObject` objects on canvas.
 *
 * @extends black-engine~Renderer
 * @cat drivers.canvas
 */
class DisplayObjectRendererCanvas extends Renderer {
  constructor() {
    super();

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mCacheAsBitmapDirty = true;

    /** 
     * @private 
     * @type {black-engine~Matrix|null} 
     */
    this.mCacheAsBitmapMatrixCache = null;

    /** 
     * @private 
     * @type {black-engine~CanvasRenderTexture|null} 
     */
    this.mCacheTexture = null;

    /** 
     * @private 
     * @type {black-engine~Rectangle|null} 
     */
    this.mCacheBounds = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsClipped = false;

    this.mIsCached = false;

    /** 
     * @private 
     * @type {black-engine~Matrix|null} 
     */
    this.mBakeInvertedMatrix = null;
  }

  /** @inheritDoc */
  preRender(driver, session) {
    let gameObject = /** @type {DisplayObject} */ (this.gameObject);

    this.mIsClipped = gameObject.mClipRect !== null;
    this.endPassRequired = this.mIsClipped;

    if (gameObject.mCacheAsBitmap === true) {
      if (gameObject.mCacheAsBitmapDynamic === false) {
        if (this.mIsCached === false) {
          this.mIsCached = true;
          gameObject.setTransformDirty();
          this.__refreshBitmapCache();
          this.mCacheAsBitmapDirty = false;
          this.endPassRequired = false;
        } else {
          gameObject.mDirty |= DirtyFlag.RENDER;
        }
      } else {
        let isStatic = gameObject.checkStatic(true);

        if (isStatic === true && this.mCacheAsBitmapDirty === true) {
          gameObject.setTransformDirty();
          this.__refreshBitmapCache();
          this.mCacheAsBitmapDirty = false;
          this.endPassRequired = false;
        } else if (isStatic === false) {
          this.mCacheAsBitmapDirty = true;
          gameObject.mDirty |= DirtyFlag.RENDER;
        }
      }
    }

    this.skipChildren = gameObject.mCacheAsBitmap === true && this.mCacheAsBitmapDirty === false || this.mIsClipped && gameObject.mClipRect.isEmpty;
    this.skipSelf = false;

    if (this.skipChildren === true) {
      this.endPassRequired = false;
      this.skipSelf = true;
    }
  }

  /** @inheritDoc */
  begin(driver, session) {
    let gameObject = /** @type {DisplayObject} */ (this.gameObject);
    if (this.skipChildren === true && session.isBackBufferActive === true) {
      this.alpha = 1;
      this.blendMode = BlendMode.NORMAL;
      this.color = null;
      this.skipSelf = gameObject.mAlpha <= 0 || gameObject.mVisible === false || this.mIsClipped && gameObject.mClipRect.isEmpty;
    }
    else {
      this.alpha = gameObject.mAlpha * this.parent.alpha;
      this.color = gameObject.mColor === null ? this.parent.color : gameObject.mColor;
      this.blendMode = gameObject.mBlendMode === BlendMode.AUTO ? this.parent.blendMode : gameObject.mBlendMode;

      this.skipChildren = gameObject.mAlpha <= 0 || gameObject.mVisible === false;
      this.skipSelf = this.skipChildren === true || this.mIsClipped === false || this.mIsClipped && gameObject.mClipRect.isEmpty;
    }
  }

  /** @inheritDoc */
  upload(driver, session) {
    let gameObject = /** @type {DisplayObject} */ (this.gameObject);
    let transform = gameObject.worldTransformation;

    if (this.skipChildren === true && this.mCacheAsBitmapMatrixCache) {
      transform = this.mCacheAsBitmapMatrixCache;

      if (gameObject.mCacheAsBitmapDynamic === false) {
        transform = new Matrix()
          .append(this.gameObject.worldTransformation)
          .append(this.mBakeInvertedMatrix)
          .append(this.mCacheAsBitmapMatrixCache);
      }
    }

    if (this.skipChildren === true || this.endPassRequired === true) {
      driver.setSnapToPixels(gameObject.snapToPixels);
      driver.setTransform(transform);
      driver.setGlobalAlpha(this.alpha);
      driver.setGlobalBlendMode(this.blendMode);
    }

    if (this.endPassRequired === true)
      driver.beginClip(gameObject.mClipRect, gameObject.mPivotX, gameObject.mPivotY);
  }

  /** @inheritDoc */
  render(driver, session) {
    if (this.skipChildren === true && session.isBackBufferActive === true)
      driver.drawTexture(this.mCacheTexture);
  }

  __refreshBitmapCache() {
    const bounds = this.gameObject.getBounds(Black.stage, true);
    const sf = Black.stage.scaleFactor;
    const fs = Black.driver.renderScaleFactor * sf;

    /** @type {Matrix} */
    let m = Matrix.pool.get();
    m.set(1, 0, 0, 1, ~~(-bounds.x * sf - Black.stage.mX), ~~(-bounds.y * sf - Black.stage.mY));

    if (this.mIsClipped === true && this.skipChildren === true) {
      m.data[4] += this.gameObject.mPivotX * sf;
      m.data[5] += this.gameObject.mPivotY * sf;
    }

    if (this.mCacheBounds === null)
      this.mCacheBounds = new Rectangle();

    bounds.copyTo(this.mCacheBounds);
    bounds.width *= fs;
    bounds.height *= fs;

    if (this.mCacheTexture === null)
      this.mCacheTexture = new CanvasRenderTexture(bounds.width, bounds.height, 1);
    else
      this.mCacheTexture.resize(bounds.width, bounds.height, 1);

    Black.driver.render(this.gameObject, this.mCacheTexture, m);
    Matrix.pool.release(m);

    if (this.mCacheAsBitmapMatrixCache === null)
      this.mCacheAsBitmapMatrixCache = new Matrix();

    this.mCacheAsBitmapMatrixCache.copyFrom(m);
    this.mCacheAsBitmapMatrixCache.scale(1 / Black.driver.renderScaleFactor, 1 / Black.driver.renderScaleFactor);
    this.mCacheAsBitmapMatrixCache.data[4] = -this.mCacheAsBitmapMatrixCache.data[4];
    this.mCacheAsBitmapMatrixCache.data[5] = -this.mCacheAsBitmapMatrixCache.data[5];

    this.mBakeInvertedMatrix = this.gameObject.worldTransformationInverted.clone();
    //this.mCacheTexture.__dumpToDocument();
  }
}

/**
 * Renders `TextField` objects on canvas.
 *
 * @extends black-engine~TextRenderer
 * @cat drivers.canvas
 */
class TextRendererCanvas extends TextRenderer {
  /** @inheritDoc */
  render(driver, session) {
    super.render(driver, session);

    driver.drawTexture(Renderer.getColoredTexture(this.texture, this.gameObject.mColor));
  }
}

/**
 * Renders `BitmapTextField` objects on canvas.
 *
 * @extends black-engine~BitmapTextRenderer
 * @cat drivers.canvas
 */
class BitmapTextRendererCanvas extends BitmapTextRenderer {
  /** @inheritDoc */
  render(driver, session) {
    super.render(driver, session);

    driver.drawTexture(Renderer.getColoredTexture(this.texture, this.gameObject.mColor));
  }
}

/**
 * Base class for distribution objects.
 *
 * @cat scatters
 */
class Scatter {
  /**
   * Creates new Scatter instance.
   */
  constructor() {}

  /**
   * Returns random value.
   *
   * @return {*} Any object.
   */
  getValue() {}

  /**
   * Returns value at given position.
   *
   * @param {number} t Position to get value at.
   * @return {*} Any object.
   */
  getValueAt(t) {}
}

/**
 * A base class for number scatters.
 *
 * @cat scatters
 * @extends black-engine~Scatter
 */
class FloatScatterBase extends Scatter {
  /**
   * Creates new FloatScatter instance.
   */
  constructor() {
    super();

    /**
     * Cached last value of `getValueAt` result.
     * 
     * @readonly
     * @type {number}
     */
    this.value = 0;
  }
  
  /**
   * Returns random value.
   *
   * @return {number}
   */
  getValue() {
    return this.getValueAt(Math.random());
  }
}

/**
 * A number scatter for defining a range in 1D space.
 *
 * @cat scatters
 * @extends black-engine~FloatScatterBase
 */
class FloatScatter extends FloatScatterBase {
  /**
   * Creates new FloatScatter instance.
   *
   * @param {number}                   [min=0]  The min value along x-axis.
   * @param {number}                   [max=null]  The max value along x-axis.
   * @param {?function(number):number} [ease=null] Easing function. If null linear function is used as default.
   */
  constructor(min = 0, max = null, ease = null) {
    super();

    /**
     * A min value.
     * 
     * @type {number}
     */
    this.min = min;

    /**
     * A max value.
     * 
     * @type {number}
     */
    this.max = max === null ? min : max;

    /**
     * Optional easing function.
     * 
     * @type {?function(number):number}
     */
    this.ease = ease;
  }

  /**
   * Returns value at given position within defined range.
   *
   * @override
   * @param {number} t The position.
   * @return {number} Number at given position.
   */
  getValueAt(t) {
    if (this.ease !== null)
      t = this.ease(t);

    this.value = this.min + t * (this.max - this.min);

    return this.value;
  }

  /**
   * Creates new FloatScatterBase from a set of numbers.
   *
   * @param {...number|black-engine~FloatScatterBase} values Set of values.
   * @returns {black-engine~FloatScatterBase}
   */
  static fromObject(...values) {
    if (values[0] instanceof FloatScatterBase)
      return /** @type {FloatScatterBase} */ (values[0]);

    return new FloatScatter(...values);
  }
}

/**
 * Represents current state of the emitter.
 * @cat particles
 * @static
 * @constant
 * @enum {number}
 */
const EmitterState = {
  PENDING: 0,
  EMITTING: 1,
  PAUSED: 2,
  FINISHED: 3,
};

/**
 * Indicates the order in which particles will be rendered.
 * @cat particles
 * @enum {string}
 */
const EmitterSortOrder = {
  FRONT_TO_BACK: 'frontToBack',
  BACK_TO_FRONT: 'backToFront'
};

/**
 * A base utility class used by particle systems. Must be extended.
 *
 * @cat particles
 */
class Modifier {
  /**
   * Creates new instance.
   *
   * @param {boolean} isInitializer Indicates whenever this modifier will be applied to particle during initialization stage or particle lifetime.
   */
  constructor(isInitializer = true) {
    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsInitializer = isInitializer;

    /** 
     * Modifier's object to get values from. 
     * @type {Scatter}
     */
    this.scatter = null;

    /**
     * Indicates whenever this modifier is active or not.
     * @type {boolean}
     */
    this.isActive = true;
  }

  /**
   * Called on each Emitter's update before `Modifier.update`
   *
   * @protected
   * @param {number} dt Time since last update.
   * @return {void}
   */
  preUpdate(dt) { }

  /**
   * Called on each Emitter's update for each particle.
   *
   * @protected
   * @param {Emitter} emitter Emitter this modifier attached to.
   * @param {Particle} particle Instance of `Particle`.
   * @param {number} dt Time since last update.
   * @return {void}
   */
  update(emitter, particle, dt) { }

  /**
   * Called on each Emitter's update after `Modifier.update`
   *
   * @protected
   * @param {number} dt Time since last update.
   * @return {void}
   */
  postUpdate(dt) { }

  /**
   * Specifies if the modifier is initializer or action.
   *
   * @readonly
   * @returns {boolean}
   */
  get isInitializer() {
    return this.mIsInitializer;
  }
}

/**
 * The particle!
 *
 * @cat particles
 */
class Particle {
  constructor() {

    /** @type {number} The index of a texture. */
    this.textureIndex = 0;

    /** @type {number} The x scale of this particle. */
    this.scaleX = 1;

    /** @type {number} The x scale of this particle. */
    this.scaleY = 1;

    /** @type {number} An alpha value. */
    this.alpha = 1;

    /** @type {number} The life of this particle. */
    this.life = 1;

    /** @type {number} The age of this particle. */
    this.age = 0;

    /** @type {number} Relation of life to age. */
    this.energy = this.age / this.life;

    /** @type {number} The mass. */
    this.mass = 0;

    /** @type {number} X-component. */
    this.x = 0;

    /** @type {number} Y-component. */
    this.y = 0;

    /** @type {number} Rotation of this particle. */
    this.r = 0;

    /** @type {number} Velocity by x. */
    this.vx = 0;

    /** @type {number} Velocity by y. */
    this.vy = 0;

    /** @type {number} Particle x-acceleration. */
    this.ax = 0;

    /** @type {number} Particle y-acceleration. */
    this.ay = 0;

    /** @type {number|null} Particle tinting color. */
    this.color = null;

    /** @type {number} Particle origin point along x-axis. */
    this.anchorX = 0.5;

    /** @type {number} Particle origin point along y-axis. */
    this.anchorY = 0.5;
  }

  /**
   * Resets particle to default state.
   *
   * @returns {void}
   */
  reset() {
    this.scaleX = this.scaleY = this.alpha = this.life = 1;
    this.textureIndex = this.age = this.energy = this.mass = this.x = this.y = this.r = this.vx = this.vy = this.ax = this.ay = 0;
    this.anchorX = this.anchorY = 0.5;
  }

  /**
   * Internal update method.
   *
   * @param {number} dt Time since last update.
   * @return {void}
   */
  update(dt) {
    if (this.life <= 0) {
      this.life = 0;
      return;
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if (this.mass > 0) {
      this.ax *= 1 / this.mass;
      this.ay *= 1 / this.mass;
    }

    this.vx += this.ax * dt;
    this.vy += this.ay * dt;

    this.ax = 0;
    this.ay = 0;

    this.life -= dt;
    this.age += dt;

    this.energy = this.age / (this.age + this.life);
  }
}

// TODO: pretty much the emitter is always dirty and caching should not be applied onto it.
// TODO: q/a every property

/**
 * Particle emitter.
 *
 * @cat particles
 * @extends black-engine~DisplayObject
 */
class Emitter extends DisplayObject {
  /**
   * Creates new Emitter instance.
   */
  constructor() {
    super();

    /** 
     * @private 
     * @type {Array<black-engine~Texture>} 
     */
    this.mTextures = [];

    /** 
     * @private 
     * @type {Array<black-engine~Particle>} 
     */
    this.mParticles = [];

    /** 
     * @private 
     * @type {Array<black-engine~Particle>} 
     */
    this.mRecycled = [];

    /** 
     * @private 
     * @type {Array<black-engine~Modifier>} 
     */
    this.mInitializers = [];

    /** 
     * @private 
     * @type {Array<black-engine~Modifier>} 
     */
    this.mActions = [];

    /** 
     * @private 
     * @type {black-engine~GameObject} 
     */
    this.mSpace = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsLocal = true;

    /** 
     * @private 
     * @type {number} 
     */
    this.mMaxParticles = 10000;

    /** 
     * @private 
     * @type {black-engine~FloatScatter} 
     */
    this.mEmitCount = new FloatScatter(10);

    /** 
     * @private 
     * @type {black-engine~FloatScatter} 
     */
    this.mEmitNumRepeats = new FloatScatter(0, Number.MAX_SAFE_INTEGER);

    /** 
     * @private 
     * @type {number} 
     */
    this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue();

    /** 
     * @private 
     * @type {black-engine~FloatScatter} 
     */
    this.mEmitDuration = new FloatScatter(1 / 60);

    /** 
     * @private 
     * @type {number} 
     */
    this.mEmitDurationLeft = this.mEmitDuration.getValue();

    /** 
     * @private 
     * @type {black-engine~FloatScatter} 
     */
    this.mEmitInterval = new FloatScatter(1 / 60);

    /** 
     * @private 
     * @type {number} 
     */
    this.mEmitIntervalLeft = this.mEmitInterval.getValue();

    /** 
     * @private 
     * @type {black-engine~FloatScatter} 
     */
    this.mEmitDelay = new FloatScatter(1);

    /** 
     * @private 
     * @type {number} 
     */
    this.mEmitDelayLeft = this.mEmitDelay.getValue();

    /** 
     * @private 
     * @type {number} 
     */
    this.mNextUpdateAt = 0;

    /** 
     * @private 
     * @type {black-engine~EmitterState} 
     */
    this.mState = EmitterState.PENDING;

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     */
    this.__tmpLocal = new Matrix();

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     */
    this.__tmpWorld = new Matrix();

    /** 
     * @private 
     * @type {black-engine~EmitterSortOrder} 
     */
    this.mSortOrder = EmitterSortOrder.FRONT_TO_BACK;

    /**
     * @private
     * @type {Array<string>|null}
     */
    this.mTextureNames = null;

    /**
     * @private
     * @type {number}
     */
    this.mPresimulateSeconds = 0;

    /**
     * @private
     * @type {number}
     */
    this.mCurrentPresimulationTime = 0;
  }

  /**
   * Starts emitting particles. By default emitter will start emitting automatically.
   */
  play() {
    if (this.mState === EmitterState.EMITTING)
      return;

    // resume or restart
    if (this.mState !== EmitterState.PAUSED) {
      this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue();
      this.mEmitDurationLeft = this.mEmitDuration.getValue();
      this.mEmitIntervalLeft = this.mEmitInterval.getValue();
      this.mEmitDelayLeft = this.mEmitDelay.getValue();

      this.mState = EmitterState.PENDING;
    }
  }

  /**
   * Pauses the emitting process.
   */
  pause() {
    this.mState = EmitterState.PAUSED;
  }

  /** 
   * Stops emitting process and destroys all particles.
   */
  stop() {
    this.mParticles = [];
    this.mRecycled = [];

    this.mState = EmitterState.FINISHED;
  }

  /**
   * Simulates current emmitter for a given amount of time (seconds).
   * 
   * @param {number} time Time in secounds
   * @returns {void}
   */
  simulate(time) {
    Debug.isNumber(time);
    Debug.assert(time > 0);

    this.mCurrentPresimulationTime = 0;
    this.mPresimulateSeconds = time;

    while (this.mCurrentPresimulationTime <= this.mPresimulateSeconds) {
      this.onUpdate();
      this.mCurrentPresimulationTime += Black.time.delta;
    }

    this.mPresimulateSeconds = 0;
    this.mCurrentPresimulationTime = 0;
  }

  /**
   * @inheritDoc
   */
  getRenderer() {
    return Black.driver.getRenderer('Emitter', this);
  }

  /**
   * A helper method for quick adding modifiers.
   *
   * @param {...(black-engine~GameObject|black-engine~Component|black-engine~Modifier)} modifiers The list of modifiers.
   * @returns {Emitter}
   */
  add(...modifiers) {
    for (let i = 0; i < modifiers.length; i++) {
      let ai = modifiers[i];

      if (ai instanceof Modifier)
        this.addModifier(ai);
      else
        super.add(ai);
    }
    return this;
  }

  /**
   * Adds modifier to the end of the list.
   *
   * @param {black-engine~Modifier} modifier Modifier to add.
   * @return {black-engine~Modifier}
   */
  addModifier(modifier) {
    if (modifier.isInitializer)
      this.mInitializers.push(modifier);
    else
      this.mActions.push(modifier);

    return modifier;
  }

  /**
   * Removes given modifier.
   *
   * @param {black-engine~Modifier} modifier Modifier to remove.
   * @return {boolean} True if modifier was removed.
   */
  removeModifier(modifier) {
    let array = this.mActions;

    if (modifier.isInitializer)
      array = this.mInitializers;

    let ix = array.indexOf(modifier);
    if (ix >= 0) {
      array.splice(ix, 1);
      return true;
    }

    return false;
  }

  /**
   * Hacky method which returns time now or presimulation time depending on a case.
   */
  __getTime() {
    return Black.time.now;
  }

  /**
   * Updates delay, duration, interval. Use this function each time you change one of those values.
   *
   * @private
   * @param {number} [dt=0]
   * @return {void}
   */
  updateNextTick(dt = 0) {
    let t = Black.time.now;
    let firstEmit = false;

    if (this.mState === EmitterState.PENDING) {
      this.mNextUpdateAt = t + this.mEmitDelayLeft;
      this.mEmitDelayLeft -= dt;

      if (this.mEmitDelayLeft <= 0) {
        this.mEmitDelayLeft = this.mEmitDelay.getValue();
        this.mState = EmitterState.EMITTING;
        firstEmit = true;
      }
    }

    if (this.mState === EmitterState.EMITTING) {
      if (this.mEmitDurationLeft <= 0) {
        this.mEmitDurationLeft = this.mEmitDuration.getValue();

        this.mEmitNumRepeatsLeft--;

        if (this.mEmitNumRepeatsLeft <= 0) {
          this.mState = EmitterState.FINISHED;

          this.post(Message.COMPLETE);
          return;
        } else {
          this.mState = EmitterState.PENDING;
          return;
        }
      } else {
        // we are getting value here each update to make sure we are up to date!
        if (firstEmit) {
          // for a first emit we do not want to add an extra delay. emit now!
          this.mNextUpdateAt = t;
          this.mEmitIntervalLeft = this.mEmitInterval.getValue();
        }
        else {
          this.mEmitIntervalLeft -= dt;
          this.mNextUpdateAt = t + this.mEmitIntervalLeft;

          // reset interval
          if (this.mEmitIntervalLeft <= 0)
            this.mEmitIntervalLeft = this.mEmitInterval.getValue();
        }
      }

      this.mEmitDurationLeft -= dt;
    }
  }

  /**
   * @inheritDoc
   */
  onUpdate() {
    if (this.mState === EmitterState.PAUSED)
      return;

    let dt = Black.time.delta;

    // rate logic
    this.updateNextTick(dt);

    if (Black.time.now >= this.mNextUpdateAt && this.mState === EmitterState.EMITTING) {
      this.__create(this.mEmitCount.getValue());
    }

    // main update login
    const alength = this.mActions.length;
    const plength = this.mParticles.length;

    for (let k = 0; k < alength; k++)
      if (this.mActions[k].isActive === true)
        this.mActions[k].preUpdate(dt);

    let particle;

    let i = plength;
    while (i--) {
      particle = this.mParticles[i];

      for (let k = 0; k < alength; k++)
        if (this.mActions[k].isActive === true)
          this.mActions[k].update(this, particle, dt);

      particle.update(dt);

      if (particle.life === 0) {
        this.mRecycled.push(particle);
        this.mParticles.splice(i, 1);
      }
    }

    for (let k = 0; k < alength; k++)
      if (this.mActions[k].isActive === true)
        this.mActions[k].postUpdate(dt);

    // set dummy dirty flag so unchanged frames can be detected
    if (this.mVisible === true && this.mAlpha > 0)
      this.setDirty(DirtyFlag.LOCAL, false);
  }

  /**
   * @ignore
   * @private
   */
  __create(amount) {
    let matrix = this.worldTransformation.clone();
    let minv = null;

    if (this.mIsLocal === false) {
      minv = this.mSpace.worldTransformationInverted.clone();
      matrix.prepend(minv);
    }

    for (let i = 0; i < amount; i++) {
      let p = null;

      if (this.mRecycled.length > 0) {
        p = this.mRecycled.pop();
      } else {
        if (this.mParticles.length >= this.mMaxParticles)
          return;

        p = new Particle();
      }

      p.reset();

      for (let k = 0; k < this.mInitializers.length; k++)
        if (this.mInitializers[k].isActive === true)
          this.mInitializers[k].update(this, p, 0);

      if (this.mIsLocal === false) {
        matrix.transformXY(p.x, p.y, Vector.__cache);
        p.x = Vector.__cache.x;
        p.y = Vector.__cache.y;
      }

      this.mParticles.push(p);
    }
  }

  /**
   * Gets current emitter state.
   *
   * @return {black-engine~EmitterState}
   */
  get state() {
    return this.mState;
  }

  /**
   * Gets/Sets The maximum number of particles can be created.
   *
   * @return {number}
   */
  get maxParticles() {
    return this.mMaxParticles;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set maxParticles(value) {
    if (value < 0)
      throw new Error('Bad argument error.');

    this.mMaxParticles = value;
  }

  /**
   * Gets/Sets the number of particles to be emitted per {@link Emitter#emitInterval}
   *
   * @return {black-engine~FloatScatter}
   */
  get emitCount() {
    return this.mEmitCount;
  }

  /**
   * @param {black-engine~FloatScatter} value
   * @return {void}
   */
  set emitCount(value) {
    this.mEmitCount = value;
  }

  /**
   * Gets/Sets the number of "durations" to to repeat.
   *
   * @return {black-engine~FloatScatter}
   */
  get emitNumRepeats() {
    return this.mEmitNumRepeats;
  }

  /**
   * @param {black-engine~FloatScatter} value
   * @return {void}
   */
  set emitNumRepeats(value) {
    this.mEmitNumRepeats = value;
    this.mEmitNumRepeatsLeft = this.mEmitNumRepeats.getValue();
  }

  /**
   * Gets/Sets
   *
   * @return {black-engine~FloatScatter}
   */
  get emitDuration() {
    return this.mEmitDuration;
  }

  /**
   * @param {black-engine~FloatScatter} value
   * @return {void}
   */
  set emitDuration(value) {
    this.mEmitDuration = value;
    this.mEmitDurationLeft = this.mEmitDuration.getValue();
  }


  /**
   * Gets/Sets
   *
   * @return {black-engine~FloatScatter}
   */
  get emitInterval() {
    return this.mEmitInterval;
  }

  /**
   * @param {black-engine~FloatScatter} value
   * @return {void}
   */
  set emitInterval(value) {
    this.mEmitInterval = value;
    this.mEmitIntervalLeft = this.mEmitInterval.getValue();
  }


  /**
   * Gets/Sets
   *
   * @return {black-engine~FloatScatter}
   */
  get emitDelay() {
    return this.mEmitDelay;
  }

  /**
   * @param {black-engine~FloatScatter} value
   * @return {void}
   */
  set emitDelay(value) {
    this.mEmitDelay = value;
    this.mEmitDelayLeft = this.mEmitDelay.getValue();
  }


  /**
   * Gets/Sets the space where emitting simulation will happen, ignoring space transformation, so all forces are relative to global.
   *
   * @return {black-engine~GameObject}
   */
  get space() {
    return this.mSpace;
  }

  /**
   * @param {black-engine~GameObject} gameObject
   * @return {void}
   */
  set space(gameObject) {
    this.mSpace = gameObject;
    this.mIsLocal = this.mSpace === null || this.mSpace === this;
    this.setRenderDirty();
  }

  /**
   * Gets/Sets a list of textures to use.
   *
   * @return {Array<black-engine~Texture>}
   */
  get textures() {
    return this.mTextures;
  }

  /**
   * @param {Array<black-engine~Texture>} value
   * @return {void}
   */
  set textures(value) {
    this.mTextures = value;

    Debug.assert(!(this.mTextures === null || this.mTextures.length === 0), 'At least one texture must be provided.');

    this.setRenderDirty();
  }

  /**
   * Returns list of textures used by this emitter.
   * @returns {Array<string>}
   */
  get textureNames() {
    return this.mTextureNames;
  }

  /**
    * Sets the list of textures with given string. It uses AssetManager to find textures.
    * 
    * @param {Array<string>} value
    * @return {void}
    */
  set textureNames(value) {
    this.mTextureNames = value;

    this.textures = value.map(x => Black.assets.getTexture(x));
  }

  /**
   * Gets/Sets the order in which particles will be sorted when rendering.
   *
   * @return {black-engine~EmitterSortOrder}
   */
  get sortOrder() {
    return this.mSortOrder;
  }

  /**
   * @param {black-engine~EmitterSortOrder} value
   * @return {void}
   */
  set sortOrder(value) {
    this.mSortOrder = value;
    this.setRenderDirty();
  }
}

/**
 * Renders `Particle` objects on canvas.
 *
 * @extends black-engine~Renderer
 * @cat drivers.canvas
 */
class EmitterRendererCanvas extends Renderer {
  /**
   * Creates new instance of EmitterRendererCanvas.
   */
  constructor() {
    super();

    /**
     * @ignore
     * @type {boolean}
     */
    this.isLocal = false;

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     */
    this.__tmpLocal = new Matrix();

    /** 
     * @private 
     * @type {black-engine~Matrix} 
     */
    this.__tmpWorld = new Matrix();
  }

  /** @inheritDoc */
  preRender(driver, session) {
    let gameObject = /** @type {Emitter} */ (this.gameObject);

    this.endPassRequired = this.gameObject.mClipRect !== null && this.gameObject.mClipRect.isEmpty === false;
    this.skipChildren = !(gameObject.mAlpha > 0 && gameObject.mTextures.length > 0 && gameObject.mVisible === true);
    this.skipSelf = !(gameObject.mTextures.length > 0 && gameObject.mParticles.length > 0);
  }

  /** @inheritDoc */
  render(driver, session) {
    let gameObject = /** @type {Emitter} */ (this.gameObject);

    driver.setSnapToPixels(gameObject.snapToPixels);

    let plength = gameObject.mParticles.length;
    let localTransform = this.__tmpLocal;
    let worldTransform = this.__tmpWorld;
    localTransform.identity();

    if (gameObject.sortOrder === EmitterSortOrder.FRONT_TO_BACK) {
      for (let i = 0; i < plength; i++)
        this.__renderParticle(gameObject.mParticles[i], localTransform, worldTransform, driver);
    } else {
      for (let i = plength - 1; i > 0; i--)
        this.__renderParticle(gameObject.mParticles[i], localTransform, worldTransform, driver);
    }
  }

  /**
   * @ignore
   * @private
   * @param {black-engine~Particle} particle
   * @param {black-engine~Matrix} localTransform
   * @param {black-engine~Matrix} worldTransform
   * @param {black-engine~VideoNullDriver} driver
   */
  __renderParticle(particle, localTransform, worldTransform, driver) {
    let gameObject = /** @type {Emitter} */ (this.gameObject);

    let texture = gameObject.textures[particle.textureIndex];
    let tw = texture.displayWidth * particle.anchorX;
    let th = texture.displayHeight * particle.anchorY;

    if (particle.r === 0) {
      let tx = particle.x - tw * particle.scaleX;
      let ty = particle.y - th * particle.scaleY;
      localTransform.set(particle.scaleX, 0, 0, particle.scaleY, tx, ty);
    } else {
      let cos = Math.cos(particle.r);
      let sin = Math.sin(particle.r);
      let a = particle.scaleX * cos;
      let b = particle.scaleX * sin;
      let c = particle.scaleY * -sin;
      let d = particle.scaleY * cos;

      let tx = particle.x - tw * a - th * c;
      let ty = particle.y - tw * b - th * d;
      localTransform.set(a, b, c, d, tx, ty);
    }

    if (gameObject.mIsLocal === true) {
      worldTransform.identity();
      worldTransform.copyFrom(localTransform);
      worldTransform.prepend(gameObject.worldTransformation);
    } else {
      worldTransform.copyFrom(gameObject.mSpace.worldTransformation);
      worldTransform.append(localTransform);
    }

    driver.setGlobalAlpha(gameObject.mAlpha * particle.alpha);
    driver.setTransform(worldTransform);
    driver.drawTexture(Renderer.getColoredTexture(texture, particle.color === null ? gameObject.mColor : particle.color));
  }
}

/**
 * Renders `Sprite` objects on canvas.
 *
 * @extends black-engine~Renderer
 * @cat drivers.canvas
 */

class SpriteRendererCanvas extends Renderer{
  constructor() {
    super();

    /** @type {CanvasPattern|null} */
    this.pattern = null;

    /** @type {black-engine~Texture|null} */
    this.patternTexture = null;

    /** @type {black-engine~CanvasRenderTexture|null} */
    this.sliceTextureCache = null;

    /** @type {number|null} */
    this.sizeWidthCache = null;

    /** @type {number|null} */
    this.sizeHeightCache = null;

    /** @type {black-engine~Texture} */
    this.textureCache = null;
  }

  /** @inheritDoc */
  preRender(driver, session) {
    let gameObject = /** @type {Sprite} */ (this.gameObject);

    const skip = gameObject.mClipRect !== null && gameObject.mClipRect.isEmpty;

    this.endPassRequired = gameObject.mClipRect !== null && !gameObject.mClipRect.isEmpty;
    this.skipChildren = skip || gameObject.mAlpha <= 0 || gameObject.mVisible === false;
    this.skipSelf = skip || gameObject.mTexture === null || gameObject.mAlpha <= 0 || gameObject.mVisible === false;
  }

  renderSlice9Grid(driver, texture, grid) {
    const dpr = driver.mDevicePixelRatio;
    let desiredWidth = texture.width * this.gameObject.mScaleX;
    let desiredHeight = texture.height * this.gameObject.mScaleY;

    if (this.textureCache === texture && this.sizeWidthCache === desiredWidth && this.sizeHeightCache === desiredHeight)
      return this.sliceTextureCache;

    this.textureCache = texture;
    this.sizeWidthCache = desiredWidth;
    this.sizeHeightCache = desiredHeight;

    const sourceX = texture.region.x;
    const sourceY = texture.region.y;
    const sourceWidth = texture.region.width;
    const sourceHeight = texture.region.height;

    const destX = texture.untrimmedRegion.x * dpr;
    const destY = texture.untrimmedRegion.y * dpr;

    if (this.sliceTextureCache === null)
      this.sliceTextureCache = new CanvasRenderTexture(desiredWidth, desiredHeight, 1 / texture.scale);
    else
      this.sliceTextureCache.resize(desiredWidth, desiredHeight, 1 / texture.scale);

    const ctx = this.sliceTextureCache.renderTarget.context;
    const scale = Math.min(this.gameObject.scaleX, this.gameObject.scaleY);

    if (scale <= 1) {
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      desiredWidth /= scale;
      desiredHeight /= scale;
    }

    const gridLeft = grid.x / texture.scale;
    const gridTop = grid.y / texture.scale;
    const gridRight = sourceWidth - grid.right / texture.scale;
    const gridBottom = sourceHeight - grid.bottom / texture.scale;

    // non-scalable
    const srcOffsetX = sourceX + sourceWidth - gridRight;
    const dstOffsetX = destX + desiredWidth / texture.scale - gridRight;

    const srcOffsetY = sourceY + sourceHeight - gridBottom;
    const dstOffsetY = destY + desiredHeight / texture.scale - gridBottom;

    // top left
    ctx.drawImage(texture.native, sourceX, sourceY, gridLeft, gridTop, destX, destY, gridLeft, gridTop);

    // top right
    ctx.drawImage(texture.native, srcOffsetX, sourceY, gridRight, gridTop, dstOffsetX, destY, gridRight, gridTop);

    // bottom right
    ctx.drawImage(texture.native, srcOffsetX, srcOffsetY, gridRight, gridBottom, dstOffsetX, dstOffsetY, gridRight, gridBottom);

    // bottom left
    ctx.drawImage(texture.native, sourceX, srcOffsetY, gridLeft, gridBottom, destX, dstOffsetY, gridLeft, gridBottom);

    // scalable
    const srcLeftOffset = sourceX + gridLeft;
    const dstLeftOffset = destX + gridLeft;

    const srcTopOffset = sourceY + gridTop;
    const dstTopOffset = destY + gridTop;

    const srcRightOffset = sourceX + sourceWidth - gridRight;
    const dstRightOffset = destX + desiredWidth / texture.scale - gridRight;

    const srcBottomOffset = sourceY + sourceHeight - gridBottom;
    const dstBottomOffset = destY + desiredHeight / texture.scale - gridBottom;

    const srcCenterWidth = sourceWidth - gridLeft - gridRight;
    const dstCenterWidth = desiredWidth / texture.scale - gridLeft - gridRight;

    const srcCenterHeight = sourceHeight - gridTop - gridBottom;
    const dstCenterHeight = desiredHeight / texture.scale - gridTop - gridBottom;

    // top
    ctx.drawImage(texture.native, srcLeftOffset, sourceY, srcCenterWidth, gridTop, dstLeftOffset, destY, dstCenterWidth, gridTop);

    // right
    ctx.drawImage(texture.native, srcRightOffset, srcTopOffset, gridRight, srcCenterHeight, dstRightOffset, dstTopOffset, gridRight, dstCenterHeight);

    // bottom
    ctx.drawImage(texture.native, srcLeftOffset, srcBottomOffset, srcCenterWidth, gridBottom, dstLeftOffset, dstBottomOffset, dstCenterWidth, gridBottom);

    // left
    ctx.drawImage(texture.native, sourceX, srcTopOffset, gridLeft, srcCenterHeight, destX, dstTopOffset, gridLeft, dstCenterHeight);

    //center
    ctx.drawImage(texture.native, srcLeftOffset, srcTopOffset, srcCenterWidth, srcCenterHeight, dstLeftOffset, dstTopOffset, dstCenterWidth, dstCenterHeight);

    return this.sliceTextureCache;
  }

  /** @inheritDoc */
  render(driver, session) {
    let ctx = /** @type {CanvasDriver}*/ (driver).mCtx;
    let gameObject = /** @type {Sprite} */ (this.gameObject);

    let texture = Renderer.getColoredTexture(gameObject.mTexture, this.color);

    if (gameObject.mSlice9grid !== null) {
      const data = this.gameObject.worldTransformation.data;
      const m = Matrix.pool.get().set(data[0] / this.gameObject.scaleX, data[1] / this.gameObject.scaleX, data[2] / this.gameObject.scaleY, data[3] / this.gameObject.scaleY, data[4], data[5]);
      driver.setTransform(m);
      Matrix.pool.release(m);

      texture = this.renderSlice9Grid(driver, texture, gameObject.mSlice9grid);
    }

    if (gameObject.mTiling === null) {
      driver.drawTexture(texture);
    } else {
      // we got some tiling
      if (this.pattern === null || this.patternTexture !== texture) {
        const renderCanvas = new RenderTargetCanvas(texture.width, texture.height);
        const r = texture.region;
        const u = texture.untrimmedRegion;
        renderCanvas.context.drawImage(texture.native, r.x, r.y, r.width, r.height, u.x, u.y, r.width, r.height);

        this.pattern = ctx.createPattern(renderCanvas.native, 'repeat');
        this.patternTexture = texture;
      }

      ctx.fillStyle = /** @type {CanvasPattern} */(this.pattern);

      let dpr = driver.renderScaleFactor;

      let m = gameObject.worldTransformation.clone();
      m.scale(gameObject.tiling.scaleX * dpr, gameObject.tiling.scaleY * dpr);
      m.translate(gameObject.tiling.wrapX / dpr, gameObject.tiling.wrapY / dpr);

      driver.setTransform(m);

      // draw pattern
      ctx.fillRect(-gameObject.tiling.wrapX, -gameObject.tiling.wrapY, gameObject.tiling.width / gameObject.tiling.scaleX, gameObject.tiling.height / gameObject.tiling.scaleY);
      ctx.fillStyle = 'black';
    }
  }
}

/**
 * Renders `Graphics` objects on canvas.
 *
 * @extends black-engine~GraphicsRenderer
 * @cat drivers.canvas
 */

class GraphicsRendererCanvas extends GraphicsRenderer {
  /**
   * Creates new instance of GraphicsRendererCanvas.
   */
  constructor() {
    super();
  }

  /** @inheritDoc */
  render(driver, session) {
    let gameObject = /** @type {Graphics} */ (this.gameObject);
    this.__drawCommandBuffer(driver);

    if (gameObject.mColor !== null && gameObject.mColor !== 0xFFFFFF) {
      driver.context.globalCompositeOperation = 'multiply';
      this.__drawCommandBuffer(driver, gameObject.mColor);
    }
  }

  /**
   * Prepare context to draw.
   *
   * @private
   * @param {black-engine~VideoNullDriver} driver Driver to draw.
   * @param {number|null=} [color=null] Tint.
   *
   * @return {void}
   */
  __drawCommandBuffer(driver, color = null) {
    const gameObject = /** @type {Graphics} */ (this.gameObject);
    const ctx = driver.context;

    ctx.save();
    ctx.beginPath();

    const transform = Matrix.pool.get().copyFrom(gameObject.worldTransformation);
    transform.translate(-gameObject.mDataOffsetX, -gameObject.mDataOffsetY);

    this.__renderNode(driver, color, gameObject.mGraphicsData, transform);

    Matrix.pool.release(transform);
    ctx.restore();
  }

  /**
   * Recursively draws each node of GraphicsData.
   *
   * @private
   * @param {black-engine~VideoNullDriver} driver Driver to draw.
   * @param {number|null} color Tint.
   * @param {black-engine~GraphicsData} node Commands provider.
   * @param {black-engine~Matrix} transform Graphics Data global transformation.
   *
   * @return {void}
   */
  __renderNode(driver, color, node, transform) {
    const commands = node.mCommandQueue;
    const ctx = driver.context;
    const len = commands.length;
    const r = driver.renderScaleFactor;
    const px = node.mPivotX;
    const py = node.mPivotY;

    transform = transform.clone().append(node.mTransform);
    driver.setTransform(transform);

    for (let i = 0; i < len; i++) {
      const cmd = commands[i];

      switch (cmd.type) {
        case GraphicsCommandType.LINE_STYLE: {
          ctx.lineWidth = cmd.getNumber(0) * r;
          ctx.strokeStyle = ColorHelper.intToRGBA(color === null ? cmd.getNumber(1) : /** @type {number} */(color), cmd.getNumber(2));
          ctx.lineCap = cmd.getString(3);
          ctx.lineJoin = cmd.getString(4);
          ctx.miterLimit = cmd.getNumber(5);
          break;
        }

        case GraphicsCommandType.FILL_STYLE: {
          ctx.fillStyle = ColorHelper.intToRGBA(color === null ? cmd.getNumber(0) : /** @type {number} */(color), cmd.getNumber(1));
          break;
        }

        case GraphicsCommandType.FILL_GRD: {
          const gradientInfo = /** @type {GraphicsLinearGradient} */(cmd.getObject(0));
          let grd = gradientInfo.native;

          if (!grd) {
            const dpr = Black.driver.renderScaleFactor;
            const entries = [];

            grd = gradientInfo.native = ctx.createLinearGradient(gradientInfo.x0 * dpr, gradientInfo.y0 * dpr,
              gradientInfo.x1 * dpr, gradientInfo.y1 * dpr);

            for (let key in gradientInfo.stops) {
              entries.push({ percent: parseFloat(key), color: gradientInfo.stops[key] });
            }

            entries.sort((a, b) => a.percent - b.percent);

            for (let i = 0, l = entries.length; i < l; i++) {
              const entry = entries[i];
              grd.addColorStop(entry.percent, entry.color);
            }
          }

          ctx.fillStyle = /** @type {CanvasGradient} */(grd);

          break;
        }

        case GraphicsCommandType.FILL_PATTERN: {
          const patternInfo = /** @type {GraphicsPattern} */(cmd.getObject(0));
          let pattern = patternInfo.native;

          if (!pattern) {
            pattern = patternInfo.native = ctx.createPattern(patternInfo.image, patternInfo.repetition);
          }

          ctx.fillStyle = /** @type {CanvasPattern} */(pattern);

          break;
        }

        case GraphicsCommandType.ARC: {
          ctx.arc(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py, cmd.getNumber(2) * r, cmd.getNumber(3), cmd.getNumber(4), cmd.getBoolean(5));
          break;
        }

        case GraphicsCommandType.RECT: {
          ctx.rect(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py, cmd.getNumber(2) * r, cmd.getNumber(3) * r);
          break;
        }

        case GraphicsCommandType.ROUNDED_RECT: {
          const x = cmd.getNumber(0);
          const y = cmd.getNumber(1);
          const width = cmd.getNumber(2);
          const height = cmd.getNumber(3);
          const radius = cmd.getNumber(4);

          ctx.moveTo(x * r - px, (y + radius) * r - py);
          ctx.quadraticCurveTo(x * r - px, y * r - py, (x + radius) * r - px, y * r - py);
          ctx.lineTo((x + width - radius) * r - px, y * r - py);
          ctx.quadraticCurveTo((x + width) * r - px, y * r - py, (x + width) * r - px, (y + radius) * r - py);
          ctx.lineTo((x + width) * r - px, (y + height - radius) * r - py);
          ctx.quadraticCurveTo((x + width) * r - px, (y + height) * r - py, (x + width - radius) * r - px, (y + height) * r - py);
          ctx.lineTo((x + radius) * r - px, (y + height) * r - py);
          ctx.quadraticCurveTo(x * r - px, (y + height) * r - py, x * r - px, (y + height - radius) * r - py);
          ctx.closePath();
          break;
        }

        case GraphicsCommandType.BEZIER_CURVE_TO: {
          ctx.bezierCurveTo(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py, cmd.getNumber(2) * r - px, cmd.getNumber(3) * r - py, cmd.getNumber(4) * r - px, cmd.getNumber(5) * r - py);
          break;
        }
        case GraphicsCommandType.QUADRATIC_CURVE_TO: {
          ctx.quadraticCurveTo(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py, cmd.getNumber(2) * r - px, cmd.getNumber(3) * r - py);
          break;
        }
        case GraphicsCommandType.BEGIN_PATH: {
          ctx.beginPath();
          break;
        }
        case GraphicsCommandType.CLOSE_PATH: {
          ctx.closePath();
          break;
        }
        case GraphicsCommandType.FILL: {
          ctx.fill(cmd.getBoolean(0) === true ? 'nonzero' : 'evenodd');
          break;
        }

        case GraphicsCommandType.LINE_TO: {
          ctx.lineTo(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py);
          break;
        }

        case GraphicsCommandType.MOVE_TO: {
          ctx.moveTo(cmd.getNumber(0) * r - px, cmd.getNumber(1) * r - py);
          break;
        }

        case GraphicsCommandType.LINE_DASH: {
          ctx.setLineDash(cmd.getNumber(0));
          break;
        }

        case GraphicsCommandType.STROKE: {
          ctx.stroke();
          break;
        }

        case GraphicsCommandType.SHADOW_BLUR: {
          ctx.shadowBlur = cmd.getNumber(0) * r;
          break;
        }

        case GraphicsCommandType.SHADOW_COLOR: {
          let stringColor = ColorHelper.intToRGBA(color === null ? cmd.getNumber(0) : /** @type {number} */(color), cmd.getNumber(1));
          ctx.shadowColor = stringColor;
          break;
        }

        case GraphicsCommandType.BOUNDS: {
          break;
        }

        default:
          Debug.error(`Unsupported canvas command '${cmd.type}'.`);
          break;
      }
    }

    for (let i = 0, l = node.mNodes.length; i < l; i++)
      this.__renderNode(driver, color, node.mNodes[i], transform);
  }
}

/**
 * Base class for custom video drivers. VideoDriver is used to render things onto the screen.
 *
 * @cat drivers
 */
class VideoNullDriver {
  /**
   * Creates new instance of VideoNullDriver.
   *
   * @param  {HTMLElement} containerElement The HTML element container for rendering.
   * @param  {number} width                 The width of the viewport.
   * @param  {number} height                The height of the viewport.
   */
  constructor(containerElement, width, height) {

    /** 
     * @protected 
     * @type {HTMLElement} 
     */
    this.mContainerElement = containerElement;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mClientWidth = width;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mClientHeight = height;

    /** 
     * @protected 
     * @type {black-engine~Matrix} Actual object - do not change 
     */
    this.mTransform = new Matrix();

    /** 
     * @protected 
     * @type {black-engine~Matrix} 
     */
    this.mIdentityMatrix = new Matrix();

    /** 
     * @protected 
     * @type {black-engine~RenderSession} 
     */
    this.mActiveSession = new RenderSession();

    /** 
     * @protected 
     * @type {Array<black-engine~RenderSession>} 
     */
    this.mSessions = [];

    /** 
     * @protected 
     * @type {*} 
     */
    this.mLastRenderTexture = null;

    /** 
     * @protected 
     * @type {boolean} 
     */
    this.mSnapToPixels = false;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mDevicePixelRatio = Black.engine.useHiDPR === true ? Black.device.getDevicePixelRatio() : 1;

    /** 
     * @protected 
     * @type {black-engine~BlendMode|null} 
     */
    this.mGlobalBlendMode = BlendMode.AUTO;

    /** 
     * @protected 
     * @type {number} 
     */
    this.mGlobalAlpha = 1;

    /** 
     * @protected 
     * @type {black-engine~Renderer} 
     */
    this.mStageRenderer = new Renderer();

    /** 
     * @protected 
     * @type {Object.<string, function(new: black-engine~Renderer)>} 
     */
    this.mRendererMap = {};

    Black.engine.viewport.on('resize', this.__onResize, this);
  }

  /**
   * A main render function.
   *
   * @public
   * @param {black-engine~GameObject} gameObject                    A GameObject instance to render onto RenderTarget.
   * @param {black-engine~CanvasRenderTexture} [renderTexture=null] Destination surface to render game object on. Will be rendered
   *                                                   onto backbuffer if null.
   * @param {black-engine~Matrix} [customTransform=null]            An optional extra offset.
   */
  render(gameObject, renderTexture = null, customTransform = null) {
  }

  /**
   * A factory method which returns new Renderer instance based on internal GameObject to Renderer map.
   *
   * @param {string} type      The type of the GameObject to find renderer for.
   * @param {black-engine~GameObject} owner The owner of this renderer.
   * @returns {black-engine~Renderer} New renderer instance.
   */
  getRenderer(type, owner) {
    return null;
  }

  /**
   * @ignore
   * @private
   * @returns {black-engine~RenderSession}
   */
  __saveSession() {
    let session = VideoNullDriver.sessionPool.get();
    session.reset();

    this.mSessions.push(session);

    this.mActiveSession = session;
    return session;
  }

  /**
   * @ignore
   * @private
   */
  __restoreSession() {
    this.mSessions.pop();
    this.mActiveSession = this.mSessions[this.mSessions.length - 1] || null;
  }

  /**
   * @ignore
   * @protected
   * @param {black-engine~RenderSession} session
   * @param {black-engine~GameObject} gameObject
   * @param {black-engine~Renderer} parentRenderer
   * @returns {void}
   */
  __collectParentRenderables(session, gameObject, parentRenderer) {
    let current = gameObject;
    if (current === null)
      return;

    let parents = [];
    for (current = current.parent; current !== null; current = current.parent)
      parents.splice(0, 0, current);

    for (let i = 0; i < parents.length; i++) {
      current = parents[i];

      let renderer = current.mRenderer;

      if (renderer == null)
        continue;

      session.parentRenderers.push(renderer);
      renderer.parent = parentRenderer;
      parentRenderer = renderer;

      renderer.preRender(this, session);

      if (renderer.endPassRequired === true)
        session.endPassParentRenderers.push(renderer);
    }
  }

  /**
   * Notifies renderer about new clipping.
   *
   * @protected
   * @param {black-engine~Rectangle} clipRect The region to clip.
   * @param {number} px Pivot-x.
   * @param {number} py Pivot-y.
   */
  beginClip(clipRect, px, py) {
  }

  /**
   * Notifies renderer to stop last clipping.
   * @protected
   */
  endClip() {
  }

  /**
   * @protected
   * @ignore
   * @param {black-engine~Message} msg
   * @param {black-engine~Rectangle} rect
   * @returns {void}
   */
  __onResize(msg, rect) {
    Renderer.__dirty = true;

    let w = this.mContainerElement.clientWidth;
    let h = this.mContainerElement.clientHeight;

    this.mClientWidth = w;
    this.mClientHeight = h;
  }

  /**
   * Initialization function.
   *
   * @protected
   * @return {void}
   */
  start() {
  }

  /**
   * Called before rendering anything. Usually used to clear back-buffer.
   *
   * @protected
   * @returns {void}
   */
  beginFrame() {
    this.clear();
  }

  /**
   * Called after rendering is finished.
   *
   * @protected
   * @returns {void}
   */
  endFrame() {
  }

  /**
   * @param {HTMLCanvasElement} canvas
   * @return {?black-engine~Texture}
   */
  getTextureFromCanvas(canvas) {
    return null;
  }

  /**
   * Sets world transformation for future use.
   *
   * @public
   * @param {black-engine~Matrix} m An transformation matrix to store.
   * @returns {void}
   */
  setTransform(m) {
    this.mTransform = m;
  }

  /**
   * Indicates if transform should be snapped to pixels.
   * @param {boolean} value 
   * @returns {void}
   */
  setSnapToPixels(value) {
    this.mSnapToPixels = value;
  }

  /**
   * Gets/Sets the global alpha. Used to calculate alpha relative to parent object.
   *
   * @protected
   * @return {number}
   */
  getGlobalAlpha() {
    return this.mGlobalAlpha;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  setGlobalAlpha(value) {
    this.mGlobalAlpha = value;
  }

  /**
   * Gets/Sets global blending mode. Used to calculate blend mode relative to parent object.
   *
   * @return {?black-engine~BlendMode}
   */
  getGlobalBlendMode() {
    return this.mGlobalBlendMode;
  }

  /**
   * @param {?black-engine~BlendMode} value
   * @return {void}
   */
  setGlobalBlendMode(value) {
    this.mGlobalBlendMode = value;
  }

  /**
   * Draws texture onto back-buffer. alpha, blend mode and transformation matrix must be set prior to calling this
   * method.
   *
   * @public
   * @param {black-engine~Texture} texture Instance of the Texture to draw.
   * 
   */
  drawTexture(texture) {
  }

  /**
   * Draws texture onto back-buffer with given offset. alpha, blend mode and transformation matrix must be set prior to calling this
   * method.
   *
   * @param {black-engine~Texture} texture Instance of the Texture to draw.
   * @param {number} ox Offset along x-axis
   * @param {number} oy Offset along y-axis
   */
  drawTextureWithOffset(texture, ox, oy) {
  }

  /**
   * Clears back-buffer.
   *
   * @protected
   * @returns {void}
   */
  clear() {
  }

  /**
   * Disposes all allocated resources.
   */
  dispose() {
    VideoNullDriver.sessionPool.releaseAll();
  }

  /** 
   * Returns current rendering context or null.
   * @returns {*}
   */
  get context() {
    return null;
  }

  /**
   * Returns device pixel ratio or 1 in case high DPR support is disabled.
   * 
   * @returns {number}
   */
  get renderScaleFactor() {
    return this.mDevicePixelRatio;
  }
}

/**
 * Recyclable session pool. Do not recycle manually.
 *
 * @type {black-engine~ObjectPool}
 * @nocollapse
 */
VideoNullDriver.sessionPool = new ObjectPool(RenderSession);

/**
 * Video driver responsible for rendering game objects onto HTML canvas element.
 *
 * @extends black-engine~VideoNullDriver
 * @cat drivers.canvas
 */
class CanvasDriver extends VideoNullDriver {
  /**
   * Creates new instance of CanvasDriver
   *
   * @param {HTMLElement} containerElement The DOM element to draw into.
   * @param {number} width                 The width of the viewport.
   * @param {number} height                The height of the viewport.
   */
  constructor(containerElement, width, height) {
    super(containerElement, width, height);

    /** 
     * @private 
     * @type {CanvasRenderingContext2D|null} 
     */
    this.mCtx = null;

    this.__createCanvas();

    /**
     * @private 
     * @inheritDoc 
     */
    this.mRendererMap = {
      'DisplayObject': DisplayObjectRendererCanvas,
      'Sprite': SpriteRendererCanvas,
      'Emitter': EmitterRendererCanvas,
      'Text': TextRendererCanvas,
      'BitmapText': BitmapTextRendererCanvas,
      'Graphics': GraphicsRendererCanvas
    };
  }

  getRenderer(type, owner) {
    let renderer = new this.mRendererMap[type]();
    renderer.gameObject = /** @type {DisplayObject} */ (owner);
    return renderer;
  }

  /**
   * @inheritDoc
   */
  render(gameObject, renderTexture = null, customTransform = null) {
    let isBackBufferActive = renderTexture === null;

    if (Renderer.skipUnchangedFrames === true && isBackBufferActive === true && Renderer.__dirty === false)
      return;

    let session = this.__saveSession();
    session.isBackBufferActive = isBackBufferActive;
    session.customTransform = customTransform;

    let parentRenderer = this.mStageRenderer;

    // RenderTexture related
    if (renderTexture !== null) {
      // Swap context
      this.mLastRenderTexture = this.mCtx;
      this.mCtx = renderTexture.renderTarget.context;

      // clear context cache
      this.mGlobalAlpha = -1;
      this.mGlobalBlendMode = null;

      parentRenderer.alpha = 1;
      parentRenderer.blendMode = BlendMode.NORMAL;
      parentRenderer.color = null;

      // collect parents of given GameObject
      this.__collectParentRenderables(session, gameObject, this.mStageRenderer);

      for (let i = 0, len = session.parentRenderers.length; i !== len; i++) {
        let renderer = session.parentRenderers[i];
        renderer.begin(this, session);

        if (renderer.skipSelf === false)
          renderer.upload(this, session);
      }

      if (session.parentRenderers.length > 0)
        parentRenderer = session.parentRenderers[session.parentRenderers.length - 1];
    }

    this.renderObject(gameObject, session, parentRenderer);

    if (renderTexture !== null) {
      while (session.endPassParentRenderers.length > 0)
        session.endPassParentRenderers.pop().end(this, session);

      this.mCtx = this.mLastRenderTexture;

      this.mGlobalAlpha = -1;
      this.mGlobalBlendMode = null;
    }

    this.__restoreSession();
  }

  /**
   * @ignore
   * @param {black-engine~GameObject} child 
   * @param {black-engine~RenderSession} session 
   * @param {black-engine~Renderer} parentRenderer
   */
  renderObject(child, session, parentRenderer) {
    let skipChildren = false;
    let renderer = /** @type {DisplayObject} */ (child).mRenderer;

    if (renderer != null) {
      renderer.parent = parentRenderer;
      renderer.preRender(this, session);

      for (let i = 0; i < child.mComponents.length; i++) {
        const comp = child.mComponents[i];
        comp.onRender();
      }
      /** @type {DisplayObject} */ (child).onRender();

      renderer.begin(this, session);

      if (renderer.skipSelf === false) {
        renderer.upload(this, session);
        renderer.render(this, session);
      }

      skipChildren = renderer.skipChildren;
    }

    if (skipChildren === false) {
      for (let i = 0; i < child.mChildren.length; i++)
        this.renderObject(child.mChildren[i], session, renderer || parentRenderer);
    }

    if (renderer != null && renderer.endPassRequired === true)
      renderer.end(this, session);
  }

  /**
   * @ignore
   * @private
   * @return {void}
   */
  __createCanvas() {
    let dpr = this.mDevicePixelRatio;

    let cvs = /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));
    cvs.style.position = 'absolute';
    cvs.id = 'canvas';

    cvs.width = this.mClientWidth * dpr;
    cvs.height = this.mClientHeight * dpr;
    cvs.style.width = this.mClientWidth + 'px';
    cvs.style.height = this.mClientHeight + 'px';

    this.mContainerElement.appendChild(cvs);

    this.mCtx = /** @type {CanvasRenderingContext2D} */ (cvs.getContext('2d'));
  }

  /**
   * @ignore
   * @protected
   * @param {black-engine~Message} msg
   * @param {black-engine~Rectangle} rect
   * @returns {void}
   */
  __onResize(msg, rect) {
    super.__onResize(msg, rect);

    // canvas will reset state after changing size
    this.mGlobalBlendMode = null;
    this.mGlobalAlpha = -1;

    let dpr = this.mDevicePixelRatio;
    this.mCtx.canvas.width = this.mClientWidth * dpr;
    this.mCtx.canvas.height = this.mClientHeight * dpr;
    this.mCtx.canvas.style.width = this.mClientWidth + 'px';
    this.mCtx.canvas.style.height = this.mClientHeight + 'px';
  }

  /**
   * @inheritDoc
   */
  drawTexture(texture) {
    if (texture.isValid === false)
      return;

    let dpr = this.mDevicePixelRatio;

    let sourceX = texture.region.x;
    let sourceY = texture.region.y;
    let sourceWidth = texture.region.width;
    let sourceHeight = texture.region.height;

    let destX = texture.untrimmedRegion.x * dpr;
    let destY = texture.untrimmedRegion.y * dpr;
    let destWidth = texture.renderWidth * dpr;
    let destHeight = texture.renderHeight * dpr;

    this.mCtx.drawImage(texture.native, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
  }

  /**
   * @inheritDoc
   */
  drawTextureWithOffset(texture, ox, oy) {
    if (texture.isValid === false)
      return;

    let dpr = this.mDevicePixelRatio;

    let sourceX = texture.region.x;
    let sourceY = texture.region.y;
    let sourceWidth = texture.region.width;
    let sourceHeight = texture.region.height;

    let destX = (ox + texture.untrimmedRegion.x) * dpr;
    let destY = (oy + texture.untrimmedRegion.y) * dpr;
    let destWidth = texture.renderWidth * dpr;
    let destHeight = texture.renderHeight * dpr;

    this.mCtx.drawImage(texture.native, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
  }

  /**
   * @inheritDoc
   */
  beginClip(clipRect, px, py) {
    let dpr = this.mDevicePixelRatio;

    this.mCtx.save();
    this.mCtx.beginPath();
    this.mCtx.rect((clipRect.x + px) * dpr, (clipRect.y + py) * dpr, clipRect.width * dpr, clipRect.height * dpr);

    this.mCtx.clip();
  }

  /**
   * @inheritDoc
   */
  endClip() {
    this.mCtx.restore();

    this.mGlobalAlpha = -1;
    this.mGlobalBlendMode = null;
  }

  /**
   * @inheritDoc
   */
  setTransform(transform) {
    let dpr = this.mDevicePixelRatio;
    let session = this.mActiveSession;

    if (session.isBackBufferActive === false) {
      if (session.customTransform === null) {
        transform = transform.clone(); // TODO: too much allocations
        transform.data[4] -= Black.stage.mX;
        transform.data[5] -= Black.stage.mY;
      } else {
        transform = transform.clone(); // TODO: too much allocations
        transform.prepend(session.customTransform);
      }
    }

    if (Black.camera !== null) {
      transform = transform.clone();
      transform.prepend(Black.camera.worldTransformationInverted);
    }

    this.mTransform = transform;

    let mv = transform.value;
    Debug.isNumber(mv[0], mv[1], mv[2], mv[3], mv[4], mv[5]);

    if (this.mSnapToPixels === true)
      this.mCtx.setTransform(mv[0], mv[1], mv[2], mv[3], (mv[4] * dpr) | 0, (mv[5] * dpr) | 0);
    else
      this.mCtx.setTransform(mv[0], mv[1], mv[2], mv[3], mv[4] * dpr, mv[5] * dpr);
  }

  /**
   * @inheritDoc
   */
  setGlobalAlpha(value) {
    Debug.isNumber(value);

    if (value == this.mGlobalAlpha)
      return;

    this.mGlobalAlpha = value;
    this.mCtx.globalAlpha = value;
  }

  /**
   * @inheritDoc
   */
  setGlobalBlendMode(blendMode) {
    if (blendMode === BlendMode.AUTO)
      return;

    blendMode = CanvasBlendMode[blendMode];

    if (this.mGlobalBlendMode === blendMode)
      return;

    this.mGlobalBlendMode = blendMode;
    this.mCtx.globalCompositeOperation = blendMode;
  }

  /**
   * @inheritDoc
   */
  clear() {
    if (Renderer.skipUnchangedFrames === true && Renderer.__dirty === false)
      return;

    // TODO: clear only changed region
    this.mCtx.setTransform(1, 0, 0, 1, 0, 0);

    let viewport = Black.engine.viewport;
    if (viewport.isTransparent === false) {
      this.mCtx.fillStyle = ColorHelper.hexColorToString(viewport.backgroundColor);
      this.mCtx.fillRect(0, 0, viewport.size.width * this.mDevicePixelRatio, viewport.size.height * this.mDevicePixelRatio);
    } else {
      this.mCtx.clearRect(0, 0, viewport.size.width * this.mDevicePixelRatio, viewport.size.height * this.mDevicePixelRatio);
    }
  }

  /**
   * @inheritDoc
   */
  getTextureFromCanvas(canvas) {
    return new Texture(canvas);
  }

  /**
   * @override
   */
  dispose() {
    super.dispose();

    if (this.mCtx !== null)
      this.mCtx.canvas.remove();
  }

  /** 
   * Returns current rendering context or null.
   * @returns {CanvasRenderingContext2D}
   */
  get context() {
    return this.mCtx;
  }
}

/**
 * Class that holds information about tiling,
 * @cat display
 */
class TilingInfo {
  /**
   * Creates new TilingInfo instance.
   * 
   * @param {number} width  The width of destination texture.
   * @param {number} height The height of destination texture.
   * @param {number} scaleX Indicates how much source texture should be scaled along x-axis.
   * @param {number} scaleY Indicates how much source texture should be scaled along y-axis.
   * @param {number} wrapX  Indicates how many pixels needs to be wrapped around along x-axis.
   * @param {number} wrapY  Indicates how many pixels needs to be wrapped around along y-axis.
   */
  constructor(width = 0, height = 0, scaleX = 1, scaleY = 1, wrapX = 0, wrapY = 0) {
    /**
     * The width of destination texture.
     * @type {number}
     */
    this.width = width;

    /**
     * The height of destination texture.
     * @type {number}
     */
    this.height = height;

    /**
     * Indicates how much source texture should be scaled along x-axis.
     * @type {number}
     */
    this.scaleX = scaleX;

    /**
     * Indicates how much source texture should be scaled along y-axis.
     * @type {number}
     */
    this.scaleY = scaleY;

    /**
     * Indicates how many pixels needs to be wrapped around along x-axis.
     * @type {number}
     */
    this.wrapX = wrapX;

    /**
     * Indicates how many pixels needs to be wrapped around along y-axis.
     * @type {number}
     */
    this.wrapY = wrapY;
  }
}

/**
 * Sprite is used to render Texture onto screen.
 *
 * @cat display
 * @extends black-engine~DisplayObject
 */
class Sprite extends DisplayObject {
  /**
   * Creates a new Sprite instance.
   *
   * @param {black-engine~Texture|string|null} texture The Texture instance or null.
   */
  constructor(texture = null, useTextureProps = true) {
    super();

    /** 
     * @private 
     * @type {black-engine~Texture|null} 
     */
    this.mTexture = null;

    /** 
     * @private 
     * @type {string|null} 
     */
    this.mTextureName = null;

    /** 
     * @private 
     * @type {black-engine~TilingInfo|null} 
     */
    this.mTiling = null;

    /** 
     * @private 
     * @type {black-engine~Rectangle|null} 
     */
    this.mSlice9grid = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mUseTextureProps = useTextureProps;

    if (texture !== null && texture.constructor === String) {
      this.mTextureName = /** @type {string} */ (texture);
      this.texture = Black.assets.getTexture(/** @type {string} */(texture));
    } else {
      this.texture = /** @type {Texture} */ (texture);
    }
  }

  /**
   * @inheritDoc
   */
  getRenderer() {
    return Black.driver.getRenderer('Sprite', this);
  }

  /**
   * Returns a rectangle that completely encloses the object in local coordinate system.
   *
   * @protected
   * @param {black-engine~Rectangle=} outRect Rectangle to be returned.
   * @return {black-engine~Rectangle} The new Rectangle or outRect if it was passed as a param.
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    if (!this.mTexture)
      return outRect;

    if (this.mClipRect !== null)
      this.mClipRect.copyTo(outRect);
    else if (this.tiling !== null)
      outRect.set(0, 0, this.tiling.width, this.tiling.height);
    else
      outRect.set(0, 0, this.mTexture.displayWidth, this.mTexture.displayHeight);

    return outRect;
  }

  /**
   * Returns the current Texture on this sprite.
   *
   * @return {black-engine~Texture|null} The current texture set on this Sprite or null.
   */
  get texture() {
    return this.mTexture;
  }

  /**
   * Sets the Texture on this sprite by name.
   * Only Black.assets is used.
   *
   * @param {black-engine~Texture|null} texture Texture to apply on.
   * @return {void}
   */
  set texture(texture) {
    if (this.mTexture === texture)
      return;

    if (texture === null) {
      this.mTexture = null;
      this.mTextureName = null;

      this.setDirty(DirtyFlag.RENDER_CACHE, false);
      this.setRenderDirty();
      return;
    }

    this.mTexture = texture;

    if (this.mUseTextureProps === true) {
      if (texture.slice9borders)
        this.slice9grid = texture.slice9borders.clone();

      if (texture.registrationPoint !== null)
        this.alignPivotOffset(texture.registrationPoint.x, texture.registrationPoint.y);
    }

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setRenderDirty();
  }

  /**
   * Returns the current texture name.
   *
   * @return {?string}
   */
  get textureName() {
    return this.mTextureName;
  }

  /**
   * Sets the current texture by its name
   *
   * @param {?string} value
   */
  set textureName(value) {
    if (this.mTextureName === value)
      return;

    if (value === null) {
      this.texture = null;
      return;
    }

    this.mTextureName = value;
    this.texture = Black.assets.getTexture(/** @type {string} */(value));
  }

  /**
   * Gets sets tiling information.
   *
   * NOTE: after changing one of TilingInfo properties make sure to call `setDirty(DirtyFlag.RENDER_CACHE)`.
   *
   * @returns {black-engine~TilingInfo|null}
   */
  get tiling() {
    return this.mTiling;
  }

  /**
   * @param {black-engine~TilingInfo|null} value
   */
  set tiling(value) {
    this.mTiling = value;

    this.setRenderDirty();
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * Gets/sets nine slice grid rectangle.
   *
   * NOTE: after changing x, y, width or height of nine slice grid attributes make sure to call `setDirty(DirtyFlag.RENDER_CACHE)` to refresh renderer.
   *
   * @returns {black-engine~Rectangle|null}
   */
  get slice9grid() {
    return this.mSlice9grid;
  }

  /**
   * @param {black-engine~Rectangle|null} value
   */
  set slice9grid(value) {
    this.mSlice9grid = value;

    this.setRenderDirty();
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }
}

/**
 * @cat display.text
 * @static
 * @constant
 * @enum {string}
 */
const FontAlign = {
  NONE: 'none',
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center'
};

/**
 * @cat display.text
 * @static
 * @constant
 * @enum {string}
 */
const FontVerticalAlign = {
  TOP: 'top',
  MIDDLE: 'middle',
  BOTTOM: 'bottom'
};

/**
 * This class is used to create display text.
 *
 * @cat display.text
 * @fires TextField#change
 * @extends black-engine~DisplayObject
 */
class TextField extends DisplayObject {
  /**
   * Creates new instance of TextField
   * 
   * @param {string=} [text=''] Text to be displayed inside this text field
   * @param  {string=} family                                             Font name
   * @param  {number=} [color=0x0]                                        Text color as hexadecimal number eg 0xff0000 (total red)
   * @param  {number=} [size=14]                                          Text size
   * @param  {black-engine~FontStyle=} [style=black-engine~FontStyle.NORMAL]    Text style eg italic
   * @param  {black-engine~FontWeight=} [weight=black-engine~FontWeight.NORMAL] Font thickness. The value is set from 100 to 900 in increments of 100.
   * @param  {number=} [strokeThickness=0]                                Thickness of the stroke. 0 means that no stroke
   * @param  {number=} [strokeColor=0xffffff]                             Stroke color as hexadecimal number eg 0x00ff00 (total green)
   */
  constructor(text = '', family = 'sans-serif', color = 0x000000, size = 14, style = FontStyle.NORMAL, weight = FontWeight.NORMAL, strokeThickness = 0, strokeColor = 0xffffff) {
    super();

    /** 
     * @private 
     * @type {string} 
     */
    this.mText = text;

    /** 
     * @private 
     * @type {black-engine~Rectangle} 
     */
    this.mCacheBounds = new Rectangle();

    /** 
     * @private 
     * @type {number} 
     */
    this.mTextWidth = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mTextHeight = 0;

    /** 
     * @private 
     * @type {black-engine~TextStyle} 
     */
    this.mDefaultStyle = new TextStyle(family, color, size, style, weight, strokeThickness, strokeColor);

    /** 
     * @private 
     * @type {Object.<string,black-engine~TextStyle>} 
     */
    this.mStyles = {};

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mAutoSize = true;

    /** 
     * @private 
     * @type {black-engine~FontAlign} 
     */
    this.mAlign = FontAlign.LEFT;

    /** 
     * @private 
     * @type {black-engine~FontVerticalAlign} 
     */
    this.mVerticalAlign = FontVerticalAlign.MIDDLE;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mMultiline = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mLineHeight = 1.2;

    /** 
     * @private 
     * @type {black-engine~Rectangle} 
     */
    this.mTextBounds = new Rectangle();

    /** 
     * @private 
     * @type {number} 
     */
    this.mFieldWidth = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mFieldHeight = 0;

    /** 
     * @private 
     * @type {black-engine~Rectangle} 
     */
    this.mPadding = new Rectangle(0, 0, 0, 0);

    /** 
     * @private 
     * @type {black-engine~TextMetricsData|null} 
     */
    this.mMetrics = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mHighQuality = false;
  }

  /**
   * @inheritDoc
   */
  getRenderer() {
    return Black.driver.getRenderer('Text', this);
  }

  /**
   * @inheritDoc
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    if (this.mDirty & DirtyFlag.RENDER_CACHE) {
      let text = this.text;
      if (this.mMultiline === false)
        text = text.replace(/\n/g, '');

      let styles = [this.mDefaultStyle];

      for (let key in /** @type {!Object} */(this.mStyles)) {
        styles.push(this.mStyles[key]);
      }

      this.mMetrics = TextMetricsEx.measure(text, this.mLineHeight, ...styles);
      this.mTextBounds.copyFrom(this.mMetrics.bounds);
    }

    if (this.mClipRect !== null) {
      this.mClipRect.copyTo(outRect);
      return outRect;
    }

    if (this.mAutoSize === false) {
      outRect.width = this.mFieldWidth;
      outRect.height = this.mFieldHeight;
    } else {
      outRect.width = this.mTextBounds.width;
      outRect.height = this.mTextBounds.height;
    }

    outRect.width += this.mPadding.right;
    outRect.height += this.mPadding.bottom;

    return outRect;
  }

  /**
   * Adds or updates given text style by given tag name.
   * 
   * @param {string} name 
   * @param {black-engine~TextStyle} style 
   */
  setStyle(name, style) {
    Debug.assert(name !== 'def', `Please use 'setDefaultStyle' instead.`);
    style.name = name;

    this.mStyles[name] = style;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Updates default text style with a given one.
   * 
   * @param {black-engine~TextStyle} style 
   */
  setDefaultStyle(style) {
    this.mDefaultStyle = style;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Removes style by given name.
   * 
   * @param {string} name 
   */
  removeStyle(name) {
    delete this.mStyles[name];

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Returns text style by given name or null if not found.
   * 
   * @param {string} name 
   * @return {black-engine~TextStyle} 
   */
  getStyle(name) {
    return this.mStyles.hasOwnProperty(name) ? this.mStyles[name] : null;
  }

  /**
   * Returns an array of all not default styles.
   * 
   * @return {Array<black-engine~TextStyle>} 
   */
  getAllStyles() {
    let styles = [];
    for (let s in this.mStyles)
      styles.push(this.mStyles[s]);
    return styles;
  }

  /**
   * Returns default text style.
   */
  getDefaultStyle(name) {
    return this.mDefaultStyle;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set multiline(value) {
    this.mMultiline = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Get/Set multiLine value switcher.
   *
   * @return {boolean}
   */
  get multiline() {
    return this.mMultiline;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set lineHeight(value) {
    this.mLineHeight = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Get/Set lines vertical offset. From top previous to top next line.
   *
   * @return {number}
   */
  get lineHeight() {
    return this.mLineHeight;
  }

  /**
   * Get/Set text size.
   *
   * @return {number}
   */
  get size() {
    return this.mDefaultStyle.size;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set size(value) {
    if (this.mDefaultStyle.size === value)
      return;

    this.mDefaultStyle.size = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Get/Set text font.
   *
   * @return {string}
   */
  get font() {
    return this.mDefaultStyle.family;
  }

  /**
   * @param {string} value
   * @return {void}
   */
  set font(value) {
    if (this.mDefaultStyle.family === value)
      return;

    this.mDefaultStyle.family = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Specifies text color as hexadecimal number eg 0xff0000 (total red).
   *
   * @return {number}
   */
  get textColor() {
    return this.mDefaultStyle.color;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set textColor(value) {
    if (this.mDefaultStyle.color === value)
      return;

    this.mDefaultStyle.color = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Gets/sets text alpha in range [0..1].
   * NOTE: This property will affect shadow alpha.
   *
   * @return {number}
   */
  get textAlpha() {
    return this.mDefaultStyle.alpha;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set textAlpha(value) {
    if (this.mDefaultStyle.alpha === value)
      return;

    this.mDefaultStyle.alpha = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Get/Set text style.
   *
   * @return {black-engine~FontStyle}
   */
  get fontStyle() {
    return this.mDefaultStyle.style;
  }

  /**
   * @param {black-engine~FontStyle} value
   * @return {void}
   */
  set fontStyle(value) {
    if (this.mDefaultStyle.style === value)
      return;

    this.mDefaultStyle.style = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Specifies the font thick. The value is set from 100 to 900 in increments of 100.
   *
   * @return {black-engine~FontWeight}
   */
  get weight() {
    return this.mDefaultStyle.weight;
  }

  /**
   * @param {black-engine~FontWeight} value
   * @return {void}
   */
  set weight(value) {
    if (this.mDefaultStyle.weight === value)
      return;

    this.mDefaultStyle.weight = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Specifies the horizontal alignment of the text (left | center | right).
   *
   * @return {black-engine~FontAlign}
   */
  get align() {
    return this.mAlign;
  }

  /**
   * @param {black-engine~FontAlign} value
   * @return {void}
   */
  set align(value) {
    if (this.mAlign === value)
      return;

    this.mAlign = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Specifies the vertical alignment of the text (top | middle | bottom).
   *
   * @return {black-engine~FontVerticalAlign}
   */
  get vAlign() {
    return this.mVerticalAlign;
  }

  /**
   * @param {black-engine~FontVerticalAlign} value
   * @return {void}
   */
  set vAlign(value) {
    if (this.mVerticalAlign === value)
      return;

    this.mVerticalAlign = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Specifies stroke color as hexadecimal number eg 0xff0000 (total red)
   * @return {number}
   */
  get strokeColor() {
    return this.mDefaultStyle.strokeColor;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set strokeColor(value) {
    if (this.mDefaultStyle.strokeColor === value)
      return;

    this.mDefaultStyle.strokeColor = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Gets/sets  stroke alpha in range [0..1].
   * @return {number}
   */
  get strokeAlpha() {
    return this.mDefaultStyle.strokeAlpha;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set strokeAlpha(value) {
    if (this.mDefaultStyle.strokeAlpha === value)
      return;

    this.mDefaultStyle.strokeAlpha = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Specifies the thickness of the stroke. 0 means that no stroke.
   * Note: if autoSize is true stroke works like filter meaning that position of the text will not be adjusted and bounds will be the same.
   * 
   * @return {number} 
   */
  get strokeThickness() {
    return this.mDefaultStyle.strokeThickness;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set strokeThickness(value) {
    if (value === this.mDefaultStyle.strokeThickness)
      return;

    this.mDefaultStyle.strokeThickness = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Specifies the width of the text field. If autoSize set as false
   *
   * @return {number}
   */
  get fieldWidth() {
    return this.mFieldWidth;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set fieldWidth(value) {
    if (value === this.mFieldWidth)
      return;

    this.mFieldWidth = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /** Specifies the height of the text field, if autoSize set as false
   *
   * @return {number}
   */
  get fieldHeight() {
    return this.mFieldHeight;
  }


  /**
   * @param {number} value
   * @return {void}
   */
  set fieldHeight(value) {
    if (value === this.mFieldHeight)
      return;

    this.mFieldHeight = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Text to be displayed inside this text field.
   * @return {string}
   */
  get text() {
    return this.mText;
  }

  /**
   * @param {string} value
   * @return {void}
   */
  set text(value) {
    if (this.mText === value)
      return;

    this.mText = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();

    /**
     * Posts every time text has been changed.
     * @event TextField#change
     */
    this.post(Message.CHANGE);
  }

  /**
   * Determines whether the size of the field will adjust to the size of the text. Note: if this set as true, you need to specify fieldHeight and fieldWidth manually
   *
   * @return {boolean}
   */
  get autoSize() {
    return this.mAutoSize;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set autoSize(value) {
    if (this.mAutoSize === value)
      return;

    this.mAutoSize = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * An extra padding. Also useful for bad prepared fonts.
   *
   * @return {black-engine~Rectangle}
   */
  get padding() {
    return this.mPadding;
  }

  /**
   * @param {black-engine~Rectangle} value
   * @return {void}
   */
  set padding(value) {
    this.mPadding = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Gets sets whenever to drop shadow or not.
   * 
   * @return {boolean} 
   */
  get dropShadow() {
    return this.mDefaultStyle.dropShadow;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set dropShadow(value) {
    if (value === this.mDefaultStyle.dropShadow)
      return;

    this.mDefaultStyle.dropShadow = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }

  /**
   * Gets/sets the color of the shadow.
   * 
   * @return {number} 
   */
  get shadowColor() {
    return this.mDefaultStyle.shadowColor;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set shadowColor(value) {
    if (value === this.mDefaultStyle.shadowColor)
      return;

    this.mDefaultStyle.shadowColor = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Gets/sets alpha component of the shadows.
   * 
   * @return {number} 
   */
  get shadowAlpha() {
    return this.mDefaultStyle.shadowAlpha;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set shadowAlpha(value) {
    if (value === this.mDefaultStyle.shadowAlpha)
      return;

    this.mDefaultStyle.shadowAlpha = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Gets/sets the shadow blur radius.
   * 
   * @return {number} 
   */
  get shadowBlur() {
    return this.mDefaultStyle.shadowBlur;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set shadowBlur(value) {
    if (value === this.mDefaultStyle.shadowBlur)
      return;

    this.mDefaultStyle.shadowBlur = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Gets/sets shadow distance on x axis.
   * 
   * @return {number} 
   */
  get shadowDistanceX() {
    return this.mDefaultStyle.shadowDistanceX;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set shadowDistanceX(value) {
    if (value === this.mDefaultStyle.shadowDistanceX)
      return;

    this.mDefaultStyle.shadowDistanceX = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Gets/sets shadow distance on y axis.
   * 
   * @return {number} 
   */
  get shadowDistanceY() {
    return this.mDefaultStyle.shadowDistanceY;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set shadowDistanceY(value) {
    if (value === this.mDefaultStyle.shadowDistanceY)
      return;

    this.mDefaultStyle.shadowDistanceY = value;
    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.RENDER_CACHE | DirtyFlag.RENDER), false);
  }

  /**
   * Gets/sets render quality of this text field. False by default.
   * When true font will respect object's scale and device pixel ratio. The downside is it may cause font shaking when animating.
   * 
   * @returns {boolean}
   */
  get highQuality() {
    return this.mHighQuality;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set highQuality(value) {
    this.mHighQuality = value;

    this.setDirty(DirtyFlag.RENDER_CACHE, false);
    this.setTransformDirty();
  }
}

/**
 * This class is used to create display text.
 *
 * @cat display.text
 * @extends black-engine~DisplayObject
 */
class BitmapTextField extends DisplayObject {
  /**
   * Create new instance of BitmapTextField.
   *
   * @param {string|black-engine~BitmapFontData} font     The name of the bitmap font
   * @param {string=} text                   Text to be displayed inside this text field
   */
  constructor(font, text = '') {
    super();

    if (font !== null && font.constructor === String)
      this.mData = Black.assets.getBitmapFont(/** @type {string} */(font));
    else
      this.mData = /** @type {BitmapFontData} */ (font);

    /** 
     * @private 
     * @type {string} 
     */
    this.mText = text;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mAutoSize = true;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mMultiline = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mLineHeight = 1.2;

    /** 
     * @private 
     * @type {black-engine~Rectangle} 
     */
    this.mBounds = new Rectangle();

    /** 
     * @private 
     * @type {black-engine~Rectangle} 
     */
    this.mTextBounds = new Rectangle();

    /** 
     * @private 
     * @type {number} 
     */
    this.mFieldWidth = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mFieldHeight = 0;
  }

  /**
   * @inheritDoc
   */
  getRenderer() {
    return Black.driver.getRenderer('BitmapText', this);
  }

  /**
   * @inheritDoc
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    if (this.mClipRect !== null) {
      this.mClipRect.copyTo(outRect);
      return outRect;
    }

    if (this.mDirty & DirtyFlag.RENDER_CACHE) {
      let text = this.text;
      if (this.mMultiline === false)
        text = text.replace(/\n/g, '');

      TextMetricsEx.measureBitmap(text, this.mData, this.mLineHeight, this.mTextBounds);
    }

    if (this.mAutoSize === false) {
      outRect.width = this.mFieldWidth;
      outRect.height = this.mFieldHeight;
    } else {
      outRect.width = this.mTextBounds.width;
      outRect.height = this.mTextBounds.height;
    }

    return outRect;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set multiline(value) {
    this.mMultiline = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * Get/Set multiLine value switcher.
   *
   * @return {boolean}
   */
  get multiline() {
    return this.mMultiline;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set lineHeight(value) {
    this.mLineHeight = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * Get/Set lines vertical offset. From top previous to top next line.
   *
   * @return {number}
   */
  get lineHeight() {
    return this.mLineHeight;
  }

  /**
   * Specifies the width of the text field. If autoSize set as false
   *
   * @return {number}
   */
  get fieldWidth() {
    return this.mFieldWidth;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set fieldWidth(value) {
    if (value === this.mFieldWidth)
      return;

    this.mFieldWidth = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /** Specifies the height of the text field, if autoSize set as false
   *
   * @return {number}
   */
  get fieldHeight() {
    return this.mFieldHeight;
  }


  /**
   * @param {number} value
   * @return {void}
   */
  set fieldHeight(value) {
    if (value === this.mFieldHeight)
      return;

    this.mFieldHeight = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**Text to be displayed inside this text field.

   * @return {string}
   */
  get text() {
    return this.mText;
  }

  /**
   * @param {string} value
   * @return {void}
   */
  set text(value) {
    if (this.mText === value)
      return;

    this.mText = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }

  /**
   * Determines whether the size of the field will adjust to the size of the text. Note: if this set as true, you need to specify fieldHeight and fieldWidth manually
   *
   * @return {boolean}
   */
  get autoSize() {
    return this.mAutoSize;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set autoSize(value) {
    if (this.mAutoSize === value)
      return;

    this.mAutoSize = value;
    this.setDirty(DirtyFlag.RENDER_CACHE, false);
  }
}

/**
 * A base class for Vector scatters.
 *
 * @cat scatters
 * @extends black-engine~Scatter
 */
class VectorScatterBase extends Scatter {
  /**
   * Creates new VectorScatter instance.
   */
  constructor() {
    super();

    /**
     * Cached last value of `getValueAt` result.
     * 
     * @public
     * @readonly
     * @type {black-engine~Vector}
     */
    this.value = new Vector();
  }

  /**
   * Returns random value.
   *
   * @return {black-engine~Vector}.
   */
  getValue() {
    return this.getValueAt(Math.random());
  }
}

/**
 * A base class for color scatters.
 *
 * @cat scatters
 * @extends Scatter
 */
class ColorScatterBase extends Scatter {  
  constructor() {
    super();

    /**
     * Cached last value of `getValueAt` result.
     * 
     * @readonly
     * @type {number}
     */
    this.value = 0;
  }
    
  /**
   * Returns random value.
   *
   * @return {number}
   */
  getValue() {
    return this.getValueAt(Math.random());
  }
}

/**
 * A color scatter.
 *
 * @cat scatters
 * @extends black-engine~FloatScatterBase
 */
class ColorScatter extends ColorScatterBase {
  /**
   * Creates new ColorScatter instance.
   * 
   * @param {number} [startColor=0]
   * @param {number} [endColor=null]
   * @param {?function(number):number} [ease=null] Easing function. If null linear function is used as default.
   */
  constructor(startColor, endColor = null, ease = null) {
    super();

    /**
     * Defines starting color
     * 
     * @type {number}
     */
    this.startColor = startColor;

    /**
     * Defines ending color
     * 
     * @type {number}
     */
    this.endColor = endColor === null ? startColor : endColor;

    /**
     * Optional easing function.
     * 
     * @type {number}
     */
    this.ease = ease;
  }

  getValueAt(t) {
    if (this.ease !== null)
      t = this.ease(t);

    this.value = this.startColor === this.endColor ? this.startColor : ColorHelper.lerpHSV(this.startColor, this.endColor, t);

    return this.value;
  }

  /**
   * Creates new ColorScatterBase from a set of numbers.
   *
   * @param {...number|black-engine~ColorScatterBase} values Set of values.
   * @returns {black-engine~ColorScatterBase}
   */
  static fromObject(...values) {
    if (values[0] instanceof ColorScatterBase)
      return /** @type {ColorScatterBase} */ (values[0]);

    return new ColorScatter(...values);
  }
}

/**
 * A vector scatter for defining a range in 2D space.
 *
 * @cat scatters
 * @extends black-engine~VectorScatterBase
 */
class VectorScatter extends VectorScatterBase {
  /**
   * Creates new VectorScatter instance.
   *
   * @param {number}  [minX=0]                     The min value along x-axis.
   * @param {number}  [minY=0]                     The min value along y-axis.
   * @param {number=} [maxX=null]                  The max value along x-axis.
   * @param {number=} [maxY=null]                  The max value along y-axis.
   * @param {?function(number):number} [ease=null] Easing function. If null linear function is used as default.
   */
  constructor(minX = 0, minY = 0, maxX = null, maxY = null, ease = null) {
    super();

    /**
     * A min value along x-axis.
     * 
     * @type {number}
     */
    this.minX = minX;

    /**
     * A min value along y-axis.
     * 
     * @type {number}
     */
    this.minY = minY;

    /**
     * A max value along x-axis.
     * 
     * @type {number}
     */
    this.maxX = maxX === null ? minX : maxX;

    /**
     * A max value along y-axis.
     * 
     * @type {number}
     */
    this.maxY = maxY === null ? minY : maxY;

    /**
     * Optional easing function.
     * 
     * @type {?function(Vector):Vector}
     */
    this.ease = ease;
  }

  /**
   * Returns a random Vector object at given position within a specified range.
   *
   * @override
   * @return {black-engine~Vector} Vector object with random values withing defined range.
   */
  getValue() {
    this.value.x = Math.random() * (this.maxX - this.minX) + this.minX;
    this.value.y = Math.random() * (this.maxY - this.minY) + this.minY;

    return this.value;
  }

  /**
   * Returns a Vector object at given position.
   *
   * @override
   * @param {number} t The position.
   * @return {black-engine~Vector} Vector object representing values in a range at given position.
   */
  getValueAt(t) {
    if (this.ease !== null)
      t = this.ease(t);

    this.value.x = this.minX + t * (this.maxX - this.minX);
    this.value.y = this.minY + t * (this.maxY - this.minY);

    return this.value;
  }

  /**
   * Creates new VectorScatter from a set of numbers.
   *
   * @param {...number|black-engine~VectorScatterBase} values Set of values.
   * @returns {black-engine~VectorScatterBase}
   */
  static fromObject(...values) {
    if (values[0] instanceof VectorScatterBase)
      return /** @type {VectorScatterBase} */ (values[0]);

    return new VectorScatter(...values);
  }
}

/**
 * Sets particle's starting velocity.
 *
 * @cat scatters
 * @extends black-engine~VectorScatterBase
 */
class VectorCurveScatter extends VectorScatterBase {
  /**
   * Creates new VectorCurveScatter instance.
   *
   * @param {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   */
  constructor(...points) {
    super();

    /** 
     * @private 
     * @type {black-engine~Curve} 
     */
    this.mCurve = new Curve();
    this.mCurve.baked = true;
    this.mCurve.set(...points);

    /**
     * @private
     * @type {Array<number>}
     */
    this.mPointsCache = points;

    /** 
     * @private 
     * @type {black-engine~Vector} 
     */
    this.mCache = new Vector();
  }

  /**
   * Updates curve with new array of points.
   * 
   * @param {Array<number>} value
   */
  set points(value) {
    this.mPointsCache = value;
    this.mCurve.set(...value);
  }

  /**
   * Returns list of points.
   * @returns {Array<number>}
   */
  get points() {
    return this.mPointsCache;
  }

  /**
   * Returns a Vector at given position on a curve.
   *
   * @override
   * @param {number} t The position.
   * @return {black-engine~Vector} Vector object representing a value on a curve at given position.
   */
  getValueAt(t) {
    this.mCurve.interpolate(t, this.mCache);

    return this.mCache;
  }
}

/**
 * A number scatter for defining a range in a circular shape.
 *
 * @cat scatters
 * @extends black-engine~VectorScatterBase
 */
class RadialScatter extends VectorScatterBase {
  /**
   * Creates new VectorScatter instance.
   *
   * @param {number} x The center of a circle along x-axis.
   * @param {number} y The center of a circle along y-axis.
   * @param {number} minRadius The min radius value.
   * @param {number} [maxRadius=null] The max radius value.
   */
  constructor(x = 0, y = 0, minRadius = 0, maxRadius = null) {
    super();

    /**
     * A min value along x-axis.
     * 
     * @type {number}
     */
    this.x = x;

    /**
     * A min value along y-axis.
     * 
     * @type {number}
     */
    this.y = y;

    /**
     * A max value along x-axis.
     * 
     * @type {number}
     */
    this.minRadius = minRadius;

    /**
     * A max value along y-axis.
     * 
     * @type {number}
     */
    this.maxRadius = maxRadius === null ? minRadius : maxRadius;
  }

  /**
   * Returns a random Vector object at given position within a range specified in the constructor.
   *
   * @override
   * @return {black-engine~Vector} Vector object with random values withing defined range.
   */
  getValue() {
    return this.getValueAt(Math.random());
  }

  /**
   * Returns a Vector object at given position.
   *
   * @override
   * @param {number} t The position.
   * @return {black-engine~Vector} Vector object representing values in a range at given position.
   */
  getValueAt(t) {
    const r = this.minRadius + t * (this.maxRadius - this.minRadius);

    const angle = Math.random() * 2 * Math.PI; // MathEx.PI2?
    const rSq = r * r;
    const rx = this.x + (Math.sqrt(rSq) * Math.cos(angle));
    const ry = this.y + (Math.sqrt(rSq) * Math.sin(angle));

    this.value.x = rx;
    this.value.y = ry;

    return this.value;
  }
}

/**
 * A number scatter for defining a range in 2D space on a curve.
 *
 * @cat scatters
 * @extends black-engine~FloatScatterBase
 */
class FloatCurveScatter extends FloatScatterBase {
  /**
   * Creates new FloatCurveScatter instance.
   *
   * @param {...number} points Coordinates: startX, startY, cpStartX, cpStartY, cpEndX, cpEndY, endX/start2X, endY/start2Y, cp2StartX, cp2StartX... 8 or 14 or 20...
   */
  constructor(...points) {
    super();

    /** 
     * @private 
     * @type {black-engine~Curve} 
     */
    this.mCurve = new Curve();
    this.mCurve.baked = true;
    this.mCurve.set(...points);

    /**
     * @private
     * @type {Array<number>}
     */
    this.mPointsCache = points;

    /** 
     * @private 
     * @type {black-engine~Vector} 
     */
    this.mCache = new Vector();
  }

  /**
   * Updates curve with new array of points.
   * 
   * @param {Array<number>} value
   */
  set points(value) {
    this.mPointsCache = value;
    this.mCurve.set(...value);
  }

  /**
   * Returns list of points.
   * @returns {Array<number>}
   */
  get points() {
    return this.mPointsCache;
  }

  /**
   * Returns a number at given position on a curve.
   *
   * @override
   * @param {number} t The position.
   * @return {number} A value on a curve at given position.
   */
  getValueAt(t) {
    this.mCurve.interpolate(t, this.mCache);

    this.value = this.mCache.y;
    return this.value;
  }
}

/**
 * Adds acceleration to particles along given direction.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class Acceleration extends Modifier {
  /**
   * Creates new Acceleration instance.
   *
   * @param {...(number|black-engine~VectorScatterBase)} values An VectorScatterBase which defines acceleration direction.
   */
  constructor(...values) {
    super(false);

    /** 
     * @type {black-engine~VectorScatterBase} Modifier's object to get values from.
     */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    this.scatter.getValue();
    
    particle.ax += this.scatter.value.x;
    particle.ay += this.scatter.value.y;
  }
}

/**
 * Sets particle's alpha value according to its energy value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class AlphaOverLife extends Modifier {
  /**
   * Creates new AlphaOverLife instance.
   *
   * @param {...(number|black-engine~FloatScatterBase)} values A starting and ending values of alpha property.
   */
  constructor(...values) {
    super(false);

    /** @type {black-engine~FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.alpha = this.scatter.getValueAt(particle.energy);
  }
}

/**
 * Sets particle's color value according to its energy value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class ColorOverLife extends Modifier {
  /**
   * Creates new ColorOverLife instance.
   *
   * @param {...(number|black-engine~ColorScatterBase)} values A starting and ending values of color property.
   */
  constructor(...values) {
    super(false);

    /** @type {black-engine~ColorScatterBase} Modifier's object to get values from.  */
    this.scatter = ColorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.color = this.scatter.getValueAt(particle.energy);
  }
}

/**
 * Sets particle's scale value according to its energy value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class ScaleOverLife extends Modifier {
  /**
   * Creates new ScaleOverTime instance.
   *
   * @param {...(number|black-engine~FloatScatterBase)} values A starting and ending values of scale property.
   */
  constructor(...values) {
    super(false);

    /** @type {black-engine~FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.scaleX = particle.scaleY = this.scatter.getValueAt(particle.energy);
  }
}

/**
 * Sets particle's rotation value according to its energy value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class RotationOverLife extends Modifier {
  /**
   * Creates new RotationOverLife instance.
   *
   * @param {...(number|black-engine~FloatScatterBase)} values A starting and ending values of alpha property.
   */
  constructor(...values) {
    super(false);

    /** @type {black-engine~FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.r = this.scatter.getValueAt(particle.energy);
  }
}

/**
 * Sets particle's texture according to its energy value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class TextureOverLife extends Modifier {
  /**
   * Creates new TextureOverLife instance.
   *
   * @param {...(number|black-engine~FloatScatterBase)} values A starting and ending values of textureIndex property.
   */
  constructor(...values) {
    super(false);

    /** @type {black-engine~FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.textureIndex = Math.round(this.scatter.getValueAt(particle.energy));
  }
}

/**
 * Changes particle alpha according to its life.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class AnchorOverLife extends Modifier {
  /**
   * Creates new Acceleration instance.
   *
   * @param {...(number|black-engine~VectorScatterBase)} values An VectorScatterBase which defines acceleration direction.
   */
  constructor(...values) {
    super(false);

    /** @type {black-engine~VectorScatterBase} Modifier's object to get values from.  */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    this.scatter.getValueAt(particle.energy);

    particle.anchorX = this.scatter.value.x;
    particle.anchorY = this.scatter.value.y;
  }
}

/**
 * Rotates particle along velocity vector.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class Oriented extends Modifier {
  /**
   * Creates new instance of oriented modifier.
   */
  constructor(angleShift = 0) {
    super(false);

    /**
     * @type {number}
     */
    this.angleShift = angleShift;
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.r = (Math.atan2(particle.vy, particle.vx) * MathEx.RAD2DEG - (90 + this.angleShift)) * dt;
  }
}

/**
 * @ignore
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class VectorField extends Modifier {
  /**
   * Creates new instance of VectorField.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number=} [resolution=0.1]
   */
  constructor(x, y, width, height, resolution = 0.1) {
    super(false);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.resolution = resolution;
    this.field = [];

    this.widthScaled = Math.floor(this.width * this.resolution);
    this.heightScaled = Math.floor(this.height * this.resolution);

    this.reset();
  }

  /**
   * Resets this vector field data.
   *
   * @returns {void}
   */
  reset() {    
    this.field.splice(0, this.field.length); // why?

    for (let y = 0; y < this.heightScaled; y++)
      for (let x = 0; x < this.widthScaled; x++)
        this.field.push(new Vector(0, 0));
  }

  /**
   * Updates field data with a given callback function.
   *
   * @param {Function} fn
   * @returns {void}
   */
  setData(fn) {
    for (let y = 0; y < this.heightScaled; y++) {
      for (let x = 0; x < this.widthScaled; x++) {
        const index = x + y * this.widthScaled;
        fn(x, y, this.field[index]);
      }
    }
  }

  /**
   * Returns value at given position.
   * 
   * @param {number} x
   * @param {number} y
   * @returns {black-engine~Vector|null}
   */
  getVectorAt(x, y) {
    x = Math.floor(x * this.resolution);
    y = Math.floor(y * this.resolution);
    let ix = ~~(x + y * this.widthScaled);

    if (ix < 0 || ix >= this.field.length)
      return null;

    return this.field[ix];
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    let v = this.getVectorAt(particle.x, particle.y);

    if (v === null)
      return;

    particle.ax = v.x;
    particle.ay = v.y;
  }
}

/**
 * Sets initial particle life value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class InitialLife extends Modifier {
  /**
   * Creates new InitialLife instance.
   *
   * @param {...(number|black-engine~FloatScatterBase)} values Min and max values in seconds.
   */
  constructor(...values) {
    super();

    /** @type {black-engine~FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.life = this.scatter.getValue();
  }
}

/**
 * Sets initial particle mass value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class InitialMass extends Modifier {
  /**
   * Creates new InitialMass instance.
   *
   * @param {...(number|Fblack-engine~loatScatterBase)} values Min and max values.
   */
  constructor(...values) {
    super();

    /** @type {black-engine~FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.mass = this.scatter.getValue();
  }
}

/**
 * Sets initial particle scale value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class InitialScale extends Modifier {
  /**
   * Creates new InitialScale instance.
   *
   * @param {...(number|black-engine~FloatScatterBase)} values Min and max values.
   */
  constructor(...values) {
    super();

    /** @type {black-engine~FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.scaleX = particle.scaleY = this.scatter.getValue();
  }
}

/**
 * Sets initial particle velocity vector.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class InitialVelocity extends Modifier {
  /**
   * Creates new InitialVelocity instance.
   *
   * @param {...(number|black-engine~VectorScatterBase)} values Min and max vectors.
   */
  constructor(...values) {
    super();

    /** @type {black-engine~VectorScatterBase} Modifier's object to get values from.  */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    this.scatter.getValue();

    particle.vx = this.scatter.value.x;
    particle.vy = this.scatter.value.y;
  }
}

/**
 * Sets initial particle position.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class InitialPosition extends Modifier {
  /**
   * Creates new InitialPosition instance.
   *
   * @param {...(number|black-engine~VectorScatterBase)} values Rectangle coordinates, its width and height.
   */
  constructor(...values) {
    super();

    /** @type {black-engine~VectorScatterBase} Modifier's object to get values from.  */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    let v = this.scatter.getValue();
    particle.x = v.x;
    particle.y = v.y;
  }
}

/**
 * Sets initial particle rotation value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class InitialRotation extends Modifier {
  /**
   * Creates new InitialRotation instance.
   *
   * @param {...(number|black-engine~FloatScatterBase)} values Min and max values in radians.
   */
  constructor(...values) {
    super();

    /** @type {black-engine~FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.r = this.scatter.getValue();
  }
}

/**
 * Sets initial particle texture.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class InitialTexture extends Modifier {
  /**
   * Creates new InitialTexture instance.
   *
   * @param {...(number|black-engine~FloatScatterBase)} values Min and max indexes from texture list.
   */
  constructor(...values) {
    super();

    /** @type {black-engine~FloatScatterBase} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.textureIndex = Math.round(this.scatter.getValue());
  }
}

/**
 * Sets initial particle color value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class InitialColor extends Modifier {
  /**
   * Creates new InitialLife instance.
   *
   * @param {...(number|black-engine~ColorScatterBase)} values Two color values.
   */
  constructor(...values) {
    super();

    /** @type {black-engine~ColorScatterBase} Modifier's object to get values from.  */
    this.scatter = ColorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.color = this.scatter.getValue();
  }
}

/**
 * Sets initial particle scale value.
 *
 * @cat particles.modifiers
 * @extends black-engine~Modifier
 */
class InitialAnchor extends Modifier {
  /**
   * Creates new InitialScale instance.
   *
   * @param {...(number|black-engine~VectorScatterBase)} values
   */
  constructor(...values) {
    super();

    /** @type {black-engine~VectorScatterBase} Modifier's object to get values from.  */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    let v = this.scatter.getValue();
    particle.anchorX = v.x;
    particle.anchorY = v.y;
  }
}

/**
 * @readonly
 * @enum {number}
 * @cat input
 */
const Key = {
  /**
   * @type {number}
   */
  A: 65,
  /**
   * @type {number}
   */
  B: 66,
  /**
   * @type {number}
   */
  C: 67,
  /**
   * @type {number}
   */
  D: 68,
  /**
   * @type {number}
   */
  E: 69,
  /**
   * @type {number}
   */
  F: 70,
  /**
   * @type {number}
   */
  G: 71,
  /**
   * @type {number}
   */
  H: 72,
  /**
   * @type {number}
   */
  I: 73,
  /**
   * @type {number}
   */
  J: 74,
  /**
   * @type {number}
   */
  K: 75,
  /**
   * @type {number}
   */
  L: 76,
  /**
   * @type {number}
   */
  M: 77,
  /**
   * @type {number}
   */
  N: 78,
  /**
   * @type {number}
   */
  O: 79,
  /**
   * @type {number}
   */
  P: 80,
  /**
   * @type {number}
   */
  Q: 81,
  /**
   * @type {number}
   */
  R: 82,
  /**
   * @type {number}
   */
  S: 83,
  /**
   * @type {number}
   */
  T: 84,
  /**
   * @type {number}
   */
  U: 85,
  /**
   * @type {number}
   */
  V: 86,
  /**
   * @type {number}
   */
  W: 87,
  /**
   * @type {number}
   */
  X: 88,
  /**
   * @type {number}
   */
  Y: 89,
  /**
   * @type {number}
   */
  Z: 90,
  /**
   * @type {number}
   */
  DIGIT_0: 48,
  /**
   * @type {number}
   */
  DIGIT_1: 49,
  /**
   * @type {number}
   */
  DIGIT_2: 50,
  /**
   * @type {number}
   */
  DIGIT_3: 51,
  /**
   * @type {number}
   */
  DIGIT_4: 52,
  /**
   * @type {number}
   */
  DIGIT_5: 53,
  /**
   * @type {number}
   */
  DIGIT_6: 54,
  /**
   * @type {number}
   */
  DIGIT_7: 55,
  /**
   * @type {number}
   */
  DIGIT_8: 56,
  /**
   * @type {number}
   */
  DIGIT_9: 57,
  /**
   * @type {number}
   */
  NUMPAD_0: 96,
  /**
   * @type {number}
   */
  NUMPAD_1: 97,
  /**
   * @type {number}
   */
  NUMPAD_2: 98,
  /**
   * @type {number}
   */
  NUMPAD_3: 99,
  /**
   * @type {number}
   */
  NUMPAD_4: 100,
  /**
   * @type {number}
   */
  NUMPAD_5: 101,
  /**
   * @type {number}
   */
  NUMPAD_6: 102,
  /**
   * @type {number}
   */
  NUMPAD_7: 103,
  /**
   * @type {number}
   */
  NUMPAD_8: 104,
  /**
   * @type {number}
   */
  NUMPAD_9: 105,
  /**
   * @type {number}
   */
  NUMPAD_MULTIPLY: 106,
  /**
   * @type {number}
   */
  NUMPAD_ADD: 107,
  /**
   * @type {number}
   */
  NUMPAD_SUBTRACT: 109,
  /**
   * @type {number}
   */
  NUMPAD_DECIMAL: 110,
  /**
   * @type {number}
   */
  NUMPAD_DIVIDE: 111,
  /**
   * @type {number}
   */
  LEFT_ARROW: 37,
  /**
   * @type {number}
   */
  UP_ARROW: 38,
  /**
   * @type {number}
   */
  RIGHT_ARROW: 39,
  /**
   * @type {number}
   */
  DOWN_ARROW: 40,
  /**
   * @type {number}
   */
  BACKSPACE: 8,
  /**
   * @type {number}
   */
  TAB: 9,
  /**
   * @type {number}
   */
  ENTER: 13,
  /**
   * @type {number}
   */
  SHIFT: 16,
  /**
   * @type {number}
   */
  CTRL: 17,
  /**
   * @type {number}
   */
  ALT: 18,
  /**
   * @type {number}
   */
  F1: 112,
  /**
   * @type {number}
   */
  F2: 113,
  /**
   * @type {number}
   */
  F3: 114,
  /**
   * @type {number}
   */
  F4: 115,
  /**
   * @type {number}
   */
  F5: 116,
  /**
   * @type {number}
   */
  F6: 117,
  /**
   * @type {number}
   */
  F7: 118,
  /**
   * @type {number}
   */
  F8: 119,
  /**
   * @type {number}
   */
  F9: 120,
  /**
   * @type {number}
   */
  F10: 121,
  /**
   * @type {number}
   */
  F11: 122,
  /**
   * @type {number}
   */
  F12: 123,
  /**
   * @type {number}
   */
  PAUSE_BREAK: 19,
  /**
   * @type {number}
   */
  CAPS_LOCK: 20,
  /**
   * @type {number}
   */
  ESCAPE: 27,
  /**
   * @type {number}
   */
  PAGE_UP: 33,
  /**
   * @type {number}
   */
  PAGE_DOWN: 34,
  /**
   * @type {number}
   */
  END: 35,
  /**
   * @type {number}
   */
  HOME: 36,
  /**
   * @type {number}
   */
  INSERT: 45,
  /**
   * @type {number}
   */
  DELETE: 46,
  /**
   * @type {number}
   */
  LEFT_WINDOW: 91,
  /**
   * @type {number}
   */
  RIGHT_WINDOW: 92,
  /**
   * @type {number}
   */
  CONTEXT_MENU: 93,
  /**
   * @type {number}
   */
  NUM_LOCK: 144,
  /**
   * @type {number}
   */
  SCROLL_LOCK: 145,
  /**
   * @type {number}
   */
  SEMI_COLON: 186,
  /**
   * @type {number}
   */
  EQUAL_SIGN: 187,
  /**
   * @type {number}
   */
  COMMA: 188,
  /**
   * @type {number}
   */
  DASH: 189,
  /**
   * @type {number}
   */
  PERIOD: 190,
  /**
   * @type {number}
   */
  FORWARD_SLASH: 191,
  /**
   * @type {number}
   */
  BACKQUOTE: 192,
  /**
   * @type {number}
   */
  BRAKET_LEFT: 219,
  /**
   * @type {number}
   */
  BACK_SLASH: 220,
  /**
   * @type {number}
   */
  BRAKET_RIGHT: 221,
  /**
   * @type {number}
   */
  SINGLE_QUOTE: 222,
  /**
   * @type {number}
   */
  SPACE: 32
};

/**
 * A static class with many static easing functions.
 *
 * @cat animation
 * 
 * @static
 * @staticClass
 */
class Ease {
  /**
   * linear
   * 
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static linear(k) {
    return k;
  }

  /**
   * quadraticIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quadraticIn(k) {
    return k * k;
  }

  /**
   * quadraticOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quadraticOut(k) {
    return k * (2 - k);
  }

  /**
   * quadraticInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quadraticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k;

    return -0.5 * (--k * (k - 2) - 1);
  }

  /**
   * cubicIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static cubicIn(k) {
    return k * k * k;
  }

  /**
   * cubicOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static cubicOut(k) {
    return --k * k * k + 1;
  }

  /**
   * cubicInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static cubicInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k;

    return 0.5 * ((k -= 2) * k * k + 2);
  }

  /**
   * quarticIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quarticIn(k) {
    return k * k * k * k;
  }

  /**
   * quarticOut
   * 
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quarticOut(k) {
    return 1 - (--k * k * k * k);
  }

  /**
   * quarticInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quarticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k * k;

    return -0.5 * ((k -= 2) * k * k * k - 2);
  }

  /**
   * quinticIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quinticIn(k) {
    return k * k * k * k * k;
  }

  /**
   * quinticOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quinticOut(k) {
    return --k * k * k * k * k + 1;
  }

  /**
   * quinticInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static quinticInOut(k) {
    if ((k *= 2) < 1)
      return 0.5 * k * k * k * k * k;

    return 0.5 * ((k -= 2) * k * k * k * k + 2);
  }

  /**
   * sinusoidalIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static sinusoidalIn(k) {
    return 1 - Math.cos(k * Math.PI / 2);
  }

  /**
   * sinusoidalOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static sinusoidalOut(k) {
    return Math.sin(k * Math.PI / 2);
  }

  /**
   * sinusoidalInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static sinusoidalInOut(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  }

  /**
   * exponentialIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static exponentialIn(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
  }

  /**
   * exponentialOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static exponentialOut(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  }

  /**
   * exponentialInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static exponentialInOut(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    if ((k *= 2) < 1)
      return 0.5 * Math.pow(1024, k - 1);

    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
  }

  /**
   * circularIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static circularIn(k) {
    return 1 - Math.sqrt(1 - k * k);
  }

  /**
   * circularOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static circularOut(k) {
    return Math.sqrt(1 - (--k * k));
  }

  /**
   * circularInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static circularInOut(k) {
    if ((k *= 2) < 1)
      return -0.5 * (Math.sqrt(1 - k * k) - 1);

    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
  }

  /**
   * elasticIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static elasticIn(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
  }

  /**
   * elasticOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static elasticOut(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
  }

  /**
   * elasticInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static elasticInOut(k) {
    if (k === 0)
      return 0;

    if (k === 1)
      return 1;

    k *= 2;

    if (k < 1)
      return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

    return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

  }

  /**
   * backIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static backIn(k) {
    const s = 1.70158;
    return k * k * ((s + 1) * k - s);
  }

  /**
   * backOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static backOut(k) {
    const s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
  }

  /**
   * backInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static backInOut(k) {
    const s = 1.70158 * 1.525;

    if ((k *= 2) < 1)
      return 0.5 * (k * k * ((s + 1) * k - s));

    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  }

  /**
   * bounceIn
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static bounceIn(k) {
    return 1 - Ease.bounceOut(1 - k);
  }

  /**
   * bounceOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static bounceOut(k) {
    if (k < (1 / 2.75))
      return 7.5625 * k * k;
    else if (k < (2 / 2.75))
      return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
    else if (k < (2.5 / 2.75))
      return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;

    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
  }

  /**
   * bounceInOut
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static bounceInOut(k) {
    if (k < 0.5)
      return Ease.bounceIn(k * 2) * 0.5;

    return Ease.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }

  /**
   * smoothstep
   *
   * @param {number} k Value between 0 and 1
   * @return {number}
   */
  static smootherStep(k) {
    return k * k * k * (k * (6.0 * k - 15.0) + 10.0);
  }
}

/**
 * Interpolation functions.
 *
 * @cat animation
 * @static
 */
class Interpolation {
  /**
   * Linear interpolation.
   *
   * @param {Array}  v The input array of values to interpolate between.
   * @param {number} k The percentage of interpolation, between 0 and 1.
   * @param {function(number, number, number):number=} lerpFunction Interpolation function.
   * @return {number}  The interpolated value
   */
  static linear(v, k, lerpFunction) {
    let m = v.length - 1;
    let f = m * k;
    let i = Math.floor(f);

    lerpFunction = lerpFunction || MathEx.lerp;

    if (k < 0)
      return lerpFunction(v[0], v[1], f);

    if (k > 1)
      return lerpFunction(v[m], v[m - 1], m - f);

    return lerpFunction(v[i], v[i + 1 > m ? m : i + 1], f - i);
  }

  /**
   * Cubic bezier interpolation.
   *
   * @param {Array}  v The input array of values to interpolate between.
   * @param {number} k The percentage of interpolation, between 0 and 1.
   * @return {number}  The interpolated value
   */
  static bezier(v, k) {
    let b = 0;
    let n = v.length;
    let pow = Math.pow;
    // Bernstein basis polynomials
    let bn = (n, i) => {
      let fc = Interpolation.__factorial;
      return fc(n) / fc(i) / fc(n - i);
    };

    for (let i = 0; i < n; i++)
      b += pow(1 - k, n - i) * pow(k, i) * v[i] * bn(n, i);

    return b;
  }

  /**
   * Catmull Rom interpolation.
   *
   * @param {Array}  v The input array of values to interpolate between.
   * @param {number} k The percentage of interpolation, between 0 and 1.
   * @return {number}  The interpolated value
   */
  static catmullRom(v, k) {
    let m = v.length - 1;
    let f = m * k;
    let i = Math.floor(f);

    let fn = (p0, p1, p2, p3, t) => {
      let v0 = (p2 - p0) * 0.5;
      let v1 = (p3 - p1) * 0.5;
      let t2 = t * t;
      let t3 = t * t2;

      return ((p1 - p2) * 2 + v0 + v1) * t3 + ((p2 - p1) * 3 - 2 * v0 - v1) * t2 + v0 * t + p1;
    };

    if (v[0] === v[m]) {
      if (k < 0)
        i = Math.floor(f = m * (1 + k));

      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    } else {
      if (k < 0)
        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
      else if (k > 1)
        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);

      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    }
  }
}

/**
 * @private
 * @param {number} n
 * @return {number}
 */
Interpolation.__factorial = (function() {
  let a = [1];

  return function(n) {
    if (a[n])
      return a[n];

    let s = n;

    while (--n)
      s *= n;

    a[n] = s;
    return s;
  };
})();

var defaultEase = Ease.smootherStep;

/**
 * A tweening component.
 *
 * @fires Tween#start
 * @fires Tween#update
 * @fires Tween#loop
 * @fires Tween#complete 
 * 
 * @cat animation
 * @unrestricted
 * @extends black-engine~Component
 */
class Tween extends Component {
  /**
   * Creates new instance of Tween Component.
   * 
   * @param {Object}        values            The values to tween.
   * @param {number}        [duration=0.25]   Duraction in seconds.
   * @param {Object|null}   [properties=null] Tween properties Object.
   * @param {Object|null}   [plugins=null]    Interpolation plugins object
   */
  constructor(values, duration = 0.250, properties = null, plugins = null) {
    super();

    /** 
     * @private 
     * @dict 
     */
    this.mValues = values;

    /** 
     * @private 
     * @type {number} 
     */
    this.mDuration = duration;

    /** 
     * @private 
     * @dict 
     */
    this.mProperties = properties;

    /** 
     * @private 
     * @dict 
     */
    this.mPlugins = plugins;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsPlaying = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsPaused = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mStartTime = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mPausedTime = 0;

    /** 
     * @private 
     * @dict 
     */
    this.mValuesStart = {};

    /** 
     * @private 
     * @type {number} 
     */
    this.mElapsed = 0;

    /** 
     * @private 
     * @type {function (Array, number):number} 
     */
    this.mInterpolation = Interpolation.linear;

    /** 
     * @private 
     * @type {number} 
     */
    this.mDelay = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mRepeatDelay = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mRepeats = 0;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mInitiated = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mStarted = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mReversed = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mYoyo = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsYoyoBack = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mReverseOnInit = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mRemoveOnComplete = true;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mPlayOnAdded = true;

    /** 
     * @private 
     * @type {function(number):number} 
     */
    this.mEase = defaultEase;

    if (this.mProperties !== null) {
      for (let f in this.mProperties) {
        this[f] = /** @dict */ (this.mProperties[f]);
      }
    }
  }

  /**
   * Sets/Gets active ease function.
   *
   * @return {function(number):number}
   */
  get ease() {
    return this.mEase;
  }

  /**
   * @param {function(number):number} value The easing function.
   * @return {void}
   */
  set ease(value) {
    this.mEase = value;
  }

  /**
   * Sets/Gets the interpolation algorithm. Possible values Interpolation.linear, Interpolation.bezier, Interpolation.catmullRom or your custom function.
   *
   * @return {function(Array, number):number}
   */
  get interpolation() {
    return this.mInterpolation;
  }

  /**
   * @param {function(Array, number):number} value The interpolation function.
   * @return {void}
   */
  set interpolation(value) {
    this.mInterpolation = value;
  }

  /**
   * Time elapsed since tween start in seconds.
   *
   * @readonly
   * @return {number}
   */
  get elapsed() {
    return this.mElapsed;
  }

  /**
   * Sets/Gets amount of seconds to wait before tweening.
   *
   * @return {number}
   */
  get delay() {
    return this.mDelay;
  }

  /**
   * @param {number} value Seconds to wait.
   * @return {void}
   */
  set delay(value) {
    this.mDelay = value;
  }

  /**
   * Gets/Sets the number of times the tween will be repeated after first execution.
   *
   * @return {number}
   */
  get repeats() {
    return this.mRepeats;
  }

  /**
   * @param {number} value Number of times.
   * @return {void}
   */
  set repeats(value) {
    this.mRepeats = value;
  }

  /**
   * Sets/Gets amount of seconds to wait between repeats.
   *
   * @return {number}
   */
  get repeatDelay() {
    return this.mRepeatDelay;
  }

  /**
   * @param {number} value Seconds to wait.
   * @return {void}
   */
  set repeatDelay(value) {
    this.mRepeatDelay = value;
  }

  /**
   * Gets/Sets if tween should be looped over.
   *
   * @return {boolean}
   */
  get loop() {
    return this.mRepeats === Infinity;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set loop(value) {
    this.mRepeats = value ? Infinity : 0;
  }

  /**
   * Enables/disables reversing between repeats.
   *
   * @return {boolean}
   */
  get yoyo() {
    return this.mYoyo;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set yoyo(value) {
    this.mYoyo = value;
  }

  /**
   * Enables/disables reversed playback on start.
   *
   * @return {boolean}
   */
  get reversed() {
    return this.mReversed;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set reversed(value) {
    this.mReversed = value;
  }

  /**
   * Sets/Gets whether the Tween Component should be automatically detached from owner GameObject after completion.
   *
   * @return {boolean}
   */
  get removeOnComplete() {
    return this.mRemoveOnComplete;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set removeOnComplete(value) {
    this.mRemoveOnComplete = value;
  }

  /**
   * Sets/Gets whether the tween should start playing automatically when added to the root.
   * 
   * @return {boolean}
   */
  get playOnAdded() {
    return this.mPlayOnAdded;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set playOnAdded(value) {
    this.mPlayOnAdded = value;
  }

  /**
   * Sets/Gets optional object with custom interpolation handler function for specific target properties.
   * 
   * @return {Object}
   */
  get plugins() {
    return this.mPlugins;
  }

  /**
   * @param {Object} value
   * @return {void}
   */
  set plugins(value) {
    this.mPlugins = value;
  }

  /**
   * Gets this tween duration.
   * 
   * @return {number}
   */
  get duration() {
    return this.mDuration;
  }

  /**
   * Indicated whether the tween is playing and not paused.
   * 
   * @return {boolean}
   */
  get isPlaying() {
    return this.mIsPlaying === true && this.mIsPaused === false;
  }

  /**
   * @private
   * @param {number} t
   * @return {void}
   */
  __start(t) {
    this.mIsPlaying = true;
    this.mStartTime = t + this.mDelay;
  }

  /**
   * Starts tweening.
   *
   * @return {black-engine~Tween} Returns this.
   */
  play() {
    if (!this.mIsPaused) {
      this.__start(Black.time.now);
    } else {
      this.__resume();
    }

    return this;
  }

  /**
   * Stops current tween.
   *
   * @return {black-engine~Tween} Returns this.
   */
  stop() {
    if (!this.mIsPlaying)
      return this;

    this.mIsPlaying = false;

    return this;
  }

  /**
   * Resets current tween.
   *
   * @return {black-engine~Tween} Returns this.
   */
  reset() {
    this.mElapsed = 0;
    if (this.mIsPlaying)
      this.play();

    return this;
  }

  /**
   * Sets the values for tweening.
   *
   * @param {Object} values Values to tween.
   * @param {number} [duration=0.25] Duration in seconds.
   * @return {black-engine~Tween} Returns this.
   */
  to(values = {}, duration = 0.250) {
    this.mValues = values;
    this.mDuration = duration;
    this.mInitiated = false;
    return this;
  }

  /**
   * Pauses current tween.
   *
   * @return {black-engine~Tween} Returns this.
   */
  pause() {
    if (!this.mIsPlaying)
      return this;

    this.mIsPaused = true;
    this.mPausedTime = Black.time.now;

    return this;
  }

  /**
   * @private
   * @return {void}
   */
  __resume() {
    if (!this.mIsPaused)
      return;

    this.mIsPaused = false;
    this.mStartTime += Black.time.now - this.mPausedTime;
  }

  /**
   * @inheritDoc
   */
  removeFromParent() {
    if (this.mIsPlaying)
      this.stop();

    super.removeFromParent();
  }

  /**
   * Add specified tween object into the queue. The specified tween will be executed after completion of this tween,
   *
   * @return {black-engine~Tween} Returns tween to chain.
   */
  chain(tween) {
    if (!tween) {
      return this;
    }

    this.mRemoveOnComplete = false;
    tween.playOnAdded = false;

    this.on(Message.COMPLETE, () => {
      tween.play();
    });

    return tween;
  }

  /**
   * @inheritDoc
   */
  onAdded(gameObject) {
    if (this.mPlayOnAdded) {
      this.__start(Black.time.now);
    }
  }

  /**
   * @private
   * @param {number} t
   * @return {void}
   */
  __update(t) {

  }

  /**
   * Updates tween values.
   *
   * @param {Object} values The Object to get values from.
   * @return {void}
   */
  set(values) {
    this.mValues = values;

    for (let f in this.mValues)
      this.mValuesStart[f] = parseFloat(this.gameObject[f]);
  }

  /**
   * Switches end values with start values.
   *
   * @param {boolean} asYoyo Indicates wether easing function should be also reversed.
   * @return {black-engine~Tween} Returns this.
   */
  reverse(asYoyo = false) {
    if (this.mInitiated) {
      this.__reverse();
    } else {
      this.mReverseOnInit = true;
    }

    if (asYoyo)
      this.mIsYoyoBack = !this.mIsYoyoBack;

    return this;
  }

  /**
   * @private
   * @return {void}
   */
  __reverse() {
    for (let f in this.mValues) {
      [this.mValues[f], this.mValuesStart[f]] = [this.mValuesStart[f], this.mValues[f]];
    }
  }

  onRender() {
    if (Black.engine.numUpdates !== 0)
      return;

    let time = Black.time.now;

    if (time < this.mStartTime || this.mIsPlaying === false || this.mIsPaused === true)
      return;

    if (this.mStarted === false || this.mInitiated === false)
      return;

    this.mElapsed = (time - this.mStartTime) / this.mDuration;

    if (this.mElapsed > 1)
      this.mElapsed = 1;

    let t = this.mEase(this.mIsYoyoBack ? 1 - this.mElapsed : this.mElapsed);

    for (let f in this.mValues) {
      let start = /** @type {number} */ (this.mValuesStart[f]);
      let end = /** @type {number|Array} */ (this.mValues[f]);

      if (this.mPlugins !== null && this.mPlugins.hasOwnProperty(f)) {
        let toLerp = Array.isArray(end) ? end : [start, end];
        this.gameObject[f] = Interpolation.linear(toLerp, t, this.mPlugins[f]);
      } else if (Array.isArray(end)) {
        this.gameObject[f] = this.mInterpolation(end, t);
      } else {
        this.gameObject[f] = /** @type {number} */ (start + (/** @type {number} */(end) - start) * (this.mIsYoyoBack ? 1 - t : t));
      }
    }
  }

  /**
   * @inheritDoc
   */
  onUpdate() {
    let t = Black.time.now;

    if (t < this.mStartTime || this.mIsPlaying === false || this.mIsPaused === true)
      return;

    this.__collectStartingValues();

    this.mElapsed = (t - this.mStartTime) / this.mDuration;

    if (this.mElapsed > 1)
      this.mElapsed = 1;

    let tt = this.mEase(this.mIsYoyoBack ? 1 - this.mElapsed : this.mElapsed);

    for (let f in this.mValues) {
      let start = /** @type {number} */ (this.mValuesStart[f]);
      let end = /** @type {number|Array} */ (this.mValues[f]);

      if (this.mPlugins !== null && this.mPlugins.hasOwnProperty(f)) {
        let toLerp = Array.isArray(end) ? end : [start, end];
        this.gameObject[f] = Interpolation.linear(toLerp, tt, this.mPlugins[f]);
      } else if (Array.isArray(end)) {
        this.gameObject[f] = this.mInterpolation(end, tt);
      } else {
        this.gameObject[f] = /** @type {number} */ (start + (/** @type {number} */(end) - start) * (this.mIsYoyoBack ? 1 - tt : tt));
      }
    }

    /**
     * Posted on every tween update. 
     * Note: tween can update object values inside `onRender` method without posting `black-engine~Tween#update` message.
     * @event Tween#update
     */
    this.post(Message.UPDATE, this.gameObject);

    if (this.mElapsed === 1) {
      if (this.mRepeats-- > 0) {
        if (this.mYoyo === true) {
          this.reverse(true);
        }

        this.mStartTime = t + this.mRepeatDelay;

        /**
         * Posted everytime tween is repeating.
         * @event Tween#loop
         */
        this.post('loop', this.gameObject);
      } else {
        this.mIsPlaying = false;

        /**
         * Posten when tween is finished.
         * @event Tween#complete
         */
        this.post(Message.COMPLETE, this.gameObject);

        if (this.mRemoveOnComplete) {
          this.removeFromParent();
        } else {
          for (let f in this.mValues) {
            this.mValuesStart[f] = this.mValues[f];
          }

          this.mStarted = false;
        }
      }
    }
  }

  __collectStartingValues() {
    if (this.mStarted === false) {
      this.mStarted = true;

      /**
       * Posted when tween started.
       * @event Tween#start
       */
      this.post('start', this.gameObject);

      for (let f in this.mValues) {
        if (!this.mInitiated && Array.isArray(this.mValues[f])) {
          this.mValues[f] = [this.gameObject[f]].concat(this.mValues[f]);
        }
        this.mValuesStart[f] = parseFloat(this.gameObject[f]);
      }

      if (this.mReversed === true || this.mReverseOnInit === true)
        this.__reverse();

      this.mInitiated = true;
    }
  }

  /**
   * Ease to be used in all tweens, if another ease is not specified. `Ease.smootherStep` is used.
   *
   * @returns {function(number):number}
   */
  static get defaultEase() {
    return defaultEase;
  }

  /**
   * @param {function(number):number} value The defaykt easing function.
   * @returns {void}
   */
  static set defaultEase(value) {
    defaultEase = value;
  }
}

/**
 * Holds details about sprite animation.
 *
 * @fires AnimationInfo#complete
 * @cat animation
 */
class AnimationInfo {
  /**
   * Creates an instance of Animation class
   *
   * @param {black-engine~AnimationController}    controller  Animation controller
   * @param {string}                 name        The name of animation
   * @param {Array<black-engine~Texture>}         frames      Array of Textures for this animation
   * @param {number}                 [fps=14]    Frame rate
   * @param {boolean}                [loop=true] Is animations should be looped
   */
  constructor(controller, name, frames, fps = 14, loop = true) {
    Debug.assert(fps > 0, 'FPS must be greater than 0.');

    /**
     * @private
     * @type {black-engine~AnimationController}
     */
    this.mController = controller;

    /**
     * @private
     * @type {string}
     */
    this.mName = name;

    /**
     * @private
     * @type {Array<black-engine~Texture>}
     */
    this.mFrames = frames;

    /**
     * @private
     * @type {number}
     */
    this.mCurrentFrame = 0;

    /**
     * @private
     * @type {number}
     */
    this.mNextFrameAt = 0;

    /**
     * @private
     * @type {number}
     */
    this.mFPS = fps;

    /**
     * @private
     * @type {number}
     */
    this.mFrameDuration = 1 / this.mFPS;

    /**
     * @private
     * @type {boolean}
     */
    this.mLoop = loop;

    /**
     * @private
     * @type {boolean}
     */
    this.mPaused = false;

    /**
     * @private
     * @type {number}
     */
    this.mElapsed = 0;

    /**
     * @private
     * @type {boolean}
     */
    this.mStopped = false;

    /**
     * @private
     * @type {boolean}
     */
    this.mCompleted = false;
  }

  /**
   * Plays animation. If Animation is completed, current frame is reset to 0.
   * 
   * @ignore
   * @return {black-engine~Texture} Returns the current frame Texture.
   */
  __play() {
    if (this.mCompleted === true) {
      this.mCurrentFrame = 0;
      this.mElapsed = 0;
    }

    this.mPaused = false;
    this.mStopped = false;
    this.mCompleted = false;

    this.mNextFrameAt = Black.time.now + this.mFrameDuration - this.mElapsed;
    this.mElapsed = 0;

    return this.mFrames[this.mCurrentFrame];
  }

  /**
   * Stops animation and resets the value of current frame.
   *
   * @ignore
   * @return {void}
   */
  __stop() {
    this.mStopped = true;
    this.mCurrentFrame = 0;
  }

  /**
   * Pauses animation.
   *
   * @ignore
   * @return {void}
   */
  __pause() {
    this.mPaused = true;
    this.mElapsed = this.mNextFrameAt - Black.time.now;
  }

  /**
   * @ignore
   * @return {black-engine~Texture|null}
   */
  __update() {
    let t = Black.time.now;
    let dt = Black.time.dt;
    
    if (t < this.mNextFrameAt || this.mPaused === true || this.mStopped === true || this.mCompleted === true)
      return null;

    this.mCurrentFrame++;

    if (this.mCurrentFrame >= this.mFrames.length) {
      if (this.mLoop === true) {
        this.mCurrentFrame = 0;
      } else {
        this.mCurrentFrame = this.mFrames.length - 1;

        /**
         * Post messages when animation reach its end.
         *
         * @event AnimationInfo#complete
         */
        this.mController.post(Message.COMPLETE, this);
        this.mCompleted = true;
        return null;
      }
    }

    this.mNextFrameAt = Black.time.now + this.mFrameDuration;
    return this.mFrames[this.mCurrentFrame];
  }

  /**
   * Get/Set animation speed in frames per second.
   *
   * @return {number}
   */
  get fps() {
    return this.mFPS;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set fps(value) {
    Debug.assert(value > 0, 'FPS must be greater than 0.');

    this.mFPS = value;
    this.mFrameDuration = 1 / this.mFPS;

    // update next frame start time
    this.mNextFrameAt += this.mNextFrameAt - Black.time.now;
  }

  /**
   * Get/Set if animation should be looped.
   * @return {boolean}
   */
  get loop() {
    return this.mLoop;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set loop(value) {
    this.mLoop = value;
  }

  /**
   * Gets array of Texture.
   *
   * @return {Array<black-engine~Texture>}
   */
  get frames() {
    return this.mFrames;
  }

  /**
   * Returns true if Animation is playing (neither stopped nor paused).
   *
   * @return {boolean}
   */
  get isPlaying() {
    return this.mPaused === false && this.mStopped === false;
  }

  /**
   * Returns true if animation is completed.
   *
   * @return {boolean}
   */
  get isComplete() {
    return this.mCompleted;
  }

  /**
   * Returns name of this animation.
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }
}

/**
 * A Component which allows to play sprite animations.
 *
 * @cat animation
 * @extends black-engine~Component
 */
class AnimationController extends Component {
  /**
   * Creates an instance of AnimationController
   */
  constructor() {
    super();

    /**
     * @private
     * @type {Object<string, black-engine~AnimationInfo>}
     */
    this.mAnimations = {};

    /**
     * @private
     * @type {black-engine~AnimationInfo|null}
     */
    this.mCurrentAnim = null;
  }

  /**
   * Returns the AnimationInfo object that exists with the specified name.
   *
   * @param {string} name     The name of the child to return.
   * @returns {black-engine~AnimationInfo} Animation object that exists with the specified name.
   */
  getByName(name) {
    Debug.assert(name !== null, 'Animation must be set first.');
    Debug.assert(this.mAnimations.hasOwnProperty(name), 'Animation must be set first.');

    return this.mAnimations[name];
  }

  /**
   * Removes Animation object that exists with the specified name. If animation is playing right now it will be stopped.
   *
   * @param {string} name The name of the animation to remove.
   * @returns {void}
   */
  remove(name) {
    Debug.assert(name !== null, 'Animation name shall not be null.');
    Debug.assert(this.mAnimations.hasOwnProperty(name) === true, 'Unable to find animation.');

    let anim = this.mAnimations[name];

    if (this.mCurrentAnim !== null && this.mCurrentAnim === anim) {
      this.stop();
      delete this.mAnimations[name];
    }

    this.mCurrentAnim = null;
  }

  /**
   * Add the Animation object into the list of animations. If animation with given name already exists exception will be thrown.
   *
   * @param {string}          name        The name of animation to update
   * @param {Array<black-engine~Texture>}  textures    Array of Textures
   * @param {number}          [fps=14]    Frames Per Second
   * @param {boolean}         [loop=true] Indicated if animation should be started over at the end.
   * @return {black-engine~AnimationInfo} The newly created Animation Object.
   */
  add(name, textures, fps = 14, loop = true) {
    Debug.assert(textures.length > 0, 'Animation cannot be empty.');
    Debug.assert(fps > 0, 'FPS must be greater than 0.');
    Debug.assert(this.mAnimations.hasOwnProperty(name) == false, 'Animation with same name already exists');

    let anim = new AnimationInfo(this, name, textures, fps, loop);
    this.mAnimations[name] = anim;

    return anim;
  }

  /**
   * Plays animation that exists with the specified name.
   *
   * @param {string} name The name of animation to play.
   * @return {void}
   */
  play(name) {
    Debug.assert(this.mAnimations.hasOwnProperty(name), 'Animation must be set first.');

    this.mCurrentAnim = this.mAnimations[name];

    let texture = this.mCurrentAnim.__play();

    let sprite = /** @type {Sprite} */ (this.gameObject);
    if (sprite === null)
      return;

    if (texture !== null)
      sprite.texture = texture;
  }

  /**
   * Stops active animation. If no animations are playing at the moment nothing will happen.
   *
   * @return {void}
   */
  stop() {
    if (this.mCurrentAnim === null)
      return;

    this.mCurrentAnim.__stop();
  }

  /**
   * Pauses active animation.
   * 
   * @return {void}
   */
  pause() {
    if (this.mCurrentAnim === null)
      return;

    this.mCurrentAnim.__pause();
  }

  /**
   * @inheritDoc
   */
  onRender() {
    if (this.mCurrentAnim === null)
      return;

    let newTexture = this.mCurrentAnim.__update();
    if (newTexture === null)
      return;

    let sprite = /** @type {black-engine~Sprite} */ (this.gameObject);
    sprite.texture = newTexture;
  }

  /**
   * Returns current active animation.
   *
   * @returns {black-engine~AnimationInfo|null}
   */
  get currentAnimation() {
    return this.mCurrentAnim;
  }
}

/**
 * Distortion sound effect.
 * 
 * @cat audio.effects
 * @extends {black-engine~SoundEffect}
 */
class DistortionEffect extends SoundEffect {

  /**
   * Creates new instance of DistortionEffect
   * 
   * @param {number} value Level of distortion.
   */
  constructor(value = 0.5) {
    super();

    /** 
     * @private 
     * @type {WaveShaperNode} 
     */
    this.mWaveShaperNode = Black.audio.context.createWaveShaper();

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mInputNode = this.mWaveShaperNode;

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mOutputNode = this.mWaveShaperNode;

    /** 
     * @private 
     * @type {number} 
     */
    this.mSamples = 44100;

    /** 
     * @private 
     * @type {Float32Array} 
     */
    this.mCurve = new Float32Array(this.mSamples);

    /** 
     * @private 
     * @type {number}
     */
    this.mValue = value;

    this.distortion = value;
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set distortion(value) {
    this.mValue = MathEx.clamp(value, 0, 1);
    this.__makeDistortionCurve(this.mValue, this.mSamples, this.mCurve);
    this.mWaveShaperNode.curve = this.mCurve;
  }

  /**
   * Gets/Sets level of distortion
   * 
   * @public
   * @returns {number}
   */
  get distortion() {
    return this.mValue;
  }

  // https://stackoverflow.com/a/22313408
  /**
   * @ignore
   * @private
   * @param {number} amount 
   * @param {number} n_samples 
   * @param {Float32Array} curve 
   * @returns {Float32Array}
   */
  __makeDistortionCurve(amount, n_samples, curve) {
    let k = ~~(amount * 100);
    let deg = Math.PI / 180;
    let x = 0;
    for (let i = 0; i < n_samples; ++i) {
      x = i * 2 / n_samples - 1;
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
  };

  // tuna.js

//   makeDistortionCurve2(amount, n_samples, curve) {
//     amount = Math.min(amount, 0.9999);
//     let k = 2 * amount / (1 - amount),
//         i, x;
//     for (i = 0; i < n_samples; i++) {
//         x = i * 2 / n_samples - 1;
//         curve[i] = (1 + k) * x / (1 + k * Math.abs(x));
//     }
//   }

//   makeDistortionCurve3(amount, n_samples, curve) {
//     let i, x, y;
//     for (i = 0; i < n_samples; i++) {
//         x = i * 2 / n_samples - 1;
//         y = ((0.5 * Math.pow((x + 1.4), 2)) - 1) * y >= 0 ? 5.8 : 1.2;
//         curve[i] = tanh(y);
//     }
//   }

//   makeDistortionCurve4(amount, n_samples, curve) {
//     let i, x, y, a = 1 - amount;
//     for (i = 0; i < n_samples; i++) {
//         x = i * 2 / n_samples - 1;
//         y = x < 0 ? -Math.pow(Math.abs(x), a + 0.04) : Math.pow(x, a);
//         curve[i] = tanh(y * 2);
//     }
//   }

//   // is it working?
//   makeDistortionCurve5(amount, n_samples, curve) {
//     let i, x, y, abx, a = 1 - amount > 0.99 ? 0.99 : 1 - amount;
//     for (i = 0; i < n_samples; i++) {
//         x = i * 2 / n_samples - 1;
//         abx = Math.abs(x);
//         if (abx < a) y = abx;
//         else if (abx > a) y = a + (abx - a) / (1 + Math.pow((abx - a) / (1 - a), 2));
//         else if (abx > 1) y = abx;
//         curve[i] = sign(x) * y * (1 / ((a + 1) / 2));
//     }
//   }

//   makeDistortionCurve6(amount, n_samples, curve) {
//     let i, x;
//     for (i = 0; i < n_samples; i++) {
//         x = i * 2 / n_samples - 1;
//         if (x < -0.08905) {
//             curve[i] = (-3 / 4) * (1 - (Math.pow((1 - (Math.abs(x) - 0.032857)), 12)) + (1 / 3) * (Math.abs(x) - 0.032847)) + 0.01;
//         } else if (x >= -0.08905 && x < 0.320018) {
//             curve[i] = (-6.153 * (x * x)) + 3.9375 * x;
//         } else {
//             curve[i] = 0.630035;
//         }
//     }
//   }

//   // is it working?
//   makeDistortionCurve7(amount, n_samples, curve) {
//     let a = 2 + Math.round(amount * 14),
//     bits = Math.round(Math.pow(2, a - 1)),
//     i, x;
//     for (i = 0; i < n_samples; i++) {
//         x = i * 2 / n_samples - 1;
//         curve[i] = Math.round(x * bits) / bits;
//     }
//   }
}

// function sign(x) {
//   if (x === 0) {
//       return 1;
//   } else {
//       return Math.abs(x) / x;
//   }
// }

// function tanh(n) {
//   return (Math.exp(n) - Math.exp(-n)) / (Math.exp(n) + Math.exp(-n));
// }

/**
 * Equalizer.
 * 
 * @cat audio.effects
 * @extends {black-engine~SoundEffect}
 */
class SimpleEQ extends SoundEffect {
  /**
   * Creates new instance of equalizer.
   * 
   * @param {...number} frequencies List of frequencies to control sound with.
   */
  constructor(...frequencies) {
    super();

    // default values from winamp
    frequencies = frequencies || [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];

    /** 
     * @private 
     * @type {Array<BiquadFilterNode>} 
     */
    this.mFilters = [];

    for (let i = 0; i < frequencies.length; i++) {
      this.mFilters.push(this.__createFilter(frequencies[i]));
      if (i > 0)
        this.mFilters[i - 1].connect(/** @type {!AudioNode} */ (this.mFilters[i]));
    }

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mInputNode = this.mFilters[0];

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mOutputNode = this.mFilters[this.mFilters.length - 1];

    // todo: determine correct max value
    /** 
     * @private 
     * @type {number} 
     */
    this.mMaxGainLevel = 16; // 18

    /** 
     * @private 
     * @type {Object.<string, Array<number>>} 
     */
    this.mPresets = {};
  }

  /**
   * @ignore
   * @private
   * @param {number} freq 
   * @returns {BiquadFilterNode}
   */
  __createFilter(freq) {
    let f = Black.audio.context.createBiquadFilter();
    f.type = 'peaking';
    f.frequency.setValueAtTime(freq, 0);
    f.Q.setValueAtTime(1, 0);
    f.gain.setValueAtTime(0, 0);
    return f;
  }

  /**
   * Sets level by index.
   * 
   * @public
   * @param {number} freqIndex Index of frequency from the list.
   * @param {number} value     Ranging from -1 to 1.
   * @returns {void}
   */
  setLevelByIndex(freqIndex, value) {
    Debug.assert(freqIndex >= 0 && freqIndex < this.mFilters.length, 'Frequency index is out of range');
    if (freqIndex < 0 || freqIndex >= this.mFilters.length)
      return;
    value = MathEx.clamp(value, -1, 1);
    value *= this.mMaxGainLevel;
    this.mFilters[freqIndex].gain.setValueAtTime(value, 0);
  }

  /**
   * Sets level by frequency if there is one in the list.
   * 
   * @public
   * @param {number} freq  Concrete frequency value.
   * @param {number} value Ranging from -1 to 1.
   * @returns {void}
   */
  setLevelByFrequency(freq, value) {
    for (let i = 0; i < this.mFilters.length; i++) {
      if (this.mFilters[i].frequency.value === freq) {
        this.setLevelByIndex(i, value);
      }
    }
  }

  /**
   * Adds new preset of levels.
   * 
   * @public
   * @param {string} name      The name of a preset.
   * @param {...number} values Frequency levels. Their number must be equal to frequencies number.
   * @returns {void}
   */
  addPreset(name, ...values) {
    Debug.assert(values.length != this.mFilters.length, 'Number of preset values must be equal to frequencies number');
    this.mPresets[name] = values;
  }

  /**
   * Saves current levels as new preset with given name.
   * 
   * @public
   * @param {string} name The name of a preset.
   * @returns {void}
   */
  savePreset(name) {
    this.mPresets[name] = [];
    this.mFilters.forEach(x => this.mPresets[name].push(x.frequency.value / this.mMaxGainLevel));
  }

  /**
   * Applies previously added or saved preset.
   * 
   * @public
   * @param {string} name The name of a preset.
   * @returns {void}
   */
  applyPreset(name) {
    if (this.mPresets[name] !== null) {
      for (let i = 0; i < this.mPresets[name].length; i++) {
        this.setLevelByIndex(i, this.mPresets[name][i]);
      }
    }
  }
}

/**
 * Reverberation sound effect.
 * 
 * @cat audio.effects
 * @extends {black-engine~SoundEffect}
 */
class ReverbEffect extends SoundEffect {
  /**
   * Creates instance of ReverbEffect.
   * 
   * @param {AudioBuffer} IRBuffer Impulse Response audio buffer.
   */
  constructor(IRBuffer) {
    super();

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mInputNode = Black.audio._newGainNode();

    /** 
     * @protected 
     * @type {AudioNode} 
     */
    this.mOutputNode = Black.audio._newGainNode();

    /** 
     * @private 
     * @type {ConvolverNode} 
     */
    this.mConvolver = Black.audio.context.createConvolver();

    /** 
     * @private 
     * @type {GainNode} 
     */
    this.mDry = Black.audio._newGainNode();

    /** 
     * @private 
     * @type {GainNode} 
     */
    this.mWet = Black.audio._newGainNode();

    /** 
     * @private 
     * @type {BiquadFilterNode} 
     */
    this.mTone = Black.audio.context.createBiquadFilter();

    this.mConvolver.buffer = IRBuffer;

    this.mInputNode.connect(this.mDry);
    this.mDry.connect(this.mOutputNode);

    this.mInputNode.connect(this.mTone);
    this.mTone.connect(this.mConvolver);
    this.mConvolver.connect(this.mWet);
    this.mWet.connect(this.mOutputNode);

    this.mDry.gain.setValueAtTime(1, 0);
    this.mWet.gain.setValueAtTime(0, 0);
    this.mTone.type = 'lowpass';
    this.mTone.frequency.setValueAtTime(350, 0);
    this.mTone.Q.setValueAtTime(Math.SQRT1_2, 0);
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set wet(value) {
    value = MathEx.clamp(value, 0, 1);
    this.mWet.gain.setValueAtTime(value, 0);
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set dry(value) {
    value = MathEx.clamp(value, 0, 1);
    this.mDry.gain.setValueAtTime(value, 0);
  }

  /**
   * @public
   * @param {number} value
   * @returns {void}
   */
  set tone(value) {
    value = MathEx.clamp(value, 10, Black.audio.context.sampleRate / 2);
    this.mTone.frequency.setValueAtTime(value, 0);
  }

  /**
   * Gets/Sets level of convolved sound.
   * 
   * @public
   * @returns {number}
   */
  get wet() {
    return this.mWet.gain.value;
  }

  /**
   * Gets/Sets level of original sound with no effect.
   * 
   * @public
   * @returns {number}
   */
  get dry() {
    return this.mDry.gain.value;
  }

  /**
   * Gets/Sets frequency effect is applied on.
   * 
   * @public
   * @returns {number}
   */
  get tone() {
    return this.mTone.frequency.value;
  }
}

/**
 * The sound component.
 * 
 * @cat audio
 * @extends {black-engine~Component}
 */
class Sound extends Component {
  /**
   * Creates new instance of SoundComponent.
   * 
   * @param {string} name                    The name of sound. Uses Black.assets only.
   * @param {string=} [channel='master']     The name of channel, to play sound on.
   * @param {boolean=} [spatialEffect=false] Specifies if spatial effect is enabled.
   * @param {number=} [rolloff=100]          Determines how far from the listener the volume reduces.
   */
  constructor(name, channel = 'master', spatialEffect = false, rolloff = 100) {
    super();

    /** 
     * @private 
     * @type {black-engine~SoundClip} 
     */
    this.mSoundClip = Black.assets.getSound(name);

    /** 
     * @private 
     * @type {number} 
     */
    this.mRolloff = rolloff;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mPlayOnAdded = true;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mStopOnRemove = true;

    /** 
     * @private 
     * @type {black-engine~SoundInstance} 
     */
    this.mSoundInstance = null;

    /** 
     * @private 
     * @type {black-engine~MessageBinding|null}  
     */
    this.mCompleteBinding = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mSpatialEffect = spatialEffect;

    /** 
     * @private 
     * @type {string} 
     */
    this.mChannelName = channel;
  }

  /**
   * Starts playing sound.
   * 
   * @public
   * @param {number=} [volume=1]         The volume level.
   * @param {boolean=} [loop=false]      Specifies if sound repeats infinite times.
   * @param {boolean=} [overwrite=false] If true, stops previously started sound, if there is one.
   * @returns {black-engine~SoundInstance}            Newly created sound instance or already playing sound.
   */
  play(volume = 1, loop = false, overwrite = false) {
    overwrite && this.mSoundInstance && this.stop();
    if (!this.mSoundInstance || overwrite) {
      this.mSoundInstance = this.mSoundClip.play(this.mChannelName, volume, loop);
      this.mCompleteBinding = this.mSoundInstance.on(Message.COMPLETE, this.__onSoundComplete, this);
      this.spatialEffect = this.mSpatialEffect;
    }
    return this.mSoundInstance;
  }

  /**
   * Stops current sound instance if there is playing one.
   * 
   * @public
   * @returns {void}
   */
  stop() {
    if (this.mSoundInstance) {
      this.mCompleteBinding.off();
      this.mSoundInstance.stop();
      this.mSoundInstance = null;
    }
  }

  /**
   * @ignore
   * @private
   * @returns {void}
   */
  __onSoundComplete() {
    this.mSoundInstance = null;
  }

  /**
   * @inheritDoc
   */
  onAdded(gameObject) {
    if (this.mPlayOnAdded) {
      this.play();
    }
  }

  /**
   * @inheritDoc
   */
  onRemoved(gameObject) {
    if (this.mStopOnRemove && this.mSoundInstance) {
      this.mSoundInstance.stop();
    }
  }

  /**
   * @inheritDoc
   */
  onUpdate() {
    if (this.mSpatialEffect && this.mSoundInstance != null && this.mSoundInstance.isPlaying === true) {
      const stage = Black.stage;
      const pos = this.gameObject.localToGlobal(stage.globalToLocal(new Vector(this.gameObject.pivotX, this.gameObject.pivotY)));
      const px = (pos.x - stage.centerX) / stage.width * 2;
      const py = (pos.y - stage.centerY) / stage.height * 2;

      this.mSoundInstance.mSpatialPanner.setPosition(px, py, 0);
    }
  }

  /**

   * @param {boolean} value
   * @return {void}
   */
  set playOnAdded(value) {
    this.mPlayOnAdded = value;
  }

  /**
   * Gets/Sets whether the sound should start playing when added to stage. Default value is true.
   * 
   * @return {boolean}
   */
  get playOnAdded() {
    return this.mPlayOnAdded;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set stopOnRemove(value) {
    this.mStopOnRemove = value;
  }

  /**
   * Sets/Gets whether the sound should be stopped if the owner GameObject is being removed form the stage. Default value is true.
   *
   * @return {boolean}
   */
  get stopOnRemove() {
    return this.mStopOnRemove;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set spatialEffect(value) {
    this.mSpatialEffect = value;

    if (value && this.mSoundInstance != null && this.mSoundInstance.isPlaying === true) {
      let p = this.mSoundInstance.enableSpacePan();
      p.rolloffFactor = this.mRolloff;
      p.refDistance = 1;
      p.distanceModel = 'inverse';
    }
  }

  /**
   * Sets/Gets whether the sound should have spatial effect. Default value is false.
   *
   * @return {boolean}
   */
  get spatialEffect() {
    return this.mSpatialEffect;
  }
}

/**
 * The sound listener component, which controls one and only instance of AudioContext.listener.
 * 
 * @cat audio
 * @extends {black-engine~Component}
 */
class SoundListener extends Component {
  /**
   * Creates new instance of SoundListener.
   */
  constructor() {
    super();
  }

  /**
   * @inheritDoc
   */
  onRemoved(gameObject) {
    this.loose();
  }

  /**
   * Starts controlling only instance of AudioContext.listener.
   */
  listen() {
    Black.audio.currentListener = this;
  }

  /**
   * Stops controlling AudioContext.listener.
   */
  loose() {
    Black.audio.looseListener();
  }

  /**
   * @inheritDoc
   */
  onRender() {
    if (Black.audio.currentListener === this) {
      let listener = Black.audio.context.listener;
      
      let stage = Black.stage;
      let pos = this.gameObject.localToGlobal(stage.globalToLocal(new Vector(this.gameObject.pivotX, this.gameObject.pivotY)));
      let px = (pos.x - stage.centerX) / stage.width * 2;
      let py = (pos.y - stage.centerY) / stage.height * 2;
      if (listener.positionX != null) {
        listener.positionX.setValueAtTime(px, 0);
        listener.positionY.setValueAtTime(py, 0);
        listener.positionZ.setValueAtTime(1, 0);
      } else {
        listener.setPosition(px ,py, 1);
      }
    }
  }
}

/**
 * RigidBody is used to describe physics properties of game object colliders
 *
 * @cat physics
 * @extends black-engine~Component
 */
class RigidBody extends Component {
  /**
   * Creates new instance of RigidBody.
   */
  constructor() {
    super();

    /** 
     * Default collider. Used in case no any custom colliders provided by user.
     * @private 
     * @type {black-engine~BoxCollider}
     */
    this.mCollider = new BoxCollider(0, 0, 0, 0);

    /** 
     * For internal usage. To mark this body is in island.
     * @private 
     * @type {boolean}
     */
    this.mInGroup = false;

    /**
     * Flag to mark this body is in rest.
     * @private 
     * @type {boolean}
     */
    this.mIsSleeping = false;

    /** 
     * Internal counter. How many times (updates) this body has velocity lower than `Pair.sleepThreshold`.
     * @private 
     * @type {number}
     */
    this.mSleepTime = 0;

    /** 
     * All colliding pairs this body participates in.
     * @private 
     * @type {Array<black-engine~Pair>} 
     */
    this.mContacts = [];

    /**
     * Game object pivot. To track changes and update default collider if needed.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mPivot = new Vector(Number.MAX_VALUE);

    /**  
     * Game bounds position. To track changes and update this position, if object was moved without physics.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mCachedPosition = new Vector();

    /** 
     * All pairs this body participates in.
     * @public 
     * @type {Array<black-engine~Pair>}
     */
    this.mPairs = [];

    /** 
     * Flag to indicate immovable body.
     * @private 
     * @type {boolean}
     */
    this.mIsStatic = false;

    /** 
     * This position in stage coordinates.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mPosition = new Vector();

    /** 
     * This velocity to integrate.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mVelocity = new Vector();

    /** 
     * Force accumulator.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mForce = new Vector();

    /** 
     * Game object transform. To track changes and update this colliders.
     * @private 
     * @type {black-engine~Matrix}
     */
    this.mTransform = new Matrix(Number.MAX_VALUE);

    /**
     * Cached mass
     * @private 
     * @type {number}
     */
    this.mMass = 1;

    /**
     * Inverted mass or zero if body is static. 
     * 
     * @private
     * @ignore 
     * @type {number} 
     */
    this.mInvMass = 1;

    /** 
     * Velocity damper.
     * @public 
     * @type {number}
     */
    this.frictionAir = 0.01;

    /**
     * Friction for collision solving.
     * @public 
     * @type {number}
     */
    this.friction = 0.1;

    /**
     * Bounce for collision solving. 
     * @public 
     * @type {number}
     */
    this.bounce = 0.1;
  }

  /**
   * Returns this cached mass.
   *
   * @return {number}
   */
  get mass() {
    return this.mMass;
  }

  /**
   * Sets the mass of this body.
   *
   * @param {number} v Mass to set.
   * @return {void}
   */
  set mass(v) {
    this.mMass = v;

    if (v === 0 || this.mIsStatic) {
      this.mInvMass = 0;
    } else {
      this.mInvMass = 1 / v;
    }
  }

  /**
   * Returns this static indicator.
   *
   * @return {boolean}
   */
  get isStatic() {
    return this.mIsStatic;
  }

  /**
   * Sets this body movable state. Refresh inverted mass
   *
   * @param {boolean} v Value to set.
   *
   * @return {void}
   */
  set isStatic(v) {
    this.mIsStatic = v;
    this.mass = this.mMass;
  }

  /**
   * Sets the global position x of this body.
   *
   * @param {number} v Position to set.
   * @return {void}
   */
  set x(v) {
    this.mPosition.x = v;
  }

  /**
   * Returns this position x.
   *
   * @return {number}
   */
  get x() {
    return this.mPosition.x;
  }

  /**
   * Sets the global position y of this body.
   *
   * @param {number} v Position to set.
   * @return {void}
   */
  set y(v) {
    this.mPosition.y = v;
  }

  /**
   * Returns this position y.
   *
   * @return {number}
   */
  get y() {
    return this.mPosition.y;
  }

  /**
   * Sets the force x of this body.
   *
   * @param {number} v Force to set.
   * @return {void}
   */
  set forceX(v) {
    this.mIsSleeping = false;
    this.mForce.x = v;
  }

  /**
   * Returns this force x.
   *
   * @return {number}
   */
  get forceX() {
    return this.mForce.x;
  }

  /**
   * Sets the force y of this body.
   *
   * @param {number} v Force to set.
   * @return {void}
   */
  set forceY(v) {
    this.mIsSleeping = false;
    this.mForce.y = v;
  }

  /**
   * Returns this force y.
   *
   * @return {number}
   */
  get forceY() {
    return this.mForce.y;
  }

  /**
   * Sets the velocity x of this body.
   *
   * @param {number} v Velocity to set.
   * @return {void}
   */
  set velocityX(v) {
    this.mVelocity.x = v;
  }

  /**
   * Returns this velocity x.
   *
   * @return {number}
   */
  get velocityX() {
    return this.mVelocity.x;
  }

  /**
   * Sets the velocity y of this body.
   *
   * @param {number} v Velocity to set.
   * @return {void}
   */
  set velocityY(v) {
    this.mVelocity.y = v;
  }

  /**
   * Returns this velocity y.
   *
   * @return {number}
   */
  get velocityY() {
    return this.mVelocity.y;
  }

  /**
   * Updates game object position, colliders
   *
   * @public
   * @return {void}
   */
  update() {
    const gameObject = this.gameObject;
    const colliders = gameObject.mCollidersCache;
    const collider = this.mCollider;
    const position = this.mPosition;
    const wt = gameObject.worldTransformation;
    const wtData = wt.data;
    const transform = this.mTransform;

    // Check scale x, y and rotation (skew is forbidden for arcade physics)
    // Also for circle world scale x and y should be the same
    if (transform.data[0] !== wtData[0] || transform.data[2] !== wtData[2]) {
      transform.set(wtData[0], wtData[1], wtData[2], wtData[3], 0, 0);
      collider.mChanged = true;

      for (let i = 0, l = colliders.length; i < l; i++) {
        colliders[i].mChanged = true;
      }
    }

    if (gameObject !== Black.stage) {
      const cachedPosition = this.mCachedPosition;
      const prevX = cachedPosition.x;
      const prevY = cachedPosition.y;

      wt.transformXY(gameObject.pivotX, gameObject.pivotY, cachedPosition);

      // Update this position if game object position was changed during frame
      position.x += cachedPosition.x - prevX;
      position.y += cachedPosition.y - prevY;

      gameObject.parent.globalToLocal(position, cachedPosition);
      gameObject.x = cachedPosition.x;
      gameObject.y = cachedPosition.y;
      gameObject.worldTransformation.transformXY(gameObject.pivotX, gameObject.pivotY, cachedPosition);
    }

    // Refresh colliders
    if (colliders.length === 0) {
      // TODO; do we need a boundsChanged callback?
      let bounds = gameObject.localBounds;

      if (gameObject instanceof DisplayObject) {
        let disp = /** @type {DisplayObject} */(gameObject);
        if (disp.mClipRect !== null)
          collider.set(0, 0, bounds.width, bounds.height);
        else
          collider.set(-gameObject.pivotX, -gameObject.pivotY, bounds.width, bounds.height);
      } else {
        collider.set(-gameObject.pivotX, -gameObject.pivotY, bounds.width, bounds.height);
      }

      collider.refresh(transform, position);
    } else {
      for (let i = 0, l = colliders.length; i < l; i++) {
        colliders[i].refresh(transform, position);
      }
    }
  }

  /**
   * Resets colliders dirty state after collision test. Sync with update
   *
   * @public
   * @return {void}
   */
  clearFlags() {
    const colliders = this.gameObject.mCollidersCache;
    this.mCollider.mChanged = false;

    for (let i = 0, l = colliders.length; i < l; i++) {
      colliders[i].mChanged = false;
    }
  }

  // /**
  //  * Draws all the colliders
  //  *
  //  * @public
  //  * @return {void}
  //  */
  // debug() {
  //   if (!this.gameObject) return;
  //
  //   if (RigidBody.mDebug.graphics === null) {
  //     RigidBody.mDebug.graphics = new Graphics();
  //   }
  //
  //   const debug = RigidBody.mDebug;
  //   const graphics = debug.graphics;
  //   const colliders = this.gameObject.mCollidersCache;
  //
  //   if (debug.time !== Black.instance.mLastFrameTimeMs) {
  //     debug.time = Black.instance.mLastFrameTimeMs;
  //     Black.stage.add(debug.graphics);
  //
  //     debug.graphics.clear();
  //   }
  //
  //   debug.graphics.lineStyle(2, this.mIsSleeping ? 0x00ff00 : 0xff0000);
  //
  //   if (colliders.length === 0) {
  //     this.mCollider.debug(graphics, this.mCachedPosition);
  //   } else {
  //     for (let i = 0, l = colliders.length; i < l; i++) {
  //       colliders[i].debug(graphics, this.mCachedPosition);
  //     }
  //   }
  // }
}

// /** @private @type {Object} Debug options */
// RigidBody.mDebug = {
//   graphics: null,
//   time    : 0,
// };

/**
 * Projection is used to calculate ranges for collision test with Separate Axis Theorem.
 *
 * @cat physics.arcade.helpers
 */
class Projection {
  /**
   * Creates new instance of Projection.
   */
  constructor() {

    /** 
     * @private 
     * @type {black-engine~Vector|null} Box normal 
     */
    this.axis = null;

    /** 
     * @private 
     * @type {Array<black-engine~Vector>|null} Box a vertices 
     */
    this.verticesA = null;

    /** 
     * @private 
     * @type {Array<black-engine~Vector>|null} Box b vertices 
     */
    this.verticesB = null;

    /** 
     * @private 
     * @type {black-engine~Range} Range from project box a vertices to axis 
     */
    this.rangeA = new Range();

    /** 
     * @private 
     * @type {black-engine~Range} Range from project box b vertices to axis 
     */
    this.rangeB = new Range();

    /** 
     * @private 
     * @type {number} body a to body b offset projected on the axis 
     */
    this.offset = 0;
  }

  /**
   * Setter
   *
   * @public
   *
   * @param {Array<black-engine~Vector>} verticesA box a points
   * @param {Array<black-engine~Vector>} verticesB box b points
   * @param {black-engine~Vector}        axis One from box normals
   *
   * return {void}
   */
  set(verticesA, verticesB, axis) {
    this.verticesA = verticesA;
    this.verticesB = verticesB;
    this.axis = axis;
    this.refresh();
  }

  /**
   * Recalculates the ranges.
   *
   * @public
   *
   * return {void}
   */
  refresh() {
    Projection.__project(this.verticesA, this.axis, this.rangeA);
    Projection.__project(this.verticesB, this.axis, this.rangeB);
  }

  /**
   * Recalculates range.
   *
   * @private
   *
   * return {void}
   */
  static __project(points, axis, range) {
    let min = Number.MAX_VALUE;
    let max = -Number.MAX_VALUE;

    for (let i = 0, l = points.length; i < l; i++) {
      const dot = points[i].dot(axis);
      min = dot < min ? dot : min;
      max = dot > max ? dot : max;
    }

    range.min = min;
    range.max = max;
  }
}

/**
 * Simple range helper class.
 *
 * @cat physics.arcade.helpers
 */
class Range {
  /**
   * Creates new instance of Range.
   */
  constructor() {

    /** 
     * Min value.
     * @public 
     * @type {number} 
     */
    this.min = 0;

    /** 
     * Max value.
     * @public 
     * @type {number} 
     */
    this.max = 0;
  }
}

/**
 * Updates to start sleep if velocities is lower, than sleep threshold.
 *
 * @ignore 
 * @type {number} 
 */
let timeToSleep = 5; //

/**
 * How many pixels colliders can overlap each other without resolve.
 *
 * @ignore 
 * @type {number} 
 */
let slop = 1;

/**
 * Position correction koefficient. Lower is softer and with less twitches.
 *
 * @ignore 
 * @type {number} 
 */
let baumgarte = 0.2;

/**
 * Scale koefficient to normalize physics in some local coordinates or different resolutions.
 *
 * @ignore 
 * @type {number} 
 */
let unitsPerMeter = 1;

/**
 * Maximum body speed to begin sleep process, if sleeping is enabled.
 *
 * @ignore 
 * @type {number} 
 */
let sleepThreshold = 0.1;

/**
 * Minimal relative velocity within two bodies, required for bounce effect.
 *
 * @ignore 
 * @type {number} 
 */
let bounceTreshhold = 1;

/**
 * Pair is used for narrow test, and resolve collision within two colliders.
 *
 * @cat physics.arcade.pairs
 */

class Pair {
  /**
   * Creates new instance of Pair.
   */
  constructor() {
    /**
     * Collider from body a.
     * @public 
     * @type {Collider|null}
     */
    this.a = null;

    /**
     * Collider from body b.
     * @public 
     * @type {black-engine~Collider|null}
     */
    this.b = null;

    /**
     * Parent of collider a.
     * @public 
     * @type {black-engine~RigidBody|null}
     */
    this.bodyA = null;

    /**
     * Parent of collider b.
     * @public 
     * @type {black-engine~RigidBody|null}
     */
    this.bodyB = null;

    /**
     * Flag to indicate collision state.
     * @private 
     * @type {boolean}
     */
    this.mInCollision = false;

    /**
     * Flag to determine one from two bodies can move. invMass !== 0 and isSleeping === false.
     * @private 
     * @type {boolean}
     */
    this.mIsStatic = false;

    /**
     * Cached normal impulse to apply in next iteration or frame if collision still exist.
     * @private 
     * @type {number}
     */
    this.mNormalImpulse = 0;

    /**
     * Cached tangent impulse to apply in next iteration or frame if collision still exist.
     * @private 
     * @type {number}
     */
    this.mTangentImpulse = 0;

    /**
     * Position impulse cache to use within iterations.
     * @private 
     * @type {number}
     */
    this.mPositionImpulse = 0;

    /**
     * This colliders cached friction.
     * @private 
     * @type {number}
     */
    this.mFriction = 0;

    /**
     * This colliders cached bounce factor.
     * @private 
     * @type {number}
     */
    this.mBias = 0;

    /**
     * This colliders cached inverse mass sum.
     * @private 
     * @type {number}
     */
    this.mMass = 0;

    /**
     * Offset within the colliders on preSolve to correct overlap on each iteration.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mOffset = new Vector();

    /**
     * Normal collision direction from a to b.
     * @private 
     * @type {black-engine~Vector}
     */
    this.mNormal = new Vector();

    /**
     * Positive number. Penetration within colliders.
     * @private 
     * @type {number}
     */
    this.mOverlap = 0;

    /**
     * Flag to indicate this pair needs refresh.
     * @private 
     * @type {boolean}
     */
    this.mChanged = false;
  }

  /**
   * Tests the collision state. Updates normal and overlap for solve.
   *
   * @public
   *
   * @return {boolean} This pair in collision flag
   */
  test() {
    return this.mInCollision;
  }

  /**
   * Prepares the solve properties depends on bodies physics characteristics and test result.
   *
   * @public
   *
   * @return {void}
   */
  preSolve() {
    const normalX = this.mNormal.x;
    const normalY = this.mNormal.y;
    const tangentX = -normalY;
    const tangentY = +normalX;
    const positionA = this.bodyA.mPosition;
    const positionB = this.bodyB.mPosition;
    const velocityA = this.bodyA.mVelocity;
    const velocityB = this.bodyB.mVelocity;
    const invMassA = this.bodyA.mInvMass;
    const invMassB = this.bodyB.mInvMass;
    const offset = this.mOffset;

    const impulseX = this.mNormalImpulse * normalX + this.mTangentImpulse * tangentX;
    const impulseY = this.mNormalImpulse * normalY + this.mTangentImpulse * tangentY;

    offset.x = positionB.x - positionA.x;
    offset.y = positionB.y - positionA.y;

    velocityA.x -= impulseX * invMassA;
    velocityA.y -= impulseY * invMassA;

    velocityB.x += impulseX * invMassB;
    velocityB.y += impulseY * invMassB;

    const relVelX = velocityB.x - velocityA.x;
    const relVelY = velocityB.y - velocityA.y;
    const relVel = relVelX * normalX + relVelY * normalY;

    const bounceThreshold = Pair.bounceTreshhold * Pair.unitsPerMeter * Black.stage.mScaleX;
    this.mBias = relVel < -bounceThreshold ? -Math.max(this.bodyA.bounce, this.bodyB.bounce) * relVel : 0;
    this.mMass = 1 / (invMassA + invMassB);
    this.mFriction = Math.min(this.bodyA.friction, this.bodyB.friction);
    this.mPositionImpulse = 0;
  }

  /**
   * Updates the bodies velocities to solve collision.
   *
   * @public
   *
   * @return {void}
   */
  solveVelocity() {
    const normalX = this.mNormal.x;
    const normalY = this.mNormal.y;
    const tangentX = -normalY;
    const tangentY = +normalX;
    const velocityA = this.bodyA.mVelocity;
    const velocityB = this.bodyB.mVelocity;
    const invMassA = this.bodyA.mInvMass;
    const invMassB = this.bodyB.mInvMass;

    {
      const relVelX = velocityB.x - velocityA.x;
      const relVelY = velocityB.y - velocityA.y;
      const relVel = relVelX * normalX + relVelY * normalY;
      let impulse = -(relVel - this.mBias) * this.mMass;
      const newImpulse = Math.max(this.mNormalImpulse + impulse, 0);
      impulse = newImpulse - this.mNormalImpulse;
      this.mNormalImpulse = newImpulse;

      const impulseX = impulse * normalX;
      const impulseY = impulse * normalY;

      velocityA.x -= impulseX * invMassA;
      velocityA.y -= impulseY * invMassA;

      velocityB.x += impulseX * invMassB;
      velocityB.y += impulseY * invMassB;
    }

    {
      const relVelX = velocityB.x - velocityA.x;
      const relVelY = velocityB.y - velocityA.y;
      const relVel = relVelX * tangentX + relVelY * tangentY;
      let impulse = -relVel * this.mMass;
      const maxFriction = this.mFriction * this.mNormalImpulse;
      const newImpulse = MathEx.clamp(this.mTangentImpulse + impulse, -maxFriction, maxFriction);
      impulse = newImpulse - this.mTangentImpulse;
      this.mTangentImpulse = newImpulse;

      const impulseX = impulse * tangentX;
      const impulseY = impulse * tangentY;

      velocityA.x -= impulseX * invMassA;
      velocityA.y -= impulseY * invMassA;

      velocityB.x += impulseX * invMassB;
      velocityB.y += impulseY * invMassB;
    }
  }

  /**
   * Updates the bodies positions to solve collision.
   *
   * @public
   *
   * @return {void}
   */
  solvePosition() {
    const normalX = this.mNormal.x;
    const normalY = this.mNormal.y;
    const invMassA = this.bodyA.mInvMass;
    const invMassB = this.bodyB.mInvMass;
    const positionA = this.bodyA.mPosition;
    const positionB = this.bodyB.mPosition;
    const offset = this.mOffset;

    const dx = offset.x - positionB.x + positionA.x;
    const dy = offset.y - positionB.y + positionA.y;

    const overlap = this.mOverlap + (dx * normalX + dy * normalY);
    const correction = (overlap - Pair.slop) * Pair.baumgarte;

    if (correction <= 0)
      return;

    let normalImpulse = correction * this.mMass;
    const impulsePrev = this.mPositionImpulse;
    this.mPositionImpulse = Math.max(impulsePrev + normalImpulse, 0);
    normalImpulse = this.mPositionImpulse - impulsePrev;

    const impulseX = normalImpulse * normalX;
    const impulseY = normalImpulse * normalY;

    positionA.x -= impulseX * invMassA;
    positionA.y -= impulseY * invMassA;

    positionB.x += impulseX * invMassB;
    positionB.y += impulseY * invMassB;
  }

  /**
   * Generates pair id.
   *
   * @public
   * @param {black-engine~Collider} a Pair collider
   * @param {black-engine~Collider} b Pair collider
   *
   * @return {string} Pair unique id
   */
  static __id(a, b) {
    return a.mId > b.mId ? `${a.mId}&${b.mId}` : `${b.mId}&${a.mId}`;
  }

  /**
   * Updates to start sleep if velocities is lower, than sleep threshold.
   *
   * @type {number} 
   */
  static get timeToSleep() { return timeToSleep; }
  static set timeToSleep(value) { timeToSleep = value; }

  /**
   * How many pixels colliders can overlap each other without resolve.
   *  
   * @type {number} 
   */
  static get slop() { return slop; }
  static set slop(value) { slop = value; }

  /**
   * Position correction koefficient. Lower is softer and with less twitches.
   *  
   * @type {number} 
   */
  static get baumgarte() { return baumgarte; };
  static set baumgarte(value) { baumgarte = value; };

  /**
   * Scale koefficient to normalize physics in some local coordinates or different resolutions.
   *  
   * @type {number} 
   */
  static get unitsPerMeter() { return unitsPerMeter; }
  static set unitsPerMeter(value) { unitsPerMeter = value; }

  /**
   * Maximum body speed to begin sleep process, if sleeping is enabled.
   *  
   * @type {number} 
   */
  static get sleepThreshold() { return sleepThreshold; };
  static set sleepThreshold(value) { sleepThreshold = value; };

  /**
   * Minimal relative velocity within two bodies, required for bounce effect.
   *  
   * @type {number} 
   */
  static get bounceTreshhold() { return bounceTreshhold; }
  static set bounceTreshhold(value) { bounceTreshhold = value; }
}

var pool$1 = null;

/**
 * BoxToBoxPair is used to test collision within boxes
 *
 * @cat physics.arcade.pairs
 * @extends black-engine~Pair
 */
class BoxToBoxPair extends Pair {
  /**
   * Creates new instance of BoxToBoxPair.
   */
  constructor() {
    super();

    /**
     * Collider from body a.
     * 
     * @public 
     * @type {black-engine~BoxCollider|null}
     */
    this.a = null;

    /**
     * Collider from body b. 
     * 
     * @public 
     * @type {black-engine~BoxCollider|null}
     */
    this.b = null;

    const projections = [];

    for (let i = 0; i < 4; i++) {
      projections.push(new Projection());
    }

    /**
     * Projection keeps range of projected vertices. For each normal from both the colliders.
     * @private 
     * @type {Array<black-engine~Projection>}
     */
    this.mProjections = projections;
  }

  /**
   * Updates this pair with a new given colliders and bodies.
   *
   * @public
   *
   * @param {black-engine~BoxCollider} a   Pair collider
   * @param {black-engine~BoxCollider} b   Pair collider
   * @param {black-engine~RigidBody} bodyA Pair body
   * @param {black-engine~RigidBody} bodyB Pair body
   *
   * @return {Pair} This
   */
  set(a, b, bodyA, bodyB) {
    this.a = a;
    this.b = b;
    this.bodyA = bodyA;
    this.bodyB = bodyB;

    const projections = this.mProjections;

    for (let i = 0, j = 0; i < 4; i += 2, j += 1) {
      projections[i].set(a.mVertices, b.mVertices, a.mNormals[j]);
      projections[i + 1].set(a.mVertices, b.mVertices, b.mNormals[j]);
    }

    return this;
  }

  /**
   * Refreshes projections.
   *
   * @private
   *
   * @return {void}
   */
  __refreshProjectionsRanges() {
    const projections = this.mProjections;

    for (let i = 0; i < 4; i++) {
      projections[i].refresh();
    }
  }

  /**
   * @inheritDoc
   */
  test() {
    const a = this.a;
    const b = this.b;

    if (a.mChanged || b.mChanged) {
      this.mChanged = true;
    }

    if (a.mMax.x < b.mMin.x || a.mMin.x > b.mMax.x || a.mMax.y < b.mMin.y || a.mMin.y > b.mMax.y) {
      return this.mInCollision = false;
    }

    const projections = this.mProjections;
    const normal = this.mNormal;
    const offsetX = this.bodyB.mPosition.x - this.bodyA.mPosition.x;
    const offsetY = this.bodyB.mPosition.y - this.bodyA.mPosition.y;

    if (this.mChanged) {
      this.mChanged = false;
      this.__refreshProjectionsRanges();
    }

    this.mOverlap = Number.MAX_VALUE;

    for (let i = 0; i < 4; i++) {
      const projection = projections[i];
      projection.offset = projection.axis.x * offsetX + projection.axis.y * offsetY;
      const minA = projection.rangeA.min;
      const maxA = projection.rangeA.max;
      const minB = projection.rangeB.min + projection.offset;
      const maxB = projection.rangeB.max + projection.offset;

      if (minA > maxB || minB > maxA) {
        return this.mInCollision = false;
      }
    }

    for (let i = 0; i < 4; i++) {
      const projection = projections[i];
      const minA = projection.rangeA.min;
      const maxA = projection.rangeA.max;
      const minB = projection.rangeB.min + projection.offset;
      const maxB = projection.rangeB.max + projection.offset;

      const optionA = maxA - minB;
      const optionB = maxB - minA;
      let overlap = optionA < optionB ? optionA : -optionB;

      if (minA < minB && maxA < maxB) {
        overlap = maxA - minB;
      } else if (maxA > maxB) {
        overlap = minA - maxB;
      }

      const absOverlap = Math.abs(overlap);

      if (absOverlap < this.mOverlap) {
        this.mOverlap = absOverlap;
        normal.copyFrom(projection.axis);
        overlap < 0 && normal.multiplyScalar(-1);
      }
    }

    return this.mInCollision = true;
  }

  static get pool() {
    if (pool$1 === null)
      pool$1 = new ObjectPool(BoxToBoxPair, 100);

    return pool$1;
  }
}

var pool$2 = null;

/**
 * BoxToCirclePair is used to test collision within box - circle colliders.
 *
 * @cat physics.arcade.pairs
 * @extends black-engine~Pair
 */

class BoxToCirclePair extends Pair {

  /**
   * Creates new instance of BoxToBoxPair.
   */
  constructor() {
    super();

    /**
     * Collider from body a. 
     * @public 
     * @type {BoxCollider|null}
     */
    this.a = null;

    /**
     * Collider from body a. 
     * @public 
     * @type {CircleCollider|null}
     */
    this.b = null;

    /** 
     * Cached half width of box in stage coordinates.
     * @private 
     * @type {number}
     */
    this.mBoxHalfWidth = 0;

    /** 
     * Cached half height of box in stage coordinates,
     * @private 
     * @type {number}
     */
    this.mBoxHalfHeight = 0;

    /**
     * Cached cos and sin from box game object world transformation without scale, to rotate.
     * @private 
     * @type {Vector}
     */
    this.mBoxRotate = new Vector();

    /**
     * Tmp point to rotate. 
     * @private 
     * @type {Vector}
     */
    this.mCircleCenter = new Vector();
  }

  /**
   * Assigns colliders and bodies to this pair.
   *
   * @public
   *
   * @param {BoxCollider} a     Pair box collider
   * @param {CircleCollider} b  Pair circle collider
   * @param {RigidBody} bodyA   Pair body
   * @param {RigidBody} bodyB   Pair body
   *
   * @return {Pair} This
   */
  set(a, b, bodyA, bodyB) {
    this.a = a;
    this.b = b;
    this.bodyA = bodyA;
    this.bodyB = bodyB;

    return this;
  }

  /**
   * Rotates point around anchor
   *
   * @private
   *
   * @return {void}
   */
  __rotate(point, anchorX, anchorY, cos, sin) {
    const x = point.x - anchorX;
    const y = point.y - anchorY;
    const tx = cos * x - sin * y;
    const ty = sin * x + cos * y;

    point.x = tx + anchorX;
    point.y = ty + anchorY;
  }

  /**
   * @inheritDoc
   */
  test() {
    const box = this.a;
    const circle = this.b;

    if (box.mChanged) {
      this.mChanged = true;
    }

    if (box.mMax.x < circle.mMin.x || box.mMin.x > circle.mMax.x ||
      box.mMax.y < circle.mMin.y || box.mMin.y > circle.mMax.y) {
      return this.mInCollision = false;
    }

    if (this.mChanged) {
      this.mChanged = false;
      const transformData = this.bodyA.mTransform.data;
      const scaleX = Math.sqrt(transformData[0] * transformData[0] + transformData[1] * transformData[1]);
      const scaleY = Math.sqrt(transformData[2] * transformData[2] + transformData[3] * transformData[3]);

      this.mBoxRotate.set(transformData[0] / scaleX, transformData[1] / scaleX);
      this.mBoxHalfWidth = box.mRect.width / 2 * scaleX;
      this.mBoxHalfHeight = box.mRect.height / 2 * scaleY;
    }

    const boxRotate = this.mBoxRotate;
    const normal = this.mNormal;
    const circleCenter = this.mCircleCenter.copyFrom(circle.mCenter);
    let hw = this.mBoxHalfWidth;
    let hh = this.mBoxHalfHeight;

    const rotated = boxRotate.y !== 0;

    if (rotated) {
      this.__rotate(circleCenter, box.mCenter.x, box.mCenter.y, boxRotate.x, -boxRotate.y);
    }

    const dx = circleCenter.x - box.mCenter.x;
    const dy = circleCenter.y - box.mCenter.y;

    if (dx === 0 && dy === 0) {
      this.mOverlap = circle.mRadius + hw;
      normal.set(-1, 0);

      return this.mInCollision = true;
    }

    let closestX = MathEx.clamp(dx, -hw, hw);
    let closestY = MathEx.clamp(dy, -hh, hh);
    const inside = dx === closestX && dy === closestY;

    if (inside) {
      if (Math.abs(dx) > Math.abs(dy)) {
        closestX = closestX > 0 ? hw : -hw;
      } else {
        closestY = closestY > 0 ? hh : -hh;
      }
    }

    const normalX = dx - closestX;
    const normalY = dy - closestY;
    const sqLength = normalX * normalX + normalY * normalY;
    const r = circle.mRadius;

    if (sqLength > r * r && !inside) {
      return this.mInCollision = false;
    }

    if (sqLength === 0) {
      this.mOverlap = r;
      normal.set(0, 1);
    } else {
      const d = Math.sqrt(sqLength);
      this.mOverlap = r - d;
      inside ? normal.set(-normalX / d, -normalY / d) : normal.set(normalX / d, normalY / d);
    }

    if (rotated) {
      this.__rotate(normal, 0, 0, boxRotate.x, boxRotate.y);
    }

    return this.mInCollision = true;
  }

  static get pool() {
    if (pool$2 === null)
      pool$2 = new ObjectPool(BoxToCirclePair, 100);

    return pool$2;
  }
}

var pool$3 = null;

/**
 * CircleToCirclePair is used to test collision within circles colliders.
 *
 * @cat physics.arcade.pairs
 * @extends black-engine~Pair
 */
class CircleToCirclePair extends Pair {
  /**
   * Creates new instance of CircleToCirclePair.
   */
  constructor() {
    super();

    /**
     * Collider from body a. 
     * @public 
     * @type {black-engine~CircleCollider|null}
     */
    this.a = null;

    /**
     * Collider from body b. 
     * @public 
     * @type {black-engine~CircleCollider|null}
     */
    this.b = null;
  }

  /**
   * Setter
   *
   * @public
   *
   * @param {black-engine~CircleCollider} a  Pair circle collider
   * @param {black-engine~CircleCollider} b  Pair circle collider
   * @param {black-engine~RigidBody} bodyA   Pair body
   * @param {black-engine~RigidBody} bodyB   Pair body
   *
   * @return {Pair} This
   */
  set(a, b, bodyA, bodyB) {
    this.a = a;
    this.b = b;
    this.bodyA = bodyA;
    this.bodyB = bodyB;

    return this;
  }

  /**
   * @inheritDoc
   */
  test() {
    const a = this.a;
    const b = this.b;
    const offsetX = b.mCenter.x - a.mCenter.x;
    const offsetY = b.mCenter.y - a.mCenter.y;
    const totalRadius = a.mRadius + b.mRadius;

    if (offsetX === 0 && offsetY === 0) {
      this.mOverlap = totalRadius;
      this.mNormal.set(1, 0);

      return this.mInCollision = true;
    }

    const totalRadiusSq = totalRadius * totalRadius;
    const distanceSq = offsetX * offsetX + offsetY * offsetY;

    if (distanceSq > totalRadiusSq) {
      return this.mInCollision = false;
    }

    const dist = Math.sqrt(distanceSq);
    this.mOverlap = totalRadius - dist;
    this.mNormal.set(offsetX / dist, offsetY / dist);

    return this.mInCollision = true;
  }

  static get pool() {
    if (pool$3 === null)
      pool$3 = new ObjectPool(CircleToCirclePair, 100);

    return pool$3;
  }
}

/**
 * Broad collision checker using hash algorithm.
 *
 * @cat physics.arcade.phases
 */
class BroadPhase {
  /**
   * Creates new instance of BroadPhase.
   */
  constructor() { }

  /**
   * Test collision in each pair. Sets inCollision flag to false if there is no collision in pair.
   *
   * @param {Array<black-engine~Pair>} pairs All the arcade world colliders pairs.
   * @return {void}
   */
  test(pairs) { }
}

/**
 * Simple AABB physics engine (beta).
 *
 * @cat physics.arcade
 * @extends black-engine~System
 */
class Arcade extends System {
  /**
   * Creates new Arcade instance.
   */
  constructor() {
    super();

    /**
     * Bodies that are on stage.
     * @private 
     * @type {Array<black-engine~RigidBody>}
     */
    this.mBodies = [];

    /**
     * Pairs to check collisions within. With colliders which bodies are on stage.
     * @private 
     * @type {Array<black-engine~Pair>}
     */
    this.mPairs = [];

    /**
     * Pairs which are in collision per frame.
     * @private 
     * @type {Array<black-engine~Pair>}
     */
    this.mContacts = [];

    /**
     * Broad collision test instance.
     * @private 
     * @type {black-engine~BroadPhase}
     */
    this.mBroadPhase = new BroadPhase();

    /**
     * Object to store pairs by their id. For quick search in collision callbacks.
     * @private 
     * @type {Object}
     */
    this.mPairsHash = Object.create(null);

    /**
     * Reference to world bounds body.
     * @private 
     * @type {black-engine~RigidBody|null}
     */
    this.mBoundsBody = null;

    /** @private 
     * @type {black-engine~BoxCollider} */
    this.mBoundsLeft = new BoxCollider(0, 0, 0, 0);

    /** @private 
     * @type {black-engine~BoxCollider} */
    this.mBoundsRight = new BoxCollider(0, 0, 0, 0);

    /** @private 
     * @type {black-engine~BoxCollider} */
    this.mBoundsTop = new BoxCollider(0, 0, 0, 0);

    /** @private 
     * @type {black-engine~BoxCollider} */
    this.mBoundsBottom = new BoxCollider(0, 0, 0, 0);

    /** @private 
     * @type {black-engine~Vector} */
    this.mGravity = new Vector(0, 1000);

    /**
     * Bigger value gives better resolver result, but require more calculations.
     * @private 
     * @type {number}
     */
    this.mIterations = 5;

    /**
     * Switch for sleep calculations.
     * @private 
     * @type {boolean}
     */
    this.mSleepEnabled = true;

    /**
     * Update delta time, secs.
     * @public
     * @type {number}
     */
    this.delta = 1 / 60;
  }

  /**
   * Invokes passed callback if given colliders are in collision.
   *
   * Callback params:
   * normalX - collision normal projected on x axis. In direction from colliderA to colliderB.
   * normalY - collision normal projected on y axis. In direction from colliderA to colliderB.
   * overlap - positive number.
   * [args] - rest arguments.
   *
   * @public
   *
   * @param {black-engine~Collider} colliderA Collider to check
   * @param {black-engine~Collider} colliderB Collider to check
   * @param {Function} cb        Callback
   * @param {Object} ctx         Callback context
   * @param {...*} [args]        Rest arguments
   *
   * @return {void}
   */
  collisionInfo(colliderA, colliderB, cb, ctx, ...args) {
    const pair = this.mPairsHash[Pair.__id(colliderA, colliderB)];

    if (pair && pair.mInCollision) {
      const sign = pair.a === colliderA ? 1 : -1;
      cb.call(ctx, pair.mNormal.x * sign, pair.mNormal.y * sign, pair.mOverlap, ...args);
    }
  }

  /**
   * If callback passed and given bodies are in collision invokes callback.
   * If no bodyB provided result will show that bodyA is in collision with any other body if so.
   *
   * Note: if more than one collision occurred within bodies, callback will be invoked only with a first found.
   *
   * Callback params:
   * normalX - collision normal projected on x axis. In direction from bodyA collider to bodyB collider.
   * normalY - collision normal projected on y axis. In direction from bodyA collider to bodyB collider.
   * overlap - positive number.
   * [args] - rest arguments.
   *
   * @public
   *
   * @param {black-engine~RigidBody} bodyA         Body to check
   * @param {black-engine~RigidBody=} [bodyB=null] Body to check
   * @param {Function=} [cb=null]     Callback
   * @param {Object=} [ctx=null]      Callback context
   * @param {...*} [args]             Rest arguments
   *
   * @return {boolean} Indicator of bodies collision.
   */
  isColliding(bodyA, bodyB = null, cb = null, ctx = null, ...args) {
    const pairs = bodyA.mPairs;

    if (bodyB === null) {
      for (let i = 0, l = pairs.length; i < l; i++) {
        if (pairs[i].mInCollision) {
          return true;
        }
      }

      return false;
    }

    for (let i = 0, l = pairs.length; i < l; i++) {
      const pair = pairs[i];

      if (pair.mInCollision === false)
        continue;

      const sign = pair.bodyA === bodyA && pair.bodyB === bodyB ? 1 :
        pair.bodyA === bodyB && pair.bodyB === bodyA ? -1 : 0;

      if (sign === 0)
        continue;

      if (cb)
        cb.call(ctx, pair.mNormal.x * sign, pair.mNormal.y * sign, pair.mOverlap, ...args);

      return true;
    }

    return false;
  }

  /**
   * @inheritDoc
   */
  onChildrenAdded(gameObject) {
    GameObject.forEach(gameObject, object => {
      const body = object.getComponent(RigidBody);

      if (body) {
        this.__addBody(/** @type {RigidBody} */(body));
      }
    });
  }

  /**
   * @inheritDoc
   */
  onChildrenRemoved(gameObject) {
    GameObject.forEach(gameObject, object => {
      const body = /** @type {!RigidBody} */ (object.getComponent(RigidBody));

      if (body) {
        this.__removeBody(body, gameObject);
      }
    });
  }

  /**
   * @inheritDoc
   */
  onComponentAdded(child, component) {
    if (component instanceof RigidBody) {
      this.__addBody(/** @type {RigidBody} */(component));
    } else if (component instanceof Collider) {
      this.__addCollider(child, /** @type {Collider} */(component));
    }
  }

  /**
   * @inheritDoc
   */
  onComponentRemoved(child, component) {
    if (component instanceof RigidBody) {
      this.__removeBody(/** @type {RigidBody} */(component), child);
    } else if (component instanceof Collider) {
      this.__removeCollider(child, /** @type {Collider} */(component));
    }
  }

  /**
   * Adds body to arcade world. Start tracking its gameObject colliders.
   *
   * @private
   * @param {black-engine~RigidBody} body Body to add
   *
   * @return {void}
   */
  __addBody(body) {
    const bodies = this.mBodies;
    const colliders = body.gameObject.mCollidersCache;
    body.mPairs.length = 0;

    if (colliders.length === 0) {
      this.__addPairs(body.mCollider, body);
    } else {
      for (let i = 0, l = colliders.length; i < l; i++) {
        this.__addPairs(colliders[i], body);
      }
    }

    bodies.push(body);
  }

  /**
   * Removes body from arcade world.
   *
   * @private
   * @param {black-engine~RigidBody} body        Body to remove
   * @param {black-engine~GameObject} gameObject Body's game object
   *
   * @return {void}
   */
  __removeBody(body, gameObject) {
    const bodies = this.mBodies;
    const colliders = gameObject.mCollidersCache;

    if (colliders.length === 0) {
      this.__removePairs(body.mCollider);
    } else {
      for (let i = 0, l = colliders.length; i < l; i++) {
        this.__removePairs(colliders[i]);
      }
    }

    body.mPairs.length = 0;
    bodies.splice(bodies.indexOf(body), 1);
  }

  /**
   * Adds collider to arcade world.
   *
   * @private
   * @param {black-engine~GameObject} child  Parent of the collider
   * @param {black-engine~Collider} collider Collider to add
   *
   * @return {void}
   */
  __addCollider(child, collider) {
    const body = /** @type {RigidBody} */ (child.getComponent(RigidBody));

    if (body && this.mBodies.indexOf(body) !== -1) {
      this.__addPairs(collider, body);

      if (child.mCollidersCache.length === 1) {
        this.__removePairs(body.mCollider);
      }
    }
  }

  /**
   * Removes collider from arcade world.
   *
   * @private
   * @param {black-engine~GameObject} child  Parent of the collider
   * @param {black-engine~Collider} collider Collider to remove
   *
   * @return {void}
   */
  __removeCollider(child, collider) {
    const body = /** @type {RigidBody} */ (child.getComponent(RigidBody));

    if (body && this.mBodies.indexOf(body) !== -1) {
      this.__removePairs(collider);

      const pairs = body.mPairs;

      for (let i = pairs.length - 1; i >= 0; i--) {
        const pair = pairs[i];

        if (pair.a === collider || pair.b === collider) {
          pairs.splice(i, 1);
        }
      }

      if (child.mCollidersCache.length === 0) {
        this.__addCollider(child, body.mCollider);
      }
    }
  }

  /**
   * Generate pairs, passed collider with all present colliders.
   *
   * @private
   * @param {black-engine~Collider} collider   Collider to generate with
   * @param {black-engine~RigidBody} fromBody  The collider body
   *
   * @return {void}
   */
  __addPairs(collider, fromBody) {
    const bodies = this.mBodies;
    collider.mChanged = true;

    for (let i = 0, iLen = bodies.length; i < iLen; i++) {
      const body = bodies[i];
      const colliders = body.gameObject.mCollidersCache;

      if (body === fromBody)
        continue;

      if (colliders.length === 0) {
        this.__addPair(collider, body.mCollider, fromBody, body);
      } else {
        for (let j = 0, jLen = colliders.length; j < jLen; j++) {
          this.__addPair(collider, colliders[j], fromBody, body);
        }
      }
    }
  }

  /**
   * Creates pair and adds it to world.
   *
   * @private
   * @param {black-engine~Collider} a      Pair collider
   * @param {black-engine~Collider} b      Pair collider
   * @param {black-engine~RigidBody} bodyA Pair body
   * @param {black-engine~RigidBody} bodyB Pair body
   *
   * @return {void}
   */
  __addPair(a, b, bodyA, bodyB) {
    const isBoxA = a.constructor === BoxCollider;
    const isBoxB = b.constructor === BoxCollider;
    let pair;

    if (isBoxA && isBoxB) {
      pair = BoxToBoxPair.pool.get();
    } else if (!isBoxA && !isBoxB) {
      pair = CircleToCirclePair.pool.get();
    } else {
      pair = BoxToCirclePair.pool.get();

      if (isBoxB) {
        const body = bodyA;
        const collider = a;
        a = b;
        bodyA = bodyB;
        b = collider;
        bodyB = body;
      }
    }

    pair.mChanged = true;
    pair.set(a, b, bodyA, bodyB);
    pair.mInCollision = false;
    this.mPairs.push(pair);

    this.mPairsHash[Pair.__id(a, b)] = pair;
    bodyA.mPairs.push(pair);
    bodyB.mPairs.push(pair);
  }

  /**
   * Removes all pairs with given collider.
   *
   * @private
   * @param {black-engine~Collider} collider Pairs collider
   *
   * @return {void}
   */
  __removePairs(collider) {
    const pairs = this.mPairs;
    const pairsHash = this.mPairsHash;

    for (let i = pairs.length - 1; i >= 0; i--) {
      const pair = pairs[i];

      if (pair.a === collider || pair.b === collider) {
        pairs.splice(i, 1);

        if (pair instanceof BoxToBoxPair)
          BoxToBoxPair.pool.release(pair);
        else if (pair instanceof BoxToCirclePair)
          BoxToCirclePair.pool.release(pair);
        else if (pair instanceof CircleToCirclePair)
          CircleToCirclePair.pool.release(pair);

        //pair.constructor.pool.release(pair);

        delete pairsHash[Pair.__id(pair.a, pair.b)];

        pair.bodyA.mPairs.splice(pair.bodyA.mPairs.indexOf(pair), 1);
        pair.bodyB.mPairs.splice(pair.bodyB.mPairs.indexOf(pair), 1);
      }
    }
  }

  /**
   * @inheritDoc
   */
  onPostUpdate() {
    const dt = this.delta;
    const contacts = this.mContacts;
    const bodies = this.mBodies;
    const pairs = this.mPairs;
    contacts.length = 0;

    // refresh body colliders if scale, rotation changed
    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];
      body.update();
      body.mContacts.length = 0;
      body.mInGroup = false;
    }

    // reset each pair to defaults
    // so phases will know, if pair in collision is true, then it needs more precise check
    for (let i = 0, l = pairs.length; i < l; i++) {
      const pair = pairs[i];

      pair.mIsStatic = (pair.bodyA.mIsSleeping || pair.bodyA.mInvMass === 0) &&
        (pair.bodyB.mIsSleeping || pair.bodyB.mInvMass === 0);

      if (pair.mIsStatic === false) {
        pair.mInCollision = true;
      }
    }

    // update pairs in collision flag todo
    // this.mBroadPhase.test(pairs);

    // narrow collision test
    for (let i = 0, l = pairs.length; i < l; i++) {
      const pair = pairs[i];

      if (pair.mInCollision && pair.mIsStatic === false) {
        pair.test();
      }
    }

    for (let i = 0, l = pairs.length; i < l; i++) {
      const pair = pairs[i];

      if (pair.mInCollision) {
        pair.mIsStatic === false && contacts.push(pair);
        pair.bodyA.mContacts.push(pair);
        pair.bodyB.mContacts.push(pair);
      } else {
        pair.mNormalImpulse = 0;
        pair.mTangentImpulse = 0;
      }
    }

    this.__solve(dt);

    if (!this.mSleepEnabled)
      return;

    const group = [];
    const stack = [];

    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];
      body.clearFlags(); // clear colliders dirty flags

      if (body.mInGroup || body.mIsSleeping || body.mInvMass === 0)
        continue;

      group.length = 0;
      stack.length = 0;

      stack.push(body);

      while (stack.length !== 0) {
        const body = stack.pop();
        const contacts = body.mContacts;

        group.push(body);
        body.mInGroup = true;

        for (let i = 0, l = contacts.length; i < l; i++) {
          const contact = contacts[i];
          const other = contact.bodyA === body ? contact.bodyB : contact.bodyA;

          if (other.mInGroup || other.mInvMass === 0)
            continue;

          stack.push(other);
        }
      }

      let isSleeping = true;
      const sleepThreshold = Pair.sleepThreshold * Pair.unitsPerMeter * Black.stage.mScaleX;

      for (let i = 0, l = group.length; i < l; i++) {
        const body = group[i];
        const velocity = body.mVelocity;
        body.mSleepTime = velocity.x * velocity.x + velocity.y * velocity.y < sleepThreshold ? body.mSleepTime + 1 : 0;
        isSleeping = isSleeping && body.mSleepTime > Pair.timeToSleep;
      }

      for (let i = 0, l = group.length; i < l; i++) {
        group[i].mIsSleeping = isSleeping;
      }
    }
  }

  /**
   * Solve contacts.
   *
   * @private
   * @param {number} dt Time from last update, ms.
   *
   * @return {void}
   */
  __solve(dt) {
    const iterations = this.mIterations;
    const contacts = this.mContacts;
    const bodies = this.mBodies;
    const gravity = this.mGravity;

    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];

      if (body.mInvMass === 0 || body.mIsSleeping)
        continue;

      const force = body.mForce;
      const velocity = body.mVelocity;
      const invMass = body.mInvMass;
      const damping = 1 - body.frictionAir;

      velocity.x = (velocity.x + (force.x * invMass + gravity.x) * dt) * damping;
      velocity.y = (velocity.y + (force.y * invMass + gravity.y) * dt) * damping;
    }

    for (let i = 0, l = contacts.length; i < l; i++) {
      contacts[i].preSolve();
    }

    for (let i = 0; i < iterations; i++) {
      for (let j = 0, l = contacts.length; j < l; j++) {
        contacts[j].solveVelocity();
      }
    }

    const unitsPerMeterDt = Black.stage.mScaleX * Pair.unitsPerMeter * dt;

    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];
      body.mForce.set(0, 0);

      if (body.mInvMass === 0 || body.mIsSleeping)
        continue;

      const position = body.mPosition;
      const velocity = body.mVelocity;

      position.x += velocity.x * unitsPerMeterDt;
      position.y += velocity.y * unitsPerMeterDt;
    }

    for (let i = 0; i < iterations; i++) {
      for (let j = 0, l = contacts.length; j < l; j++) {
        contacts[j].solvePosition();
      }
    }
  }

  /**
   * Sets bounds to default values.
   * Should be called on start and on resize.
   *
   * @private
   * @return {void}
   */
  __setBounds() {
    const bounds = Black.stage.bounds;
    const thickness = Number.MAX_SAFE_INTEGER;

    this.mBoundsLeft.set(-thickness, 0, thickness, bounds.height);
    this.mBoundsRight.set(bounds.width, 0, thickness, bounds.height);
    this.mBoundsTop.set(-thickness, -thickness, bounds.width + thickness * 2, thickness);
    this.mBoundsBottom.set(-thickness, bounds.height, bounds.width + thickness * 2, thickness);
  }

  /**
   * Enabled or disables world colliding bounds.
   *
   * @public
   * @param {boolean} v Value to set
   *
   * @return {void}
   */
  set boundsEnabled(v) {
    if (v) {
      if (!this.mBoundsBody) {
        this.mBoundsBody = new RigidBody();
        this.mBoundsBody.isStatic = true;

        Black.stage.addComponent(this.mBoundsLeft);
        Black.stage.addComponent(this.mBoundsRight);
        Black.stage.addComponent(this.mBoundsTop);
        Black.stage.addComponent(this.mBoundsBottom);

        this.__setBounds();
      }

      Black.stage.addComponent(this.mBoundsBody);
    } else {
      Black.stage.removeComponent(this.mBoundsBody);
    }
  }

  /**
   * Sets the gravity x.
   *
   * @param {number} v Value to set.
   * @return {void}
   */
  set gravityX(v) {
    this.mGravity.x = v;
  }

  /**
   * Returns this gravity x.
   *
   * @return {number}
   */
  get gravityX() {
    return this.mGravity.x;
  }

  /**
   * Sets the gravity y.
   *
   * @param {number} v Value to set.
   * @return {void}
   */
  set gravityY(v) {
    this.mGravity.y = v;
  }

  /**
   * Returns this gravity y.
   *
   * @return {number}
   */
  get gravityY() {
    return this.mGravity.y;
  }

  /**
   * Sets the count of solving iterations.
   *
   * @param {number} v Value to set.
   * @return {void}
   */
  set iterations(v) {
    this.mIterations = v;
  }

  /**
   * Returns this count of solving iterations.
   *
   * @return {number}
   */
  get iterations() {
    return this.mIterations;
  }

  /**
   * Sets the sleep allowed flag.
   *
   * @param {boolean} v Value to set.
   * @return {void}
   */
  set sleepEnabled(v) {
    this.mSleepEnabled = v;
  }

  /**
   * Returns this sleepAllowed flag.
   *
   * @return {boolean}
   */
  get sleepEnabled() {
    return this.mSleepEnabled;
  }
}

/**
 * @extends black-engine~MessageDispatcher
 * @cat core
 */
class SplashScreen extends MessageDispatcher {
  constructor(duration = 4200) {
    super(false);

    /** 
     * @private
     * @type {number}
     */
    this.mDuration = duration;

    /** 
     * @private
     * @type {string}
     */
    this.mSvgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 241.8 220.2"><defs><style>.b{fill:#f5f5f5}.c{fill:url(#a)}</style><pattern id="a" width="17.6" height="14.87" patternUnits="userSpaceOnUse" viewBox="0 0 17.6 14.9"><path fill="none" d="M0 0h17.6v14.87H0z"/><path class="b" d="M0 13.4v1.5h1.5A1.5 1.5 0 0 1 0 13.4z"/><path class="b" d="M8.8 0a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 1 1-3 0A1.5 1.5 0 0 1 8.8 0H0v13.4a1.5 1.5 0 0 1 1.5-1.5A1.5 1.5 0 0 1 3 13.4a1.5 1.5 0 0 1-1.5 1.5h4.3a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.4 1.4 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5h6a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 3 0 1.5 1.5 0 0 1-1.5 1.5h5.8V0zm6.6.7a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5 1.4 1.4 0 0 1-1.5-1.5A1.5 1.5 0 0 1 15.4.7zM.4 2.2A1.5 1.5 0 0 1 1.9.7a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5A1.5 1.5 0 0 1 .4 2.2zm1.7 5.7A1.5 1.5 0 0 1 .6 6.4a1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 0 3zm2 3.8a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5zm.2-8a1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5 1.4 1.4 0 0 1-1.5 1.5 1.5 1.5 0 0 1-1.5-1.5zm2.2 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm2.2 5.3a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm1.4-8a1.5 1.5 0 0 1 3 0 1.5 1.5 0 1 1-3 0zm2.5 5.7a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.4 1.4 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5zm3 3.5a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5 1.4 1.4 0 0 1-1.5 1.5zm0-5.5a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5 1.4 1.4 0 0 1-1.5 1.5z"/></pattern></defs><path class="c" d="M25.8 105.2c12.1 8.8 29.7 6.7 59.8 6.8-7.9-7.3-9.1-18.7-7.1-27.3-6.6 7.3-5.1 19.3-12.8 19.4-3.4.1-6.9-4.7-8.3-10.8-5.3 9.4-12 10.7-14.7-4.5-2.3 2-3.9 8.2-9.5 6.2S26.8 81.8 30 71.3A28.3 28.3 0 0 1 14.6 61c-1.4 20.8.5 36.4 11.2 44.2zM51.9 39.9c29.7-3.6 54-22.8 69.5-26.3-.1 0-40.7-.3-72.3 1.9 6.2 3.5 10.5 16.3 2.8 24.4zM170.4 34.2c5.6-2 32.1-9.5 54.4-2.7-3-13.7-22.9-17-71.8-17.8a32.2 32.2 0 0 1 17.4 20.5zM211.3 109.3c-12.2 2.1-12.8-8.8-32.9-8.9-15.5 0-35.2 13.2-36.1 13.7h49.3c19.1 0 32.5-.6 35.5-7.3s-2.7-12.3-10.7-15.6c5.3 5.6 4.1 16.5-5.1 18.1zM66 189.2c-5.9 5-26 17.8-43.6 6.3 3.6 8.4 13.6 12.7 45.1 12-1.6-2.4-5.3-10.4-1.5-18.3zM32 161.5c7.3 7.8 18.1 2.6 33.7-6.2 10.5-6 27.5-9.9 40.6-1.1 3.7-8.7 5.4-10.9 6.7-10.6s.7 2.7 5.6 7c.4-1 3.8-7.9 3.8-12l-59.9-.8c-1.5 6.6-9.9 19-23.9 17.4-2.4-.3-2.5-11.6 2.4-16.9a36.7 36.7 0 0 0-7.4.9c-4.4 5.1-7 16.4-1.6 22.3zM150.9 148.1c23.6-.5 26 19.9 41.1 21 10.9.9 13.6-16.8 35.7-11.8-1.3-11.1-7.7-16.2-22.2-17.4 3 10.3-6.6 28.5-19.3 21.5a1.5 1.5 0 0 1-.8-1.1c-.9-11 2.8-15.8 7.5-20.7l-55.7-.7a18.5 18.5 0 0 1 3.7 12.4 20.7 20.7 0 0 1 10-3.2zM162 195.9c-3.9 3.6-3.8 9.5-2.5 12.5h4.1c0-14.8 17-12.8 21.2-.8 22.7-1.5 30.9-3.2 36-8.7s6.4-15.3 6.8-27.1c-2.6 3-9.8 14.7-10.9 16.4-17.8 26.3-39.9-5.9-54.7 7.7z"/><path class="b" d="M150 42.6c-.2 10.4-9.8 13.6-9.4-.7-16.2 1.9-14.5 8.5-13.7 9.5 4.4 5.6 29 4.5 27.3-4.3a5.7 5.7 0 0 0-4.2-4.5z"/><path class="b" d="M162.2 46.4c-1.7-15.7-17.2-18.2-28.4-15.6s-22.3 12.7-15.6 25.4 46.2 10.3 44-9.8zm-37.8 6.7c-5.4-9.7 10.6-13.4 13.2-13.8 7.5-1.3 18.2-1.2 19.6 7.6 2 13.2-28.8 13.3-32.8 6.2zM184.7 68.8c-1.1 0-1.1 3.3-5.4 12.5.3 0 5.8 0 8.6.2-.7-9.1-2.1-12.7-3.2-12.7zM162.5 82.9l7-1.1c-2.5-4.6-5.8-8.6-7 1.1zM153.1 74.5a55.8 55.8 0 0 0-7.8 2c6.4 9.4 7.4 2.2 7.8-2zM134.8 94.6c.4-.2 4.9-3.1 6.9-4.1-1.9-2-8.1-9.9-6.9 4.1zM190.9 81.8a58.3 58.3 0 0 1 9 1.5 77.7 77.7 0 0 0 .4-8.8c-1.7-.3-7.2-1.2-10.3-1.5a52 52 0 0 1 .9 8.8z"/><path class="b" d="M216.5 76.2a39.1 39.1 0 0 1-5.6 10.4c13 3 25.3 10.8 18.1 23.1-3.8 6.6-16.4 7.5-37.4 7.5l-55.4-.2a32.3 32.3 0 0 1-18.8 1.1c-6.8 1.5-18.2 3.7-28.2-3.1-30.8-.4-49.7 3.2-64.9-7.1C6.4 95.7 11.6 60.3 12 56.8c-6.4-12.5-.8-29.4 2.3-34.1S29.4 7.5 44.4 13c.2-.1 27.5-2.4 76-2.4 74.4 0 105.2.8 107.6 22.3 6 2.4 13.2 13 6.2 21 4.8 9.4.1 19.1-9.7 21.5a37.4 37.4 0 0 1 10.7 5.7c1.4-2.5 8.5-19.8 4.8-41.9-4.5-27.1-17.9-33.2-35.4-34.9C157.9 0 88.5.2 81.7.1 38.1-.3 18.2-.5 8.1 22.2-3.1 47.6-2.6 91.7 9.1 108c7.7 10.7 19.1 15.3 37.9 15.3 34.5 0 141.3 1.4 165.3 1.8 11-.3 27.9-3.4 29.3-19.7s-6.8-25.2-25.1-29.2z"/><path class="b" d="M202.7 88.6c1.3-.2 6.5-2 10.7-12.6-3-.2-6.3-.5-10.1-1.1.8 11.4-3 14-.6 13.7z"/><path class="b" d="M231.9 56c-7.6 5.5-18.2 1.8-19.8-3.4-2.6-8.6 4.4-10.9 6.7-10.6 7.7.8 7 6.1 4 8.1a1.5 1.5 0 0 1-1.9-2.4c1.8-1.3 0-2.8-2.1-2.7s-5.4 1-3.8 6.7 17.1 7.3 18.9-4.4c1-6.8-5.8-16.4-32.5-15.4a108.5 108.5 0 0 0-30.4 5.2c1.2 8.3-1.9 15.7-8.5 20.1-5.3 11.2-41.6 17.9-48.4-2.7-7.5.8-13.1 10-13.9 14.9a1.4 1.4 0 0 1-1.6 1.2c-6.5-.7-16.7 3.6-17.9 20-1.3 18.3 14.9 29.2 31.7 25.4a21.7 21.7 0 0 1-5-3.5c-5.7-.2-13.7-1.1-17.4-12.1-.6-1.7 2.1-3.2 2.9-.9 2.5 7.8 8.3 9.6 11.8 10a23.3 23.3 0 0 1-4.4-13.3c-.1-2.5 3-2 3-.2-.1 12.3 14.5 29.4 42 13 33.9-20.2 50.8-8.1 55.8-5 1.4.9 9.2 5.2 13.7.1 1.8-2 4.1-10.3-6.4-14.9-4.2 3.7-11.5 3.3-8.9-3-32.1-5.7-50.2 2.7-61.8 10.2s-16.4.3-17-2.5c-1.8-8.4 16.6-26.2 60.2-24.6 1.3-3.9 5.3-5.7 8.1.6 7.4.6 18 3.2 28.9 3.2s18.2-5.3 14-17.1z"/><path class="b" d="M176 81.3l3.8-9.1a107.7 107.7 0 0 0-23.6 1.6c-1.1 15.7-9.6 10.9-13.8 3.6-27.3 10.6-19.1 22.7-10.5 18.6-1.6-15.7 6-15 12.5-7a77.4 77.4 0 0 1 15.1-5.4c1.4-15.6 10-9.6 13.3-2.1zM65.8 101.1c5.2-.4 1.4-10.4 17-26.2 13.1-13.2-7.9-26.6-17.9-13s-4.4 39.6.9 39.2z"/><path class="b" d="M49.8 63.9c-4.7 6.2-6.6 20.2-2.4 30.6 2.9 7 6.9-1.5 9.3-5.4-1.2-8.8 0-20.5 5.2-28.1-5.6-3.5-10.1.3-12.1 2.9zM32.3 74.3c-2.4 10.4-.6 17.3 2.6 18.1s4.7-5.4 7.3-7.6c-.6-7.7.9-15.8 4.2-21.2-8.7-3.1-12.8 5.3-14.1 10.7z"/><path class="b" d="M12.2 39.9c-1.8 22.1 15.2 28 18.9 28.5 1.7-3.6 6.8-11.4 17.2-7.3 5.5-6.4 12-4.8 15.5-2.5C73.9 48.2 92 53.8 89.6 69.3a16.6 16.6 0 0 1 7.9-1.7c1.7-5.9 7.7-14.9 15.9-16.1a18.6 18.6 0 0 1 5.1-15.2c-4 1.6-20.6 10.6-28.1 12.3-1.4.3-2.4-2.4-.3-3 9.3-2.5 26.9-13.5 42.8-17.6 19.5-5.2 34.5 6.7 32.1 22.8 10.1-14.5-5.4-34.6-20.7-36.4-33.4-4.1-53.3 26.5-98.8 28.9-7 .4-11.9-2-13.7-6s-.9-9 3.7-10.6c2.1-.7 3.5 2.3 1.1 2.8s-4.9 9.2 4.8 10.7c12.7 2 14.5-14.3 7.3-21.2s-34-9.4-36.5 20.9zM108.8 156a30.1 30.1 0 0 1 6.8 8.2 45.5 45.5 0 0 1 2-10.6 17.4 17.4 0 0 1-5-5.7 47.5 47.5 0 0 0-3.8 8.1zM40.3 152.4c7.2.6 18.4-6.1 19.7-17.7-20.3-.3-20.5 13-19.7 17.7zM105.5 182.8c-9.5-20.1-30.2-13.6-46.7-2.2-14.8 10.3-29.4 7.7-35.8.1a31.5 31.5 0 0 1-4.6-32.4C5 168 14.6 187.8 24.8 193.5c18.7 10.5 37.8-5 41.6-8.5 12.4-11.2 28.8-11.8 33.4 2.2 4 12.2-7.6 21.6-15.9 18.1-10.7-4.4-6.4-13.5-3.1-15.1a7.4 7.4 0 0 1 8.7 1.9c1.2 1.3-.5 3.6-2.1 2.1s-3.5-2.1-5.1-1.3-4.3 7.6 2.6 9.6c8.9 2.6 14.7-7.1 12-14.4-3.9-10.7-15.2-8.9-19.9-6.6-14.5 7.2-12.8 30 6 30.7 23.2.9 27-19.8 22.5-29.4zM188.4 159.2c11.6 4.5 18.7-15.8 11.7-23.9-4.2 7.6-13.1 10.2-11.7 23.9z"/><path class="b" d="M191.9 172.1c-15.6-.4-20.8-23.1-41.9-20.9-24 2.5-24.8 45.6-13.1 57.6h3.1c-4.1-9.4-6.7-28.1 7.8-38.2 1.7-1.1 3.6 1.3 1.7 2.5-13.6 9.4-10.2 27.6-6.2 35.7h3.5c-4.2-8.4-3.6-21.3 2.4-27.3 18.5-18.3 44.9 16.4 57.1-.5 8-11.1 12.7-17.8 26.8-16.9a13.3 13.3 0 0 0-7-4c-19.7-4.1-20.7 12.4-34.2 12z"/><path class="b" d="M208.6 182.8c-13.7 18.8-40.7-15.8-57.2.7-5.4 5.4-5.6 18-1.2 25.1h6.1c-2-5.6.6-12.1 3.8-14.9 17.6-15 37.6 17.6 54.2-7.3 1-1.5 8.3-14.5 13.9-19.3-10.5.6-14.4 8.6-19.6 15.7z"/><path class="b" d="M238.8 151.3c-4-14.1-13.7-23-25.3-23.2-.3 0-120-1.8-163.5-1.8-40.8 0-44.9 21.4-47.3 34.2-3.8 20.4 3.9 40.1 8.9 46.1 9.4 11.4 25.3 13.6 48 13.6l128.4-.3c35.9 0 44.8-12.6 48.4-23.6 4.7-14 5.7-33.3 2.4-45zm-1.3 15.2c-1.5 1.5-3.3-.7-6.8 2.3.1 26.5-6.3 35.4-19 38.4-16.1 3.8-43.4 4.7-112.7 4.4-5.8 3.8-19.8 6.6-29-1.2-23.1.7-48.8.4-51.7-18.1-4.9-4.8-12.3-15.9-8.2-33.2 5.2-21.3 22.1-24.3 34.6-23.9 4.2-2.6 10-3.9 17-3.4 2 .2 1.4 2.5 1.3 3l59.3.8c.1-2-.9-2.5.1-3.9s8.9 1.7 11.8 4.1l61.1 1c4.2-4.3 3.6-10 9.2 0 12.4.9 25 4.3 26.3 21.8 3.7 1.8 8.1 6.4 6.7 7.9z"/><path class="b" d="M166.6 208.3l15.1-.6c-3.8-8.4-15.4-10.2-15.1.6zM113.3 166.2c-11.1-19.9-33.8-15.2-46.1-8.3-16.4 9.1-28.6 15.1-37.4 5.6-5.7-6.1-4.3-16.7-.5-23.4-12.8 6.6-13.3 28.1-4 38.6 5.7 6.5 18.5 8.7 31.8-.5 16.2-11.4 36.6-18.1 48.8-1.1 5.5 7.7 6.4 22.9-3 31.6h7.1c8-7 11.2-28.4 3.3-42.5z"/><path class="b" d="M137.7 153.6c1.7-13.2-7.4-17.4-12.4-18.8 1.6 11.6-8 17-6.8 36 4.6 13.7 2 29.9-4.4 38h19c-8.6-12.6-10-41.8 4.6-55.2z"/></svg>`;

    /** 
     * @private
     * @type {string}
     */
    this.mSvgText = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 228.9 29"><defs><style>.a{fill:#f5f5f5}</style></defs><path class="a" d="M9.7 19a3.7 3.7 0 0 1 2.9 1.4 6 6 0 0 1 .9 3.6 4.6 4.6 0 0 1-1.4 3.8c-.9.7-2.5 1-4.7 1L0 28.7V10.1l6.6-.2a9.4 9.4 0 0 1 4.9 1c.9.7 1.4 2 1.4 3.9a5.1 5.1 0 0 1-.7 3A3.3 3.3 0 0 1 9.7 19zm-6.4-1.1h3.4a3.3 3.3 0 0 0 2.3-.6 2.5 2.5 0 0 0 .7-2.1 2.9 2.9 0 0 0-.7-2.1 5.1 5.1 0 0 0-2.6-.5H3.3zm0 8.3h3.5a3.9 3.9 0 0 0 2.6-.6c.5-.3.7-1.1.7-2.2a3 3 0 0 0-.7-2.4 3.8 3.8 0 0 0-2.7-.7H3.3zM22.9 10.1v14.3a2.1 2.1 0 0 0 .3 1.2 2.3 2.3 0 0 0 1.3.3h6.4l.2 2.6c-1.8.2-4.3.2-7.4.2s-4.2-1.2-4.2-3.8V10.1zM46.2 23.4h-6.9l-1.5 5.3h-3.5L39.9 11a1.2 1.2 0 0 1 1.2-.9h3.3a1.2 1.2 0 0 1 1.2.9l5.6 17.7h-3.5zm-.8-2.7l-1.9-6.4c-.2-1-.4-1.5-.4-1.6h-.7l-.4 1.6-1.9 6.4zM68.2 25.8l.3 2.5a18.5 18.5 0 0 1-5.7.7c-2.8 0-4.7-.7-5.8-2.1s-1.7-4-1.7-7.5.5-6 1.7-7.4 3-2.2 5.8-2.2a19.8 19.8 0 0 1 5.3.6l-.3 2.6a39.4 39.4 0 0 0-5-.2c-1.5 0-2.6.4-3.1 1.4s-.9 2.7-.9 5.2.3 4.3.9 5.2a3.2 3.2 0 0 0 3.1 1.5 37.5 37.5 0 0 0 5.4-.3zM79.1 20.3h-1.8a11.1 11.1 0 0 1 .2 1.9v6.5h-3.4V10.1h3.4v5.5a12.5 12.5 0 0 1-.2 2.1h1.8l5.1-7.6h3.7l-5 7.5a4.3 4.3 0 0 1-1.3 1.4 4.5 4.5 0 0 1 1.5 1.6l5.1 8h-3.7zM100 21.4l-3.8-1.2a5.1 5.1 0 0 1-2.8-2 5.9 5.9 0 0 1-.9-3.4c0-2 .5-3.4 1.4-4s2.6-1 5-1a24 24 0 0 1 5.8.6l-.2 2.4H99a4.7 4.7 0 0 0-2.5.4c-.4.2-.6.8-.6 1.7a2.5 2.5 0 0 0 .4 1.7 3.8 3.8 0 0 0 1.7.8l3.5 1.1a5.3 5.3 0 0 1 3 2 5.9 5.9 0 0 1 .9 3.4c0 2.1-.5 3.4-1.5 4.2s-2.7 1-5.1 1a30.8 30.8 0 0 1-6.1-.6L93 26l5.8.2a4.4 4.4 0 0 0 2.5-.5 2.2 2.2 0 0 0 .6-1.8 2.2 2.2 0 0 0-.4-1.6 3.5 3.5 0 0 0-1.5-.9zM126 10.1h3.5a1.2 1.2 0 0 1 1.3 1.4l.8 17.2h-3.3l-.7-15.8h-.5l-3.2 12.3a1.3 1.3 0 0 1-1.4 1.1H120a1.4 1.4 0 0 1-1.5-1.1l-3.2-12.3h-.5l-.6 15.8h-3.3l.7-17.2c.1-.9.5-1.4 1.4-1.4h3.5a1.2 1.2 0 0 1 1.3 1.2l2.7 10 .5 2.6h.4a26.1 26.1 0 0 1 .6-2.6l2.6-10a1.4 1.4 0 0 1 1.4-1.2zM141.4 28.7H138V10.1h3.4zM161.5 13h-5.7v15.7h-3.4V13h-5.7v-2.9h14.8zM180.9 10.1v18.6h-3.4v-8.5h-7.3v8.5h-3.4V10.1h3.4v7.3h7.3v-7.3zM196 13.1l-.2-2.6a24.4 24.4 0 0 1 5.9-.7 8.9 8.9 0 0 1 4.5.9 3.5 3.5 0 0 1 1.5 3.3 6.4 6.4 0 0 1-.7 3.1 13.3 13.3 0 0 1-2.4 3.3l-4.9 5.3 2.8-.2h5.8v3.2h-12.7v-2a2 2 0 0 1 .5-1.4l4.9-5.4c2.2-2.4 3.3-4.2 3.3-5.6a1.3 1.3 0 0 0-.7-1.3 5.7 5.7 0 0 0-2.2-.3 52.9 52.9 0 0 0-5.4.4zM214.3 28.7V10.1l7-.2c2.8 0 4.8.7 5.9 2.1s1.7 3.8 1.7 7.4-.6 6.1-1.7 7.5-3.1 2-5.9 2-4.5 0-7-.2zm3.4-16v13.4h3.6a3.6 3.6 0 0 0 3.2-1.4 12.6 12.6 0 0 0 .8-5.3c0-2.5-.3-4.3-.9-5.3a3.3 3.3 0 0 0-3.1-1.4h-3.6zM.1 8.1v-8h2.7a2.9 2.9 0 0 1 2.1.5 3 3 0 0 1 .5 2 2.9 2.9 0 0 1-.5 1.9 2.5 2.5 0 0 1-1.9.6H1.2v3zm1.1-4h1.6a1.6 1.6 0 0 0 1.1-.3 2.1 2.1 0 0 0 .3-1.2 2.3 2.3 0 0 0-.3-1.3A1.6 1.6 0 0 0 2.8 1H1.2zM9.7 0a3 3 0 0 1 2.5.9 5.2 5.2 0 0 1 .7 3.2 5 5 0 0 1-.7 3.2 3 3 0 0 1-2.5.9 2.8 2.8 0 0 1-2.4-.9 5 5 0 0 1-.7-3.2A5.2 5.2 0 0 1 7.3.9 2.8 2.8 0 0 1 9.7 0zm1.6 1.7A1.7 1.7 0 0 0 9.7 1a1.6 1.6 0 0 0-1.5.7 4.5 4.5 0 0 0-.4 2.4 4.5 4.5 0 0 0 .4 2.4 1.6 1.6 0 0 0 1.5.7 1.7 1.7 0 0 0 1.6-.7 4.5 4.5 0 0 0 .4-2.4 4.5 4.5 0 0 0-.4-2.4zM24.2.1l-1.6 7.6a.4.4 0 0 1-.4.4h-1.3a.4.4 0 0 1-.4-.4l-1.2-5.8a3.4 3.4 0 0 1-.1-.9h-.3l-.2.9-1.1 5.8V8h-1.7c-.3 0-.4-.1-.5-.4L13.9.1h1.2l1.2 6.1a5.1 5.1 0 0 0 .1 1h.3c0-.3.1-.7.1-1L18 .5a.4.4 0 0 1 .4-.4h1.3a.2.2 0 0 1 .2.2.2.2 0 0 1 .2.2l1.1 5.7c.1.3.1.6.2 1h.3v-.5a1.1 1.1 0 0 0 .1-.5L22.9.1zM30.3 7.1V8H27a1.6 1.6 0 0 1-1.2-.4 1.2 1.2 0 0 1-.4-1v-5a1.4 1.4 0 0 1 .4-1.1A2.1 2.1 0 0 1 27 .1h3.4V1h-3.2l-.5.2a.7.7 0 0 0-.1.5v1.7h3.3v1h-3.3v2a1.1 1.1 0 0 0 .1.6h3.6zM37.6 8.1h-1.2l-.7-2.5a1.1 1.1 0 0 0-1-.8h-1.6v3.3h-1.2v-8h2.8a3.4 3.4 0 0 1 2 .5 2.4 2.4 0 0 1 .6 1.8 2.8 2.8 0 0 1-.3 1.4 2 2 0 0 1-1.2.6 1.4 1.4 0 0 1 1 1.2zm-4.5-4.3h1.6a1.6 1.6 0 0 0 1.1-.3 1.4 1.4 0 0 0 .3-1.1 1.6 1.6 0 0 0-.3-1.1 1.6 1.6 0 0 0-1.1-.3h-1.6zM43.9 7.1V8h-3.3a1.6 1.6 0 0 1-1.2-.4 1.2 1.2 0 0 1-.4-1v-5a1.4 1.4 0 0 1 .4-1.1 2.1 2.1 0 0 1 1.2-.4H44V1h-3.2a.6.6 0 0 0-.5.2.8.8 0 0 0-.2.5v1.7h3.4v1h-3.4v2a1.1 1.1 0 0 0 .2.6h3.6zM45.5 8.1v-8h2.9a3 3 0 0 1 2.4.9 5.2 5.2 0 0 1 .7 3.2 5.2 5.2 0 0 1-.7 3.2 3 3 0 0 1-2.4.9zm1.1-7v6h1.8a1.6 1.6 0 0 0 1.5-.7 5.7 5.7 0 0 0 .4-2.4 6.5 6.5 0 0 0-.4-2.4 1.8 1.8 0 0 0-1.5-.6h-1.8zM59.6 3.9a1.5 1.5 0 0 1 1.3.6 2.8 2.8 0 0 1 .3 1.5 2.2 2.2 0 0 1-.5 1.6 3.4 3.4 0 0 1-2 .5h-3v-8h2.6a3.7 3.7 0 0 1 2.1.4 1.8 1.8 0 0 1 .6 1.6 2.3 2.3 0 0 1-.3 1.3 1.4 1.4 0 0 1-1.1.5zm-2.8-.4h1.6a2.9 2.9 0 0 0 1.2-.2 1.3 1.3 0 0 0 .3-1c0-.5-.1-.9-.4-1a1.7 1.7 0 0 0-1.2-.3h-1.5zm0 3.7h1.7a1.7 1.7 0 0 0 1.2-.3c.3-.1.4-.5.4-1a1.7 1.7 0 0 0-.4-1.2 1.9 1.9 0 0 0-1.3-.3h-1.6zM65.6 5.3v2.8h-1.1V5.3L61.8.1h1.3l1.6 3.3a4.2 4.2 0 0 0 .3.9h.1a8.5 8.5 0 0 1 .3-.9L67 .1h1.2z"/></svg>`;
  }

  show() {
    let duration = this.mDuration * 0.001;
    let css = `#logo,#splash-screen{position:relative;box-sizing:border-box}#logo-inner,#logo-name{margin-left:auto;margin-right:auto}#splash-screen{z-index:999;top:0;left:0;width:100%;height:100%;display:block;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQYV2OUkpL6/+zZMwYpKSkGEM3IwMDwnwEJMBJUAQCLUhABUGRZzwAAAABJRU5ErkJggg==);opacity:1;animation:hide 0s ease-in ${duration}s forwards}@keyframes hide{to{opacity:0}}#logo{top:20%;left:50%;animation:fadein ${duration}s linear forwards}@keyframes fadein{0%{opacity:0}100%,40%{opacity:1}}#logo-name{width:100%;margin-top:108px}`;

    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);

    let container = /** @type {HTMLElement} */ (document.getElementById(Black.engine.containerElementId));
    let oldOverflow = container.style.overflow;
    container.style.overflow = 'hidden';

    let splash = document.createElement('div');
    splash.id = 'splash-screen';
    container.appendChild(splash);

    let logo = document.createElement('div');
    logo.id = 'logo';
    splash.appendChild(logo);

    let logoInner = document.createElement('div');
    logoInner.id = 'logo-inner';
    logoInner.innerHTML = this.mSvgLogo;
    logo.appendChild(logoInner);

    let logoName = document.createElement('div');
    logoName.id = 'logo-name';
    logoName.innerHTML = this.mSvgText;
    logo.appendChild(logoName);

    let refresh = () => {
      let mw = splash.offsetWidth;
      let mh = splash.offsetHeight;

      let size = this.calculateAspectRatioFit(mw, mh, mw * 0.5, mh * 0.5);

      logo.style.width = `${size.width}px`;
      logo.style.height = `${size.height}px`;
      logo.style.marginLeft = `${-size.width * 0.5}px`;

      logoInner.style.width = `${Math.min(size.width, size.height)}px`;
      logoInner.style.height = `${Math.min(size.width, size.height)}px`;

      logoName.style.width = `${Math.min(size.width, size.height) * 0.9}px`;
      logoName.style.height = `${Math.min(size.width, size.height)}px`;
      logoName.style.marginTop = `${12}px`;
    };

    refresh();

    let cw = container.offsetWidth;
    let ch = container.offsetHeight;

    let handle = setInterval(x => {
      if (cw !== container.offsetWidth || ch !== container.offsetHeight) {
        cw = container.offsetWidth;
        ch = container.offsetHeight;
        refresh();
      }
    }, 1000 / 60);

    setTimeout(() => {
      clearTimeout(handle);

      style.parentNode.removeChild(style);
      splash.parentNode.removeChild(splash);

      container.style.overflow = oldOverflow;

      /**
       * Posts when splash screen is hidden.
       * @event SplashScreen#complete
       */
      this.post(Message.COMPLETE);
    }, this.mDuration);

    this.post(Message.COMPLETE);
  }

  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }
}

/**
 * Timer component.
 *
 * @cat timers
 * 
 * @fires Timer#complete
 * @fires Timer#tick
 * 
 * @extends black-engine~Component
 */
class Timer extends Component {
  constructor(interval = 1, ticksCount = 1, startOnAdded = true) {
    super();
    
    Debug.assert(interval > 0, 'the interval value must be greater than 0');
    Debug.assert(ticksCount > 0, 'the ticksCount value must be greater than 0');
    
    /** 
     * @private 
     * @type {boolean} 
     */
    this.mStartOnAdded = startOnAdded;

    /** 
     * @private 
     * @type {number} 
     */
    this.mInterval = interval;

    /** 
     * @private 
     * @type {number} 
     */
    this.mTicksCount = ticksCount;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsRunning = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mTick = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mElapsedSeconds = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mTotalElapsedSeconds = 0;
  }

  /**
   * @inheritDoc
   */
  onAdded() {
    if (this.mStartOnAdded)
      this.start();
  }

  /**
   * @inheritDoc
   */
  onUpdate() {
    if (this.mIsRunning === false)
      return;

    this.mElapsedSeconds += Black.time.delta;
    this.mTotalElapsedSeconds += Black.time.delta;

    if (this.mElapsedSeconds >= this.mInterval) {
      this.mElapsedSeconds = 0;

      const ticksPerUpdate = Math.max(1, ~~(Black.time.delta / this.mInterval));
      for (let i = 0; i < ticksPerUpdate; i++) {
        this.mTick++;

        /**
        * Posted on every timer tick.
        * @event Timer#tick
        */
        this.post('tick', this.mTick);

        if (this.mTick >= this.mTicksCount) {
          this.mIsRunning = false;

          /**
           * Posted on timer complete.
           * @event Timer#complete
           */
          this.post('complete');
          return;
        }
      }
    }
  }

  /**
   * Start timer.
   *
   * @return {black-engine~Timer} Returns this.
   */
  start() {
    this.mIsRunning = true;
    return this;
  }

  /**
   * Stop and reset timer.
   *
   * @return {black-engine~Timer} Returns this.
   */
  stop() {
    this.mIsRunning = false;
    this.reset();
    return this;
  }

  /**
   * Pauses the timer.
   *
   * @return {black-engine~Timer} Returns this.
   */
  pause() {
    this.mIsRunning = false;
    return this;
  }

  /**
   * Reset timer.
   *
   * sets ticks elapsedSeconds and totalElapsedSeconds to 0
   * @return {black-engine~Timer} Returns this.
   */
  reset() {
    this.mTick = 0;
    this.mElapsedSeconds = 0;
    this.mTotalElapsedSeconds = 0;
    return this;
  }

  /** How many ticks left.
   *
   * @return {number} Returns this.
   */
  get ticksLeft() {
    return this.mTicksCount - this.mTick;
  }

  /** current tick index.
   *
   * @return {number} Returns this.
   */
  get currentTick() {
    return this.mTick;
  }

  /**
   * elapsed seconds from previous tick.
   *
   * @return {number}
   */
  get elapsedSeconds() {
    return this.mElapsedSeconds;
  }

  /** how many seconds left to the next tick.
   *
   * @return {number} Returns this.
   */
  get secondsToNextTick() {
    return this.mInterval - this.mElapsedSeconds;
  }

  /** If the timer is running, returns true, otherwise false.
   *
   * @return {boolean} Returns this.
   */
  get isRunning() {
    return this.mIsRunning === true;
  }

  /** If the number of ticks is less than the specified number, returns false, otherwise true.
   *
   * @return {boolean} Returns this.
   */
  get isComplete() {
    return this.mTick >= this.mTicksCount;
  }

  /**
   * Sets/Get the number of timer ticks.
   *
   * @return {number}
   */
  get ticksCount() {
    return this.mTicksCount;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set ticksCount(value) {
    Debug.assert(value > 0, 'the ticksCount value must be greater than 0');
    this.mTicksCount = value;
  }

  /**
   * Sets/Get the timer interval in seconds.
   *
   * @return {number}
   */
  get interval() {
    return this.mInterval;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set interval(value) {
    Debug.assert(value > 0, 'the interval value must be greater than 0');
    this.mInterval = value;
  }

  /**
   * total elapsed seconds.
   *
   * @return {number}
   */
  get totalElapsedSeconds() {
    return this.mTotalElapsedSeconds;
  }

  /**
   * Sets/Gets whether the timer should start automatically when added to the root.
   * 
   * @return {boolean}
   */
  get startOnAdded() {
    return this.mStartOnAdded;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set startOnAdded(value) {
    this.mStartOnAdded = value;
  }
}

let ID$3 = 0;
/**
 * The Black class represents the core of the Black Engine.
 *
 * @fires Engine#paused
 * @fires Engine#unpaused
 * @fires Engine#ready
 * @fires Engine#looped
 *
 * @extends black-engine~MessageDispatcher
 */
class Engine extends MessageDispatcher {
  /**
   * Creates a new Black instance.
   * 
   * First parameter has to be a id of the HTML div element the game will be rendered to.
   * Second parameter has to be `GameObject` class which will be the root object of your application.
   * Third parameter has to be a class name of `VideoNullDriver` subclass eg `CanvasDriver`.
   * Fourth parameter is optional array of System to use,
   * 
   * @example
   * // Creates new Black instance with MyGame as a root class, CanvasDriver as renderer and Arcade physics as a system.
   * new Black('game-container', MyGame, CanvasDriver, [Arcade]);
   * 
   * @param {string}                                                       containerElementId The id of an DOM element.
   * @param {function(new: black-engine~GameObject)}                                    gameClass          Type name of an GameObject to start execution from.
   * @param {function(new: black-engine~VideoNullDriver, HTMLElement, number, number)}  videoDriverClass   Type name of an VideoDriver (VideoNullDriver, DOMDriver or CanvasDriver)
   * @param {Array<function(new: black-engine~System)>  }                               systemClasses      The list of systems to be initialized with Black engine.
   */
  constructor(containerElementId, gameClass, videoDriverClass, systemClasses = null) {
    super();

    this.id = ++ID$3;

    Black.engine = this;

    /** 
     * @private 
     * @type {string} 
     */
    this.mContainerElementId = containerElementId;

    /** 
     * @private 
     * @type {HTMLElement|null} 
     */
    this.mContainerElement = null;

    /** 
     * @private 
     * @type {function(new: black-engine~VideoNullDriver, HTMLElement, number, number)} 
     */
    this.mVideoDriverClass = videoDriverClass;

    /** 
     * @private 
     * @type {Array<function(new: black-engine~System)>} 
     */
    this.mSystemClasses = systemClasses;

    /** 
     * @private 
     * @type {number} 
     */
    this.mStageWidth = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mStageHeight = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mLastUpdateTime = 0;

    /** 
     * @private 
     * @type {number} 
     */
    this.mFrameNum = 0;

    /** 
     * @private
     * @type {number}
     */
    this.mNumUpdates = 0;

    /** 
     * @private
     * @type {number}
     */
    this.mMaxUpdatesPerFrame = 60;

    /** 
     * @private 
     * @type {number} 
     */
    this.mLastRenderTime = 0;

    /** 
     * @private 
     * @type {Array<black-engine~System>} 
     */
    this.mSystems = [];

    /** 
     * @private 
     * @type {black-engine~GameObject|null} 
     */
    this.mGameObject = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsRunning = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsStarted = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mIsPanic = false;

    /** 
     * @private 
     * @type {number} 
     */
    this.mRAFHandle = -1; // not sure

    /** 
     * @private 
     * @type {black-engine~Viewport} 
     */
    this.mViewport = null;

    /** 
     * @private 
     * @type {black-engine~VideoNullDriver} 
     */
    this.mVideo = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mPaused = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mUnpausing = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mPauseOnHide = true;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mPauseOnBlur = true;

    /** 
     * @private 
     * @type {Object<string, Array>} 
     */
    this.mTagCache = {};

    /** 
     * @private 
     * @type {function(new: black-engine~GameObject)} 
     */
    this.mGameClass = gameClass;

    /** 
     * @private 
     * @type {black-engine~Stage} 
     */
    this.mStage = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mWasStopped = false;

    /** 
     * @private 
     * @type {Array<number>} 
     */
    this.mFrameTimes = [];

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mUseHiDPR = false;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mPendingDispose = false;

    this.__initialize();
  }

  /**
   * @ignore
   */
  __initialize() {
    console.log('%c                         >>> BLACK <<<                         ', 'background: #000; color: #fff;');

    this.mContainerElement = /** @type {!HTMLElement} */ (document.getElementById(this.mContainerElementId));

    if (!this.mContainerElement)
      throw new Error('Container element was not found');

    Black.device = new Device();

    this.mStageWidth = this.mContainerElement.clientWidth;
    this.mStageHeight = this.mContainerElement.clientHeight;
    this.mUseHiDPR = Black.device.isMobile;

    this.__bootViewport();
    this.__update = this.__update.bind(this);
  }

  /**
   * Pauses all engine update logic. Note: RAF is not going to be paused and will work in background.
   *
   * @return {void}
   */
  pause() {
    this.mPaused = true;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onPause();

    /**
     * Posted after engine entered paused state.
     *
     * @event Engine#paused
     */
    this.post('paused');
  }

  /**
   * Resumes update execution.
   *
   * @return {void}
   */
  resume() {
    if (this.mPaused === true)
      this.mUnpausing = true;
  }

  __setUnpaused() {
    this.mPaused = false;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onResume();

    /**
     * Posted after engine is unpaused.
     *
     * @event Engine#unpaused
     */
    this.post('unpaused');
  }

  /**
   * @private
   * @returns {void}
   */
  __bootViewport() {
    this.mViewport = new Viewport(this.mContainerElement);
  }

  /**
   * @private
   * @returns {void}
   */
  __bootSystems() {
    if (this.mSystemClasses === null)
      return;

    for (let i = 0; i < this.mSystemClasses.length; i++)
      this.__addSystem(new this.mSystemClasses[i]());
  }

  __checkVisibility() {
    if (typeof document.hidden === 'undefined') {
      // lets fake hidden if there is no support for Page Visibility API
      document.hidden = false;
      document.visibilityState = 'visible';

      window.onpagehide = event => this.__onVisibilityChangeFallback(event);
      window.onpageshow = event => this.__onVisibilityChangeFallback(event);
    } else {
      document.addEventListener('visibilitychange', event => this.__onVisibilityChange(event), false);
    }

    window.onblur = event => this.__onVisibilityChangeFallback(event);
    window.onfocus = event => this.__onVisibilityChangeFallback(event);
  }

  /**
   * @private
   * @returns {void}
   */
  __bootStage() {
    this.mStage = new Stage();

    this.__checkVisibility();

    if (document.hidden && this.mPauseOnHide === true)
      this.pause();
  }

  /**
   * @private
   * @returns {void}
   */
  __onVisibilityChangeFallback(event) {
    let type = event.type;

    if (type === 'blur' && this.mPauseOnBlur === true)
      this.pause();
    else if (type === 'pagehide' && this.mPauseOnHide === true)
      this.pause();
    else if (type === 'focus' || type === 'pageshow') {
      if (document.hidden === false)
        this.resume();
    }
  }

  __onVisibilityChange() {
    if (this.mPauseOnHide === true && document.visibilityState === 'hidden')
      this.pause();
    else if (document.visibilityState === 'visible')
      this.resume();
  }

  /**
   * Returns true if system exists.
   *
   * @param {Function} systemTypeName
   */
  hasSystem(systemTypeName) {
    for (let i = 0; i < this.mSystems.length; i++) {
      let c = this.mSystems[i];
      if (c instanceof systemTypeName)
        return true;
    }

    return false;
  }

  /**
   * @private
   * @param  {black-engine~System} system The System object you want to add.
   * @return {black-engine~System}
   */
  __addSystem(system) {
    this.mSystems.push(system);
    return system;
  }

  /**
   * Gets system by type.
   *
   * @param {Function} typeName The system type.
   * @return {black-engine~System|null} The `System` instance or null if not found.
   */
  getSystem(typeName) {
    for (let i = 0; i < this.mSystems.length; i++) {
      let s = this.mSystems[i];
      if (s instanceof typeName)
        return s;
    }

    return null;
  }

  /**
   * @private
   * @returns {void}
   */
  __bootVideo() {
    this.mVideo = new this.mVideoDriverClass(this.mViewport.mViewportElement, this.mStageWidth, this.mStageHeight);
  }

  /**
   * Boots up the engine!
   *
   * @return {void}
   */
  start() {
    if (this.mWasStopped === true) {
      Debug.error('Black engine cannot be re-started.');
      return;
    }

    Black.engine = this;

    if (this.mIsStarted === true)
      return;

    Black.time = new Time();

    this.__bootSystems();
    this.__bootStage();
    this.__bootVideo();

    this.mStage.__refresh();

    /**
     * Posted when all systems, stage and driver ready to be used. 
     *
     * @event Engine#ready
     */
    this.post(Message.READY);

    this.mGameObject = new this.mGameClass();
    this.mStage.addChild(this.mGameObject);

    const self = this;

    this.mIsStarted = true;
    this.mVideo.start();

    // TODO: is there a way to cancel first raf? no! eg pause will not work
    this.mRAFHandle = window.requestAnimationFrame(function (timestamp) {
      // TODO: do first update here
      self.mIsRunning = true;

      self.mLastUpdateTime = timestamp;
      self.mLastRenderTime = self.mLastUpdateTime;

      // Start the main loop.
      self.__update(timestamp, true);
    });
  }

  /**
   * Stops any executions, destroys resources and scene.
   *
   * @return {void}
   */
  stop() {
    this.mIsStarted = false;
    this.mIsRunning = false;
    window.cancelAnimationFrame(this.mRAFHandle);

    console.log('%c                        <<< BYE BYE >>>                        ', 'background: #000; color: #fff;');
  }

  /**
   * Destroys the whole thing!
   */
  destroy() {
    this.mPendingDispose = true;
  }

  __dispose() {
    this.stop();

    this.mVideo.dispose();
    this.mViewport.dispose();

    Black.assets.dispose();
    Black.assets = null;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].dispose();

    MessageDispatcher.dispose();

    this.mNumUpdates = 0;
    this.mFrameNum = 0;
    Black.engine = null;
  }

  /**
   * @private
   * @param {number} timestamp
   * @param {boolean} forceUpdate
   * @return {void}
   */
  __update(timestamp, forceUpdate) {
    let time = Black.time;

    // Calculate FPS
    if (this.mPaused === true && this.mUnpausing === true) {
      this.mUnpausing = false;

      this.mLastUpdateTime = timestamp;
      this.mLastRenderTime = this.mLastUpdateTime;

      this.__setUnpaused();
    }

    this.mRAFHandle = window.requestAnimationFrame(/** @type {function(number)} */(this.__update));

    if (this.mPaused === true)
      return;

    let numTicks = Math.floor((timestamp - this.mLastUpdateTime) / time.mDeltaTimeMs);

    if (forceUpdate === true)
      numTicks = 1;

    if (numTicks > this.mMaxUpdatesPerFrame) {
      /**
       * Posted when engine is not able to achieve desired amount of updates per second. 
       * 
       * Usually happens when user switches to another tab in browser or update logic is too heavy to be executed 
       * withing one update loop. Lowering `Black.ups` value can help if update is heavy. 
       * Increasing `Black.maxUpdatesPerFrame` can lead to dead lock.
       *
       * @event Engine#looped
       */
      this.post('looped', numTicks);
      Debug.warn(`Unable to catch up ${numTicks} update(s).`);

      numTicks = this.mMaxUpdatesPerFrame;
    }

    this.mNumUpdates = numTicks;
    for (let i = 0; i < numTicks; i++) {
      time.mActualTime += time.delta;
      time.mTime = time.mActualTime;

      this.__internalUpdate();
      this.__internalSystemPostUpdate();
    }

    for (let l = timestamp - time.mDeltaTimeMs; this.mLastUpdateTime < l;)
      this.mLastUpdateTime += time.mDeltaTimeMs;

    if (numTicks === 0)
      time.mAlphaTime = (timestamp - this.mLastUpdateTime) / time.mDeltaTimeMs;
    else
      time.mAlphaTime = 0;

    time.mTime = time.mActualTime + ((timestamp - this.mLastUpdateTime) * 0.001) * time.mScale;

    this.__internalSystemRender();
    this.mVideo.beginFrame();
    this.mVideo.render(this.mStage);
    this.mVideo.endFrame();

    this.mFrameNum++;

    this.mIsPanic = false;
    Renderer.__dirty = false;

    this.mLastRenderTime = timestamp;

    if (this.mPendingDispose === true)
      this.__dispose();
  }

  /**
   * @private
   * @return {void}
   */
  __internalUpdate() {
    this.mViewport.__update();

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onUpdate();

    this.mStage.__update();
  }

  /**
   * @private
   * @return {void}
   */
  __internalSystemPostUpdate() {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onPostUpdate();
  }

  /**
   * @private
   * @return {void}
   */
  __internalSystemRender() {
    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onRender();
  }

  /**
   * Called when tag changed for specific `GameObject`.
   *
   * @protected
   * @param {black-engine~GameObject} child   A game object fired the event.
   * @param {string|null} oldTag Old tag.
   * @param {string|null} newTag New tag.
   * @return {void}
   */
  onTagUpdated(child, oldTag, newTag) {
    if (oldTag !== null) {
      let arr = this.mTagCache[oldTag];
      arr.splice(arr.indexOf(child), 1);

      if (arr.length === 0)
        delete this.mTagCache[oldTag];
    }

    if (newTag !== null) {
      if (this.mTagCache.hasOwnProperty(newTag) === false)
        this.mTagCache[newTag] = [];

      this.mTagCache[newTag].push(child);
    }
  }

  /**
   * Called when specific game object is added to display list.
   *
   * @protected
   * @param  {black-engine~GameObject} child Instance of GameObject.
   * @return {void}
   */
  onChildrenAdded(child, parent) {
    if (!(parent.root instanceof Stage))
      return;

    Renderer.__dirty = true;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onChildrenAdded(child);

    GameObject.forEach(child, (x) => {
      if (x.mAdded === true)
        return;

      this.onTagUpdated(x, null, x.mTag);

      x.mAdded = true;
      x.onAdded();

      for (let i = 0; i < x.mComponents.length; i++) {
        let c = x.mComponents[i];

        if (c.mAdded === true)
          continue;

        c.mAdded = true;
        c.onAdded(x);
      }
    });
  }

  /**
   * Called when specific game object is changed its index in display list.
   *
   * @protected
   * @param {black-engine~GameObject} child Instance of GameObject.
   * @return {void}
   */
  onChildrenChanged(child) {
    Renderer.__dirty = true;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onChildrenChanged(child);
  }

  /**
   * Called when specific game object is added to display list.
   *
   * @protected
   * @param  {black-engine~GameObject} child Instance of GameObject.
   * @return {void}
   */
  onChildrenRemoved(child) {
    Renderer.__dirty = true;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onChildrenRemoved(child);

    GameObject.forEach(child, (x) => {
      if (x.mAdded === true) {
        this.onTagUpdated(x, null, x.mTag);

        x.mAdded = false;
        x.onRemoved();

        for (let i = 0; i < x.mComponents.length; i++) {
          let c = x.mComponents[i];

          if (c.mAdded === false)
            continue;

          c.mAdded = false;
          c.onRemoved(x);
        }
      }
    });
  }

  /**
   * Called when specific component is added to GameObject instance.
   *
   * @protected
   * @param  {black-engine~GameObject} child Instance of GameObject.
   * @param  {black-engine~Component} component Instance of Component added to game object.
   * @return {void}
   */
  onComponentAdded(child, component) {
    Renderer.__dirty = true;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onComponentAdded(child, component);

    if (component.mAdded === true)
      return;

    component.mAdded = true;
    component.onAdded(child);
  }

  /**
   * Called when specific component is removed from its owner.
   *
   * @protected
   * @param  {black-engine~GameObject} child Instance of GameObject.
   * @param  {black-engine~Component} component Instance of Component removed from game object.
   * @return {void}
   */
  onComponentRemoved(child, component) {
    Renderer.__dirty = true;

    for (let i = 0; i < this.mSystems.length; i++)
      this.mSystems[i].onComponentRemoved(child, component);

    if (component.mAdded === false)
      return;

    component.mAdded = false;
    component.onRemoved(child);
  }

  /**
   * Gets/Sets the number of updates should be done per second.
   *
   * @return {number}
   */
  get ups() {
    return Black.time.mDeltaTimeMs * 0.001;
  }

  /**
   * @param {number} value
   * @return {void}
   */
  set ups(value) {
    Debug.isNumber(value);
    Debug.assert(value > 0);

    Black.time.mDeltaTimeMs = 1000 / value;
    Black.time.mDeltaTime = Black.time.mDeltaTimeMs * 0.001;
  }

  /**
   * Returns the current viewport instance. Used to get size of a game screen, or listen for resize messages.
   *
   * @return {black-engine~Viewport}
   */
  get viewport() {
    return this.mViewport;
  }

  /**
   * Returns the DOM element the engine runs in.
   *
   * @return {Element}
   */
  get containerElement() {
    return this.mContainerElement;
  }

  /**
   * Gets/Sets if engine should be automatically paused when window is hidden.
   *
   * @return {boolean}
   */
  get pauseOnHide() {
    return this.mPauseOnHide;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set pauseOnHide(value) {
    this.mPauseOnHide = value;
  }

  /**
   * Gets/Sets if engine should be automatically paused when container element is blurred.
   *
   * @return {boolean}
   */
  get pauseOnBlur() {
    return this.mPauseOnBlur;
  }

  /**
   * @param {boolean} value
   * @return {void}
   */
  set pauseOnBlur(value) {
    this.mPauseOnBlur = value;
  }

  /**
   * Returns True if engine is paused.
   *
   * @readonly
   * @returns {boolean}
   */
  get isPaused() {
    return this.mPaused;
  }

  /**
   * Returns current stage.
   *
   * @readonly
   * @returns {black-engine~Stage}
   */
  get stage() {
    return this.mStage;
  }

  /**
   * Returns HTML container element id.
   * @returns {string}
   */
  get containerElementId() {
    return this.mContainerElementId;
  }

  /**
   * Gets/sets whenever driver should be created with high DPR support. 
   * NOTE: Cannot be changed at runtime.
   * 
   * @returns {boolean}
   */
  get useHiDPR() {
    return this.mUseHiDPR;
  }

  /**
   * @param {boolean} value
   * @returns {void}
   */
  set useHiDPR(value) {
    this.mUseHiDPR = value;
  }


  /**
   * Returns number of frame since engine start.
   *
   * @readonly
   * @returns {number}
   */
  get frameNum() {
    return this.mFrameNum;
  }

  /**
   * Indicates how many updates will be done during this frame.
   *
   * @readonly
   * @returns {number}
   */
  get numUpdates() {
    return this.mNumUpdates;
  }

  /** 
   * Limit for number of updates to be done per one RAF.
   * @returns {number}
   */
  get maxUpdatesPerFrame() {
    return this.mMaxUpdatesPerFrame;
  }

  /** 
   * Limit for number of updates to be done per one RAF.
   * @param {number} value
   * @returns {void}
   */
  set maxUpdatesPerFrame(value) {
    this.mMaxUpdatesPerFrame = value;
  }
}

export { Acceleration, AlphaOverLife, AnchorOverLife, AnimationController, AnimationInfo, Arcade, Asset, AssetLoader, AssetManager, AssetManagerState, AssetType, AtlasTexture, AtlasTextureAsset, BVGAsset, BVGParser, BVGStyle, BindingType, BitmapFontAsset, BitmapFontCharData, BitmapFontData, BitmapTextField, BitmapTextRenderer, BitmapTextRendererCanvas, Black, BlendMode, BoxCollider, BoxToBoxPair, BoxToCirclePair, BroadPhase, Camera, CanvasDriver, CanvasRenderTexture, CapsStyle, Circle, CircleCollider, CircleToCirclePair, Collider, ColorHelper, ColorOverLife, ColorScatter, ColorScatterBase, Component, Curve, Debug, Device, DisplayObject, DisplayObjectRendererCanvas, DistortionEffect, Ease, Emitter, EmitterRendererCanvas, EmitterSortOrder, EmitterState, Engine, FillRule, FloatCurveScatter, FloatScatter, FloatScatterBase, FontAlign, FontAsset, FontFaceAssetLoader, FontMetrics, FontStyle, FontVerticalAlign, FontWeight, GameObject, Glob, Graphics, GraphicsCommand, GraphicsCommandType, GraphicsData, GraphicsGradient, GraphicsLinearGradient, GraphicsPath, GraphicsPattern, GraphicsRenderer, GraphicsRendererCanvas, HSV, ImageAssetLoader, InitialAnchor, InitialColor, InitialLife, InitialMass, InitialPosition, InitialRotation, InitialScale, InitialTexture, InitialVelocity, Input, InputComponent, Interpolation, JSONAsset, JointStyle, Key, KeyInfo, Line, LoaderType, MapMap, MasterAudio, MathEx, Matrix, Message, MessageBinding, MessageDispatcher, MessageType, Modifier, ObjectPool, Orientation, Oriented, Pair, ParserBase, Particle, Perlin, Polygon, Projection, RGB, RadialScatter, Range, Rectangle, RenderSession, RenderTarget, RenderTargetCanvas, Renderer, ReverbEffect, RigidBody, RotationOverLife, ScaleOverLife, Scatter, SimpleEQ, Sound, SoundAsset, SoundAtlasAsset, SoundAtlasClip, SoundChannel, SoundClip, SoundEffect, SoundInstance, SoundListener, SoundState, SplashScreen, Sprite, SpriteRendererCanvas, Stage, StageScaleMode, StereoPanner, System, TextField, TextMetricsData, TextMetricsEx, TextRenderer, TextRendererCanvas, TextSegmentMetricsData, TextStyle, Texture, TextureAsset, TextureOverLife, TilingInfo, Time, Timer, Tween, Vector, VectorCurveScatter, VectorField, VectorScatter, VectorScatterBase, VectorTextureAsset, VideoNullDriver, Viewport, XHRAssetLoader, XMLAsset };
