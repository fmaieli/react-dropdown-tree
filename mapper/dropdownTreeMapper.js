var $ = require('jquery');
import '~/dropdown-tree/js/dropdowntree.js';

export default class DropdownTreeMapper {
  map(data) {
    return data.map(x => this.mapTipoEnsayoToOption(x));
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
}
