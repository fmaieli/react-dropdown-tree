import React from 'react';
import './style.css';
import '~/dropdown-tree/js/dropdowntree.js';
var $ = require('jquery');

export default class DropdownTree extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.$el = $(this.el);
    this.init();
  }

  componentWillUnmount() {
    this.$el.empty();
  }

  init() {
    var resultData = this.props.wrapper.mapTiposEnsayos(this.props.data);
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

  onChange() {}

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
    return <div ref={el => (this.el = el)} />;
  }
}
