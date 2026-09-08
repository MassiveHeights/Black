'use strict';

class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.NORMAL;

    // Pick up default AssetManager
    const assets = new AssetManager();

    // Preload images
    assets.enqueueImage('square', '/assets/examples/shape/square.png');
    assets.enqueueImage('circle', '/assets/examples/shape/circle.png');
    assets.enqueueImage('platform', '/assets/examples/p-platform-900x400.png');

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoaded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    const arcade = Black.engine.getSystem(Arcade);
    arcade.boundsEnabled = true;

    this.createPlatform(-1);
    this.createPlatform(1);

    const box = new Sprite('square');
    box.x = 100;
    box.y = 100;
    box.alignAnchor();
    box.body = box.addComponent(new RigidBody());
    box.body.friction = 0;
    box.rotation = 20 / 180 * Math.PI;
    this.add(box);

    const circle = new Sprite('circle');
    circle.x = Black.stage.width - 100;
    circle.y = 100;
    circle.alignAnchor();
    circle.body = circle.addComponent(new RigidBody());
    circle.body.friction = 0;
    circle.addComponent(new CircleCollider(0, 0, 50));
    this.add(circle);

    this.arcade = arcade;
    this.circle = circle;
    this.box = box;
  }

  createPlatform(side) {
    const platform = new Sprite('platform');
    platform.x = Black.stage.width / 2;
    platform.y = Black.stage.height;
    platform.width = 10;
    platform.height = Black.stage.width * 0.7;
    platform.rotation = (70 * side) / 180 * Math.PI;
    platform.anchorX = 0.5;
    platform.anchorY = 1;
    this.add(platform);

    platform.body = platform.addComponent(new RigidBody());
    platform.body.isStatic = true;

    return platform;
  }

  onUpdate() {
    if (!this.circle)
      return;

    if (this.arcade.isColliding(this.circle.body, this.box.body)) {
      this.circle.color = 0x00f000;
      this.box.color = 0x00f000;
    }
  }
}

const engine = new Engine('game-container', MyGame, CanvasDriver, [Input, Arcade]);
engine.start();