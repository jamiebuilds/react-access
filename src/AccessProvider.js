import React, {PropTypes} from 'react';
import AccessTree from './AccessTree';

export default class AccessProvider extends React.Component {
  static childContextTypes = { accessNode: AccessTree.PropType,   accessTree: AccessTree.PropType };
  getChildContext() { return { accessNode: this.props.accessTree, accessTree: this.props.accessTree }; }

  static propTypes = {
    accessTree: AccessTree.PropType,
    children: PropTypes.element.isRequired
  };

  render() {
    return this.props.children;
  }
}
