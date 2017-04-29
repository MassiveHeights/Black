class Player extends GameObject {
  constructor() {
  }

  onAdded() {
    this.post('addedOnStage');
  }
}

class MyGame extends GameObject {
  constructor() {
    super();
  }

  onAdded() {
    var player = new GameObject();
    var enemy = new GameObject();

    player.name = 'player';
    enemy.name = 'enemy';

    this.add(player, enemy);

    enemy.on('attack', this.onEnemyAttacked, this);

    player.on('attack@root/enemy', this.onEnemyAttackedPrivate, this);

    // send 100 damage
    enemy.post('attack', 100);
  }

  onEnemyAttacked(msg, damage) {
    console.log('Got direct attack message. Damage:', 100);
  }

  onEnemyAttackedPrivate(msg, damage) {
    console.log('Overheard private attack message. Damage:', 100);
  }
}

// Create and start engine
var black = new Black('container', MyGame, 'canvas');
black.pauseOnBlur = true;
black.pauseOnHide = true;
black.start();
