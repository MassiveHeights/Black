class MyGame extends GameObject {
  constructor() {
    super();

    const assets = new AssetManager();
    assets.enqueueImage('bg', '/assets/examples/mario/bg.jpg');
    assets.enqueueAtlas('atlas', '/assets/examples/mario/atlas.png', '/assets/examples/mario/atlas.json');
    assets.on('complete', this.onAssetsLoaded, this);
    assets.loadQueue();
  }

  onAssetsLoaded() {
    const arcade = Black.engine.getSystem(Arcade);
    arcade.gravityY = 1000;
    // arcade.iterations = 2;

    const bg = new Bg(this);
    const mario = new Mario(bg);

    // Note: use this to preserve physics characteristics depends on screen size
    Pair.unitsPerMeter = bg.scale;

    const bricks = [
      {x: 318, y: 136},
      {x: 350, y: 136},
      {x: 382, y: 136},

      {x: 1230, y: 136},
      {x: 1262, y: 136},

      {x: 1278, y: 72},
      {x: 1278 + 16, y: 72},
      {x: 1278 + 16 * 2, y: 72},
      {x: 1278 + 16 * 3, y: 72},
      {x: 1278 + 16 * 4, y: 72},
      {x: 1278 + 16 * 5, y: 72},
      {x: 1278 + 16 * 6, y: 72},
      {x: 1278 + 16 * 7, y: 72},

      {x: 1454, y: 72},
      {x: 1454 + 16, y: 72},
      {x: 1454 + 32, y: 72},
      {x: 1502, y: 136},
      {x: 1598, y: 136},
      {x: 1614, y: 136},

      {x: 1886, y: 136},
      {x: 1934, y: 72},
      {x: 1934 + 16, y: 72},
      {x: 1934 + 32, y: 72},

      {x: 2046, y: 72},
      {x: 2046 + 16, y: 136},
      {x: 2046 + 32, y: 136},
      {x: 2046 + 48, y: 72},

      {x: 2686, y: 136},
      {x: 2686 + 16, y: 136},
      {x: 2686 + 48, y: 136},
    ].map(({x, y}) => new Brick(x + 1, y, bg));

    const blocks = [
      {x: 254, y: 136},
      {x: 334, y: 136},
      {x: 350, y: 72},
      {x: 366, y: 136},
      {x: 1246, y: 136},
      {x: 1502, y: 72},
      {x: 1694, y: 136},
      {x: 1742, y: 136},
      {x: 1790, y: 136},
      {x: 1742, y: 72},
      {x: 2062, y: 72},
      {x: 2078, y: 72},
      {x: 2718, y: 136},
    ].map(({x, y}) => new Block(x + 1, y, bg));

    this.arcade = arcade;
    this.bg = bg;
    this.mario = mario;
    this.bricks = bricks;
    this.blocks = blocks;
    this.canJump = false;
    this.hitItem = null;
    this.controls = {up: false, left: false, right: false, space: false};

    Black.input.on('keyPress', (msg, keyInfo) => this.onKeyEvent(keyInfo.keyCode, true));
    Black.input.on('keyUp', (msg, keyInfo) => this.onKeyEvent(keyInfo.keyCode, false));
  }

  onKeyEvent(code, enable) {
    switch (code) {
      case Key.Z: {
        this.controls.space = enable;
        break;
      }

      case Key.UP_ARROW: {
        this.controls.up = enable;
        break;
      }

      case Key.LEFT_ARROW: {
        this.controls.left = enable;
        break;
      }

      case Key.RIGHT_ARROW: {
        this.controls.right = enable;
        break;
      }
    }
  }

  check(normalX, normalY, overlap, item) {
    if (normalX === 0 && normalY < 0) {
      this.canJump = true;
    }

    if (this.canHit && item && normalY > 0) {
      this.hitItem = !this.hitItem || Math.abs(this.hitItem.x + this.hitItem.width / 2 - this.mario.x) >
      Math.abs(item.x + item.width / 2 - this.mario.x) ? item : this.hitItem;
    }
  }

  onUpdate() {
    if (!this.bg) return;

    const bg = this.bg;
    const mario = this.mario;
    const bricks = this.bricks;
    const blocks = this.blocks;
    const arcade = this.arcade;
    const controls = this.controls;

    if (mario.x > 3174) {
      this.onUpdate = () => '';
      bg.addComponent(new Tween({x: Black.stage.width - bg.width}, 0.3));

      return mario.win();
    }

    if (mario.y > 220) {
      this.onUpdate = () => '';
      return mario.kill();
    }

    this.canJump = false;

    arcade.isColliding(bg.rigidBody, mario.rigidBody, this.check, this);
    bricks.forEach(brick => arcade.isColliding(brick.rigidBody, mario.rigidBody, this.check, this, brick));
    blocks.forEach(block => arcade.isColliding(block.rigidBody, mario.rigidBody, this.check, this, block));

    const m = controls.space ? 1.4 : 1;
    let isJumping = !this.canJump;
    let isRunning = false;

    if (controls.right) {
      mario.rigidBody.forceX = 400 * m;
      isRunning = true;
    } else if (controls.left) {
      mario.rigidBody.forceX = -400 * m;
      isRunning = true;
    }

    if (controls.up && this.canJump) {
      isJumping = true;
      mario.rigidBody.forceY = -17000;
    }

    const speed = Math.abs(mario.rigidBody.velocityX) * m;
    const name = isJumping ? 'jump' : speed > 1 ? 'run' : 'idle';

    if (mario.anim.currentAnimation.name !== name) {
      mario.anim.play(name);
    }

    // mario.anim.currentAnimation.fps = Math.max(1, speed * 0.05 | 0);
    mario.scaleX = mario.rigidBody.velocityX > 1 ? 1 : mario.rigidBody.velocityX < -1 ? -1 : mario.scaleX;

    mario.rigidBody.friction = isJumping ? 0 : isRunning ? 0.05 : 1;
    mario.rigidBody.frictionAir = 0.05;
    bg.rigidBody.friction = mario.rigidBody.friction;

    if (this.hitItem && this.canHit) {
      this.canHit = false;
      this.hitItem.hit();
      this.hitItem = null;
    }

    if (this.canJump) {
      this.canHit = true;
    }

    const pos = bg.globalToLocal(new Vector(this.stage.width / 2, 0));

    if (mario.x > pos.x) {
      bg.x -= (mario.x - pos.x) * bg.scale;
    }

    // bg.rigidBody.debug();
    // mario.rigidBody.debug();
    // bricks.forEach(brick => brick.rigidBody.debug());
    // blocks.forEach(block => block.rigidBody.debug());
  }
}

