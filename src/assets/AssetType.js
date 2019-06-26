/**
 * Asset type enum.
 * @cat assets
 * @static
 * @constant
 * @enum {string}
 */
const AssetType = {
  TEXTURE              : 'texture',
  TEXTURE_ATLAS        : 'textureAtlas',
  VECTOR_TEXTURE       : 'vectorTexture',
  VECTOR_TEXTURE_ATLAS : 'vectorTextureAtlas',
  FONT                 : 'font',
  BITMAP_FONT          : 'bitmapFont',
  XML                  : 'xml',
  JSON                 : 'json',
  VECTOR_GRAPHICS      : 'vectorGraphics',
  SOUND                : 'sound',
  SOUND_ATLAS          : 'soundAtlas'
};

export { AssetType };