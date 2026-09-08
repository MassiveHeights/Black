'use strict';

class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.NO_SCALE;

    // Pick up default AssetManager
    const assets = new AssetManager();

    // Preload images
    assets.enqueueImage('circle', '/assets/examples/shape/circle.png');
    assets.enqueueImage('bagel', '/assets/examples/shape/bagel.png');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    const arcade = Black.engine.getSystem(Arcade);
    arcade.boundsEnabled = true;
    arcade.gravityY = 0;

    this.scale = 0.8 + Math.random() * 0.2;

    for (let i = 0; i < 15; i++) {
      const circle = new Sprite(Math.random() > 0.5 ? 'circle' : 'bagel');
      circle.alignAnchor();
      circle.x = Math.random() * Black.stage.width / this.scale;
      circle.y = Math.random() * Black.stage.height / this.scale;
      this.add(circle);

      circle.addComponent(new CircleCollider(0, 0, 50));
      circle.body = circle.addComponent(new RigidBody());
      circle.body.frictionAir = -0.02;
      circle.body.velocityY = Math.random() * 40;
      circle.body.bounce = 0.5;

      circle.scale = 0.6 + Math.random() * 0.6;
    }
  }
}

const engine = new Engine('game-container', MyGame, CanvasDriver, [Arcade]);
engine.start();
