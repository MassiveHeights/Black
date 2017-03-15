describe('Tween', function() {
  it('should create new tween with linear ease', function() {
    let tw = new Tween({ alpha: 1 }, 1, { ease: Ease.linear });

    assert.isDefined(tw.ease);
    assert.equal(tw.ease, Ease.linear);
  });
});
