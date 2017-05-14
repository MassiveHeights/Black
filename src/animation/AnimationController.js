/**
 * A Component which allows to play sprite animations.
 *
 * @cat animation
 * @extends Component
 */
/* @echo EXPORT */
class AnimationController extends Component {
  /**
   * Creates an instance of AnimationController
   */
  constructor() {
    super();

    /**
     * @private
     * @type {Object<string, AnimationInfo>}
     */
    this.mAnimations = {};

    /**
     * @private
     * @type {AnimationInfo|null}
     */
    this.mCurrentAnim = null;
  }

  /**
   * Returns the Animation object that exists with the specified name.
   *
   * @param {string} name The name of the child to return.
   * @returns {Animation} Returns the Animation object that exists with the specified name.
   */
  getByName(name){
    Debug.assert(name !== null, 'Animation must be set first.');
    Debug.assert(this.mAnimations.hasOwnProperty(name), 'Animation must be set first.');

    return this.mAnimations[name];
  }

  /**
   * Removes Animation object that exists with the specified name. If animation is playing right now it will be stopped.
   *
   * @param {string} name The name of the animation to remove.
   * @returns {void}
   */
  remove(name) {
    Debug.assert(name !== null, 'Animation name shall not be null.');
    Debug.assert(this.mAnimations.hasOwnProperty(name) === true, 'Unable to find animation.');

    let anim = this.mAnimations[name];

    if (this.mCurrentAnim !== null && this.mCurrentAnim === anim) {
      this.stop();
      delete this.mAnimations[name];
    }

    this.mCurrentAnim = null;
  }

  /**
   * Add the Animation object into the list of animations. If animation with given name already exists exception will be thrown.
   *
   * @param {string}          name        The name of animation to update
   * @param {Array<Texture>}  textures    Array of Textures
   * @param {number}          [fps=14]    Frames Per Second
   * @param {boolean}         [loop=true] Indicated if animation should be started over at the end.
   *
   * @return {AnimationInfo} The newly created Animation Object.
   */
  add(name, textures, fps = 14, loop = true) {
    Debug.assert(textures.length > 0, 'Animation cannot be empty.');
    Debug.assert(fps > 0, 'FPS must be greater than 0.');
    Debug.assert(this.mAnimations.hasOwnProperty(name) == false, 'Animatation with same name alredy exists');

    let anim = new Animation(this, name, textures, fps, loop);
    this.mAnimations[name] = anim;

    return anim;
  }

  /**
   * Plays animation that exists with the specified name.
   *
   * @param {string} name The name of animation to play.
   * @return {void}
   */
  play(name) {
    Debug.assert(this.mAnimations.hasOwnProperty(name), 'Animation must be set first.');

    this.mCurrentAnim = this.mAnimations[name];

    let texture = this.mCurrentAnim.play();

    let sprite = /** @type {Sprite} */ (this.gameObject);
    if (sprite === null)
      return;

    if (texture !== null)
      sprite.texture = texture;
  }

  /**
   * Stops active animation. If no animations are playing at the moment nothing will happen.
   *
   * @return {void}
   */
  stop() {
    if (this.mCurrentAnim === null)
      return;

    this.mCurrentAnim.stop();
  }

  /**
   * Pauses active animation.
   * @return {void}
   */
  pause() {
    if (this.mCurrentAnim === null)
      return;

    this.mCurrentAnim.pause();
  }

  /**
   * @ignore
   * @override
   * @protected
   * @param  {number} dt
   * @return {void}
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
   * Returns current active animation.
   *
   * @returns {Animation|null}
   */
  get currentAnimation() {
    return this.mCurrentAnim;
  }
}
