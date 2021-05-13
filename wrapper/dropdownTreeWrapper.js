var $ = require("jquery");
import "~/dropdown-tree/js/dropdowntree.js";

class DropdownTreeWrapper {
  constructor(title, maxHeight, multiSelect, selectChildren, idComponente) {
    this.title = title;
    this.maxHeight = maxHeight;
    this.multiSelect = multiSelect;
    this.selectChildren = selectChildren;
    this.idComponente = idComponente;
  }

  map(data) {
    var self = this;
    var arrayResult = [];

    $.each(data, function(key, elem) {
      var newOption = self.mapTipoEnsayoToOption(elem);
      arrayResult.push(newOption);
    });

    return arrayResult;
  }

  mapTipoEnsayoToOption(element) {
    var self = this;
    var combinaciones = element.Combinaciones;
    var combinations = null;

    if (combinaciones.length > 0) {
      combinations = [];
      combinaciones.forEach(comb => {
        var newCombinationOption = self.mapTipoEnsayoToOption(comb);
        combinations.push(newCombinationOption);
      });
    }

    var newOption = {
      id: element.Id,
      title: element.Nombre,
      data: combinations
    };

    return newOption;
  }

  createTree(dataOptions) {
    var self = this;
    var options = {
      title: self.title,
      data: dataOptions,
      maxHeight: self.maxHeight,
      multiSelect: self.multiSelect,
      selectChildren: self.selectChildren
    };
    $('#' + self.idComponente).empty();
    $('#' + self.idComponente).DropDownTree(options);
  }

  getTreeElementsChecked(element) {
    var inputsSelected = element.find('input:checkbox:checked');
    var arrayItemsSelected = [];

    $.each(inputsSelected, function(key, elem) {
      arrayItemsSelected.push(elem.value);
    });

    return arrayItemsSelected;
  }

  selectedElements() {
    var self = this;
    return self.getTreeElementsChecked($('#' + self.idComponente));
  }

  selectedElementsJoined() {
    var self = this;
    return self.selectedElements().join(',');
  }
}
