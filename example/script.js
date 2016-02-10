import React from 'react';
import ReactDOM from 'react-dom';
import {
  AccessProvider,
  AccessTree,
  AccessElement
} from '../src/index';

const accessTree = window.tree = new AccessTree();

accessTree.observe('ExampleType', function(node) {
  console.log(node.type + ':' + node.id + ':add');

  function onClick() {
    console.log(node.type + ':' + node.id + ':click');
  }

  node.element.addEventListener('click', onClick);

  return function() {
    console.log(node.type + ':' + node.id + ':remove');
    node.element.removeEventListener('click', onClick);
  };
});

class Application extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    return (
      <AccessProvider accessTree={accessTree}>
        <div className="application">
          <button onClick={this.handleToggle}>Toggle</button>

          {this.state.active && (
            <div>
              <AccessElement accessType="ExampleType" tagName="div">A</AccessElement>
              <AccessElement accessType="ExampleType" tagName="div">B</AccessElement>
            </div>
          )}
        </div>
      </AccessProvider>
    );
  }
}

ReactDOM.render(
  <Application/>,
  document.getElementById('root')
);
