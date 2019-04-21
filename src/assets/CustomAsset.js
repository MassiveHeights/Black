import { Asset } from "./Asset";

/**
 * This is abstract class for custom user assets. For example CustomAsset can be used to load video or other data files.
 *
 * @fires Asset#error
 * @fires Asset#complete
 * 
 * @cat assets
 * @extends Asset
 */
export class CustomAsset extends Asset { }