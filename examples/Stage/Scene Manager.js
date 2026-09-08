class SceneManager {
  constructor() {
    this.activeScene = null;
    this.scenes = [];
  }

  register(name, className) {
    this.scenes.push({
      name: name,
      className: className
    });
  }

  show(name) {
    if (this.activeScene)
      Black.stage.removeChild(this.activeScene);

    let item = this.scenes.find(x => x.name === name);

    this.activeScene = new item.className();
    Black.stage.addChild(this.activeScene);

    // Simple transition
    this.activeScene.alpha = 0;
    this.activeScene.add(new Tween({ alpha: 1 }, 1));
  }
}

class Scene extends DisplayObject {
  constructor(name) {
    super();

    this.name = name;
  }
}

class PreloaderScene extends Scene {
  constructor() {
    super('preloader');
  }

  onAdded() {
    // You can have many AssetManagers. Sprites uses `Black.assets` instance when looking for a texture.
    // In this case you can create new AssetManager and override default instance.
    var assets = new AssetManager();
    assets.enqueueImage('bg', '/assets/examples/backgrounds/popart_bg_gre_2.png');
    assets.enqueueImage('sticker', '/assets/examples/popart_anvil.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded() {
    sceneManager.show('game');
  }
}

class GameScene extends Scene {
  constructor() {
    super('game');
  }

  onAdded() {
    this.bg = this.addChild(new Sprite('bg'));

    this.sprite = new Sprite('sticker');
    this.sprite.alignPivot();
    this.addChild(this.sprite);

    this.stage.on('resize', this.onResize, this);
    this.onResize();
  }

  onResize() {
    this.bg.x = 0;
    this.bg.y = 0;

    this.sprite.x = this.stage.centerX;
    this.sprite.y = this.stage.centerY;
  }
}

// create new SceneManager instance. Can be singleton or just part of root object. 
var sceneManager = new SceneManager();
sceneManager.register('preloader', PreloaderScene);
sceneManager.register('game', GameScene);

// Root object
class MyGame extends GameObject {
  constructor() {
    super();

    // Try to keep stage size withing desired width and height
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(900, 500);

    sceneManager.show('preloader');
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start();
engine.pauseOnHide = false;
engine.pauseOnBlur = false;