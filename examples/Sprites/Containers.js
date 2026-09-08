class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('sun', '/assets/examples/popart_planet_sun.png');
    assets.enqueueImage('big-planet', '/assets/examples/popart_planet_earth.png');
    assets.enqueueImage('small-planet', '/assets/examples/popart_planet_3.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.sun = new Sprite('sun');
    this.sun.x = 500 / 2;
    this.sun.y = 500 / 2;
    this.sun.alignPivot();

    this.subGroup = new GameObject();
    this.subGroup.x = 290;
    this.subGroup.y = 190;

    this.earth = new Sprite('big-planet');
    this.earth.x = 0;
    this.earth.y = 0;
    this.earth.alignPivot();

    this.moon = new Sprite('small-planet');
    this.moon.x = 50;
    this.moon.y = 50;
    this.moon.alignPivot();
    this.moon.scale = 0.4;
    this.moon.rotation = 2.5;

    this.sun.add(this.subGroup);
    this.subGroup.add(this.earth);
    this.earth.add(this.moon);

    this.add(this.sun);
  }

  onUpdate() {
    if (!Black.assets.isAllLoaded)
      return;

    let dt = Black.time.delta;
    this.sun.rotation -= 1 * dt;
    this.subGroup.rotation += 2 * dt;
    this.earth.rotation += 3 * dt;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();
