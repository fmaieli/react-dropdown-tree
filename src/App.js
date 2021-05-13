import React from 'react';
import DropdownTree from './DropdownTree';
import DropdownTreeWrapper from '../wrapper/dropdownTreeWrapper.js';
import data from '../data/data.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownTreeItems: [],
      wrapper: new DropdownTreeWrapper(
        '-seleccione-',
        300,
        true,
        true,
        'dropdown-tree'
      )
    };
  }

  componentDidMount() {}

  onChangeDropdownTree(itemsSelected) {
    this.setState({ dropdownTreeItems: itemsSelected });
  }

  render() {
    return (
      <div>
        <h1>DropdownTreeComponent</h1>
        <DropdownTree
          title={'-seleccione-'}
          maxHeight={300}
          multiSelect={true}
          selectChildren={true}
          data={data}
          wrapper={this.state.wrapper}
          onChange={this.onChangeDropdownTree}
        />
      </div>
    );
  }
}
