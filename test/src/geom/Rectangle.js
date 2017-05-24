describe('Rectangle', function() {
  describe('#constructor', function() {
    it('Should create new empty instance', function() {
      let rect = new Rectangle();
      assert.equal(rect.x, 0);
      assert.equal(rect.y, 0);
      assert.equal(rect.width, 0);
      assert.equal(rect.height, 0);

      assert.equal(rect.top, 0);
      assert.equal(rect.right, 0);
      assert.equal(rect.bottom, 0);
      assert.equal(rect.left, 0);

      assert.equal(rect.topLeft.x, 0);
      assert.equal(rect.topLeft.y, 0);
      assert.equal(rect.topRight.x, 0);
      assert.equal(rect.topRight.y, 0);
      assert.equal(rect.bottomLeft.x, 0);
      assert.equal(rect.bottomLeft.y, 0);
      assert.equal(rect.bottomRight.x, 0);
      assert.equal(rect.bottomRight.y, 0);
    });

    it('Should create new instance with given values', function() {
      let v = new Rectangle(1, 2, 3, 4);
      assert.equal(v.x, 1);
      assert.equal(v.y, 2);
      assert.equal(v.width, 3);
      assert.equal(v.height, 4);
    });
  });

  describe('#set', function() {
    it('Should update existing values', function() {
      let v = new Rectangle();
      let res = v.set(1, 2, 3, 4);

      assert.equal(v.x, 1);
      assert.equal(v.y, 2);
      assert.equal(v.width, 3);
      assert.equal(v.height, 4);
    });
  });

  describe('#copyFrom', function() {
    it('Should copy values from another instance', function() {
      let r1 = new Rectangle(10, 20, 10, 20);
      let r2 = new Rectangle(0, 0, 0, 0);

      r1.copyFrom(r2);

      assert.equal(r1.x, r2.x);
      assert.equal(r1.y, r2.y);
      assert.equal(r1.width, r2.width);
      assert.equal(r1.height, r2.height);
      assert.notEqual(r1, r2);
    });
  });

  describe('#copyTo', function() {
    it('Should copy current values into destination Rectangle', function() {
      let r1 = new Rectangle(10, 20, 10, 20);
      let r2 = new Rectangle(0, 0, 0, 0);

      r1.copyFrom(r2);
      assert.equal(r1.x, r2.x);
      assert.equal(r1.y, r2.y);
      assert.equal(r1.width, r2.width);
      assert.equal(r1.height, r2.height);
      assert.notEqual(r1, r2);
    });
  });

  describe('#left', function() {
    it('Should return leftmost point', function() {
      let r = new Rectangle(11, 22, 33, 44);
      assert.equal(r.left, 11);
    });

    it('Should update leftmost point with a new value', function() {
      let r = new Rectangle(11, 22, 33, 44);
      r.left = -100;
      assert.equal(r.left, -100);
    });
  });

  describe('#right', function() {
    it('Should return rightmost point', function() {
      let r = new Rectangle(11, 22, 33, 44);
      assert.equal(r.right, 11 + 33);
    });

    it('Should update rightmost point with a new value', function() {
      let r = new Rectangle(11, 22, 33, 44);
      r.right = 100;
      assert.equal(r.right, 100);
    });
  });

  describe('#top', function() {
    it('Should return topmost point', function() {
      let r = new Rectangle(11, 22, 33, 44);
      assert.equal(r.top, 22);
    });

    it('Should update topmost point with a new value', function() {
      let r = new Rectangle(11, 22, 33, 44);
      r.top = 100;
      assert.equal(r.top, 100);
    });
  });

  describe('#bottom', function() {
    it('Should return bottommost point', function() {
      let r = new Rectangle(11, 22, 33, 44);
      assert.equal(r.bottom, 22 + 44);
    });

    it('Should update bottommost point with a new value', function() {
      let r = new Rectangle(11, 22, 33, 44);
      r.bottom = 100;
      assert.equal(r.bottom, 100);
    });
  });

  describe('#topLeft', function() {
    it('Should return topLeft point', function() {
      let r = new Rectangle(11, 22, 33, 44);
      let p = r.topLeft;
      assert.equal(p.x, 11);
      assert.equal(p.y, 22);
    });

    it('Should update topLeft point', function() {
      let r = new Rectangle(11, 22, 33, 44);
      r.topLeft = new Vector(100, 100);
      let p = r.topLeft;
      assert.equal(p.x, 100);
      assert.equal(p.y, 100);
    });
  });

  describe('#topRight', function() {
    it('Should return topRight point', function() {
      let r = new Rectangle(11, 22, 33, 44);
      let p = r.topRight;
      assert.equal(p.x, 11 + 33);
      assert.equal(p.y, 22);
    });

    it('Should update topLeft point', function() {
      let r = new Rectangle(11, 22, 33, 44);
      r.topRight = new Vector(100, 100);
      let p = r.topRight;
      assert.equal(p.x, 100);
      assert.equal(p.y, 100);
    });
  });

  describe('#bottomLeft', function() {
    it('Should return bottomLeft point', function() {
      let r = new Rectangle(11, 22, 33, 44);
      let p = r.bottomLeft;
      assert.equal(p.x, 11);
      assert.equal(p.y, 22 + 44);
    });

    it('Should update bottomLeft point', function() {
      let r = new Rectangle(11, 22, 33, 44);
      r.bottomLeft = new Vector(100, 100);
      let p = r.bottomLeft;
      assert.equal(p.x, 100);
      assert.equal(p.y, 100);
    });
  });

  describe('#bottomRight', function() {
    it('Should return bottomRight point', function() {
      let r = new Rectangle(11, 22, 33, 44);
      let p = r.bottomRight;
      assert.equal(p.x, 11 + 33);
      assert.equal(p.y, 22 + 44);
    });

    it('Should update bottomRight point', function() {
      let r = new Rectangle(11, 22, 33, 44);
      r.bottomRight = new Vector(100, 100);
      let p = r.bottomRight;
      assert.equal(p.x, 100);
      assert.equal(p.y, 100);
    });
  });

  describe('#size', function() {
    it('Should return size', function() {
      let r = new Rectangle(11, 22, 33, 44);
      let size = r.size();

      assert.equal(size.x, 33);
      assert.equal(size.y, 44);
    });

    it('Should return size into passed Vector', function() {
      let size = new Vector();

      let r = new Rectangle(11, 22, 33, 44);
      r.size(size);

      assert.equal(size.x, 33);
      assert.equal(size.y, 44);
    });
  });

  describe('#zero', function() {
    it('Should zero existing values', function() {
      let r = new Rectangle(11, 22, 33, 44);
      let size = r.zero();

      assert.equal(size.x, 0);
      assert.equal(size.y, 0);
    });
  });

  describe('#equals', function() {
    it('Should compare two Rectangle using default Number.EPSILON value', function() {
      let rectA = new Rectangle(11, 22, 33, 44);
      let rectB = new Rectangle(11, 22, 33, 44 + Number.EPSILON);

      assert.equal(rectA.equals(rectB), true);
    });

    it('Should compare two Rectangle using custom epsilon', function() {
      let rectA = new Rectangle(11, 22, 33, 44);
      let rectB = new Rectangle(11, 22, 33, 44.1);

      assert.equal(rectA.equals(rectB, 0.10001), true);
    });
  });

  describe('#containsXY', function() {
    it('Should check if point is inside a rectangle', function() {
      let r = new Rectangle(0, 20, 20, 20);

      assert.isTrue(r.containsXY(0, 20));
      assert.isTrue(r.containsXY(0, 40));
    });

    it('Should check if point is outside of a rectangle', function() {
      let r = new Rectangle(0, 20, 20, 20);

      assert.isNotTrue(r.containsXY(0, 19));
      assert.isNotTrue(r.containsXY(0, 41));
    });
  });

  describe('#contains', function() {
    it('Should check if point is inside a rectangle', function() {
      let r = new Rectangle(0, 20, 20, 20);
      let r1 = new Rectangle(5, 25, 10, 10);
      assert.isTrue(r.contains(r1));
    });

    it('Should check if point is outside of a rectangle', function() {
      let r = new Rectangle(0, 20, 20, 20);
      let r2 = new Rectangle(20, 25, 10, 10);
      assert.isNotTrue(r.contains(r2));
    });
  });

  describe('#intersects', function() {
    it('Should check if given rectangle intersects this rectangle', function() {
      let r = new Rectangle(0, 20, 20, 20);
      let r1 = new Rectangle(5, 25, 10, 10);

      assert.isTrue(r.intersects(r1));
    });

    it('Should check if given rectangle not intersecting current rectangle', function() {
      let r = new Rectangle(0, 20, 20, 20);
      let r2 = new Rectangle(20, 25, 10, 10);
      assert.isNotTrue(r.intersects(r2));
    });
  });

  describe('#union', function() {
    it('Should union two rectangles', function() {
      let r = new Rectangle(0, 20, 20, 20);
      let r1 = new Rectangle(5, 25, 10, 10);
      let r2 = new Rectangle(20, 25, 10, 10);

      assert.equal(r.union(r1).x, 0);
      assert.equal(r.union(r2).x, 0);

      assert.equal(r.union(r1).y, 20);
      assert.equal(r.union(r2).y, 20);

      assert.equal(r.union(r1).width, 20);
      assert.equal(r.union(r2).width, 30);

      assert.equal(r.union(r1).height, 20);
      assert.equal(r.union(r2).height, 20);
    });
  });

  describe('#volume', function() {
    it('Should return the volume of this rectangle', function() {
      let r = new Rectangle(0, 20, 20, 20);
      assert.equal(r.volume, 400);
      r.width = 0;
      assert.equal(r.volume, 0);
      r.width = 1;
      assert.equal(r.volume, 20);
    });
  });

  describe('#expand', function() {
    it('Should expand this rectangle by given dimmension', function() {
      let r = new Rectangle(20, 20, 20, 20);
      r.expand(10, 10, 10, 10);

      assert.equal(r.x, 10);
      assert.equal(r.y, 10);
      assert.equal(r.width, 30);
      assert.equal(r.height, 30);
    });
  });

  describe('#inflate', function() {
    it('Should inflate this rectangle by given size', function() {
      let r = new Rectangle(20, 20, 20, 20);
      r.inflate(10, 10);

      assert.equal(r.x, 10);
      assert.equal(r.y, 10);
      assert.equal(r.width, 40);
      assert.equal(r.height, 40);
    });
  });

  describe('#clone', function() {
    it('Should copy current values into new instance', function() {
      let r1 = new Rectangle(10, 20, 10, 10);
      let r2 = r1.clone();

      assert.equal(r1.x, r2.x);
      assert.equal(r1.y, r2.y);
      assert.notEqual(r1, r2);
    });
  });

  describe('#perimeter', function() {
    it('Should return the perimeter this rectangle', function() {
      let r = new Rectangle(10, 10, 10, 10);
      assert.equal(r.perimeter, 40);
    });
  });

  describe('#center', function() {
    it('Should return the center point this rectangle', function() {
      let r = new Rectangle(10, 10, 10, 10);
      let v = r.center();
      assert.equal(v.x, 15);
      assert.equal(v.y, 15);
    });

    it('Should return the center point this rectangle into given outVector', function() {
      let v = new Vector();
      let r = new Rectangle(10, 10, 10, 10);
      r.center(v);

      assert.equal(v.x, 15);
      assert.equal(v.y, 15);
    });
  });

  describe('#scale', function() {
    it('Should scale this rectangle by given size', function() {
      let r = new Rectangle(11, 12, 13, 14);
      let scaleFactor = 10;

      r.scale(scaleFactor, scaleFactor);

      assert.equal(r.width, 130);
      assert.equal(r.height, 140);
    });
  });

  describe('#isEmpty', function() {
    it('Should return True if all components equals to zero', function() {
      let r1 = new Rectangle(0, 0, 0, 0);
      let r2 = new Rectangle(10, 10, 10, 10);

      assert.isOk(r1.isEmpty());
      assert.isNotOk(r2.isEmpty());
    });

    it('Should return False if any component is not equal to zero', function() {
      let r2 = new Rectangle(10, 10, 10, 10);
      assert.notEqual(r2.isEmpty());
    });
  });

  describe('#toString', function() {
    it('Should return a string representation of this rectangle', function() {
      let r = new Rectangle(10, 20);
      assert.isString(r.toString());
      assert.isString(r.toString(20));

      assert.equal(r.toString(), 'Rectangle { x: 10.00, y: 20.00, width: 0.00, height: 0.00 }');
      assert.equal(r.toString(20), 'Rectangle { x: 10.00000000000000000000, y: 20.00000000000000000000, width: 0.00000000000000000000, height: 0.00000000000000000000 }');
    });
  });
});