class Mario extends Sprite {
  constructor(parent) {
    super('mario/idle');
    this.x = 100;
    this.y = 180;
    this.alignAnchor(0.5, 1);
    parent.add(this);

    this.anim = this.addComponent(new AnimationController());
    this.anim.add('run', Black.assets.getTextures('mario/run/*'), 12);
    this.anim.add('jump', Black.assets.getTextures('mario/jump'), 1);
    this.anim.add('idle', Black.assets.getTextures('mario/idle'), 1);
    this.anim.add('lose', Black.assets.getTextures('mario/lose'), 1);
    this.anim.play('idle');

    const body = new RigidBody();
    this.addComponent(body);
    this.addComponent(new BoxCollider(-7, -16, 14, 16));

    this.rigidBody = body;
  }

  kill() {
    this.anim.play('lose');
    this.removeComponent(this.rigidBody);

    const tw = new Tween({y: this.y - 50}, 0.5, {ease: Ease.sinusoidalOut});
    tw.on('complete', () => this.addComponent(new Tween({y: this.y + 100}, 0.5, {ease: Ease.sinusoidalIn})));

    this.addComponent(tw);
  }

  win() {
    this.scaleX = -1;
    this.removeComponent(this.rigidBody);

    this.x = 3175;
    this.y = Math.min(184, this.y);

    const tw = new Tween({y: 184}, (184 - this.y) * 0.015, {delay: 0.1});

    tw.on('complete', () => {
      this.scaleX = 1;
      this.anim.play('run');

      this.addComponent(new Tween({x: 3278}, 1.6));
      this.addComponent(new Tween({alpha: 0}, 0.2, {delay: 1.4}));
      this.addComponent(new Tween({y: 200}, 0.15, {delay: 0.2}));
    });

    this.addComponent(tw);
  }
}

