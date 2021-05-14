/*
@licstart  The following is the entire license notice for the
JavaScript code in this page.

Copyright (C) 2016  Joseph Safwat Khella

The JavaScript code in this page is free software: you can
redistribute it and/or modify it under the terms of the GNU
General Public License (GNU GPL) as published by the Free Software
Foundation, either version 3 of the License, or (at your option)
any later version.  The code is distributed WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

As additional permission under GNU GPL version 3 section 7, you
may distribute non-source (e.g., minimized or compacted) forms of
that code without the copy of the GNU GPL normally required by
section 4, provided you include this license notice and a URL
through which recipients can access the Corresponding Source.

@licend  The above is the entire license notice
for the JavaScript code in this page.
*/
var $ = require('jquery');
var jQuery = require('jquery');

var dropDownOptions = {
  title: 'Dropdown',
  data: [],
  closedArrow: '<i class="fa fa-caret-right" aria-hidden="true"></i>',
  openedArrow: '<i class="fa fa-caret-down" aria-hidden="true"></i>',
  maxHeight: 300,
  multiSelect: false,
  selectChildren: false,
  addChildren: false,
  clickHandler: function(target) {},
  expandHandler: function(target, expanded) {},
  checkHandler: function(target, checked) {},
  rtl: false
};

(function($) {
  //data inits from options
  $.fn.DropDownTree = function(options) {
    //helpers
    function RenderData(data, element) {
      for (var i = 0; i < data.length; i++) {
        var dataAttrs = '';
        if (
          typeof data[i].dataAttrs != 'undefined' &&
          data[i].dataAttrs != null
        ) {
          for (var d = 0; d < data[i].dataAttrs.length; d++) {
            dataAttrs +=
              ' data-' +
              data[i].dataAttrs[d].title +
              "='" +
              data[i].dataAttrs[d].data +
              "' ";
          }
        }
        if (!element.is('li')) {
          element.append(
            '<li id="' +
              data[i].id +
              '"' +
              dataAttrs +
              '>' +
              (options.multiSelect
                ? '<label class="ui-corner-all"><input type="checkbox" value="' +
                  data[i].id +
                  '"z><span>' +
                  data[i].title +
                  '</span><a href="' +
                  (typeof data[i].href != 'undefined' && data[i].href != null
                    ? data[i].href
                    : '#') +
                  '"></a></label>'
                : '') +
              '</li>'
          );
          if (data[i].data != null && typeof data[i].data != 'undefined') {
            $('#' + data[i].id).append("<ul style='display:none'></ul>");
            $('#' + data[i].id)
              .find('a')
              .first()
              .prepend('<span class="arrow"></span>');
            RenderData(
              data[i].data,
              $('#' + data[i].id)
                .find('ul')
                .first()
            );
          } else if (options.addChildren) {
            $('#' + data[i].id)
              .find('a')
              .first()
              .prepend('<span class="arrow"></span>');
          }
        } else {
          element
            .find('ul')
            .append(
              '<li id="' +
                data[i].id +
                '"' +
                dataAttrs +
                '>' +
                (options.multiSelect
                  ? '<label class="ui-corner-all"><input type="checkbox" value="' +
                    data[i].id +
                    '"><span>' +
                    data[i].title +
                    '</span><a href="' +
                    (typeof data[i].href != 'undefined' && data[i].href != null
                      ? data[i].href
                      : '#') +
                    '"></a></label>'
                  : '') +
                '</li>'
            );
          if (data[i].data != null && typeof data[i].data != 'undefined') {
            $('#' + data[i].id).append("<ul style='display:none'></ul>");
            $('#' + data[i].id)
              .find('a')
              .first()
              .prepend('<span class="arrow"></span>');
            RenderData(
              data[i].data,
              $('#' + data[i].id)
                .find('ul')
                .first()
            );
          } else if (options.addChildren) {
            $('#' + data[i].id)
              .find('a')
              .first()
              .prepend('<span class="arrow"></span>');
          }
        }
      }
    }

    options = $.extend({}, dropDownOptions, options, { element: this });

    //protos inits
    $(options.element).init.prototype.clickedElement = null;

    //handlers binders
    //arrow click handler close/open
    $(options.element).on('click', '.arrow', function(e) {
      e.stopImmediatePropagation();
      $(this).empty();
      if (
        $(this)
          .parents('li')
          .first()
          .find('ul')
          .first()
          .is(':visible')
      ) {
        expanded = false;
        $(this)
          .parents('li')
          .first()
          .find('ul')
          .first()
          .hide();
      } else {
        expanded = true;
        $(this)
          .parents('li')
          .first()
          .find('ul')
          .first()
          .show();
      }
    });

    //select box click handler
    $(options.element).on('click', "input[type='checkbox']", function(e) {
      e.stopImmediatePropagation();
      var checked = $(this).is(':checked');
      var childrens = e.currentTarget.parentElement.parentElement.getElementsByTagName(
        'ul'
      );
      if (childrens.length > 0) {
        ChangeCheckedInputs(childrens[0], checked);
      }
    });

    $(options.element).on('click', 'label', function(e) {
      e.stopImmediatePropagation();
      var checked = $(this).is(':checked');
      var childrens = e.currentTarget.parentElement.getElementsByTagName('ul');
      if (childrens.length > 0) {
        ChangeCheckedInputs(childrens[0], checked);
      }
    });

    if (options.rtl) {
      $(options.element).addClass('rtl-dropdown-tree');
      if (options.closedArrow.indexOf('fa-caret-right') > -1) {
        options.closedArrow = options.closedArrow.replace(
          'fa-caret-right',
          'fa-caret-left'
        );
      }
    }
    $(options.element).append(
      '<button class="ui-multiselect ui-widget ui-state-default ui-corner-all float-left dropdown-toggle" data-toggle="dropdown" style="width: 146px; height: 28px; padding-top: 3px; padding-bottom: 3px; font-size: 14px; margin-top: 0px;"><span class="dropdowntree-name">' +
        options.title +
        '</span><span class="caret"></span></button>'
    );
    $(options.element).append(
      '<ul style="max-height: ' +
        options.maxHeight +
        'px; border: 1px solid #000000;" class="dropdown-menu ui-multiselect-checkboxes ui-helper-reset" aria-labelledby="dropdownMenu1"></ul>'
    );

    RenderData(
      options.data,
      $(options.element)
        .find('ul')
        .first()
    );
  };
})(jQuery);

function ChangeCheckedInputs(childrens, checked) {
  var childsInput = childrens.getElementsByTagName('input');
  var childsInputLength = childsInput.length;
  for (var i = 0; i < childsInputLength; i++) {
    childrens.getElementsByTagName('input')[i].checked = checked;
  }
}
