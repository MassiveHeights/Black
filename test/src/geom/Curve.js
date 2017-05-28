describe('BezierCurve', function () {
  it('should initialize new bezier curve', function () {
    var c = new Curve();
    assert.isDefined(c.mPoints);
    assert.isDefined(c.mLookup);
    assert.isDefined(c.mStep);
  });

  it('should create linear path', function () {
    
  });
});
