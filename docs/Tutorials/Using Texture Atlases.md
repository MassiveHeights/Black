# Overview

A texture atlas is a container for smaller images, usually used to reduce the number of network requests and improve performance on WebGL.

## Tools

Currently, we only provide support for [TexturePacker](https://www.codeandweb.com/texturepacker) tool.

## Add exporter to TexturePacker

By default, TexturePacker doesn't include Black exporter, you have to install it manually.

1.  Copy all files from [here](https://github.com/MassiveHeights/Black/tree/master/TexturePacker/black) to:
    - Windows: `%ProgramFiles%/CodeAndWeb/TexturePacker/bin/exporters/black`
    - MacOS: `Applications/TexturePacker.app/Contents/Resources/exporters/black`
2.  Restart TexturePacker and select **Black** as a data format.

## How to use

To load an atlas:

```js
assets.enqueueAtlas('atlas', 'atlas.png', 'atlas.json')
```

To create a sprite:

```js
// image-name is a file name of the image inside atlas without extension.
const sprite = new Sprite('image-name')
```

To learn more about supported formats please refer to [official site of TexturePacker](https://www.codeandweb.com/texturepacker).
