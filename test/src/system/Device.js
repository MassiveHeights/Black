new Device();

describe('Device', function() {
  it('Should return pixel ratio > 0', function () {

    assert.equal(Device.pixelRatio > 0, true);
  });
});