class Bg extends Sprite {
  constructor(parent) {
    super('bg');
    this.scale = Black.stage.height / this.height;
    parent.add(this);

    const body = new RigidBody();
    body.isStatic = true;
    this.addComponent(body);

    [
      // platform
      {x: 0, y: 200, w: 1102, h: 24},
      {x: 1134, y: 200, w: 1374 - 1134, h: 24},
      {x: 1422, y: 200, w: 2446 - 1422, h: 24},
      {x: 2478, y: 200, w: 3390 - 2478, h: 24},

      // wells
      {x: 448, y: 168, w: 30, h: 200 - 168},
      {x: 608, y: 152, w: 30, h: 200 - 152},
      {x: 736, y: 136, w: 30, h: 200 - 136},
      {x: 912, y: 136, w: 30, h: 200 - 136},
      {x: 2608, y: 168, w: 30, h: 200 - 168},
      {x: 2864, y: 168, w: 30, h: 200 - 168},

      // cubes 1
      {x: 2142, y: 184, w: 16 * 4, h: 16},
      {x: 2142 + 16, y: 184 - 16, w: 16 * 3, h: 16},
      {x: 2142 + 16 * 2, y: 184 - 16 * 2, w: 16 * 2, h: 16},
      {x: 2142 + 16 * 3, y: 184 - 16 * 3, w: 16, h: 16},

      // cubes 2
      {x: 2238, y: 184, w: 16 * 4, h: 16},
      {x: 2238, y: 184 - 16, w: 16 * 3, h: 16},
      {x: 2238, y: 184 - 16 * 2, w: 16 * 2, h: 16},
      {x: 2238, y: 184 - 16 * 3, w: 16, h: 16},

      // cubes 3
      {x: 2366, y: 184, w: 16 * 5, h: 16},
      {x: 2366 + 16, y: 184 - 16, w: 16 * 4, h: 16},
      {x: 2366 + 16 * 2, y: 184 - 16 * 2, w: 16 * 3, h: 16},
      {x: 2366 + 16 * 3, y: 184 - 16 * 3, w: 16 * 2, h: 16},

      // cubes 4
      {x: 2478, y: 184, w: 16 * 4, h: 16},
      {x: 2478, y: 184 - 16, w: 16 * 3, h: 16},
      {x: 2478, y: 184 - 16 * 2, w: 16 * 2, h: 16},
      {x: 2478, y: 184 - 16 * 3, w: 16, h: 16},

      // final cubes
      {x: 2894, y: 184, w: 16 * 9, h: 16},
      {x: 2894 + 16, y: 184 - 16, w: 16 * 8, h: 16},
      {x: 2894 + 16 * 2, y: 184 - 16 * 2, w: 16 * 7, h: 16},
      {x: 2894 + 16 * 3, y: 184 - 16 * 3, w: 16 * 6, h: 16},
      {x: 2894 + 16 * 4, y: 184 - 16 * 4, w: 16 * 5, h: 16},
      {x: 2894 + 16 * 5, y: 184 - 16 * 5, w: 16 * 4, h: 16},
      {x: 2894 + 16 * 6, y: 184 - 16 * 6, w: 16 * 3, h: 16},
      {x: 2894 + 16 * 7, y: 184 - 16 * 7, w: 16 * 2, h: 16},

      // flag cube
      {x: 3166, y: 184, w: 16, h: 16},
    ].forEach(({x, y, w, h}) => this.addComponent(new BoxCollider(x, y, w, h)));

    this.rigidBody = body;
  }
}

class Item extends Sprite {
  constructor(x, y, parent, frame) {
    super(frame);
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    parent.add(this);

    const body = new RigidBody();
    body.isStatic = true;
    this.addComponent(body);

    this.rigidBody = body;
  }

  hit() {
    this.addComponent(new Tween({y: this.y - 5}, 0.1, {yoyo: true, repeats: 1}));
  }
}

class Brick extends Item {
  constructor(x, y, parent) {
    super(x, y, parent, 'brick');
  }
}

class Block extends Item {
  constructor(x, y, parent) {
    super(x, y, parent, 'block/0');

    this.anim = this.addComponent(new AnimationController());
    this.anim.add('anim', Black.assets.getTextures('block/*'), 7);
    this.anim.play('anim');
  }

  hit() {
    super.hit();
    this.anim.stop();
    this.textureName = 'block/hit';
    this.hit = () => '';
  }
}

const engine = new Engine('game-container', MyGame, CanvasDriver, [Input, Arcade]);
engine.start();
