Black Engine: Changelog
=======================
v0.5.0
------
- Added Arcade physics system
- Added `Black.ups` property to control number of updates per second (render goes as fast as it can)
- Added `Time.alpha` - indicates how much time has been passed since last update in range from 0 to 1
- Added `GameObject#onRender` and `Component#onRender` methods - called only for subclasses of DisplayObject
- Added `System#onRender` method
- Reworked Canvas Driver and performance improved
- Reworked game loop - now onUpdate is a fixed time update
- Removed `onFixedUpdate` and `onPostUpdate`
- Removed `Black.FPS` getter
- Removed `Black#uptime`, use `Time.now` instead
- Fixed missing onRemoved call when removing children within onRemoved method
- Improved `getBounds` performance for clipped objects

v0.4.0
------
- Graphics reworked (now it has bounds and API similar to HTML canvas)
- `AssetManager` dramatically improved
- TextField now posts `change` message when text is changed
- Added Splash Screen

v0.3.5
------
- Improved `MessageDispatcher`
- Removed `MessageDispatcher#off` method, use `MessageBinding.off` instead
- Removed ability to post direct messages
- Removed capturing phase
- Changed `MessageDispatcher` to have path/parent/stage getters
- Added `MessageDispatcher#once` method
- Added `Input.once` method
- Added `Glob` class

v0.3.42
-------
- Added `Black#hasSystem` method
- Added `GameObject.scale` property
- Added `GameObject.getStageBounds` helper method
- Added `scale` param to `CanvasRenderTexture` ctor.
- Added ability to not render stage in case it was not changed since last frame (Renderer.skipUnchangedFrames), false by default
- Fixed incorrect behavior when calling render from inside render method
- Fixed fixed/update/post loops to support removing of children element while in update
- Fixed clipping for nested elements
- Fixed clipping for cached elements
- Fixed incorrect blending/alpha after clipping
- Improved GameObject's children iteration
- Improved cacheAsBitmap by allowing DisplayObject to be changed while cached, cache will update itself automatically next time object will become static.
- Improved `stage.localTransformation` performance
- Improved `Matrix.prepend` method
- Improved emitter to not be dirty while not visible
- Improved documentation
- Changed debug defines to be visible in final builds
- Changed cacheAsBitmap to not work on DisplayObject's descendants
- Changed stage to not have InputComponent when there is no Input system
- Changed RenderTargetCanvas size to be rounded
- Changed `ObjectPool.get` method is no longer receive params
- Removed `VideoNullDriver.renderResolution`
- Minor refactoring

v0.3.41
-------
- Fixed incorrect alignPivot and alignPivotOffset

v0.3.4
------
- Added BitmapTextField
- Added Audio support (spatial, audio atlas, sound effects)
- Added Stage, stage scale modes and orientations
- Added `ObjectPool` class
- Added Spine support
- Added rich feature to the TextField
- Added `DisplayObject#cacheAsBitmap` property
- Added anchorX/anchorY and now they updates automatically
- Added pivotOffsetX/pivotOffsetY
- Added `AssetManager#addTexture` method
- Added basic Graphics class
- Added `RadialScatter`
- Added render to texture support
- Added Font and Text metrics classes
- Added Colliders support (box and circle)
- Fixed incorrect blending for clipped sprites
- Fixed incorrect bounds calculations
- Improved Emitter and modifiers API and perforamnce
- Improved `getBounds` performance by caching results
- Improved performance for some classes that using math
- Reworked drivers, now only required calls will be made to drawing context (~50% less requests are made)
- Removed pivotX/pivotY, use pivotOffsetX/pivotOffsetY instead
- Typed 95% for GCC

v0.0.12a
--------
- Fixed TextField align issues caused by new pivot logic
- Fixed DOMDriver align issues caused by new pivot logic
- Fixed `Matrix::translate` broken logic
- Changed `VideoDriver::DrawImage` now accepts bounds
- Minor jsdoc fixess

v0.0.11a
--------
- Reworked `Input`
- Now `Input` is single target system
- Added `pointerIn` and `pointerOut` messages
- Added `PointerInfo` classes, posted as second argument
- Added `GameObject::add` sugar method, accepts array of `GameObject` and/or `Component`   
- Added JSDoc's for most classes
- Added new JSDoc template
- Added message overhearing
- Added `FontAsset` class
- Added `Black::isPaused` method
- Added `GameObject::displayDepth` method - returns z-depth of GameObject.
- Massive input fixes
- Fixed many GCC comments
- Fixed `GameObject::index` not working method
- Fixed `GameObject::setChildIndex` not workign method
- Updated `Viewport`, now it will automatically add missing CSS styles on start.


v0.0.10a
--------
- Added dist folder to github
- Added `touchable` to the `Sprite`
- Fixed package.json version mess
- Fixed bundling mess
- Fixed by adding missing `GameObject::onAdded` call
- Moved examples to external repo
- Renamed `Assert` to `Debug`

v0.0.8a
------------------------
- Initial commit
