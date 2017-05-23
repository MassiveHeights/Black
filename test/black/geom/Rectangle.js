const chai = require('chai');
const assert = chai.assert;

import { Rectangle } from '../../dist/black-es6-module.js';

describe('Rectangle', function() {
  let rect = null;

  beforeEach(function() {
    //rect = new Rectangle();
  });

  describe('#constructor', function() {
    it('Should create new empty instance', function() {
      rect = new Rectangle();

      assert.equal(rect.x, 0);
      assert.equal(rect.y, 0);
      assert.equal(rect.width, 0);
      assert.equal(rect.height, 0);
    });

    it('Should accept x, y, width and height', function() {
      rect = new Rectangle(10, 20, 30, 40);

      assert.equal(rect.x, 10);
      assert.equal(rect.y, 20);
      assert.equal(rect.width, 30);
      assert.equal(rect.height, 40);
    });
  });

  describe('#set', function() {
    it('Should set new values', function() {
      rect.set(10, 20, 30, 40);

      assert.equal(rect.x, 10);
      assert.equal(rect.y, 20);
      assert.equal(rect.width, 30);
      assert.equal(rect.height, 40);
    });
  });

});
