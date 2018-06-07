import { Black, GameObject, VideoNullDriver } from './../../dist/black-es6-module'



describe('Black', () => {
  test('Should create new Black instance', () => {
    class MyGame extends GameObject {
      constructor() {
        super();
      }
    }

    var black = new Black('game-container', MyGame, VideoNullDriver);
    black.start();
    black.stop();
  });

  test('Should call Black.instance without errors', () => {
    class MyGame extends GameObject {
      constructor() {
        super();
      }

      onAdded() {
        expect(Black.instance).not.toBeNull();
      }
    }

    var black = new Black('game-container', MyGame, VideoNullDriver);
    black.start();
    black.stop();
  });
});