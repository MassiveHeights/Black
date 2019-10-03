import { BindingType } from './BindingType';
import { Glob } from '../utils/Glob';

/**
 * A bridge between callback and context.
 * 
 * @cat core
 */
export class MessageBinding {
  /**
   * @param {black-engine~MessageDispatcher} owner                The owner of this binding.
   * @param {string} name                            Name of the message.
   * @param {Function} callback                      Callback function.
   * @param {boolean} isOnce                         Indicates whenever this binding should be auto destroyed after first execution.
   * @param {*=} [context=null]                      Optional context (usually this).
   * @param {black-engine~BindingType} [type=BindingType.REGULAR] Type of the binding.
   * @param {?string} [pathPattern=null]             Glob pattern to filter sender by name.
   */
  constructor(owner, name, callback, isOnce, context = null, type = BindingType.REGULAR, pathPattern = null) {
    /** 
     * @ignore 
     * @type {black-engine~MessageDispatcher} 
     */
    this.owner = owner;

    /** 
     * @ignore 
     * @type {string} 
     */
    this.name = name;

    /** 
     * @ignore 
     * @type {Function} 
     */
    this.callback = callback;

    /** 
     * @ignore 
     * @type {boolean} 
     */
    this.isOnce = isOnce;

    /** 
     * @ignore 
     * @type {*} 
     */
    this.context = context;

    /** 
     * @ignore 
     * @type {?string} 
     */
    this.pathPattern = pathPattern;

    /** 
     * @ignore 
     * @type {black-engine~Glob|null} 
     */
    this.glob = pathPattern == null ? null : new Glob(pathPattern);

    /** 
     * @ignore 
     * @type {black-engine~BindingType} 
     */
    this.type = type;
  }

  /**
   * Destroys this binding.
   */
  off() {
    this.owner.__off(this);
  }

  /**
   * @ignore
   * @returns {black-engine~MessageBinding}
   */
  __reset() {
    this.owner = null;
    this.pathPattern = null;
    return this;
  }
}