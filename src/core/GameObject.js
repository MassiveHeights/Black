/**
 * Building block in Black Engine.
 *
 * @cat core
 * @unrestricted
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class GameObject extends MessageDispatcher {
  /**
   * Creates new instance of GameObject.
   */
  constructor() {
    super();

    /**
     * @private
     * @type {number}
     */
    this.mId = ++GameObject.ID;

    /**
     * @private
     * @type {string|null}
     */
    this.mName = null;

    /**
     * @private
     * @type {Array<Component>}
     */
    this.mComponents = [];

    /**
     * @private
     * @type {Array<GameObject>}
     */
    this.mChildren = [];

    /**
     * @private
     * @type {number}
     */
    this.mX = 0;

    /**
     * @private
     * @type {number}
     */
    this.mY = 0;

    /**
     * @private
     * @type {number}
     */
    this.mScaleX = 1;

    /**
     * @private
     * @type {number}
     */
    this.mScaleY = 1;

    /**
     * @private
     * @type {number}
     */
    this.mPivotX = 0;

    /**
     * @private
     * @type {number}
     */
    this.mPivotY = 0;

    /**
     * @private
     * @type {number}
     */
    this.mRotation = 0;

    /**
     * @private
     * @type {Rectangle}
     */
    this.mBounds = new Rectangle();

    /**
     * @private
     * @type {Matrix}
     */
    this.mLocalTransform = new Matrix();

    /**
     * @private
     * @type {Matrix}
     */
    this.mWorldTransform = new Matrix();

    /**
     * @private
     * @type {Matrix}
     */
    this.mWorldTransformInversed = new Matrix();

    /**
     * @private
     * @type {Matrix}
     */
    this.mFinalTransform = new Matrix();

    /**
     * @private
     * @type {DirtyFlag}
     */
    this.mDirty = DirtyFlag.DIRTY;

    /**
     * @private
     * @type {GameObject}
     */
    this.mParent = null;

    /**
     * @private
     * @type {string|null}
     */
    this.mTag = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mAdded = false;

    /**
     * @private
     * @type {number}
     */
    this.mNumChildrenRemoved = 0;

    /**
     * @private
     * @type {number}
     */
    this.mNumComponentsRemoved = 0;

    /**
     * @private
     * @type {number}
     */
    this.mDirtyFrameNum = 0;

    /**
     * @private
     * @type {number}
     */
    this.mSuspendDirty = false;

    this.mSnapToPixels = false;

    this.mBaked = false;

    // cache all colliders for fast access
    this.mCollidersCache = [];
  }

  get baked() {
    return this.mBaked;
  }

  set baked(value) {
    // set all children baked
    this.mBaked = value;
  }

  get snapToPixels() {
    return this.mSnapToPixels;
  }

  set snapToPixels(value) {
    this.mSnapToPixels = value;
  }

  make(values) {
    // can be helpfull if there are many children
    this.mSuspendDirty = true;

    for (var property in values) {
      if (values.hasOwnProperty(property)) {
        this[property] = values[property];
      }
    }

    this.mSuspendDirty = false;
    this.setTransformDirty();

    return this;
  }

  /**
   * Returns unique object id.
   *
   * @returns {number}
   */
  get id() {
    return this.mId;
  }

  /**
   * Note: Make sure to apply all changes to this game object before checking for static.
   */
  checkStatic(includeChildren = true) {
    if (includeChildren === false)
      return this.mDirtyFrameNum < Black.frameNum - 1;

    let isDynamic = false;
    GameObject.forEach(this, x => {
      if (x.mDirtyFrameNum >= Black.frameNum - 1) {
        isDynamic = true;
        return true;
      }
    });

    return !isDynamic;
  }

  /**
   * This method called each time object added to stage.
   *
   * @public
   * @return {void}
   */
  onAdded() { }

  /**
   * Called when object is removed from stage.
   *
   * @public
   * @return {void}
   */
  onRemoved() { }

  /**
   * Sugar method for adding child GameObjects or Components in a simple manner.
   *
   * @param {...(GameObject|Component)} gameObjectsAndOrComponents A GameObject or Component to add.
   * @return {Array<GameObject|Component>} The passed GameObject or Component.
   */
  add(...gameObjectsAndOrComponents) {
    for (let i = 0; i < gameObjectsAndOrComponents.length; i++) {
      let gooc = gameObjectsAndOrComponents[i];

      if (gooc instanceof GameObject)
        this.addChild( /** @type {!GameObject} */(gooc));
      else
        this.addComponent( /** @type {!Component} */(gooc));
    }

    return this;
  }

  /**
   * Adds a child GameObject instance to this GameObject instance. The child is added to the top of all other children in this GameObject instance.
   *
   * @param  {GameObject} child The GameObject instance to add as a child of this GameObject instance.
   * @return {GameObject}
   */
  addChild(child) {
    return this.addChildAt(child, this.mChildren.length);
  }

  /**
   * Adds a child GameObject instance to this GameObject instance. The child is added to the top of all other children in this GameObject instance.
   *
   * @param  {GameObject} child The GameObject instance to add as a child of this GameObject instance.
   * @param  {number=} index = 0 The index position to which the child is added.
   * @return {GameObject} The GameObject instance that you pass in the child parameter.
   */
  addChildAt(child, index = 0) {
    let numChildren = this.mChildren.length;

    if (index < 0 || index > numChildren)
      throw new Error('Child index is out of bounds.');

    if (child.mParent === this)
      return this.setChildIndex(child, index);

    // this operation should be atomic. since __setParent can throw exception.
    this.mChildren.splice(index, 0, child);

    child.removeFromParent();
    child.__setParent(this);

    if (this.stage !== null)
      Black.instance.onChildrenAdded(child);

    return child;
  }

  /**
   * @protected
   * @ignore
   * @param {GameObject} value
   *
   * @return {boolean}
   */
  __setParent(value) {
    let p = value;

    while (p !== null && p !== this)
      p = p.mParent;

    if (p === this)
      throw new Error('Object cannot be a child to itself.');

    this.mParent = value;
    this.setTransformDirty();
    return true;
  }

  /**
   * Sets the index (layer) of the specified GameObject to the specified index (layer).
   *
   * @param {GameObject} child The GameObject instance to change index for.
   * @param {number} index Desired index.
   *
   * @returns {GameObject} The GameObject instance that you pass in the child parameter.
   */
  setChildIndex(child, index) {
    let ix = this.mChildren.indexOf(child);

    if (ix < 0)
      throw new Error('Given child element was not found in children list.');

    if (ix === index)
      return child;

    // NOTE: systems needs to know when trees changes
    this.mChildren.splice(ix, 1);
    this.mChildren.splice(index, 0, child);

    if (this.stage !== null)
      Black.instance.onChildrenChanged(child);

    this.setTransformDirty();

    return child;
  }

  /**
   * Removes this GameObject instance from its parent.
   *
   * @return {void}
   */
  removeFromParent() {
    if (this.mParent !== null)
      this.mParent.removeChild(this);

    this.setTransformDirty();
  }

  /**
   * Removes specified child GameObject instance from children.
   *
   * @param {GameObject} child GameObject instance to remove.
   *
   * @return {GameObject} The GameObject instance that you pass in the child parameter.
   */
  removeChild(child) {
    let ix = this.mChildren.indexOf(child);

    if (ix < 0)
      return null;

    return this.removeChildAt(ix);
  }


  /**
   * Finds children by name.
   *
   * @param {string} name Name of the child object to find.
   *
   * @return {GameObject|null} GameObject instance of null if not found.
   */
  getChildByName(name) {
    for (var i = 0; i < this.mChildren.length; i++) {
      if (this.mChildren[i].name === name)
        return this.mChildren[i];
    }

    return null;
  }

  /**
   * Removes GameObjects instance from specified index.
   *
   * @param {number} index Description
   *
   * @return {GameObject} The removed GameObject instance.
   */
  removeChildAt(index) {
    if (index < 0 || index > this.numChildren)
      throw new Error('Child index is out of bounds.');

    let hadRoot = this.stage !== null;

    let child = this.mChildren[index];
    child.__setParent(null);

    this.mChildren.splice(index, 1);

    if (hadRoot)
      Black.instance.onChildrenRemoved(child);

    this.setTransformDirty();

    this.mNumChildrenRemoved++;

    return child;
  }

  /**
   * Returns GameObject at specified index.
   *
   * @param {number} index The index of child GameObject.
   *
   * @return {GameObject} The GameObject at specified index.
   */
  getChildAt(index) {
    return this.mChildren[index];
  }

  /**
   * Adds Component instance to the end of the list,
   *
   * @param  {Component} component Component instance or instances.
   * @return {Component} The Component instance you pass in the instances parameter.
   */
  addComponent(component) {
    let instance = component;

    if (instance.gameObject)
      throw new Error('Component cannot be added to two game objects at the same time.');

    this.mComponents.push(instance);
    instance.mGameObject = this;

    if (instance instanceof Collider)
      this.mCollidersCache.push(instance);

    if (this.stage !== null)
      Black.instance.onComponentAdded(this, instance);

    return instance;
  }

  /**
   * Remove specified component.
   *
   * @param {Component} instance The component instance.
   *
   * @return {Component|null}
   */
  removeComponent(instance) {
    if (!instance)
      return null;

    let index = this.mComponents.indexOf(instance);
    if (index > -1)
      this.mComponents.splice(index, 1);

    // detach game object after or before?
    instance.mGameObject = null;

    if (instance instanceof Collider) {
      let index = this.mCollidersCache.indexOf(instance);
      if (index > -1)
        this.mCollidersCache.splice(index, 1);
    }

    if (this.stage !== null)
      Black.instance.onComponentRemoved(this, instance);

    this.mNumComponentsRemoved++;

    return instance;
  }

  /**
   * Get component by type.
   *
   * @param {Object} typeName The component type.
   *
   * @return {Component|null} The Component instance or null if not found.
   */
  getComponent(typeName) {
    for (let i = 0; i < this.mComponents.length; i++) {
      let c = this.mComponents[i];
      if (c instanceof typeName)
        return c;
    }

    return null;
  }

  /**
   * Returns number of component's of this GameObject.
   *
   * @return {number}
   */
  get numComponenets() {
    return this.mComponents.length;
  }

  /**
   * Retrives Component at given index.
   *
   * @param {number} index
   *
   * @return {Component|null}
   */
  getComponentAt(index) {
    if (index >= 0 && index < this.mComponents.length)
      return this.mComponents[index];

    return null;
  }

  /**
   * Retun local transformation Matrix
   *
   * @return {Matrix}
   */
  get localTransformation() {
    if (this.mDirty & DirtyFlag.LOCAL) {
      this.mDirty ^= DirtyFlag.LOCAL;

      if (this.mRotation === 0) {
        let tx = this.mX - this.mPivotX * this.mScaleX;
        let ty = this.mY - this.mPivotY * this.mScaleY;
        return this.mLocalTransform.set(this.mScaleX, 0, 0, this.mScaleY, tx, ty);
      } else {
        let cos = Math.cos(this.mRotation);
        let sin = Math.sin(this.mRotation);
        let a = this.mScaleX * cos;
        let b = this.mScaleX * sin;
        let c = this.mScaleY * -sin;
        let d = this.mScaleY * cos;
        let tx = this.mX - this.mPivotX * a - this.mPivotY * c;
        let ty = this.mY - this.mPivotX * b - this.mPivotY * d;
        return this.mLocalTransform.set(a, b, c, d, tx, ty);
      }
    }

    return this.mLocalTransform;
  }

  /**
   * Returns cloned Matrix object which represents object orientation in world space.
   *
   * @return {Matrix}
   */
  get worldTransformation() {
    if (this.mDirty & DirtyFlag.WORLD) {
      this.mDirty ^= DirtyFlag.WORLD;

      if (this.mParent !== null && (this.mParent instanceof Stage) === false)
        this.mParent.worldTransformation.copyTo(this.mWorldTransform).append(this.localTransformation);
      else
        this.localTransformation.copyTo(this.mWorldTransform);
    }

    return this.mWorldTransform;
  }

  get finalTransformation() {
    if (this.stage == null)
      return this.worldTransformation;

    if (this.mDirty & DirtyFlag.FINAL) {
      this.mDirty ^= DirtyFlag.FINAL;

      this.mFinalTransform = this.stage.stageTransformation.clone();
      this.mFinalTransform.append(this.worldTransformation);
    }

    return this.mFinalTransform;
  }

  /**
   * @ignore
   * @param {Matrix} value
   *
   * @return {void}
   */
  set worldTransformation(value) {
    const PI_Q = Math.PI / 4.0;

    let a = value.data[0];
    let b = value.data[1];
    let c = value.data[2];
    let d = value.data[3];
    let tx = value.data[4];
    let ty = value.data[5];

    this.mPivotX = this.mPivotX = 0;
    this.mX = tx;
    this.mY = ty;

    let skewX = Math.atan(-c / d);
    let skewY = Math.atan(b / a);

    if (skewX != skewX)
      skewX = 0.0;
    if (skewY != skewY)
      skewY = 0.0;

    this.mScaleY = (skewX > -PI_Q && skewX < PI_Q) ? d / Math.cos(skewX) : -c / Math.sin(skewX);
    this.mScaleX = (skewY > -PI_Q && skewY < PI_Q) ? a / Math.cos(skewY) : b / Math.sin(skewY);

    if (MathEx.equals(skewX, skewY)) {
      this.mRotation = skewX;
      skewX = skewY = 0;
    } else {
      this.mRotation = 0;
    }

    this.setTransformDirty();
  }

  /**
   * Returns cloned and inversed Matrix object which represents object orientation in world space
   *
   * @return {Matrix}
   */
  get worldTransformationInversed() {
    if ((this.mDirty & DirtyFlag.WORLD_INV)) {
      this.mDirty ^= DirtyFlag.WORLD_INV;

      this.worldTransformation.copyTo(this.mWorldTransformInversed).invert();
    }

    return this.mWorldTransformInversed;
  }

  /**
   * @ignore
   * @param {number} dt
   *
   * @return {void}
   */
  __fixedUpdate(dt) {
    this.onFixedUpdate(dt);

    for (let k = 0; k < this.mComponents.length; k++) {
      let c = this.mComponents[k];
      c.mGameObject = this;
      c.onFixedUpdate(dt);

      if (this.__checkRemovedComponents(k))
        break;
    }

    for (let i = 0; i < this.mChildren.length; i++) {
      this.mChildren[i].__fixedUpdate(dt);

      if (this.__checkRemovedChildren(i))
        break;
    }
  }

  /**
   * @ignore
   * @param {number} dt time since the last frame
   *
   * @return {void}
   */
  __update(dt) {
    this.onUpdate(dt);

    for (let k = 0; k < this.mComponents.length; k++) {
      let c = this.mComponents[k];
      c.mGameObject = this;
      c.onUpdate(dt);

      if (this.__checkRemovedComponents(k))
        break;
    }

    for (let i = 0; i < this.mChildren.length; i++) {
      this.mChildren[i].__update(dt);

      if (this.__checkRemovedChildren(i))
        break;
    }
  }

  /**
   * @ignore
   * @param {number} dt time since the last frame
   *
   * @return {void}
   */
  __postUpdate(dt) {
    this.onPostUpdate(dt);

    for (let k = 0; k < this.mComponents.length; k++) {
      let c = this.mComponents[k];
      c.mGameObject = this;
      c.onPostUpdate(dt);

      if (this.__checkRemovedComponents(k))
        break;
    }

    for (let i = 0; i < this.mChildren.length; i++) {
      this.mChildren[i].__postUpdate(dt);

      if (this.__checkRemovedChildren(i))
        break;
    }
  }

  __checkRemovedComponents(i) {
    if (this.mComponents == 0)
      return false;

    i -= this.mNumComponentsRemoved;
    this.mNumComponentsRemoved = 0;

    if (i < 0)
      return true;

    return false;
  }

  __checkRemovedChildren(i) {
    if (this.mNumChildrenRemoved == 0)
      return false;

    i -= this.mNumChildrenRemoved;
    this.mNumChildrenRemoved = 0;

    if (i < 0)
      return true;

    return false;
  }

  /**
   * Called at every fixed frame update.
   *
   * @public
   * @param {number} dt time since the last frame
   *
   * @return {void}
   */
  onFixedUpdate(dt) { }

  /**
   * Called at every engine update.
   *
   * @public
   * @param {number} dt time since the last frame
   *
   * @return {void}
   */
  onUpdate(dt) { }

  /**
   * Called after all updates have been executed.
   *
   * @public
   * @param {number} dt Description
   *
   * @return {void}
   */
  onPostUpdate(dt) { }

  /**
   * @protected
   * @param {VideoNullDriver} driver
   * @param {Renderer} parentRenderer
   *
   * @return {void}
   */
  onRender(driver, parentRenderer) { }

  /**
   * Override this method if you need to specify GameObject size. Should be always be a local coordinates.
   *
   * @protected
   * @param {Rectangle=} outRect Description
   *
   * @return {Rectangle} bounds in local space withoout taking care about transformation matrix
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();
    return outRect.set(0, 0, 0, 0);
  }

  /**
   * Returns world bounds of this object and all children if specified (true by default).
   *
   * object.getBounds() - relative to parent (default).
   * object.getBounds(object) - local bounds.
   * object.getBounds(object.parent) - relative to parent.
   * object.getBounds(objectB) - relative to objectB space.
   *
   * @param {GameObject} [space=null]
   * @param {boolean} [includeChildren=true]
   * @param {Rectangle=} [outRect=null]
   *
   * @return {Rectangle} returns bounds of the object and all childrens
   */
  getBounds(space = null, includeChildren = true, outRect = undefined) {
    outRect = outRect || new Rectangle();

    let matrix = Matrix.get();
    matrix.copyFrom(this.worldTransformation);

    if (space == null)
      space = this.mParent;

    if (space != null)
      matrix.prepend(space.worldTransformationInversed);

    this.onGetLocalBounds(outRect);

    matrix.transformRect(outRect, outRect);
    Matrix.free(matrix); // recycle

    let childBounds = new Rectangle();

    if (includeChildren) {
      for (let i = 0; i < this.mChildren.length; i++) {
        this.mChildren[i].getBounds(space, includeChildren, childBounds);
        outRect.expand(childBounds.x, childBounds.y, childBounds.width, childBounds.height);
      }
    }

    return outRect;
  }

  /**
   * Returns local bounds of this object (without children).
   */
  get localBounds() {
    return this.getBounds(this, false);
  }

  /**
   * Returns parent-relative bounds (including children).
   */
  get bounds() {
    return this.getBounds(this.mParent, true);
  }

  /**
   * Sets the object transform in one line.
   *
   * @param {number} [x=0]       Cord X.
   * @param {number} [y=0]       Cord Y.
   * @param {number} [r=0]       Rotation.
   * @param {number} [scaleX=1]  scale X.
   * @param {number} [scaleY=1]  scale Y.
   * @param {number} [anchorX=0] Anchor X.
   * @param {number} [anchorY=0] Anchor Y.
   * @param {boolean} [includeChildren=true] Include children when adjusting pivot?
   *
   * @return {GameObject} This.
   */
  setTransform(x = 0, y = 0, r = 0, scaleX = 1, scaleY = 1, anchorX = 0, anchorY = 0, includeChildren = true) {
    this.mX = x;
    this.mY = y;
    this.mRotation = r;
    this.mScaleX = scaleX;
    this.mScaleY = scaleY;

    this.getBounds(this.mParent, includeChildren, Rectangle.__cache.zero());
    this.mPivotX = Rectangle.__cache.width * anchorX;
    this.mPivotY = Rectangle.__cache.height * anchorY;

    this.setTransformDirty();
    return this;
  }

  /**
   * Calculate global position of the object.
   *
   * @param {Vector} localPoint
   * @param {Vector|null} [outVector=null]
   *
   * @return {Vector}
   */
  localToGlobal(localPoint, outVector = null) {
    return this.worldTransformation.transformVector(localPoint, outVector);
  }

  /**
   * Calculate local position of the object
   *
   * @param {Vector} globalPoint
   * @param {Vector|null} [outVector=null]
   *
   * @return {Vector}
   */
  globalToLocal(globalPoint, outVector = null) {
    return this.worldTransformationInversed.transformVector(globalPoint, outVector);
  }
  /**
   * Gets/Sets count of children elements.
   *
   * @return {number}
   */
  get numChildren() {
    return this.mChildren.length;
  }

  /**
   * Returns name of this GameoObject instance.
   *
   * @return {string|null}
   */
  get name() {
    return this.mName;
  }

  /**
   * @ignore
   * @param {string|null} value Description
   *
   * @return {void}
   */
  set name(value) {
    this.mName = value;
  }

  /**
   * Gets/Sets the x coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
   *
   * @return {number}
   */
  get x() {
    return this.mX;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set x(value) {
    if (this.mX == value)
      return;

    this.mX = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the y coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
   *
   * @return {number}
   */
  get y() {
    return this.mY;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set y(value) {
    if (this.mY == value)
      return;

    this.mY = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the x coordinate of the object's origin in its local space.
   *
   * @return {number}
   */
  get pivotX() {
    return this.mPivotX;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set pivotX(value) {
    if (this.mPivotX == value)
      return;

    this.mPivotX = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the y coordinate of the object's origin in its local space.
   *
   * @return {number}
   */
  get pivotY() {
    return this.mPivotY;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set pivotY(value) {
    if (this.mPivotY == value)
      return;

    this.mPivotY = value;
    this.setTransformDirty();
  }

  get anchorX() {
    this.getBounds(this, true, Rectangle.__cache.zero());
    return this.mPivotX / Rectangle.__cache.width;
  }

  set anchorX(value) {
    this.getBounds(this, true, Rectangle.__cache.zero());

    this.mPivotX = (Rectangle.__cache.width * value);
    this.setTransformDirty();
  }

  get anchorY() {
    this.getBounds(this, true, Rectangle.__cache.zero());
    return this.mPivotX / Rectangle.__cache.width;
  }

  set anchorY(value) {
    this.getBounds(this, true, Rectangle.__cache.zero());

    this.mPivotY = (Rectangle.__cache.height * value);
    this.setTransformDirty();
  }

  /**
   * Sets pivot point to given position.
   *
   * @param {number}  [ax=0.5]               Align along x-axis.
   * @param {number}  [ay=0.5]               Align along y-axis.
   * @param {boolean} [includeChildren=true] Include children elements when
   * calculating bounds?
   *
   * @return {GameObject} This.
   */
  alignPivot(ax = 0.5, ay = 0.5, includeChildren = true) {
    this.getBounds(this, includeChildren, Rectangle.__cache.zero());

    this.mPivotX = (Rectangle.__cache.width * ax);
    this.mPivotY = (Rectangle.__cache.height * ay);
    this.setTransformDirty();

    return this;
  }

  /**
   * Gets/Sets the scale factor of this object along x-axis.
   *
   * @return {number}
   */
  get scaleX() {
    return this.mScaleX;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set scaleX(value) {
    if (this.mScaleX == value)
      return;

    this.mScaleX = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the scale factor of this object along y-axis.
   *
   * @return {number} Description
   */
  get scaleY() {
    return this.mScaleY;
  }

  /**
   * @ignore
   * @param {number} value Description
   *
   * @return {void}
   */
  set scaleY(value) {
    if (this.mScaleY == value)
      return;

    this.mScaleY = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets rotation in radians.
   *
   * @return {number}
   */
  get rotation() {
    return this.mRotation;
  }

  /**
   * @ignore
   * @param {number} value Description
   *
   * @return {void}
   */
  set rotation(value) {
    if (this.mRotation == value)
      return;

    this.mRotation = value;
    this.setTransformDirty();
  }

  /**
   * Returns this GameObject parent GameObject.
   * @readonly
   *
   * @return {GameObject}
   */
  get parent() {
    return this.mParent;
  }

  get __root() {
    let current = this;

    while (current.mParent != null)
      current = current.mParent;

    return current;
  }

  /**
   * Returns the stage Game Object to which this game object belongs to. Shortcut for `Black.instance.stage`.
   */
  get stage() {
    let r = this.__root;
    if (r instanceof Stage)
      return r;

    return null;
  }

  /**
   * Gets/sets the width of this object.
   *
   * @return {number}
   */
  get width() {
    return this.getBounds(this.mParent).width;
  }

  /**
   * @ignore
   *
   * @param {number} value
   *
   * @return {void}
   */
  set width(value) {
    this.scaleX = 1;
    const currentWidth = this.width;

    if (currentWidth != 0.0)
      this.scaleX = value / currentWidth;
  }

  /**
   * Gets/sets the height of this object.
   *
   * @return {number}
   */
  get height() {
    return this.getBounds(this.mParent).height;
  }

  /**
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set height(value) {
    this.scaleY = 1;
    const currentHeight = this.height;

    if (currentHeight != 0)
      this.scaleY = value / currentHeight;
  }


  /**
   * Returns width of this GameObject in local space without including children
   * elements.
   *
   * @readonly
   *
   * @return {number}
   */
  get localWidth() {
    return this.getBounds(this, false).width;
  }


  /**
   * Returns height of this GameObject in local space without including children
   * elements.
   *
   * @readonly
   *
   * @return {number}
   */
  get localHeight() {
    return this.getBounds(this, false).height;
  }

  // TODO: precache
  /**
   * Returns string representing a url like path to this object in the display
   * tree.
   *
   * @readonly
   *
   * @return {string|null}
   */
  get path() {
    if (this.mParent !== null)
      return this.mParent.path + '/' + this.mName;

    return this.mName;
  }

  /**
   * Gets/Sets tag of this GameObject.
   *
   * @return {string|null}
   */
  get tag() {
    return this.mTag;
  }

  /**
   * @ignore
   *
   * @param {string|null} value
   *
   * @return {void}
   */
  set tag(value) {
    if (this.mTag === value)
      return;

    /** @type {string|null} */
    let old = this.mTag;
    this.mTag = value;

    if (this.mAdded)
      Black.instance.onTagUpdated(this, old, value);
  }

  /**
   * Starts coroutine.
   *
   * @param {Function} gen  Generator function.
   * @param {*=} [ctx=null] Context for Generator function.
   *
   * @return {Generator}
   */
  spawn(gen, ctx = null) {
    var iter = gen.apply(ctx == null ? this : ctx);

    function step(it) {
      if (it.done)
        return;

      if (typeof it.value === 'function')
        it.value(x => step(iter.next(x)));
      else
        step(iter.next(it.value));
    }

    step(iter.next());
    return iter;
  }

  /**
   * Waits for given amount of seconds before processing.
   *
   * @return {function(*):*}
   */
  wait(seconds = 1) {
    return cb => setTimeout(cb.bind(this, seconds * 1000), seconds * 1000);
  }

  /**
   * Waits for a speceific message.
   *
   * @param {string} message The name of the message to wait for.
   *
   * @return {function(*):*}
   */
  waitMessage(message) {
    return cb => this.on(message, cb.bind(this));
  }

  /**
   * Marks this GameObject and/or its children elements as dirty.
   *
   * @param {DirtyFlag} flag                 The flag or flag bit mask.
   * @param {boolean} [includeChildren=true] Description
   *
   * @return {void}
   */
  setDirty(flag, includeChildren = true) {
    if (includeChildren) {
      GameObject.forEach(this, x => {
        x.mDirty |= flag;
        x.mDirtyFrameNum = Black.__frameNum;
      });
    } else {
      this.mDirty |= flag;
      this.mDirtyFrameNum = Black.__frameNum;
    }
  }

  /**
   * Marks this GameObject as Local dirty and all children elements as World
   * dirty.
   *
   * @returns {void}
   */
  setTransformDirty() {
    if (this.mSuspendDirty === true)
      return;

    this.setDirty(DirtyFlag.LOCAL | DirtyFlag.BOUNDS, false);
    this.setDirty(GameObject.WIFRB, true);
  }

  setRenderDirty() {
    if (this.mSuspendDirty === true)
      return;

    this.setDirty(DirtyFlag.RENDER, true);
  }

  set touchable(value) {
    let c = this.getComponent(InputComponent);

    if (value === true) {
      if (c === null)
        this.addComponent(new InputComponent());
      else
        c.touchable = true;
    } else {
      if (c !== null)
        this.removeComponent(c);
    }
  }

  get touchable() {
    let c = this.getComponent(InputComponent);
    return c !== null && c.touchable === true;
  }

  // TODO: rename method
  /**
   * @ignore
   *
   * @param {Array<number>} points
   * @param {Matrix} worldTransformation
   * @param {Rectangle=} outRect
   *
   * @return {Rectangle}
   */
  static getBoundsWithPoints(points, worldTransformation, outRect) {
    outRect = outRect || new Rectangle();

    let minX = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    let xx = 0;
    let yy = 0;
    let tmpVector = new Vector();

    for (let i = 0; i < points.length; i += 2) {
      worldTransformation.transformXY(points[i], points[i + 1], tmpVector);

      if (minX > tmpVector.x)
        minX = tmpVector.x;

      if (maxX < tmpVector.x)
        maxX = tmpVector.x;

      if (minY > tmpVector.y)
        minY = tmpVector.y;

      if (maxY < tmpVector.y)
        maxY = tmpVector.y;
    }

    outRect.set(minX, minY, maxX - minX, maxY - minY);
    return outRect;
  }

  /**
   * Returns whenever a given GameObject intersects with a point.
   *
   * @param {GameObject} gameObject GameObject to test.
   * @param {Vector} point          A point to test.
   *
   * @return {boolean} True if intersects.
   */
  static intersects(gameObject, point) {
    let tmpVector = new Vector();
    let inv = gameObject.worldTransformationInversed;

    inv.transformVector(point, tmpVector);

    return gameObject.localBounds.containsXY(tmpVector.x, tmpVector.y);
  }

  /**
   * Returns a point where intersection were made in local space.
   *
   * @param {GameObject} gameObject GameObject to test intersection with.
   * @param {Vector}     point      The point to test.
   * @param {Vector=}    outVector  If passed point of intersection will be
   * stored in it.
   *
   * @return {boolean} True if intersects.
   */
  static intersectsAt(gameObject, point, outVector = undefined) {
    outVector = outVector || new Vector();

    let tmpVector = Vector.__cache;
    let inv = gameObject.worldTransformationInversed;

    inv.transformVector(point, tmpVector);

    let contains = gameObject.localBounds.containsXY(tmpVector.x, tmpVector.y);

    if (!contains)
      return false;

    outVector.x = tmpVector.x - rect.x;
    outVector.y = tmpVector.y - rect.y;
    return true;
  }

  hitTest(point) {
    let c = this.getComponent(InputComponent);
    let touchable = c !== null && c.touchable;
    let insideMask = this.onHitTestMask(point);

    if (this.visible === false || touchable === false || insideMask === false)
      return null;

    var target = null;
    var numChildren = this.mChildren.length;

    for (var i = numChildren - 1; i >= 0; --i) {
      var child = this.mChildren[i];

      target = child.hitTest(point);

      if (target !== null)
        return target;
    }

    if (this.onHitTest(point) === true)
      return this;

    return null;
  }

  onHitTest(point) {
    let contains = false;

    let tmpVector = new Vector();
    this.worldTransformationInversed.transformVector(point, tmpVector);

    if (this.mCollidersCache.length > 0) {
      for (let i = 0; i < this.mCollidersCache.length; i++) {
        let collider = this.mCollidersCache[i];

        let matrix = this.worldTransformation;
        contains = collider.containsPoint(point);
        if (contains === true)
          return true;
      }
    } else {
      contains = this.localBounds.containsXY(tmpVector.x, tmpVector.y);
    }

    return contains;
  }

  onHitTestMask(point) {
    return true;
  }

  /**
   * Checks if GameObject or any of its children elements intersects the given
   * point.
   *
   * @param {GameObject} gameObject GameObject to test.
   * @param {Vector} point          Point to test.
   *
   * @return {GameObject|null} Intersecting object or null.
   */
  static intersectsWith(gameObject, point) {
    let obj = null;
    for (let i = gameObject.numChildren - 1; i >= 0; --i) {
      let child = gameObject.mChildren[i];

      obj = GameObject.intersectsWith(child, point);
      if (obj != null)
        return obj;

      let inside = GameObject.intersects(child, point);
      if (inside) {
        obj = child;
        break;
      }
    }

    if (obj === null && GameObject.intersects(gameObject, point))
      return gameObject;

    return null;
  }

  /**
   * Returns all GameObject with given tag.
   *
   * @param {string} tag Tag to find.
   *
   * @returns {Array<GameObject>|null} Array of GameObject or null if not found.
   */
  static findWithTag(tag) {
    if (Black.instance.mTagCache.hasOwnProperty(tag) === false)
      return null;

    return Black.instance.mTagCache[tag];
  }

  /**
   * Returns a list of Components.
   *
   * @param {GameObject} gameObject         GameObject to start search from.
   * @param {function (new:Component)} type Type of Component.
   *
   * @return {Array<Component>} Array of Component or empty array.
   */
  static findComponents(gameObject, type) {
    Debug.assert(gameObject !== null, 'gameObject cannot be null.');
    Debug.assert(type !== null, 'type cannot be null.');

    /** @type {Array<Component>} */
    let list = [];

    /** @type {function(GameObject, function(new:Component)):void} */
    let f = function (gameObject, type) {
      for (let i = 0; i < gameObject.mComponents.length; i++) {
        let c = gameObject.mComponents[i];
        if (c instanceof type)
          list.push(c);
      }

      for (let i = 0; i < gameObject.mChildren.length; i++)
        f(gameObject.mChildren[i], type);
    };

    f(gameObject, type);

    return list;
  }

  /**
   * Runs action accross all GameObjects.
   *
   * @param {GameObject} gameObject       GameObject to start iteration from.
   * @param {function(GameObject)} action The function to be executed on
   * every GameObject.
   *
   * @return {void}
   */
  static forEach(gameObject, action) {
    if (gameObject == null)
      gameObject = Black.instance.stage;

    let r = action(gameObject);
    if (r === true)
      return;

    for (let i = 0; i < gameObject.mChildren.length; i++) {
      r = GameObject.forEach(gameObject.mChildren[i], action);
      if (r === true)
        return;
    }

    return r;
  }


  /**
   * Finds object by its name. If node is not passed the root will be taken as
   * starting point.
   *
   * @param {string} name      Name to search.
   * @param {GameObject=} node Starting GameObject.
   *
   * @return {GameObject} GameObject or null.
   */
  static find(name, node) {
    if (node == null)
      node = Black.instance.stage;

    if (node.name === name)
      return node;

    for (let i = 0; i < node.numChildren; i++) {
      let r = GameObject.find(name, node.getChildAt(i));
      if (r != null)
        return r;
    }

    return null;
  }

  /**
   * Finds object by its id property. If node is not passed the root will be taken as
   * starting point.
   *
   * @param {number} id         Id to search.
   * @param {GameObject=} node  Starting GameObject or null.
   *
   * @return {GameObject} GameObject or null.
   */
  static findById(id, node) {
    if (node == null)
      node = Black.instance.stage;

    if (node.id === id)
      return node;

    for (let i = 0; i < node.numChildren; i++) {
      let r = GameObject.findById(id, node.getChildAt(i));
      if (r !== null)
        return r;
    }

    return null;
  }
}

/**
 * @private
 * @type {number}
 * @nocollapse
 */
GameObject.ID = 0;

/**
 * NOT USED
 * @private
 * @type {boolean}
 * @nocollapse
 */
GameObject.IS_ANY_DIRTY = true;

/**
 * @enum {number}
 */
/* @echo EXPORT */
var DirtyFlag = {
  CLEAN: 0,         // Object is 100% cached
  LOCAL: 1,         // Local transformation is dirty 
  WORLD: 2,         // World transformation is dirty 
  FINAL: 4,         // Final/Render transformation is dirty 
  WORLD_INV: 8,     // Final world inversed transformation is dirty 
  RENDER: 16,       // Object needs to be rendered 
  RENDER_CACHE: 32, // In case object renders to bitmap internally, bitmap needs to be updated
  REBAKE: 64,       // NOT USED: Baked object changed, parents will be notified
  BOUNDS: 128,      // Parent-relative bounds needs update
  DIRTY: 0xffffff   // Everything is dirty, you, me, everything!
};

GameObject.WIFRB = DirtyFlag.WORLD | DirtyFlag.WORLD_INV | DirtyFlag.FINAL | DirtyFlag.RENDER | DirtyFlag.BOUNDS;
