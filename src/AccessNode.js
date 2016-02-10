import {PropTypes} from 'react';

let UNIQUE_ID = 0;

export default class AccessNode {
  static PropType = PropTypes.instanceOf(AccessNode).isRequired;

  constructor(type, parent) {
    this.id = UNIQUE_ID++;
    this.type = type;
    this.parent = parent;
    this.element = null;
    this.children = [];
  }

  setElement(element) {
    return this.element = element;
  }

  create(type) {
    const node = new AccessNode(type, this);
    this.children.push(node);
    return node;
  }

  remove(node) {
    this.children.splice(this.children.indexOf(node), 1);
  }
}
