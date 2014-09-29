(function($, App) {
  'use strict';

  $(function() {
    App.tableEditor = {
      // set selector for Editor
      selector: '[data-editor=table-editor]',
            
      // set function triggert on click
      clickFunction: function(cmsField) {
        cmsField.edittable();
      },

      blurFunction: function(cmsField) {
        var text = $.fn.edittable.table(cmsField);
        return cmsField.parents(tableEditor.selector).scrivito('save', text);
      }
    };

    // Set click event
    scrivito.on('load', function() {
      return $('body').on('click', tableEditor.selector, function(event) {
        if(scrivito.in_editable_view()) {
          tableEditor.clickFunction($(event.target));
        };
      });
    });

    scrivito.on('load', function() {
      return $('body').on('blur', tableEditor.selector, function(event) {
        if(scrivito.in_editable_view()) {
          tableEditor.blurFunction($(event.target));
        };
      });
    });
  });

})(jQuery, this);