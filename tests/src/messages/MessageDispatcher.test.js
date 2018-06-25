import { MessageDispatcher, GameObject, Sprite, Vector, Matrix, DirtyFlag, Rectangle, Texture, Black, VideoNullDriver } from './../../../dist/black-es6-module'
const RECT_50X50_B64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFxJREFUeNrs2UENwCAUREHaoIM7EmoBO+hADlq4o4TWxU86L9n73Pd6Zkvxyu96qaFMY687hQwLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsL61+s708ce0VjHQEGALvnBuYLRdofAAAAAElFTkSuQmCC';

describe('MessageDispatcher', () => {
  class MyGame extends GameObject { 
    constructor() {
      super();

      this.name = 'game';
    }
  }
  const black = new Black('game-container', MyGame, VideoNullDriver);

  beforeAll(() => {
    black.start();
  });

  afterAll(() => {
    black.stop();
  });

  class Player extends GameObject {
  }

  test('Post and receive message', () => {    
    // we use stage because checkForStage is true by default
    let p = new GameObject();
    black.stage.addChild(p);
    
    const fn = jest.fn();
    p.on('died', fn);
    p.post('died');

    expect(fn).toBeCalled();
  });

  test('Overhear message', () => {    
    // we use stage because checkForStage is true by default
    let p = new GameObject();
    p.name = 'player';
    black.stage.addChild(p);
   
    const fn = jest.fn();
    black.stage.on('died@stage/player', fn);
    p.post('died');

    expect(fn).toBeCalled();
  });

  test('Overhear message using glob', () => {    
    // we use stage because checkForStage is true by default
    let p = new GameObject();
    p.name = 'player';
    black.stage.addChild(p);
   
    const fn = jest.fn();
    black.stage.on('died@**/player', fn);
    p.post('died');

    expect(fn).toBeCalled();
  });

});