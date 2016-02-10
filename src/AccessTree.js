import {PropTypes} from 'react';
import AccessNode from './AccessNode';

export default class AccessTree extends AccessNode {
  static PropType = PropTypes.instanceOf(AccessTree).isRequired;

  constructor() {
    super('Tree', null);
  }

  listeners = {};
  callbacks = {};

  observe(type, callback) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(callback);
  }

  onMount(node) {
    if (!this.listeners[node.type]) {
      return;
    }

    if (!this.callbacks[node.id]) {
      this.callbacks[node.id] = [];
    }

    this.listeners[node.type].forEach(listener => {
      this.callbacks[node.id].push(listener(node));
    });
  }

  onUnmount(node) {
    if (!this.callbacks[node.id]) {
      return;
    }

    this.callbacks[node.id].forEach(callback => {
      callback();
    });

    this.callbacks[node.id] = null;
  }
}
