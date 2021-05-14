import React from 'react';
import DropdownTree from './DropdownTree';
import DropdownTreeMapper from '../mapper/dropdownTreeMapper.js';
import data from '../data/data.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownTreeItems: [],
      mapper: new DropdownTreeMapper()
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
          mapper={this.state.mapper}
          onChange={this.onChangeDropdownTree}
        />
      </div>
    );
  }
}
