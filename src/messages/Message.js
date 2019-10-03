import { MessageType } from "./MessageType";
import { ObjectPool } from "./../utils/ObjectPool";

/**
 * Message holds all information about dispatched event. This is a pooled object.
 *
 * @cat core
 */
export class Message {
  constructor() {
    /** @type {black-engine~MessageDispatcher} The `MessageDispatcher` object, which posted this message. */
    this.sender = null;

    /** @type {string} The name of message. */
    this.name = '';

    /** @type {Object} `GameObject` which receives this message. */
    this.target = null;

    /** @type {Object} The point from which sending is begun. */
    this.origin = null;

    /** @type {boolean} Specifies if invocation of this message was canceled. */
    this.canceled = false;

    /** @type {black-engine~MessageType} Message type. See `MessageType` enum. */
    this.type = MessageType.DIRECT;
  }

  /**
   * Cancels message invocation.
   *
   * @return {void}
   */
  cancel() {
    this.canceled = true;
  }

  // @ifdef DEBUG
  /**
   * Generates message string representation.
   *
   * @return {string}
   */
  toString() {
    let name = this.sender.name !== undefined ? this.sender.name : '';
    return `MESSAGE: { name: '${this.name}', sender: '${name}', target: '${this.target.name}', path: '${this.path}' }`;
  }
  // @endif

  /**
   * @ignore
   * @returns {black-engine~Message}
   */
  __reset() {
    this.sender = null;
    this.name = '';
    this.target = null;
    this.canceled = false;
    this.type = MessageType.DIRECT;
    return this;
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get PROGRESS() {
    return 'progress';
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get COMPLETE() {
    return 'complete';
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get ERROR() {
    return 'error';
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get CHANGE() {
    return 'change';
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get READY() {
    return 'ready';
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get UPDATE() {
    return 'update';
  }

  /** 
   * @const 
   * @public 
   * @type {string} 
   */
  static get RESIZE() {
    return 'resize';
  }

  static get pool() {
    return pool;
  }
}

/**
 * Pool for messages.
 *
 * @type {black-engine~ObjectPool}
 * @nocollapse
 *
 */
const pool = new ObjectPool(Message);
