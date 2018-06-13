/**
 * Building block in Black Engine.
 *
 * @cat core
 * @unrestricted
 * @export
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class GameObject extends MessageDispatcher {
  /**
   * Creates new instance of GameObject.
   */
  constructor() {
    super(true);

    /** @private @type {number} */
    this.mId = ++GameObject.ID;

    /** @private @type {string|null} */
    this.mName = null;

    /** @private @type {Array<Component>} */
    this.mComponents = [];

    /** @protected @type {Array<GameObject>} */
    this.mChildren = [];

    /** @private @type {number} */
    this.mX = 0;

    /** @private @type {number} */
    this.mY = 0;

    /** @private @type {number} */
    this.mScaleX = 1;

    /** @private @type {number} */
    this.mScaleY = 1;

    /** @protected @type {number} */
    this.mPivotX = 0;

    /** @protected @type {number} */
    this.mPivotY = 0;

    /** @protected @type {number} */
    this.mAnchorX = 0;

    /** @protected @type {number} */
    this.mAnchorY = 0;

    /** @protected @type {number} */
    this.mPivotOffsetX = 0;

    /** @protected @type {number} */
    this.mPivotOffsetY = 0;

    /** @protected @type {boolean} */
    this.mAnchorChanged = false;

    /** @private @type {number} */
    this.mRotation = 0;

    /** @protected @type {Rectangle} */
    this.mBoundsCache = new Rectangle();

    /** @private @type {Matrix} */
    this.mLocalTransform = new Matrix();

    /** @private @type {Matrix} */
    this.mWorldTransform = new Matrix();

    /** @private @type {Matrix} */
    this.mWorldTransformInversed = new Matrix();

    /** @private @type {DirtyFlag} */
    this.mDirty = DirtyFlag.DIRTY;

    /** @protected @type {GameObject} */
    this.mParent = null;

    /** @private @type {string|null} */
    this.mTag = null;

    /** @private @type {boolean} */
    this.mAdded = false;

    /** @private @type {number} */
    this.mNumChildrenRemoved = 0;

    /** @private @type {number} */
    this.mNumComponentsRemoved = 0;

    /** @private @type {number} */
    this.mDirtyFrameNum = 0;

    /** @private @type {boolean} */
    this.mSuspendDirty = false;

    /** @protected @type {boolean} */
    this.mSnapToPixels = false;

    // cache all colliders for fast access
    /** @private @type {Array<Collider>} */
    this.mCollidersCache = [];

    /** @private @type {boolean} */
    this.mChildOrComponentBeenAdded = false;

    /** @private @type {Array<GameObject>} */
    this.mChildrenClone = null;

    /** @private @type {Array<Component>} */
    this.mComponentClone = null;
  }

  make(values) {
    // can be helpful if there are many children
    this.mSuspendDirty = true;

    for (let property in values) {
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
   * Returns true if object was clean for at least 1 update.
   * 
   * Note: Make sure to apply all changes to this game object before checking for static.
   * 
   * @param {boolean} [includeChildren=true]
   * @returns {boolean}
   */
  checkStatic(includeChildren = true) {
    if (includeChildren === false)
      return this.mDirtyFrameNum < Black.frameNum;

    let isDynamic = false;
    GameObject.forEach(this, x => {
      if (x.mDirtyFrameNum >= Black.frameNum) {
        isDynamic = true;
        return true;
      }
    });

    return !isDynamic;
  }

  /**
   * This method called each time object added to stage.
   *
   * @return {void}
   */
  onAdded() { }

  /**
   * Called when object is removed from stage.
   *
   * @return {void}
   */
  onRemoved() { }

  /**
   * Sugar method for adding child `GameObjects` or `Components` in a simple manner.
   *
   * @param {...(GameObject|Component)} gameObjectsAndOrComponents A `GameObject` or `Component` to add.
   * @return {GameObject} This game object
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
   * Adds a child `GameObject` instance to this `GameObject` instance. The child is added to the top of all other 
   * children in this GameObject instance.
   *
   * @param  {GameObject} child The GameObject instance to add as a child of this GameObject instance.
   * @return {GameObject}
   */
  addChild(child) {
    return this.addChildAt(child, this.mChildren.length);
  }

  /**
   * Adds a child `GameObject` instance to this `GameObject` instance. The child is added to the top of all other 
   * children in this GameObject instance.
   *
   * @param  {GameObject} child The GameObject instance to add as a child of this GameObject instance.
   * @param  {number=} [index=0] The index position to which the child is added.
   * @return {GameObject} The GameObject instance that you pass in the child parameter.
   */
  addChildAt(child, index = 0) {
    Debug.assert(child instanceof GameObject, 'Type error.');

    let numChildren = this.mChildren.length;

    if (index < 0 || index > numChildren)
      throw new Error('Child index is out of bounds.');

    if (child.mParent === this)
      return this.setChildIndex(child, index);

    // this operation should be atomic. since __setParent can throw exception.
    this.mChildren.splice(index, 0, child);

    child.removeFromParent();
    child.__setParent(this);

    if (this.root instanceof Stage)
      Black.instance.onChildrenAdded(child);

    this.mChildOrComponentBeenAdded = true;

    return child;
  }

  /**
   * @private
   * @ignore
   * @param {GameObject} value
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
   * Sets the index (layer) of the specified `GameObject` to the specified index (layer).
   *
   * @param {GameObject} child The `GameObject` instance to change index for.
   * @param {number} index Desired index.
   * @returns {GameObject} The `GameObject` instance that you pass in the child parameter.
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
   * Removes this `GameObject` instance from its parent.
   *
   * @return {void}
   */
  removeFromParent() {
    if (this.mParent !== null)
      this.mParent.removeChild(this);

    this.setTransformDirty();
  }

  /**
   * Removes specified child `GameObject` instance from children.
   *
   * @param {GameObject} child `GameObject` instance to remove.
   * @return {GameObject} The `GameObject` instance that you pass in the child parameter.
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
   * @return {GameObject|null} GameObject instance or null if not found.
   */
  getChildByName(name) {
    for (let i = 0; i < this.mChildren.length; i++) {
      if (this.mChildren[i].name === name)
        return this.mChildren[i];
    }

    return null;
  }

  /**
   * Removes `GameObjects` instance from specified index.
   *
   * @param {number} index Index of child.
   * @return {GameObject} The removed `GameObject` instance.
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
   * Returns `GameObject` at specified index.
   *
   * @param {number} index The index of child `GameObject`.
   * @return {GameObject} The `GameObject` at specified index.
   */
  getChildAt(index) {
    return this.mChildren[index];
  }

  /**
   * Adds `Component` instance to the end of the list.
   *
   * @param  {Component} component `Component` instance or instances.
   * @return {Component} The `Component` instance you pass in the instances parameter.
   * @throws {Error}
   */
  addComponent(component) {
    Debug.assert(component instanceof Component, 'Type error.');

    let instance = component;

    if (instance.gameObject)
      throw new Error('Component cannot be added to two game objects at the same time.');

    this.mComponents.push(instance);
    instance.mGameObject = this;

    if (instance instanceof Collider)
      this.mCollidersCache.push(instance);

    if (this.stage !== null)
      Black.instance.onComponentAdded(this, instance);

    this.mChildOrComponentBeenAdded = true;

    return instance;
  }

  /**
   * Remove specified component.
   *
   * @param {Component} instance The `Component` instance.
   * @return {Component|null}
   */
  removeComponent(instance) {
    Debug.assert(instance instanceof Component, 'Type error.');

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
   * @param {Function} typeName The component type.
   * @return {Component|null} The `Component` instance or null if not found.
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
  get numComponents() {
    return this.mComponents.length;
  }

  /**
   * Retrieves `Component` at given index.
   *
   * @param {number} index Index of component.
   * @return {Component|null}
   */
  getComponentAt(index) {
    if (index >= 0 && index < this.mComponents.length)
      return this.mComponents[index];

    return null;
  }

  /**
   * Returns local transformation `Matrix`
   *
   * @readonly
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
   * Gets/Sets cloned Matrix object which represents object orientation in world space.
   *
   * @return {Matrix}
   */
  get worldTransformation() {
    if (this.mDirty & DirtyFlag.WORLD) {
      this.mDirty ^= DirtyFlag.WORLD;

      if (this.mParent !== null)
        this.mParent.worldTransformation.copyTo(this.mWorldTransform).append(this.localTransformation);
      else
        this.localTransformation.copyTo(this.mWorldTransform);
    }
    return this.mWorldTransform;
  }

  /**
   * @ignore
   * @param {Matrix} value
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
   * Returns cloned and inverted Matrix object which represents object orientation in world space
   *
   * @readonly
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
   * @private
   * @return {void}
   */
  __update() {
    this.onUpdate();

    if (this.mChildOrComponentBeenAdded === false)
      return;

    if (this.mComponents.length > 0) {
      this.mComponentClone = this.mComponents.slice();

      for (let k = 0; k < this.mComponentClone.length; k++) {
        if (this.mAdded === false)
          break;

        let c = this.mComponentClone[k];

        if (c.mAdded === false)
          break;

        c.onUpdate();
      }
    }

    if (this.mChildren.length > 0) {
      this.mChildrenClone = this.mChildren.slice();

      for (let i = 0; i < this.mChildrenClone.length; i++) {
        let child = this.mChildrenClone[i];

        if (child.mAdded === true)
          child.__update();
      }
    }
  }

   /**
   * @ignore
   * @private
   * @return {void}
   */
  __render() {
    this.onRender();

    if (this.mComponents.length > 0) {
      for (let k = 0; k < this.mComponents.length; k++) {
        if (this.mAdded === false)
          break;

        let c = this.mComponents[k];

        if (c.mAdded === false)
          break;

        c.onRender();
      }
    }

    if (this.mChildren.length > 0) {
      this.mChildrenClone = this.mChildren.slice();

      for (let i = 0; i < this.mChildrenClone.length; i++) {
        let child = this.mChildrenClone[i];

        if (child.mAdded === true)
          child.__render();
      }
    }
  }

  /**
   * Called at every engine update. The execution order of onFixedUpdate, onUpdate and onPostUpdate is
   * going from top to bottom of the display list.
   * 
   * @protected
   * @return {void}
   */
  onUpdate() { }

  /**
   * Called at the end of the loop, after `onCollectRenderables`. Should be used to interpolate between last and current
   * state. 
   * 
   * NOTE: Adding, removing or changing children elements inside onRender method can lead to unexpected behavior.
   * 
   * @protected
   * @return {void}
   */
  onRender() { }

  /**
   * Called every time `GameObject` has to be rendered. Doesn't render itself. Collects render data to be processed by 
   * video driver after. 
   * 
   * NOTE: Adding, removing or changing children elements inside onRender method can lead to unexpected behavior.
   *
   * @protected
   * @param {VideoNullDriver} driver Current registered video driver.
   * @param {Renderer} parentRenderer Renderer of parent `GameObject` if there is one.
   * @param {boolean=} [isBackBufferActive=false] Specifies if render to backBuffer.
   * @return {Renderer}
   */
  onCollectRenderables(driver, parentRenderer, isBackBufferActive = false) {
    return null;
  }

  /**
   * Override this method if you need to specify GameObject size. Should be always be a local coordinates.
   *
   * @protected
   * @param {Rectangle=} [outRect=undefined] Rectangle to be returned.
   * @return {Rectangle} bounds in local space without taking care about transformation matrix
   */
  onGetLocalBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();
    return outRect.set(0, 0, 0, 0);
  }

  /**
   * Returns world bounds of this object and all children if specified (true by default).
   * <br>
   * `object.getBounds()` - relative to parent (default).<br>
   * `object.getBounds(object)` - local bounds.<br>
   * `object.getBounds(object.parent)` - relative to parent.<br>
   * `object.getBounds(objectB)` - relative to objectB space.<br>
   *
   * @param {GameObject} [space=null] The `GameObject` relative to.
   * @param {boolean} [includeChildren=true] Specifies if include children in calculations.
   * @param {Rectangle=} [outRect=null] Rectangle to be returned.
   * @return {Rectangle} Returns bounds of the object with/without all children.
   */
  getBounds(space = null, includeChildren = true, outRect = undefined) {
    outRect = outRect || new Rectangle();

    this.onGetLocalBounds(outRect);

    if (space == null)
      space = this.mParent;

    if (space == this) {
      // local
    } else if (space == this.mParent) {
      if (includeChildren === false) {
        let matrix = Matrix.pool.get();
        matrix.copyFrom(this.localTransformation);
        matrix.transformRect(outRect, outRect);
        Matrix.pool.release(matrix);
      }
      else if (includeChildren === true && this.mDirty & DirtyFlag.BOUNDS) {
        let matrix = Matrix.pool.get();
        matrix.copyFrom(this.localTransformation);
        matrix.transformRect(outRect, outRect);
        Matrix.pool.release(matrix);
      } else {
        outRect.copyFrom(this.mBoundsCache);
        return outRect;
      }
    } else {
      let matrix = Matrix.pool.get();
      matrix.copyFrom(this.worldTransformation);
      matrix.prepend(space.worldTransformationInversed);
      matrix.transformRect(outRect, outRect);
      Matrix.pool.release(matrix);
    }

    if (includeChildren === true) {
      let childBounds = Rectangle.pool.get();

      for (let i = 0; i < this.mChildren.length; i++) {
        childBounds.zero();

        this.mChildren[i].getBounds(space, includeChildren, childBounds);
        outRect.union(childBounds);
      }

      Rectangle.pool.release(childBounds);

      if (space == this.mParent && this.mDirty & DirtyFlag.BOUNDS) {
        this.mBoundsCache.copyFrom(outRect);
        this.mDirty ^= DirtyFlag.BOUNDS;
      }
    }

    return outRect;
  }

  /**
   * Returns stage relative bounds of this object exluding it's children;
   * 
   * @param {Rectangle=} [outRect=null] Rectangle to be store resulting bounds in.
   * @returns {Rectangle} 
   */
  getStageBounds(outRect = undefined) {
    outRect = outRect || new Rectangle();

    this.onGetLocalBounds(outRect);

    let matrix = Matrix.pool.get();
    matrix.copyFrom(this.worldTransformation);
    matrix.prepend(this.stage.worldTransformationInversed); // 120ms
    matrix.transformRect(outRect, outRect); // 250ms
    Matrix.pool.release(matrix);

    return outRect;
  }

  /**
   * Evaluates whether the game object or one of its children intersects with the given point
   *
   * @param {Vector} localPoint Coordinates vector.
   * @return {GameObject|null}
   */
  hitTest(localPoint) {
    let c = this.getComponent(InputComponent);
    let touchable = c !== null && c.touchable;
    let insideMask = this.onHitTestMask(localPoint);

    if (touchable === false || insideMask === false)
      return null;

    let target = null;
    let numChildren = this.mChildren.length;

    for (let i = numChildren - 1; i >= 0; --i) {
      let child = this.mChildren[i];

      target = child.hitTest(localPoint);

      if (target !== null)
        return target;
    }

    if (this.onHitTest(localPoint) === true)
      return this;

    return null;
  }

  /**
   * @ignore
   * @protected
   * @param {Vector} localPoint 
   * @return {boolean}
   */
  onHitTest(localPoint) {
    let contains = false;

    // BEGINOF: WTF
    let tmpVector = /** @type {Vector}*/ (Vector.pool.get());
    this.worldTransformationInversed.transformVector(localPoint, tmpVector);
    // ENDOF: WTF

    if (this.mCollidersCache.length > 0) {
      for (let i = 0; i < this.mCollidersCache.length; i++) {
        let collider = this.mCollidersCache[i];

        contains = collider.containsPoint(tmpVector);
        if (contains === true)
          return true;
      }
    } else {
      contains = this.localBounds.containsXY(tmpVector.x, tmpVector.y);
    }

    Vector.pool.release(tmpVector);
    return contains;
  }

  /**
   * @ignore
   * @protected
   * @param {Vector} localPoint 
   * @return {boolean}
   */
  onHitTestMask(localPoint) {
    return true;
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
   * @param {number} [scaleX=1]  Scale X.
   * @param {number} [scaleY=1]  Scale Y.
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
    this.mAnchorX = anchorX;
    this.mAnchorY = anchorY;

    this.setTransformDirty();
    return this;
  }

  /**
   * Calculate global position of the object.
   *
   * @param {Vector} localPoint Coordinates vector.
   * @param {Vector|null} [outVector=null] Vector to be returned.
   * @return {Vector}
   */
  localToGlobal(localPoint, outVector = null) {
    return this.worldTransformation.transformVector(localPoint, outVector);
  }

  /**
   * Calculate local position of the object
   *
   * @param {Vector} globalPoint Coordinates vector.
   * @param {Vector|null} [outVector=null] Vector to be returned.
   * @return {Vector}
   */
  globalToLocal(globalPoint, outVector = null) {
    return this.worldTransformationInversed.transformVector(globalPoint, outVector);
  }
  /**
   * Gets a count of children elements.
   *
   * @return {number}
   */
  get numChildren() {
    return this.mChildren.length;
  }

  /**
   * Gets/Sets the name of this GameObject instance.
   *
   * @export
   * @return {string|null}
   */
  get name() {
    return this.mName;
  }

  /**
   * @export
   * @ignore
   * @param {string|null} value
   * @return {void}
   */
  set name(value) {
    this.mName = value;
  }

  /**
   * Gets/Sets the x coordinate of the GameObject instance relative to the local coordinates of the parent GameObject.
   * @export
   * @return {number}
   */
  get x() {
    return this.mX;
  }

  /**
   * @export
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set x(value) {
    if (this.mX == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mX = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the y coordinate of the GameObject instance relative to the local coordinates of the parent GameObject.
   *
   * @export
   * @return {number}
   */
  get y() {
    return this.mY;
  }

  /**
   * @export
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set y(value) {
    if (this.mY == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mY = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the x coordinate of the object's origin in its local space in pixels.
   *
   * @export
   * @return {number}
   */
  get pivotOffsetX() {
    return this.mPivotOffsetX;
  }

  /**
   * @export
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set pivotOffsetX(value) {
    if (this.mPivotOffsetX === value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.getBounds(this, true, Rectangle.__cache.zero());
    this.mPivotOffsetX = value;
    this.mPivotX = this.mPivotOffsetX + (Rectangle.__cache.width * this.mAnchorX) + Rectangle.__cache.x;

    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.LOCAL | DirtyFlag.BOUNDS), false);
    this.setDirty(DirtyFlag.WIRB, true);
    this.setParentDirty(DirtyFlag.BOUNDS);
  }

  /**
   * Gets/Sets the y coordinate of the object's origin in its local space in pixels.
   *
   * @export
   * @return {number}
   */
  get pivotOffsetY() {
    return this.mPivotOffsetY;
  }

  /**
   * @export
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set pivotOffsetY(value) {
    if (this.mPivotOffsetY === value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.getBounds(this, true, Rectangle.__cache.zero());
    this.mPivotOffsetY = value;
    this.mPivotY = this.mPivotOffsetY + (Rectangle.__cache.height * this.mAnchorY) + Rectangle.__cache.y;

    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.LOCAL | DirtyFlag.BOUNDS), false);
    this.setDirty(DirtyFlag.WIRB, true);
    this.setParentDirty(DirtyFlag.BOUNDS);
  }

  /**
   * @export
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set anchorX(value) {
    if (this.mAnchorX === value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mAnchorX = value;
    this.mAnchorChanged = true;

    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.LOCAL | DirtyFlag.BOUNDS), false);
    this.setDirty(DirtyFlag.WIRB, true);
    this.setParentDirty(DirtyFlag.BOUNDS);
  }

  /**
   * @export
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set anchorY(value) {
    if (this.mAnchorY === value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mAnchorY = value;
    this.mAnchorChanged = true;

    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.LOCAL | DirtyFlag.BOUNDS), false);
    this.setDirty(DirtyFlag.WIRB, true);
    this.setParentDirty(DirtyFlag.BOUNDS);
  }

  /**
   * Returns current anchor-x value in range from 0 to 1.
   * 
   * @export
   * @returns {number}
   */
  get anchorX() {
    return this.mAnchorX;
  }

  /**
   * Returns current anchor-y value in range from 0 to 1.
   * 
   * @export
   * @returns {number}
   */
  get anchorY() {
    return this.mAnchorY;
  }

  /**
   * Returns current pivot-x value in range from 0 to 1.
   * 
   * @returns {number}
   */
  get pivotX() {
    return this.mPivotX;
  }

  /**
   * Returns current pivot-y value in range from 0 to 1.
   * 
   * @returns {number}
   */
  get pivotY() {
    return this.mPivotY;
  }

  /**
   * Sets the origin point relatively to its bounds. For example, setting x and y value to 0.5 will set origin to the 
   * center of the object.
   *
   * @param {number}  [ax=0.5]               Align along x-axis.
   * @param {number}  [ay=0.5]               Align along y-axis.
   *
   * @return {GameObject} This.
   */
  alignAnchor(ax = 0.5, ay = 0.5) {
    Debug.isNumber(ax, ay);

    this.mAnchorX = ax;
    this.anchorY = ay;

    return this;
  }

  /**
   * Sets anchor point to given position. 
   *
   * @param {number}  [ax=0.5]               Align along x-axis.
   * @param {number}  [ay=0.5]               Align along y-axis.
   * @deprecated
   * @return {GameObject} This.
   */
  alignPivot(ax = 0.5, ay = 0.5) {
    return this.alignPivotOffset(ax, ay);
  }

  /**
   * Sets the origin point offset from current anchor value. For example, setting anchor-x value to 0.5 and pivotOffsetX
   * to 10 will center object by x-axis and will shift object to the left by 10 pixels from half of the width.
   *
   * @param {number}  [ax=0.5]               Align along x-axis.
   * @param {number}  [ay=0.5]               Align along y-axis.
   * @param {boolean} [includeChildren=true] Include children elements when calculating bounds?
   *
   * @return {GameObject} This.
   */
  alignPivotOffset(ax = 0.5, ay = 0.5, includeChildren = true) {
    Debug.isNumber(ax, ay);

    this.getBounds(this, includeChildren, Rectangle.__cache.zero());

    this.mPivotOffsetX = (Rectangle.__cache.width * ax);
    this.mPivotOffsetY = (Rectangle.__cache.height * ay);

    this.mPivotX = this.mPivotOffsetX + (Rectangle.__cache.width * this.mAnchorX) + Rectangle.__cache.x;
    this.mPivotY = this.mPivotOffsetY + (Rectangle.__cache.height * this.mAnchorY) + Rectangle.__cache.y;

    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.LOCAL | DirtyFlag.BOUNDS), false);
    this.setDirty(DirtyFlag.WIRB, true);
    this.setParentDirty(DirtyFlag.BOUNDS);

    return this;
  }

  /**
   * Gets/Sets the scale factor of this object along x-axis.
   *
   * @export
   * @return {number}
   */
  get scaleX() {
    return this.mScaleX;
  }

  /**
   * @export
   * @ignore
   * @param {number} value
   *
   * @return {void}
   */
  set scaleX(value) {
    if (this.mScaleX == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mScaleX = value;
    this.setTransformDirty();
  }

  /**
   * Gets/sets both `scaleX` and `scaleY`. Getter will return `scaleX` value;
   * @export
   * @returns {number}
   */
  get scale() {
    return this.scaleX;
  }

  /**
   * @export
   * @ignore
   * @param {number} value
   * 
   * @returns {void}
   */
  set scale(value) {
    if (this.mScaleX == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mScaleX = this.mScaleY = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets the scale factor of this object along y-axis.
   *
   * @export
   * 
   * @return {number}
   */
  get scaleY() {
    return this.mScaleY;
  }

  /**
   * @export
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set scaleY(value) {
    if (this.mScaleY == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mScaleY = value;
    this.setTransformDirty();
  }

  /**
   * Gets/Sets rotation in radians.
   *
   * @export
   * 
   * @return {number}
   */
  get rotation() {
    return this.mRotation;
  }

  /**
   * @export
   * @ignore
   * @param {number} value
   * @return {void}
   */
  set rotation(value) {
    if (this.mRotation == value)
      return;

    Debug.assert(!isNaN(value), 'Value cannot be NaN');

    this.mRotation = value;
    this.setTransformDirty();
  }

  /**
   * Returns this GameObject parent GameObject or null.
   * @readonly
   * @return {GameObject|null}
   */
  get parent() {
    return this.mParent;
  }

  /**
   * Returns top most parent object or this if there is no parents.
   * 
   * @readonly
   * @return {GameObject}
   */
  get root() {
    let current = this;

    while (current.mParent != null)
      current = current.mParent;

    return current;
  }

  /**
   * Returns the stage Game Object to which this game object belongs to or null if not added on stage.
   *
   * @override
   * @readonly
   * @return {Stage|null}
   */
  get stage() {
    return this.mAdded === true ? Black.stage : null;
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
   * @param {number} value
   * @return {void}
   */
  set width(value) {
    Debug.assert(!isNaN(value), 'Value cannot be NaN');

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
   * @return {void}
   */
  set height(value) {
    Debug.assert(!isNaN(value), 'Value cannot be NaN');

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
   * @override
   * @readonly
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
   * @param {string|null} value
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
   * @return {*}
   */
  spawn(gen, ctx = null) {
    let iter = gen.apply(ctx == null ? this : ctx);

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
   * @param {number} [seconds=1] Duration
   * @return {function(?):?}
   */
  wait(seconds = 1) {
    return cb => setTimeout(cb.bind(this, (/** @type {number} */(seconds) * 1000)), (/** @type {number} */(seconds) * 1000));
  }

  /**
   * Waits for a specific message.
   *
   * @param {string} message The name of the message to wait for.
   * @return {function(?):?}
   */
  waitMessage(message) {
    return cb => this.on(message, cb.bind(this));
  }

  /**
   * Marks this GameObject and/or its children elements as dirty.
   *
   * @param {DirtyFlag} flag The flag or flag bit mask.
   * @param {boolean} [includeChildren=true] Specifies if the flag needed for all children.
   * @return {void}
   */
  setDirty(flag, includeChildren = true) {
    if (includeChildren) {
      GameObject.forEach(this, x => {
        x.mDirty |= flag;
        x.mDirtyFrameNum = Black.frameNum;
      });
    } else {
      this.mDirty |= flag;
      this.mDirtyFrameNum = Black.frameNum;
    }

    Renderer.__dirty = true;
  }

  /**
   * Marks the GameObject's parent as dirty.
   *
   * @param {DirtyFlag} flag The flag or flag bit mask.
   * @return {void}
   */
  setParentDirty(flag) {
    this.mDirty |= flag;
    this.mDirtyFrameNum = Black.frameNum;

    if (this.mAnchorChanged === true || this.mDirty & DirtyFlag.LOCAL || this.mDirty & DirtyFlag.BOUNDS) {
      if (this.mAnchorX !== 0 || this.mAnchorY !== 0) {
        this.getBounds(this, true, Rectangle.__cache.zero());
        this.mPivotX = this.mPivotOffsetX + (Rectangle.__cache.width * this.mAnchorX) + Rectangle.__cache.x;
        this.mPivotY = this.mPivotOffsetY + (Rectangle.__cache.height * this.mAnchorY) + Rectangle.__cache.y;
        this.mDirty |= DirtyFlag.LOCAL | DirtyFlag.WIRB;
      }

      this.mAnchorChanged = false;
    }

    let current = this;

    while (current.mParent != null) {
      current = current.mParent;
      current.mDirty |= flag;
      current.mDirtyFrameNum = Black.frameNum;

      if (this.mAnchorChanged === true || current.mDirty & DirtyFlag.BOUNDS || current.mDirty & DirtyFlag.LOCAL) {
        if (current.mAnchorX !== 0 || current.mAnchorY !== 0) {
          current.getBounds(current, true, Rectangle.__cache.zero());
          current.mPivotX = current.mPivotOffsetX + (Rectangle.__cache.width * current.mAnchorX) + Rectangle.__cache.x;
          current.mPivotY = current.mPivotOffsetY + (Rectangle.__cache.height * current.mAnchorY) + Rectangle.__cache.y;
          current.mDirty |= DirtyFlag.LOCAL | DirtyFlag.WIRB;
        }
      }
    }

    Renderer.__dirty = true;
  }

  /**
   * Marks this GameObject as Local dirty and all children elements as World dirty.
   *
   * @returns {void}
   */
  setTransformDirty() {
    if (this.mSuspendDirty === true)
      return;

    this.setDirty(/** @type {DirtyFlag} */(DirtyFlag.LOCAL | DirtyFlag.BOUNDS), false);
    this.setDirty(DirtyFlag.WIRB, true);
    this.setParentDirty(DirtyFlag.BOUNDS);
  }

  /**
   * Marks this GameObject with Render dirty flag if it is not suspended for dirty.
   *
   * @returns {void}
   */
  setRenderDirty() {
    if (this.mSuspendDirty === true)
      return;

    this.setDirty(DirtyFlag.RENDER, true);
  }

  /**
   * @ignore
   * @param {boolean} value
   * @return {void}
   */
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

  /**
   * Gets/Sets whether the object will listen for user input messages.
   *
   * @return {boolean}
   */
  get touchable() {
    let c = /** @type {InputComponent} */ (this.getComponent(InputComponent));
    return c !== null && c.touchable === true;
  }

  get snapToPixels() {
    return this.mSnapToPixels;
  }

  set snapToPixels(value) {
    this.mSnapToPixels = value;
  }

  // TODO: rename method
  /**
   * @ignore
   *
   * @param {Array<number>} points
   * @param {Matrix} worldTransformation
   * @param {Rectangle=} outRect
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
   * @param {Vector} point A point to test.
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
   * @param {Vector} point The point to test.
   * @param {Vector=} outVector If passed point of intersection will be stored in it.
   * @return {boolean} True if intersects.
   */
  static intersectsAt(gameObject, point, outVector = undefined) {
    outVector = outVector || new Vector();

    Vector.__cache.set();

    gameObject.worldTransformationInversed.transformVector(point, Vector.__cache);
    let contains = gameObject.localBounds.containsXY(Vector.__cache.x, Vector.__cache.y);

    if (contains === false)
      return false;

    outVector.x = Vector.__cache.x - gameObject.localBounds.x;
    outVector.y = Vector.__cache.y - gameObject.localBounds.y;
    return true;
  }

  /**
   * Checks if GameObject or any of its children elements intersects the given point.
   *
   * @param {GameObject} gameObject GameObject to test.
   * @param {Vector} point Point to test.
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
   * @param {GameObject} gameObject GameObject to start search from.
   * @param {function (new:Component)} type Type of Component.
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
   * Runs action across all GameObjects.
   *
   * @param {GameObject} gameObject GameObject to start iteration from.
   * @param {function(GameObject)} action The function to be executed on every GameObject.
   * @return {void}
   */
  static forEach(gameObject, action) {
    if (gameObject == null)
      gameObject = Black.stage;

    let r = action(gameObject);
    if (r == true)
      return;

    for (let i = 0; i < gameObject.mChildren.length; i++) {
      r = GameObject.forEach(gameObject.mChildren[i], action);
      if (r == true)
        return;
    }
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
      node = Black.stage;

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
      node = Black.stage;

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
 * @cat core
 * @enum {number}
 */
/* @echo EXPORT */
const DirtyFlag = {
  CLEAN: 0,         // Object is 100% cached
  LOCAL: 1,         // Local transformation is dirty 
  WORLD: 2,         // World transformation is dirty 
  WORLD_INV: 4,     // Inversed world transformation is dirty 
  RENDER: 8,        // Object needs to be rendered 
  RENDER_CACHE: 16, // In case object renders to bitmap internally, bitmap needs to be updated
  REBAKE: 32,       // NOT USED: Baked object changed, parents will be notified
  BOUNDS: 64,       // Parent-relative bounds needs update
  DIRTY: 0xffffff,  // Everything is dirty, you, me, everything!
  WIRB: 78
};
