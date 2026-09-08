class MyGame extends GameObject {
  constructor() {
    super();

    var assets = new AssetManager();
    assets.enqueueImage('ghost', '/assets/examples/popart_pacman_5.png');

    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    this.ghost = new Sprite('ghost');
    this.ghost.x = this.stage.centerX;
    this.ghost.y = this.stage.centerY;
    this.addChild(this.ghost);

    // Creating render texture and assigning it to new sprite
    let s = Math.round(Black.driver.finalScale * 1000) / 1000;

    this.rt = new CanvasRenderTexture(this.stage.width, this.stage.height, Black.driver.renderScaleFactor);
    this.sprite = this.addChild(new Sprite(this.rt));
  }

  onUpdate() {
    if (!Black.assets.isAllLoaded)
      return;

    this.ghost.rotation -= Math.sin(Black.time.now / 100);
    this.ghost.anchorX = Math.sin(Black.time.now / 2);
    this.ghost.anchorY = -Math.cos(Black.time.now * 2);

    // Rendering whole stage in our texture each frame
    Black.driver.render(this, this.rt);
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();