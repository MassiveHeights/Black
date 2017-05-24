describe('Polygon', function () {
  it('should create vertices', function () {
    var v = new Polygon();
    assert.isDefined(v.vertices);
  });

  it('should create polygon from path', function () {
    var p = Polygon.fromPath('0 0 1 0 1 1');

    assert.equal(p.vertices[0].x, 0);
    assert.equal(p.vertices[0].y, 0);
    assert.equal(p.vertices[1].x, 1);
    assert.equal(p.vertices[1].y, 0);
    assert.equal(p.vertices[2].x, 1);
    assert.equal(p.vertices[2].y, 1);
  });

  it('should rotate polygon around center', function() {
    var p = Polygon.fromPath('0 0 1 -1 2 0 1 1');
    p.setRotation(Math.PI / 2);
    for (let vector of p.vertices) {
      vector.x = +vector.x.toFixed(15);
      vector.y = +vector.y.toFixed(15);
    }
    
    var p2 = Polygon.fromPath('1 -1 2 0 1 1 0 0');
    
    assert.equal(p.vertices[0].x, p2.vertices[0].x);
    assert.equal(p.vertices[0].y, p2.vertices[0].y);
    assert.equal(p.vertices[1].x, p2.vertices[1].x);
    assert.equal(p.vertices[1].y, p2.vertices[1].y);
    assert.equal(p.vertices[2].x, p2.vertices[2].x);
    assert.equal(p.vertices[2].y, p2.vertices[2].y);
    assert.equal(p.vertices[3].x, p2.vertices[3].x);
    assert.equal(p.vertices[3].y, p2.vertices[3].y);
  });

  it('should translate polygon', function () {
    var p = Polygon.fromPath('0 0 1 1 2 0 1 -1');
    p.setTranslation(new Vector(1, 1));

    expect(p.vertices).to.eql(Polygon.fromPath('0 1 1 2 2 1 1 0').vertices);
    expect(p.center).to.eql(new Vector(1, 1));
  });

  it('should collide with another polygon', function () {
    var p1 = Polygon.fromPath('0 0 1 1 1 0');
    var p2 = Polygon.fromPath('0 0 0 1 1 0');
    assert.isOk(p1.collide(p2));
  });

  it('should not collide with another polygon', function () {
    var p1 = Polygon.fromPath('0 0 1 1 0 1');
    var p2 = Polygon.fromPath('1 0 2 1 1.05 1');
    assert.isNotOk(p1.collide(p2));
  });

  it('should collide with circle', function () {
    var p = Polygon.fromPath('0 0 1 1 1 0');
    var c = new Circle(0, 1, 0.8);
    assert.isOk(p.collideCircle(c));
  });

  it('should not collide with circle', function () {
    var p = Polygon.fromPath('0 0 1 1 1 0');
    var c = new Circle(0, 1, 0.7);
    assert.isNotOk(p.collideCircle(c));
  });
  
  it('should collide with rectangle', function () {
    var p = Polygon.fromPath('0 0 1 1 1 0');
    var r = new Rectangle(0, 0, 0.1, 1);
    assert.isOk(p.collideRectangle(r));
  });

  it('should not collide with rectangle', function () {
    var p = Polygon.fromPath('0 0 1 1 1 0');
    var r = new Rectangle(-0.1, 0, 0.1, 1);
    assert.isNotOk(p.collideRectangle(r));
  });
  
  it('should overlap another polygon', function () {
    var p1 = Polygon.fromPath('0 0 1 1 1 0');
    var p2 = Polygon.fromPath('0 0 1 1 1 0');
    assert.isOk(p1.overlap(p2));
  });

  it('should not overlap another polygon', function () {
    var p1 = Polygon.fromPath('0 0 1 1 1 0');
    var p2 = Polygon.fromPath('0 0 1 1 1 -0.1');
    assert.isNotOk(p1.overlap(p2));
  });

  it('should overlap circle', function () {
    var p = Polygon.fromPath('0 0 1 1 2 0 1 -1');
    var c = new Circle(1, 0, 0.7);
    assert.isOk(p.overlapCircle(c));
  });

  it('should not overlap circle', function () {
    var p = Polygon.fromPath('0 0 1 1 2 0 1 -1');
    var c = new Circle(1, 0, 0.8);
    assert.isNotOk(p.overlapCircle(c));
  });

  it('should overlap rectangle', function () {
    var p = Polygon.fromPath('0 0 1 1 1 0');
    var r = new Rectangle(0.5, 0, 0.5, 0.5);
    assert.isOk(p.overlapRectangle(r));
  });

  it('should not overlap rectangle', function () {
    var p = Polygon.fromPath('0 0 1 1 1 0');
    var r = new Rectangle(0.51, 0, 0.5, 0.5);
    assert.isNotOk(p.overlapRectangle(r));
  });

});
