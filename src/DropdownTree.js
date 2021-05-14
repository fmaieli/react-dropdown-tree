import React from 'react';
import './style.css';
import '~/dropdown-tree/js/dropdowntree.js';
var $ = require('jquery');

export default class DropdownTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = { registeredList: [] };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.$el = $(this.el);
    this.setState({ registeredList: this.props.data });
    this.init();
  }

  componentWillUnmount() {
    this.$el.empty();
  }

  init() {
    let self = this;
    let registeredList = [];

    var resultData = this.props.mapper.map(this.props.data, registeredList);
    var options = {
      title: this.props.title,
      data: resultData,
      maxHeight: this.props.maxHeight,
      multiSelect: this.props.multiSelect,
      selectChildren: this.props.selectChildren
    };
    this.$el.empty();
    this.$el.DropDownTree(options);
  }

  onChange() {
    // $('.checkbox').change(function() {
    //   if (this.checked) {
    //     //Do stuff
    //   }
    // });

    let itemsSelected = self.selectedElements();
    let itemsSelectedFromList = itemsSelected.map(
      i => this.state.registeredList[i]
    );
    self.props.onChange(itemsSelectedFromList);
  }

  selectedElements() {
    var inputsSelected = this.$el.find('input:checkbox:checked');
    var arrayItemsSelected = [];

    $.each(inputsSelected, function(key, elem) {
      arrayItemsSelected.push(elem.value);
    });

    return arrayItemsSelected;
  }

  selectedElementsJoined() {
    return self.selectedElements().join(',');
  }

  render() {
    return (
      <div ref={el => (this.el = el)} className={'dropdown dropdown-tree'} />
    );
  }
}
