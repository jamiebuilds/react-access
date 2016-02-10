import React, {PropTypes} from 'react';
import AccessTree from './AccessTree';
import AccessNode from './AccessNode';

export default class AccessElement extends React.Component {
  static contextTypes      = { accessNode: AccessNode.PropType, accessTree: AccessNode.PropType };
  static childContextTypes = { accessNode: AccessNode.PropType };
  getChildContext() { return { accessNode: this.accessNode }; }

  constructor(props, context) {
    super(props, context);
    this.accessNode = this.context.accessNode.create(this.props.accessType);
  }

  componentDidMount() {
    this.accessNode.setElement(this._ref);
    this.context.accessTree.onMount(this.accessNode);
  }

  componentWillUnmount() {
    this.context.accessTree.onUnmount(this.accessNode);
    this.context.accessNode.remove(this.accessNode);
  }

  static propTypes = {
    accessType: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired
  };

  render() {
    const { tagName, children, ...attributes } = this.props;
    delete attributes.accessType;
    attributes.ref = _ref => this._ref = _ref;
    return React.createElement(tagName, attributes, children);
  }
}
