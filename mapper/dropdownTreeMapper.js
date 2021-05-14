var $ = require('jquery');
import '~/dropdown-tree/js/dropdowntree.js';

export default class DropdownTreeMapper {
  map(input, output) {
    let self = this;
    let mappedInput = input.map(x => {
      output.push(x);
      let combinations = null;
      if (x.Combinaciones.length > 0) {
        combinations = self.map(x.Combinaciones, output);
      }
      return {
        id: output.length - 1,
        title: x.Nombre,
        data: combinations
      };
    });

    return mappedInput;
  }
}
