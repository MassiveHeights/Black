import { ColorHelper, RGB, HSV } from './../../../dist/black-es6-module';

describe('ColorHelper', function () {
  it('hex2rgb', function () {
    const white = ColorHelper.hex2rgb(0xffffff);
    const black = ColorHelper.hex2rgb(0x000000);

    expect(white).toBeInstanceOf(RGB);
    expect(white.r).toBe(255);
    expect(white.g).toBe(255);
    expect(white.b).toBe(255);

    expect(black).toBeInstanceOf(RGB);
    expect(black.r).toBe(0);
    expect(black.g).toBe(0);
    expect(black.b).toBe(0);
  });

  it('rgb2hex', function () {
    const white = new RGB(255, 255, 255);
    const black = new RGB(0, 0, 0);

    expect(ColorHelper.rgb2hex(white)).toBe(0xffffff);
    expect(ColorHelper.rgb2hex(black)).toBe(0x000000);
  });

  it('hsv2rgb', function () {
    const white = new HSV(0, 0, 1);
    const black = new HSV(0, 0, 0);

    const rgbWhite = new RGB(255, 255, 255);
    const rgbBlack = new RGB(0, 0, 0);

    expect(ColorHelper.hsv2rgb(white)).toEqual(rgbWhite);
    expect(ColorHelper.hsv2rgb(black)).toEqual(rgbBlack);
  });

  it('rgb2hsv', function () {
    const white = new RGB(255, 255, 255);
    const black = new RGB(0, 0, 0);

    const hsvWhite = new HSV(0, 0, 1);
    const hsvBlack = new HSV(0, 0, 0);

    expect(ColorHelper.rgb2hsv(white)).toEqual(hsvWhite);
    expect(ColorHelper.rgb2hsv(black)).toEqual(hsvBlack);
  });

  it('lerpHSV', function () {
    const colorFrom = 0xffffff;
    const colorTo = 0x000000;

    expect(ColorHelper.lerpHSV(colorFrom, colorTo, 0)).toBe(0xffffff);
    expect(ColorHelper.lerpHSV(colorFrom, colorTo, 0.5)).toBe(0x7f7f7f);
    expect(ColorHelper.lerpHSV(colorFrom, colorTo, 1)).toBe(0x000000);
  });

  it('hexColorToString', function () {
    const colorFrom = 0xffffff;
    const colorTo = 0x000000;

    expect(ColorHelper.hexColorToString(0xffffff)).toBe('#ffffff');
    expect(ColorHelper.hexColorToString(0x000000)).toBe('#000000');
    expect(ColorHelper.hexColorToString(0xff)).toBe('#0000ff');
    expect(ColorHelper.hexColorToString(0x0f)).toBe('#00000f');
    expect(ColorHelper.hexColorToString(0x0)).toBe('#000000');
  });

  it('intToRGBA', function () {
    const colorFrom = 0xffffff;
    const colorTo = 0x000000;

    expect(ColorHelper.intToRGBA(0xffffff, 0)).toBe('rgba(255, 255, 255, 0)');
    expect(ColorHelper.intToRGBA(0xffffff, 1)).toBe('rgba(255, 255, 255, 1)');
    expect(ColorHelper.intToRGBA(0xffffff)).toBe('rgba(255, 255, 255, 1)');
    expect(ColorHelper.intToRGBA(0x000000)).toBe('rgba(0, 0, 0, 1)');
  });
});