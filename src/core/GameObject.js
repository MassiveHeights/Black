/**
 * GameObject - Base class for all black game objects.
 * @unrestricted
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class GameObject extends MessageDispatcher {
  constructor() {
    super();

    /** @type {number} */
    this.mId = ++GameObject.ID;

    /** @type {string} */
    this.mName = '';

    /** @type {Array<Component>} */
    this.mComponents = [];

    /** @type {Array<GameObject>} */
    this.mChildren = [];

    /** @type {number} */
    this.mX = 0;

    /** @type {number} */
    this.mY = 0;

    /** @type {number} */
    this.mScaleX = 1;

    /** @type {number} */
    this.mScaleY = 1;

    /** @type {number} */
    this.mPivotX = 0;

    /** @type {number} */
    this.mPivotY = 0;

    /** @type {number} */
    this.mRotation = 0;

    /** @type {Rectangle} */
    this.mBounds = null;

    /** @type {Matrix} */
    this.mLocalTransform = new Matrix();

    /** @type {Matrix} */
    this.mWorldTransform = new Matrix();

    /** @type {DirtyFlag} */
    this.mDirty = DirtyFlag.DIRTY;

    /** @type {GameObject} */
    this.mParent = null;

    /** @type {string|null} */
    this.mTag = null;

    /** @type {number} */
    this.mIndex = 0;

    /** @type {boolean} */
    this.mAdded = false;
  }

  /**
   * id - Unique object id.
   *
   * @returns {number} Unique object id.
   */
  get id() {
    return this.mId;
  }

  /**
   * onAdded - This method called each time object added to stage.
   *
   * @return {void}
   */
  onAdded() { }

  /**
   * onRemoved - Called when object is removed from stage.
   *
   * @return {void}
   */
  onRemoved() {}


  /**
   * add - Sugar method for adding child GameObjects or Components.
   *
   * @param {GameObject|Component} gameObjectOrComponent A GameObject or Component to add.
   *
   * @return {GameObject|Component} The passed GameObject or Component.
   */
  add(gameObjectOrComponent) {
    if (gameObjectOrComponent instanceof GameObject)
      return this.addChild(/* @type {!GameObject} */ (gameObjectOrComponent));
    else
      return this.addComponent(/* @type {!Component} */ (gameObjectOrComponent));
  }

  /**
   * Adds a child GameObject instance to this GameObject instance. The child is added to the top of all other children in this GameObject instance.
   *
   * @param  {...GameObject} child The GameObject instance or instances to add as a child of this GameObject instance.
   * @return {...GameObject} The GameObject last instance that you pass in the child parameter.
   */
  addChild(...child) {
    for (var i = 0; i < child.length; i++)
      this.addChildAt(child[i], this.mChildren.length);

    return child;
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
    this.mChildren.splice(index, 1, child);

    child.removeFromParent();
    child.__setParent(this);

    if (this.root !== null)
      Black.instance.onChildrenAdded(child);

    return child;
  }

  /**
   * @protected
   * @param {GameObject} value Description
   *
   * @return {boolean} Description
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
   * setChildIndex - Sets the index (layer) of the specified GameObject to the specified index (layer).
   *
   * @param {GameObject} child The GameObject instance to change index for.
   * @param {number} index Desired index.
   *
   * @returns {GameObject} The GameObject instance that you pass in the child parameter.
   */
  setChildIndex(child, index) {
    let ix = this.mChildren.indexOf(child);

    if (ix < 0)
      throw new Error('Child is not a child of this object.');

    if (ix === index)
      return child;

    this.mChildren.splice(ix, 1);
    this.mChildren.splice(index, 1, child);
    this.setTransformDirty();

    return child;
  }

  /**
   * removeFromParent - Removes this GameObject instance from its parent.
   *
   * @param {boolean} [dispose=false]
   *
   * @return {void} Description
   */
  removeFromParent(dispose = false) {
    if (this.mParent)
      this.mParent.removeChild(this);

    if (dispose)
      this.dispose();

    this.setTransformDirty();
  }

  /**
   * removeChild - Removes specified GameObjects instance.
   *
   * @param {GameObject} child GameObject instance to remove.
   * @param {boolean} [dispose=false]
   *
   * @return {GameObject} The GameObject instance that you pass in the child parameter.
   */
  removeChild(child, dispose) {
    let ix = this.mChildren.indexOf(child);

    if (ix < 0)
      return null;

    return this.removeChildAt(ix);
  }


  /**
   * getChildByName
   *
   * @param {string} name
   *
   * @return {GameObject|null}
   */
  getChildByName(name) {
    for (var i = 0; i < this.mChildren.length; i++) {
      if (this.mChildren[i].name === name)
        return this.mChildren[i];
    }

    return null;
  }

  /**
   * removeChildAt - Removes GameObjects instance from specified index.
   *
   * @param {number} index Description
   * @param {boolean} [dispose=false]
   *
   * @return {GameObject} The removed GameObject instance.
   */
  removeChildAt(index, dispose) {
    if (index < 0 || index > this.numChildren)
      throw new Error('Child index is out of bounds.');

    let hadRoot = this.root !== null;

    let child = this.mChildren[index];
    child.__setParent(null);

    this.mChildren.splice(index, 1);

    if (hadRoot)
      Black.instance.onChildrenRemoved(child);

    if (dispose)
      child.dispose();

    this.setTransformDirty();

    return child;
  }

  /**
   * getChildAt - Returns GameObject at specified index.
   *
   * @param {number} index The index of child GameObject.
   *
   * @return {GameObject} The GameObject at specified index.
   */
  getChildAt(index) {
    return this.mChildren[index];
  }

  /**
   * addComponent - Adds Component instance to the end of the list,
   *
   * @param  {...Component} instances Component instance or instances.
   * @return {Component} The Component instance you pass in the instances parameter.
   */
  addComponent(...instances) {
    for (let i = 0; i < instances.length; i++) {
      let instance = instances[i];

      if (instance.gameObject)
        throw new Error('Component cannot be added to two game objects at the same time.');

      this.mComponents.push(instance);
      instance.gameObject = this;

      if (this.root !== null)
        Black.instance.onComponentAdded(this, instance);
    }

    return instances;
  }

  /**
   * removeComponent - Description
   *
   * @param {Component} instance Description
   *
   * @return {Component|null} Description
   */
  removeComponent(instance) {
    if (!instance)
      return null;

    let index = this.mComponents.indexOf(instance);
    if (index > -1)
      this.mComponents.splice(index, 1);

    // detach game object after or before?
    instance.gameObject = null;
    instance.onRemoved(this);

    if (this.root !== null)
      Black.instance.onComponentRemoved(this, instance);

    return instance;
  }

  /**
   * getComponent
   *
   * @param {*} instance
   *
   * @return {Component|null}
   */
  getComponent(instance) {
    for (let i = 0; i < this.mComponents.length; i++) {
      let c = this.mComponents[i];
      if (c instanceof instance)
        return c;
    }

    return null;
  }


  /**
   * numComponenets - Returns number of component's
   *
   * @return {number}
   */
  get numComponenets() {
    return this.mComponents.length;
  }


  /**
   * getComponentAt - Retrives Component at given index.
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
   * localTransformation - Description
   *
   * @return {Matrix} Description
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
   * worldTransformation - returns cloned Matrix object which represents object orientation in world space.
   *
   * @return {Matrix}
   */
  get worldTransformation() {
    if (this.mDirty & DirtyFlag.WORLD) {
      this.mDirty ^= DirtyFlag.WORLD;

      if (this.mParent)
        this.mParent.worldTransformation.copyTo(this.mWorldTransform).append(this.localTransformation);
      else
        this.localTransformation.copyTo(this.mWorldTransform);
    }

    return this.mWorldTransform.clone();
  }

  /**
   * worldTransformationInversed - Description
   *
   * @return {Matrix} Description
   */
  get worldTransformationInversed() {
    // TODO: optimize, cache
    return this.worldTransformation.clone().invert();
  }

  /**
   * __fixedUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  __fixedUpdate(dt) {
    this.onFixedUpdate(dt);

    for (let k = 0; k < this.mComponents.length; k++) {
      let c = this.mComponents[k];
      c.gameObject = this;
      c.onFixedUpdate(dt);
    }

    for (let i = 0; i < this.mChildren.length; i++)
      this.mChildren[i].__fixedUpdate(dt);
  }

  /**
   * __update - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  __update(dt) {
    this.onUpdate(dt);

    for (let k = 0; k < this.mComponents.length; k++) {
      let c = this.mComponents[k];
      c.gameObject = this;
      c.onUpdate(dt);
    }

    for (let i = 0; i < this.mChildren.length; i++)
      this.mChildren[i].__update(dt);
  }

  /**
   * __update - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  __postUpdate(dt) {
    this.onPostUpdate(dt);

    for (let k = 0; k < this.mComponents.length; k++) {
      let c = this.mComponents[k];
      c.gameObject = this;
      c.onPostUpdate(dt);
    }

    for (let i = 0; i < this.mChildren.length; i++) {
      this.mChildren[i].__postUpdate(dt);
    }
  }

  /**
   * onFixedUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  onFixedUpdate(dt) {}

  /**
   * onUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  onUpdate(dt) {}

  /**
   * onUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  onPostUpdate(dt) {}

  /**
   * __render - Description
   *
   * @param {NullDriver} video           Description
   * @param {number} time            Description
   * @param {number} parentAlpha     Description
   * @param {string} parentBlendMode Description
   *
   * @return {void} Description
   */
  __render(video, time, parentAlpha, parentBlendMode) {
    this.onRender(video, time);

    let child = null;
    for (let i = 0; i < this.mChildren.length; i++) {
      child = this.mChildren[i];
      child.__render(video, time, parentAlpha, parentBlendMode);
    }
  }

  /**
   * onRender - Description
   *
   * @param {NullDriver} video Description
   * @param {number} time  Description
   *
   * @return {void} Description
   */
  onRender(video, time) {}

  /**
   * onGetLocalBounds - Override this method if you need to specify GameObject size. Should be always be a local coordinates.
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
   * getBounds - Returns world bounds of this object and all children if specified (true by default).
   * object.getBounds() - relative to world.
   * object.getBounds(object) - local bounds.
   * object.getBounds(object.parent) - relative to parent.
   * object.getBounds(objectB) - relative to objectB space.
   *
   * @param {GameObject} [space=undefined]
   * @param {boolean} [includeChildren=true]
   * @param {Rectangle=} [outRect=null]
   *
   * @return {Rectangle} returns bounds of the object and all childrens
   */
  getBounds(space = undefined, includeChildren = true, outRect = undefined) {
    outRect = outRect || new Rectangle();

    let matrix = this.worldTransformation;

    // TODO: optimize, check if space == null, space == this, space == parent
    // TODO: use wtInversed instead
    if (space != null) {
      matrix = this.worldTransformation.clone();
      matrix.prepend(space.worldTransformation.clone().invert());
    }

    let bounds = new Rectangle();
    this.onGetLocalBounds(bounds);

    matrix.transformRect(bounds, bounds);
    outRect.expand(bounds.x, bounds.y, bounds.width, bounds.height);

    if (includeChildren)
      for (let i = 0; i < this.numChildren; i++)
        this.getChildAt(i).getBounds(space, includeChildren, outRect);

    return outRect;
  }

  /**
   * setTransform -
   *
   * @param {number} [x=0]      x-cord
   * @param {number} [y=0]      y-cord
   * @param {number} [r=0]      rotation
   * @param {number} [scaleX=1] scale-x
   * @param {number} [scaleY=1] scale-y
   * @param {number} [anchorX=0] anchor-x
   * @param {number} [anchorY=0] anchor-y
   * @param {number} [includeChildren=true] include children when adjusting pivot?
   *
   * @return {GameObject}
   */
  setTransform(x = 0, y = 0, r = 0, scaleX = 1, scaleY = 1, anchorX = 0, anchorY = 0, includeChildren = true) {
    this.mX = x;
    this.mY = y;
    this.mRotation = r;
    this.mScaleX = scaleX;
    this.mScaleY = scaleY;

    this.getBounds(this, includeChildren, Rectangle.__cache.zero());
    this.mPivotX = Rectangle.__cache.width * anchorX;
    this.mPivotY = Rectangle.__cache.height * anchorY;

    this.setTransformDirty();
    return this;
  }

  /**
   * localToGlobal - Description
   *
   * @param {Vector} localPoint       Description
   * @param {Vector|null} [outVector=null] Description
   *
   * @return {Vector} Description
   */
  localToGlobal(localPoint, outVector = null) {
    return this.worldTransformation.transformVector(localPoint, outVector);
  }

  /**
   * globalToLocal - Description
   *
   * @param {Vector} localPoint       Description
   * @param {Vector|null} [outVector=null] Description
   *
   * @return {Vector} Description
   */
  globalToLocal(globalPoint, outVector = null) {
    return this.worldTransformationInversed.transformVector(globalPoint, outVector);
  }

  /*:--- PROPERTIES ---:*/

  /**
   * numChildren - Description
   *
   * @return {number} Description
   */
  get numChildren() {
    return this.mChildren.length;
  }

  /**
   * name - Description
   *
   * @return {string} Description
   */
  get name() {
    return this.mName;
  }

  /**
   * name - Description
   *
   * @param {string} value Description
   *
   * @return {void} Description
   */
  set name(value) {
    this.mName = value;
  }

  /**
   * x - Gets the x coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
   *
   * @return {number} Description
   */
  get x() {
    return this.mX;
  }

  /**
   * x - Sets the x coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set x(value) {
    if (this.mX == value)
      return;

    this.mX = value;
    this.setTransformDirty();
  }

  /**
   * y - Gets the y coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
   *
   * @return {number} Description
   */
  get y() {
    return this.mY;
  }

  /**
   * y - Sets the y coordinate of the GameoObject instance relative to the local coordinates of the parent GameoObject.
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set y(value) {
    if (this.mY == value)
      return;

    this.mY = value;
    this.setTransformDirty();
  }

  /**
   * pivotX - Description
   * @export
   * @return {number} Description
   */
  get pivotX() {
    return this.mPivotX;
  }

  /**
   * pivotX - Description
   *
   * @export
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set pivotX(value) {
    if (this.mPivotX == value)
      return;

    this.mPivotX = value;
    this.setTransformDirty();
  }

  /**
   * pivotY - Description
   *
   * @return {number} Description
   */
  get pivotY() {
    return this.mPivotY;
  }

  /**
   * pivotY - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set pivotY(value) {
    if (this.mPivotY == value)
      return;

    this.mPivotY = value;
    this.setTransformDirty();
  }

  /**
   * alignPivot
   *
   * @param {number}  [px=0.5]
   * @param {number}  [py=0.5]
   * @param {boolean} [includeChildren=true]
   *
   * @return {GameObject}
   */
  alignPivot(ax = 0.5, ay = 0.5, includeChildren = true) {
    this.getBounds(this, includeChildren, Rectangle.__cache.zero());

    this.mPivotX = Rectangle.__cache.width * ax;
    this.mPivotY = Rectangle.__cache.height * ay;
    this.setTransformDirty();

    return this;
  }

  /**
   * scaleX - Description
   *
   * @return {number} Description
   */
  get scaleX() {
    return this.mScaleX;
  }

  /**
   * scaleX - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set scaleX(value) {
    if (this.mScaleX == value)
      return;

    this.mScaleX = value;
    this.setTransformDirty();
  }

  /**
   * scaleY - Description
   *
   * @return {number} Description
   */
  get scaleY() {
    return this.mScaleY;
  }

  /**
   * scaleY - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set scaleY(value) {
    if (this.mScaleY == value)
      return;

    this.mScaleY = value;
    this.setTransformDirty();
  }

  /**
   * rotation - returns current rotation
   *
   * @return {number} Description
   */
  get rotation() {
    return this.mRotation;
  }

  /**
   * rotation - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set rotation(value) {
    if (this.mRotation == value)
      return;

    this.mRotation = value;
    this.setTransformDirty();
  }

  /**
   * parent - Description
   *
   * @return {GameObject} Description
   */
  get parent() {
    return this.mParent;
  }

  /**
   * root - Description
   *
   * @return {GameObject|null} Description
   */
  get root() {
    let current = this;

    if (current === Black.instance.root)
      return current;

    while (current.mParent) {
      if (current === Black.instance.root)
        return current;
      else if (current.mParent === Black.instance.root)
        return Black.instance.root;
      else
        current = current.mParent;
    }

    return null;
  }

  /**
   * depth - Description
   *
   * @return {number} Description
   */
  get depth() {
    if (this.mParent)
      return this.mParent.depth + 1;
    else
      return 0;
  }

  /**
   * index - Description
   *
   * @return {number} Description
   */
  get index() {
    return this.mIndex;
  }

  /**
   * width - Description
   *
   * @return {number} Description
   */
  get width() {
    return this.getBounds(this.mParent).width;
  }

  /**
   * width - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set width(value) {
    this.scaleX = 1;
    const currentWidth = this.width;

    if (currentWidth != 0.0)
      this.scaleX = value / currentWidth;
  }

  /**
   * height - Description
   *
   * @return {number} Description
   */
  get height() {
    return this.getBounds(this.mParent).height;
  }

  /**
   * height - Description
   *
   * @param {number} value Description
   *
   * @return {void} Description
   */
  set height(value) {
    this.scaleY = 1;
    const currentHeight = this.height;

    if (currentHeight != 0)
      this.scaleY = value / currentHeight;
  }


  /**
   * localWidth - returns height in local space without children.
   *
   * @return {number}
   */
  get localWidth() {
    return this.getBounds(this, false).width;
  }


  /**
   * localHeight - returns height in local space without children.
   *
   * @return {number}
   */
  get localHeight() {
    return this.getBounds(this, false).height;
  }

  // TODO: precache
  /**
   * path - Description
   *
   * @return {string} Description
   */
  get path() {
    if (this.mParent !== null)
      return this.mParent.path + '/' + this.mName;

    return this.mName;
  }

  /**
   * tag - Description
   *
   * @return {string|null} Description
   */
  get tag() {
    return this.mTag;
  }

  /**
   * tag - Description
   *
   * @param {string|null} value Description
   *
   * @return {void} Description
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
   * co - Starts coroutine.
   *
   * @param {Function} gen
   * @param {*=} [ctx=null]
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
   * @param {number} [seconds=1]
   *
   * @return {function(*):*}
   */
  wait(seconds = 1) {
    return cb => setTimeout(cb.bind(this, seconds * 1000), seconds * 1000);
  }


  /**
   * waitMessage - Waits for a speceific message
   *
   * @param {string} message The name of the message to wait for
   *
   * @return {function(?):?} Description
   */
  waitMessage(message) {
    return cb => this.on(message, cb.bind(this));
  }


  /**
   * setDirty
   *
   * @param {DirtyFlag} flag
   * @param {boolean} [includeChildren=true] Description
   *
   * @return {void}
   */
  setDirty(flag, includeChildren = true) {
    if (includeChildren) {
      GameObject.forEach(this, x=> {
        x.mDirty |= flag;
      });
    } else {
      this.mDirty |= flag;
    }
  }

  setTransformDirty() {
    this.setDirty(DirtyFlag.LOCAL, false);
    this.setDirty(DirtyFlag.WORLD, true);
  }

  /**
   * dispose
   *
   * @return {void}
   */
  dispose() {
  }

  // TODO: rename method
  /**
   * getBoundsWithPoints - Description
   *
   * @param {Array<number>} points              Description
   * @param {Matrix} worldTransformation Description
   * @param {Rectangle=} outRect             Description
   *
   * @return {Rectangle} Description
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
   * intersects - Description
   *
   * @param {GameObject} gameObject Description
   * @param {Vector} point      Description
   *
   * @return {boolean} Description
   */
  static intersects(gameObject, point) {
    let tmpVector = new Vector();
    let inv = gameObject.worldTransformation.invert();

    inv.transformVector(point, tmpVector);

    let rect = gameObject.getBounds(gameObject, false);
    return rect.containsXY(tmpVector.x, tmpVector.y);
  }

  /**
   * intersectsAt - Description
   *
   * @param {GameObject} gameObject Description
   * @param {Vector} point      Description
   * @param {Vector=} outVector  Description
   *
   * @return {boolean} Description
   */
  static intersectsAt(gameObject, point, outVector = undefined) {
    outVector = outVector || new Vector();

    let tmpVector = Vector.__cache;
    let inv = gameObject.worldTransformationInversed;

    inv.transformVector(point, tmpVector);

    let rect = gameObject.getBounds(gameObject, false);
    let contains = rect.containsXY(tmpVector.x, tmpVector.y);

    if (!contains)
      return false;

    outVector.x = tmpVector.x - rect.x;
    outVector.y = tmpVector.y - rect.y;
    return true;
  }

  /**
   * intersectsWith - Description
   *
   * @param {GameObject} gameObject Description
   * @param {Vector} point      Description
   *
   * @return {GameObject|null} returns object or null
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

    if (obj === null && GameObject.intersects(gameObject, point)) {
      return gameObject;
    }

    return null;
  }

  /**
   * findWithTag - Description
   *
   * @param {string} tag Description
   *
   * @return {Array<GameObject>|null} Description
   */
  static findWithTag(tag) {
    if (Black.instance.mTagCache.hasOwnProperty(tag) === false)
      return null;

    return Black.instance.mTagCache[tag];
  }

  /**
   * findComponents - Returns a list of Components
   *
   * @param {GameObject} gameObject
   * @param {function (new:Component)} type
   *
   * @return {Array<Component>}
   */
  static findComponents(gameObject, type) {
    Assert.is(gameObject !== null, 'gameObject cannot be null.');
    Assert.is(type !== null, 'type cannot be null.');

    /** @type {Array<Component>} */
    let list = [];

    /** @type {function(GameObject, function(new:Component)):void} */
    let f = function(gameObject, type) {
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
   * forEach - Runs action accross all object mathing the name.
   *
   * @param {GameObject} node   Description
   * @param {function(GameObject)} action Description
   *
   * @return {void} Description
   */
  static forEach(node, action) {
    if (node == null)
      node = Black.instance.root;

    action(node);

    for (let i = 0; i < node.numChildren; i++)
      GameObject.forEach(node.getChildAt(i), action);
  }


  /**
   * find - Finds object by its name.
   *
   * @param {string} name Description
   * @param {GameObject} node Description
   *
   * @return {GameObject} Description
   */
  static find(name, node) {
    if (node == null)
      node = Black.instance.root;

    if (node.name === name)
      return node;

    for (let i = 0; i < node.numChildren; i++) {
      let r = GameObject.find(name, node.getChildAt(i));
      if (r != null)
        return r;
    }

    return null;
  }
}

/** @type {number}
 * @nocollapse
 */
GameObject.ID = 0;

/**
 * @enum {number}
 */
/* @echo EXPORT */
var DirtyFlag = {
  LOCAL: 1,
  WORLD: 2,
  DIRTY: 0xffffff
};
