(function($, App) {
  'use strict';

  var table_editor = {
    can_edit: function(element) {
      return $(element).is('.scrivito-table-editor');
    },
    activate: function(element) {
      $(element).on('click', function(event) {
        $(element).edittable(event);
        scrivito.editors.medium_editor.options = {toolbar: {buttons: ['bold', 'italic', 'scrivito_anchor', 'unorderedlist', 'orderedlist']}};
        scrivito.editors.medium_editor.activate(element);
        event.stopPropagation();
      });

      $('body').on('click', function(event) {
        if(!$(event.target).parents('.table-buttons').length && !$(event.target).parents('.table-options').length) {
          scrivito.editors.medium_editor.options = {};
          var response = $.fn.edittable.clear();
          if(response != undefined) return $(response.cmsField).scrivito('save', response.text);
        }
      });
    }
  };

  scrivito.on('load', function() {
    return scrivito.define_editor('toggle_button_editor', table_editor);
  });

})(jQuery, this);
