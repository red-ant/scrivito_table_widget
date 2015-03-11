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
        var response = $.fn.edittable.clear();
        if(response != undefined) return $(response.cmsField).scrivito('save', response.text);
      }
    };

    // Set click event
    scrivito.on('load', function() {
      return $('body').on('click', '.table-widget', function(event) {
        if(scrivito.in_editable_view()) {
          tableEditor.clickFunction($(event.target));
        };
        event.stopPropagation();
      });
    });

    scrivito.on('load', function() {
      return $('body').on('click', function(event) {
        if(scrivito.in_editable_view()) {
          tableEditor.blurFunction($(event.target));
        };
      });
    });
  });

})(jQuery, this);