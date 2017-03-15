/* @echo EXPORT */
class AnimationController extends Component {
  constructor() {
    super();

    /** @type {Object<string, Animation>} */
    this.mAnimations = {};

    /** @type {Animation|null} */
    this.mCurrentAnim = null;
  }


  /**
   * get - Description
   *
   * @param {string} name Description
   *
   * @return {Animation} Description
   */
  get(name){
    Assert.is(this.mAnimations.hasOwnProperty(name), 'Animation must be set first.');

    return this.mAnimations[name];
  }


  /**
   * set - Description
   *
   * @param {string}    name        Description
   * @param {Array<Texture>}    textures    Description
   * @param {number}  [fps=14]    Description
   * @param {boolean} [loop=true] Description
   *
   * @return {Animation} Description
   */
  set(name, textures, fps = 14, loop = true) {
    Assert.is(textures.length > 0, 'Animation cannot be empty.');
    Assert.is(fps > 0, 'FPS must be greater than 0.');

    let anim = new Animation(this, name, textures, fps, loop);
    this.mAnimations[name] = anim;

    return anim;
  }


  /**
   * play - Description
   *
   * @param {string} name Description
   *
   * @return {void} Description
   */
  play(name) {
    Assert.is(this.mAnimations.hasOwnProperty(name), 'Animation must be set first.');

    this.mCurrentAnim = this.mAnimations[name];

    let texture = this.mCurrentAnim.play();

    let sprite = /** @type {Sprite} */ (this.gameObject);
    if (sprite === null)
      return;

    if (texture !== null)
      sprite.texture = texture;
  }


  /**
   * stop - Description
   *
   * @return {void} Description
   */
  stop() {
    if (this.mCurrentAnim === null)
      return;

    this.mCurrentAnim.stop();
  }


  /**
   * pause - Description
   *
   * @return {void} Description
   */
  pause() {
    if (this.mCurrentAnim === null)
      return;

    this.mCurrentAnim.pause();
  }


  /**
   * onPostUpdate - Description
   *
   * @override
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  onPostUpdate(dt) {
    if (this.mCurrentAnim === null)
      return;

    // TODO: replace with time.time
    let newTexture = this.mCurrentAnim.__update(dt, Black.instance.uptime);
    if (newTexture === null)
      return;

    let sprite = /** @type {Sprite} */ (this.gameObject);
    sprite.texture = newTexture;
  }


  /**
   * currentAnimation
   *
   * @return {Animation|null}
   */
  get currentAnimation() {
    return this.mCurrentAnim;
  }
}
