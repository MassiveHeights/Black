import { Glob } from './../../../dist/black-es6-module';

describe('Glob', function () {
  it('Glob', function () {
    const globA = new Glob('/**/*.js');
    const globB = new Glob('/**/other/**');
    const globC = new Glob('*.json');

    expect(globA.test('/some/folder/index.js')).toBe(true);
    expect(globA.test('/some/folder/index.json')).toBe(false);

    expect(globB.test('/some/other/folder')).toBe(true);
    expect(globB.test('/some/folder')).toBe(false);

    expect(globC.test('some_awesome_data.json')).toBe(true);
    expect(globC.test('some_awesome_data.xml')).toBe(false);
  });
});