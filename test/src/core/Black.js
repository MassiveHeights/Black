describe('Black', function() {
  class MyGame extends GameObject {
    constructor() {
      super();
    }

    onAdded() {
    }
  }

  describe('#constructor', function () {
    it('Should create new Black instance', () => {
      let black = new Black('container', MyGame, VideoNullDriver);
    });
  });
});
