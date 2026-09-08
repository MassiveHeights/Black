# Getting Started

## Introduction

Welcome to the Black Engine.

This introduction covers the core concepts of the Black Engine and is intended to give an overview of the scripts and the most important features. All of the descriptions are fairly brief, but you can find the links for the more detailed documentation below.

Black Engine is a highly optimized 2D framework for desktop, mobile games, and applications. It was designed on a clear philosophy of simplicity. Despite the fact that this is a turn-key production platform, Black Engine does not attempt to provide all-encompassing solutions for everything. Vice versa, we believe that the main task of Black Engine is to empower you, as a game creator, with simple but strong tools which will allow you to realize your personal, unique vision. If you are an experienced developer, Black Engine's core concepts will be relatively easy to understand, but we strongly recommend that you take a minute and read this overview carefully, because despite the simplicity of some of our conceptions, they can differ from what you might initially expect.

## Games built on Black Engine

Some examples:

- [Donuts Blitz](Donuts%20Blitz.md)
- [Flappy Bird](https://github.com/MassiveHeights/Tutorial-FlappyBird)

## Installing

### Installing Black Engine

Black Engine is published on NPM. You can install it with `npm`:

```sh
$ npm install black-engine
```

### Using official template

Alternatively, you can also use official template.

Node.js runtime is required in order to running this template:

- If it is not already installed on your computer, go to the [official site](https://nodejs.org/), and install it according its docs.
- If you already have it, we recommend downloading the latest version.

Clone template with following commands:

```sh
$ git clone https://github.com/MassiveHeights/Black-Template.git
$ cd Black-Template
$ npm install
```

Launch template with following commands:

```sh
# run development server listening on port 3000
$ npm start
```

Open a browser and navigate to http://127.0.0.1:3000 . If you can see the anvil on the screen, then you've done everything right. Navigate to `/js/game.js` file which is the entry point, where you can start writing code.

All files inside the `sheets`, `textures`, `fonts`, `html`, `spine` and `audio` folders will be automatically copied into the `dist` folder when changed. Settings in `gulpfile.js` allow you to make changes in a short amount of time. For better compatibility and faster loading time, please use production build via `npm run bundle`.

## Load assets

### Load images

Step 1: Put your images in `textures` folder.

Step 2: Declare `AssetManager` and path to your assets.

```javascript
const assets = new AssetManager();
assets.defaultPath = '/assets/';
```

Step 3: Specify images will be loaded.

```javascript
assets.enqueueImage('anvil', 'popart_anvil.png');
```

Step 4: Load images.

```javascript
assets.on('complete', this.onAssetsLoaded, this);
assets.loadQueue();

onAssetsLoaded() {
  // All assets are ready to use
}
```

Congratulations, you have loaded the image in assets manager.

### Load image atlas

The atlas is a set of separate images which are compiled into a larger sheet to increase the productivity and memory.

```javascript
const assets = new AssetManager();
assets.defaultPath = '/assets/';
assets.enqueueAtlas('atlas', 'atlas.png', 'atlas.json');
```

If you wanna know how to create atlas, please read [Using Texture Atlases](Using%20Texture%20Atlases.md).

### Load sounds

```javascript
assets.enqueueSound('mainTheme', '/mainTheme.ogg');
```

### Load sound atlas

Please read more details at [here](Using%20Sound%20Atlases.md).

### Load JSON

```javascript
assets.enqueueJson('myJson', '/type.json');
```

## Display Sprite

```javascript
// Create new Sprite instance via the name defined in asset manager
this.sprite = new Sprite('anvil');

// Add sprite to the scene
this.addChild(this.sprite);
```

## Transform Sprite

The transformation of Sprite is achieved via changing properties of Sprite instance.

### Move Sprite

```javascript
this.sprite.x = 100; // set x-coord
this.sprite.y = 100; // set y-coord
this.sprite.rotation = Math.PI; // set rootation in radians
```

### Transparentize Sprite

```javascript
this.sprite.alpha = 0.4; // 40%
```

### More Transformation

Explore [the API of Sprite](https://massiveheights.github.io/Black/docs/api/display/Sprite), you will find more transformation there.

## Input

Input system is responsible for managing user input via mouse, finger or keyboard.

```javascript
const rect = new Sprite('rect');
rect.touchable = true;
rect.on('pointerUp', this.onUp, this);

function onUp() {
  console.log('up');
}
```

See the [Input documentation](https://massiveheights.github.io/Black/docs/api/input) for details.

## Game Objects

Game objects are simple objects. They are usually equipped with visual or audible representation. Also they can be equipped with script components. Thus, game objects differ from sprites or sounds because they are containers for these different types of components.

```javascript
// declare new GameObject
const gameObject = new GameObject();
```

See the [GameObject documentation](https://massiveheights.github.io/Black/docs/api/core/GameObject) for more details.

## Components

Component based engine design was originally pioneered in order to avoid annoying class hierarchies which introduce inheritance. The idea is in packaging the functionality of game objects into separate objects. A single game object is just a set of components. The components of a game object define it’s behavior, appearance and functionality.

Get an example adding Tween component at [here](https://massiveheights.github.io/Black/examples/?group=Tweening&example=Basic.js).

See the [Component documentation](https://massiveheights.github.io/Black/docs/api/core/Component) for more details.

## Message Passing

Components communicate with each-other and other systems through message passing. Also, components respond to a set of predefined messages which change them or trigger specific actions. You can send messages to hide graphics, play sounds or nudge objects. Moreover, the engine uses messages to notify components of events, for example when physics shapes collide.
The message passing mechanism needs a recipient for every sent message. To send messages to each other you need any of two components in your app or game.

Get examples at [here](https://massiveheights.github.io/Black/examples/).

See the [MessageDispatcher documentation](https://massiveheights.github.io/Black/docs/api/core/MessageDispatcher) for more details.

## Tweening

A tween is a concept which allows you to change the values of the properties of an object in a smooth way. You can simply tell it which properties you want to change and which final values they should have when the tween will finish running, and how long should this take. Then, the tweening engine will take care of finding the intermediate values from the start to the end of a point.

Get examples at [here](https://massiveheights.github.io/Black/examples/).

See the [Tween documentation](https://massiveheights.github.io/Black/docs/api/animation/Tween) for more details.

## Particle System

Emitter is very useful for creating pleasant visual effects, particularly in games. You can use them to create snow, rain, or falling leaves. Black Engine contains a powerful particle effect that allows you to build and tweak the effects while you run them in real time in your game.

Get examples with cool effects at [here](https://massiveheights.github.io/Black/examples/).

See [Emitter documentation](https://massiveheights.github.io/Black/docs/api/particles/Emitter) for more details.

## Math Helpers

Black Engine implements all of the basic mathematical methods such as: random between, clamp, lerp, PI, DEG2RAD and etc.

```javascript
const a = 5;
const b = 1;
const t = 20;
const resultLerp = MathEx.lerp(a, b, t);
```

```javascript
const sprite = new Sprite('rect');
sprite.rotation = MathEx.PI2;
```

```javascript
const min = 1;
const max = 10;
const randomNumber = MathEx.randomBetween(min, max);
```

See the [Math documentation](https://massiveheights.github.io/Black/docs/api/core/MathEx) for details.

## The End

Thank you for choosing our engine. Have fun!
