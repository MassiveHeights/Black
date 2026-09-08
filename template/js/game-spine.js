import { AssetManager, GameObject, MessageDispatcher, Black } from 'black-engine';
import { Spine } from 'black-spine';
import spineImage from 'assets/spineboy/spineboy.png';
import spineAtlas from 'assets/spineboy/spineboy-atlas.json';
import spineAnimation from 'assets/spineboy/spineboy.json';

export class GameSpine extends GameObject {
  constructor() {
    super();

    // Pick default AssetManager
    var assets = new AssetManager();

    // load image atlas
    assets.enqueueAtlas('atlas', spineImage, spineAtlas);

    // load spine json file
    assets.enqueueJSON('spine', spineAnimation);

    // Listen for a complete message
    assets.on('complete', this.onAssetsLoadded, this);

    // Start preloading all enqueued assets
    assets.loadQueue();
  }

  onAssetsLoadded(m) {
    let spine = new Spine('spine');
    this.addChild(spine);

    spine.x = this.stage.centerX;
    spine.y = this.stage.centerY + 150;

    spine.scale = 0.2;

    spine.play('run', true);
  }
}