import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');
var jQuery = require('jquery');

import App from './App';

$(document).ready(() => {
  //Inicio - Dejar submenú abierto hasta que se hace click fuera del menú
  jQuery('.dropdown-menu li a').mouseover(function(e) {
    e.stopPropagation();
    jQuery(this)
      .parent()
      .parent()
      .find('li')
      .each(function() {
        jQuery(this).removeClass('open');
      });
    jQuery(this)
      .parent()
      .addClass('open');
  });

  jQuery('.dropdown-toggle').click(function(e) {
    var classList = jQuery(this)
      .parent()
      .attr('class')
      .split(/\s+/);
    if (classList.includes('open')) {
      jQuery(this)
        .parent()
        .removeClass('open');
    } else {
      jQuery(this)
        .parent()
        .addClass('open');
    }
  });
  //Fin - Dejar submenú abierto hasta que se hace click fuera del menú
});

ReactDOM.render(<App />, document.getElementById('root'));
