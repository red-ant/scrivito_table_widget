(function($, App) {
  'use strict';

  $(function() {
    var tableString = '<table class="table"><thead><tr><th>New Table</th></tr></thead><tbody><tr><td>With Content</td></tr></body></table>';

    if(scrivito.in_editable_view()) {
      $('body').on('click', '.create-new-table', function(e) {
        $(this).removeClass('create-new-table');
        $(this).addClass('table');

        $(this).html(tableString);

        $(this).parent().scrivito('save', tableString);

        $(this).parent().scrivito('reload');
      });
    } // end if
  });

})(jQuery, this);