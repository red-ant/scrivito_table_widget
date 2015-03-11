(function($, App) {
  'use strict';

  var activeTable = null;
  var activeElement = null;
  var cmsField;
  var initialized = false;
  var keysBound = false;
  var rows = 0;
  var cols = 0;

  $.fn.edittable = function(opts) {
    // initialize
    if(!initialized) {
      activeTable = this.parents('table');
      cmsField = this.parents('[data-editor=table-editor]');

      initialized = $.fn.edittable.initialize(cmsField, this);
      rows = $.fn.edittable.getRowCount();
      cols = $.fn.edittable.getColCount();
      $.fn.edittable.bindButtons();
    } else if(activeElement.get(0) != this.get(0)) {
      //$.fn.edittable.save(cmsField);
    }

    if(!keysBound) {
      $.fn.edittable.bindKeys();
    }

    // edit
    if($(this).get(0).tagName == "TD" || $(this).get(0).tagName == "TH") {
      activeElement = this;
      cmsField.attr('contenteditable', true);
      $.fn.edittable.setButtonPositions();
    }
  };

  $.fn.edittable.bindKeys = function() {
    $('body').keyup(function(e) {
      var code = e.keyCode || e.which;
      if(initialized) {
        $.fn.edittable.setButtonPositions();
      }
    });
    keysBound = true;
  };

  $.fn.edittable.getRowCount = function() {
    return activeTable.find("tbody tr").length;
  };

  $.fn.edittable.getColCount = function() {
    return activeTable.find("tbody tr").first().children().length;
  };

  $.fn.edittable.setButtonPositions = function() {
    var base = activeElement.position();
    var width = activeElement.outerWidth();
    var height = activeElement.outerHeight();

    $('.table-buttons.top').css({    top: "-11px",                        left: (base.left - 11), width: width + 23});
    $('.table-buttons.edit').css({   top: (base.top - 16),                left: (base.left + 5)});
    $('.table-buttons.left').css({   top: (base.top - 12),                left: -17, height: height + 24});
    $('.table-buttons.bottom').css({ bottom: "-4px",                      left: (base.left + width/2 - 12)});
    $('.table-buttons.right').css({  top: (base.top + height/2 - 11),      right: -23});

    if(activeElement.get(0).tagName == "TH") {
      $('.table-buttons .add-top').hide();
    } else {
      $('.table-buttons .add-top').show();
    }
  }

  $.fn.edittable.initialize = function(cmsField, element) {    
    var buttons_top = "<div class='table-buttons top'>"+ $.fn.edittable.buttonsTop() +"</div>";
    var buttons_bottom = "<div class='table-buttons bottom'>"+ $.fn.edittable.buttonsBottom() +"</div>";
    var buttons_left = "<div class='table-buttons left'>"+ $.fn.edittable.buttonsLeft() +"</div>";
    var buttons_right = "<div class='table-buttons right'>"+ $.fn.edittable.buttonsRight() +"</div>";
    var buttons_edit = "<div class='table-buttons edit'>"+ $.fn.edittable.buttonsEdit() +"</div>";
    var buttons_main = "<div class='table-options main'>"+ $.fn.edittable.buttonsMain() +"</div>";
    $("<div class='edit-table'>" + buttons_main + buttons_top + buttons_left + buttons_right + buttons_edit + buttons_bottom + "</div>").insertBefore(cmsField);
    $("<div class='helper-line'></div>").insertBefore(cmsField);
    return true;
  }

  $.fn.edittable.clear = function() {
    if(initialized) {
      var text = activeTable.get(0).outerHTML;
      var field = cmsField;
      activeTable = null;
      activeElement = null;
      initialized = false;
      cmsField = null;
      $('.edit-table').remove();
      $('.helper-line').remove();
      rows = 0;
      cols = 0;
      return {text: text, cmsField: field};
    }
  }

  $.fn.edittable.save = function(cmsField) {
    var text = activeTable.get(0).outerHTML;
    $(cmsField).scrivito('save', text);
  }

  /****
   * Button bars
   ****/

  $.fn.edittable.buttonsTop = function() {
    return  $.fn.edittable.button("", "+", "add-left") +
            $.fn.edittable.button("", "+", "add-right");
  }

  $.fn.edittable.buttonsEdit = function() {
    return  $.fn.edittable.button("bold", "", "table-bold") +
            $.fn.edittable.button("italic", "", "table-italic") +
            $.fn.edittable.button("align-left", "", "table-left") +
            $.fn.edittable.button("align-center", "", "table-center") +
            $.fn.edittable.button("align-right", "", "table-right");
  }

  $.fn.edittable.buttonsBottom = function() {
    return    $.fn.edittable.button("", "-", "delete-column");
  }

  $.fn.edittable.buttonsLeft = function() {
    return  $.fn.edittable.button("", "+", "add-top") +
            $.fn.edittable.button("", "+", "add-bottom");
  }

  $.fn.edittable.buttonsRight = function() {
    return  $.fn.edittable.button("", "-", "delete-row");
  }

  $.fn.edittable.buttonsMain = function() {
    return  $.fn.edittable.button("pencil", "", "edit-the-table alert-gray") +
            $.fn.edittable.button("none", "striped", "stripe-table alert-gray") +
            $.fn.edittable.button("none", "condenced", "condence-table alert-gray") +
            $.fn.edittable.button("none", "hover", "hover-table alert-gray") +
            $.fn.edittable.button("none", "border", "border-table alert-gray") +
            $.fn.edittable.button("none", "first-column", "first-column alert-gray") +
            $.fn.edittable.button("none", "success", "add-success alert-success") +
            $.fn.edittable.button("none", "info", "add-info alert-info") +
            $.fn.edittable.button("none", "warning", "add-warning alert-warning") +
            $.fn.edittable.button("none", "danger", "add-danger alert-danger");
  }

  $.fn.edittable.button = function(icon, text, f) {
    var faIcon = icon == "none" ? "" : "<i class='fa fa-"+ icon +"'></i>";
    var button = "<div class='"+ f +"'>" + faIcon + text +"</div>";
    return button;
  }

  /****
   * Button click handlers
   ****/

  $.fn.edittable.bindButtons = function() {
    $('.table-widget').find('.add-top').on('click', function() { $.fn.edittable.addTop(); });
    $('.table-widget').find('.add-bottom').on('click', function() { $.fn.edittable.addBottom(); });
    $('.table-widget').find('.add-left').on('click', function() { $.fn.edittable.addLeft(); });
    $('.table-widget').find('.add-right').on('click', function() { $.fn.edittable.addRight(); });
    $('.table-widget').find('.table-bold').on('click', function() { $.fn.edittable.bold(); });
    $('.table-widget').find('.table-italic').on('click', function() { $.fn.edittable.italic(); });
    $('.table-widget').find('.delete-row').on('click', function() { $.fn.edittable.removeRow(); });
    $('.table-widget').find('.delete-column').on('click', function() { $.fn.edittable.removeColumn(); });
    $('.table-widget').find('.stripe-table').on('click', function() { $.fn.edittable.tableStriped(); });
    $('.table-widget').find('.condence-table').on('click', function() { $.fn.edittable.tableCondensed(); });
    $('.table-widget').find('.hover-table').on('click', function() { $.fn.edittable.tableHover(); });
    $('.table-widget').find('.border-table').on('click', function() { $.fn.edittable.tableBorder(); });
    $('.table-widget').find('.first-column').on('click', function() { $.fn.edittable.firstColumn(); });
    $('.table-widget').find('.add-success').on('click', function() { $.fn.edittable.addSuccess(); });
    $('.table-widget').find('.add-info').on('click', function() { $.fn.edittable.addInfo(); });
    $('.table-widget').find('.add-warning').on('click', function() { $.fn.edittable.addWarning(); });
    $('.table-widget').find('.add-danger').on('click', function() { $.fn.edittable.addDanger(); });
    $('.table-widget').find('.table-left').on('click', function() { $.fn.edittable.tableLeft(); });
    $('.table-widget').find('.table-center').on('click', function() { $.fn.edittable.tableCenter(); });
    $('.table-widget').find('.table-right').on('click', function() { $.fn.edittable.tableRight(); });

    $('.table-widget').find('.edit-the-table').on('click', function() { $.fn.edittable.toggleTableOptions(); });

    $('.table-widget').find('.add-left, .add-right').on('mouseover', function() { $.fn.edittable.addHoverVerticalAdd($(this)); });
    $('.table-widget').find('.add-top, .add-bottom').on('mouseover', function() { $.fn.edittable.addHoverHorizontalAdd($(this)); });


    $('.table-widget').find('.delete-column').on('mouseover', function() { $.fn.edittable.deleteHoverColumn($(this)); });
    $('.table-widget').find('.delete-row').on('mouseover', function() { $.fn.edittable.deleteHoverRow($(this)); });

    $('.table-widget').find('.add-left, .add-right, .add-top, .add-bottom, .delete-column, .delete-row').on('mouseout', function() { $.fn.edittable.resetHelperLine(); });
  }

  /****
   * Hover button methods
   ****/

  $.fn.edittable.addHoverVerticalAdd = function(elem) {
    var pos = elem.position();
    var barPos = $('.table-buttons.top').position();

    $('.helper-line').css({
      height: activeTable.outerHeight(),
      width: 2,
      top: 0,
      left: barPos.left + pos.left + 11,
      background: '#439439'
    }).fadeIn(100);
  }

  $.fn.edittable.addHoverHorizontalAdd = function(elem) {
    var pos = elem.position();
    var barPos = $('.table-buttons.left').position();

    $('.helper-line').css({
      height: 2,
      width: activeTable.outerWidth(),
      top: barPos.top + pos.top + 11,
      left: 0,
      background: '#439439'
    }).fadeIn(100);
  }

  $.fn.edittable.deleteHoverColumn = function(elem) {
    var index = activeElement.index() + 1;
    var elems = activeTable.find('td:nth-child('+ index +'), th:nth-child('+ index +')');
    elems.addClass('delete-marker');
  }

  $.fn.edittable.deleteHoverRow = function(elem) {
    var row = activeElement.parents('tr');
    row.addClass('delete-marker');
  }

  $.fn.edittable.resetHelperLine = function() {
    $('.helper-line').css({
      height: 0,
      width: 0,
      top: 0,
      left: 0,
      border: 'none'
    }).fadeOut(100);

    activeTable.find('.delete-marker').removeClass('delete-marker');
    activeTable.find('[class=""]').removeAttr('class');
  }

  /****
   * Button methods
   ****/

   $.fn.edittable.toggleTableOptions = function() {
    $('.table-options.main div').not(':first').fadeToggle(100);
   }

  $.fn.edittable.bold = function() {
    activeElement.toggleClass('bold');
    $.fn.edittable.save(cmsField);
  }

  $.fn.edittable.italic = function() {
    activeElement.toggleClass('italic');
    $.fn.edittable.save(cmsField);
  }

  $.fn.edittable.addTop = function() {
    var newRow = activeElement.parents('tr').get(0).outerHTML;

    $(newRow).insertBefore( activeElement.parents('tr') );
    rows += 1;
    $.fn.edittable.setButtonPositions();
    $.fn.edittable.save(cmsField);
  }

  $.fn.edittable.addBottom = function() {
    var newRow = "<tr>"+ new Array(cols + 1).join("<td>Content</td>"); +"</tr>";

    if(activeElement.get(0).tagName == 'TD') {
      $(newRow).insertAfter( activeElement.parents('tr') );
    } else {
      $(newRow).insertBefore( activeTable.find('tbody tr').first() );
    }

    rows += 1;
    $.fn.edittable.setButtonPositions();
    $.fn.edittable.save(cmsField);
  }

  $.fn.edittable.addLeft = function() {
    var pos = activeElement.index();

    activeTable.find("thead tr").each(function(index, row) {
      $($(row).find("th")[pos]).before("<th>Head</th>");
    });

    activeTable.find("tbody tr").each(function(index, row) {
      $($(row).find("td")[pos]).before("<td>Content</td>");
    });

    cols += 1;
    $.fn.edittable.setButtonPositions();
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.addRight = function() {
    var pos = activeElement.index();

    activeTable.find("thead tr").each(function(index, row) {
      $($(row).find("th")[pos]).after("<th>Head</th>");
    });

    activeTable.find("tbody tr").each(function(index, row) {
      $($(row).find("td")[pos]).after("<td>Content</td>");
    });

    cols += 1;
    $.fn.edittable.setButtonPositions();
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.removeColumn = function() {
    var pos = activeElement.index();
    var activeRow = activeElement.parents('tr');
    var next = pos == 0 ? '0' : pos-1;

    if(cols > 0) {
      activeTable.find("tr").each(function(index, row) {
        $(row).children()[pos].remove();
      });

      activeRow.find('td')[next].click();

      cols -= 1;
    }


    $.fn.edittable.setButtonPositions();
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.removeRow = function() {
    var pos = activeElement.index();
    var next = pos == 0 ? '0' : pos-1;
    var activeRowIndex = activeElement.parents('tr').index();

    if(rows > 0) {
      activeElement.parents("tr").remove();
      $(activeTable.find('tbody tr')[activeRowIndex]).find('td').click();
    }
    $.fn.edittable.setButtonPositions();
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.tableStriped = function() {
    activeTable.toggleClass('table-striped');
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.tableCondensed = function() {
    activeTable.toggleClass('table-condensed');
    $.fn.edittable.setButtonPositions();
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.tableHover = function() {
    activeTable.toggleClass('table-hover');
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.tableBorder = function() {
    activeTable.toggleClass('table-bordered');
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.firstColumn = function() {
    activeTable.toggleClass('column-first');
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.addSuccess = function() {
    activeElement.removeClass('info');
    activeElement.removeClass('warning');
    activeElement.removeClass('danger');
    activeElement.toggleClass('success');
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.addInfo = function() {
    activeElement.removeClass('success');
    activeElement.removeClass('warning');
    activeElement.removeClass('danger');
    activeElement.toggleClass('info');
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.addWarning = function() {
    activeElement.removeClass('info');
    activeElement.removeClass('success');
    activeElement.removeClass('danger');
    activeElement.toggleClass('warning');
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.addDanger = function() {
    activeElement.removeClass('info');
    activeElement.removeClass('warning');
    activeElement.removeClass('success');
    activeElement.toggleClass('danger');
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.tableLeft = function() {
    activeElement.removeClass('center');
    activeElement.removeClass('right');
    activeElement.addClass('left');
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.tableCenter = function() {
    activeElement.removeClass('left');
    activeElement.removeClass('right');
    activeElement.addClass('center');
    $.fn.edittable.save(cmsField);
  };

  $.fn.edittable.tableRight = function() {
    activeElement.removeClass('center');
    activeElement.removeClass('left');
    activeElement.addClass('right');
    $.fn.edittable.save(cmsField);
  };

})(jQuery, this);