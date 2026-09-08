## Overview
The sound atlas is a set of audio files merged into a single audio file. Mainly used to decrease the number of network requests and speed up loading times.  
Sound atlas consists of two files: an audio file (usually mp3) and data file (JSON).

To see supported list of input audio files please refer to FFmpeg documentantion.
When making a choice for the output format refer to platform specific documentation. 
https://caniuse.com/ for Browsers. 
For OS specific support just google it. Bear in mind not all formats are royalty free or may be not properly supported by
destination platform. If in doubt just use mp3.
  

## Installation
Download  [ffmpeg](https://ffmpeg.zeranoe.com/builds/)
and include it in your path `export PATH=$PATH:path/to/ffmpeg/bin`  
(for Windows users)

Install Sound Atlas generator tool.  
`npm install -g bsa-gen`

## How to generate
`bsa-gen --in *.mp3 --out atlas`

Parameters  
`--in` - File mask in the current folder.  
`--out` - Output files name. Supports path, eg. `outputFolder/atlas`.  
`--vbr` - (optional) Audio quality. Default preset for FFmpeg used is 7. Which is VBR 80-120 kbit, stereo.

## How to use
Usual way to load the sound atlas:
```
Black.assets.enqueueSoundAtlas('my-sound-atlas', 'atlas.mp3', 'atlas.json');
```

To get the sound and create its intance:
```
let s = Black.assets.getSound('sound-name-from-atlas');
let soundInstance = s.play();
```

where `sound-name-from-atlas` is the name of the input audio file without extension.

Simplier way to play sound:
```
MasterAudio.play('sound-name-from-atlas');
```

  