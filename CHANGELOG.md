Black Engine: Changelog
=======================

# v0.5.9
### New features
- Added new stage scale mode - Cover! (Thanks to m31271n)
- Added pivot and 9 slice grid support for Texture Packer exporter
- Added ability to presimulate emitter
- Added ability to dispose Black (WIP)

### Changes
- Orientation lock reworked. Added extra div element to control the rotation of the canvas.
- Changed `stage.orientation` to viewport.orientation` and `StageOrientation` to `Orientation`
- Simplified scale logic (Thanks to m31271n)
- Changed the way how native input events are iterated
- Minor texture packer exporter improvements (Thanks to m31271n)

### Bug Fixes
- Fixed incorrect no audio warning 
- Fixed Arcade Physics not working when stage is locked is rotated 
- Fixed matrix vector transform in case when out vector is the same as input
- Fixed arcade physics world bound for letter box
- Fixed spine skip clipping (Thanks to rhyzx)
- Fixed input not working with Orientation Lock
- Fixed many incorrect JsDoc comments

# v0.5.8
### New features
- Added `useHiDPR` property to control render quality on high DPI screens
- Added ability to draw rounded rectangle
- Added ability to load custom asset in AssetManager using CustomAsset
- Added gradient and pattern support for Graphics

### Changes
- Changed empty clip rectangle to clip everything instead of nothing
- Improved anchor performance

### Bug Fixes
- Fixed Orientation Lock still works when disabled
- Fixed many GCC comments
- Fixed bug causing colored sprite to render incorrectly
- Fixed slice9grid not working as expected on colored sprites
- Fixed bug causing Arcade physics to not cleanup colliders after removing objects from stage
- Fixed Arcade physics units to be always within stage
- Fixed clip rect not working on TextField
- Fixed `getTextures` returning null for backed vectors
- Fixed BVG quadratic curve math
- Fixed many BVG rendering bugs and glitches
- Fixed anchors not working in some cases

# v0.5.7
### Changes
- Changed license to Simplified BSD!!!
- Changed `Emitter#state` to be public
- Added `TextField#getAllStyles` method which returns all styles 

### Bug Fixes
- Fixed `GameObject#relativeTo` method
- Fixed tiling sprite causing incorrect rendering of other Graphics objects

# v0.5.6
### New features
- Added `Graphics#cacheAsBitmapDynamic` property allowing to disable auto refresh of bitmap cache

### Bug Fixes
- Fixed few Cache As Bitmap bugs causing Graphics and tiling sprite to render incorrectly
- Fixed incorrect rendering of cached slice9grid texture
- Fixed incorrect rendering of tiled texture from texture atlas

### Examples & Docs
- Added "Cache As Bitmap Dynamic" example

# v0.5.5
### New features
- Added support for Black Vector Graphics (beta)
- Added orientation lock support
- Added Graphics to optionally accept either string or GraphicsData instance
- Added skew via `skewX` and `skewY` properties in the `DisplayObject`
- Added support for 9 grid slice
- Added sprite tiling support
- Added sprite wrapping support
- Added [svg2bvg](https://github.com/MassiveHeights/svg2bvg) tool which converts SVG files into BVG
- Added [bsa-gen](https://github.com/MassiveHeights/bsa-gen) tool to generate sound atlases from multiple audio files
- Added Timer component
- Added `GameObject#relativeTo` method to calculates GameObject's position relative to another GameObject
- Added `Graphics#quadraticCurveTo` method
- Added `Graphics#setLineDash` method
- Added optional param `isNonZero` for `Graphics#fill` method to control winding order
- Added `GraphicsData` class. Now you can have many graphics objects inside one Graphics GameObject.

### Changes
- Graphics internally changed and now supports nested graphics via GraphicsData object
- Changed Black Texture Atlas format to support version number (internal)

### Bug Fixes
- Fixed incorrect font bounds on different platforms by changing the way how its calculated. Now it checks font height using `pixel by pixel` method. Line height is a bit smaller from now. But overall font metrics looks good and exactly the same on different browsers.

### Examples & Docs
- Added tutorial about how to use "bsa-gen" tool to generate sound atlas
- Added tutorial about how to use "svg2bvg" tool and vector graphics in your app
- Added tutorial about how to use texture atlases
- Added 3 timer examples
- Added "Vector As a Sprite"
- Added "Orientation Lock" example
- Added "Texture Repeat" example
- Added "Slice 9 Grid" example
- Added "Skew" example

# v0.5.1
- Fixed broken `visible` property
- Fixed broken overhearing
- Fixed missing `Stage#onUpdate` calls
- Added `TextField#highQuality` property to control how TextField will be rendered
- Added many tests

# v0.5.0
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

# v0.4.0
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

# v0.3.42
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

# 0.3.41
- Fixed incorrect alignPivot and alignPivotOffset

# 0.3.4
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

# v0.0.12a
- Fixed TextField align issues caused by new pivot logic
- Fixed DOMDriver align issues caused by new pivot logic
- Fixed `Matrix::translate` broken logic
- Changed `VideoDriver::DrawImage` now accepts bounds
- Minor jsdoc fixess

# v0.0.11a
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


# v0.0.10a
- Added dist folder to github
- Added `touchable` to the `Sprite`
- Fixed package.json version mess
- Fixed bundling mess
- Fixed by adding missing `GameObject::onAdded` call
- Moved examples to external repo
- Renamed `Assert` to `Debug`

# v0.0.8a
- Initial commit
