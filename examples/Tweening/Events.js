class MyGame extends GameObject {
  constructor() {
    super();

    // Set auto resizeable stage
    Black.stage.scaleMode = StageScaleMode.LETTERBOX;
    Black.stage.setSize(500, 500);

    var assets = new AssetManager();
    assets.enqueueImage('plane', '/assets/examples/popart_airplane.png');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded(m) {
    // Create events notifications
    let notifications = this.createNotifications();

    // Create a sprite
    let sprite = new Sprite('plane');
    sprite.x = 60;
    sprite.y = 250;
    sprite.rotation = Math.PI * 0.5;
    sprite.alignPivot();
    this.addChild(sprite);

    // Create a tween
    let tween = new Tween({ x: 480 }, 2, { delay: 1, ease: Ease.exponentialIn });

    // Hire some events
    tween.on('start', () => {
      notifications['start'].alpha = 1;
    });
    tween.on('update', (msg, target) => {
      notifications['update'].alpha = 1;
      target.alpha = 1 - msg.sender.elapsed;
    });
    tween.on('complete', () => {
      notifications['complete'].alpha = 1;
    });
    notifications['delay'].alpha = 1;

    // Add the tween to sprite
    sprite.addComponent(tween);
  }

  createNotifications() {
    let notifications = [];
    ['delay', 'start', 'update', 'complete'].forEach((msg, i) => {
      let notificationsText = new TextField(msg, 'Roboto', 0xf6a200, 42);
      notificationsText.x = 100;
      notificationsText.y = 260 + i * 40;
      notificationsText.autoSize = false;
      notificationsText.fieldWidth = 960;
      notificationsText.align = 'right';
      notificationsText.alignPivot();
      notificationsText.alpha = 0.3;

      this.addChild(notificationsText);
      notifications[msg] = notificationsText;
    });
    return notifications;
  }
}

var engine = new Engine('game-container', MyGame, CanvasDriver);
engine.start()